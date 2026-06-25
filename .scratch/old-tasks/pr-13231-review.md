# Code Review: PR #13231 — `feat(ui5-toolbar): align keyboard navigation with APG and improve nested item delegation`

## Overview

This PR implements roving tabindex keyboard navigation for the Toolbar component, aligning with the [WAI-ARIA APG Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/). It adds ~1347 lines, primarily:

1. **Toolbar.ts** — new `_onkeydown`/`_onfocusin` handlers, roving tabindex management, boundary-aware navigation
2. **ToolbarItem.ts** — inner-group arrow navigation (radio groups, checkbox groups), boundary detection
3. **ToolbarItemBase.ts** — new `handlesOwnKeyboardNavigation` property and `shouldHandleOwnKeyboardNavigation()` method
4. **ToolbarSelect.ts** — overrides `shouldHandleOwnKeyboardNavigation` to claim Up/Down always and Home/End only when open
5. **Tests** — extensive Cypress coverage (~710 lines of new tests)

**CI status:** All checks passing.

---

## How It Works

The toolbar acts as a single tab stop on the page. When a user presses Tab, focus lands on whichever toolbar item was last focused (or the first item if none was). Pressing Tab again leaves the toolbar entirely — the user never gets "trapped" inside. This is the fundamental UX contract: Tab gets you in and out, arrow keys let you move around inside.

Once inside the toolbar, the left and right arrow keys move focus between items one at a time. The movement wraps: pressing ArrowRight on the last item jumps back to the first, and vice versa. Home and End jump directly to the first or last item. Disabled items, separators, and spacers are invisible to this navigation — the arrows skip over them automatically.

The interesting complexity comes from "smart" items that contain their own interactive content. A `ToolbarSelect` (dropdown) needs ArrowUp/Down to open and navigate its own options — the toolbar must not steal those keys. A `ToolbarItem` wrapping a group of radio buttons needs arrows to cycle through the radios — but when the user reaches the last radio and presses ArrowRight again, the toolbar should take over and move to the next toolbar item. Similarly, an input field needs arrows for moving the text cursor, but once the cursor hits the end of the text, the next ArrowRight should exit the input and move to the next toolbar item.

This "who owns the key?" decision happens on every single keypress. The toolbar asks the currently focused item: "do you want to handle this key yourself?" Each item type answers differently depending on its internal state — is the dropdown open? Is the cursor at the end of the text? Is this the last radio in the group? If the item says "yes, I'll handle it," the toolbar backs off. If it says "no," the toolbar performs the navigation.

When items overflow into a popover (because the toolbar is too narrow), the navigation model changes: inside the popover, users navigate with Tab rather than arrows. The toolbar restores the natural tab order of overflowed items so they behave like a normal vertical list in the popover.

In RTL mode, the arrow directions are mirrored to match the visual layout — ArrowLeft moves forward (to the next item) because that's the reading direction.

---

## Architecture & Technical Details

### Design Pattern: Roving Tabindex

The implementation follows the [WAI-ARIA Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/). The core idea:

- **One item** in the toolbar has `tabindex="0"` (the "roving" focus target); all others have `tabindex="-1"`.
- **Tab/Shift+Tab** moves focus *out* of the toolbar entirely (the toolbar is a single tab stop).
- **Arrow keys** move focus *within* the toolbar between items.
- **Re-entry** via Tab restores focus to the last-focused item (not always the first).

### Class Hierarchy & Delegation

```
ToolbarItemBase (abstract)
├── handlesOwnKeyboardNavigation: boolean (property)
├── shouldHandleOwnKeyboardNavigation(e: KeyboardEvent): boolean
│
├── ToolbarButton     → handlesOwnKeyboardNavigation = false (default)
├── ToolbarSeparator  → non-interactive, skipped
├── ToolbarSpacer     → non-interactive, skipped
├── ToolbarSelect     → handlesOwnKeyboardNavigation = true
│   └── shouldHandleOwnKeyboardNavigation():
│       • Up/Down → always true (opens/navigates dropdown)
│       • Home/End → true only when picker is open
│       • Left/Right → false (toolbar handles these)
│
└── ToolbarItem (generic wrapper)
    └── handlesOwnKeyboardNavigation = true
    └── shouldHandleOwnKeyboardNavigation():
        • Delegates based on inner content type and boundary state
        • Radio groups: arrows navigate within; exits at boundary
        • Checkboxes: sequential arrow traversal; exits at last/first
        • Inputs: exits only when caret is at text boundary
```

### Event Flow

1. **Template binding** — `ToolbarTemplate.tsx` binds `onKeyDown={this._onkeydown}` and `onFocusIn={this._onfocusin}` on the `.ui5-tb-items` container div.

2. **`_onkeydown(e)`** (Toolbar.ts) — Entry point for all keyboard handling:
   - Determines the event origin by walking `e.composedPath()` and matching against known focusable items.
   - Checks if the focused item's toolbar-item wrapper claims the key via `shouldHandleOwnKeyboardNavigation(e)`. If yes → early return (item handles it).
   - For Arrow keys: calculates next index (wrapping at boundaries), calls `_moveFocus(nextIndex)`.
   - For Home/End: jumps to first/last focusable item.
   - For Tab: lets it propagate naturally (roving tabindex ensures correct exit behavior).

