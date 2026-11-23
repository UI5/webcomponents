# Tooltip Delegation Model — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `<ui5-tooltip opener="id">` model with a framework-agnostic `data-ui5-has-tooltip` + `aria-describedby` + `<ui5-tooltip>` model driven by one document-level set of delegated gesture listeners.

**Architecture:** The opener names its tooltip via `data-ui5-has-tooltip="<id>"` and links ARIA via author-owned `aria-describedby="<id>"`. `<ui5-tooltip id="<id>">text</ui5-tooltip>` holds the text as light-DOM child content (the `aria-describedby` source), sets `role="tooltip"` on its host via `ElementInternals`, slots the text into an internal `<ui5-popover>` for the visual, and resolves its opener by querying its root for `[data-ui5-has-tooltip="<id>"]`. A singleton `TooltipDelegation` attaches document-level listeners when the first tooltip connects and detaches when the last disconnects; on each event it walks the composed tree from the target to the nearest opener and drives the matching tooltip.

**Tech Stack:** TypeScript, UI5 Web Components base (`UI5Element`, JSX renderer, decorators), `ui5-popover`, `ElementInternals`, Cypress component tests.

**Reference spec:** `docs/superpowers/specs/2026-11-23-tooltip-delegation-design.md`

**Commands reference (run from `packages/main`):**
- Single Cypress spec: `yarn test:cypress:single cypress/specs/Tooltip.cy.tsx`
- TypeScript check (from repo root): `yarn ts`
- Dev server (from repo root, port 8080 only): `yarn start`

---

## File structure

**Create:**
- `packages/main/src/TooltipDelegation.ts` — document-level gesture singleton (registry + delegated listeners + composed-tree walk).

**Rewrite:**
- `packages/main/src/Tooltip.ts` — drop `text`/`opener`; light-DOM text content; `role="tooltip"` via internals; register/unregister with the singleton; resolve opener by `data-ui5-has-tooltip`.
- `packages/main/src/TooltipTemplate.tsx` — slot child text into the popover; dock against resolved opener.
- `packages/main/src/themes/Tooltip.css` — host visually-hidden (sr-only) so light-DOM text stays in the a11y tree but not visible; popover text style unchanged.
- `packages/main/test/pages/Tooltip.html` — standalone test page for the new model.
- `packages/main/cypress/specs/Tooltip.cy.tsx` — specs for the new model.

**Delete:**
- `packages/main/src/TooltipGestures.ts` — replaced by `TooltipDelegation.ts`.
- `tooltip-api-research.md` (repo root, identical dup of the specs copy).

**Modify (component migration — stage 2):**
- Direct `<Tooltip>` sites: `ButtonTemplate.tsx`, `LinkTemplate.tsx`, `IconTemplate.tsx`, `SwitchTemplate.tsx`, `SegmentedButtonItemTemplate.tsx`, `RatingIndicatorTemplate.tsx`, `ColorPaletteItemTemplate.tsx`, `FileUploaderTemplate.tsx`, `InputIconTemplate.tsx`, `TitleTemplate.tsx`.
  (`AvatarBadge`, `Breadcrumbs`, `Carousel`, and `FileUploader`'s inner icons delegate to `ui5-icon`'s `showTooltip`, so migrating `IconTemplate.tsx` covers them.)
- Specs: `Button.cy.tsx`, `Link.cy.tsx`, `Switch.cy.tsx`, `SegmentedButton.cy.tsx`, `RatingIndicator.cy.tsx`, `ColorPalette.cy.tsx`, `Icon.cy.tsx`, `Title.cy.tsx`.

**Docs:**
- `docs/internal/Tooltip.md` — public-facing API doc (new).
- `docs/internal/Tooltip-stats.md` — statistics (new).
- `packages/website/docs/_samples/main/Tooltip/Basic/*` — update sample.

**Retire (cleanup, final task):**
- `docs/superpowers/specs/2026-10-30-enhanced-tooltip-design.md`, `docs/superpowers/plans/2026-10-30-enhanced-tooltip.md`, `docs/superpowers/specs/new-proposal.md`, `docs/superpowers/specs/old-tooltip-api-research.md`, `docs/superpowers/specs/old-tooltip-factory-and-react-hooks.md`.

---

## Task 1: Statistics doc (no code, no dependency)

**Files:**
- Create: `docs/internal/Tooltip-stats.md`

- [ ] **Step 1: Write the stats doc** using the surveyed inventory (21 components with a public `tooltip` property; 21 using native `title`; interactive/non-interactive split). Content is in the "Statistics content" appendix at the end of this plan — paste it verbatim.

- [ ] **Step 2: Commit**

```bash
git add docs/internal/Tooltip-stats.md
git commit -m "docs(ui5-tooltip): add tooltip/title usage statistics"
```

---

## Task 2: `TooltipDelegation` singleton

