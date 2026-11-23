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
