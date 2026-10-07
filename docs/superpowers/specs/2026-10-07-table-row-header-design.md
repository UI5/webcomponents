# Row Header Column for `ui5-table` (ARIA `role="rowheader"`)

## Context

**Why:** BLI — let a consumer mark one column as the row's header (ARIA `role="rowheader"`) so assistive technologies use that cell as the row's identifier, and the Table shortens the (otherwise long) row-focus announcement to just that identifier. Lightweight accessibility enhancement ahead of the richer ID-column work (FIORITECHP1-36169); must not block it.

**Current behavior improved:** On row focus, `TableCustomAnnouncement._handleTableRowFocusin` enumerated every cell as `header, cell, header, cell, …`, producing long announcements. No `rowheader` role existed before — cells were only `gridcell` / `columnheader`.

## Design

- **No new property.** The consumer sets the native `role="rowheader"` attribute directly on `ui5-table-cell` and owns adding/removing it. The `role` attribute is the single source of truth.
- The row template's `cell.role ??= cell.ariaRole` is intentional (a directly-set `role` wins over the default) and stays untouched.
- "At most one row header per row" is documented, not enforced (matches HTML).
- **Popin priority** is handled by **documentation only** — no Table popin code. Under `overflow-mode="Popin"`, set a high `importance` on the corresponding `ui5-table-header-cell` so the row-header column stays visible / pops in last. (Popin ordering already protects the highest-`importance` column; a mis-popped row header is an application concern per the BLI.)

## Implementation

1. **`TableCellBase.ts`** — `ariaRole` converted from a field to a getter returning `"gridcell"` (so subclasses can override as accessors); added `_roleBeforePopin: string | null` stash field.
2. **`TableHeaderCell.ts`** — `ariaRole` field→getter returning `"columnheader"`.
3. **`TableCell.ts`** — `ariaRole` getter: `return this.role ?? this._roleBeforePopin ?? "gridcell";` — preserves any consumer-set role and restores it after popin clears the attribute. Class JSDoc gains an `### Accessibility` section documenting `role="rowheader"`, the one-per-row note, and the Popin `importance` guidance.
4. **`TableRowTemplate.tsx`** — one added line in the popin branch: `cell._roleBeforePopin = cell.role;` **before** `cell.role = null`. Setting `cell.role = null` deletes the `role` attribute, so without the stash the consumer's `role="rowheader"` would be lost on a popin round-trip. The restore (`??= cell.ariaRole`) and colindex guard lines are original/untouched.
5. **`TableCustomAnnouncement.ts`** — `_handleTableRowFocusin`: `const rowHeaderCell = row._visibleCells.find(c => c.ariaRole === "rowheader")`; if found, announce only that cell (`lessDetails`), else the original `[header, cell]*` enumeration. Row-level state (index/selected/navigable/actions/navigated) is unchanged.
6. **`Table_Acc.html`** — a "Row Header" `Off`/`On` select sets `role="rowheader"` on the product-name cells and raises `#productCol` `importance` to a high value when on (restores `0` when off), demonstrating the Popin guidance.

## Tests
- `Table.cy.tsx` — "keeps the consumer role=rowheader and its aria-colindex"; "restores role=rowheader after a popin round-trip".
- `TableCustomAnnouncement.cy.tsx` — "should announce only the row header cell when defined".

## Not in scope
- Any Table popin code for row headers (documentation handles it).
- A `rowHeader` property on either cell type.
- Enforcing a single row-header column; cell-level `accessibleName`/`accessibleNameRef`.
- Scoped non-label exclusion from the announcement: `aria-hidden`/`data-ui5-acc-text` was rejected because it also hides content when the cell itself is focused directly, which is not the intended behavior.

## Verification
1. From `packages/main`: `yarn test:cypress:single cypress/specs/Table.cy.tsx` and `cypress/specs/TableCustomAnnouncement.cy.tsx` — all green (specs consume `.ts` directly).
2. Manual: open `test/pages/Table_Acc.html`, set Row Header = On, shrink the table so columns pop in, confirm the product column stays. Cross-check the row-focus announcement with `chrome-devtools-mcp:a11y-debugging` / ACC experts against snippix 154114.
