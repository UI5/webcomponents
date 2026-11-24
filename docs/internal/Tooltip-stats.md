# Tooltip / `title` usage statistics

Migration surface for the tooltip rework. Three inventories: components with a
public `tooltip` property, components using native `title`, and their
interactive/non-interactive split. The **Interactive** column marks each record:
Yes (natively focusable / handles input), No (display only), or Conditional
(depends on a property/mode).

## 1. Components with a public `tooltip` property (21)

| Component | Package | Source | Interactive |
|---|---|---|---|
| `ui5-button` | main | `packages/main/src/Button.ts` | Yes |
| `ui5-avatar-badge` | main | `packages/main/src/AvatarBadge.ts` | No |
| `ui5-color-palette-item` | main | `packages/main/src/ColorPaletteItem.ts` | No (navigated by parent ColorPalette) |
| `ui5-link` | main | `packages/main/src/Link.ts` | Yes |
| `ui5-menu-item` | main | `packages/main/src/MenuItem.ts` (+ inherits ListItem) | Yes |
| `ui5-option` | main | `packages/main/src/Option.ts` | Yes |
| `ui5-option-custom` | main | `packages/main/src/OptionCustom.ts` | Yes |
| `ui5-segmented-button-item` | main | `packages/main/src/SegmentedButtonItem.ts` | Yes |
| `ui5-rating-indicator` | main | `packages/main/src/RatingIndicator.ts` | Yes |
| `ui5-select` | main | `packages/main/src/Select.ts` | Yes |
| `ui5-switch` | main | `packages/main/src/Switch.ts` | Yes |
| `ui5-toolbar-button` | main | `packages/main/src/ToolbarButton.ts` | Yes |
| `ui5-li` | main | inherited from `packages/main/src/ListItem.ts` | Yes |
| `ui5-li-custom` | main | inherited from `packages/main/src/ListItem.ts` | Yes |
| `ui5-tree-item` | main | inherited via TreeItemBase from `ListItem.ts` | Yes |
| `ui5-tree-item-custom` | main | inherited via TreeItemBase from `ListItem.ts` | Yes |
| `ui5-view-settings-dialog-custom-tab` | fiori | `packages/fiori/src/ViewSettingsDialogCustomTab.ts` | Yes |
| `ui5-user-settings-item` | fiori | `packages/fiori/src/UserSettingsItem.ts` | Yes |
| `ui5-side-navigation-item` | fiori | inherited from `SideNavigationItemBase.ts` | Yes |
| `ui5-side-navigation-sub-item` | fiori | inherited from `SideNavigationItemBase.ts` | Yes |
| `ui5-side-navigation-group` | fiori | inherited from `SideNavigationItemBase.ts` | Yes |

Base classes defining the inherited property: `packages/main/src/ListItem.ts`,
`packages/fiori/src/SideNavigationItemBase.ts`. No AI-package component declares a
public `tooltip`.

## 2. Components using native `title` (21)

| Component | Package | File | Use | Interactive |
|---|---|---|---|---|
| `ui5-icon` | main | `IconTemplate.tsx` / `Icon.ts` | renders `<ui5-tooltip>` from `effectiveAccessibleName` when `showTooltip` | Conditional (only in `mode="Interactive"`) |
| `ui5-tag` | main | `TagTemplate.tsx` | native `title` on root button/div | Conditional (only with `interactive` set) |
| `ui5-li` + ListItem family | main | `ListItemTemplate.tsx` | native `title` from `_accInfo.tooltip` | Yes |
| `ui5-select` | main | `SelectTemplate.tsx` | native `title` from `_effectiveTooltip` | Yes |
| `ui5-numeric-input` | main | `NumericInputTemplate.tsx` | native `title` on step icons | Yes |
| `ui5-calendar` | main | `CalendarHeaderTemplate.tsx` | native `title` on nav buttons | Yes |
| `ui5-daypicker` | main | `DayPickerTemplate.tsx` | native `title` per day cell | Yes |
| `ui5-dialog` | main | `DialogTemplate.tsx` | native `title` on resize handle | Yes |
| `ui5-popover` | main | `PopoverTemplate.tsx` | native `title` on resize handle | Yes |
| `ui5-tab` | main | `TabInStripTemplate.tsx` | native `title` on expand button | Yes |
| `ui5-busy-indicator` | main | `BusyIndicatorTemplate.tsx` | native `title` on busy area | No |
| `ui5-panel` | main | `Panel.ts` | `title` ARIA key forwarded to inner button | Yes |
| `ui5-split-button` | main | `SplitButton.ts` | `title` ARIA key forwarded to inner buttons | Yes |
| `ui5-ai-button` | ai | `Button.ts` | `title` ARIA key forwarded to inner buttons | Yes |
| `ui5-side-navigation-item` | fiori | `SideNavigationItemTemplate.tsx` | native `title` from `_tooltip` | Yes |
| `ui5-side-navigation-sub-item` | fiori | `SideNavigationSubItemTemplate.tsx` | native `title` from `_tooltip` | Yes |
| `ui5-side-navigation-group` | fiori | `SideNavigationGroupTemplate.tsx` | native `title` from `_tooltip` | Yes |
| `ui5-shellbar` | fiori | `ShellBarLegacyTemplate.tsx` | native `title` on logo | Yes |
| `ui5-li-notification-group` | fiori | `NotificationListGroupItemTemplate.tsx` | native `title` on toggle icon | Yes |
| `ui5-user-menu` | fiori | `UserMenuTemplate.tsx` | native `title` on avatar wrapper | Yes |
| `ui5-user-settings-account-view` | fiori | `UserSettingsAccountViewTemplate.tsx` | native `title` on avatar wrapper | No |

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
