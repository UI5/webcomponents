# Accessibility

## The accessibility API

These six properties are the public accessibility contract. Application developers set them from outside the component; component developers wire the resolved values into the shadow DOM. They exist because shadow DOM breaks native ARIA ID relationships — a `for` attribute or `aria-labelledby` in the light DOM cannot reach into the shadow tree — so the framework provides a typed abstraction instead.

Interactive components expose a subset of this surface; match the property names exactly.

| Property | Type | Purpose |
|----------|------|---------|
| `accessibleName` | string | Direct label text |
| `accessibleNameRef` | string | Space-separated IDs of elements whose text forms the label |
| `accessibleDescription` | string | Longer description |
| `accessibleDescriptionRef` | string | IDs of elements forming the description |
| `accessibleRole` | `` `${SomeRole}` `` | Overrides the default ARIA role |
| `accessibilityAttributes` | `AccessibilityAttributes` | `expanded`, `hasPopup`, `controls`, `role`, `ariaLabel`, ... |

Components opt into a subset — not every one carries all six. `accessibleDescriptionRef` in particular is absent from many (Button, Link, Icon).

### Which properties to expose on a new component

| Property | Include when |
|----------|--------------|
| `accessibleName` / `accessibleNameRef` | The component is interactive or a landmark and may appear without visible label text. Almost always pair them. |
| `accessibleDescription` / `accessibleDescriptionRef` | The component is complex enough that supplementary description is meaningful (lists, tables, dialogs, pickers). Pair them. |
| `accessibleRole` | The component can legitimately take on semantically distinct roles by use case — not as a general-purpose escape hatch. |
| `accessibilityAttributes` | The component has interactive states or relationships its own properties cannot express, or it opens/controls other components. |

`AccessibilityAttributes` is a real type, not a free-form object. Narrow it per component with `Pick`:

```ts
type ButtonAccessibilityAttributes = Pick<AccessibilityAttributes, "expanded" | "hasPopup" | "controls" | "ariaKeyShortcuts" | "ariaLabel">;

@property({ type: Object })
accessibilityAttributes: ButtonAccessibilityAttributes = {};
```

Not every `*AccessibilityAttributes` type is a `Pick`, though — `ListAccessibilityAttributes` is a bespoke nested object (`{ growingButton?: { name?, description? } }`), unrelated to the base type. Check the actual declaration before assuming.

### Resolving the texts

Every helper below comes from `@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js`.

| Helper | Returns | Use when |
|--------|---------|----------|
| `getEffectiveAriaLabelText(el)` | ref texts, else `accessibleName`, else `undefined` | Default label source for any component with `accessibleName` / `accessibleNameRef`. Does **not** resolve native `<label for>`. |
| `getAssociatedLabelForTexts(el)` | joined text of `<label for={this.id}>` | Form controls that can be labelled by an external `<label for>`. |
| `getEffectiveAriaDescriptionText(el)` | ref texts, else `accessibleDescription`, else `undefined` | Description for components with `accessibleDescription` / `accessibleDescriptionRef`. |
| `getAllAccessibleNameRefTexts(el)` | joined text of the `accessibleNameRef` targets | Inside a `registerUI5Element` callback to refresh cached name-ref texts. |
| `getAllAccessibleDescriptionRefTexts(el)` | joined text of the `accessibleDescriptionRef` targets | Inside a `registerUI5Element` callback to refresh cached description-ref texts. |

For form controls, combine label sources in one getter:

```ts
get ariaLabelText() {
  return getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this);
}
```

### Keeping the ref texts live

If a referenced element's text changes after render, the component will not re-render unless it observes that mutation. Without `registerUI5Element`, a live update to an `accessibleNameRef` or `accessibleDescriptionRef` target leaves stale `aria-label` / `aria-description` values in the shadow DOM.

Call `registerUI5Element` in `onEnterDOM` only when the component reads `accessibleNameRef`, `accessibleDescriptionRef`, or `<label for>` associations that can change after mount. Skip it when the label is a static `accessibleName` string with no external references. Call `deregisterUI5Element(this)` in `onExitDOM`. The helper is idempotent — a second call on the same element is a no-op.

