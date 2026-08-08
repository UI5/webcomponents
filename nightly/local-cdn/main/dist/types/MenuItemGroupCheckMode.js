/**
 * Menu item group check modes.
 * @since 2.12.0
 * @public
 */
var MenuItemGroupCheckMode;
(function (MenuItemGroupCheckMode) {
    /**
     * default type (items in a group cannot be checked)
     * @public
     */
    MenuItemGroupCheckMode["None"] = "None";
    /**
     * Single item check mode (only one item in a group can be checked at a time)
     * @public
     */
    MenuItemGroupCheckMode["Single"] = "Single";
    /**
     * Multiple items check mode (multiple items in a group can be checked at a time)
     * @public
     */
    MenuItemGroupCheckMode["Multiple"] = "Multiple";
})(MenuItemGroupCheckMode || (MenuItemGroupCheckMode = {}));
export default MenuItemGroupCheckMode;
//# sourceMappingURL=MenuItemGroupCheckMode.js.map