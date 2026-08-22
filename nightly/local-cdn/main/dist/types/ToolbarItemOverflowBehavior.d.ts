/**
 * Defines the priority of the toolbar item to go inside overflow popover.
 * @public
 */
declare enum ToolbarItemOverflowBehavior {
    /**
     * The item is presented inside the toolbar and goes in the popover, when there is not enough space.
     * @public
     */
    Default = "Default",
    /**
     * When set, the item will never go to the overflow popover.
     * @public
     */
    NeverOverflow = "NeverOverflow",
    /**
     * When set, the item will be always part of the overflow part of ui5-toolbar.
     * @public
     */
    AlwaysOverflow = "AlwaysOverflow"
}
export default ToolbarItemOverflowBehavior;