**Files:**
- Create: `packages/main/src/TooltipDelegation.ts`
- Test: covered via `Tooltip.cy.tsx` in Task 5 (the singleton has no standalone test surface; it is exercised through tooltip gestures).

**Interface this task defines (used by Task 3):**
- `registerTooltip(tooltip: ITooltipTarget): void`
- `deregisterTooltip(tooltip: ITooltipTarget): void`
- `ITooltipTarget` = `{ id: string; getRootNode(): Node; openTooltip(): void; closeTooltip(): void; isOpen(): boolean; delay: number; }` (satisfied by the `Tooltip` component).

- [ ] **Step 1: Write the singleton**

```ts
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";

/**
 * Minimal view of a `<ui5-tooltip>` the delegation needs.
 */
interface ITooltipTarget {
	id: string;
	getRootNode(): Node;
	openTooltip(): void;
	closeTooltip(): void;
	isOpen(): boolean;
	delay: number;
}

const OPENER_ATTR = "data-ui5-has-tooltip";
const LONG_PRESS_MS = 500;

// Registered tooltips, keyed by id for opener → tooltip lookup.
const registry = new Map<string, ITooltipTarget>();

let openTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;
let longPressTimer: ReturnType<typeof setTimeout> | undefined;
let activeTooltip: ITooltipTarget | undefined;

// Walk the composed tree from `node` up to the nearest [data-ui5-has-tooltip],
// crossing shadow boundaries (which `.closest()` does not).
function closestOpener(node: Node | null): HTMLElement | undefined {
	let current: Node | null = node;
	while (current) {
		if (current instanceof HTMLElement && current.hasAttribute(OPENER_ATTR)) {
			return current;
		}
		const parent: Node | null = current.parentNode;
		current = parent instanceof ShadowRoot ? parent.host : parent;
	}
	return undefined;
}

// Resolve the tooltip an opener points at, matching root scope.
function tooltipForOpener(opener: HTMLElement): ITooltipTarget | undefined {
	const id = opener.getAttribute(OPENER_ATTR);
	if (!id) {
		return undefined;
	}
	const tooltip = registry.get(id);
	// Same-root check: the id reference resolves within the opener's root,
	// mirroring aria-describedby IDREF scoping.
	if (tooltip && tooltip.getRootNode() === opener.getRootNode()) {
		return tooltip;
	}
	return undefined;
}

// Whether `node` is or sits inside `opener` (crossing shadow boundaries).
function isWithin(node: Node, opener: HTMLElement): boolean {
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

function clearTimers() {
	clearTimeout(openTimer);
	clearTimeout(closeTimer);
	clearTimeout(longPressTimer);
}

function scheduleOpen(tooltip: ITooltipTarget) {
	clearTimeout(closeTimer);
	clearTimeout(openTimer);
	activeTooltip = tooltip;
	openTimer = setTimeout(() => tooltip.openTooltip(), tooltip.delay);
}

function scheduleClose(tooltip: ITooltipTarget) {
	clearTimeout(openTimer);
	clearTimeout(closeTimer);
	closeTimer = setTimeout(() => tooltip.closeTooltip(), tooltip.delay);
}

const onMouseOver = (e: Event) => {
	const opener = closestOpener(e.target as Node);
	const tooltip = opener && tooltipForOpener(opener);
	if (tooltip) {
		scheduleOpen(tooltip);
	}
};

const onMouseOut = (e: Event) => {
	const opener = closestOpener(e.target as Node);
	const tooltip = opener && tooltipForOpener(opener);
	if (tooltip) {
		scheduleClose(tooltip);
	}
};

// Left activation closes immediately; right button left to the browser.
const onMouseDown = (e: MouseEvent) => {
	if (e.button === 2) {
		return;
	}
	clearTimers();
	activeTooltip?.closeTooltip();
};

const onFocusIn = (e: Event) => {
	const opener = closestOpener(e.target as Node);
	const tooltip = opener && tooltipForOpener(opener);
	if (!tooltip || !opener) {
		return;
	}
	// Openers delegate focus into their shadow root, so the host never matches
	// :focus-visible. Resolve the deepest active element, gate on it, and confirm
	// it is within this opener.
	const active = getActiveElement();
	if (active && isWithin(active, opener) && active.matches(":focus-visible")) {
		scheduleOpen(tooltip);
	}
};

const onFocusOut = (e: Event) => {
	const opener = closestOpener(e.target as Node);
	const tooltip = opener && tooltipForOpener(opener);
	if (tooltip) {
		scheduleClose(tooltip);
	}
};

const onKeyDown = (e: KeyboardEvent) => {
	if (e.key === "Escape") {
		clearTimers();
		activeTooltip?.closeTooltip();
		return;
	}
	// Activation closes immediately; the key still propagates.
	if (e.key === "Enter" || e.key === " ") {
		clearTimers();
		activeTooltip?.closeTooltip();
	}
};

const onTouchStart = (e: Event) => {
	const opener = closestOpener(e.target as Node);
	const tooltip = opener && tooltipForOpener(opener);
	if (!tooltip) {
		return;
	}
	clearTimeout(longPressTimer);
	activeTooltip = tooltip;
	longPressTimer = setTimeout(() => tooltip.openTooltip(), LONG_PRESS_MS);
};

const onTouchEnd = () => {
	clearTimeout(longPressTimer);
};

function attach() {
	document.addEventListener("mouseover", onMouseOver);
	document.addEventListener("mouseout", onMouseOut);
	document.addEventListener("mousedown", onMouseDown);
	document.addEventListener("focusin", onFocusIn);
	document.addEventListener("focusout", onFocusOut);
	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("touchstart", onTouchStart);
	document.addEventListener("touchend", onTouchEnd);
	document.addEventListener("touchcancel", onTouchEnd);
}

function detach() {
	document.removeEventListener("mouseover", onMouseOver);
	document.removeEventListener("mouseout", onMouseOut);
	document.removeEventListener("mousedown", onMouseDown);
	document.removeEventListener("focusin", onFocusIn);
	document.removeEventListener("focusout", onFocusOut);
	document.removeEventListener("keydown", onKeyDown);
	document.removeEventListener("touchstart", onTouchStart);
	document.removeEventListener("touchend", onTouchEnd);
	document.removeEventListener("touchcancel", onTouchEnd);
	clearTimers();
}

/**
 * Registers a tooltip and attaches the shared document listeners on the first one.
 */
function registerTooltip(tooltip: ITooltipTarget): void {
	if (registry.size === 0) {
		attach();
	}
	registry.set(tooltip.id, tooltip);
}

/**
 * Deregisters a tooltip and detaches the shared listeners once the last one is gone.
 */
function deregisterTooltip(tooltip: ITooltipTarget): void {
	if (registry.get(tooltip.id) === tooltip) {
		registry.delete(tooltip.id);
	}
	if (activeTooltip === tooltip) {
		activeTooltip = undefined;
	}
	if (registry.size === 0) {
		detach();
	}
}

export { registerTooltip, deregisterTooltip };
export type { ITooltipTarget };
```

