/**
 * Different table row types.
 * @public
 */
declare enum TableRowType {
    /**
     * Indicates that the table row does not have any active feedback when item is pressed.
     * @public
     */
    Inactive = "Inactive",
    /**
     * Indicates that the table row is clickable via active feedback when item is pressed.
     * @public
     */
    Active = "Active"
}
export default TableRowType;
