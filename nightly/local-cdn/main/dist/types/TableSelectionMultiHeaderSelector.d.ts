/**
 * Selectors of the table header row in multi-selection scenarios.
 *
 * @public
 * @since 2.12
 */
declare enum TableSelectionMultiHeaderSelector {
    /**
     * Renders a checkbox in the table header row that toggles the selection of all rows.
     * @public
     */
    SelectAll = "SelectAll",
    /**
     * Renders an icon in the table header row that removes the selection of all rows.
     * @public
     */
    ClearAll = "ClearAll"
}
export default TableSelectionMultiHeaderSelector;