- [ ] **Step 2: Commit**

```bash
git add packages/main/src/TooltipDelegation.ts
git commit -m "feat(ui5-tooltip): add document-level gesture delegation singleton"
```

---

## Task 3: Rewrite `Tooltip.ts`

**Files:**
- Modify (rewrite): `packages/main/src/Tooltip.ts`

- [ ] **Step 1: Rewrite the component**

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type PopoverPlacement from "./types/PopoverPlacement.js";
import type PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import { registerTooltip, deregisterTooltip } from "./TooltipDelegation.js";

// Template
import TooltipTemplate from "./TooltipTemplate.js";
// Styles
import TooltipCss from "./generated/themes/Tooltip.css.js";

const OPENER_ATTR = "data-ui5-has-tooltip";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-tooltip` shows a short, non-interactive text near an element to
 * provide supplementary information. The element it describes points at the
 * tooltip with `data-ui5-has-tooltip="<id>"` (to drive the gestures) and
 * `aria-describedby="<id>"` (for the accessible description). The tooltip text
 * is the component's text content.
 *
 * It opens on hover, keyboard focus and long-press, and closes on Escape,
 * activation or when the pointer/focus leaves.
 *
 * ### Usage
 *
 * ```html
 * <button data-ui5-has-tooltip="t1" aria-describedby="t1">Save</button>
 * <ui5-tooltip id="t1">Save the document</ui5-tooltip>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Tooltip.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.29.0
 */
@customElement({
	tag: "ui5-tooltip",
	renderer: jsxRenderer,
	template: TooltipTemplate,
	styles: TooltipCss,
})
class Tooltip extends UI5Element {
	/**
	 * Defines the placement of the tooltip relative to its opener.
	 * @default "Top"
	 * @public
	 */
	@property()
	placement: `${PopoverPlacement}` = "Top";

	/**
	 * Defines the horizontal alignment of the tooltip relative to its opener.
	 * @default "Center"
	 * @public
	 */
	@property()
	horizontalAlign: `${PopoverHorizontalAlign}` = "Center";

	/**
	 * Delay in milliseconds before the tooltip opens or closes on hover and
	 * keyboard focus. Touch and Escape act immediately.
	 * @default 500
	 * @public
	 */
	@property({ type: Number })
	delay = 500;

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
		// Nothing to show without text content.
		if (!this.textContent?.trim()) {
			return;
		}
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

	onEnterDOM(): void {
		// Host carries role=tooltip so aria-describedby targets a valid node.
		this._internals.role = "tooltip";
		registerTooltip(this);
	}

	onExitDOM(): void {
		deregisterTooltip(this);
	}

