import ToolbarItem from "@ui5/webcomponents/dist/ToolbarItem.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-ai-toolbar-label` represents a text label,
 * used in the `ui5-toolbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-ai/dist/ToolbarLabel.js";`
 * @constructor
 * @extends ToolbarItem
 * @private
 * @since 1.0.0-rc.1
 */
declare class ToolbarLabel extends ToolbarItem {
    /**
     * Defines the text of the label.
     * @default ""
     * @public
     */
    text: string;
    /**
     * @override
     * ToolbarLabel is not interactive.
     */
    get isInteractive(): boolean;
    /**
     * @override
     */
    get classes(): {
        root: {
            "ui5-ai-tb-label": boolean;
            "ui5-tb-popover-item": boolean;
            "ui5-tb-item": boolean;
        };
    };
}
export default ToolbarLabel;
