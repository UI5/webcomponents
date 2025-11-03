import type ShellBarV2Item from "../ShellBarV2Item.js";
import type { ShellBarV2ActionItem } from "./ShellBarActions.js";

interface ShellBarV2HidableItem {
	id: string;
	hideOrder: number;
	protected: boolean;
	selector: string; // CSS selector to find the element
	showInOverflow?: boolean; // If true, hiding this item triggers overflow button
}

interface ShellBarV2OverflowParams {
	actions: readonly ShellBarV2ActionItem[];
	content: readonly HTMLElement[];
	customItems: readonly ShellBarV2Item[];
	showSearchField: boolean;
	overflowOuter: HTMLElement;
	overflowInner: HTMLElement;
	setVisible: (selector: string, visible: boolean) => void;
}

interface ShellBarV2OverflowResult {
	hiddenItems: string[];
	showOverflowButton: boolean;
}

interface ShellBarV2OverflowItem {
	type: "action" | "item";
	id: string;
	data: ShellBarV2ActionItem | ShellBarV2Item;
	order: number;
}

class ShellBarV2OverflowSupport {
	private hiddenItems: string[] = [];

	/**
	 * Performs overflow calculation by iteratively hiding items until no overflow.
	 * Measures DOM after each hide to determine if more hiding is needed.
	 */
	updateOverflow(params: ShellBarV2OverflowParams): ShellBarV2OverflowResult {
		const {
			overflowOuter, overflowInner, setVisible,
		} = params;

		if (!overflowOuter || !overflowInner) {
			return { hiddenItems: [], showOverflowButton: false };
		}

		// Build hidable items from state
		const sortedItems = this.buildHidableItems(params);

		// First, show all items
		sortedItems.forEach(item => {
			setVisible(item.selector, true);
		});

		const hiddenItems: string[] = [];
		let showOverflowButton = false;

		// Iteratively hide items until no overflow
		sortedItems.forEach(item => {
			if (item.protected) {
				return; // Skip protected items
			}

			// Check if still overflowing
			if (!this.isOverflowing(overflowOuter, overflowInner)) {
				return; // No more overflow, stop hiding
			}

			// Hide this item
			setVisible(item.selector, false);
			hiddenItems.push(item.id);

			// Only count items that should appear in overflow popover
			if (item.showInOverflow) {
				showOverflowButton = true;
			}
		});

		this.hiddenItems = hiddenItems;

		return {
			hiddenItems,
			showOverflowButton,
		};
	}

	/**
	 * Checks if inner is overflowing wrapper.
	 */
	isOverflowing(overflowOuter: HTMLElement, overflowInner: HTMLElement): boolean {
		const overflowOuterWidth = overflowOuter.getBoundingClientRect().width;
		const overflowInnerWidth = overflowInner.getBoundingClientRect().width;
		return overflowInnerWidth > overflowOuterWidth;
	}

	/**
	 * Builds list of hidable items from state.
	 */
	private buildHidableItems(params: ShellBarV2OverflowParams): ShellBarV2HidableItem[] {
		const {
			content, actions, customItems, showSearchField,
		} = params;
		const items: ShellBarV2HidableItem[] = [];

		// Content items hide FIRST (range: 10-99)
		// Respect data-hide-order attribute
		// Content items just disappear, no overflow popover
		content.forEach((item, index) => {
			const slotName = (item as any)._individualSlot as string;
			const dataHideOrder = parseInt(item.getAttribute("data-hide-order") || String(index));
			const selector = `#${slotName}`;
			const hideOrder = 10 + dataHideOrder;

			items.push({
				id: slotName,
				hideOrder,
				"protected": false,
				selector,
				showInOverflow: false,
			});
		});

		// Action items hide SECOND (range: 100-199)
		// Actions show in overflow popover when hidden
		// Search button hides first among actions
		if (showSearchField) {
			const selector = ".ui5-shellbar-search-button";
			let hideOrder = 0 + (showSearchField ? 100 : 0);

			if (this.hiddenItems.includes("search-button")) {
				// flip priority to ensure currently hidden items remain hidden
				hideOrder *= -1;
			}

			items.push({
				id: "search-button",
				hideOrder,
				"protected": false,
				selector,
				showInOverflow: true,
			});
		}

		const notificationsAction = actions.find(a => a.id === "notifications");
		if (notificationsAction) {
			const selector = ".ui5-shellbar-notifications-button";
			let hideOrder = 1 + (showSearchField ? 100 : 0);

			if (this.hiddenItems.includes("notifications")) {
				// flip priority to ensure currently hidden items remain hidden
				hideOrder *= -1;
			}

			items.push({
				id: "notifications",
				hideOrder,
				"protected": false,
				selector,
				showInOverflow: true,
			});
		}

		const assistantAction = actions.find(a => a.id === "assistant");
		if (assistantAction) {
			const selector = ".ui5-shellbar-assistant-button";
			let hideOrder = 2 + (showSearchField ? 100 : 0);

			if (this.hiddenItems.includes("assistant")) {
				// flip priority to ensure currently hidden items remain hidden
				hideOrder *= -1;
			}

			items.push({
				id: "assistant",
				hideOrder,
				"protected": false,
				selector,
				showInOverflow: true,
			});
		}

		// Custom items hide with actions (range: 100-199)
		// Custom items show in overflow popover when hidden
		customItems.forEach((item, index) => {
			const slotName = (item as any)._individualSlot as string;
			const selector = `[data-ui5-stable="${slotName}"]`;
			let hideOrder = 3 + index + (showSearchField ? 100 : 0);

			if (this.hiddenItems.includes(item._id)) {
				hideOrder *= -1;
			}

			items.push({
				id: item._id,
				hideOrder,
				"protected": false,
				selector,
				showInOverflow: true,
			});
		});

		// Protected items NEVER hide (range: 900+)
		const productSwitchAction = actions.find(a => a.id === "product-switch");
		if (productSwitchAction) {
			items.push({
				id: "product-switch",
				hideOrder: 999,
				"protected": true,
				selector: ".ui5-shellbar-product-switch-button",
			});
		}

		const profileAction = actions.find(a => a.id === "profile");
		if (profileAction) {
			items.push({
				id: "profile",
				hideOrder: 1000,
				"protected": true,
				selector: ".ui5-shellbar-profile-button",
			});
		}

		// Sort items by hide order (lower = hide first), protected items last
		const sortedItems = [...items].sort((a, b) => {
			if (a.protected !== b.protected) {
				return a.protected ? 1 : -1;
			}
			return a.hideOrder - b.hideOrder;
		});

		return sortedItems;
	}

	/**
	 * Returns list of items to be shown in overflow popover.
	 */
	getOverflowItems(params: {
		actions: readonly ShellBarV2ActionItem[];
		customItems: readonly ShellBarV2Item[];
	}): ReadonlyArray<ShellBarV2OverflowItem> {
		const { actions, customItems } = params;
		const result: ShellBarV2OverflowItem[] = [];

		// Add hidden actions
		const hiddenActions = actions.filter(action => this.hiddenItems.includes(action.id));
		hiddenActions.forEach(action => {
			let order = 0;
			if (action.id === "search-button") {
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
		const hiddenCustomItems = customItems.filter((item: ShellBarV2Item) => this.hiddenItems.includes(item._id));
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

export default ShellBarV2OverflowSupport;
export type {
	ShellBarV2HidableItem,
	ShellBarV2OverflowParams,
	ShellBarV2OverflowResult,
	ShellBarV2OverflowItem,
};
