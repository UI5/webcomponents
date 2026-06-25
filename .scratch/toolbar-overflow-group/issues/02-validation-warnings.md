# 02 — Toolbar overflow group: validation warnings

Status: done

## Parent

PRD: `.scratch/toolbar-overflow-group/PRD.md`
ADR: `docs/adr/0001-toolbar-overflow-group.md`
Glossary: `CONTEXT.md` (entries "Overflow group", "Overflow priority")

## What to build

Surface developer mistakes in `overflowGroup` configuration with one-shot `console.warn` messages, and make the toolbar's algorithm tolerate the violations gracefully without breaking the user's page.

Two violation cases to handle:

1. **Mixed-priority violation.** An item has a non-empty `overflowGroup` AND its `overflowPriority` is `AlwaysOverflow` or `NeverOverflow`. The combination is forbidden by ADR-0001 because it would silently promote `overflowPriority` from a per-item statement to a group-level statement. When detected, emit a one-shot `console.warn` naming the offending item, then treat the item's priority as `Default` for the layout pass — the group wins, the absolute priority is dropped. The other group members continue to behave as group members.

2. **Spacer violation.** A `ui5-toolbar-spacer` has a non-empty `overflowGroup`. Spacers do not carry user-meaningful content and `getItemWidth` already treats them as ignore-space; participating in a group is meaningless. When detected, emit a one-shot `console.warn`, and the spacer continues its existing overflow behavior unchanged (it does NOT yoke to the group).

Both warnings are **one-shot per item**, suppressed across subsequent re-renders. Use an instance flag on the item to track whether the warning has already been emitted, consistent with how `ToolbarItem.checkForWrapper` handles a similar developer-error case.

End-to-end behavior: a developer who misconfigures one of these cases sees a clear console message naming what's wrong, the toolbar continues to render and function, and the group's overflow contract (members stay together) is preserved for the remaining valid members.

## Acceptance criteria

- [ ] Setting `overflowPriority = "AlwaysOverflow"` on a grouped item triggers exactly one `console.warn` per item across re-renders; the item's priority is treated as `Default` for distribution; the group continues to overflow atomically.
- [ ] Setting `overflowPriority = "NeverOverflow"` on a grouped item behaves the same: one warning, priority dropped to `Default`, group atomic overflow preserved.
- [ ] Setting a non-empty `overflowGroup` on a `ui5-toolbar-spacer` triggers exactly one `console.warn` per spacer across re-renders; the spacer's existing overflow behavior is unchanged (it does not yoke to the named group's overflow decision).
- [ ] No warnings fire for valid configurations (grouped items with `Default` priority, spacers with empty `overflowGroup`).
- [ ] Warning messages name the offending element and the rule that was violated, so a developer reading the console can diagnose without guessing.
- [ ] Cypress tests in `packages/main/cypress/specs/Toolbar.cy.tsx` cover: priority-violation warning fires once and group still overflows atomically; spacer-violation warning fires once and spacer is unaffected by the group.
- [ ] JSDoc on `overflowGroup` mentions both restrictions explicitly.

## Blocked by

- Issue 01 — Toolbar overflow group: core grouped overflow behavior.
