/**
 * Different list item types.
 * @public
 */
declare enum ListItemType {
    /**
     * Indicates the list item does not have any active feedback when item is pressed.
     * @public
     */
    Inactive = "Inactive",
    /**
     * Indicates the list item does not have any active feedback when item is pressed,
     * but the item can still be selected when a selection mode is active
     * (via the item body, Space/Enter, or the checkbox/radio).
     * The `item-click` event is not fired for items of this type.
     * @public
     * @since 2.26.0
     */
    InactiveSelectable = "InactiveSelectable",
    /**
     * Indicates that the item is clickable via active feedback when item is pressed.
     * @public
     */
    Active = "Active",
    /**
     * Enables detail button of the list item that fires detail-click event.
     * @public
     */
    Detail = "Detail",
    /**
     * Enables the type of navigation, which is specified to add an arrow at the end of the items and fires navigate-click event.
     * @public
     */
    Navigation = "Navigation"
}
export default ListItemType;
