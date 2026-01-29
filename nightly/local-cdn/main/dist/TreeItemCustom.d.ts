import TreeItemBase from "./TreeItemBase.js";
/**
 * @class
 * The `ui5-tree-item-custom` represents a node in a tree structure, shown as a `ui5-list`.
 *
 * This is the item to use inside a `ui5-tree`.
 * You can represent an arbitrary tree structure by recursively nesting tree items.
 *
 * You can use this item to put any custom content inside the tree item.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/TreeItemCustom.js";`
 * @csspart title - Used to style the title of the tree list item
 * @csspart additionalText - Used to style the additionalText of the tree list item
 * @csspart icon - Used to style the icon of the tree list item
 * @constructor
 * @extends TreeItemBase
 * @public
 * @since 1.9.2
 */
declare class TreeItemCustom extends TreeItemBase {
    /**
     * Defines whether the tree list item should display the selection element.
     * @public
     * @default false
     */
    hideSelectionElement: boolean;
    /**
     * Defines the content of the `ui5-tree-item`.
     * @public
     */
    content: Array<HTMLElement>;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    /**
     * @override
     */
    get placeSelectionElementBefore(): boolean;
    /**
     * @override
     */
    get placeSelectionElementAfter(): boolean;
}
export default TreeItemCustom;
