# `data-ui5-tooltip` Document Delegation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Drive the magic `data-ui5-tooltip` attribute from a single, clean document-level event delegate that opens *and* closes a shared `<ui5-tooltip>`, reusing the existing `TooltipGestures` state machine per hovered target.

**Architecture:** One capture-phase document delegate (`TooltipSupport`) discovers `[data-ui5-tooltip]` targets via `composedPath()`. On first interaction with a target it lazily attaches the existing `TooltipGestures` object (the proven open/close/long-press/Escape state machine) to that target and docks a single shared `<ui5-tooltip>` instance against it. Gestures are torn down when the pointer/focus leaves the target, so only the element currently being interacted with carries per-element listeners. This mirrors three existing singletons: `PopoverRegistry` (capture-phase document delegate), `OpenedPopupsRegistry` (shared singleton), and `ListItem`/`CheckBox` (transient per-target listeners during an interaction).

**Approach selected: Option A** — the 3 document discovery listeners (`mouseover`, `focusin`, `touchstart`) are attached once via a `started` flag and are **never detached** (acceptable: 3 capture listeners for the app lifetime; matches the `fixSafariActiveState` precedent of a permanent flag-guarded listener). A follow-up TODO documents how to upgrade to **Option B** (ref-counted attach/detach keyed on the count of mounted tooltip-bearing components) if leftover-listener cleanup is ever required.

**Tech Stack:** TypeScript, UI5 Web Components base (`UI5Element`, decorators), Cypress component tests with `cypress-real-events`, scoping-safe DOM via `SomeClass.getMetadata().getTag()`.

---

## Context: why this shape

Primary-source findings that this plan is built on (read these before starting):

- `packages/main/src/TooltipSupport.ts` — current prototype. **Opens only**; has no close/Escape/long-press logic. Uses a literal `createElement("ui5-tooltip")` which is **not scoping-safe**. Permanent `started` flag, never detaches.
- `packages/main/src/TooltipGestures.ts` — the **complete** gesture state machine (hover/focus/long-press/Escape/activation/leave), already correct across shadow boundaries via `_isWithinOpener`. Designed as a plain lifecycle object with `constructor(config)` + `destroy()`. **Reuse this; do not re-implement its logic in the delegate.**
- `packages/main/src/Tooltip.ts` — the `<ui5-tooltip>` element. Has `text`, `opener`, `horizontalAlign`, `placement`, `delay` properties and `openTooltip()`/`closeTooltip()`/`isOpen()` public methods. Note: when driven by the magic attribute, the delegate owns the gestures — the Tooltip's own `_syncGestures` must **not** also bind gestures for the shared instance (see Task 5).
- `packages/base/src/util/getSingletonElementInstance.ts` — house helper for a shared singleton element; accepts a `createEl` factory. Use it for the shared tooltip.
- `packages/main/src/Calendar.ts:518` — canonical scoping-safe create: `document.createElement(SomeClass.getMetadata().getTag())`.
- `packages/main/src/popup-utils/PopoverRegistry.ts:56-78` — capture-phase document delegate precedent.
- `packages/main/src/popup-utils/OpenedPopupsRegistry.ts:40-57` — ref-count 0→1 / 1→0 precedent (the Option B target).

### File Structure

- **Modify** `packages/main/src/TooltipSupport.ts` — becomes: scoping-safe shared-instance accessor + document discovery delegate + per-target `TooltipGestures` lifecycle keyed on the currently active target. One responsibility: translate `data-ui5-tooltip` presence into docked open/close of the shared tooltip.
- **Modify** `packages/main/src/Tooltip.ts` — add an opt-out so the shared instance driven by the delegate does not double-bind its own `TooltipGestures`.
- **Create** `packages/main/cypress/specs/TooltipSupport.cy.tsx` — end-to-end tests for the magic attribute: open on hover/focus, close on leave/Escape, align/text per target, shared-instance reuse, scoping-safe instantiation, dynamic attribute add/remove.
- **Reuse unchanged** `packages/main/src/TooltipGestures.ts` — no logic change; may need one small config addition (Task 4) only if a target-resolution hook is required.

---

## Task 1: Make the shared tooltip instance scoping-safe

Replace the literal `createElement("ui5-tooltip")` with the scoping-safe tag and the house singleton helper.

