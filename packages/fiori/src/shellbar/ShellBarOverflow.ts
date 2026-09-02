import type ShellBarItem from "../ShellBarItem.js";
import { ShellBarActions, ShellBarActionsSelectors } from "../ShellBar.js";
import type { ShellBarActionId, ShellBarActionItem } from "../ShellBar.js";

interface ShellBarHidableItem {
	id: string;
	selector: string; 			// CSS selector to find the element
	hideOrder: number;			// Priority for hiding - later adjusted based on search field state
	keepHidden: boolean; 		// Keep item hidden to prevent flickering when searchfield expands/collapses
	showInOverflow?: boolean; 	// If true, hiding this item triggers overflow button
	neverHide?: boolean;		// Never actually hide in DOM, but still report in hiddenItemsIds for events
}

interface ShellBarOverflowParams {
	actions: readonly ShellBarActionItem[];
	content: readonly HTMLElement[];
	customItems: readonly ShellBarItem[];
	overflowOuter: HTMLElement;
	overflowInner: HTMLElement;
	hiddenItemsIds: readonly string[];
	showSearchField: boolean;
	hasBranding: boolean;
	setVisible: (selector: string, visible: boolean) => void;
}

interface ShellBarOverflowResult {
	hiddenItemsIds: string[];
	showOverflowButton: boolean;
}

type ShellBarOverflowItem = {
	type: "action";
	id: ShellBarActionId;
	data: ShellBarActionItem
	order: number;
} | {
	type: "item";
	id: string;
	data: ShellBarItem;
	order: number;
} | {
	type: "branding";
	id: string;
	order: number;
	logoHidden: boolean;
	identifierHidden: boolean;
}

const BrandingIds = {
	Stacked: "branding-stacked",
	Identifier: "branding-identifier",
	Logo: "branding-logo",
} as const;

const BrandingSelectors = {
	Stacked: "[data-ui5-stable='branding-stacked']",
	Identifier: "[data-ui5-stable='branding-identifier']",
	Logo: "[data-ui5-stable='branding-logo']",
} as const;

class ShellBarOverflow {
	private readonly CLOSED_SEARCH_STRATEGY = {
		ACTIONS: 0,			// All actions hide first
		CONTENT: 1000,		// Then content (except last)
		SEARCH: 2000,		// Then search button
		LAST_CONTENT: 3000,	// Last content item hides last
		BRANDING_STACKED: 3500,    // Branding stacks (title below logo) before identifier hides
		BRANDING_IDENTIFIER: 4000, // Branding identifier hides after all actions
		BRANDING_LOGO: 5000,       // Logo hides last
	};

	private readonly OPEN_SEARCH_STRATEGY = {
		ACTIONS: 0, 		// Actions hide first (same as closed — spec says actions before content)
		CONTENT: 1000,		// Then content
		SEARCH: 2000,		// Then search button
		LAST_CONTENT: 1000,	// Last content same as other content
		BRANDING_STACKED: 3500,
		BRANDING_IDENTIFIER: 4000,
		BRANDING_LOGO: 5000,
	};

