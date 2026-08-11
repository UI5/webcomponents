# Accessibility

## The accessibility API

Interactive components expose this surface. Match the names exactly.

| Property | Type | Purpose |
|----------|------|---------|
| `accessibleName` | string | Direct label text |
| `accessibleNameRef` | string | Space-separated IDs of elements whose text forms the label |
| `accessibleDescription` | string | Longer description |
| `accessibleDescriptionRef` | string | IDs of elements forming the description |
| `accessibleRole` | `` `${SomeRole}` `` | Overrides the default ARIA role |
| `accessibilityAttributes` | `AccessibilityAttributes` | `expanded`, `hasPopup`, `controls`, `role`, `ariaLabel`, ... |

Components opt into a subset — not every one carries all six. `accessibleDescriptionRef` in particular is absent from many (Button, Link, Icon).

`AccessibilityAttributes` is a real type, not a free-form object. Narrow it per component with `Pick`: `type ButtonAccessibilityAttributes = Pick<AccessibilityAttributes, "expanded" | "hasPopup" | "controls" | "ariaKeyShortcuts" | "ariaLabel">`. Not every `*AccessibilityAttributes` type is a `Pick`, though — `ListAccessibilityAttributes` is a bespoke nested object (`{ growingButton?: { name?, description? } }`), unrelated to the base type. Check the actual declaration before assuming.

### Resolving the texts

Every helper below comes from `@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js`. `getEffectiveAriaLabelText(el)` returns the `accessibleNameRef` texts, else `accessibleName`. It does **not** resolve native `<label for>` — a form control must combine both:

```ts
get ariaLabelText() {
  return getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this);
}
```

| Helper | Returns |
|--------|---------|
| `getEffectiveAriaLabelText(el)` | ref texts, else `accessibleName`, else `undefined` |
| `getEffectiveAriaDescriptionText(el)` | ref texts, else `accessibleDescription`, else `undefined` |
| `getAllAccessibleNameRefTexts(el)` | joined text of the `accessibleNameRef` targets |
| `getAllAccessibleDescriptionRefTexts(el)` | joined text of the `accessibleDescriptionRef` targets |
| `getAssociatedLabelForTexts(el)` | joined text of `<label for={this.id}>` |

### Keeping the ref texts live

`registerUI5Element` in `onEnterDOM` observes the targets of **both** `accessibleNameRef` and `accessibleDescriptionRef`. Call `deregisterUI5Element(this)` in `onExitDOM`. The registered callback refreshes whichever ref texts the component actually reads — there is no single canonical method. Names and fields vary: `List` uses `_updateAssociatedLabelsTexts` refreshing both name and description ref texts; `Button` uses `_updateAccessibleNameRefTexts` (name only); `Input` refreshes label-for, name and description texts under different field names. Copy the shape, not the exact identifiers:

```ts
// List's variant — mirror the fields your component reads, don't paste verbatim
_updateAssociatedLabelsTexts() {
  this._associatedDescriptionRefTexts = getAllAccessibleDescriptionRefTexts(this);
  this._associatedLabelsRefTexts = getAllAccessibleNameRefTexts(this);
}
```

## Wiring ARIA in the template

ARIA and `tabindex` go on the focusable inner element, **never on the host**. Two patterns exist for marking that element:

