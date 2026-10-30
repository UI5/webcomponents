# Enhanced Tooltip (`<ui5-tooltip>`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public, reusable `<ui5-tooltip>` web component that renders the OpenUI5 tooltip visual design via a wrapped `<ui5-popover>`, opening on hover/focus/long-press, and wire it into `<ui5-button>` and `<ui5-title>` as a direct replacement for the native `title` tooltip.

**Architecture:** `<ui5-tooltip>` wraps `<ui5-popover>` (shown with arrow, no header/footer, overstyled to the OpenUI5 look) and renders its `text` directly plus a same-shadow-root `role="tooltip"` span for `aria-describedby`. A plain-class gesture helper attaches hover/focus/touch/Escape listeners to the resolved `opener` element and toggles the tooltip's reactive `_open`. Button embeds it driven by its `tooltip` property; Title embeds it conditionally on text truncation.

**Tech Stack:** TypeScript, UI5 Web Components base (`UI5Element`, decorators, JSX renderer), `ui5-popover`, Cypress component tests.

**Spec:** `docs/superpowers/specs/2026-10-30-enhanced-tooltip-design.md`

---

## File Structure

- Create `packages/main/src/Tooltip.ts` — the component: `text`, `opener`, `placement` props, `openTooltip()`/`closeTooltip()`/`isOpen()`, owns the gesture helper lifecycle and the reactive `_open`.
- Create `packages/main/src/TooltipTemplate.tsx` — renders the wrapped `<Popover>` + the `role="tooltip"` ARIA span.
- Create `packages/main/src/TooltipGestures.ts` — plain class translating DOM gestures on the opener into open/close calls.
- Create `packages/main/src/themes/Tooltip.css` — visual overrides (background, text, arrow, sizing).
- Modify `packages/main/src/bundle.esm.ts` — register the new component.
- Modify `packages/main/src/Button.ts` + `ButtonTemplate.tsx` — embed tooltip, wire `aria-describedby`, drop native `title`.
- Modify `packages/main/src/Title.ts` + `TitleTemplate.tsx` — truncation detection + conditional tooltip, wire `aria-describedby`.
- Create `packages/main/cypress/specs/Tooltip.cy.tsx` — component tests.
- Modify `packages/main/cypress/specs/Button.cy.tsx` and `Title.cy.tsx` — integration tests (or add if cleaner).
- Create `packages/main/test/pages/Tooltip.html` — manual demo page for browser iteration.

**Note on build:** The dev server (`yarn start` from repo root) runs `yarn generate` in watch mode, which turns `src/themes/Tooltip.css` into `src/generated/themes/Tooltip.css.js`. If not running the dev server, run `yarn generate` from the repo root once after creating the CSS file. Cypress consumes `.ts`/`.tsx` directly.

---

## Task 1: Scaffold `<ui5-tooltip>` with `text` rendering

**Files:**
- Create: `packages/main/src/Tooltip.ts`
- Create: `packages/main/src/TooltipTemplate.tsx`
- Create: `packages/main/src/themes/Tooltip.css`
- Modify: `packages/main/src/bundle.esm.ts:128` (add import near other components)
- Test: `packages/main/cypress/specs/Tooltip.cy.tsx`

- [ ] **Step 1: Write the failing test**

Create `packages/main/cypress/specs/Tooltip.cy.tsx`:

```tsx
import Tooltip from "../../src/Tooltip.js";
import Button from "../../src/Button.js";

describe("Tooltip", () => {
	it("renders its text into the popover content", () => {
		cy.mount(
			<>
				<Button id="opener">Open</Button>
				<Tooltip id="tt" opener="opener" text="Hello world"></Tooltip>
			</>
		);

		cy.get("#tt").then($el => {
			($el[0] as Tooltip).openTooltip();
		});

		// The text is slotted into the popover but lives in the tooltip's shadow root.
		cy.get("#tt")
			.shadow()
			.find(".ui5-tooltip-text")
			.should("contain.text", "Hello world");

		cy.get("#tt")
			.shadow()
			.find("[ui5-popover]")
			.should("have.attr", "open");
	});
});
```

> Note: the tooltip text is slotted into the popover's default slot, so it renders
> visually inside the popover but lives in the **tooltip's** shadow root — assert
> on `.ui5-tooltip-text` in the tooltip's shadow, not inside the popover's shadow.

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Tooltip.cy.tsx`
Expected: FAIL — module `../../src/Tooltip.js` not found / `openTooltip` not a function.

- [ ] **Step 3: Create the CSS file**

Create `packages/main/src/themes/Tooltip.css` (minimal for now; full styling in Task 5):

```css
.ui5-tooltip-aria-text {
	position: absolute;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	white-space: nowrap;
}
```

- [ ] **Step 4: Create the template**

Create `packages/main/src/TooltipTemplate.tsx`:

```tsx
import type Tooltip from "./Tooltip.js";
import Popover from "./Popover.js";