The registered callback refreshes whichever ref texts the component actually reads — there is no single canonical method. Names and fields vary: `List` uses `_updateAssociatedLabelsTexts` refreshing both name and description ref texts; `Button` uses `_updateAccessibleNameRefTexts` (name only); `Input` refreshes label-for, name and description texts under different field names. Copy the shape, not the exact identifiers:

```ts
// List's variant — mirror the fields your component reads, don't paste verbatim
_updateAssociatedLabelsTexts() {
  this._associatedDescriptionRefTexts = getAllAccessibleDescriptionRefTexts(this);
  this._associatedLabelsRefTexts = getAllAccessibleNameRefTexts(this);
}
```

## Wiring ARIA in the template

ARIA and `tabindex` go on the focusable inner element, **never on the host**. Shadow DOM hosts are largely invisible to the accessibility tree; assistive technology reads the inner shadow content. Placing `role` or `aria-*` on the host has no reliable effect.

Two patterns exist for marking the focusable element:

- **`data-sap-focus-ref`** — an explicit marker (Button's inner `<button>`, Input's inner `<input>`). Required when the focus target is not the first shadow child (e.g. a non-focusable wrapper precedes the control).
- **First shadow child** — CheckBox, RadioButton, Link, Switch put ARIA/`tabindex`/`role` on the first element in the shadow root and skip the marker; `getFocusDomRef()` falls back to `getDomRef()` (the first shadow child).

```tsx
disabled={this.disabled}
data-sap-focus-ref
tabindex={this.tabIndexValue}
aria-expanded={this._computedAccessibilityAttributes?.expanded}
aria-label={this._computedAccessibilityAttributes?.ariaLabel}
aria-description={this.ariaDescriptionText}
role={this.effectiveAccRole}
```

### Presence-only vs state ARIA attributes

Split by attribute kind:

- **Presence-only** (`aria-disabled`, `aria-readonly`, `aria-label`, `aria-required`, `aria-description`): return the value or `undefined` — never `false` or an empty string. `aria-disabled={false}` renders as the literal string `"false"`, which AT may treat as disabled.
- **State** (`aria-checked`, `aria-selected`, `aria-expanded`): return the explicit boolean or string value even when `false` — AT needs the explicit state. `aria-checked="false"` and `aria-expanded="false"` are valid and necessary.

Bundle many ARIA outputs into one getter the template reads (e.g. an `accInfo` getter feeding the template).

### `accessibilityInfo` for containers

Expose an `accessibilityInfo` getter when the component may be slotted into a container that synthesizes custom screen-reader announcements (e.g. `ui5-table`, `ui5-list`). The return type is `AccessibilityInfo` from `packages/base/src/types.ts`:

```ts
import type { AccessibilityInfo } from "@ui5/webcomponents-base/dist/types.js";

get accessibilityInfo(): AccessibilityInfo {
  return {
    role: this.effectiveAccRole,
    label: this.ariaLabelText,
    description: this.ariaDescriptionText,
    disabled: this.disabled,
    type: this.effectiveAccRoleTranslation, // i18n role description
    children: this.text,
  };
}
```

The base `UI5Element` default returns `undefined`; override only when a parent needs to describe a slotted child.

### `tooltip`

Bind `tooltip` to the native `title` attribute on the focusable inner element, never on the host — a `title` on the custom element host produces redundant or incorrect AT output. `ui5-icon` is the exception: it uses `showTooltip` with an SVG `<title>` child, not a `tooltip` property.

## Focus

`delegatesFocus: true` in `shadowRootOptions` lets a native `element.focus()` from an application reach the inner control when the host itself isn't focusable. It is **not** required for every focusable component — only a few use it (Button, ColorPicker, ColorPaletteItem). Without it, programmatic `element.focus()` on the host (with no `tabindex`) silently loses focus. Most focusable components (CheckBox, RadioButton, Input, Link, Switch, Slider, Select) put `tabindex` on their inner shadow child and rely on `UI5Element.focus()` → `getFocusDomRef()` instead.

| API | Purpose | Source |
|-----|---------|--------|
| `getFocusDomRef()` | The `[data-sap-focus-ref]` element, else `getDomRef()` (first shadow child) | `UI5Element.ts` |
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

