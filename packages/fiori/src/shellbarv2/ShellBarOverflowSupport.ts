import type ShellBarV2Item from "../ShellBarV2Item.js";
import type { ShellBarV2ActionItem } from "./ShellBarActions.js";
import type { ShellBarV2EventBusInterface } from "./ShellBarEventBus.js";
import type { ShellBarV2DomAdapterInterface } from "./ShellBarDomAdapter.js";

interface ShellBarV2OverflowSupportItem {
	id: string;
	hideOrder: number;
	protected: boolean;
	selector: string; // CSS selector to find the element
	showInOverflow?: boolean; // If true, hiding this item triggers overflow button
}

interface ShellBarV2OverflowSupportParams {
	getAction: (actionId: string) => ShellBarV2ActionItem | undefined;
	overflowOuter: HTMLElement;
	overflowInner: HTMLElement;
	showSearchField: boolean;
}

interface ShellBarV2OverflowSupportResult {
	hiddenItems: string[];
	showOverflowButton: boolean;
}

interface ShellBarV2OverflowSupportConstructorParams {
	eventBus: ShellBarV2EventBusInterface;
	domAdapter: ShellBarV2DomAdapterInterface;
	getActions: () => ShellBarV2ActionItem[];
	getContent: () => HTMLElement[];
	getCustomItems: () => ShellBarV2Item[];
}

class ShellBarV2OverflowSupport {
	private hiddenItems: string[] = [];

	private eventBus: ShellBarV2EventBusInterface;
	private domAdapter: ShellBarV2DomAdapterInterface;

	private getActions: () => ShellBarV2ActionItem[];
	private getContent: () => HTMLElement[];
	private getCustomItems: () => ShellBarV2Item[];

	constructor({
		eventBus,
		domAdapter,
		getActions,
		getContent,
		getCustomItems,
	}: ShellBarV2OverflowSupportConstructorParams) {
		this.eventBus = eventBus;
		this.domAdapter = domAdapter;
		this.getActions = getActions;
		this.getContent = getContent;
		this.getCustomItems = getCustomItems;
	}

	/**
	 * Performs overflow calculation by iteratively hiding items until no overflow.
	 * Measures DOM after each hide to determine if more hiding is needed.
	 */
	updateOverflow(params: ShellBarV2OverflowSupportParams): ShellBarV2OverflowSupportResult {
		const { overflowOuter, overflowInner } = params;

		if (!overflowOuter || !overflowInner) {
			this.eventBus.emit("overflow-changed", { hiddenItems: [], showOverflowButton: false });
			return { hiddenItems: [], showOverflowButton: false };
		}

		// Build hidable items from state
		const sortedItems = this.buildHidableItems(params);

		// First, show all items
		this.resetVisibility(sortedItems);

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
			const element = this.domAdapter.querySelector(item.selector);
			if (element) {
				element.classList.add("ui5-shellbar-hidden");
				hiddenItems.push(item.id);

				// Only count items that should appear in overflow popover
				if (item.showInOverflow) {
					showOverflowButton = true;
				}
			}
		});

		this.eventBus.emit("overflow-changed", { hiddenItems, showOverflowButton });

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
	private buildHidableItems(params: ShellBarV2OverflowSupportParams): ShellBarV2OverflowSupportItem[] {
		const items: ShellBarV2OverflowSupportItem[] = [];

		// Content items hide FIRST (range: 10-99)
		// Respect data-hide-order attribute
		// Content items just disappear, no overflow popover
		this.getContent().forEach((item, index) => {
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
		if (params.showSearchField) {
			const selector = ".ui5-shellbar-search-button";
			let hideOrder = 0 + (params.showSearchField ? 100 : 0);

			if (this.isCurrentlyHidden(selector)) {
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

		if (params.getAction("notifications")) {
			const selector = ".ui5-shellbar-notifications-button";
			let hideOrder = 1 + (params.showSearchField ? 100 : 0);

			if (this.isCurrentlyHidden(selector)) {
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

		if (params.getAction("assistant")) {
			const selector = ".ui5-shellbar-assistant-button";
			let hideOrder = 2 + (params.showSearchField ? 100 : 0);

			if (this.isCurrentlyHidden(selector)) {
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
		this.getCustomItems().forEach((item, index) => {
			const slotName = (item as any)._individualSlot as string;
			const selector = `[data-ui5-stable="${slotName}"]`;
			let hideOrder = 3 + index + (params.showSearchField ? 100 : 0);

			if (this.isCurrentlyHidden(selector)) {
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
		if (params.getAction("product-switch")) {
			items.push({
				id: "product-switch",
				hideOrder: 999,
				"protected": true,
				selector: ".ui5-shellbar-product-switch-button",
			});
		}

		if (params.getAction("profile")) {
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
	 * Checks if an element is currently hidden.
	 */
	private isCurrentlyHidden(selector: string): boolean {
		const element = this.domAdapter.querySelector(selector);
		return element?.classList.contains("ui5-shellbar-hidden") || false;
	}

	/**
	 * Resets visibility of all items (shows them).
	 */
	private resetVisibility(items: ShellBarV2OverflowSupportItem[]) {
		items.forEach(item => {
			const element = this.domAdapter.querySelector<HTMLElement>(item.selector);
			if (element) {
				element.classList.remove("ui5-shellbar-hidden");
			}
		});
	}

	/**
	 * Returns list of items to be shown in overflow popover.
	 */
	get overflowItems(): Array<{ type: "action" | "item", id: string, data: ShellBarV2ActionItem | ShellBarV2Item }> {
		const result: Array<{ type: "action" | "item", id: string, data: any, order: number }> = [];

		// Add hidden actions
		this.hiddenActions.forEach(action => {
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
		this.hiddenCustomItems.forEach((item, index) => {
			result.push({
				type: "item", id: item._id, data: item, order: 3 + index,
			});
		});

		// Sort by order
		return result.sort((a, b) => a.order - b.order);
	}

	/**
	 * Returns list of hidden actions.
	 */
	private get hiddenActions(): ShellBarV2ActionItem[] {
		return this.getActions().filter(action => this.hiddenItems.includes(action.id));
	}

	/**
	 * Returns list of hidden custom items.
	 */
	private get hiddenCustomItems(): ShellBarV2Item[] {
		return this.getCustomItems().filter(item => this.hiddenItems.includes(item._id));
	}
}

export default ShellBarV2OverflowSupport;
export type {
	ShellBarV2OverflowSupportItem,
	ShellBarV2OverflowSupportParams,
	ShellBarV2OverflowSupportResult,
	ShellBarV2OverflowSupportConstructorParams,
};
