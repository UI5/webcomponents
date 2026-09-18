# Native `<dialog>` + `showModal()` for `ui5-dialog` — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `ui5-dialog` open as a native `<dialog>` via `showModal()` so background content becomes browser-enforced `inert` (fixing screen-reader escape issues #7938, #6902, #13906), while preserving all existing Dialog behavior.

**Architecture:** The shadow-root element of the Dialog (`.ui5-popup-root`) becomes a `<dialog>` instead of a `<section>`. `Dialog` overrides `_show()`/`hide()` to call `showModal()`/`close()` on that element, moving the top-layer element from the host to the shadow `<dialog>`. Native focus-trap, `::backdrop`, `inert`, and ESC replace the manual equivalents *for Dialog only*; positioning/size CSS and drag/resize/center writes migrate from the host onto the `<dialog>`. `Popover`/`ResponsivePopover` are untouched. `isNativePopoverOpen()` is extended so OpenUI5 interop keeps promoting OpenUI5 popups into the shared top layer.

**Tech Stack:** TypeScript, UI5 Web Components base (`UI5Element`, JSX renderer), CSS (`.css` → generated `.css.ts`), Cypress component tests (`.cy.tsx`).

**Reference spec:** `docs/superpowers/specs/2026-09-18-dialog-native-showmodal-design.md`

---

## Conventions & pre-flight (read before starting)

- All build commands run from repo root: `C:\Git\webcomponents`.
- Keep the dev server running (`yarn start`) so `yarn generate` runs in watch mode and regenerates `*.css.ts` from `*.css`. If not running, run `yarn generate` once from root after editing any `.css` file.
- Tests run from the package folder: `cd packages/main && yarn test:cypress:single cypress/specs/<Component>.cy.tsx`.
- Tests consume `.ts`/`.tsx` directly and surface TypeScript errors; no need to run `yarn ts` first. Use `yarn ts` from root only for a full type check.
- **Never run all tests** — only the specs named in each task.
- Enum rules (per AGENTS.md): `import type` for enums; type as `` `${Enum}` ``; use string literals for values; query `[ui5-tag]` not `ui5-tag`.
- Commit style: Conventional Commits, scope `ui5-dialog`. Remove any `.only` before committing.

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `packages/main/src/PopupTemplate.tsx` | Shared popup template | Modify — accept `rootTag` + flags to omit focus-trap spans / block layer |
| `packages/main/src/DialogTemplate.tsx` | Dialog template | Modify — opt into `<dialog>` root, drop spans + block layer |
| `packages/main/src/Dialog.ts` | Dialog component | Modify — override `_show`/`hide`, native `cancel`/ESC, retarget positioning to `_root` |
| `packages/main/src/Popup.ts` | Popup base | Minimal touch only if a hook is needed (e.g. `_useNativeDialog` getter) |
| `packages/main/src/themes/Dialog.css` | Dialog styles | Modify — move `::backdrop`, size/position onto `.ui5-popup-root` (dialog) |
| `packages/main/src/themes/PopupsCommon.css` | Shared popup styles | Modify — dialog-specific root positioning |
| `packages/base/src/features/patchPopup.ts` | OpenUI5 interop | Modify — extend `isNativePopoverOpen()` to detect modal dialogs |
| `packages/main/cypress/specs/Dialog.cy.tsx` | Dialog tests | Modify — add native-dialog assertions |
| `packages/main/cypress/specs/DialogNativeModal.cy.tsx` | New focused tests | Create — showModal/inert/cancel behavior |

---

## Task 1: Add a `_useNativeDialog` hook + parameterize `PopupTemplate`

**Files:**
- Modify: `packages/main/src/Popup.ts`
- Modify: `packages/main/src/PopupTemplate.tsx`

- [ ] **Step 1: Add a base getter on `Popup`**

In `packages/main/src/Popup.ts`, add a protected getter (default `false`) near the other getters (e.g. after `get _root()`):

```ts
/**
 * When true, the popup renders its root as a native <dialog> and opens via showModal().
 * Overridden by Dialog. Popover/ResponsivePopover keep the default (false).
 * @protected
 */
get _useNativeDialog(): boolean {
    return false;
}
```

- [ ] **Step 2: Parameterize `PopupTemplate`**

