# `title=` → `data-ui5-tooltip` Migration Design

**Date:** 2026-11-04
**Branch:** enhanced_tooltips
**Status:** Design — awaiting approval

## Goal

Replace every native `title=` attribute in `packages/main` and `packages/fiori` JSX templates with the project's enhanced `data-ui5-tooltip` mechanism, **without regressing accessibility**: every element that loses a native `title` must retain its accessible text through ARIA.

## Hard invariant (non-negotiable)

> **When a `title` is removed, the element's accessible text must still reach assistive tech.** `data-ui5-tooltip` is **visual-only** — it sets no ARIA. Therefore every conversion either (a) relies on a pre-existing sibling `aria-*` that already carries the text, or (b) routes the text into `aria-description` / `accessibleName`. No element ends up visual-only with nothing for screen readers.

Concretely, the per-emitter pattern already used by Button/Link: a composed getter
```ts
get ariaDescriptionText() {
  return [existingDescription, tooltipText].filter(Boolean).join(" ") || undefined;
}
```
emitted as `aria-description={this.ariaDescriptionText}`. Returning `undefined` when empty means the JSX renderer drops the attribute (no stray empty `aria-description`).

## Dependencies & ordering

1. **Phase 0 — Delegation first (prerequisite).** The current `TooltipSupport` only *opens* and uses a non-scoping-safe `createElement("ui5-tooltip")` with no close logic. Implement `docs/superpowers/plans/2026-11-04-data-ui5-tooltip-delegation.md` (Option A) so the shared tooltip opens, closes, and is scoping-safe. Browser-verify before touching emitters. **Without this, no converted component can be browser-verified.**
2. **Phase 1 — main package conversions.**
3. **Phase 2 — fiori package conversions.**

Each converted component needs **two edits**: the template (`title` → `data-ui5-tooltip`) **and** the `.ts` (`startTooltipSupport()` on `onEnterDOM`). None of the target components call it today (only Button + Title). A `title` converted without wiring is inert.

## Conversion rules by bucket

| Bucket | Rule |
|---|---|
| **TOOLTIP** | `title={X}` → `data-ui5-tooltip={X \|\| undefined}`. Fold `X` into the element's `aria-description` getter (`[..., X].filter(Boolean).join(" ") \|\| undefined`). Wire `startTooltipSupport()`. |
| **ICON (a11y-safe)** | `title={X}` on `<Icon>` → `data-ui5-tooltip={X \|\| undefined}`. Wire support. (Breadcrumbs arrow: parent Link already names it.) |
| **ICON (a11y-risk)** | **Both**: set `accessibleName={X}` on the Icon **and** `data-ui5-tooltip={X \|\| undefined}`. Per user decision. 4 cases. |
| **REDUNDANT-A11Y** | `title={X}` → `data-ui5-tooltip={X \|\| undefined}`. Existing sibling/parent `aria-label={X}` already carries a11y — no reroute needed. Wire support. |
| **PROP-PASSTHROUGH** | Where the prop is used as a tooltip, replace it with the receiving component's `tooltip` property so the receiver renders a real enhanced tooltip (per user decision). 5 cases. |
| **EXCLUDE** | Leave untouched. 1 case (`onui5-toggle-title` event). |

## Per-occurrence conversion table

### packages/main