export default function TooltipTemplate(this: Tooltip) {
	return (
		<>
			<Popover
				class="ui5-tooltip-popover"
				opener={this.opener}
				placement={this.placement}
				open={this._open}
				onClose={this._onPopoverClose}
			>
				<span class="ui5-tooltip-text">{this.text}</span>
			</Popover>
			{this.text &&
				<span id={this._anchorId} role="tooltip" class="ui5-tooltip-aria-text">
					{this.text}
				</span>
			}
		</>
	);
}
```

- [ ] **Step 5: Create the component**

Create `packages/main/src/Tooltip.ts`:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import type PopoverPlacement from "./types/PopoverPlacement.js";

// Template
import TooltipTemplate from "./TooltipTemplate.js";
// Styles
import TooltipCss from "./generated/themes/Tooltip.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-tooltip` shows a short, non-interactive text near an element to
 * provide supplementary information. It opens on hover, keyboard focus and
 * long-press, and closes on Escape, activation or when the pointer/focus leaves.
 *
 * ### Usage
 *
 * ```html
 * <ui5-button id="btn">Save</ui5-button>
 * <ui5-tooltip opener="btn" text="Save the document"></ui5-tooltip>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Tooltip.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.x
 */
@customElement({
	tag: "ui5-tooltip",
	renderer: jsxRenderer,
	template: TooltipTemplate,
	styles: TooltipCss,
})
class Tooltip extends UI5Element {
	/**
	 * Defines the tooltip text.
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	/**
	 * Defines the element the tooltip reacts to and docks against,
	 * by id (within the same root) or a DOM reference.
	 * @default undefined
	 * @public
	 */
	@property({ converter: DOMReferenceConverter })
	opener?: HTMLElement | string;

	/**
	 * Defines the placement of the tooltip relative to its opener.
	 * @default "Top"
	 * @public
	 */
	@property()
	placement: `${PopoverPlacement}` = "Top";

	/**
	 * Id for the in-shadow `role="tooltip"` ARIA anchor. The owning element
	 * sets this to a known value and references the same id via
	 * `aria-describedby`. Both must live in the same shadow root.
	 * @default ""
	 * @public
	 */
	@property()
	ariaAnchorId = "";

	/**
	 * Controls popover visibility.
	 * @private
	 */
	@property({ type: Boolean })
	_open = false;

	/**
	 * Opens the tooltip against its opener.
	 * @public
	 */
	openTooltip(): void {
		this._open = true;
	}

	/**
	 * Closes the tooltip.
	 * @public
	 */
	closeTooltip(): void {
		this._open = false;
	}

	/**
	 * Whether the tooltip is currently open.
	 * @public
	 */
	isOpen(): boolean {
		return this._open;
	}

	// Falls back to an auto id when the owner did not provide one.
	get _anchorId(): string {
		return this.ariaAnchorId || `${this._id}-aria`;
	}

	_onPopoverClose = (): void => {
		this._open = false;
	};
}

Tooltip.define();

export default Tooltip;
```

- [ ] **Step 6: Register in the bundle**

In `packages/main/src/bundle.esm.ts`, add alongside the other imports (keep alphabetical-ish grouping near Title/Toast at line ~128):

```ts
import Tooltip from "./Tooltip.js";
```

- [ ] **Step 7: Generate CSS (if dev server not running)**

Run from repo root: `yarn generate`
Expected: creates `packages/main/src/generated/themes/Tooltip.css.js`.

- [ ] **Step 8: Run test to verify it passes**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Tooltip.cy.tsx`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add packages/main/src/Tooltip.ts packages/main/src/TooltipTemplate.tsx packages/main/src/themes/Tooltip.css packages/main/src/bundle.esm.ts packages/main/cypress/specs/Tooltip.cy.tsx packages/main/src/generated/themes/Tooltip.css.js
git commit -m "feat(ui5-tooltip): scaffold tooltip component wrapping popover"
```

---

## Task 2: placement forwarding

**Files:**
- Test: `packages/main/cypress/specs/Tooltip.cy.tsx`

> Note: `openTooltip`/`closeTooltip`/`isOpen` behavior and the `role="tooltip"`
> aria-anchor contract were already covered in Task 1 (expanded during code
> review). This task only adds the remaining placement-forwarding test.

- [ ] **Step 1: Write the failing test**

Append to `packages/main/cypress/specs/Tooltip.cy.tsx` inside `describe("Tooltip", ...)`:

