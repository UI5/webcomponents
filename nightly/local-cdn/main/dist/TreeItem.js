var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
 * @since 1.0.0-rc.8
 */
let TreeItem = class TreeItem extends TreeItemBase {
    get _showTitle() {
        return this.text?.length;
    }
};
__decorate([
    property()
], TreeItem.prototype, "text", void 0);
__decorate([
    property()
], TreeItem.prototype, "additionalText", void 0);
TreeItem = __decorate([
    customElement({
        renderer: jsxRenderer,
        tag: "ui5-tree-item",
        template: TreeItemTemplate,
        styles: [TreeItemBase.styles, treeItemCss],
    })
], TreeItem);
TreeItem.define();
export default TreeItem;
//# sourceMappingURL=TreeItem.js.map