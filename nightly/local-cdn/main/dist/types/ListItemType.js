/**
 * Different list item types.
 * @public
 */
var ListItemType;
(function (ListItemType) {
    /**
     * Indicates the list item does not have any active feedback when item is pressed.
     * @public
     */
    ListItemType["Inactive"] = "Inactive";
    /**
     * Indicates the list item does not have any active feedback when item is pressed,
     * but selection (checkbox/radio) is still possible when a selection mode is active.
     * The `item-click` event is not fired for items of this type.
     * @public
     * @since 2.26.0
     */
    ListItemType["InactiveSelectable"] = "InactiveSelectable";
    /**
     * Indicates that the item is clickable via active feedback when item is pressed.
     * @public
     */
    ListItemType["Active"] = "Active";
    /**
     * Enables detail button of the list item that fires detail-click event.
     * @public
     */
    ListItemType["Detail"] = "Detail";
    /**
     * Enables the type of navigation, which is specified to add an arrow at the end of the items and fires navigate-click event.
     * @public
     */
    ListItemType["Navigation"] = "Navigation";
})(ListItemType || (ListItemType = {}));
export default ListItemType;
//# sourceMappingURL=ListItemType.js.map