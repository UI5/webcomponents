# Toolbar overflow group

## Problem Statement

As a developer using `ui5-toolbar`, I currently have no way to ensure that semantically related items stay together when the toolbar runs out of room. Each item decides independently — purely by its own `overflowPriority` and the available space — whether to move into the overflow popover. This breaks logical associations: a label can end up in the bar while its control gets pushed to the popover, a label+separator+control cluster can be sliced through the middle, and a grouped set of filter buttons can be split across the bar and popover at the same time.

The user-visible result is loss of context. A "Filter:" label without its dropdown is meaningless; a "Range" label without the date-picker beside it is worse. Apps migrating from SAPUI5's `OverflowToolbar` — which solves this with the `overflowGroup` property — have no equivalent in UI5 Web Components and must work around it with custom wrappers or by abandoning the toolbar entirely.

## Solution

`ui5-toolbar-item` (and all its subclasses — `ui5-toolbar-button`, `ui5-toolbar-select`, `ui5-toolbar-separator`, and the generic `ui5-toolbar-item` wrapper) gains a new public property: `overflowGroup`. Developers assign a free-form string label to two or more items, and the toolbar guarantees they overflow together: either all visible in the bar, or all in the overflow popover, never split. Items without a group keep today's per-item overflow behavior unchanged.

The feature mirrors SAPUI5's `OverflowToolbar` behavior so apps migrating between the two frameworks see the same outcome from the same configuration.

## User Stories

