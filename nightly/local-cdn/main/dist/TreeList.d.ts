import List from "./List.js";
import type TreeItemBase from "./TreeItemBase.js";
declare class TreeList extends List {
    getItems(includeCollapsed?: boolean): Array<TreeItemBase>;
    getItemsForProcessing(): Array<TreeItemBase>;
}
export default TreeList;
