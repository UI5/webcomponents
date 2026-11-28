commit 13537ee2e6609f57628c07f1ac762eb63ad3871d
Author: Cahit Gürgüc <cahit.guerguec@sap.com>
Date:   Thu Nov 26 14:57:33 2026 +0100

    feat(ui5-table-row): add row status indicator (#14246)
    
    * feat(ui5-table): add row highlight indicator
    
    Add `highlight` and `highlightText` properties to `ui5-table-row`,
    rendering a colored indicator at the start of a row to signal its
    status at a glance. Semantic values (Positive, Critical, Negative,
    Information) carry a built-in screen-reader announcement, while the
    Indication01-10 values provide neutral palette colors; `highlightText`
    provides or overrides the announced text alternative.
    
    * refactor(ui5-table): limit row highlight to semantic values
    
    Restrict the `highlight` property of `ui5-table-row` to the semantic
    `Highlight` values (Positive, Critical, Negative, Information), in line
    with `ui5-list-item`. Remove the `IndicationColor` palette values, their
    CSS rules and the related test-page option, and collapse the remaining
    color rules under a single nested `#highlight` selector.
    
    Also register the Row Highlight sample in `samples.json` so it is
    generated onto the Table documentation page, and expose the indicator
    via the `highlight` CSS part.
    
    * refactor(ui5-table): move row highlight to dedicated slot elements
    
    Replace the scalar `highlight`/`highlightText` properties on `ui5-table-row`
    with two dedicated slotted elements, so the feature can grow (icons, more
    designs) without bloating the row API.
    
    - Add `ui5-table-row-highlight` (public): rendered in the row's `highlight`
      slot. Public `type` (Highlight enum) and `text` (a11y alternative); private
      `icon` and `_design`. Renders the colored bar and, in the extended design,
      a type-derived icon whose tooltip shows the accessible text.
    - Add `ui5-table-header-row-highlight` (public): a render-nothing config
      element in the header row's `highlight` slot. Its presence reserves the
      highlight column (fixes layout jumping under virtualization, since column
      reservation no longer depends on scanning recycled rows). Exposes a private
      `design` ("Simple" | "Extended") and the effective column width.
    - Remove the old `highlight`/`highlightText` row properties and the obsolete
      `_hasHighlight` getter; hoist the shared `_highlight` getter into
      `TableRowBase` via a generic.
    - Highlight column width is provided by the header highlight element; the
      table exposes it as a CSS var consumed by the sticky selection-cell offset
      (removes the former `_highlightExtended` flag).
    - Extended design renders a tinted semantic background, an icon with a help
      cursor, and a wider column.
    - Accessible announcement text now resolved by the highlight element itself.
    - Rename the `--row-height` grid var to `--_ui5_table_row-height`.
    - Update the website sample and the Table_Acc.html test page (highlight mode
      select: none / Simple / Extended / custom icons).
    
    * fix(ui5-table): refine extended row highlights and documentation
    
    Center highlight icons, use a fixed bar width, and show tooltips across the extended highlight cell. Apply review feedback and update custom highlight examples.
    
    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
    
    * refactor(ui5-table): rename row highlight to status
    
    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
    
    * test(ui5-table): add custom text status examples
    
    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
    
    * feat(ui5-table): add row status color schemes
    
    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
    
    * docs(ui5-table): align status samples and since tags
    
    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
    
    * docs(ui5-table): refine status samples and API docs
    
    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
    
    * fix(website): register table status React components
    
    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
    
    * refactor(ui5-table): align row status styling and API docs
    
    Unify status colors, rename the enum to TableRowStatusValue, group status docs under Table, and update since tags to 2.30.0.
    
    ---------
    
    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
    Co-authored-by: ilhan orhan <ilhan.orhan007@gmail.com>
