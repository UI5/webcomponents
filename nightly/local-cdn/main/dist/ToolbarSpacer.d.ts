import ToolbarItemBase from "./ToolbarItemBase.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-spacer` is an element, used for taking needed space for toolbar items to take 100% width.
 * It takes no space in calculating toolbar items width.
 * @constructor
 * @extends ToolbarItemBase
 * @abstract
 * @since 1.17.0
 * @public
 */
declare class ToolbarSpacer extends ToolbarItemBase {
    /**
     * Defines the width of the spacer.
     *
     * **Note:** all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
     * @public
     * @default undefined
     */
    width?: string;
    get styles(): {
        width: string;
        flex?: undefined;
    } | {
        flex: string;
        width?: undefined;
    };
    get ignoreSpace(): boolean;
    get hasFlexibleWidth(): boolean;
    get isInteractive(): boolean;
    get isSpacer(): boolean;
}
export default ToolbarSpacer;