**Files:**
- Modify: `packages/main/src/TooltipSupport.ts:23-34` (the `sharedTooltip` var + `getSharedTooltip`)
- Test: `packages/main/cypress/specs/TooltipSupport.cy.tsx` (new)

- [ ] **Step 1: Write the failing test**

Create `packages/main/cypress/specs/TooltipSupport.cy.tsx`:

```tsx
import Button from "../../src/Button.js";
import Tooltip from "../../src/Tooltip.js";

describe("data-ui5-tooltip support", () => {
	it("creates exactly one shared tooltip using the scoped tag", () => {
		cy.mount(<><Button>One</Button><Button>Two</Button></>);

		const tag = Tooltip.getMetadata().getTag();
		// Force the support module to lazily create the shared instance.
		cy.get("[ui5-button]").first().realHover();

		cy.get(`body > ${tag}`).should("have.length", 1);
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run (from `packages/main`): `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: FAIL — either no element matches the scoped tag (literal `ui5-tooltip` was created, scoped tag differs) or more/less than 1 instance.

- [ ] **Step 3: Write minimal implementation**

In `packages/main/src/TooltipSupport.ts`, replace the imports and `getSharedTooltip`:

```ts
import getSingletonElementInstance from "@ui5/webcomponents-base/dist/util/getSingletonElementInstance.js";
import Tooltip from "./Tooltip.js";

// One shared <ui5-tooltip>, created scoping-safe on first use and re-docked per target.
function getSharedTooltip(): Tooltip {
	const tag = Tooltip.getMetadata().getTag();
	return getSingletonElementInstance(tag, document.body, () => document.createElement(tag)) as Tooltip;
}
```

Remove the module-level `let sharedTooltip: Tooltip | undefined;` and the old `import type Tooltip` line (now imported as a value for `getMetadata()`). Keep `import "./Tooltip.js"` behavior implicitly satisfied by the value import.

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: PASS — exactly one element with the scoped tag under `body`.

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/TooltipSupport.ts packages/main/cypress/specs/TooltipSupport.cy.tsx
git commit -m "fix(ui5-tooltip): create shared tooltip with scoped tag"
```

---

## Task 2: Track the active target and dock/undock cleanly

Add a single "current target" slot so the delegate docks per target and resets shared state, preventing one target's text/align leaking into the next.

**Files:**
- Modify: `packages/main/src/TooltipSupport.ts:49-62` (`dockAndOpen`)
- Test: `packages/main/cypress/specs/TooltipSupport.cy.tsx`

- [ ] **Step 1: Write the failing test**

Append to the describe block in `TooltipSupport.cy.tsx`:

```tsx
it("docks text and align per target without leaking", () => {
	cy.mount(
		<>
			<Button data-ui5-tooltip="Alpha" data-ui5-tooltip-align="Start">A</Button>
			<Button data-ui5-tooltip="Beta">B</Button>
		</>,
	);
	const tag = Tooltip.getMetadata().getTag();

	cy.get("[ui5-button]").eq(0).realHover();
	cy.get(tag).should(($t) => {
		const tip = $t[0] as unknown as Tooltip;
		expect(tip.text).to.equal("Alpha");
		expect(tip.horizontalAlign).to.equal("Start");
	});

	cy.get("[ui5-button]").eq(1).realHover();
	cy.get(tag).should(($t) => {
		const tip = $t[0] as unknown as Tooltip;
		expect(tip.text).to.equal("Beta");
		expect(tip.horizontalAlign).to.equal("Center"); // reset to default, not leaked "Start"
	});
});
```

> Note: `Button`/`Title` templates emit `data-ui5-tooltip` from their own `tooltip` property; here we set the attribute directly on the host for a focused delegate test. If the attribute on the host is not in the composed path of the inner element, use `<Button tooltip="Alpha">` form instead and assert the same. Confirm which the template uses before finalizing (see `ButtonTemplate.tsx`); keep whichever makes the attribute reachable via `composedPath()`.

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: FAIL on the second assertion block — `horizontalAlign` leaks `"Start"` OR text does not update, depending on current dock logic.

- [ ] **Step 3: Write minimal implementation**

Ensure `dockAndOpen` resets every per-target property each dock (it already resets align; make the pattern explicit and complete):

```ts
const ATTRIBUTE = "data-ui5-tooltip";
const ALIGN_ATTRIBUTE = "data-ui5-tooltip-align";

