var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import List from "./List.js";
let TreeList = class TreeList extends List {
    /*
     * @override
     */
    getItems(includeCollapsed = false) {
        const slottedItems = this.getSlottedNodes("items");
        const flatItems = [];
        if (!(slottedItems.length === 1 && slottedItems[0].hasAttribute("ui5-drop-indicator"))) {
            flattenTree(slottedItems, flatItems, includeCollapsed);
        }
        return flatItems;
    }
    getItemsForProcessing() {
        return this.getItems(true);
    }
};
TreeList = __decorate([
    customElement("ui5-tree-list")
], TreeList);
/*
 * Converts a tree structure into a flat array
 * @param {Array} treeItems
 * @param {Array} result
 * @param {Boolean} includeCollapsed
 */
const flattenTree = (items, result, includeCollapsed = false) => {
    items.forEach(item => {
        result.push(item);
        if ((item.expanded || includeCollapsed) && item.items) {
            flattenTree(item.items, result, includeCollapsed);
        }
    });
};
TreeList.define();
export default TreeList;
//# sourceMappingURL=TreeList.js.map