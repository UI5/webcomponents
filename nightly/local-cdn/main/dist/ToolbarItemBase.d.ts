import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";
type ToolbarItemEventDetail = {
    targetRef: HTMLElement;
};
declare class ToolbarItemBase extends UI5Element {
    eventDetails: {
        "close-overflow": void;
    };
    /**
    * Property used to define the access of the item to the overflow Popover. If "NeverOverflow" option is set,
    * the item never goes in the Popover, if "AlwaysOverflow" - it never comes out of it.
    * @public
    * @default "Default"
    */
    overflowPriority: `${ToolbarItemOverflowBehavior}`;
    /**
     * Defines if the toolbar overflow popup should close upon interaction with the item.
     * It will close by default.
     * @default false
     * @public
     */
    preventOverflowClosing: boolean;
    _isOverflowed: boolean;
    get isOverflowed(): boolean;
    /**
     * Defines if the toolbar item is overflowed.
     * @default false
     * @protected
     * @since 2.11.0
     */
    set isOverflowed(value: boolean);
    _maxWidth: number;
    _isRendering: boolean;
    onAfterRendering(): void;
    /**
    * Defines if the width of the item should be ignored in calculating the whole width of the toolbar
    * @protected
    */
    get ignoreSpace(): boolean;
    /**
     * Returns if the item is flexible. An item that is returning true for this property will make
     * the toolbar expand to fill the 100% width of its container.
     * @protected
     */
    get hasFlexibleWidth(): boolean;
    /**
     * Returns if the item is interactive.
     * This value is used to determinate if the toolbar should have its accessibility role and attributes set.
     * At least two interactive items are needed for the toolbar to have the role="toolbar" attribute set.
     * @protected
     */
    get isInteractive(): boolean;
    get hasOverflow(): boolean;
    /**
     * Returns if the item is separator.
     * @protected
     */
    get isSeparator(): boolean;
    /**
     * Returns if the item is a spacer.
     * A spacer item is an item that takes space in the toolbar, but does not render any content.
     * @protected
     * @since 2.21.0
     */
    get isSpacer(): boolean;
    get stableDomRef(): string;
    get classes(): {
        root: {
            "ui5-tb-popover-item": boolean;
            "ui5-tb-item": boolean;
        };
    };
    get styles(): {};
}
export type { ToolbarItemEventDetail, };
export default ToolbarItemBase;
