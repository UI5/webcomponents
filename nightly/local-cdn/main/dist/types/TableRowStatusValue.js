/**
 * Defines the semantic status of a table row.
 *
 * @since 2.30.0
 * @public
 */
var TableRowStatusValue;
(function (TableRowStatusValue) {
    /**
     * Indicates a positive or successful state (for example, completed or approved).
     * @public
     */
    TableRowStatusValue["Positive"] = "Positive";
    /**
     * Indicates a critical state that needs attention (for example, a warning).
     * @public
     */
    TableRowStatusValue["Critical"] = "Critical";
    /**
     * Indicates a negative or error state (for example, rejected or failed).
     * @public
     */
    TableRowStatusValue["Negative"] = "Negative";
    /**
     * Indicates a neutral, informative state (for example, a hint or additional detail).
     * @public
     */
    TableRowStatusValue["Information"] = "Information";
})(TableRowStatusValue || (TableRowStatusValue = {}));
export default TableRowStatusValue;
//# sourceMappingURL=TableRowStatusValue.js.map