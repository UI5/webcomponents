# Row Header Column for `ui5-table` (ARIA `role="rowheader"`)

## Context

**Why:** BLI request — add an API to configure one column of the Table to act as the row's header (ARIA `role="rowheader"`). Screen readers can then use that cell as the accessible name/identifier for the row, and the Table can shorten the (currently very long) row-focus announcement to just that identifier. This is a **lightweight accessibility enhancement** for the current state; a richer "ID Column" design is planned separately (FIORITECHP1-36169) and this must not contradict or block it.

**Current behavior being improved:** On row focus, `TableCustomAnnouncement._handleTableRowFocusin` enumerates every cell as `header, cell, header, cell, …` (`TableCustomAnnouncement.ts:111-117`), producing long announcements. There is no `rowheader` role anywhere today — cells are only `gridcell` / `columnheader` (confirmed by grep).

**Decisions made during brainstorming:**
- API lives on **`TableCell`** (not `TableHeaderCell`). Rationale: the role is written on the cell itself; a `@property` on the cell invalidates its owning row directly, so the role re-renders correctly on runtime toggle. A header-cell property would only invalidate the header row, **not** the data rows that own the cells — so render-time derivation would never fire for data cells (investigated and rejected).
- "At most one row header per row" is **documented only**, not enforced (matches HTML; BLI permits ignoring).
- Non-label exclusion (status/draft indicators) **reuses existing hooks** (`data-ui5-acc-text`, `aria-hidden`) — no new API. Demonstrated in `Table_Acc.html`.
- Simplified announcement = row context + **only** the row-header cell.
- **Popin priority behavior is deferred** to the FIORITECHP1-36169 ID-column follow-up. Documented as a known limitation.

## Intended outcome
A consumer marks the row-header cell per row (`<ui5-table-cell row-header>`); the Table applies `role="rowheader"`, keeps `aria-colindex`, and announces only that cell (plus row index/state) on row focus.

---

## Implementation

### 1. New public property — `packages/main/src/TableCell.ts`
Add a boolean, mirroring the existing `merged` property style:
```ts
/**
 * Defines whether the cell acts as the row header (ARIA role="rowheader")...
 * Note: At most one cell per row should be a row header. If more are set, the first is used for the announcement.
 * @default false
 * @since 2.28.0
 * @public
 */
@property({ type: Boolean })
rowHeader = false;
```
Make the cell's role reflect it. Preferred: override `ariaRole` resolution so it returns `"rowheader"` when `rowHeader` is set (base is `TableCellBase.ariaRole = "gridcell"`, `TableCellBase.ts:48`). Keeping it on `ariaRole` (not a divergent `role`) preserves the `aria-colindex` guard in the template.

### 2. Role write + invalidation
- `packages/main/src/TableRowTemplate.tsx:27-28`: today `cell.role ??= cell.ariaRole`. The `??=` makes role sticky, so a runtime toggle `rowHeader true→false` would not revert. For the **data-cell branch**, assign authoritatively (`cell.role = cell.ariaRole`) so the role tracks `rowHeader` both ways. The colindex guard `cell.ariaColIndex = (cell.role === cell.ariaRole) ? ... : null` still holds because `ariaRole` itself becomes `"rowheader"`. **Verify this exact guard with a test** — it is the one real subtlety.
- `packages/main/src/TableRow.ts:52`: add `"rowHeader"` to the cells slot `invalidateOnChildChange.properties` (next to `merged`, `_popin`, `_popinHidden`) so toggling re-renders the row.

### 3. Simplified row-focus announcement — `packages/main/src/TableCustomAnnouncement.ts`
In `_handleTableRowFocusin` (`:111-117`), before the cell loop:
```ts
const rowHeaderCell = row.cells.find(c => c.rowHeader && !c._popin);
if (rowHeaderCell) {
    descriptions.push(getCustomAnnouncement(rowHeaderCell, { lessDetails: true }));
} else {
    // existing [header, cell]* enumeration unchanged
}
```
Row index / selected / navigable (`:90-109`) and row-actions / navigated (`:119-125`) are untouched. No row header → identical to today.

### 4. Non-label exclusion — no code, demo only
`getCustomAnnouncement` already returns `data-ui5-acc-text` verbatim (`CustomAnnouncement.ts:64`) and skips `aria-hidden="true"` children (`:68`). In `packages/main/test/pages/Table_Acc.html`, configure the **product-name column** (`#productCol`, first cell per row — currently `<b><ui5-text>…</ui5-text></b><ui5-link>Product ID …</ui5-link>`): mark the cell `row-header`, and wrap the non-label part (the Product ID link / any status) with `aria-hidden="true"` (or `data-ui5-acc-text`) so only the product name is spoken. Add a page toggle like the existing `ui5-select`/`ui5-bar` controls so the ACC team can A/B the screen-reader output against snippix sample 154114.

---

## Files touched
| File | Change |
|------|--------|
| `packages/main/src/TableCell.ts` | New `rowHeader` property; `ariaRole` returns `"rowheader"` when set |
| `packages/main/src/TableRowTemplate.tsx` | Authoritative role assignment for data cells (not `??=`); keep colindex guard |
| `packages/main/src/TableRow.ts` | Add `"rowHeader"` to cells `invalidateOnChildChange.properties` |
| `packages/main/src/TableCustomAnnouncement.ts` | Short-circuit announcement to the row-header cell |
| `packages/main/test/pages/Table_Acc.html` | Demo config on product-name column + non-label exclusion toggle |
| `packages/main/cypress/specs/Table.cy.tsx` (or new spec) | Tests (below) |
| `docs/superpowers/specs/2026-10-07-table-row-header-design.md` | Committed spec doc (first impl step) |

## Not in scope (deferred)
- Popin "row header is most important / never pops in" — deferred to FIORITECHP1-36169. A row-header column currently pops in like any other; documented limitation.
- Enforcing single row-header column.
- Any cell-level `accessibleName`/`accessibleNameRef` API.

## Verification
1. `yarn ts` from repo root — no TypeScript errors.
2. From `packages/main`: `yarn test:cypress:single cypress/specs/Table.cy.tsx` (consumes `.ts` directly). New assertions:
   - Configured column's data cells have `role="rowheader"`; `aria-colindex` still present and correct.
   - Runtime toggle `rowHeader` true↔false flips the role (guards against the `??=` stickiness bug).
   - On row `focusin`, `#ui5-invisible-text` content = row context + row-header cell text only (no full per-cell enumeration).
   - No-row-header rows: announcement unchanged (regression guard).
3. Manual: open `test/pages/Table_Acc.html`, toggle the demo, verify with a screen reader / `chrome-devtools-mcp:a11y-debugging`. Cross-check announced string with ACC experts against snippix 154114.
4. `@since` = **2.28.0** (package currently `2.27.1-rc.0`); confirm with maintainer convention.