- **`data-sap-focus-ref`** — an explicit marker (Button's inner `<button>`). Use when the focus target isn't the first shadow child.
- **First shadow child** — most form components (CheckBox, RadioButton, Link) put ARIA/`tabindex`/`role` on the first element in the shadow root and skip the marker entirely; `getFocusDomRef()` falls back to `shadowRoot.children[0]`. This is the majority pattern.

`data-sap-focus-ref` is therefore optional, not required.

```tsx
disabled={this.disabled}
data-sap-focus-ref
tabindex={this.tabIndexValue}
aria-expanded={this._computedAccessibilityAttributes?.expanded}
aria-label={this._computedAccessibilityAttributes?.ariaLabel}
aria-description={this.ariaDescriptionText}
role={this.effectiveAccRole}
```

- `aria-disabled={false}` renders as the literal string `"false"`; return `undefined` instead.
- Bundle many ARIA outputs into one getter the template reads (e.g. an `accInfo` getter feeding the template).
- Expose an `accessibilityInfo` getter so containers can describe a slotted child.

## Focus

`delegatesFocus: true` in `shadowRootOptions` lets a native `element.focus()` from an application reach the inner control when the host itself isn't focusable. It is **not** required for every focusable component — only a few use it (Button, ColorPicker, ColorPaletteItem). Most focusable components (CheckBox, RadioButton, Input, Link, Switch, Slider, Select) put `tabindex` on their inner shadow child and rely on the `getFocusDomRef()` fallback instead.

| API | Purpose | Source |
|-----|---------|--------|
| `getFocusDomRef()` | The `[data-sap-focus-ref]` element, else the root | `UI5Element.ts` |
| `getFocusDomRefAsync()` | Same, after `_waitForDomRef()` | `UI5Element.ts` |
| `focus(options?)` | Async — awaits rendering | `UI5Element.ts` |
| `getFirstFocusableElement(el)` | Deep first focusable descendant | `FocusableElements.ts` |
| `getLastFocusableElement(el)` | Deep last focusable descendant | `FocusableElements.ts` |
| `Popover.focusOpener()` | Returns focus to the opener | `Popover` |

`ItemNavigation` focuses items through `getFocusDomRef()`; F6 lands a group on `getFirstFocusableElement()`.

## Keyboard

Use the predicates from `Keys.js`, never a raw `event.key` comparison — they encode the modifier rules. `isEnter`, `isSpace`, `isUp`, `isDown`, `isHome`, `isEnd` and `isEscape` follow the same shape. `preventDefault()` on Space, or the page scrolls.

| Predicate | Matches | Source |
|-----------|---------|--------|
| `isTabNext` / `isTabPrevious` | Tab / Shift+Tab | `Keys.ts` |
| `isPageUp` / `isPageDown` | PageUp / PageDown, no modifiers | `Keys.ts` |
| `isShow` | F4, or Alt+ArrowDown / Alt+ArrowUp — open a picker | `Keys.ts` |
| `isF6Next` | F6 or Ctrl+Alt+Down | `Keys.ts` |
| `isF6Previous` | Shift+F6 or Ctrl+Alt+Up | `Keys.ts` |

### F6 fast navigation

`fastNavigation: true` in `@customElement` does exactly one thing: `UI5Element` sets `data-sap-ui-fastnavgroup="true"` on the host. Two more pieces are required.

- The application must import the feature or nothing listens for the key: `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`.
- Handlers react through `isF6Next` / `isF6Previous`, which also cover Shift+F6 and Ctrl+Alt+Arrow.
- Any element carrying `data-sap-ui-fastnavgroup="true"` is a group; it need not be a UI5 component.

### Roving tabindex with `ItemNavigation`

An item group is a single tab stop. `ItemNavigation` computes which item is current and writes `"0"` / `"-1"` into each item's `forcedTabIndex` property; it never touches the DOM `tabindex` attribute directly — the item maps `forcedTabIndex` onto its rendered `tabindex` (see below).

```ts
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
this._itemNavigation = new ItemNavigation(this, {
  skipItemsSize: PAGE_UP_DOWN_SIZE,
  navigationMode: NavigationMode.Vertical,
  getItemsCallback: () => this.getEnabledItems(),
});
```

| Option | Meaning |
|--------|---------|
| `getItemsCallback` | Required. Returns the navigable items |
| `navigationMode` | `Auto` (both axes), `Horizontal`, `Vertical` |
| `rowSize` | Items per row when `navigationMode: Auto` |
| `behavior` | `Static` stops at the ends, `Cyclic` wraps |
| `skipItemsSize` | Items `PageUp` / `PageDown` jump |
| `affectedPropertiesNames` | Root properties to reassign so the root re-renders |

`NavigationMode.Paging` exists in the enum but has no usages, and `_onkeydown` branches only on `Horizontal`, `Vertical` and `Auto` — selecting it disables arrow navigation. Use only those three. The behavior member is `ItemNavigationBehavior.Cyclic`; the constructor param JSDoc's "Cycling" is wrong.

Call `setCurrentItem(item)` when a click selects an item, and `setRowSize(n)` when a grid's column count changes.

**Arrow keys do nothing unless the current item already holds focus** — `_canNavigate()` compares `_getCurrentItem()` with `getActiveElement()`. This explains most reports of broken arrow navigation.

Items must expose `forcedTabIndex` as an `@property()` — `ItemNavigation` writes `"0"` / `"-1"` into it, and on a `UI5Element` item the decorator is what triggers the re-render that flushes the new `tabindex`. A plain class field will not re-render. The item maps it onto the rendered `tabindex`:

```ts
get _effectiveTabIndex() {
  if (!this._focusable) {
    return -1;
  }
  if (this.selected) {
    return 0;
  }
  return this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined;
}
```

`_focusable` is `!this.disabled`; filter the items callback on it so disabled items are skipped. If items are plain `{ id, forcedTabIndex }` objects rather than `UI5Element`s, name the owning root property in `affectedPropertiesNames` so the re-render happens.

In a container `onKeyDown`, resolve the intended item from `event.composedPath()`, not `e.target` — the handler receives keydowns from every descendant, and treating a non-item target as an item steals focus back into the group. See `.claude/memory/ColorPalette/2026-07-08-focus-steal-after-keyboard-navigation.md`.

### `div` with `role="button"`

Check disabled first and bail with `preventDefault`. Fire the action on Enter in `onKeyDown`; `preventDefault` Space in `onKeyDown` and fire it in `onKeyUp`, matching native button timing. Pairing these with `onMouseDown` does not double-fire, because browsers do not fire `mousedown` on keyboard activation of a `<div>`. See `.claude/memory/Calendar/2026-04-28-div-role-button-keyboard-activation.md`.

## Announcing dynamic changes

Use the shared live region, not a hand-rolled `aria-live` element:

```ts
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
announce(selectedText, "Polite");
```

Both `announce(text, "Polite")` and `announce(text, InvisibleMessageMode.Polite)` are valid — `InvisibleMessageMode` is a const-object, and most call sites access its members. The string literal is accepted by the signature and reads cleaner, but the enum form is not a rule violation. Compose the text from the i18n bundle first — build "option text + position" before announcing. See `i18n.md`.

## Disabled state

Split by element type; a natively `disabled` element needs no `aria-disabled`.

- Native control — render the native attribute and drop the tabindex: `disabled={this.disabled}` in the template, with a `tabIndexValue`-style getter returning `undefined` when disabled. The native `<button disabled>` / `<input disabled>` already removes itself from the tab order and needs no `aria-disabled`.
- Non-native role — bind `aria-disabled` (`true` / `undefined`, never `false`) and force the tabindex to `-1` when disabled. Naming varies by component (`_ariaDisabled`, `isDisabled`, `accInfo.ariaDisabled`; `_effectiveTabIndex` or an inline ternary) — match the component you're in rather than assuming one canonical getter name.

## Checklist

- [ ] `delegatesFocus: true` in `shadowRootOptions`
- [ ] ARIA and `tabindex` on the inner focusable element (`[data-sap-focus-ref]` or first shadow child), never the host
- [ ] `accessibleName` / `accessibleNameRef` via the helpers, plus `<label for>` for form controls
- [ ] `ItemNavigation` for item groups, with `forcedTabIndex` bound in the template
- [ ] `role="button"` fires Enter on `onKeyDown` and Space on `onKeyUp`
- [ ] `Escape` closes the popup, and `focusOpener()` returns focus to the trigger
- [ ] Disabled expressed natively or via `aria-disabled`, and removed from tab order
- [ ] Every announced or rendered string comes from the i18n bundle

This repo has no axe or automated accessibility tooling. Coverage means an explicit Cypress test — `cy.realPress` plus focus and attribute assertions.