	_onPopoverClose = (): void => {
		this._open = false;
	};

	// Resolve the element that points at this tooltip within the same root.
	_getOpenerElement(): HTMLElement | null {
		const root = this.getRootNode() as Document | ShadowRoot;
		return root.querySelector?.(`[${OPENER_ATTR}="${this.id}"]`) ?? null;
	}
}

Tooltip.define();

export default Tooltip;
```

- [ ] **Step 2: Rewrite the template**

```tsx
import type Tooltip from "./Tooltip.js";
import Popover from "./Popover.js";

export default function TooltipTemplate(this: Tooltip) {
	return (
		<Popover
			class="ui5-tooltip-popover"
			opener={this._getOpenerElement() ?? undefined}
			placement={this.placement}
			horizontalAlign={this.horizontalAlign}
			open={this._open}
			preventInitialFocus={true}
			onClose={this._onPopoverClose}
		>
			<span class="ui5-tooltip-text">
				<slot></slot>
			</span>
		</Popover>
	);
}
```

- [ ] **Step 3: Update the host CSS** so the light-DOM text stays in the a11y tree but is not visible in flow (the visual is the popover).

File `packages/main/src/themes/Tooltip.css` — add this `:host` block at the top (keep the existing `.ui5-tooltip-popover` / `.ui5-tooltip-text` rules):

```css
/* The light-DOM text is the aria-describedby source; keep it in the
   accessibility tree but out of the visual flow (not display:none, which
   would drop it from the a11y tree). The visible tooltip is the popover. */
:host {
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	padding: 0;
	overflow: hidden;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	white-space: nowrap;
	border: 0;
}
```

- [ ] **Step 4: TypeScript check**

Run (from repo root): `yarn ts`
Expected: no errors referencing `Tooltip.ts`, `TooltipTemplate.tsx`, or `TooltipDelegation.ts`. (Pre-existing errors in migrated component templates are expected until Task 7 — they still reference `text=`/`opener=`. If `yarn ts` is too noisy, defer the full check to after Task 7 and rely on the Cypress specs in Task 5, which compile the specs' own imports.)

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/Tooltip.ts packages/main/src/TooltipTemplate.tsx packages/main/src/themes/Tooltip.css
git commit -m "feat(ui5-tooltip): light-DOM text content + role via internals, opener by data-attr"
```

---

## Task 4: Delete the old gesture engine

**Files:**
- Delete: `packages/main/src/TooltipGestures.ts`

- [ ] **Step 1: Confirm no remaining imports**

Run: `grep -rn "TooltipGestures" packages/main/src`
Expected: no results (Task 3 removed the import from `Tooltip.ts`).

- [ ] **Step 2: Delete and commit**

```bash
git rm packages/main/src/TooltipGestures.ts
git commit -m "refactor(ui5-tooltip): drop per-opener TooltipGestures (replaced by delegation)"
```

---

## Task 5: Rewrite `Tooltip.cy.tsx` for the new model

**Files:**
- Modify (rewrite): `packages/main/cypress/specs/Tooltip.cy.tsx`

- [ ] **Step 1: Write the specs**

