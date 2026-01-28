import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import DragAndDropHandler from "./delegate/DragAndDropHandler.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type DropIndicator from "./DropIndicator.js";
import "./TreeItem.js";
import type TreeItemBase from "./TreeItemBase.js";
import "./TreeItemCustom.js";
import type TreeList from "./TreeList.js";
import type ListSelectionMode from "./types/ListSelectionMode.js";
import ListAccessibleRole from "./types/ListAccessibleRole.js";
import type {
	TreeItemBaseToggleEventDetail,
	TreeItemBaseStepInEventDetail,
	TreeItemBaseStepOutEventDetail,
} from "./TreeItemBase.js";
import type {
	ListItemClickEventDetail,
	ListItemDeleteEventDetail,
	ListItemFocusEventDetail,
	ListSelectionChangeEventDetail,
} from "./List.js";

// Template
import TreeTemplate from "./TreeTemplate.js";

// Styles
import TreeCss from "./generated/themes/Tree.css.js";

type TreeMoveEventDetail = {
	source: {
		element: HTMLElement,
	},
	destination: {
		element: HTMLElement,
		placement: `${MovePlacement}`,
	}
}

type TreeItemEventDetail = {
	item: TreeItemBase,
}
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
}
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
@customElement({
	tag: "ui5-tree",
	renderer: jsxRenderer,
	styles: TreeCss,
	template: TreeTemplate,
})
/**
 * Fired when a tree item is expanded or collapsed.
 *
 * **Note:** You can call `preventDefault()` on the event object to suppress the event, if needed.
 * This may be handy for example if you want to dynamically load tree items upon the user expanding a node.
 * Even if you prevented the event's default behavior, you can always manually call `toggle()` on a tree item.
 * @param {HTMLElement} item the toggled item.
 * @public
 */
@event("item-toggle", {
	bubbles: true,
	cancelable: true,
})
/**
 * Fired when the mouse cursor enters the tree item borders.
 * @param {HTMLElement} item the hovered item.
 * @since 1.0.0-rc.16
 * @public
 */
@event("item-mouseover", {
	bubbles: true,
})
/**
 * Fired when the mouse cursor leaves the tree item borders.
 * @param {HTMLElement} item the hovered item.
 * @since 1.0.0-rc.16
 * @public
 */
@event("item-mouseout", {
	bubbles: true,
})
/**
 * Fired when a tree item is activated.
 * @param {HTMLElement} item The clicked item.
 * @public
 */