3. **`_onfocusin(e)`** (Toolbar.ts) — Tracks the currently focused item in `_lastFocusedItem` so re-entry via Tab restores position.

4. **`_applyRovingTabIndex()`** — Called after focus changes. Sets `tabindex="0"` on the newly focused item and `tabindex="-1"` on all others. Uses `_originalTabIndexes` WeakMap to remember and restore original tabindex values when items leave the toolbar (e.g., overflow).

### Focusable Item Resolution

**`_getFocusableItems()`** returns the flat list of navigable DOM elements by:
- Iterating `this.standardItems` (items currently rendered in the static toolbar area, not overflowed)
- Filtering out: disabled items, separators, spacers, hidden items
- For `ToolbarItem` wrappers: resolves the *inner* focusable element(s) via `_getNavigationTargets()`

**`_findToolbarItem(focusRef)`** — Reverse lookup: given a DOM element that received focus, finds the corresponding `ToolbarItemBase` in the component model. Uses `contains()` and `shadowRoot?.contains()` checks to handle shadow DOM encapsulation.

### Boundary Detection (ToolbarItem.ts)

`ToolbarItem` wraps arbitrary slotted content. Its `shouldHandleOwnKeyboardNavigation(e)` decides per-keypress whether the toolbar or the inner content should handle navigation:

**Radio groups** (`_isRadioGroupTargets()` check):
- ArrowRight/Down at last radio → returns `false` (exits to toolbar)
- ArrowLeft/Up at first radio → returns `false` (exits to toolbar)
- Otherwise → returns `true` (navigates within the radio group)
- On exit backward: calls `RadioButtonGroup.selectItem()` to select the boundary radio

**Checkbox groups** (multiple focusable children):
- Sequential arrow traversal through all checkboxes
- At last checkbox + ArrowRight → exits forward
- At first checkbox + ArrowLeft → exits backward

**Input/Textarea** (caret position check):
- `selectionStart === selectionEnd === value.length` + ArrowRight → caret at end, exits forward
- `selectionStart === selectionEnd === 0` + ArrowLeft → caret at start, exits backward
- Otherwise → stays in input (normal text editing)

**`handleNavigationEntry(forward: boolean)`** — Called by the toolbar when navigating *into* a ToolbarItem. Focuses the first child (if `forward=true`) or the last child (if `forward=false`).

### Overflow Popover Tab Order

When toolbar items overflow into the popover:
- **`_restoreOverflowTabOrder()`** — Restores the natural `tabindex` of overflowed items (from `_originalTabIndexes`) so they participate in normal Tab order within the popover.
- Inside the popover, navigation switches from Arrow-key roving to standard Tab/Shift+Tab (per APG: popovers use Tab, not arrows).
- The overflow toggle button itself participates in the toolbar's roving tabindex.

### RTL Handling

When `dir="rtl"` is set on the toolbar:
- ArrowLeft → moves to the *next* item (visually left = logically forward in RTL)
- ArrowRight → moves to the *previous* item
- Detection uses `this.effectiveDir === "rtl"` and swaps the direction mapping before index calculation.

### State Management

| State | Type | Purpose |
|-------|------|---------|
| `_lastFocusedItem` | `HTMLElement \| null` | Tracks last focused element for Tab re-entry |
| `_originalTabIndexes` | `WeakMap<HTMLElement, string \| null>` | Stores pre-roving tabindex values for restoration |
| `handlesOwnKeyboardNavigation` | `@property` on ToolbarItemBase | Declares whether an item type manages its own keys |

---

## Strengths

- **Comprehensive test coverage** — 20+ scenarios covering arrow keys, Home/End, wrapping, RTL, disabled items, radio group boundaries, checkbox traversal, input caret boundaries, overflow popover Tab order
- **APG-aligned design** — roving tabindex with Tab exiting the toolbar is the correct pattern for toolbars
- **Good boundary detection** — input/textarea caret position checking before deciding to exit
- **Proper delegation** — ToolbarSelect correctly claims only the keys it needs, conditionally based on picker state

---

## Issues & Suggestions

### 1. Architecture: `handlesOwnKeyboardNavigation` as a `@property` on ToolbarItemBase

```typescript
@property({ type: Boolean })
handlesOwnKeyboardNavigation = false;
```

This is declared as a `@property()` (reactive/attribute-mapped) but it behaves like a class-level constant — `ToolbarItem` and `ToolbarSelect` set it in their class body. Making it a DOM attribute means it shows up in HTML and can be (accidentally) set by consumers. Consider making this a plain class field or a getter instead, since there's no scenario where a user should toggle this from outside.

### 2. Excessive `as unknown as` type casts in ToolbarItem.ts

Multiple places cast through `unknown`:

```typescript
const radio = hostTarget as HTMLElement & { disabled?: boolean; readonly?: boolean; checked?: boolean; name?: string; click: () => void; };
// ...
RadioButtonGroup.selectItem(radio as unknown as RadioButton, radio.name);
```

