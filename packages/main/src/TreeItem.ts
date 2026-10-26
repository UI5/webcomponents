import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TreeItemBase from "./TreeItemBase.js";
// Template
import TreeItemTemplate from "./TreeItemTemplate.js";

// Styles
import treeItemCss from "./generated/themes/TreeItem.css.js";

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
 * @since 1.0.0
 */
@customElement({
	renderer: jsxRenderer,
	tag: "ui5-tree-item",
	template: TreeItemTemplate,
	styles: [TreeItemBase.styles, treeItemCss],
})
class TreeItem extends TreeItemBase {
	/**
	 * Defines the text of the tree item.
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;

	/**
	 * Defines the `additionalText`, displayed in the end of the tree item.
	 * @default undefined
	 * @public
	 * @since 1.0.0
	 */
	@property()
	additionalText?: string;

	get _showTitle() {
		return this.text?.length;
	}
}

TreeItem.define();

export default TreeItem;
