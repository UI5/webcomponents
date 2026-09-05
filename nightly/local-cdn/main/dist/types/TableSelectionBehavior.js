/**
 * Selection behavior of the `ui5-table` selection components.
 *
 * @public
 * @since 2.11
 */
var TableSelectionBehavior;
(function (TableSelectionBehavior) {
    /**
     * Rows can only be selected by using the row selector column.
     * @public
     */
    TableSelectionBehavior["RowSelector"] = "RowSelector";
    /**
     * Rows can only be selected by clicking directly on the row, as the row selector column is hidden.
     *
     * **Note:** In this mode, the `row-click` event of the `ui5-table` component is not fired.
     *
     * @public
     */
    TableSelectionBehavior["RowOnly"] = "RowOnly";
})(TableSelectionBehavior || (TableSelectionBehavior = {}));
export default TableSelectionBehavior;
//# sourceMappingURL=TableSelectionBehavior.js.map