// Point the shared tooltip at `target`, syncing all per-target state.
function dockAndOpen(target: HTMLElement): void {
	const text = target.getAttribute(ATTRIBUTE) ?? "";
	if (!text) {
		return;
	}
	const tooltip = getSharedTooltip();
	tooltip.text = text;
	// Reset to default when the attribute is absent so a prior target does not leak.
	tooltip.horizontalAlign = (target.getAttribute(ALIGN_ATTRIBUTE) as Tooltip["horizontalAlign"]) || "Center";
	tooltip.opener = target;
	tooltip.openTooltip();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: PASS — both targets show their own text, align resets to `Center` for Beta.

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/TooltipSupport.ts packages/main/cypress/specs/TooltipSupport.cy.tsx
git commit -m "test(ui5-tooltip): verify per-target dock without state leak"
```

---

## Task 3: Attach `TooltipGestures` to the active target (close logic)

The current delegate only opens. Give it the full open/close/Escape/long-press machine by lazily attaching `TooltipGestures` to the target on first interaction and tearing it down when a *different* target becomes active or the target leaves the DOM.

**Files:**
- Modify: `packages/main/src/TooltipSupport.ts:64-99` (`onPointerOver`, `onFocusIn`, listener wiring)
- Reuse: `packages/main/src/TooltipGestures.ts` (no change expected)
- Test: `packages/main/cypress/specs/TooltipSupport.cy.tsx`

- [ ] **Step 1: Write the failing test**

Append:

```tsx
it("opens on hover and closes when the pointer leaves", () => {
	cy.mount(
		<>
			<Button data-ui5-tooltip="Save">S</Button>
			<div id="away" style="width:50px;height:50px">x</div>
		</>,
	);
	const tag = Tooltip.getMetadata().getTag();

	cy.get("[ui5-button]").realHover();
	cy.get(tag).should(($t) => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(true));

	cy.get("#away").realHover();
	cy.get(tag).should(($t) => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(false));
});

it("closes on Escape", () => {
	cy.mount(<Button data-ui5-tooltip="Save">S</Button>);
	const tag = Tooltip.getMetadata().getTag();

	cy.get("[ui5-button]").realHover();
	cy.get(tag).should(($t) => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(true));

	cy.get("[ui5-button]").realPress("Escape");
	cy.get(tag).should(($t) => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(false));
});
```

> The Tooltip's `delay` defaults to 500ms. In the test, before hovering, set the shared instance's delay to 0 for determinism, or use Cypress retry-ability with an increased timeout. Prefer setting delay: after the first `getSharedTooltip` exists, `cy.get(tag).then(($t) => { ($t[0] as any).delay = 0; })` then hover. Add this setup to each timing-sensitive test.

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: FAIL on the "closes when pointer leaves" and "closes on Escape" assertions — current delegate never closes.

- [ ] **Step 3: Write minimal implementation**

Rework the delegate body in `TooltipSupport.ts` to own a single active-target gesture object:

```ts
import TooltipGestures from "./TooltipGestures.js";

let activeTarget: HTMLElement | undefined;
let activeGestures: TooltipGestures | undefined;

// Bind the gesture state machine to `target`, replacing any previous binding.
function bindGestures(target: HTMLElement): void {
	if (activeTarget === target && activeGestures) {
		return;
	}
	releaseGestures();
	activeTarget = target;
	const tooltip = getSharedTooltip();
	activeGestures = new TooltipGestures({
		opener: target,
		onOpen: () => dockAndOpen(target),
		onClose: () => tooltip.closeTooltip(),
		isPendingOrOpen: () => tooltip.isOpen(),
		getDelay: () => tooltip.delay,
	});
}

function releaseGestures(): void {
	activeGestures?.destroy();
	activeGestures = undefined;
	activeTarget = undefined;
}

function onPointerOver(e: Event): void {
	const target = matchInPath(e);
	if (target) {
		bindGestures(target);
	}
}

function onFocusIn(e: Event): void {
	const target = matchInPath(e);
	if (target) {
		bindGestures(target);
	}
}
```

Keep the capture-phase document listeners exactly as in Task-A form:

```ts
function startTooltipSupport(): void {
	if (started || typeof document === "undefined") {
		return;
	}
	started = true;
	document.addEventListener("mouseover", onPointerOver, true);
	document.addEventListener("focusin", onFocusIn, true);
	document.addEventListener("touchstart", onPointerOver, true);
}
```

> `TooltipGestures` already binds `mouseover`/`focusin` on the target, so once bound it drives open on its own delayed timer; the document delegate's role is purely to *discover* the target and bind once. `_onMouseOut`/`_onFocusOut`/`_onKeyDown` inside `TooltipGestures` handle close/Escape. When the pointer moves to a non-target element, the target's own `mouseout` closes it via the bound gestures; `releaseGestures` is called the next time a *different* target is discovered. This keeps at most one target bound at a time.

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: PASS — opens on hover, closes on leave and on Escape.

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/TooltipSupport.ts packages/main/cypress/specs/TooltipSupport.cy.tsx
git commit -m "feat(ui5-tooltip): drive open and close via TooltipGestures in delegate"
```

---

## Task 4: Release gestures when the active target leaves the DOM

If a tooltip-bearing element is removed while active, its gesture object must be torn down so it does not hold a detached node.

**Files:**
- Modify: `packages/main/src/TooltipSupport.ts` (add a guard inside `dockAndOpen`/`onPointerOver`)
- Test: `packages/main/cypress/specs/TooltipSupport.cy.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("releases gestures when the active target is removed", () => {
	cy.mount(<Button id="rm" data-ui5-tooltip="Save">S</Button>);
	const tag = Tooltip.getMetadata().getTag();

	cy.get("#rm").realHover();
	cy.get(tag).should(($t) => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(true));

	cy.get("#rm").then(($b) => $b[0].remove());
	// The shared tooltip must end up closed, not stuck open against a detached node.
	cy.get(tag).should(($t) => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(false));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: FAIL — tooltip stays open; gestures remain bound to the removed node.

- [ ] **Step 3: Write minimal implementation**

Guard in `dockAndOpen` (before opening) that the active target is still connected; if not, close and release:

```ts
function dockAndOpen(target: HTMLElement): void {
	if (!target.isConnected) {
		getSharedTooltip().closeTooltip();
		releaseGestures();
		return;
	}
	const text = target.getAttribute(ATTRIBUTE) ?? "";
	if (!text) {
		return;
	}
	const tooltip = getSharedTooltip();
	tooltip.text = text;
	tooltip.horizontalAlign = (target.getAttribute(ALIGN_ATTRIBUTE) as Tooltip["horizontalAlign"]) || "Center";
	tooltip.opener = target;
	tooltip.openTooltip();
}
```

> `TooltipGestures` schedules `onOpen` on a delay; by the time it fires after removal, `isConnected` is false and we bail + release. This keeps the fix local without a `MutationObserver` (YAGNI for Option A).

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: PASS — tooltip closed after target removal.

- [ ] **Step 5: Commit**

```bash
git add packages/main/src/TooltipSupport.ts packages/main/cypress/specs/TooltipSupport.cy.tsx
git commit -m "fix(ui5-tooltip): release gestures when active target is removed"
```

---

## Task 5: Prevent the shared `<ui5-tooltip>` from double-binding its own gestures

The shared instance has `opener` set by the delegate (Task 2). `Tooltip._syncGestures` would *also* create a `TooltipGestures` for that opener, double-binding listeners. The delegate must be the single owner of gestures for the shared instance.

**Files:**
- Modify: `packages/main/src/Tooltip.ts:149-167` (`_syncGestures`) and `TooltipSupport.ts` (mark the shared instance)
- Test: `packages/main/cypress/specs/TooltipSupport.cy.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("binds gestures only once for the shared instance (no double open/close)", () => {
	cy.mount(<Button data-ui5-tooltip="Save">S</Button>);
	const tag = Tooltip.getMetadata().getTag();

	// Spy on open/close by counting state flips during a single hover/leave.
	cy.get("[ui5-button]").realHover();
	cy.get(tag).should(($t) => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(true));
	cy.get("[ui5-button]").realMouseUp(); // activation closes exactly once
	cy.get(tag).should(($t) => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(false));
});
```

> This is a behavioral guard: with double-bound gestures, activation/close can fire twice and flip state back open via the second focusin handler. The assertion that it ends closed catches the regression. Verify by temporarily removing the Step-3 opt-out and confirming this test fails.

- [ ] **Step 2: Run test to verify it fails (with opt-out absent)**

Run: `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: FAIL or flaky double-flip if `_syncGestures` also binds. (If it passes even without the opt-out, keep the opt-out anyway for correctness and note it; the double-binding is still a real resource leak.)

- [ ] **Step 3: Write minimal implementation**

In `TooltipSupport.ts`, flag the shared instance so the component skips self-binding:

```ts
function getSharedTooltip(): Tooltip {
	const tag = Tooltip.getMetadata().getTag();
	const tooltip = getSingletonElementInstance(tag, document.body, () => document.createElement(tag)) as Tooltip;
	tooltip._externalGestures = true;
	return tooltip;
}
```

In `Tooltip.ts`, add the private field and guard `_syncGestures`:

```ts
/**
 * When true, gestures are driven externally (by TooltipSupport); the component
 * does not bind its own TooltipGestures. Set only on the shared instance.
 * @private
 */
_externalGestures = false;

_syncGestures(): void {
	if (this._externalGestures) {
		this._gestures?.destroy();
		this._gestures = undefined;
		return;
	}
	// ...existing body unchanged...
}
```

> `_externalGestures` is a plain field, not a `@property` — it is never reflected to an attribute and never part of a CSS selector (follows the base `AGENTS.md` "noAttribute for internals" intent; a plain field is cleaner than a property here). Per the user's global rule, tests must not read this field directly — the Step-1 test asserts observable close behavior, never `_externalGestures`.

- [ ] **Step 4: Run test to verify it passes**

Run: `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: PASS — single clean open then close; no double-flip.

- [ ] **Step 5: Run the existing Tooltip spec to confirm no regression**

Run: `yarn test:cypress:single cypress/specs/Tooltip.cy.tsx`
Expected: PASS — the explicit `<ui5-tooltip opener=...>` path still binds its own gestures (its `_externalGestures` stays false).

- [ ] **Step 6: Commit**

```bash
git add packages/main/src/TooltipSupport.ts packages/main/src/Tooltip.ts packages/main/cypress/specs/TooltipSupport.cy.tsx
git commit -m "fix(ui5-tooltip): single gesture owner for the shared tooltip instance"
```

---

## Task 6: Dynamic attribute add/remove works without any per-host wiring

Prove the central selling point of document delegation: a tooltip appears/disappears purely by toggling the attribute, with zero `onEnterDOM` bookkeeping.

**Files:**
- Test only: `packages/main/cypress/specs/TooltipSupport.cy.tsx`

- [ ] **Step 1: Write the test**

```tsx
it("reacts to dynamically added and removed data-ui5-tooltip", () => {
	cy.mount(<Button id="dyn">S</Button>);
	const tag = Tooltip.getMetadata().getTag();

	// No attribute yet: hover shows nothing.
	cy.get("#dyn").realHover();
	cy.get("body").then(($b) => {
		const tip = $b[0].querySelector(tag) as unknown as Tooltip | null;
		expect(!tip || !tip.isOpen()).to.equal(true);
	});

	// Add attribute, then hover opens.
	cy.get("#dyn").then(($b) => $b[0].setAttribute("data-ui5-tooltip", "Now"));
	cy.get("#dyn").realHover();
	cy.get(tag).should(($t) => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(true));

	// Remove attribute; next discovery finds no text and does not reopen.
	cy.get("#dyn").realMouseMove(0, 100); // leave to close
	cy.get("#dyn").then(($b) => $b[0].removeAttribute("data-ui5-tooltip"));
	cy.get("#dyn").realHover();
	cy.get(tag).should(($t) => expect(($t[0] as unknown as Tooltip).isOpen()).to.equal(false));
});
```

- [ ] **Step 2: Run test**

Run: `yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx`
Expected: PASS — the delegate is stateless about which hosts exist; `matchInPath` + the `!text` early-return in `dockAndOpen` handle add/remove for free.

- [ ] **Step 3: Commit**

```bash
git add packages/main/cypress/specs/TooltipSupport.cy.tsx
git commit -m "test(ui5-tooltip): dynamic attribute add/remove via delegate"
```

---

## Task 7: Full end-to-end run + lint + docs for the magic attribute

**Files:**
- Verify: `packages/main/cypress/specs/TooltipSupport.cy.tsx`, `Button.cy.tsx`, `Title.cy.tsx`, `Tooltip.cy.tsx`
- Modify (docs): header comment of `packages/main/src/TooltipSupport.ts`

- [ ] **Step 1: Run the full tooltip-related specs**

Run (from `packages/main`):
```bash
yarn test:cypress:single cypress/specs/TooltipSupport.cy.tsx
yarn test:cypress:single cypress/specs/Tooltip.cy.tsx
yarn test:cypress:single cypress/specs/Button.cy.tsx
yarn test:cypress:single cypress/specs/Title.cy.tsx
```
Expected: all PASS.

- [ ] **Step 2: TypeScript + lint**

Run (from repo root):
```bash
yarn ts
yarn lint
```
Expected: no type errors; no lint errors in `TooltipSupport.ts` / `Tooltip.ts`.

- [ ] **Step 3: Update the file header comment to match the final design**

In `packages/main/src/TooltipSupport.ts`, update the top doc comment so it states: document capture-phase delegate discovers `[data-ui5-tooltip]` via `composedPath()`; the shared `<ui5-tooltip>` is created scoping-safe; the active target is driven by a single `TooltipGestures` for correct open/close/long-press/Escape. Keep it short per the project's comment-style rule.

- [ ] **Step 4: Commit**

```bash
git add packages/main/src/TooltipSupport.ts
git commit -m "docs(ui5-tooltip): document the data-ui5-tooltip delegation design"
```

---

## Follow-up TODO: optional upgrade to Option B (ref-counted listeners)

**Not implemented now.** Option A keeps 3 permanent capture-phase document listeners for the app lifetime. If leftover-listener cleanup ever becomes a requirement (e.g. a host app mounts/unmounts the whole component set repeatedly and wants zero UI5 listeners when none are mounted), upgrade to ref-counting, mirroring `packages/main/src/popup-utils/OpenedPopupsRegistry.ts:40-57`:

- Add `stopTooltipSupport()` and a counter of mounted tooltip-bearing components.
- Each emitting component increments on `onEnterDOM` and decrements on `onExitDOM` (Button, Title, and any future emitter).
- Attach the 3 document listeners when the counter goes `0 → 1`; detach when it goes `1 → 0` (and `releaseGestures()`).
- Store the counter + `started` state in a `getSharedResource("TooltipSupport", ...)` singleton so it is correct across multiple framework runtimes (same as the popup registries).
- Add a test: mount then unmount all emitters, assert the document listeners are gone (observe via a probe element that would otherwise trigger `matchInPath`, or spy on `document.addEventListener`/`removeEventListener` call counts).

Keep this a single, isolated change on top of the Option A implementation so it can be reverted independently.

---

## Self-Review

- **Spec coverage:** Option A delegate (Tasks 1,3) ✓; open+close+Escape+long-press via reuse of `TooltipGestures` (Task 3) ✓; scoping-safe instance (Task 1) ✓; per-target no-leak (Task 2) ✓; target removal cleanup (Task 4) ✓; no double-binding (Task 5) ✓; dynamic add/remove (Task 6) ✓; end-to-end + lint + docs (Task 7) ✓; Option B as follow-up TODO ✓.
- **Placeholder scan:** no TBD/"handle edge cases"; every code step shows code; every run step shows command + expected result.
- **Type consistency:** `getSharedTooltip(): Tooltip`, `bindGestures(target)`/`releaseGestures()`, `activeTarget`/`activeGestures`, `dockAndOpen(target)`, `_externalGestures` used consistently across Tasks 1–5. `TooltipGestures` config keys (`opener`, `onOpen`, `onClose`, `isPendingOrOpen`, `getDelay`) match `TooltipGestures.ts` exactly.
- **Testing-rule compliance:** no test reads `_externalGestures` or any `_private` field; all assertions use public `isOpen()`, `text`, `horizontalAlign` and observable DOM.