Use this when a component presents a group of related items where arrow keys navigate between them and Tab treats the whole group as a single stop (lists, tabs, segmented buttons, breadcrumbs, etc.).

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

In a container `onKeyDown`, resolve the intended item from `event.composedPath()`, not `e.target` — the handler receives keydowns from every descendant, and treating a non-item target as an item steals focus back into the group.

### `div` with `role="button"`

Prefer a native `<button>` when semantics fit. Reach for `div`/`svg` + `role="button"` when the design requires an element that cannot be a native button — color swatches, SVG icons, avatars with slots/badges, or complex block-level layout (see Avatar, ColorPaletteItem, List growing button).

Check disabled first and bail with `preventDefault`. Fire the action on Enter in `onKeyDown`; `preventDefault` Space in `onKeyDown` and fire it in `onKeyUp`, matching native button timing. Pairing these with `onMouseDown` does not double-fire, because browsers do not fire `mousedown` on keyboard activation of a `<div>`.

## Announcing dynamic changes

Use the shared live region, not a hand-rolled `aria-live` element. Live regions must exist in the DOM and be initialized empty before the announcement fires — a region created at announcement time is often silently ignored by AT. `InvisibleMessage.ts` boot-initializes empty `aria-live` spans in a singleton and swaps `textContent` on demand.

Call `announce` inside event handlers fired by user interaction when UI state changes dynamically and that change is not already expressed by a newly focused element. Canonical patterns: `ColorPicker._togglePickerMode` (mode switch) and `List` selection confirmation.

```ts
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
announce(selectedText, "Polite");
```

Both `announce(text, "Polite")` and `announce(text, InvisibleMessageMode.Polite)` are valid — `InvisibleMessageMode` is a const-object, and most call sites access its members. The string literal is accepted by the signature and reads cleaner, but the enum form is not a rule violation. Compose the text from the i18n bundle first — build "option text + position" before announcing. See `i18n.md`.

## Disabled state

Split by whether the native `disabled` attribute is valid on the focusable element:

- **Native control** (`<button>`, `<input>`, `<textarea>`, `<select>`) — render the native attribute and drop the tabindex: `disabled={this.disabled}` in the template, with a `tabIndexValue`-style getter returning `undefined` when disabled. The native element already removes itself from the tab order and needs no `aria-disabled`.
- **No native `disabled` support** (custom element hosts, `div`/`span` with ARIA roles) — bind `aria-disabled` (`true` / `undefined`, never `false`) and force the tabindex to `-1` when disabled. Naming varies by component (`_ariaDisabled`, `isDisabled`, `accInfo.ariaDisabled`; `_effectiveTabIndex` or an inline ternary) — match the component you're in rather than assuming one canonical getter name.

## Checklist

- [ ] `delegatesFocus: true` in `shadowRootOptions` **only if** the host has no focusable element in the natural tab order and the app may call native `element.focus()` on the host
- [ ] ARIA and `tabindex` on the inner focusable element (`[data-sap-focus-ref]` or first shadow child), never the host
- [ ] `accessibleName` / `accessibleNameRef` via the helpers, plus `<label for>` for form controls
- [ ] `registerUI5Element` when `accessibleNameRef`, `accessibleDescriptionRef`, or `<label for>` targets can change after mount
- [ ] `ItemNavigation` for item groups, with `forcedTabIndex` bound in the template
- [ ] `role="button"` fires Enter on `onKeyDown` and Space on `onKeyUp`
- [ ] `Escape` closes the popup, and `focusOpener()` returns focus to the trigger
- [ ] Disabled expressed natively or via `aria-disabled`, and removed from tab order
- [ ] `tooltip` bound to `title` on the inner focusable element, not the host
- [ ] Every announced or rendered string comes from the i18n bundle

## Testing

This repo has no axe or automated accessibility tooling. Coverage means an explicit Cypress test — `cy.realPress` plus focus and attribute assertions. For manual screen-reader testing, the reference environment is **JAWS 2025 + Chrome (latest)**; for HTML/ARIA validation, use **Access Assistant**. See `docs/2-advanced/09-accessibility.md` for the full testing policy.