| file:line | element | value | bucket | conversion |
|---|---|---|---|---|
| AvatarBadgeTemplate.tsx:11 | `<Icon>` | `this.effectiveTooltip` | ICON | `data-ui5-tooltip`; wire support on AvatarBadge |
| BreadcrumbsTemplate.tsx:25 | `<Icon>` inside `<Link accessibleName>` | `this._dropdownArrowAccessibleNameText` | ICON (redundant) | `data-ui5-tooltip`; Link already names it; wire support on Breadcrumbs |
| BusyIndicatorTemplate.tsx:13 | `<div role=progressbar>` | `this.ariaTitle` | REDUNDANT-A11Y | `data-ui5-tooltip`; `aria-labelledby`/`aria-valuetext` keep a11y; wire support |
| CalendarHeaderTemplate.tsx:62 | prev-btn `<div role=button>` | `this.accInfo.tooltipPrevButton` | TOOLTIP | `data-ui5-tooltip`; distinct `aria-label`/`aria-description` already present; wire support on CalendarHeader |
| CalendarHeaderTemplate.tsx:92 | month-btn | `this.accInfo.tooltipMonthButton` | TOOLTIP | as above |
| CalendarHeaderTemplate.tsx:116 | year-btn | `this.accInfo.tooltipYearButton` | TOOLTIP | as above |
| CalendarHeaderTemplate.tsx:134 | year-range-btn | `this.accInfo.tooltipYearRangeButton` | TOOLTIP | as above |
| CalendarHeaderTemplate.tsx:169 | next-btn | `this.accInfo.tooltipNextButton` | TOOLTIP | as above |
| CarouselTemplate.tsx:69 | `<Icon arrow-back>` | `this.previousPageText` | ICON (a11y-risk) | `accessibleName={this.previousPageText}` + `data-ui5-tooltip`; wire support on Carousel |
| CarouselTemplate.tsx:82 | `<Icon arrow-forward>` | `this.nextPageText` | ICON (a11y-risk) | `accessibleName={this.nextPageText}` + `data-ui5-tooltip` |
| ColorPaletteItemTemplate.tsx:11 | `<div role=button>` | `this.getLabelText` | REDUNDANT-A11Y | `data-ui5-tooltip`; existing `aria-label={this.getLabelText}`; wire support on ColorPaletteItem |
| DayPickerTemplate.tsx:44 | day `<div role=gridcell>` | `day.tooltip` | TOOLTIP | `data-ui5-tooltip`; distinct `aria-label`; wire support on DayPicker. Note: per-cell value, not a getter — attribute only. |
| DialogTemplate.tsx:68 | resize-handle `<div>` | `this._resizeHandleTooltip` | TOOLTIP | `data-ui5-tooltip`; decorative, no aria needed (keyboard handle separate); wire support on Dialog/Popup base |
| FileUploaderTemplate.tsx:32 | `<input type=file>` | `this.inputTitle` | REDUNDANT-A11Y | `data-ui5-tooltip`; existing `aria-label`/`aria-description`; wire support on FileUploader |
| FileUploaderTemplate.tsx:77 | `<Icon decline>` clear | `this.clearIconTitle` | ICON (a11y-risk) | `accessibleName={this.clearIconTitle}` + `data-ui5-tooltip` |
| FileUploaderTemplate.tsx:85 | hidden `<input aria-hidden tabindex=-1>` | `this.inputTitle` | OTHER/INTERNAL | leave native title (aria-hidden, non-focusable, never surfaces) — documented no-op |
| FileUploaderTemplate.tsx:95 | `<Icon browse>` value-help | `this.valueHelpTitle` | ICON (a11y-risk) | `accessibleName={this.valueHelpTitle}` + `data-ui5-tooltip` |
| InputIconTemplate.tsx:16 | `<div role=button tabindex=-1>` | `this.effectiveTitle` | TOOLTIP | `data-ui5-tooltip`; existing `aria-label`; wire support on Icon/InputIcon owner |
| LinkTemplate.tsx:14 | `<a class=ui5-link-root>` | `this.tooltip` | TOOLTIP | `data-ui5-tooltip`; fold into existing `ariaDescriptionText`; wire support on Link |
| ListItemBaseTemplate.tsx:20 | `<li part=native-li>` | `injectedProps?.title` | PROP-PASSTHROUGH | if used as tooltip, inject via `tooltip`/`data-ui5-tooltip` instead of native title at the injection site |
| ListItemTemplate.tsx:50 | `<li part=native-li>` | `this._accInfo.tooltip` | TOOLTIP | `data-ui5-tooltip`; `aria-labelledby`/`aria-describedby` keep a11y; wire support on ListItem |
| NumericInputTemplate.tsx:22 | dec `<div>` wraps `<Icon accessibleName showTooltip>` | `this.decIconTitle` | REDUNDANT-A11Y | drop outer native title (inner Icon `accessibleName`+`showTooltip` already covers); optional `data-ui5-tooltip` on div; wire support |
| NumericInputTemplate.tsx:73 | inc `<div>` wraps `<Icon>` | `this.incIconTitle` | REDUNDANT-A11Y | as above |
| PopoverTemplate.tsx:41 | resize-handle `<div>` | `this._resizeHandleTooltip` | TOOLTIP | `data-ui5-tooltip`; decorative; wire support on Popover |
| RatingIndicatorTemplate.tsx:23 | `<div role=slider>` | `this.ratingTooltip` | TOOLTIP | `data-ui5-tooltip`; fold `ratingTooltip` into `_ariaDescription` (preserve "required"); wire support on RatingIndicator |
| SegmentedButtonItemTemplate.tsx:19 | `<li role=option>` | `this.tooltip \|\| this.slotTextContent` | TOOLTIP | `data-ui5-tooltip`; fold into `aria-description`; wire support on SegmentedButtonItem |
| SelectTemplate.tsx:16 | outer `<div ui5-select-root>` | `this._effectiveTooltip` | TOOLTIP | `data-ui5-tooltip`; combobox aria on inner div; add `aria-description` fold on the labeled element; wire support on Select |
| SwitchTemplate.tsx:31 | `<div role=switch>` | `this.tooltip` | TOOLTIP | `data-ui5-tooltip`; fold into `aria-description`; wire support on Switch |
| TabInStripTemplate.tsx:76 | expand-btn `<div>` | `this.expandButtonTitle` | TOOLTIP | `data-ui5-tooltip`; decorative; wire support on owner (Tab/TabContainer) |
| TableSelection.tsx:175 | `<CheckBox>` | i18n select/deselect-all | PROP-PASSTHROUGH | pass via CheckBox `tooltip` property (CheckBox migrated to emit `data-ui5-tooltip`); `accessibleName` sibling stays |
| TableSelectionMulti.tsx:132 | `<CheckBox>` | i18n select/deselect-all | PROP-PASSTHROUGH | as above |
| TagTemplate.tsx:11 | `<button ui5-tag-root>` | `this._title` | TOOLTIP | `data-ui5-tooltip`; fold into `aria-description`; wire support on Tag |
| TagTemplate.tsx:20 | non-interactive `<div ui5-tag-root>` | `this._title` | TOOLTIP | `data-ui5-tooltip` (hover/touch only, non-focusable); wire support on Tag |

