import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import DragAndDropHandler from "./delegate/DragAndDropHandler.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type DropIndicator from "./DropIndicator.js";
import "./TreeItem.js";
import type TreeItemBase from "./TreeItemBase.js";
import "./TreeItemCustom.js";
import type TreeList from "./TreeList.js";
import type ListSelectionMode from "./types/ListSelectionMode.js";
import ListAccessibleRole from "./types/ListAccessibleRole.js";
import type { TreeItemBaseToggleEventDetail, TreeItemBaseStepInEventDetail, TreeItemBaseStepOutEventDetail } from "./TreeItemBase.js";
import type { ListItemClickEventDetail, ListItemDeleteEventDetail, ListItemFocusEventDetail, ListSelectionChangeEventDetail } from "./List.js";
type TreeMoveEventDetail = {
    source: {
        element: HTMLElement;
    };
    destination: {
        element: HTMLElement;
        placement: `${MovePlacement}`;
    };
};
type TreeItemEventDetail = {
    item: TreeItemBase;
};
type TreeItemToggleEventDetail = TreeItemEventDetail;
type TreeItemMouseoverEventDetail = TreeItemEventDetail;
type TreeItemMouseoutEventDetail = TreeItemEventDetail;
type TreeItemClickEventDetail = TreeItemEventDetail;
type TreeItemDeleteEventDetail = TreeItemEventDetail;
type TreeItemFocusEventDetail = TreeItemEventDetail;
type TreeSelectionChangeEventDetail = {
    selectedItems: Array<TreeItemBase>;
    previouslySelectedItems: Array<TreeItemBase>;
    targetItem: TreeItemBase;
};
type WalkCallback = (item: TreeItemBase, level: number, index: number) => void;
/**
 * @class
 *
 * ### Overview
 * The `ui5-tree` component provides a tree structure for displaying data in a hierarchy.
 *
 * ### Usage
 *
 * #### When to use:
 *
 * - To display hierarchically structured items.
 * - To select one or more items out of a set of hierarchically structured items.
 *
 * #### When not to use:
 *
 * - To display items not hierarchically structured. In this case, use the List component.
 * - To select one item from a very small number of non-hierarchical items. Select or ComboBox might be more appropriate.
 * - The hierarchy turns out to have only two levels. In this case, use List with group items.
 *
 * ### Keyboard Handling
 *
 * The `ui5-tree` provides advanced keyboard handling.
 * The user can use the following keyboard shortcuts in order to navigate trough the tree:
 *
 * - [Up] or [Down] - Navigates up and down the tree items that are currently visible.
 * - [Right] - Drills down the tree by expanding the tree nodes.
 * - [Left] - Goes up the tree and collapses the tree nodes.
 *
 * The user can use the following keyboard shortcuts to perform selection,
 * when the `selectionMode` property is in use:
 *
 * - [Space] - Selects the currently focused item upon keyup.
 * - [Enter]  - Selects the currently focused item upon keydown.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Tree.js";`
 *
 * `import "@ui5/webcomponents/dist/TreeItem.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
declare class Tree extends UI5Element {
    eventDetails: {
        "item-toggle": TreeItemToggleEventDetail;
        "item-mouseover": TreeItemMouseoverEventDetail;
        "item-mouseout": TreeItemMouseoutEventDetail;
        "item-click": TreeItemClickEventDetail;
        "item-delete": TreeItemDeleteEventDetail;
        "item-focus": TreeItemFocusEventDetail;
        "selection-change": TreeSelectionChangeEventDetail;
        "move": TreeMoveEventDetail;
        "move-over": TreeMoveEventDetail;
    };
    /**
     * Defines the selection mode of the component. Since the tree uses a `ui5-list` to display its structure,
     * the tree modes are exactly the same as the list modes, and are all applicable.
     * @public
     * @default "None"
     */
    selectionMode?: `${ListSelectionMode}`;
    /**
     * Defines the text that is displayed when the component contains no items.
     * @default undefined
     * @public
     */
    noDataText?: string;
    /**
     * Defines the component header text.
     *
     * **Note:** If the `header` slot is set, this property is ignored.
     * @default undefined
     * @public
     */
    headerText?: string;
    /**
     * Defines the component footer text.
     * @default undefined
     * @public
     */
    footerText?: string;
    /**
     * Defines the accessible name of the component.
     * @default undefined
     * @public
     * @since 1.8.0
     */
    accessibleName?: string;
    /**
     * Defines the IDs of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.8.0
     */
    accessibleNameRef?: string;
    /**
     * Defines the accessible description of the component.
     * @default undefined
     * @public
     * @since 2.5.0
     */
    accessibleDescription?: string;
    /**
     * Defines the IDs of the elements that describe the component.
     * @default undefined
     * @public
     * @since 2.5.0
     */
    accessibleDescriptionRef?: string;
    /**
     * Defines the items of the component. Tree items may have other tree items as children.
     *
     * **Note:** Use `ui5-tree-item` for the intended design.
     * @public
     */
    items: DefaultSlot<TreeItemBase>;
    /**
     * Defines the component header.
     *
     * **Note:** When the `header` slot is set, the
     * `headerText` property is ignored.
     * @public
     */
    header: Slot<HTMLElement>;
    _dragAndDropHandler: DragAndDropHandler;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    get dropIndicatorDOM(): DropIndicator | null;
    get list(): TreeList;
    get _role(): ListAccessibleRole;
    get _hasHeader(): boolean;
    _ondragenter(e: DragEvent): void;
    _ondragleave(e: DragEvent): void;
    _ondragover(e: DragEvent): void;
    _ondrop(e: DragEvent): void;
    _onListItemStepIn(e: CustomEvent<TreeItemBaseStepInEventDetail>): void;
    _onListItemStepOut(e: CustomEvent<TreeItemBaseStepOutEventDetail>): void;
    _onListItemToggle(e: CustomEvent<TreeItemBaseToggleEventDetail>): void;
    _onListItemClick(e: CustomEvent<ListItemClickEventDetail>): void;
    _onListItemDelete(e: CustomEvent<ListItemDeleteEventDetail>): void;
    _onListItemFocus(e: CustomEvent<ListItemFocusEventDetail>): void;
    _onListItemMouseOver(e: MouseEvent): void;
    _onListItemMouseOut(e: MouseEvent): void;
    _onListSelectionChange(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    _prepareTreeItems(): void;
    /**
     * Returns the corresponding list item for a given tree item
     * @param item The tree item
     * @protected
     */
    _getListItemForTreeItem(item: TreeItemBase): TreeItemBase | undefined;
    /**
     * Returns the a flat array of all tree items
     * @protected
     * @returns array of the tree items
     */
    getItems(): Array<TreeItemBase>;
    /**
     * Focus a tree item by its index in the flat array of all tree items
     * @protected
     * @param index
     */
    focusItemByIndex(index: number): void;
    /**
     * Perform Depth-First-Search walk on the tree and run a callback on each node
     * @public
     * @param callback function to execute on each node of the tree with 3 arguments: the node, the level and the index
     */
    walk(callback: WalkCallback): void;
    _getItems(): Array<HTMLElement>;
    _transformElement(element: HTMLElement): HTMLElement;
    _validateDraggedElement(draggedElement: HTMLElement, targetElement: HTMLElement): boolean;
    _filterPlacements(placements: MovePlacement[], draggedElement: HTMLElement, targetElement: HTMLElement): MovePlacement[];
}
export default Tree;
export type { TreeMoveEventDetail, TreeItemToggleEventDetail, TreeItemMouseoverEventDetail, TreeItemMouseoutEventDetail, TreeItemClickEventDetail, TreeItemDeleteEventDetail, TreeItemFocusEventDetail, TreeSelectionChangeEventDetail, WalkCallback, };
