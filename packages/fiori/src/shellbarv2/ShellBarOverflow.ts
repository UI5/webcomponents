import type ShellBarV2Item from "../ShellBarV2Item.js";
import type { ShellBarV2ActionItem } from "./ShellBarActions.js";

interface ShellBarV2HidableItem {
	id: string;
	selector: string; // CSS selector to find the element
	hideOrder: number;
	keepHidden: boolean;
	showInOverflow?: boolean; // If true, hiding this item triggers overflow button
}

interface ShellBarV2OverflowParams {
	actions: readonly ShellBarV2ActionItem[];
	content: readonly HTMLElement[];
	customItems: readonly ShellBarV2Item[];
	overflowOuter: HTMLElement;
	overflowInner: HTMLElement;
	hiddenItemsIds: readonly string[];
	showSearchField: boolean;
	setVisible: (selector: string, visible: boolean) => void;
}

interface ShellBarV2OverflowResult {
	hiddenItemsIds: string[];
	showOverflowButton: boolean;
}

type ShellBarV2OverflowItem = {
	type: "action";
	id: string;
	data: ShellBarV2ActionItem
	order: number;
} | {
	type: "item";
	id: string;
	data: ShellBarV2Item;
	order: number;
}

class ShellBarV2Overflow {
	private readonly OPEN_SEARCH_STRATEGY = {
		CONTENT: 0, 		// All content first
		ACTIONS: 100,		// All actions next
		SEARCH: 100,		// Search included in actions
		LAST_CONTENT: 0,	// Last content same as other content
	};

	private readonly CLOSED_SEARCH_STRATEGY = {
		ACTIONS: 0,			// All actions first
		CONTENT: 100,		// Then content (except last)
		SEARCH: 200,		// Then search button
		LAST_CONTENT: 300,	// Last content item protected
	};

	private readonly SELECTORS = {
		search: ".ui5-shellbar-search-toggle",
		assistant: ".ui5-shellbar-assistant-button",
		notifications: ".ui5-shellbar-bell-button",
	};

	/**
	 * Performs overflow calculation by iteratively hiding items until no overflow.
	 * Measures DOM after each hide to determine if more hiding is needed.
	 */
	updateOverflow(params: ShellBarV2OverflowParams): ShellBarV2OverflowResult {
		const {
			overflowOuter, overflowInner, setVisible,
		} = params;

		if (!overflowOuter || !overflowInner) {
			return { hiddenItemsIds: [], showOverflowButton: false };
		}

		// Build hidable items from state
		const sortedItems = this.buildHidableItems(params);

		// First, hide overflow button
		setVisible(".ui5-shellbar-overflow-button", false);

		// show all items
		sortedItems.forEach(item => {
			setVisible(item.selector, true);
		});

		let nextItemToHide = null;
		let showOverflowButton = false;
		const hiddenItemsIds: string[] = [];

		// Iteratively hide items until no overflow
		for (let indexToHide = 0; indexToHide < sortedItems.length; indexToHide++) {
			nextItemToHide = sortedItems[indexToHide];

			if (!this.isOverflowing(overflowOuter, overflowInner)) {
				break; // No more overflow, stop hiding
			}

			setVisible(nextItemToHide.selector, false);
			hiddenItemsIds.push(nextItemToHide.id);

			if (nextItemToHide.showInOverflow) {
				// show overflow button to account in isOverflowing calculation
				setVisible(".ui5-shellbar-overflow-button", true);
				showOverflowButton = true;
			}
		}

		// never hide just one item as overflow button also accounts for one item
		if (hiddenItemsIds.length === 1 && nextItemToHide) {
			hiddenItemsIds.push(nextItemToHide.id);
		}

		return {
			hiddenItemsIds,
			showOverflowButton,
		};
	}

	/**
	 * Checks if inner is overflowing wrapper.
	 */
	isOverflowing(overflowOuter: HTMLElement, overflowInner: HTMLElement): boolean {
		return overflowInner.offsetWidth > overflowOuter.offsetWidth;
	}