```tsx
it("forwards placement to the popover", () => {
	cy.mount(
		<>
			<Button id="opener">Open</Button>
			<Tooltip id="tt" opener="opener" text="Info" placement="Bottom"></Tooltip>
		</>
	);

	cy.get("#tt").then($el => {
		($el[0] as Tooltip).openTooltip();
	});

	cy.get("#tt")
		.shadow()
		.find("[ui5-popover]")
		.should("have.attr", "placement", "Bottom");
});
```

- [ ] **Step 2: Run tests to verify status**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Tooltip.cy.tsx`
Expected: the placement test PASSES if `placement` is reflected. If it does not appear as an attribute, continue to Step 3.

- [ ] **Step 3: Ensure placement is reflected**

`@property()` string props reflect to attributes by default in this framework, so `placement` should appear on `<ui5-popover>`. If the test showed it missing, verify the template passes `placement={this.placement}` (it does from Task 1). No code change expected.

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Tooltip.cy.tsx`
Expected: PASS (all tests in the spec).

- [ ] **Step 5: Commit**

```bash
git add packages/main/cypress/specs/Tooltip.cy.tsx
git commit -m "test(ui5-tooltip): cover placement forwarding"
```

---

## Task 3: Gesture helper — hover and focus open/close

**Files:**
- Create: `packages/main/src/TooltipGestures.ts`
- Modify: `packages/main/src/Tooltip.ts` (wire helper lifecycle)
- Test: `packages/main/cypress/specs/Tooltip.cy.tsx`

- [ ] **Step 1: Write the failing tests**

Append to `packages/main/cypress/specs/Tooltip.cy.tsx`:

```tsx
it("opens on hover after delay and closes on mouseleave", () => {
	cy.mount(
		<>
			<Button id="opener">Hover me</Button>
			<Tooltip id="tt" opener="opener" text="Hover info" delay={0}></Tooltip>
		</>
	);

	cy.get("#opener").realHover();
	cy.get("#tt").should($el => {
		expect(($el[0] as Tooltip).isOpen()).to.equal(true);
	});

	cy.get("body").realHover({ position: "topLeft" });
	cy.get("#tt").should($el => {
		expect(($el[0] as Tooltip).isOpen()).to.equal(false);
	});
});

it("opens on keyboard focus and closes on Escape", () => {
	cy.mount(
		<>
			<Button id="opener">Focus me</Button>
			<Tooltip id="tt" opener="opener" text="Focus info" delay={0}></Tooltip>
		</>
	);

	cy.get("#opener").shadow().find("button").focus();
	cy.get("#tt").should($el => {
		expect(($el[0] as Tooltip).isOpen()).to.equal(true);
	});

	cy.get("#opener").realPress("Escape");
	cy.get("#tt").should($el => {
		expect(($el[0] as Tooltip).isOpen()).to.equal(false);
	});
});
```

> Note: `realHover`/`realPress` come from `cypress-real-events`, already used in this repo. If focus-open proves flaky under `:focus-visible` in the test runner, the gesture still gates on `:focus-visible`; `realPress("Tab")` into the control is the reliable way to produce focus-visible. Prefer tabbing if `.focus()` does not yield `:focus-visible`.

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Tooltip.cy.tsx`
Expected: FAIL — `delay` is not a property yet and no gesture wiring, so hover/focus do not open.

- [ ] **Step 3: Add the `delay` property to `Tooltip.ts`**

In `packages/main/src/Tooltip.ts`, add after `placement`:

```ts
	/**
	 * Delay in milliseconds before the tooltip opens or closes on hover and
	 * keyboard focus. Touch and Escape act immediately.
	 * @default 500
	 * @public
	 */
	@property({ type: Number })
	delay = 500;
```

- [ ] **Step 4: Create the gesture helper**

Create `packages/main/src/TooltipGestures.ts`:

```ts
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";

type TooltipGesturesConfig = {
	opener: HTMLElement;
	onOpen: () => void;
	onClose: () => void;
	isPendingOrOpen: () => boolean;
	getDelay: () => number;
};

// Long-press threshold in ms on touch devices.
const LONG_PRESS_MS = 500;

/**
 * Translates raw DOM gestures on the opener (hover, focus, long-press, Escape,
 * activation) into open/close calls. Not a UI5Element — a plain lifecycle object
 * owned by the Tooltip.
 */
class TooltipGestures {
	_config: TooltipGesturesConfig;
	_openTimer?: ReturnType<typeof setTimeout>;
	_closeTimer?: ReturnType<typeof setTimeout>;
	_longPressTimer?: ReturnType<typeof setTimeout>;

	constructor(config: TooltipGesturesConfig) {
		this._config = config;
		this._attach();
	}

