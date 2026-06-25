# 01 — Toolbar overflow group: core grouped overflow behavior

Status: done

## Parent

PRD: `.scratch/toolbar-overflow-group/PRD.md`
ADR: `docs/adr/0001-toolbar-overflow-group.md`
Glossary: `CONTEXT.md` (entries "Overflow group", "Overflow priority", "Toolbar item")

## What to build

Add the `overflowGroup` property to `ToolbarItemBase` and teach the `ui5-toolbar` overflow algorithm to treat items sharing a non-empty `overflowGroup` as one atomic unit. When any member of a group must overflow, all members overflow together. Items without a group keep today's behavior exactly.

End-to-end behavior the user sees:

- A toolbar developer adds `overflow-group="filters"` (or any non-empty string) to two or more child items. The items overflow as one — never split between the visible bar and the overflow popover.
- The visible bar always preserves slot order. Ungrouped items sitting between group members in the source stay in their slot positions; the toolbar never reorders DOM children.
- In the popover, group members appear adjacent to each other in slot order, positioned among other overflowed items by the rightmost group member's slot index.
- When the popover is placed above the toolbar (`reverseOverflow` mode), the whole popover list reverses; the group stays a contiguous block, mirrored alongside the rest.
- Changing `overflowGroup` on an item at runtime re-distributes the toolbar via the existing child-change invalidation path.
- The property is a free-form `string`, default `""` (empty = no group). HTML attribute form is `overflow-group`.
- The property is declared on `ToolbarItemBase` so all subclasses inherit it. Semantics: full participation for `ToolbarItem`/`ToolbarButton`/`ToolbarSelect`/`ToolbarSeparator`; spacers are accepted but ignored by the overflow algorithm (warning handled in issue 02).
- JSDoc on the new property describes the contract and the priority restriction. The `Toolbar` class overview JSDoc gains a short paragraph mentioning grouped overflow.
- An internal dev sample HTML page demonstrates the behavior for manual verification.

The algorithm change: before iterating `movableItems` reversed, bucket movable items into "distribution units" where each unit is either (a) a single ungrouped item or (b) a group of items sharing the same non-empty `overflowGroup`. Each group's position is its rightmost member's slot index; its width is the sum of member widths. The reverse-iteration loop in `distributeItems` walks units instead of items, pushing whole units atomically. Atomic pushes are allowed to over-shoot the recovered-width target — accepted by design (see ADR-0001).

This issue covers contiguous AND non-contiguous groups in a single algorithm change. They are the same code path; splitting them across issues would split one algorithm across PRs.

## Acceptance criteria

- [ ] `ToolbarItemBase` has a public `overflowGroup: string` property, default `""`, with JSDoc describing the contract, the priority restriction, and the empty-string-means-no-group convention.
- [ ] All `ui5-toolbar-item` subclasses inherit the property automatically; no per-subclass re-declaration.
- [ ] Two grouped items in a toolbar narrow enough to overflow exactly one item: both end up in the popover, neither alone in the bar.
- [ ] Three items in source order `[A(group=g), B(ungrouped), C(group=g)]` with the toolbar narrow enough to overflow the group: B stays in the bar in its slot position; A and C are in the popover, adjacent and in slot order (A then C).
- [ ] When the toolbar widens enough to fit the group again, both members return to the bar.
- [ ] In `reverseOverflow = true` mode (popover above toolbar), a group of two members `[A, C]` appears in the popover as `[C, A]` — the whole list mirrored, the group still contiguous.
- [ ] Changing one member's `overflowGroup` at runtime causes the toolbar to re-distribute on the next render cycle.
- [ ] `minContentWidth` (sum of `NeverOverflow` item widths) is unchanged in calculation.
- [ ] Default behavior is unchanged for any toolbar whose children have `overflowGroup = ""` — existing tests in `Toolbar.cy.tsx` continue to pass without modification.
- [ ] JSDoc on `overflowGroup` and a short paragraph in the `Toolbar` class JSDoc are added.
- [ ] An internal dev sample HTML page at `packages/main/test/pages/ToolbarOverflowGroup.html` demonstrates: a contiguous group, a non-contiguous group, runtime regrouping, and reverse-overflow placement.
- [ ] Six new Cypress test cases in `packages/main/cypress/specs/Toolbar.cy.tsx` cover: contiguous overflow, non-contiguous overflow, resize round-trip, reverse-overflow popover order, runtime `overflowGroup` change, and slot-order preservation in the visible bar.

## Blocked by

None — can start immediately.
