import ToolbarItem from "./ToolbarItem.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-separator` is an element, used for visual separation between two elements.
 * It takes no space in calculating toolbar items width.
 * @constructor
 * @extends ToolbarItem
 * @since 1.17.0
 * @abstract
 * @public
 */
declare class ToolbarSeparator extends ToolbarItem {
    visible: boolean;
    get isSeparator(): boolean;
    get isInteractive(): boolean;
}
export default ToolbarSeparator;
