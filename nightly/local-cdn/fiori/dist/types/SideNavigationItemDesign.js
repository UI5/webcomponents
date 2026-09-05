/**
 * SideNavigationItem designs.
 * @public
 * @since 2.7.0
 */
var SideNavigationItemDesign;
(function (SideNavigationItemDesign) {
    /**
     * Design for items that perform navigation, contain navigation child items, or both.
     *
     * @public
     */
    SideNavigationItemDesign["Default"] = "Default";
    /**
     * Design for items that trigger an action, such as opening a dialog.
     *
     * **Note:** Items with this design must not have sub-items.
     *
     * **Note:** Items that open a dialog must set `hasPopup="dialog"` via `accessibilityAttributes` property.
     *
     * @public
     */
    SideNavigationItemDesign["Action"] = "Action";
})(SideNavigationItemDesign || (SideNavigationItemDesign = {}));
export default SideNavigationItemDesign;
//# sourceMappingURL=SideNavigationItemDesign.js.map