```tsx
import Tooltip from "../../src/Tooltip.js";

describe("Tooltip", () => {
	it("slots its text content into the popover when opened", () => {
		cy.mount(
			<>
				<button data-ui5-has-tooltip="tt" aria-describedby="tt">Open</button>
				<Tooltip id="tt">Hello world</Tooltip>
			</>
		);

		cy.get("#tt").then($el => {
			($el[0] as Tooltip).openTooltip();
		});

		cy.get("#tt").shadow().find(".ui5-tooltip-text").should("contain.text", "Hello world");
		cy.get("#tt").shadow().find("[ui5-popover]").should("have.attr", "open");
	});

	it("closeTooltip hides the popover and isOpen reflects state", () => {
		cy.mount(
			<>
				<button data-ui5-has-tooltip="tt" aria-describedby="tt">Open</button>
				<Tooltip id="tt">Hello world</Tooltip>
			</>
		);

		cy.get("#tt").then($el => {
			const tt = $el[0] as Tooltip;
			expect(tt.isOpen()).to.equal(false);
			tt.openTooltip();
			expect(tt.isOpen()).to.equal(true);
		});

		cy.get("#tt").shadow().find("[ui5-popover]").should("have.attr", "open");

		cy.get("#tt").then($el => {
			const tt = $el[0] as Tooltip;
			tt.closeTooltip();
			expect(tt.isOpen()).to.equal(false);
		});

		cy.get("#tt").shadow().find("[ui5-popover]").should("not.have.attr", "open");
	});

	it("sets role=tooltip on its host so aria-describedby targets a valid node", () => {
		cy.mount(<Tooltip id="tt">Some text</Tooltip>);

		cy.get("#tt").should("have.attr", "role", "tooltip");
	});

	it("keeps its text in the accessible tree while closed (not display:none)", () => {
		cy.mount(<Tooltip id="tt">Described text</Tooltip>);

		cy.get("#tt").should("have.text", "Described text");
		cy.get("#tt").then($el => {
			expect(getComputedStyle($el[0]).display).to.not.equal("none");
		});
	});

	it("stays closed when there is no text content", () => {
		cy.mount(
			<>
				<button data-ui5-has-tooltip="tt" aria-describedby="tt">Open</button>
				<Tooltip id="tt"></Tooltip>
			</>
		);

		cy.get("#tt").then($el => {
			($el[0] as Tooltip).openTooltip();
			expect(($el[0] as Tooltip).isOpen()).to.equal(false);
		});

		cy.get("#tt").shadow().find("[ui5-popover]").should("not.have.attr", "open");
	});

	it("opens on hover over the opener after the delay", () => {
		cy.mount(
			<>
				<button data-ui5-has-tooltip="tt" aria-describedby="tt" style="margin:3rem">Hover me</button>
				<Tooltip id="tt" delay={0}>Hovered text</Tooltip>
			</>
		);

		cy.get("[data-ui5-has-tooltip='tt']").trigger("mouseover");
		cy.get("#tt").shadow().find("[ui5-popover]").should("have.attr", "open");
	});

	it("closes on Escape", () => {
		cy.mount(
			<>
				<button data-ui5-has-tooltip="tt" aria-describedby="tt">Opener</button>
				<Tooltip id="tt" delay={0}>Escape text</Tooltip>
			</>
		);

		cy.get("#tt").then($el => ($el[0] as Tooltip).openTooltip());
		cy.get("#tt").shadow().find("[ui5-popover]").should("have.attr", "open");

		cy.get("body").trigger("keydown", { key: "Escape" });
		cy.get("#tt").shadow().find("[ui5-popover]").should("not.have.attr", "open");
	});

	it("resolves the opener by data-ui5-has-tooltip, not opener property", () => {
		cy.mount(
			<>
				<button id="btn" data-ui5-has-tooltip="tt" aria-describedby="tt">Opener</button>
				<Tooltip id="tt" delay={0}>Docked text</Tooltip>
			</>
		);

		cy.get("#tt").then($el => {
			const opener = ($el[0] as Tooltip)._getOpenerElement();
			expect(opener?.id).to.equal("btn");
		});
	});
});
```

- [ ] **Step 2: Run the specs**

Run: `yarn test:cypress:single cypress/specs/Tooltip.cy.tsx`
Expected: all specs PASS.

- [ ] **Step 3: Fix any failures** against the Task 2/3 code (not by weakening assertions). Re-run until green.

- [ ] **Step 4: Commit**

```bash
git add packages/main/cypress/specs/Tooltip.cy.tsx
git commit -m "test(ui5-tooltip): cover data-attr delegation model"
```

---

## Task 6: Standalone test page

**Files:**
- Modify (rewrite): `packages/main/test/pages/Tooltip.html`

- [ ] **Step 1: Write the page**

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tooltip test page</title>
	<script type="module" src="../../src/Button.ts"></script>
	<script type="module" src="../../src/Tooltip.ts"></script>
	<style>
		body { padding: 4rem; font-family: sans-serif; display: flex; flex-direction: column; gap: 2rem; align-items: flex-start; }
	</style>
</head>
<body>
	<h2>Stage 1 — data-ui5-has-tooltip on plain elements</h2>

	<!-- Plain HTML button -->
	<button data-ui5-has-tooltip="t1" aria-describedby="t1">Plain button</button>
	<ui5-tooltip id="t1">Tooltip on a plain button</ui5-tooltip>

	<!-- Plain div -->
	<div tabindex="0" data-ui5-has-tooltip="t2" aria-describedby="t2" style="padding:.5rem;border:1px solid #ccc">Focusable div</div>
	<ui5-tooltip id="t2" placement="Bottom">Tooltip on a div</ui5-tooltip>

	<h2>Stage 2 — component with internal tooltip</h2>

	<!-- Component property path -->
	<ui5-button tooltip="Save the current document">Save</ui5-button>
	<ui5-button icon="edit" tooltip="Edit"></ui5-button>
</body>
</html>
```

- [ ] **Step 2: Verify in browser** — the real-browser verification is delegated to the browser-e2e-tester subagent in Task 9. Do not manually eyeball here.

- [ ] **Step 3: Commit**

```bash
git add packages/main/test/pages/Tooltip.html
git commit -m "docs(ui5-tooltip): standalone test page for delegation model"
```

---

## Task 7: Migrate components to the new model

Each direct `<Tooltip>` site changes from
`<Tooltip text={X} opener={`${this._id}-root`} />`
to the data-attribute + describedby pattern on the opener element plus a child-text tooltip.

**Pattern (apply per site):**

On the opener element (the element currently referenced by `${this._id}-root` etc.), add:
```tsx
data-ui5-has-tooltip={`${this._id}-tooltip`}
aria-describedby={`${this._id}-tooltip`}
```
and change the tooltip to:
```tsx
{/* Review: if this host already exposes the same text as its accessible name
    (e.g. icon-only / aria-label), aria-describedby may double-announce it. */}
