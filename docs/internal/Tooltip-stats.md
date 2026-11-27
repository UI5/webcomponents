# Tooltip / `title` usage statistics

Migration surface for the tooltip rework: every component that needs upgrading to
the new `<ui5-tooltip>` + `data-ui5-has-tooltip` model.

Two facts drive the inventory:

- **Every component with a public `tooltip` property realizes it as a native
  `title`** today. So a `tooltip` property always implies native `title` too.
- The remaining components **have no `tooltip` property** but still render a native
  `title` directly in their templates.

The single table below merges both groups. Columns:

- **`tooltip` prop** — has a public `tooltip` property (Yes/No).
- **Native `title`** — renders or forwards a native HTML `title` today (Yes).
- **Interactive** — natively focusable / handles input (Yes), display only (No),
  or depends on a property/mode (Conditional).

## Components to upgrade (37)

| Component | Package | `tooltip` prop | Native `title` | Interactive |
|---|---|---|---|---|
| `ui5-button` | main | Yes | Yes | Yes |
| `ui5-avatar-badge` | main | Yes | Yes | No |
| `ui5-color-palette-item` | main | Yes | Yes | No (navigated by parent ColorPalette) |
| `ui5-link` | main | Yes | Yes | Yes |
| `ui5-menu-item` | main | Yes | Yes | Yes |
| `ui5-option` | main | Yes | Yes | Yes |
| `ui5-option-custom` | main | Yes | Yes | Yes |
| `ui5-segmented-button-item` | main | Yes | Yes | Yes |
| `ui5-rating-indicator` | main | Yes | Yes | Yes |
| `ui5-select` | main | Yes | Yes | Yes |
| `ui5-switch` | main | Yes | Yes | Yes |
| `ui5-toolbar-button` | main | Yes | Yes | Yes |
| `ui5-li` | main | Yes | Yes | Yes |
| `ui5-li-custom` | main | Yes | Yes | Yes |
| `ui5-tree-item` | main | Yes | Yes | Yes |
| `ui5-tree-item-custom` | main | Yes | Yes | Yes |
| `ui5-view-settings-dialog-custom-tab` | fiori | Yes | Yes | Yes |
| `ui5-user-settings-item` | fiori | Yes | Yes | Yes |
| `ui5-side-navigation-item` | fiori | Yes | Yes | Yes |
| `ui5-side-navigation-sub-item` | fiori | Yes | Yes | Yes |
| `ui5-side-navigation-group` | fiori | Yes | Yes | Yes |
| `ui5-icon` | main | No | Yes | Conditional (only in `mode="Interactive"`) |
| `ui5-tag` | main | No | Yes | Conditional (only with `interactive` set) |
| `ui5-numeric-input` | main | No | Yes | Yes |
| `ui5-calendar` | main | No | Yes | Yes |
| `ui5-daypicker` | main | No | Yes | Yes |
| `ui5-dialog` | main | No | Yes | Yes |
| `ui5-popover` | main | No | Yes | Yes |
| `ui5-tab` | main | No | Yes | Yes |
| `ui5-busy-indicator` | main | No | Yes | No |
| `ui5-panel` | main | No | Yes | Yes |
| `ui5-split-button` | main | No | Yes | Yes |
| `ui5-ai-button` | ai | No | Yes | Yes |
| `ui5-shellbar` | fiori | No | Yes | Yes |
| `ui5-li-notification-group` | fiori | No | Yes | Yes |
| `ui5-user-menu` | fiori | No | Yes | No |
| `ui5-user-settings-account-view` | fiori | No | Yes | No |

Base classes defining the inherited `tooltip` property:
`packages/main/src/ListItem.ts` (ui5-li, ui5-li-custom, ui5-menu-item,
ui5-tree-item, ui5-tree-item-custom) and
`packages/fiori/src/SideNavigationItemBase.ts` (ui5-side-navigation-item,
-sub-item, -group). No AI-package component declares a public `tooltip`.

### Source references

Native `title` sites (for the no-`tooltip`-prop rows): `ui5-icon`
`IconTemplate.tsx`/`Icon.ts` (renders `<ui5-tooltip>` from `effectiveAccessibleName`
when `showTooltip`), `ui5-tag` `TagTemplate.tsx`, `ui5-numeric-input`
`NumericInputTemplate.tsx` (step icons), `ui5-calendar` `CalendarHeaderTemplate.tsx`
(nav buttons), `ui5-daypicker` `DayPickerTemplate.tsx` (day cells), `ui5-dialog`
`DialogTemplate.tsx` / `ui5-popover` `PopoverTemplate.tsx` (resize handle),
`ui5-tab` `TabInStripTemplate.tsx` (expand button), `ui5-busy-indicator`
`BusyIndicatorTemplate.tsx`, `ui5-panel` `Panel.ts` / `ui5-split-button`
`SplitButton.ts` / `ui5-ai-button` `ai/Button.ts` (`title` ARIA key forwarded to an
inner button), `ui5-shellbar` `ShellBarLegacyTemplate.tsx` (logo),
`ui5-li-notification-group` `NotificationListGroupItemTemplate.tsx` (toggle icon),
`ui5-user-menu` `UserMenuTemplate.tsx` / `ui5-user-settings-account-view`
`UserSettingsAccountViewTemplate.tsx` (avatar wrapper).

## Summary

- **37 components need the upgrade** to the new tooltip.
- **21** expose a public `tooltip` property — and all 21 realize it as a native
  `title` today, so every `tooltip`-property component is also a native-`title`
  component.
- **16** more have no `tooltip` property but render a native `title` directly.
- All 37 render a native `title` in their current (pre-migration) state.
- The set is predominantly interactive; only a handful are display-only
  (`ui5-avatar-badge`, `ui5-busy-indicator`, `ui5-user-menu`,
  `ui5-user-settings-account-view`, `ui5-color-palette-item`), plus two
  conditional (`ui5-icon`, `ui5-tag`). The non-interactive hosts need the closest
  `aria-describedby` double-announcement review, since their accessible name often
  already equals the tooltip text.
