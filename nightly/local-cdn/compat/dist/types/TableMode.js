/**
 * Different table modes.
 * @public
 */
var TableMode;
(function (TableMode) {
    /**
     * Default mode (no selection).
     * @public
     */
    TableMode["None"] = "None";
    /**
     * Single selection mode (only one table row can be selected).
     * @public
     */
    TableMode["SingleSelect"] = "SingleSelect";
    /**
     * Multi selection mode (more than one table row can be selected).
     * @public
     */
    TableMode["MultiSelect"] = "MultiSelect";
})(TableMode || (TableMode = {}));
export default TableMode;
//# sourceMappingURL=TableMode.js.map