<Tooltip id={`${this._id}-tooltip`}>{X}</Tooltip>
```

Where an opener already has an author-facing `aria-describedby` (merge, space-separated) — none of the current sites do, but preserve any existing value by concatenating.

**Per-site map (X = current text expression, opener = current opener id target):**

| File | Opener element (add attrs here) | X (tooltip child text) |
|---|---|---|
| `ButtonTemplate.tsx` | `<button id={`${this._id}-root`}>` | `this.buttonTitle` |
| `LinkTemplate.tsx` | the `-root` anchor/element | `this.tooltip` |
| `IconTemplate.tsx` (both branches) | the `-root` element | `this.effectiveAccessibleName` |
| `SwitchTemplate.tsx` | the `-root` element | `this.tooltip` |
| `SegmentedButtonItemTemplate.tsx` | the `-root` element | `this.tooltip \|\| this.slotTextContent` |
| `RatingIndicatorTemplate.tsx` | the `-root` element | `this.ratingTooltip` |
| `ColorPaletteItemTemplate.tsx` | the `-root` element | `this.getLabelText` |
| `FileUploaderTemplate.tsx` | the `-root` element | `this.inputTitle` |
| `InputIconTemplate.tsx` | the `-root` element | `this.effectiveTitle` |
| `TitleTemplate.tsx` | the `-title` element | existing text (`this.text`/truncated) |

For each file:

- [ ] **Step 1 (ButtonTemplate.tsx, worked example):** On the root `<button>` (lines ~15-48, the one with `id={`${this._id}-root`}`) add the two attributes, and replace the tooltip block (lines ~77-82):

```tsx
// On the <button ...>:
//   data-ui5-has-tooltip={`${this._id}-tooltip`}
//   aria-describedby={`${this._id}-tooltip`}
// Replace the Tooltip block:
{this.buttonTitle &&
	// Review: icon-only buttons expose buttonTitle as their accessible name via
	// aria-label (see Button.ts ariaDescriptionText guard); aria-describedby to the
	// same text can double-announce. Guarded in Button.ts; re-check if that changes.
	<Tooltip id={`${this._id}-tooltip`}>{this.buttonTitle}</Tooltip>
}
```

Note: `ButtonTemplate.tsx` already passes `aria-describedby`? No — it passes `aria-description`. Keep `aria-description={this.ariaDescriptionText}` as-is (it is a different attribute). The new `aria-describedby` is additive.

- [ ] **Step 2:** Apply the same pattern to each remaining file in the per-site map. Open each file, locate the opener element and the `<Tooltip>` line, apply the two attributes + child-text change + review comment.

- [ ] **Step 3: TypeScript check**

Run (from repo root): `yarn ts`
Expected: no errors in any migrated template (no more `text=`/`opener=` on `<Tooltip>`).

- [ ] **Step 4: Update component specs** — change each assertion that referenced the old `opener`/`text` usage to the new model. Target specs: `Button.cy.tsx`, `Link.cy.tsx`, `Switch.cy.tsx`, `SegmentedButton.cy.tsx`, `RatingIndicator.cy.tsx`, `ColorPalette.cy.tsx`, `Icon.cy.tsx`, `Title.cy.tsx`.

For each, run its spec and fix assertions to:
- assert the opener element has `data-ui5-has-tooltip` and `aria-describedby` pointing at the inner tooltip id, and/or
- assert the shadow `[ui5-popover]` opens on gesture.

Run per file, e.g.: `yarn test:cypress:single cypress/specs/Button.cy.tsx`
Expected: PASS. Fix the spec (not the component) when an assertion encodes the old model.

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/*Template.tsx packages/main/cypress/specs
git commit -m "feat(ui5-tooltip): migrate components to data-attr delegation model"
```

---

## Task 8: Public API doc + website sample

**Files:**
- Create: `docs/internal/Tooltip.md`
- Modify: `packages/website/docs/_samples/main/Tooltip/Basic/sample.html`, `main.js`, `Basic.md`

- [ ] **Step 1: Write `docs/internal/Tooltip.md`** — proposed solution on top, alternatives + analysis after, the readable comparison table with in-page links, the extra `title`-reuse and magic-attribute variants folded in, factory/React-hook as a detail of the proposal, slot-based as "future development", and a link to `Tooltip-stats.md`. Source the content from `docs/superpowers/specs/2026-11-23-tooltip-delegation-design.md` (already written to that structure) — condense to an experts' overview, no long explanations.

- [ ] **Step 2: Update the website sample** to the new model:

