# UI5 Web Components — API Naming Patterns Reference

This file documents established naming conventions derived from the codebase. Use it as the first lookup before searching the codebase.

---

## Properties

### Visibility / Rendering toggles → `show*` / `hide*`

Controls whether a UI element is rendered or visible. Dominant pattern across both `packages/main` and `packages/fiori`.

**Prefix `show*`** — element is hidden by default, opt-in to show it:
- `showClearIcon` (Input, DatePicker, MultiComboBox, ComboBox)
- `showTooltip` (Icon, SliderBase)
- `showTickmarks` (SliderBase)
- `showColon` (Label)
- `showRecentColors`, `showMoreColors`, `showDefaultColor` (ColorPalette)
- `showSelectAll` (MultiComboBox)
- `showExceededText` (TextArea)
- `showValueHelpIcon` (MultiInput)
- `showTwoMonths` (DateRangePicker)
- `showSearchField`, `showNotifications`, `showProductSwitch`, `showFooter` (ShellBar, DynamicPage)

**Prefix `hide*`** — element is shown by default, opt-in to hide it:
- `hideWeekNumbers` (Calendar, DatePicker)
- `hideNavigationArrows`, `hidePageIndicator` (Carousel)
- `hideIcon`, `hideCloseButton` (MessageStrip)
- `hideDeleteButton`, `hidePinButton`, `hideRetryButton` (UploadCollectionItem)
- `hideArrow` (Popover)
- `hideStateIcon` (Tag)
- `hideValue` (ProgressIndicator)
- `hideSideContent`, `hideMainContent` (DynamicSideContent)

**Rule:** Choose `show*` when the feature is off by default; choose `hide*` when the feature is on by default. Never use `enable*`/`disable*` for visibility.

---

### Behavioral / functional toggles → `disabled`, `readonly`, specific verb

- Standard `disabled` attribute is used across all interactive elements (Button, Input, Select, etc.)
- `readonly` for read-only state
- `disableResizing` (FlexibleColumnLayout) — prevents a physical interaction
- `disableSearchCollapse` (ShellBar) — prevents a collapse behavior
- Avoid `enable*` prefix for properties — it implies toggling a feature's existence rather than controlling its state

**Rule:** Use `disabled` for the standard disabled state. Use `disable*` only for preventing specific behaviors. Never use `enable*`.

---

### Icon accessible name → `iconAccessibleName` (not `iconTooltip`)

When a host component exposes a property to set the accessible name / tooltip of its internal icon:
- `iconAccessibleName` (TreeItemBase) — public property
- Private computed variants: `_iconAccessibleNameText`, `decIconTitle`, `incIconTitle`

The `accessibleName` + `showTooltip` split on `ui5-icon` itself is the underlying model. Host properties should reflect the semantic purpose (`iconAccessibleName`), not just the visual one (`iconTooltip`).

---

## Events

### Action-verb events (no suffix) — preferred for named actions

Used when the event represents a meaningful, named action or state change:
- `confirm`, `cancel`, `close`, `open` — dialog/popup lifecycle
- `delete`, `rename`, `terminate`, `retry` — item actions (UploadCollectionItem)
- `change`, `input`, `search`, `filter`, `sort` — value/state changes
- `toggle`, `select` — state toggles

**Rule:** For dialog footer buttons and named component actions, always use a plain action verb with no suffix.

### `*-click` suffix — for icon buttons and clickable UI elements

Used when exposing a click on a specific named UI element (icon, logo, area), not a semantic action:
- `notifications-click`, `profile-click`, `logo-click`, `product-switch-click`, `search-button-click` (ShellBar)
- `expand-button-click`, `pin-button-click` (DynamicPageHeaderActions)
- `detail-click` (ListItem)
- `item-click`, `row-click` (List, Table, Tree)
- `overflow-click`, `display-area-click` (MediaGallery)
- `name-click` (TimelineItem)
- `arrow-click` (SplitButton)

**Rule:** Use `*-click` only for icon buttons or clickable display elements. Never use it for dialog footer action buttons (those get plain verbs like `confirm`, `cancel`, `reset`).

### Consistency within a component

Events on the same component must follow the same naming pattern. Mixed patterns (e.g. `confirm` + `cancel` + `reset-click` on the same component) are always wrong.

---

## Slots

### Collection slots → plural noun matching the item type

- `sortItems`, `filterItems`, `groupItems` (ViewSettingsDialog)
- `items` (TabContainer, List, Tree)
- `tabs` (UserSettingsItem)
- `actions` (various)

### Custom / user-extensible slots → `custom*` or `additional*`

- `customTabs` (ViewSettingsDialog) — user-provided tabs beyond built-ins
- `additionalContent` (UserSettingsAppearanceView)

**Rule:** Prefer `additionalTabs` over `customTabs` when the items extend a set of built-in items of the same type (more idiomatic). `customTabs` is acceptable but `additionalTabs` better signals "added on top of built-ins".

### Structural / positional slots → semantic name

- `header`, `footer`, `content` (layout)
- `startContent`, `endContent`, `middleContent` (positioning)

---

## JSDoc requirements for public API

Every `@public` property, slot, and event must have:
- `@public` tag
- `@since X.Y.Z` tag
- `@default <value>` tag for properties (except slots)
- A description explaining **what** it does and, for non-obvious cases, **why** / when to use it
- For slots: a note about required imports if a companion element must be imported separately

### Description quality

- Properties controlling visibility: state the default behavior and what changes when set
- Properties controlling behavior: explain the use case, not just the mechanical effect
- Events: describe what user action triggers it; if it carries a detail payload, document the fields
- Slots: name the accepted element type(s); note ordering constraints if any

---

## Silent failures to flag

- A slot that silently ignores items missing a required property (e.g. filtering out items without `icon`) should emit a console warning
- A property whose effect is not obvious from the name alone needs a JSDoc `**Note:**` clarifying the behavior
