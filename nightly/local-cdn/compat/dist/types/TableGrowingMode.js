/**
 * Different table growing modes.
 * @public
 */
var TableGrowingMode;
(function (TableGrowingMode) {
    /**
     * Component `load-more` is fired
     * upon pressing a "More" button at the bottom.
     * @public
     */
    TableGrowingMode["Button"] = "Button";
    /**
     * Component `load-more` is fired upon scroll.
     * @public
     */
    TableGrowingMode["Scroll"] = "Scroll";
    /**
     * Component growing is not enabled.
     * @public
     */
    TableGrowingMode["None"] = "None";
})(TableGrowingMode || (TableGrowingMode = {}));
export default TableGrowingMode;
//# sourceMappingURL=TableGrowingMode.js.map