	updateOverflow(params: ShellBarOverflowParams): ShellBarOverflowResult {
		const {
			overflowOuter, overflowInner, setVisible,
		} = params;

		if (!overflowOuter || !overflowInner) {
			return { hiddenItemsIds: [], showOverflowButton: false };
		}

		const sortedItems = this.buildHidableItems(params);

		// set initial state, to account for isOverflowing calculation
		setVisible(ShellBarActionsSelectors.Overflow, false);
		sortedItems.forEach(item => {
			// show all items to account for isOverflowing calculation
			setVisible(item.selector, true);
		});

		let nextItemToHide = null;
		let overflowItemCount = 0;
		const hiddenItemsIds: string[] = [];

		// Iteratively hide items until no overflow
		for (let indexToHide = 0; indexToHide < sortedItems.length; indexToHide++) {
			nextItemToHide = sortedItems[indexToHide];

			if (!this.isOverflowing(overflowOuter, overflowInner)) {
				break; // No more overflow, stop hiding
			}

			if (!nextItemToHide.neverHide) {
				setVisible(nextItemToHide.selector, false);
			}
			hiddenItemsIds.push(nextItemToHide.id);

			if (nextItemToHide.showInOverflow) {
				overflowItemCount++;
				// Always show the overflow button in DOM during measurement to account for its width.
				// It will only be rendered visibly if overflowItemCount > 1 (enforced via showOverflowButton).
				setVisible(ShellBarActionsSelectors.Overflow, true);
			}
		}

		const showOverflowButton = overflowItemCount > 0;

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

	private buildHidableItems(params: ShellBarOverflowParams): ShellBarHidableItem[] {
		const items: ShellBarHidableItem[] = [
			...this.buildContent(params),
			...this.buildActions(params),
			...this.buildBranding(params),
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

	private buildBranding(params: ShellBarOverflowParams): readonly ShellBarHidableItem[] {
		if (!params.hasBranding) {
			return [];
		}

		const strategy = this.getOverflowStrategy(params.showSearchField);
		const { hiddenItemsIds } = params;

		return [
			{
				id: BrandingIds.Stacked,
				selector: BrandingSelectors.Stacked,
				hideOrder: strategy.BRANDING_STACKED,
				keepHidden: hiddenItemsIds.includes(BrandingIds.Stacked),
				showInOverflow: false,
			},
			{
				id: BrandingIds.Identifier,
				selector: BrandingSelectors.Identifier,
				hideOrder: strategy.BRANDING_IDENTIFIER,
				keepHidden: hiddenItemsIds.includes(BrandingIds.Identifier),
				showInOverflow: true,
			},
			{
				id: BrandingIds.Logo,
				selector: BrandingSelectors.Logo,
				hideOrder: strategy.BRANDING_LOGO,
				keepHidden: hiddenItemsIds.includes(BrandingIds.Logo),
				showInOverflow: true,
			},
		];
	}

	private buildContent(params: ShellBarOverflowParams): readonly ShellBarHidableItem[] {
		const {
			content, showSearchField,
		} = params;

		const items: ShellBarHidableItem[] = [];
		const overflowStrategy = this.getOverflowStrategy(showSearchField);

		// Build content items
		content.forEach((item, index) => {
			const slotName = (item as any)._individualSlot as string;
			const isNeverHide = item.hasAttribute("data-never-hide");
			const hasExplicitOrder = item.hasAttribute("data-hide-order");
			// Default: last added hides first (higher index = lower hide order number = hides earlier)
			const defaultOrder = content.length - index;
			const dataHideOrder = hasExplicitOrder ? parseInt(item.getAttribute("data-hide-order")!) : defaultOrder;
			const isLast = index === content.length - 1;

			const priority = isLast ? overflowStrategy.LAST_CONTENT : overflowStrategy.CONTENT;

			items.push({
				id: slotName,
				selector: `#${slotName}`,
				hideOrder: priority + dataHideOrder,
				keepHidden: false,
				showInOverflow: false,
				neverHide: isNeverHide || undefined,
			});
		});

		return items;
	}

	private buildActions(params: ShellBarOverflowParams): readonly ShellBarHidableItem[] {
		const {
			customItems, actions, showSearchField, hiddenItemsIds,
		} = params;

		const items: ShellBarHidableItem[] = [];
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
			.filter(a => !a.isProtected && a.id !== ShellBarActions.Search)
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
				id: ShellBarActions.Search,
				selector: ShellBarActionsSelectors.Search,
				hideOrder: overflowStrategy.SEARCH + actionIndex++,
				keepHidden: false, // Search button can be shown/hidden freely
				showInOverflow: true,
			});
		}
		return items;
	}

	getOverflowItems(params: {
		actions: readonly ShellBarActionItem[];
		customItems: readonly ShellBarItem[];
		hiddenItemsIds: readonly string[];
		hasBranding: boolean;
	}): ReadonlyArray<ShellBarOverflowItem> {
		const { actions, customItems, hiddenItemsIds, hasBranding } = params;
		const result: ShellBarOverflowItem[] = [];

		// Branding goes first when identifier or logo is hidden
		if (hasBranding && (hiddenItemsIds.includes(BrandingIds.Identifier) || hiddenItemsIds.includes(BrandingIds.Logo))) {
			result.push({
				type: "branding",
				id: "branding",
				order: -1,
				logoHidden: hiddenItemsIds.includes(BrandingIds.Logo),
				identifierHidden: hiddenItemsIds.includes(BrandingIds.Identifier),
			});
		}

		// Add hidden custom items
		const hiddenCustomItems = customItems.filter((item: ShellBarItem) => hiddenItemsIds.includes(item._id));
		hiddenCustomItems.forEach((item: ShellBarItem, index: number) => {
			result.push({
				type: "item", id: item._id, data: item, order: 3 + index,
			});
		});

		const actionOrder: Record<string, number> = {
			[ShellBarActions.Search]: 0,
			[ShellBarActions.Assistant]: 1,
			[ShellBarActions.Notifications]: 2,
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

export default ShellBarOverflow;
export type {
	ShellBarHidableItem,
	ShellBarOverflowParams,
	ShellBarOverflowResult,
	ShellBarOverflowItem,
};