@event("item-click", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired when the Delete button of any tree item is pressed.
 *
 * **Note:** A Delete button is displayed on each item,
 * when the component `selectionMode` property is set to `Delete`.
 * @param {HTMLElement} item the deleted item.
 * @public
 */
@event("item-delete", {
	bubbles: true,
})

/**
 * Fired when a tree item is focused.
 * @param {HTMLElement} item The focused item.
 * @private
 */
@event("item-focus", {
	bubbles: true,
})

/**
 * Fired when selection is changed by user interaction
 * in `Single`, `SingleStart`, `SingleEnd` and `Multiple` modes.
 * @param {Array} selectedItems An array of the selected items.
 * @param {Array} previouslySelectedItems An array of the previously selected items.
 * @param {HTMLElement} targetItem The item triggering the event.
 * @public
 */
@event("selection-change", {
	bubbles: true,
})

/**
 * Fired when a movable tree item is moved over a potential drop target during a drag-and-drop operation.
 *
 * If the new position is valid, prevent the default action of the event using `preventDefault()`.
 * @param {object} source Contains information about the moved element under the `element` property.
 * @param {object} destination Contains information about the destination of the moved element. Has `element` and `placement` properties.
 * @public
 */
@event("move", {
	bubbles: true,
})

/**
 * Fired when a movable tree item is dropped onto a drop target.
 *
 * **Note:** The `move` event is fired only if there was a preceding `move-over` event with prevented default action.
 * @param {object} source Contains information about the moved element under the `element` property.
 * @param {object} destination Contains information about the destination of the moved element. Has `element` and `placement` properties.
 * @public
 */
@event("move-over", {
	bubbles: true,
	cancelable: true,
})

class Tree extends UI5Element {
	eventDetails!: {
		"item-toggle": TreeItemToggleEventDetail,
		"item-mouseover": TreeItemMouseoverEventDetail,
		"item-mouseout": TreeItemMouseoutEventDetail,
		"item-click": TreeItemClickEventDetail,
		"item-delete": TreeItemDeleteEventDetail,
		"item-focus": TreeItemFocusEventDetail,
		"selection-change": TreeSelectionChangeEventDetail,
		"move": TreeMoveEventDetail,
		"move-over": TreeMoveEventDetail,
	}
	/**
	 * Defines the selection mode of the component. Since the tree uses a `ui5-list` to display its structure,
	 * the tree modes are exactly the same as the list modes, and are all applicable.
	 * @public
	 * @default "None"
	 */
	@property()
	selectionMode?: `${ListSelectionMode}` = "None";

	/**
	 * Defines the text that is displayed when the component contains no items.
	 * @default undefined
	 * @public
	 */
	@property()
	noDataText?: string;

	/**
	 * Defines the component header text.
	 *
	 * **Note:** If the `header` slot is set, this property is ignored.
	 * @default undefined
	 * @public
	 */
	@property()
	headerText?: string;

	/**
	 * Defines the component footer text.
	 * @default undefined
	 * @public
	 */
	@property()
	footerText?: string;

	/**
	 * Defines the accessible name of the component.
	 * @default undefined
	 * @public
	 * @since 1.8.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the IDs of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 1.8.0
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the accessible description of the component.
	 * @default undefined
	 * @public
	 * @since 2.5.0
	 */
	@property()
	accessibleDescription?: string;

	/**
	 * Defines the IDs of the elements that describe the component.
	 * @default undefined
	 * @public
	 * @since 2.5.0
	 */
	@property()
	accessibleDescriptionRef?: string;

	/**
	 * Defines the items of the component. Tree items may have other tree items as children.
	 *
	 * **Note:** Use `ui5-tree-item` for the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: DefaultSlot<TreeItemBase[]>;

	/**
	 * Defines the component header.
	 *
	 * **Note:** When the `header` slot is set, the
	 * `headerText` property is ignored.
	 * @public
	 */
	@slot()
	header!: Slot<HTMLElement[]>;

	_dragAndDropHandler: DragAndDropHandler;

	constructor() {
		super();

		// Initialize the DragAndDropHandler with the necessary configurations
		// The handler will manage the drag and drop operations for the tree items.
		this._dragAndDropHandler = new DragAndDropHandler(this, {
			getItems: this._getItems.bind(this),
			getDropIndicator: () => this.dropIndicatorDOM,
			transformElement: this._transformElement.bind(this),
			validateDraggedElement: this._validateDraggedElement.bind(this),
			filterPlacements: this._filterPlacements.bind(this),
		});
	}

	onBeforeRendering() {
		this._prepareTreeItems();
	}

	onAfterRendering() {
		// Note: this is a workaround for the problem that the list cannot invalidate itself when its only physical child is a slot (and the list items are inside the slot)
		// This code should be removed once a framework-level fix is implemented
		this.shadowRoot!.querySelector<TreeList>("[ui5-tree-list]")!.onBeforeRendering();
	}

	get dropIndicatorDOM(): DropIndicator | null {
		return this.shadowRoot!.querySelector("[ui5-drop-indicator]");
	}

	get list() {
		return this.getDomRef() as TreeList;
	}

	get _role() {
		return ListAccessibleRole.Tree;
	}

	get _hasHeader() {
		return !!this.header.length;
	}

	_ondragenter(e: DragEvent) {
		this._dragAndDropHandler.ondragenter(e);
	}

	_ondragleave(e: DragEvent) {
		this._dragAndDropHandler.ondragleave(e);
	}

	_ondragover(e: DragEvent) {
		this._dragAndDropHandler.ondragover(e);
	}

	_ondrop(e: DragEvent) {
		this._dragAndDropHandler.ondrop(e);
	}

	_onListItemStepIn(e: CustomEvent<TreeItemBaseStepInEventDetail>) {
		const treeItem = e.detail.item;
		if (treeItem.items.length > 0) {
			const firstChild = treeItem.items[0];
			const firstChildListItem = this._getListItemForTreeItem(firstChild);
			firstChildListItem && this.list.focusItem(firstChildListItem);
		}
	}

	_onListItemStepOut(e: CustomEvent<TreeItemBaseStepOutEventDetail>) {
		const treeItem = e.detail.item;
		if (treeItem.parentElement !== this) {
			const parent = treeItem.parentElement as TreeItemBase;
			const parentListItem = this._getListItemForTreeItem(parent);
			parentListItem && this.list.focusItem(parentListItem);
		}
	}

	_onListItemToggle(e: CustomEvent<TreeItemBaseToggleEventDetail>) {
		const treeItem = e.detail.item;
		const defaultPrevented = !this.fireDecoratorEvent("item-toggle", { item: treeItem });
		if (!defaultPrevented) {
			treeItem.toggle();
		}
	}

	_onListItemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const treeItem = e.detail.item as TreeItemBase;

		if (!this.fireDecoratorEvent("item-click", { item: treeItem })) {
			e.preventDefault();
		}
	}

	_onListItemDelete(e: CustomEvent<ListItemDeleteEventDetail>) {
		const treeItem = e.detail.item as TreeItemBase;
		this.fireDecoratorEvent("item-delete", { item: treeItem });
	}

	_onListItemFocus(e: CustomEvent<ListItemFocusEventDetail>) {
		const treeItem = e.detail.item as TreeItemBase;
		this.fireDecoratorEvent("item-focus", { item: treeItem });
	}

	_onListItemMouseOver(e: MouseEvent) {
		const target = e.target;

		if (this._isInstanceOfTreeItemBase(target)) {
			this.fireDecoratorEvent("item-mouseover", { item: target });
		}
	}

	_onListItemMouseOut(e: MouseEvent) {
		const target = e.target;

		if (this._isInstanceOfTreeItemBase(target)) {
			this.fireDecoratorEvent("item-mouseout", { item: target });
		}
	}

	_onListSelectionChange(e: CustomEvent<ListSelectionChangeEventDetail>) {
		if (!e.detail || !e.detail.previouslySelectedItems || !e.detail.selectedItems) {
			return;
		}

		const previouslySelectedItems = e.detail.previouslySelectedItems as Array<TreeItemBase>;
		const selectedItems = e.detail.selectedItems as Array<TreeItemBase>;
		const targetItem = e.detail.targetItem as TreeItemBase;

		previouslySelectedItems.forEach(item => {
			item.selected = false;
		});
		selectedItems.forEach(item => {
			item.selected = true;
		});

		this.fireDecoratorEvent("selection-change", {
			previouslySelectedItems,
			selectedItems,
			targetItem,
		});
	}

	_prepareTreeItems() {
		// set level to tree items
		this.walk((item, level, index) => {
			const parent = item.parentNode;
			const ariaSetSize = (parent && parent.children.length) || this.items.length;

			item.setAttribute("level", level.toString());

			item.forcedSetsize = ariaSetSize;
			item.forcedPosinset = index + 1;
		});
	}

	/**
	 * Returns the corresponding list item for a given tree item
	 * @param item The tree item
	 * @protected
	 */
	_getListItemForTreeItem(item: TreeItemBase) {
		return this.getItems().find(listItem => listItem === item);
	}

	/**
	 * Returns the a flat array of all tree items
	 * @protected
	 * @returns array of the tree items
	 */
	getItems(): Array<TreeItemBase> {
		return this.list.getItems();
	}

	/**
	 * Focus a tree item by its index in the flat array of all tree items
	 * @protected
	 * @param index
	 */
	focusItemByIndex(index: number) {
		const item = this.getItems()[index];
		item && this.list.focusItem(item);
	}

	/**
	 * Perform Depth-First-Search walk on the tree and run a callback on each node
	 * @public
	 * @param callback function to execute on each node of the tree with 3 arguments: the node, the level and the index
	 */
	walk(callback: WalkCallback): void {
		walkTree(this, 1, callback);
	}

	_getItems(): Array<HTMLElement> {
		const allLiNodesTraversed: Array<HTMLElement> = [];
		this.walk(item => {
			allLiNodesTraversed.push(item.shadowRoot!.querySelector("li")!);
		});
		return allLiNodesTraversed;
	}

	_transformElement(element: HTMLElement): HTMLElement {
		// Get the host element from shadow DOM
		return <HTMLElement>(<ShadowRoot>element.getRootNode()).host;
	}

	_validateDraggedElement(draggedElement: HTMLElement, targetElement: HTMLElement): boolean {
		// Don't allow dropping on itself or its children
		return !draggedElement.contains(targetElement);
	}

	_filterPlacements(placements: MovePlacement[], draggedElement: HTMLElement, targetElement: HTMLElement): MovePlacement[] {
		// Filter out MovePlacement.On when dragged element is the same as target
		if (targetElement === draggedElement) {
			return placements.filter(placement => placement !== MovePlacement.On);
		}
		return placements;
	}

	_isInstanceOfTreeItemBase(object: any): object is TreeItemBase {
		return "isTreeItem" in object;
	}
}

const walkTree = (el: Tree | TreeItemBase, level: number, callback: WalkCallback) => {
	(el.items).forEach((item, index) => {
		callback(item, level, index);
		if (item.items.length > 0) {
			walkTree(item, level + 1, callback);
		}
	});
};

Tree.define();

export default Tree;

export type {
	TreeMoveEventDetail,
	TreeItemToggleEventDetail,
	TreeItemMouseoverEventDetail,
	TreeItemMouseoutEventDetail,
	TreeItemClickEventDetail,
	TreeItemDeleteEventDetail,
	TreeItemFocusEventDetail,
	TreeSelectionChangeEventDetail,
	WalkCallback,
};