1. As a toolbar developer, I want to assign two or more toolbar items to a named group, so that they always overflow together and never appear split between the bar and the popover.
2. As a toolbar developer, I want to label a `ui5-toolbar-button` and its sibling control with the same `overflowGroup`, so that the label never appears in the bar without its control.
3. As a toolbar developer, I want to keep a `ui5-toolbar-separator` together with the controls it separates by assigning all of them the same `overflowGroup`, so that the separator never ends up alone or orphaned in the bar.
4. As a toolbar developer, I want to use a meaningful name like `"filters"` or `"search"` as the group identifier, so that my markup is self-documenting and I don't have to track magic numbers.
5. As a toolbar developer, I want the default (no group) behavior to be exactly what it is today, so that adopting the new property is opt-in and existing toolbars need no changes.
6. As a developer migrating from SAPUI5, I want the same items I grouped with `overflowGroup` in SAPUI5 to overflow together here too, so that the migration is behavioral parity at the attribute level.
7. As a toolbar developer, I want to place ungrouped items between group members in my markup, so that I don't have to reorder my source to fit a contiguity rule.
8. As a toolbar end user, I want grouped items to appear next to each other in the overflow popover, so that I can find related actions together regardless of where they sat in the bar.
9. As a toolbar end user, I want the visible bar to always show items in the order the developer wrote them, so that my muscle memory and screen-reader narration stay consistent.
10. As a toolbar developer, I want to change an item's `overflowGroup` at runtime, so that I can group/ungroup items in response to user actions or app state, and the bar re-lays-out automatically.
11. As a toolbar developer, I want a clear console warning when I put `AlwaysOverflow` or `NeverOverflow` on a grouped item, so that I learn the rule without my page silently misbehaving.
12. As a toolbar developer, I want a clear console warning when I set `overflowGroup` on a `ui5-toolbar-spacer`, so that I understand spacers can't participate in grouping.
13. As a toolbar end user, I want `overflowGroup` to leave my `NeverOverflow`-pinned items alone (they're never inside a group), so that the toolbar's minimum width contract is unchanged.
14. As a toolbar developer, I want grouped overflow to work when the overflow popover is placed above the toolbar (reverse-order mode), so that the group stays adjacent in either popover placement.
15. As a toolbar developer, I want to see a working sample on the documentation website, so that I can copy a starting point and adapt it.
16. As a toolbar developer, I want a TypeScript-typed property with JSDoc on `ToolbarItemBase`, so that my IDE autocompletes the name, shows the default, and surfaces the restrictions.
17. As a toolbar developer, I want `overflowGroup` exposed as the HTML attribute `overflow-group`, so that I can use it from plain HTML without JS glue.
18. As a toolbar developer, I want a screen-reader user to encounter the same items in the same order regardless of whether they're grouped, so that grouping is purely a layout concern and doesn't change accessibility behavior.

## Implementation Decisions

These decisions are recorded in full at `docs/adr/0001-toolbar-overflow-group.md` (decision rationale, alternatives rejected, consequences). The glossary entries live at `CONTEXT.md`. Both are authoritative; this section restates the operational consequences.

- **Public API: one new property.** `overflowGroup: string`, default `""`, declared on `ToolbarItemBase`. Empty string means "no group" (item overflows independently). Any non-empty string is an opaque group identifier; equality is exact and case-sensitive. No new public API on `Toolbar` itself. No new events.
- **Type is `string`, not `number`.** Diverges from SAPUI5's `int` type. Behavioral parity preserved. Rationale: HTML attributes are strings natively, meaningful names beat magic numbers, empty-string-as-absent matches existing UI5 WC conventions, avoids `0`-as-sentinel footgun. See ADR-0001.
- **Subclass applicability.** Property declared once on `ToolbarItemBase`, with semantics differing per subclass:
  - Content items (`ToolbarItem`, `ToolbarButton`, `ToolbarSelect`): full participation.
  - `ToolbarSeparator`: full participation (label-separator-control clusters are a primary use case).
  - `ToolbarSpacer`: accepted but ignored by the overflow algorithm; one-shot `console.warn` if set non-empty.
- **Mixed priorities banned inside groups.** Items in a non-empty group must have `overflowPriority = "Default"`. `AlwaysOverflow` and `NeverOverflow` are forbidden inside groups. Violations emit a one-shot `console.warn` per offending item, and the item's priority is treated as `Default` for the layout pass (group wins, priority is dropped).
- **Group priority is always `Default`.** Because all members are forced to `Default`, every group's collective priority is `Default`. Groups mix with ungrouped `Default` items during distribution; no group-vs-group ordering concept.
- **Non-contiguous group members allowed.** Members do not have to sit next to each other in the DOM. The visible bar always preserves slot order; ungrouped items between group members stay in their slot positions. The overflow decision is yoked: when any group member must overflow, all members do. Matches SAPUI5 behavior. No DOM reordering ever happens — slot order is the source of truth for tab order and screen-reader narration.
- **Group positioning during distribution.** Each group is treated as a single virtual movable unit. Its index for sort/iteration purposes is the **rightmost member's slot index**. Its width is the sum of member widths.
- **Atomic group overflow.** When the algorithm picks the next unit to push into overflow and that unit is a group, the entire group is pushed in one step. Width budgeting may over-shoot (recover more visible space than strictly needed); the over-shoot is accepted by design.
- **Popover order.** Inside the popover, group members appear in slot order, adjacent to each other (the group is a contiguous block). The group is positioned among other overflowed items by its rightmost member's slot index. When `reverseOverflow` is true (popover placed above the toolbar), the entire popover list reverses; the group remains a contiguous block and its internal order reverses with the rest.
- **`minContentWidth` is unaffected.** Calculation remains "sum of widths of `NeverOverflow` items." Since groups cannot contain `NeverOverflow` items, the calculation is unchanged.
- **Reactivity uses existing path.** `overflowGroup` is a regular `@property()` on `ToolbarItemBase`. Changes invalidate the item, which bubbles to the toolbar via the existing child-change machinery in `onInvalidation`, triggering re-distribution. No new lifecycle hooks.
- **Modules touched.** `ToolbarItemBase` (add property + warning helpers), `Toolbar` (add group-bucketing step before `distributeItems`, adjust unit iteration to treat groups atomically). No template changes. No CSS changes. No new public types.

## Testing Decisions

A good test for this feature asserts **what the user sees in the bar and popover** given a markup configuration and viewport. It does not assert the contents of internal arrays, does not call private methods, and does not depend on render-cycle ordering. The behavior under test is "given these items with these groups and this width, which items are visible in the bar and which are in the popover, and in what order."

**One seam, one location: `packages/main/cypress/specs/Toolbar.cy.tsx`.**

Existing Toolbar tests in this file already mount `<Toolbar>` with `<ToolbarButton>` / `<ToolbarSeparator>` / `<ToolbarSpacer>` children and assert overflow outcomes by inspecting the rendered DOM (the `overflowed` custom state, the `ui5-tb-popover-item` class on rendered items, popover open/close, item visibility). This is the highest available seam and is exactly the seam the feature needs.

No new seams. No unit tests against private methods (`distributeItems` etc.).

**Test cases:**

1. Two grouped items in a toolbar narrow enough to need exactly one overflow: both items end up in the popover together, neither alone in the bar.
2. Three items in source order `[A(group=g), B(ungrouped), C(group=g)]` in a toolbar that must overflow the group: B stays in the bar in its slot position; A and C appear in the popover, adjacent and in slot order (A then C).
3. A group whose member has `AlwaysOverflow` priority: `console.warn` is observed once for that member, and the member behaves as `Default` (the whole group either overflows or doesn't, decided by space pressure — not forced into overflow by the now-ignored priority).
4. A `ToolbarSpacer` with `overflowGroup` set to a non-empty string: `console.warn` is observed once, and the spacer's overflow behavior is unchanged (it does not yoke to other group members).
5. A grouped pair fits in the bar at width W. After resizing to a narrower width that requires overflowing the pair, both members appear in the popover; after resizing back to W, both reappear in the bar. Also: changing `overflowGroup` on one member at runtime causes the toolbar to re-distribute.
6. With the popover placed above the toolbar (`reverseOverflow = true`): a group of two members `[A, C]` in the popover appears as `[C, A]` (the whole list is mirrored; the group stays contiguous).

Prior art: `Toolbar.cy.tsx` tests like "shouldn't have toolbar button as popover opener when there is spacer before last toolbar item" already mount toolbars with mixed item types and assert on the rendered overflow state in exactly this style. The new tests follow that pattern.

## Out of Scope

- **ARIA grouping inside the popover or the bar.** No `role="group"`, no `aria-labelledby` linking group members. The property is layout-only by design (see ADR-0001 and `CONTEXT.md`).
- **Visual cluster affordances.** No borders, backgrounds, or spacing changes around grouped items.
- **Keyboard scope.** Tab order and arrow navigation behave exactly as they do for ungrouped items.
- **DOM reordering.** The visible bar always preserves slot order. The "group adjacency in the bar" promise applies only inside the popover.
- **Group priority semantics.** No notion of "group A is more important than group B." All groups have `Default` priority and mix with ungrouped `Default` items by rightmost-index ordering.
- **`AlwaysOverflow`/`NeverOverflow` inside groups.** Banned. Not "allowed with inheritance semantics."
- **A `Toolbar.groups` getter or `Toolbar` events related to grouping.** None added. Grouping is per-item only.
- **Migration tooling.** No codemod to translate SAPUI5 numeric group values into strings. Developers update markup themselves.
- **`ShellBar` or other consumers of `Toolbar`.** No changes; the `_min-content-width-change` contract is preserved.

## Further Notes

- **Spec source documents.** Authoritative decisions live in `docs/adr/0001-toolbar-overflow-group.md` (rationale + alternatives) and `CONTEXT.md` (glossary entries for "overflow group" and related terms). Both predate this PRD and should be considered binding.
- **SAPUI5 reference behavior** was confirmed by reading `OverflowToolbar.js` (`_aggregateMovableControls`, `_extractControlsToMoveToOverflow`) and `OverflowToolbarLayoutData.js` (`group` property declaration and validation). The behavioral model adopted here matches SAPUI5 except for the JS property type (`string` vs. `int`).
- **Documentation deliverables alongside the implementation:** (1) JSDoc on the new `overflowGroup` property in `ToolbarItemBase`; (2) a short paragraph in the `Toolbar` class JSDoc overview mentioning grouped overflow; (3) a website sample under `packages/website/docs/_samples/main/Toolbar/GroupedOverflow/`; (4) an internal dev sample HTML at `packages/main/test/pages/ToolbarOverflowGroup.html`.
- **`console.warn` is one-shot per item.** Use an instance flag on the item to suppress repeat warnings across re-renders, consistent with how `ToolbarItem.checkForWrapper` already handles a similar case.
- **No breaking changes.** Default `overflowGroup = ""` reproduces today's behavior exactly. Existing consumers (including `ShellBar`) require zero changes.