`sample.html` component usage (between fold comments):
```html
<button data-ui5-has-tooltip="t1" aria-describedby="t1">Save</button>
<ui5-tooltip id="t1">Save the document</ui5-tooltip>
```
`main.js`:
```javascript
import "@ui5/webcomponents/dist/Tooltip.js";
```
`Basic.md` — unchanged wrapper (html + js).

- [ ] **Step 3: Commit**

```bash
git add docs/internal/Tooltip.md packages/website/docs/_samples/main/Tooltip
git commit -m "docs(ui5-tooltip): public API doc + updated website sample"
```

---

## Task 9: Real-browser verification (delegated)

- [ ] **Step 1: Dispatch the browser-e2e-tester subagent** against the dev server (started from repo root with `yarn start`, port 8080 only) and the page `http://localhost:8080/test/pages/Tooltip.html`. Verify:
  - Hovering the plain button shows the styled popover after the delay; mouseout hides it.
  - Focusing the div via keyboard (Tab) shows the tooltip; blur hides it.
  - Escape closes an open tooltip.
  - `aria-describedby` on the opener resolves to the tooltip's text (accessible description present).
  - `<ui5-button tooltip="...">` shows the tooltip on hover.
  - Removing an opener from the DOM while its tooltip exists leaves no console errors and no stuck popover (lifecycle/leak check).

- [ ] **Step 2: Address any failures** found, re-verify.

---

## Task 10: Cleanup of superseded artifacts

**Files:**
- Delete: `tooltip-api-research.md` (repo root), `docs/superpowers/specs/2026-10-30-enhanced-tooltip-design.md`, `docs/superpowers/plans/2026-10-30-enhanced-tooltip.md`, `docs/superpowers/specs/new-proposal.md`, `docs/superpowers/specs/old-tooltip-api-research.md`, `docs/superpowers/specs/old-tooltip-factory-and-react-hooks.md`.

- [ ] **Step 1: Confirm content is captured** — the new design doc (`2026-11-23-tooltip-delegation-design.md`), `docs/internal/Tooltip.md`, and `docs/internal/Tooltip-stats.md` together carry everything from the retired files (cross-framework survey, the two extra variants, factory/hook sketch, statistics). Spot-check each retired file's unique content exists in a kept file.

- [ ] **Step 2: Delete and commit**

```bash
git rm tooltip-api-research.md \
  docs/superpowers/specs/2026-10-30-enhanced-tooltip-design.md \
  docs/superpowers/plans/2026-10-30-enhanced-tooltip.md \
  docs/superpowers/specs/new-proposal.md \
  docs/superpowers/specs/old-tooltip-api-research.md \
  docs/superpowers/specs/old-tooltip-factory-and-react-hooks.md
git commit -m "chore(ui5-tooltip): remove superseded tooltip docs and research"
```

- [ ] **Step 3: Final full check**

Run (repo root): `yarn ts`
Expected: no tooltip-related errors.
Run: `yarn test:cypress:single cypress/specs/Tooltip.cy.tsx`
Expected: PASS.

---

## Appendix: Statistics content (for Task 1)

Paste this as the body of `docs/internal/Tooltip-stats.md`:

```markdown
# Tooltip / `title` usage statistics

Migration surface for the tooltip rework. Three inventories: components with a
public `tooltip` property, components using native `title`, and their
interactive/non-interactive split.

## 1. Components with a public `tooltip` property (21)

| Component | Package | Source |
|---|---|---|
| `ui5-button` | main | `packages/main/src/Button.ts` |
| `ui5-avatar-badge` | main | `packages/main/src/AvatarBadge.ts` |
| `ui5-color-palette-item` | main | `packages/main/src/ColorPaletteItem.ts` |
| `ui5-link` | main | `packages/main/src/Link.ts` |
| `ui5-menu-item` | main | `packages/main/src/MenuItem.ts` (+ inherits ListItem) |
| `ui5-option` | main | `packages/main/src/Option.ts` |
| `ui5-option-custom` | main | `packages/main/src/OptionCustom.ts` |
| `ui5-segmented-button-item` | main | `packages/main/src/SegmentedButtonItem.ts` |
| `ui5-rating-indicator` | main | `packages/main/src/RatingIndicator.ts` |
| `ui5-select` | main | `packages/main/src/Select.ts` |
| `ui5-switch` | main | `packages/main/src/Switch.ts` |
| `ui5-toolbar-button` | main | `packages/main/src/ToolbarButton.ts` |
| `ui5-li` | main | inherited from `packages/main/src/ListItem.ts` |
| `ui5-li-custom` | main | inherited from `packages/main/src/ListItem.ts` |
| `ui5-tree-item` | main | inherited via TreeItemBase from `ListItem.ts` |
| `ui5-tree-item-custom` | main | inherited via TreeItemBase from `ListItem.ts` |
| `ui5-view-settings-dialog-custom-tab` | fiori | `packages/fiori/src/ViewSettingsDialogCustomTab.ts` |
| `ui5-user-settings-item` | fiori | `packages/fiori/src/UserSettingsItem.ts` |
| `ui5-side-navigation-item` | fiori | inherited from `SideNavigationItemBase.ts` |
| `ui5-side-navigation-sub-item` | fiori | inherited from `SideNavigationItemBase.ts` |
| `ui5-side-navigation-group` | fiori | inherited from `SideNavigationItemBase.ts` |

Base classes defining the inherited property: `packages/main/src/ListItem.ts`,
`packages/fiori/src/SideNavigationItemBase.ts`. No AI-package component declares a
public `tooltip`.

## 2. Components using native `title` (21)

| Component | Package | File | Use |
|---|---|---|---|
| `ui5-icon` | main | `IconTemplate.tsx` / `Icon.ts` | renders `<ui5-tooltip>` from `effectiveAccessibleName` when `showTooltip` |
| `ui5-tag` | main | `TagTemplate.tsx` | native `title` on root button/div |
| `ui5-li` + ListItem family | main | `ListItemTemplate.tsx` | native `title` from `_accInfo.tooltip` |
| `ui5-select` | main | `SelectTemplate.tsx` | native `title` from `_effectiveTooltip` |
| `ui5-numeric-input` | main | `NumericInputTemplate.tsx` | native `title` on step icons |
| `ui5-calendar` | main | `CalendarHeaderTemplate.tsx` | native `title` on nav buttons |
| `ui5-daypicker` | main | `DayPickerTemplate.tsx` | native `title` per day cell |
| `ui5-dialog` | main | `DialogTemplate.tsx` | native `title` on resize handle |
| `ui5-popover` | main | `PopoverTemplate.tsx` | native `title` on resize handle |
| `ui5-tab` | main | `TabInStripTemplate.tsx` | native `title` on expand button |
| `ui5-busy-indicator` | main | `BusyIndicatorTemplate.tsx` | native `title` on busy area |
| `ui5-panel` | main | `Panel.ts` | `title` ARIA key forwarded to inner button |
| `ui5-split-button` | main | `SplitButton.ts` | `title` ARIA key forwarded to inner buttons |
| `ui5-ai-button` | ai | `Button.ts` | `title` ARIA key forwarded to inner buttons |
| `ui5-side-navigation-item` | fiori | `SideNavigationItemTemplate.tsx` | native `title` from `_tooltip` |
| `ui5-side-navigation-sub-item` | fiori | `SideNavigationSubItemTemplate.tsx` | native `title` from `_tooltip` |
| `ui5-side-navigation-group` | fiori | `SideNavigationGroupTemplate.tsx` | native `title` from `_tooltip` |
| `ui5-shellbar` | fiori | `ShellBarLegacyTemplate.tsx` | native `title` on logo |
| `ui5-li-notification-group` | fiori | `NotificationListGroupItemTemplate.tsx` | native `title` on toggle icon |
| `ui5-user-menu` | fiori | `UserMenuTemplate.tsx` | native `title` on avatar wrapper |
| `ui5-user-settings-account-view` | fiori | `UserSettingsAccountViewTemplate.tsx` | native `title` on avatar wrapper |

## 3. Interactive vs non-interactive

Interactive (focusable / handles input): `ui5-button`, `ui5-link`, `ui5-switch`,
`ui5-menu-item`, `ui5-option`, `ui5-option-custom`, `ui5-segmented-button-item`,
`ui5-rating-indicator`, `ui5-select`, `ui5-toolbar-button`, `ui5-li` /
`ui5-li-custom`, `ui5-tree-item` / `ui5-tree-item-custom`,
`ui5-view-settings-dialog-custom-tab`, `ui5-user-settings-item`,
`ui5-side-navigation-item` / `-sub-item` / `-group`, `ui5-numeric-input`,
`ui5-calendar`, `ui5-daypicker`, `ui5-dialog`, `ui5-popover`, `ui5-tab`,
`ui5-split-button`, `ui5-ai-button`, `ui5-panel`, `ui5-shellbar`,
`ui5-li-notification-group`, `ui5-user-menu`.

Non-interactive (display only): `ui5-avatar-badge`, `ui5-busy-indicator`,
`ui5-user-settings-account-view`, `ui5-color-palette-item` (navigated by the
parent ColorPalette, not independently focusable).

Conditional: `ui5-tag` (interactive only with `interactive` set),
`ui5-icon` (interactive only in `mode="Interactive"`).

## Summary

- 21 components expose a public `tooltip` property.
- 21 components render or forward native `title`.
- The union (~32 unique components) is predominantly interactive; only a handful
  are display-only. Non-interactive hosts are the ones where `aria-describedby`
  double-announcement needs the closest review, since their accessible name often
  already equals the tooltip text.
```
