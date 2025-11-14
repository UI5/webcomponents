import type ShellBarV2Item from "../ShellBarV2Item.js";
import { ShellBarV2Actions, ShellBarV2ActionsSelectors } from "../ShellBarV2.js";
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
	private readonly CLOSED_SEARCH_STRATEGY = {
		ACTIONS: 0,			// All actions first
		CONTENT: 1000,		// Then content (except last)
		SEARCH: 2000,		// Then search button
		LAST_CONTENT: 3000,	// Last content item protected
	};

	private readonly OPEN_SEARCH_STRATEGY = {
		CONTENT: 0, 		// All content first
		ACTIONS: 1000,		// All actions next
		SEARCH: 2000,		// Search after all actions
		LAST_CONTENT: 0,	// Last content same as other content
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
		setVisible(ShellBarV2ActionsSelectors.Overflow, false);
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
				setVisible(ShellBarV2ActionsSelectors.Overflow, true);
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

	private getOverflowStrategy(showSearchField: boolean) {
		return showSearchField ? this.OPEN_SEARCH_STRATEGY : this.CLOSED_SEARCH_STRATEGY;
	}

	private buildHidableItems(params: ShellBarV2OverflowParams): ShellBarV2HidableItem[] {
		const items: ShellBarV2HidableItem[] = [
			...this.buildContent(params),
			...this.buildActions(params),
		];

		// sort by hideOrder first then by keepHidden keepHidden items are at the start
		return items.sort((a, b) => {
			if (a.keepHidden && !b.keepHidden) {
				return -1;
			}
			if (!a.keepHidden && b.keepHidden) {
				return 1;
			}
			return a.hideOrder - b.hideOrder;
		});
	}

	private buildContent(params: ShellBarV2OverflowParams): readonly ShellBarV2HidableItem[] {
		const {
			content, showSearchField,
		} = params;

		const items: ShellBarV2HidableItem[] = [];
		const overflowStrategy = this.getOverflowStrategy(showSearchField);

		// Build content items
		content.forEach((item, index) => {
			const slotName = (item as any)._individualSlot as string;
			const dataHideOrder = parseInt(item.getAttribute("data-hide-order") || String(index));
			const isLast = index === content.length - 1;

			const priority = isLast ? overflowStrategy.LAST_CONTENT : overflowStrategy.CONTENT;

			items.push({
				id: slotName,
				selector: `#${slotName}`,
				hideOrder: priority + dataHideOrder,
				keepHidden: false,
				showInOverflow: false,
			});
		});

		return items;
	}

	private buildActions(params: ShellBarV2OverflowParams): readonly ShellBarV2HidableItem[] {
		const {
			customItems, actions, showSearchField, hiddenItemsIds,
		} = params;

		const items: ShellBarV2HidableItem[] = [];
		const overflowStrategy = this.getOverflowStrategy(showSearchField);
		let actionIndex = 0;

		customItems.forEach(item => {
			items.push({
				id: item._id,
				selector: `[data-ui5-stable="${item.stableDomRef}"]`,
				hideOrder: overflowStrategy.ACTIONS + actionIndex++,
				keepHidden: hiddenItemsIds.includes(item._id),
				showInOverflow: true,
			});
		});

		actions
			// skip protected actions and search (handled separately)
			.filter(a => !a.isProtected && a.id !== ShellBarV2Actions.Search)
			.forEach(config => {
				items.push({
					id: config.id,
					selector: config.selector,
					hideOrder: overflowStrategy.ACTIONS + actionIndex++,
					keepHidden: hiddenItemsIds.includes(config.id),
					showInOverflow: true,
				});
			});

		if (!showSearchField) {
			// Only move search to overflow if it's closed
			items.push({
				id: ShellBarV2Actions.Search,
				selector: ShellBarV2ActionsSelectors.Search,
				hideOrder: overflowStrategy.SEARCH + actionIndex++,
				keepHidden: hiddenItemsIds.includes(ShellBarV2Actions.Search),
				showInOverflow: true,
			});
		}
		return items;
	}

	getOverflowItems(params: {
		actions: readonly ShellBarV2ActionItem[];
		customItems: readonly ShellBarV2Item[];
		hiddenItemsIds: readonly string[];
	}): ReadonlyArray<ShellBarV2OverflowItem> {
		const { actions, customItems, hiddenItemsIds } = params;
		const result: ShellBarV2OverflowItem[] = [];

		// Add hidden custom items
		const hiddenCustomItems = customItems.filter((item: ShellBarV2Item) => hiddenItemsIds.includes(item._id));
		hiddenCustomItems.forEach((item: ShellBarV2Item, index: number) => {
			result.push({
				type: "item", id: item._id, data: item, order: 3 + index,
			});
		});

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