Rewrite `packages/main/src/PopupTemplate.tsx` so the root tag and the focus-trap spans / block layer are conditional on `this._useNativeDialog`. Keep the `<section>` path byte-for-byte for the non-native case:

```tsx
import type { JsxTemplate } from "@ui5/webcomponents-base";
import type Popup from "./Popup.js";
import PopubBlockLayerTemplate from "./PopupBlockLayerTemplate.js";

export default function PopupTemplate(this: Popup, hooks?: {
	beforeContent?: JsxTemplate
	afterContent?: JsxTemplate
}) {
	const native = this._useNativeDialog;
	const RootTag = native ? "dialog" : "section";

	return (<>
		{!native && PopubBlockLayerTemplate.call(this)}
		<RootTag
			root-element
			style={this.styles.root}
			class={this.classes.root}
			role={this._role}
			aria-describedby={this.ariaDescribedByIds}
			aria-modal={this._ariaModal}
			aria-label={this._ariaLabel}
			aria-labelledby={this._ariaLabelledBy}
			onKeyDown={this._onkeydown}
			onFocusOut={this._onfocusout}
			onMouseUp={this._onmouseup}
			onMouseDown={this._onmousedown}
		>

			{!native && <span class="first-fe" data-ui5-focus-trap role="none" tabIndex={0} onFocusIn={this.forwardToLast}></span>}

			{(hooks?.beforeContent || beforeContent).call(this)}

			<div
				style={this.styles.content}
				class={this.classes.content}
				role={this._contentRole}
				aria-label={this._contentAriaLabel}
				onScroll={this._scroll}
				part="content"
			>
				<slot></slot>
			</div>

			{this.ariaDescriptionText &&
						<span id="accessibleDescription" class="ui5-hidden-text">{this.ariaDescriptionText}</span>
			}

			{(hooks?.afterContent || afterContent).call(this)}

			{!native && <span class="last-fe" data-ui5-focus-trap role="none" tabIndex={0} onFocusIn={this.forwardToFirst}></span>}

		</RootTag>

	</>);
}

export function beforeContent(this: Popup) { }
export function afterContent(this: Popup) { }
```

Note: if the JSX renderer rejects a dynamic capitalized tag variable, replace the single `<RootTag>` element with an explicit `native ? (<dialog …>…</dialog>) : (<section …>…</section>)` conditional that repeats the shared children. Verify which form the renderer accepts in Step 3.

- [ ] **Step 3: Type-check the template change**

Run: `yarn ts`
Expected: PASS (no errors). If the dynamic-tag form fails to compile, switch to the explicit conditional described above and re-run.

- [ ] **Step 4: Confirm Popover still renders a `<section>` (regression guard)**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Popover.cy.tsx`
Expected: PASS (Popover unaffected; `_useNativeDialog` is `false`).

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/Popup.ts packages/main/src/PopupTemplate.tsx
git commit -m "refactor(ui5-dialog): parameterize PopupTemplate for native dialog root"
```

---

## Task 2: Make `Dialog` opt into the native `<dialog>` root

**Files:**
- Modify: `packages/main/src/Dialog.ts`
- Modify: `packages/main/cypress/specs/Dialog.cy.tsx`

- [ ] **Step 1: Add a failing test asserting the root element is a `<dialog>`**

Add to `packages/main/cypress/specs/Dialog.cy.tsx` (new `describe` block near the top):

```tsx
describe("Native dialog root", () => {
	it("renders the popup root as a <dialog> element", () => {
		cy.mount(<Dialog id="nd">content</Dialog>);

		cy.get<Dialog>("#nd").then($d => {
			const root = $d[0].shadowRoot!.querySelector("[root-element]")!;
			expect(root.tagName.toLowerCase()).to.equal("dialog");
		});
	});
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Dialog.cy.tsx`
Expected: FAIL — root tag is `section`, not `dialog`.

- [ ] **Step 3: Override `_useNativeDialog` in `Dialog`**

In `packages/main/src/Dialog.ts`, add near the other getters (e.g. after `get isModal()`):

```ts
get _useNativeDialog() {
	return true;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Dialog.cy.tsx`