	_attach() {
		const el = this._config.opener;
		el.addEventListener("mouseover", this._onMouseOver);
		el.addEventListener("mouseout", this._onMouseOut);
		el.addEventListener("mousedown", this._onMouseDown);
		el.addEventListener("focusin", this._onFocusIn);
		el.addEventListener("focusout", this._onFocusOut);
		el.addEventListener("keydown", this._onKeyDown);
		el.addEventListener("touchstart", this._onTouchStart);
		el.addEventListener("touchmove", this._onTouchEnd);
		el.addEventListener("touchend", this._onTouchEnd);
		el.addEventListener("touchcancel", this._onTouchEnd);
	}

	destroy() {
		const el = this._config.opener;
		el.removeEventListener("mouseover", this._onMouseOver);
		el.removeEventListener("mouseout", this._onMouseOut);
		el.removeEventListener("mousedown", this._onMouseDown);
		el.removeEventListener("focusin", this._onFocusIn);
		el.removeEventListener("focusout", this._onFocusOut);
		el.removeEventListener("keydown", this._onKeyDown);
		el.removeEventListener("touchstart", this._onTouchStart);
		el.removeEventListener("touchmove", this._onTouchEnd);
		el.removeEventListener("touchend", this._onTouchEnd);
		el.removeEventListener("touchcancel", this._onTouchEnd);
		this._clearTimers();
	}

	_clearTimers() {
		clearTimeout(this._openTimer);
		clearTimeout(this._closeTimer);
		clearTimeout(this._longPressTimer);
	}

	// Deepest active element, but only when it lies within the opener
	// (crossing shadow boundaries, which Node.contains does not).
	_deepActiveElement(): Element | null {
		const active = getActiveElement();
		return active && this._isWithinOpener(active) ? active : null;
	}

	// Whether the node is the opener or sits inside its (possibly nested) shadow tree.
	_isWithinOpener(node: Node): boolean {
		const opener = this._config.opener;
		let current: Node | null = node;
		while (current) {
			if (current === opener) {
				return true;
			}
			const parent: Node | null = current.parentNode;
			current = parent instanceof ShadowRoot ? parent.host : parent;
		}
		return false;
	}

	_scheduleOpen() {
		clearTimeout(this._closeTimer);
		clearTimeout(this._openTimer);
		this._openTimer = setTimeout(() => this._config.onOpen(), this._config.getDelay());
	}

	_scheduleClose() {
		clearTimeout(this._openTimer);
		clearTimeout(this._closeTimer);
		this._closeTimer = setTimeout(() => this._config.onClose(), this._config.getDelay());
	}

	_onMouseOver = () => {
		this._scheduleOpen();
	};

	_onMouseOut = () => {
		this._scheduleClose();
	};

	// Left activation closes immediately; right button is left to the browser.
	_onMouseDown = (e: MouseEvent) => {
		if (e.button === 2) {
			return;
		}
		this._clearTimers();
		this._config.onClose();
	};

	_onFocusIn = () => {
		// Openers often delegate focus into their shadow root (delegatesFocus),
		// so the host never matches :focus-visible. Gate on the deepest active
		// element instead.
		const active = this._deepActiveElement();
		if (active && active.matches(":focus-visible")) {
			this._scheduleOpen();
		}
	};

	_onFocusOut = () => {
		this._scheduleClose();
	};

	_onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			// Always cancel a pending open/close; close if already open.
			this._clearTimers();
			if (this._config.isPendingOrOpen()) {
				this._config.onClose();
			}
			return;
		}
		// Activation (Enter/Space) closes immediately; key still propagates.
		if (e.key === "Enter" || e.key === " ") {
			this._clearTimers();
			this._config.onClose();
		}
		// TODO: focus guard after activation — suppress the immediate focus-reopen
		// that follows Enter/Space activation. Out of scope for this iteration.
	};

	_onTouchStart = () => {
		clearTimeout(this._longPressTimer);
		// Suppress long-press text selection / iOS callout while pending/open.
		this._config.opener.classList.add("ui5-tooltip-suppress-selection");
		this._longPressTimer = setTimeout(() => this._config.onOpen(), LONG_PRESS_MS);
	};

	_onTouchEnd = () => {
		clearTimeout(this._longPressTimer);
		this._config.opener.classList.remove("ui5-tooltip-suppress-selection");
	};
}