And:

```typescript
const targets = (item as unknown as { _getNavigationTargets?: () => HTMLElement[] })._getNavigationTargets?.();
```

This tight coupling to internal APIs without proper types is fragile. Consider:
- Defining an interface (e.g. `INavigableToolbarItem`) that ToolbarItem implements
- Using `isInstanceOfComponent` pattern (per AGENTS.md) instead of tag name checks

### 3. Hard-coded tag name checks

```typescript
if (hostTarget.tagName === "UI5-RADIO-BUTTON") { ... }
if (target.tagName.startsWith("UI5-")) { ... }
```

Per project conventions (AGENTS.md), tag-name-based checks are discouraged. The `isInstanceOfComponent` utility or a duck-typing interface would be more robust against custom element name changes.

### 4. RadioButtonGroup import creates a circular-dependency risk

```typescript
import RadioButtonGroup from "./RadioButtonGroup.js";
```

`ToolbarItem` now imports `RadioButtonGroup` to call `selectItem`. This couples a generic container to a specific control's internals. A better approach might be to dispatch a synthetic arrow-key event to the radio button and let it handle its own selection, or have radio buttons expose a public API for programmatic selection.

### 5. `_findToolbarItem` has O(n) nested lookups

```typescript
_findToolbarItem(focusRef: HTMLElement, active?: HTMLElement | null): ToolbarItemBase | undefined {
    return this.standardItems.find(item => {
        // Multiple DOM queries per item
    });
}
```

This is called on every keydown. With many toolbar items, the nested `contains()` / `shadowRoot?.contains()` checks could be expensive. Consider caching the mapping between DOM refs and toolbar items after render.

### 6. No cleanup of `_originalTabIndexes` WeakMap entries

The `WeakMap` itself handles GC, but `_storeOriginalTabIndex` only stores if not already present:

```typescript
_storeOriginalTabIndex(target: HTMLElement) {
    if (!this._originalTabIndexes.has(target)) {
        this._originalTabIndexes.set(target, target.getAttribute("tabindex"));
    }
}
```

If a component dynamically changes its tabindex (e.g., becomes disabled/enabled), the stored "original" becomes stale. Consider refreshing on each render cycle.

### 7. `_getEventOriginIndex` uses `reduce` for a find-first operation

```typescript
_getEventOriginIndex(e: KeyboardEvent, targets: HTMLElement[]): number {
    return e.composedPath()
        .filter(...)
        .reduce((foundIdx, node) => { ... }, -1);
}
```

This continues iterating the entire composed path even after finding a match. A simple `for` loop with early return would be clearer and marginally faster.

### 8. ToolbarItem test coverage relies on `ToolbarItem` wrapping arbitrary content

The tests mount patterns like:
```tsx
<ToolbarItem>
    <RadioButton name="group1" text="Option 1" />
    <RadioButton name="group1" text="Option 2" />
</ToolbarItem>
```

Is this a documented/supported usage pattern? If ToolbarItem is intended as a generic wrapper, the public API documentation should reflect this. Currently the PR description mentions this behavior but the component's JSDoc (`@since`) doesn't describe the keyboard contract for consumers.

### 9. Minor: Commented arrow in `shouldHandleOwnKeyboardNavigation`

```typescript
// Up/Down are always owned ? they open the dropdown or navigate options.
```

The `?` seems like a leftover from a non-ASCII character (arrow or similar). Use standard ASCII in comments.

### 10. Test: missing focus assertion chain

```typescript
cy.get("ui5-radio-button[text='Option 2']")
    .and("have.prop", "checked", true);  // Missing .should("be.focused") before .and()
```

Line 198 in the diff — `.and()` without a preceding `.should()` assertion on that same chain. The test may pass incidentally but the intent seems to also check focus.

---

## Potential Risks

1. **Breaking change for existing consumers** — The toolbar now intercepts all arrow keys at the container level. Any component that previously relied on arrow-key events bubbling through the toolbar without interception will need to opt in via `handlesOwnKeyboardNavigation`. The PR doesn't mention migration guidance.

2. **Radio group selection side-effect** — Navigating into a radio group via ArrowLeft now *selects* the last radio button (via `RadioButtonGroup.selectItem`). This is opinionated behavior — ARIA doesn't strictly require selection on focus for radio groups within a toolbar. Some AT users may be surprised by selection changes during navigation.

3. **No `F6` / landmark navigation** — The APG toolbar pattern mentions F6 for moving between page landmarks. Not necessarily required for this PR but worth noting for completeness.

---

## Summary

This is a substantial and well-tested APG alignment effort. The core approach (roving tabindex, delegation via `handlesOwnKeyboardNavigation`) is sound. The main concerns are:

- Tight coupling to RadioButton internals via tag-name checks and direct `RadioButtonGroup` import
- The `handlesOwnKeyboardNavigation` being a DOM property rather than internal API
- Heavy use of type casts instead of proper interfaces

I'd suggest addressing items 1, 3, and 4 before merging, as they affect maintainability. The rest are improvements that could follow in a subsequent PR.
