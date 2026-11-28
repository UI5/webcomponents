/**
 * Menu item group check modes.
 * @since 2.12.0
 * @public
 */
declare enum MenuItemGroupCheckMode {
    /**
     * default type (items in a group cannot be checked)
     * @public
     */
    None = "None",
    /**
     * Single item check mode (only one item in a group can be checked at a time)
     * @public
     */
    Single = "Single",
    /**
     * Multiple items check mode (multiple items in a group can be checked at a time)
     * @public
     */
    Multiple = "Multiple"
}
export default MenuItemGroupCheckMode;