export default TooltipGestures;
```

- [ ] **Step 5: Wire the helper into `Tooltip.ts`**

In `packages/main/src/Tooltip.ts`, add the import:

```ts
import TooltipGestures from "./TooltipGestures.js";
```

Add a field and lifecycle hooks (place the field near `_open`, methods after `_onPopoverClose`):

```ts
	_gestures?: TooltipGestures;

	onAfterRendering(): void {
		this._syncGestures();
	}

	onExitDOM(): void {
		this._gestures?.destroy();
		this._gestures = undefined;
	}

	_getOpenerElement(): HTMLElement | null {
		if (this.opener instanceof HTMLElement) {
			return this.opener;
		}
		if (typeof this.opener === "string") {
			const root = this.getRootNode() as Document | ShadowRoot;
			return (root as Document | ShadowRoot).getElementById?.(this.opener) ?? null;
		}
		return null;
	}

	_syncGestures(): void {
		const opener = this._getOpenerElement();
		if (!opener) {
			this._gestures?.destroy();
			this._gestures = undefined;
			return;
		}
		if (this._gestures && this._gestures._config.opener === opener) {
			return;
		}
		this._gestures?.destroy();
		this._gestures = new TooltipGestures({
			opener,
			onOpen: () => { this._open = true; },
			onClose: () => { this._open = false; },
			isPendingOrOpen: () => this._open,
			getDelay: () => this.delay,
		});
	}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Tooltip.cy.tsx`
Expected: PASS. If the focus test is flaky with `.focus()`, switch it to tab into the control with `cy.get("#opener").shadow().find("button").focus()` replaced by `cy.realPress("Tab")` after focusing `body`.

- [ ] **Step 7: Commit**

```bash
git add packages/main/src/TooltipGestures.ts packages/main/src/Tooltip.ts packages/main/cypress/specs/Tooltip.cy.tsx
git commit -m "feat(ui5-tooltip): hover/focus/escape/activation gestures"
```

---

## Task 4: ARIA anchor + same-shadow `aria-describedby` wiring (verified on Button)

**Files:**
- Modify: `packages/main/src/Button.ts`
- Modify: `packages/main/src/ButtonTemplate.tsx`
- Test: `packages/main/cypress/specs/Button.cy.tsx`

- [ ] **Step 1: Write the failing test**

Append to `packages/main/cypress/specs/Button.cy.tsx` (inside the top-level `describe`):

```tsx
describe("Button enhanced tooltip", () => {
	it("renders an enhanced tooltip and wires aria-describedby to a role=tooltip element", () => {
		cy.mount(<Button id="b" tooltip="Save the document">Save</Button>);

		cy.get("#b").shadow().find("[ui5-tooltip]").should("exist");

		cy.get("#b").shadow().find("button").then($btn => {
			const describedby = $btn.attr("aria-describedby");
			expect(describedby, "aria-describedby present").to.be.a("string").and.not.be.empty;

			// The referenced element is in the SAME shadow root and has role=tooltip.
			const root = $btn[0].getRootNode() as ShadowRoot;
			const ids = describedby!.split(/\s+/);
			const anchor = ids
				.map(id => root.getElementById(id))
				.find(el => el && el.getAttribute("role") === "tooltip");
			expect(anchor, "role=tooltip anchor resolvable in same root").to.exist;
			expect(anchor!.textContent).to.contain("Save the document");
		});
	});

	it("does not set the native title attribute", () => {
		cy.mount(<Button id="b2" tooltip="No native title">Save</Button>);
		cy.get("#b2").shadow().find("button").should("not.have.attr", "title");
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Button.cy.tsx`
Expected: FAIL — no `[ui5-tooltip]` in Button shadow, native `title` still present.

- [ ] **Step 3: Add a fixed anchor id + computed describedby to `Button.ts`**

In `packages/main/src/Button.ts`, add a getter for the ARIA anchor id and one
for the `aria-describedby` value (place near the other getters, after the
`buttonTitle` logic). The anchor id is a fixed, button-id-scoped string so the
host and the tooltip agree on it without cross-component querying:

```ts
	// Fixed id for the enhanced tooltip's ARIA anchor, scoped to this button.
	get _tooltipAnchorId(): string {
		return `${this._id}-tooltip-aria`;
	}

	get _ariaDescribedByTooltip(): string | undefined {
		// The enhanced tooltip renders its role="tooltip" anchor with this id
		// inside the SAME shadow root, so a same-root id reference resolves.
		return this.buttonTitle ? this._tooltipAnchorId : undefined;
	}
```

> `_id` is an auto-generated `ui5wc_N` value on `UI5Element`; it does NOT follow
> a template-assigned `id` attribute. So the host must NOT try to derive the
> anchor id from the tooltip's own `_id`. Instead it passes the id down via the
> tooltip's public `ariaAnchorId` property (Step 4), keeping both sides in sync.

- [ ] **Step 4: Embed the tooltip in `ButtonTemplate.tsx` and wire aria-describedby**

In `packages/main/src/ButtonTemplate.tsx`:

1. Add the import at the top:

```tsx
import Tooltip from "./Tooltip.js";
```

2. Replace `title={this.buttonTitle}` on the `<button>` with an `aria-describedby`:

```tsx
			aria-describedby={this._ariaDescribedByTooltip}
```

(Remove the `title={this.buttonTitle}` line.)

3. After the closing `</button>` (and before `{this.loading && ...}` or at the end of the fragment), add the embedded tooltip, rendered only when there is tooltip text. Pass the anchor id down so the tooltip renders its `role="tooltip"` span with exactly that id:

```tsx
		{this.buttonTitle &&
			<Tooltip
				text={this.buttonTitle}
				ariaAnchorId={this._tooltipAnchorId}
				opener={this.getFocusDomRef()}
			/>
		}
```

> `getFocusDomRef()` returns the inner `<button>`. The tooltip's gesture helper
> and popover both dock to it. Because the tooltip is in Button's shadow root,
> its anchor span (id = `_tooltipAnchorId`) is reachable by the button's
> `aria-describedby` in the same root.

- [ ] **Step 5: Run test to verify it passes**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Button.cy.tsx`
Expected: PASS for the two new tests. Run the full Button spec to catch regressions:
`cd packages/main && yarn test:cypress:single cypress/specs/Button.cy.tsx`

> If pre-existing Button tests assert on `title=` attribute, update them to the new tooltip wiring as part of this task (search the spec for `"title"`).

- [ ] **Step 6: Commit**

```bash
git add packages/main/src/Button.ts packages/main/src/ButtonTemplate.tsx packages/main/cypress/specs/Button.cy.tsx
git commit -m "feat(ui5-button): use enhanced tooltip with aria-describedby anchor"
```

---

## Task 5: Visual design — port OpenUI5 tooltip styling

**Files:**
- Modify: `packages/main/src/themes/Tooltip.css`
- Create: `packages/main/test/pages/Tooltip.html`

- [ ] **Step 1: Write the full styling**

Replace `packages/main/src/themes/Tooltip.css` with the OpenUI5-matched overrides. These target the wrapped popover via `::part` and the slotted content. Keep the ARIA-hidden span rule.

```css
/* ARIA anchor: visually hidden, screen-reader only. */
.ui5-tooltip-aria-text {
	position: absolute;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	overflow: hidden;
	white-space: nowrap;
}

/* Suppress long-press text selection / iOS callout on the opener during touch. */
.ui5-tooltip-suppress-selection {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	user-select: none;
}

/* Overstyle the wrapped popover to the OpenUI5 tooltip look. */
.ui5-tooltip-popover::part(content) {
	padding: 5px 0.5rem;
	background-color: var(--sapIndicationColor_9_Background);
	color: var(--sapContent_ContrastTextColor);
	font-size: var(--sapFontSmallSize);
}

.ui5-tooltip-popover::part(header),
.ui5-tooltip-popover::part(footer) {
	display: none;
}

.ui5-tooltip-text {
	display: block;
	max-width: 17rem;
	min-height: 1.5rem;
	color: var(--sapContent_ContrastTextColor);
	font-size: var(--sapFontSmallSize);
	overflow-wrap: break-word;
}
```

> The popover root background/border-radius and the arrow fill come from Popover's own parts. During browser verification (Step 3), inspect which `::part`s or CSS custom properties the popover exposes for background and arrow (`part="content"`, arrow element) and extend the overrides so the **whole** bubble + arrow use `--sapIndicationColor_9_Background` and the 0.25rem radius. If the popover arrow cannot be recolored via parts/vars, add a tooltip-specific arrow fallback — but try parts first. Record what worked in a code comment.

- [ ] **Step 2: Create the manual demo page**

Create `packages/main/test/pages/Tooltip.html`:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tooltip test page</title>
	<script type="module" src="../../src/Button.ts"></script>
	<script type="module" src="../../src/Title.ts"></script>
	<script type="module" src="../../src/Tooltip.ts"></script>
	<style>
		body { padding: 4rem; font-family: sans-serif; display: flex; flex-direction: column; gap: 2rem; align-items: flex-start; }
		.narrow { width: 120px; }
	</style>
</head>
<body>
	<ui5-button tooltip="Save the current document">Save</ui5-button>
	<ui5-button icon="edit" tooltip="Edit"></ui5-button>

	<ui5-title class="narrow" wrapping-type="None">A very long title that will be truncated</ui5-title>
	<ui5-title wrapping-type="None">Short title</ui5-title>

	<ui5-button id="standalone">Standalone opener</ui5-button>
	<ui5-tooltip opener="standalone" text="Standalone tooltip" placement="Bottom"></ui5-tooltip>
</body>
</html>
```

- [ ] **Step 3: Verify in the browser**

With the dev server running (`yarn start` from repo root), open `http://localhost:8080/test-resources/main/pages/Tooltip.html` (adjust to the dev server's actual page path; find it by checking where other `test/pages/*.html` are served). Confirm against OpenUI5's tooltip:
- dark bubble (`--sapIndicationColor_9_Background`), white text, small font, ~0.25rem radius;
- arrow matches the bubble color and points at the opener;
- opens on hover after delay, on keyboard focus (Tab to the button), closes on Escape/mouseleave;
- `aria-describedby` resolves (DevTools: inspect the button, follow the id to the `role="tooltip"` span in the same shadow root).

Fix CSS until it matches. This step is iterative and has no pass/fail command — it is visual.

- [ ] **Step 4: Commit**

```bash
git add packages/main/src/themes/Tooltip.css packages/main/src/generated/themes/Tooltip.css.js packages/main/test/pages/Tooltip.html
git commit -m "style(ui5-tooltip): match OpenUI5 tooltip visual design"
```

---

## Task 6: Title — show tooltip only when truncated

**Files:**
- Modify: `packages/main/src/Title.ts`
- Modify: `packages/main/src/TitleTemplate.tsx`
- Test: `packages/main/cypress/specs/Title.cy.tsx`

- [ ] **Step 1: Write the failing tests**

Append to `packages/main/cypress/specs/Title.cy.tsx`:

```tsx
describe("Title enhanced tooltip (truncation)", () => {
	it("shows a tooltip with the full text when truncated", () => {
		cy.mount(
			<Title id="t" wrappingType="None" style="width: 80px">
				A very long title that overflows its box
			</Title>
		);

		cy.get("#t").shadow().find("[ui5-tooltip]").should($tt => {
			expect($tt.attr("text")).to.contain("A very long title");
		});

		cy.get("#t").shadow().find("button, .ui5-title-root").then($root => {
			const describedby = $root.attr("aria-describedby");
			expect(describedby, "aria-describedby present when truncated").to.be.a("string").and.not.be.empty;
		});
	});

	it("does not show a tooltip when the text fits", () => {
		cy.mount(
			<Title id="t2" wrappingType="None" style="width: 600px">
				Short
			</Title>
		);

		cy.get("#t2").shadow().find("[ui5-tooltip]").should($tt => {
			// Either not rendered, or rendered with empty text.
			if ($tt.length) {
				expect($tt.attr("text") || "").to.equal("");
			}
		});
	});
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Title.cy.tsx`
Expected: FAIL — no `[ui5-tooltip]` in Title shadow.

- [ ] **Step 3: Add truncation detection to `Title.ts`**

In `packages/main/src/Title.ts`:

1. Add imports:

```ts
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Tooltip from "./Tooltip.js";
```

> Verify the ResizeHandler import path: run `grep -rn "delegate/ResizeHandler" packages/main/src | head -1` and use the path that resolves. If the project uses a different resize utility, use that instead.

2. Add a private reactive field for the computed tooltip text and a resize handler, inside the class:

```ts
	/**
	 * Full text exposed through the tooltip, non-empty only when the title is
	 * truncated. Drives both the visible tooltip and its ARIA anchor.
	 * @private
	 */
	@property({ noAttribute: true })
	_truncatedText = "";

	_titleResizeHandler = this._updateTruncation.bind(this);

	onEnterDOM(): void {
		ResizeHandler.register(this, this._titleResizeHandler);
	}

	onExitDOM(): void {
		ResizeHandler.deregister(this, this._titleResizeHandler);
	}

	onAfterRendering(): void {
		this._updateTruncation();
	}

	_updateTruncation(): void {
		const root = this.getDomRef()?.querySelector<HTMLElement>(".ui5-title-root");
		if (!root) {
			this._truncatedText = "";
			return;
		}
		const truncated = root.scrollWidth > root.clientWidth;
		this._truncatedText = truncated ? (this.textContent || "").trim() : "";
	}

	get _tooltipAnchorId(): string {
		return `${this._id}-tooltip-aria`;
	}

	get _ariaDescribedByTooltip(): string | undefined {
		return this._truncatedText ? this._tooltipAnchorId : undefined;
	}
```

> `getDomRef()` returns the component root; `.ui5-title-root` is the `<h{n}>` element. Confirm `getDomRef` exists on `UI5Element` (it does — used across the codebase).

- [ ] **Step 4: Embed the tooltip in `TitleTemplate.tsx`**

In `packages/main/src/TitleTemplate.tsx`:

1. Add imports:

```tsx
import Tooltip from "./Tooltip.js";
```

2. Add `aria-describedby` to each `<h{n} class="ui5-title-root">` opening tag. Since there are six, add it to the shared attribute set. Modify the `title` function so every heading gets `aria-describedby={this._ariaDescribedByTooltip}`. Example for H1 (apply to all six and the default):

```tsx
		case "H1":
			return (
				<h1 class="ui5-title-root" aria-describedby={this._ariaDescribedByTooltip}>
					{ titleInner.call(this) }
				</h1>
			);
```

3. In the outer fragment returned by `TitleTemplate`, add the embedded tooltip after the title, rendered only when truncated:

```tsx
export default function TitleTemplate(this: Title) {
	return (
		<>
			{ title.call(this, this.level) }
			{this._truncatedText &&
				<Tooltip
					text={this._truncatedText}
					ariaAnchorId={this._tooltipAnchorId}
					opener={this.getDomRef()?.querySelector(".ui5-title-root") as HTMLElement}
				/>
			}
		</>
	);
}
```

> The opener is the `.ui5-title-root` element (the visually-truncated box). `getDomRef()` is available during template execution after first render; on the first render the tooltip renders once `_truncatedText` is set in `onAfterRendering` → triggers a re-render. This two-pass is expected.

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd packages/main && yarn test:cypress:single cypress/specs/Title.cy.tsx`
Expected: PASS. If `onAfterRendering` is not yet declared on `Title` (it extends `UI5Element`), the hooks added in Step 3 provide it. Run the full Title spec to catch regressions.

- [ ] **Step 6: Verify truncation in the browser**

On `Tooltip.html` (Task 5 page), hover the narrow long title → tooltip with full text; hover the short title → no tooltip. Resize the window narrower over a borderline title → tooltip appears when it starts truncating.

- [ ] **Step 7: Commit**

```bash
git add packages/main/src/Title.ts packages/main/src/TitleTemplate.tsx packages/main/cypress/specs/Title.cy.tsx
git commit -m "feat(ui5-title): show enhanced tooltip only when truncated"
```

---

## Task 7: Documentation sample + typecheck + final spec run

**Files:**
- Create: `packages/website/docs/_samples/main/Tooltip/Basic/sample.html`
- Create: `packages/website/docs/_samples/main/Tooltip/Basic/main.js`
- Create: `packages/website/docs/_samples/main/Tooltip/Basic/Basic.md`

- [ ] **Step 1: Create the website sample**

Create `packages/website/docs/_samples/main/Tooltip/Basic/sample.html`:

```html
<!-- playground-fold -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Sample</title>
</head>
<body style="background-color: var(--sapBackgroundColor)">
<!-- playground-fold-end -->

	<ui5-button id="save">Save</ui5-button>
	<ui5-tooltip opener="save" text="Save the current document"></ui5-tooltip>

<!-- playground-fold -->
	<script type="module" src="main.js"></script>
</body>
</html>
<!-- playground-fold-end -->
```

Create `packages/website/docs/_samples/main/Tooltip/Basic/main.js`:

```javascript
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Tooltip.js";
```

Create `packages/website/docs/_samples/main/Tooltip/Basic/Basic.md`:

```markdown
import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

<Editor html={html} js={js} />
```

- [ ] **Step 2: Typecheck the whole build**

Run from repo root: `yarn ts`
Expected: no TypeScript errors in the files touched. Fix any type issues (e.g. `opener` accepting `HTMLElement | undefined`).

- [ ] **Step 3: Run all three component specs for regressions**

Run:
```bash
cd packages/main
yarn test:cypress:single cypress/specs/Tooltip.cy.tsx
yarn test:cypress:single cypress/specs/Button.cy.tsx
yarn test:cypress:single cypress/specs/Title.cy.tsx
```
Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add packages/website/docs/_samples/main/Tooltip
git commit -m "docs(ui5-tooltip): add basic website sample"
```

---

## Self-Review Notes

- **Spec coverage:** component + API (Tasks 1–3), popover wrap (Task 1), ARIA anchor / same-shadow `aria-describedby` (Task 4), gestures incl. text-selection suppression (Task 3/5 CSS), focus-guard noted as TODO (Task 3), visual design (Task 5), Button integration dropping native `title` (Task 4), Title truncation-only tooltip (Task 6), tests + demo page + sample (Tasks 2–7). All spec sections map to a task.
- **Open verification items flagged in spec** (cross-shadow ARIA, popover arrow restyle, popover min-size) are exercised in Task 4 test and Task 5 browser step; if the popover arrow can't be recolored via parts, the Task 5 note authorizes a tooltip-specific arrow fallback.
- **Type consistency:** `_tooltipAnchorId`, `_ariaDescribedByTooltip`, `ariaAnchorId` (public Tooltip prop), `_truncatedText`, `openTooltip`/`closeTooltip`/`isOpen` are used consistently across Tasks 1–6.
- **Risk — id determinism (RESOLVED):** `_id` is an auto-generated `ui5wc_N` on `UI5Element` and does NOT follow a template-assigned `id`. So the host does not derive the anchor id from the tooltip; instead `<ui5-tooltip>` exposes a public `ariaAnchorId` input, and both Button and Title pass their own `_tooltipAnchorId` (= `${_id}-tooltip-aria`) down to it AND reference the same id via `aria-describedby`. Tooltip's `_anchorId` getter uses `ariaAnchorId` when set, falling back to `${_id}-aria`.
