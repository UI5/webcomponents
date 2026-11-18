# Experimental IBCS table feature

This proposal explores whether IBCS-oriented presentation can use the existing `ITableFeature` lifecycle and `features` slot of `ui5-table`.

```html
<ui5-table>
  <ui5-table-ibcs id="semantics" slot="features"></ui5-table-ibcs>
  <ui5-table-selection-single slot="features" behavior="RowOnly"></ui5-table-selection-single>
  <ui5-table-header-row slot="headerRow">
    <ui5-table-header-cell id="position" min-width="18rem">Position</ui5-table-header-cell>
    <ui5-table-header-cell id="previous" width="6rem">PY</ui5-table-header-cell>
    <ui5-table-header-cell id="actual" width="6rem">AC</ui5-table-header-cell>
    <ui5-table-header-cell id="variance" width="6rem">ΔPY</ui5-table-header-cell>
  </ui5-table-header-row>
  <!-- Existing rows/cells, identified with row-key. -->
</ui5-table>
```

```js
semantics.rows = {
  cash: { type: "Measure", parentKey: "currentAssets" },
  currentAssets: { type: "Total", parentKey: "assets" },
  assets: { type: "Total" },
  restrictedCash: { type: "OfWhich" },
  equityRatio: { type: "PercentOf" },
};
semantics.columns = {
  position: { type: "RowHeader" },
  previous: { type: "Scenario", scenario: "Previous" },
  actual: { type: "Scenario", scenario: "Actual" },
  variance: { type: "Variance", groupStart: true },
};
semantics.cellImpacts = {
  cash: { variance: "Favorable" },
  bankDebt: { variance: "Unfavorable" },
};
```

Replace metadata objects to update them. Row definitions use existing `rowKey`; column definitions use application-assigned header-cell IDs so their meaning survives reordering.

## Separation of responsibilities

**Existing UI5:** rendering, cell slots, `width`/`minWidth`, explicit `horizontalAlign`, scrolling/popin, grouping, selection, keyboard navigation, growing and virtualization.

**Application:** values, locale/number formatting, calculations, references and denominators, ordering of totals, assessment of business impact, and labels. The feature never parses displayed strings, adds totals, sorts rows, replaces content or implements a learning panel.

**IBCS feature:** distinguishes measure, structure, result, total, of-which, remainder and percent-of rows; styles corresponding column semantics; derives indentation from parent keys; draws scenario strips; adds group gaps and impact colors.

The public `ITableFeature` lifecycle has no presentation-contribution hook. This prototype therefore adds a small **private derived-state seam** to `TableRow` and `TableCellBase`. `TableIBCS` supplies that state through component references, following the internal-state coordination used by existing table features. Components render their own state. There are no external DOM queries, shadow-DOM modifications or public layout-property assignments by the feature.

Styles are dormant without feature state. Scenario styles are shared through the cell-base stylesheet; data-cell styles and header styles remain owned by those components. A maintainer alternative would be a more general presentation-contribution interface; this draft intentionally avoids designing a generic plugin framework before the use case is validated.

## Included semantics

| Area | Prototype coverage |
|---|---|
| Rows | Measure, Structure, Result, Total, OfWhich, Remainder, PercentOf |
| Columns | RowHeader, Measure, Structure, Scenario, Time, Variance, Total, OfWhich, Remainder, PercentOf |
| Results in columns | `result: true` on a measure column; not represented as an independently named IBCS column type |
| Hierarchy | `parentKey`; indentation on RowHeader cells; cyclic/missing-parent paths fall back to no indentation |
| Scenario | Actual, Previous actual, Plan and Forecast |
| Impact | Favorable, Unfavorable and Neutral supplied per cell; missing entries are uncolored |
| Accessibility | Impact text accompanies the color, including popin content |
| Lifecycle | Initial/dynamic attachment, removal, metadata replacement, recycled row keys and replaced cell slots |
| Composition | Native selection, keyboard navigation, grouping, popin and application-controlled widths |

Headers remain responsible for meaningful labels such as PY/AC. Equal scenario widths use the native width API. Explicit alignment overrides semantic defaults. This prototype does not add new kinds of merged headers, nesting APIs, calculations, chart renderers or a full standards-conformance validator.

## Theming

Use public SAP theme tokens for text, lines and impact colors. Scenario fills derive from `--sapList_TextColor` and `--sapList_Background`, retaining patterns in dark/high-contrast themes. The indentation step is configurable through `--ui5_table_ibcs_indent` on the table; the default is `1rem`.

Colors are supplementary: Favorable/Unfavorable/Neutral impact text is available to assistive technology. Selection backgrounds remain controlled by the existing selection feature. Virtualized rows retain their fixed height even for of-which and percent-of semantics.

## Source guidance

The terminology follows IBCS Standards 2.0, primarily:

- EX 1.2, pp. 115–135: row/column types, hierarchy and grouping.
- UN 3.2, pp. 42–46: scenario notation.
- UN 4.1, pp. 51–55: variance and impact notation.

Results rows are explicitly described within Measure rows. The source also discusses intermediate results in measure columns, but does not name a separate Results columns type. Previous-year data remains measured actual data.

Reference: [IBCS Association](https://www.ibcs.com/ibcs-version-2-0/). This is an independently implemented presentation experiment, not a certification claim. No licensed PDF is included.

## Review questions

1. Should presentation features use private derived component state, as here, or a generic feature render-contribution interface?
2. Are maps keyed by existing row keys/header IDs preferable to declarative semantic descriptor elements?
3. Should impact be provided as a final assessment, or should a separate future data/analysis layer supply it?
4. Which semantic styling should be standardized by the library versus a configurable reporting profile?

## Sample and verification

The website sample is `packages/website/docs/_samples/main/Table/IBCS/` and is registered on both Table and TableIBCS documentation pages. It uses a balanced, fictional balance sheet, theme switching, native single selection and a button that detaches/reattaches the feature.

Run generation and TypeScript compilation from the repository root, then component tests from `packages/main`:

```sh
yarn generate
yarn ts
yarn ci:test:prepare
```

```sh
yarn test:cypress:single cypress/specs/TableIBCS.cy.tsx,cypress/specs/Table.cy.tsx,cypress/specs/TableSelectionSingle.cy.tsx
```
