import TreeItemBase from "./TreeItemBase.js";
/**
 * @class
 * ### Overview
 * The `ui5-tree-item` represents a node in a tree structure, shown as a `ui5-list`.
 *
 * This is the item to use inside a `ui5-tree`.
 * You can represent an arbitrary tree structure by recursively nesting tree items.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/TreeItem.js";`
 * @csspart title - Used to style the title of the tree list item
 * @csspart additionalText - Used to style the additionalText of the tree list item
 * @csspart icon - Used to style the icon of the tree list item
 * @constructor
 * @extends TreeItemBase
 * @public
 * @since 1.0.0-rc.8
 */
declare class TreeItem extends TreeItemBase {
    /**
     * Defines the text of the tree item.
     * @public
     * @default undefined
     */
    text?: string;
    /**
     * Defines the `additionalText`, displayed in the end of the tree item.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    additionalText?: string;
    get _showTitle(): number | undefined;
}
export default TreeItem;