### packages/fiori

| file:line | element | value | bucket | conversion |
|---|---|---|---|---|
| DynamicPageTemplate.tsx:15 | `<div>` | `onui5-toggle-title` (event) | EXCLUDE | leave — not a `title=` attribute |
| NotificationListGroupItemTemplate.tsx:35 | group-header `<div role=button>` | `this.toggleIconAccessibleName` | TOOLTIP | `data-ui5-tooltip`; group named by outer `<li aria-labelledby>`; wire support |
| ShellBarLegacyTemplate.tsx:71 | `<span ui5-shellbar-logo>` | `legacy.logoAriaLabel` | REDUNDANT-A11Y | `data-ui5-tooltip`; existing `aria-label`; wire support on ShellBarLegacy |
| ShellBarLegacyTemplate.tsx:100 | single-logo `<span role tabIndex=0>` | `legacy.logoAriaLabel` | REDUNDANT-A11Y | as above |
| ShellBarLegacyTemplate.tsx:129 | combined-logo `<span>` | `legacy.logoAriaLabel` | REDUNDANT-A11Y | `data-ui5-tooltip`; parent area `aria-label` covers it |
| SideNavigationGroupTemplate.tsx:35 | `<div role=treeitem>` | `this._tooltip` | TOOLTIP | `data-ui5-tooltip`; **guard**: when `accessibleName` empty, also ensure `aria-label`/description carries `_tooltip` (a11y-risk); wire support |
| SideNavigationItemTemplate.tsx:35 | `<EffectiveTag>` | `this._tooltip` | TOOLTIP | `data-ui5-tooltip`; heavy aria already names it; wire support |
| SideNavigationPopoverTemplate.tsx:18 | `<NavigationMenuItem>` | `item.title` | PROP-PASSTHROUGH | pass via NavigationMenuItem `tooltip` property (already has `tooltip={item._tooltip}` — consolidate) |
| SideNavigationPopoverTemplate.tsx:31 | nested `<NavigationMenuItem>` | `item.title` | PROP-PASSTHROUGH | as above |
| SideNavigationSubItemTemplate.tsx:22 | `<EffectiveTag>` | `this._tooltip` | TOOLTIP | `data-ui5-tooltip`; **guard** like SideNavigationGroup; wire support |
| UserMenuTemplate.tsx:109 | wrapper `<span>` | `this.showEditButton ? this._editAvatarTooltip : undefined` | TOOLTIP | `data-ui5-tooltip`; non-focusable (hover/touch only); wire support on UserMenu |
| UserSettingsAccountViewTemplate.tsx:15 | wrapper `<span>` | `this.showEditButton ? this._editAvatarTooltip : undefined` | TOOLTIP | as above |

## Testing strategy

Per the project's testing guidance and the user's global rule (**never assert private fields** — public API and observable behavior only):

1. **TDD Cypress per converted component** (`packages/<pkg>` folder):
   - Assert `title` attribute is **gone** and `data-ui5-tooltip` present on the expected element.
   - Assert the shared `<ui5-tooltip>` (scoped tag) opens on `realHover()` / `realFocus` and closes on leave/Escape.
   - Assert the accessible text is preserved: the element exposes the expected `aria-description` / `aria-label` containing the former `title` text (the invariant).
2. **Live browser verification on port 8081** (`yarn start`) — hover/focus each converted control, confirm the tooltip renders and the a11y text is present (DevTools accessibility pane). Required by the user ("test in browser all the time that it works").
3. **Regression:** run each touched component's existing spec; run `Tooltip.cy.tsx` and the new `TooltipSupport.cy.tsx` from Phase 0.
4. Root `yarn ts` + `yarn lint` green before each commit.

## Non-goals / out of scope

- **Input** enhanced tooltip (new public API) — explicitly deferred by the user.
- **MenuButton** — does not exist as a component (only a Button sample).
- Changing the visual appearance, delay, or placement defaults of the tooltip.
- FileUploaderTemplate.tsx:85 (aria-hidden display input) — documented no-op.

## Self-review notes

- Placeholder scan: no TBD; every row has a concrete conversion.
- Consistency: the two edits (template + `startTooltipSupport()`) are stated for every convertible row; the invariant is applied uniformly; a11y-risk rows (4 icons + 2 SideNavigation guards) explicitly route text to ARIA.
- Scope: large (≈38 convertible occurrences across ~30 files) but single-purpose; phased main→fiori keeps each plan testable. Could split into two implementation plans (main, fiori) if preferred.