Expected: the new test PASSES. Other tests in the file may still fail until Tasks 3–5 (open/close/positioning) — that is expected; focus on the new case with `.only` if needed, then remove `.only`.

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/Dialog.ts packages/main/cypress/specs/Dialog.cy.tsx
git commit -m "feat(ui5-dialog): render popup root as native dialog element"
```

---

## Task 3: Open/close via `showModal()`/`close()`

**Files:**
- Modify: `packages/main/src/Dialog.ts`
- Create: `packages/main/cypress/specs/DialogNativeModal.cy.tsx`

- [ ] **Step 1: Write failing tests for modal open/close + inert background**

Create `packages/main/cypress/specs/DialogNativeModal.cy.tsx`:

```tsx
import Dialog from "../../src/Dialog.js";
import Button from "../../src/Button.js";

describe("Dialog native modal", () => {
	it("opens as a modal dialog (top layer + :modal)", () => {
		cy.mount(
			<>
				<button id="outside">outside</button>
				<Dialog id="d"><Button id="inside">inside</Button></Dialog>
			</>
		);

		cy.get("#d").invoke("prop", "open", true);
		cy.get<Dialog>("#d").ui5DialogOpened();

		cy.get<Dialog>("#d").then($d => {
			const root = $d[0].shadowRoot!.querySelector("[root-element]") as HTMLDialogElement;
			expect(root.open).to.equal(true);
			expect(root.matches(":modal")).to.equal(true);
		});
	});

	it("makes background content inert while open", () => {
		cy.mount(
			<>
				<button id="outside">outside</button>
				<Dialog id="d2"><Button id="inside">inside</Button></Dialog>
			</>
		);

		cy.get("#d2").invoke("prop", "open", true);
		cy.get<Dialog>("#d2").ui5DialogOpened();

		// The outside button must not be focusable while the modal dialog is open.
		cy.get("#outside").then($btn => {
			$btn[0].focus();
			expect(document.activeElement).to.not.equal($btn[0]);
		});
	});

	it("closes and restores focus", () => {
		cy.mount(
			<>
				<button id="opener">opener</button>
				<Dialog id="d3"><span>x</span></Dialog>
			</>
		);

		cy.get("#opener").then($b => $b[0].focus());
		cy.get("#d3").invoke("prop", "open", true);
		cy.get<Dialog>("#d3").ui5DialogOpened();
		cy.get("#d3").invoke("prop", "open", false);
		cy.get<Dialog>("#d3").ui5DialogClosed();

		cy.get("#opener").should("be.focused");
	});
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/DialogNativeModal.cy.tsx`
Expected: FAIL — root is not `:modal` (still opened via `showPopover`).

- [ ] **Step 3: Override `_show()` and `hide()` in `Dialog`**

In `packages/main/src/Dialog.ts`, replace the existing `_show()` and add `hide()`:

```ts
_show() {
	const dialog = this._root as HTMLDialogElement;
	if (this.isConnected && !dialog.open) {
		dialog.showModal();
	}
	this._center();
}

hide() {
	const dialog = this._root as HTMLDialogElement;
	if (this.isConnected && dialog.open) {
		dialog.close();
	}
}
```

Also remove the host `popover` wiring **for the native path**. In `Popup.ts`, `onEnterDOM()` and `handleOpenOnEnterDOM()` set `popover="manual"` and call `showPopover()`. Guard those with `!this._useNativeDialog`:

- `onEnterDOM()`: wrap `this.setAttribute("popover", "manual");` in `if (!this._useNativeDialog) { ... }`.
- `handleOpenOnEnterDOM()`: for the native path call `this.showModal-equivalent` via `this._show()` path — i.e. `if (this.open) { this.openPopup(); }` and let `_show()` do `showModal()`; guard the `this.showPopover()` call with `!this._useNativeDialog`.

Concretely, change `handleOpenOnEnterDOM()` in `Popup.ts` to:

```ts
handleOpenOnEnterDOM() {
	if (this.open) {
		if (!this._useNativeDialog) {
			this.showPopover();
		}
		this.openPopup();
	}
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/DialogNativeModal.cy.tsx`
Expected: the modal-open and focus-restore tests PASS. The inert test should PASS because `showModal()` makes siblings inert. If inert fails, confirm `_show()` is calling `showModal()` on the shadow `<dialog>` (`this._root`) and that no host `popover` remains.

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/Dialog.ts packages/main/src/Popup.ts packages/main/cypress/specs/DialogNativeModal.cy.tsx
git commit -m "feat(ui5-dialog): open via native showModal and close via dialog.close"
```

---

## Task 4: Route native `cancel`/ESC through cancelable `before-close`

**Files:**
- Modify: `packages/main/src/Dialog.ts`
- Modify: `packages/main/cypress/specs/DialogNativeModal.cy.tsx`

- [ ] **Step 1: Write failing tests for ESC + cancelable before-close**

Add to `DialogNativeModal.cy.tsx`:

```tsx
describe("Dialog native cancel/ESC", () => {
	it("closes on Escape via native cancel", () => {
		cy.mount(<Dialog id="e1"><span>x</span></Dialog>);
		cy.get("#e1").invoke("prop", "open", true);
		cy.get<Dialog>("#e1").ui5DialogOpened();

		cy.realPress("Escape");
		cy.get<Dialog>("#e1").ui5DialogClosed();
		cy.get("#e1").should("have.prop", "open", false);
	});

	it("stays open when before-close is prevented on Escape", () => {
		cy.mount(<Dialog id="e2"><span>x</span></Dialog>);
		cy.get<Dialog>("#e2").then($d => {
			$d[0].addEventListener("ui5-before-close", (e: Event) => e.preventDefault());
		});
		cy.get("#e2").invoke("prop", "open", true);
		cy.get<Dialog>("#e2").ui5DialogOpened();

		cy.realPress("Escape");
		// Give the browser a tick, dialog must remain open.
		cy.wait(100);
		cy.get("#e2").should("have.prop", "open", true);
	});
});
```

- [ ] **Step 2: Run to verify failure**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/DialogNativeModal.cy.tsx`
Expected: the "stays open when prevented" test FAILS (native ESC closes the dialog regardless of `before-close`).

- [ ] **Step 3: Handle the native `cancel` event**

In `packages/main/src/Dialog.ts`:

Add a bound handler field in the constructor:

```ts
this._cancelHandler = this._onCancel.bind(this);
```

Declare the field near the other handler fields:

```ts
_cancelHandler: (e: Event) => void;
```

Add the handler method:

```ts
_onCancel(e: Event) {
	// Take over native ESC handling so before-close stays cancelable
	// and closing is routed through our lifecycle.
	e.preventDefault();
	this.closePopup(true);
}
```

Attach/detach it in the existing `_attachBrowserEvents`/`_detachBrowserEvents` overrides:

```ts
_attachBrowserEvents() {
	this._attachScreenResizeHandler();
	this._registerDragHandler();
	this._registerFullscreenKeydownHandler();
	this._root.addEventListener("cancel", this._cancelHandler);
}

_detachBrowserEvents() {
	this._detachScreenResizeHandler();
	this._deregisterDragHandler();
	this._deregisterFullscreenKeydownHandler();
	this._root.removeEventListener("cancel", this._cancelHandler);
}
```

- [ ] **Step 4: Prevent the registry ESC path from double-closing native dialogs**

In `packages/main/src/popup-utils/OpenedPopupsRegistry.ts`, the global `_keydownListener` closes the topmost popup on Escape. For a native-dialog popup, the native `cancel` already handles ESC. Guard against double handling:

```ts
if (isEscape(event) && !isEventMarked(event)) {
	const topmostPopup = OpenedPopupsRegistry.openedRegistry[OpenedPopupsRegistry.openedRegistry.length - 1].instance;

	if (openUI5Support && topmostPopup !== openUI5Support.getTopmostPopup()) {
		return;
	}

	// Native <dialog> popups handle Escape via their own "cancel" event.
	if (topmostPopup._useNativeDialog) {
		return;
	}

	event.stopImmediatePropagation();
	topmostPopup.closePopup(true);
}
```

Note: `_useNativeDialog` is currently a protected getter. Either widen it to public in `Popup.ts` (drop `@protected`, keep it as a normal getter) so the registry can read it, or add a small public `_isNativeDialog` alias. Widen the existing getter — simplest, no new surface duplication.

- [ ] **Step 5: Run tests to verify pass**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/DialogNativeModal.cy.tsx`
Expected: both ESC tests PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/main/src/Dialog.ts packages/main/src/popup-utils/OpenedPopupsRegistry.ts
git commit -m "fix(ui5-dialog): route native cancel/Escape through cancelable before-close"
```

---

## Task 5: Migrate positioning, size, and `::backdrop` onto the `<dialog>`

**Files:**
- Modify: `packages/main/src/themes/Dialog.css`
- Modify: `packages/main/src/themes/PopupsCommon.css`
- Modify: `packages/main/src/Dialog.ts`

- [ ] **Step 1: Point drag/resize/center reads and writes at `_root`**

In `packages/main/src/Dialog.ts`, the drag/resize/center logic currently reads and writes the **host** (`this.style`, `this.getBoundingClientRect()`, `this.offsetHeight/offsetWidth`, `window.getComputedStyle(this)`). Because the top-layer element is now the `<dialog>` (`this._root`), retarget them. Add a helper getter:

```ts
get _dialogElement(): HTMLDialogElement {
	return this._root as HTMLDialogElement;
}
```

Then, in each of the following methods, replace host references with `this._dialogElement`:
- `_center()` — `this.offsetHeight`/`this.offsetWidth` → `this._dialogElement.offsetHeight`/`offsetWidth`; `Object.assign(this.style, …)` → `Object.assign(this._dialogElement.style, …)`.
- `_revertSize` — `Object.assign(this.style, …)` → `this._dialogElement.style`.
- `_onDragMouseDown` / `_onDragMouseMove` — `this.getBoundingClientRect()` → `this._dialogElement.getBoundingClientRect()`; `window.getComputedStyle(this)` → `window.getComputedStyle(this._dialogElement)`; `Object.assign(this.style, …)` → `this._dialogElement.style`.
- `_dragWithEvent` / `_resizeWithEvent` — `this.getBoundingClientRect()`, `window.getComputedStyle(this)`, `this.style[...]` → `this._dialogElement` equivalents.
- `_onResizeMouseDown` / `_onResizeMouseMove` — same retargeting.
- `_minHeight` getter — `window.getComputedStyle(this.contentDOM)` stays (content is inside the dialog); header/footer queries via `this._root` are already correct.

Leave `this.style`/host untouched where it is not about geometry (there are none besides geometry here).

- [ ] **Step 2: Move size/position CSS onto the dialog root**

In `packages/main/src/themes/PopupsCommon.css`, the `:host { position: fixed; … }` rule positioned the host. For Dialog the positioned element is the `<dialog>`. Add dialog-scoped rules (do not change the shared `:host` used by Popover). Since these files are shared, gate Dialog-specifics in `Dialog.css` instead:

In `packages/main/src/themes/Dialog.css`:

- Move the sizing constraints currently on `:host` onto the dialog root. Replace the `:host { min-width…max-width… }` block with rules on `.ui5-popup-root` (the `<dialog>`), and add positioning:

```css
.ui5-popup-root {
	position: fixed;
	inset: unset;
	margin: auto; /* native centering fallback */
	min-width: min(20rem, 90vw);
	min-height: min(6rem, 90vh);
	max-height: 94%;
	max-width: 90%;
	box-shadow: var(--sapContent_Shadow3);
	border-radius: var(--sapElement_BorderCornerRadius);
	border: none;
	padding: 0;
	background: var(--sapGroup_ContentBackground);
	display: flex;
	flex-direction: column;
	max-width: 100vw;
}

:host([stretch]) .ui5-popup-root {
	width: 90%;
	height: 94%;
}

:host([stretch][on-phone]) .ui5-popup-root {
	width: 100%;
	height: 100%;
	max-height: 100%;
	max-width: 100%;
	border-radius: 0;
	min-width: 0;
}
```

- Move the backdrop from the host to the dialog:

```css
.ui5-popup-root::backdrop {
	background-color: var(--_ui5_popup_block_layer_background);
	opacity: var(--_ui5_popup_block_layer_opacity);
}
```

- Delete the now-unused `:host::backdrop { … }` and `.ui5-block-layer { display: block; }` rules from `Dialog.css` (the block layer is not rendered for Dialog anymore).

- Ensure the host itself does not occupy layout / intercept clicks now that the dialog is the visual box. Add:

```css
:host {
	display: contents;
}
```

Verify this does not break `:host([open]) { display: flex }` from `PopupsCommon.css` — override it in `Dialog.css` with `:host([open]) { display: contents; }` if needed.

- [ ] **Step 3: Regenerate CSS (if dev server not running)**

Run: `yarn generate`
Expected: `packages/main/src/generated/themes/Dialog.css.ts` and `PopupsCommon.css.ts` updated.

- [ ] **Step 4: Run the Dialog specs (positioning, drag, resize, fullscreen)**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Dialog.cy.tsx`
Expected: PASS. Investigate any drag/resize/centering failures for lingering host-vs-dialog geometry references from Step 1.

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/Dialog.ts packages/main/src/themes/Dialog.css packages/main/src/themes/PopupsCommon.css packages/main/src/generated/themes/
git commit -m "refactor(ui5-dialog): position, size and backdrop the native dialog root"
```

---

## Task 6: Fix OpenUI5 interop detection for modal dialogs

**Files:**
- Modify: `packages/base/src/features/patchPopup.ts`

- [ ] **Step 1: Extend `isNativePopoverOpen()` to detect modal dialogs**

In `packages/base/src/features/patchPopup.ts`, update the detector so an open modal `<dialog>` counts as a native popup (it shares the same top layer). Replace:

```ts
const isNativePopoverOpen = (root: Document | ShadowRoot = document): boolean => {
	if (root.querySelector(":popover-open")) {
		return true;
	}

	return Array.from(root.querySelectorAll("*")).some(element => {
		const shadowRoot = element.shadowRoot;
		return shadowRoot && isNativePopoverOpen(shadowRoot);
	});
};
```

with:

```ts
const isNativePopoverOpen = (root: Document | ShadowRoot = document): boolean => {
	if (root.querySelector(":popover-open") || root.querySelector("dialog:modal")) {
		return true;
	}

	return Array.from(root.querySelectorAll("*")).some(element => {
		const shadowRoot = element.shadowRoot;
		return shadowRoot && isNativePopoverOpen(shadowRoot);
	});
};
```

- [ ] **Step 2: Type-check**

Run: `yarn ts`
Expected: PASS.

- [ ] **Step 3: Run the OpenUI5 ↔ WebC interop specs**

Run each of these from `packages/main`:

```bash
cd packages/main
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.webCDialogOpenUI5Dialog.cy.tsx
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.openUI5DialogWebCDialog.cy.tsx
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.webCDialogComboBoxWithHint.cy.tsx
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.webCDialogOpenUI5ComboBox.cy.tsx
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.webCDialogOpenUI5Select.cy.tsx
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.webCDialogOpenUI5PopoverNoFocus.cy.tsx
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.webCPopoverOpenUI5Dialog.cy.tsx
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.openUI5DialogWebCPopoverNoFocus.cy.tsx
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.openUI5DialogWebCSelect.cy.tsx
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.openUI5Dialog.cy.tsx
yarn test:cypress:single cypress/specs/OpenUI5andWebCPopups.webCDialog.cy.tsx
```

Expected: PASS. If a spec fails because a nested OpenUI5 popup is not interactive above the WebC modal dialog (native inert interaction), capture the exact scenario. Likely follow-up: the WebC dialog opened *beneath* a later OpenUI5 popup may need to not impose inert — investigate whether reordering (closing+reopening as non-modal, or using `show()` when a WebC popup is not topmost) is required. Record findings before changing strategy.

- [ ] **Step 4: Commit**

```bash
git add packages/base/src/features/patchPopup.ts
git commit -m "fix(base): detect modal dialogs in isNativePopoverOpen for OpenUI5 interop"
```

---

## Task 7: Reconcile focus-trap removal + full Dialog regression pass

**Files:**
- Modify: `packages/main/src/Dialog.ts`
- Modify: `packages/main/cypress/specs/Dialog.cy.tsx` (only if assertions reference removed spans)

- [ ] **Step 1: Confirm drag/resize handle focus works without focus-trap spans**

The native dialog traps focus; the `first-fe`/`last-fe` spans are no longer rendered for Dialog (Task 1). `Dialog.forwardToLast()` and `Popup.forwardToFirst/forwardToLast` are wired to those spans' `onFocusIn`. With them gone, native Tab cycling handles the wrap. Verify the drag/resize handler is still reachable via Tab/Shift+Tab when `draggable`/`resizable`.

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Dialog.cy.tsx`
Expected: PASS. If the drag/resize-handle keyboard test fails, keep `Dialog.forwardToLast()`'s handler-focusing branch but trigger it from a `keydown` (Shift+Tab on first element) instead of the removed span. Only add this if a test requires it.

- [ ] **Step 2: Search specs for now-invalid selectors**

Run: `grep -rn "first-fe\|last-fe\|data-ui5-focus-trap\|ui5-block-layer" packages/main/cypress/specs/Dialog.cy.tsx packages/main/cypress/specs/DialogNativeModal.cy.tsx`
Expected: no matches for Dialog. If any assertion depends on these (removed for Dialog), update it to the native-dialog equivalent (`:modal`, native focus behavior).

- [ ] **Step 3: Full type check**

Run: `yarn ts`
Expected: PASS.

- [ ] **Step 4: Run the complete Dialog + native-modal specs**

Run:
```bash
cd packages/main
yarn test:cypress:single cypress/specs/Dialog.cy.tsx
yarn test:cypress:single cypress/specs/DialogNativeModal.cy.tsx
```
Expected: PASS (remove any `.only` first).

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/Dialog.ts packages/main/cypress/specs/Dialog.cy.tsx
git commit -m "test(ui5-dialog): align focus and modality assertions with native dialog"
```

---

## Task 8: Manual accessibility & regression verification

**Files:** none (verification only)

- [ ] **Step 1: Verify background is genuinely inert (issues #6902 / #13906)**

Open `packages/main/test/pages/Dialog.html` via the dev server (`yarn start`, then the served page). With a dialog open:
- Confirm `document.body` content outside the dialog has effective `inert` (elements report `HTMLElement.inert` semantics / are not tabbable / not in the a11y tree). Check via DevTools: outside controls should be non-focusable.
- If a screen reader is available (JAWS/NVDA/VoiceOver), confirm the button/region list is scoped to the dialog only.

- [ ] **Step 2: Verify #7938 (dialog interactive, not covered)**

Confirm the dialog content is fully interactive on open (no covering block layer), and the `::backdrop` renders behind it.

- [ ] **Step 3: Regression sweep**

Run:
```bash
cd packages/main
yarn test:cypress:single cypress/specs/Popover.cy.tsx
yarn test:cypress:single cypress/specs/ResponsivePopover.cy.tsx
```
Expected: PASS (unchanged components).

- [ ] **Step 4: Final full type check + lint**

Run from root:
```bash
yarn ts
yarn lint
```
Expected: PASS.

- [ ] **Step 5: Commit any doc/verification notes if changes were needed**

```bash
git add -A
git commit -m "chore(ui5-dialog): verification notes for native showModal migration"
```

---

## Self-Review (author checklist — completed)

- **Spec coverage:** Template parameterization (Task 1) ✓; `<dialog>` root (Task 2) ✓; `showModal`/`close` open/close (Task 3) ✓; ESC via cancelable `before-close` (Task 4) ✓; positioning/size/`::backdrop` migration (Task 5) ✓; `isNativePopoverOpen` detection fix (Task 6) ✓; focus-trap/registry reconciliation (Tasks 4, 7) ✓; a11y + regression verification (Task 8) ✓; `isTopModalPopup`/registry retained (untouched) ✓.
- **Placeholder scan:** No TBD/TODO; each code step shows concrete code or exact commands. The one deliberately deferred decision (native-inert nesting strategy) is captured as a bounded investigation with a recorded-findings gate in Task 6, matching the spec's Open Questions.
- **Type/name consistency:** `_useNativeDialog` (getter, widened to public-readable in Task 4) used consistently in Popup.ts, PopupTemplate.tsx, Dialog.ts, OpenedPopupsRegistry.ts; `_dialogElement`/`_root` used consistently in Task 5; `_cancelHandler`/`_onCancel` consistent in Task 4.

## Notes on the two spec Open Questions
- **Page-scroll blocking:** left in place (Popup base still calls `blockPageScrolling`/`unblockPageScrolling` for modal popups). No task removes it; revisit only if Task 8 shows native behavior makes it redundant.
- **Opening transition (`ui5-popup-opening`):** the opacity class is toggled on the host in `Popup.openPopup()`. With `:host { display: contents }`, the opacity may no longer apply visually; if the opening flash regresses, move the `.ui5-popup-opening` opacity rule onto `.ui5-popup-root` in `Dialog.css`. Flagged for Task 8 visual check.
