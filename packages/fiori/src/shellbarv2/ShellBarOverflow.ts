import type ShellBarV2Item from "../ShellBarV2Item.js";
import { ShellBarV2Actions } from "../ShellBarV2.js";
import type { ShellBarV2ActionId, ShellBarV2ActionItem } from "../ShellBarV2.js";

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
	id: ShellBarV2ActionId;
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
		ACTIONS: 1000,		// All actions next
		SEARCH: 1000,		// Search included in actions
		LAST_CONTENT: 0,	// Last content same as other content
	};

	private readonly CLOSED_SEARCH_STRATEGY = {
		ACTIONS: 0,			// All actions first
		CONTENT: 1000,		// Then content (except last)
		SEARCH: 2000,		// Then search button
		LAST_CONTENT: 3000,	// Last content item protected
	};

	private readonly SELECTORS = {
		search: ".ui5-shellbar-search-toggle",
		overflow: ".ui5-shellbar-overflow-button",
		assistant: ".ui5-shellbar-assistant-button",
		notifications: ".ui5-shellbar-bell-button",
	};

	updateOverflow(params: ShellBarV2OverflowParams): ShellBarV2OverflowResult {
		const {
			overflowOuter, overflowInner, setVisible,
		} = params;

		if (!overflowOuter || !overflowInner) {
			return { hiddenItemsIds: [], showOverflowButton: false };
		}

		const sortedItems = this.buildHidableItems(params);

		// set initial state, to account for isOverflowing calculation
		setVisible(this.SELECTORS.overflow, false);
		sortedItems.forEach(item => {
			// show all items to account for isOverflowing calculation
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
				setVisible(this.SELECTORS.overflow, true);
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

	isOverflowing(overflowOuter: HTMLElement, overflowInner: HTMLElement): boolean {
		return overflowInner.offsetWidth > overflowOuter.offsetWidth;
	}

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

		let actionIndex = 0;

		customItems.forEach(item => {
			addItem({
				id: item._id,
				selector: `[data-ui5-stable="${item.stableDomRef}"]`,
				hideOrder: priorityStrategy.ACTIONS + actionIndex++,
				showInOverflow: true,
			});
		});

		const actionConfigs = [
			{ id: ShellBarV2Actions.Notifications, selector: this.SELECTORS.notifications },
			{ id: ShellBarV2Actions.Assistant, selector: this.SELECTORS.assistant },
		];

		actionConfigs.forEach(config => {
			if (actions.find(action => action.id === config.id)) {
				addItem({
					id: config.id,
					selector: config.selector,
					hideOrder: priorityStrategy.ACTIONS + actionIndex++,
					showInOverflow: true,
				});
			}
		});

		if (!showSearchField) {
			// Only move search to overflow if it's closed
			addItem({
				id: ShellBarV2Actions.Search,
				selector: this.SELECTORS.search,
				hideOrder: priorityStrategy.SEARCH + actionIndex++,
				showInOverflow: true,
			});
		}
		return items.sort((a, b) => a.hideOrder - b.hideOrder);
	}

	getOverflowItems(params: {
		actions: readonly ShellBarV2ActionItem[];
		customItems: readonly ShellBarV2Item[];
		hiddenItemsIds: readonly string[];
	}): ReadonlyArray<ShellBarV2OverflowItem> {
		const { actions, customItems, hiddenItemsIds } = params;
		const result: ShellBarV2OverflowItem[] = [];

		const actionOrder: Record<string, number> = {
			[ShellBarV2Actions.Search]: 0,
			[ShellBarV2Actions.Notifications]: 1,
			[ShellBarV2Actions.Assistant]: 2,
		};

		const hiddenActions = actions.filter(action => hiddenItemsIds.includes(action.id));
		hiddenActions.forEach(action => {
			result.push({
				type: "action",
				id: action.id,
				data: action,
				order: actionOrder[action.id] ?? 0,
			});
		});

		// Add hidden custom items
		const hiddenCustomItems = customItems.filter((item: ShellBarV2Item) => hiddenItemsIds.includes(item._id));
		hiddenCustomItems.forEach((item: ShellBarV2Item, index: number) => {
			result.push({
				type: "item", id: item._id, data: item, order: 3 + index,
			});
		});

		return result.sort((a, b) => a.order - b.order);
	}
}

export default ShellBarV2Overflow;
export type {
	ShellBarV2HidableItem,
	ShellBarV2OverflowParams,
	ShellBarV2OverflowResult,
	ShellBarV2OverflowItem,
};