	/**
	 * Builds list of hidable items from state.
	 *
	 * Priority when search closed:
	 * 1. Action items
	 * 2. Content items (except last)
	 * 3. Search button
	 * 4. Last content item (protected)
	 *
	 * Priority when search open:
	 * 1. All content items
	 * 2. Action items (including search)
	 */
	private buildHidableItems(params: ShellBarV2OverflowParams): ShellBarV2HidableItem[] {
		const {
			content, customItems, actions, showSearchField, hiddenItemsIds,
		} = params;

		const items: ShellBarV2HidableItem[] = [];
		const priorityStrategy = showSearchField ? this.OPEN_SEARCH_STRATEGY : this.CLOSED_SEARCH_STRATEGY;

		const addItem = (itemData: Omit<ShellBarV2HidableItem, "keepHidden">) => {
			items.push({
				keepHidden: hiddenItemsIds.includes(itemData.id),
				...itemData,
			});
		};

		// Build content items
		content.forEach((item, index) => {
			const slotName = (item as any)._individualSlot as string;
			const dataHideOrder = parseInt(item.getAttribute("data-hide-order") || String(index));
			const isLast = index === content.length - 1;

			const priority = isLast ? priorityStrategy.LAST_CONTENT : priorityStrategy.CONTENT;

			addItem({
				id: slotName,
				selector: `#${slotName}`,
				hideOrder: priority + dataHideOrder,
				showInOverflow: false,
			});
		});

		// Build action items
		let actionIndex = 0;

		// Build custom items
		customItems.forEach(item => {
			addItem({
				id: item._id,
				selector: `[data-ui5-stable="${item.stableDomRef}"]`,
				hideOrder: priorityStrategy.ACTIONS + actionIndex++,
				showInOverflow: true,
			});
		});

		const notificationAction = actions.find(action => action.id === "notifications");
		if (notificationAction) {
			addItem({
				id: notificationAction.id,
				selector: this.SELECTORS.notifications,
				hideOrder: priorityStrategy.ACTIONS + actionIndex++,
				showInOverflow: true,
			});
		}

		const assistantAction = actions.find(action => action.id === "assistant");
		if (assistantAction) {
			addItem({
				id: assistantAction.id,
				selector: this.SELECTORS.assistant,
				hideOrder: priorityStrategy.ACTIONS + actionIndex++,
				showInOverflow: true,
			});
		}

		// only when search is closed
		if (!showSearchField) {
			addItem({
				id: "search",
				selector: this.SELECTORS.search,
				hideOrder: priorityStrategy.SEARCH + actionIndex++,
				showInOverflow: true,
			});
		}
		return items.sort((a, b) => a.hideOrder - b.hideOrder);
	}

	/**
	 * Returns list of items to be shown in overflow popover.
	 */
	getOverflowItems(params: {
		actions: readonly ShellBarV2ActionItem[];
		customItems: readonly ShellBarV2Item[];
		hiddenItemsIds: readonly string[];
	}): ReadonlyArray<ShellBarV2OverflowItem> {
		const { actions, customItems, hiddenItemsIds } = params;
		const result: ShellBarV2OverflowItem[] = [];

		// Add hidden actions
		const hiddenActions = actions.filter(action => hiddenItemsIds.includes(action.id));
		hiddenActions.forEach(action => {
			let order = 0;
			if (action.id === "search") {
				order = 0;
			} else if (action.id === "notifications") {
				order = 1;
			} else if (action.id === "assistant") {
				order = 2;
			}

			result.push({
				type: "action", id: action.id, data: action, order,
			});
		});

		// Add hidden custom items
		const hiddenCustomItems = customItems.filter((item: ShellBarV2Item) => hiddenItemsIds.includes(item._id));
		hiddenCustomItems.forEach((item: ShellBarV2Item, index: number) => {
			result.push({
				type: "item", id: item._id, data: item, order: 3 + index,
			});
		});

		// Sort by order
		result.sort((a, b) => a.order - b.order);
		return result;
	}
}

export default ShellBarV2Overflow;
export type {
	ShellBarV2HidableItem,
	ShellBarV2OverflowParams,
	ShellBarV2OverflowResult,
	ShellBarV2OverflowItem,
};
