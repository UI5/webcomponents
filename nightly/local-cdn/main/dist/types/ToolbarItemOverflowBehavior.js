/**
 * Defines the priority of the toolbar item to go inside overflow popover.
 * @public
 */
var ToolbarItemOverflowBehavior;
(function (ToolbarItemOverflowBehavior) {
    /**
     * The item is presented inside the toolbar and goes in the popover, when there is not enough space.
     * @public
     */
    ToolbarItemOverflowBehavior["Default"] = "Default";
    /**
     * When set, the item will never go to the overflow popover.
     * @public
     */
    ToolbarItemOverflowBehavior["NeverOverflow"] = "NeverOverflow";
    /**
     * When set, the item will be always part of the overflow part of ui5-toolbar.
     * @public
     */
    ToolbarItemOverflowBehavior["AlwaysOverflow"] = "AlwaysOverflow";
})(ToolbarItemOverflowBehavior || (ToolbarItemOverflowBehavior = {}));
export default ToolbarItemOverflowBehavior;
//# sourceMappingURL=ToolbarItemOverflowBehavior.js.map