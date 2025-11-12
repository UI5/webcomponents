import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScopeUtils.js";
import arraysAreEqual from "@ui5/webcomponents-base/dist/util/arraysAreEqual.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { renderFinished } from "@ui5/webcomponents-base";
import throttle from "@ui5/webcomponents-base/dist/util/throttle.js";

import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import bellIcon from "@ui5/webcomponents-icons/dist/bell.js";
import gridIcon from "@ui5/webcomponents-icons/dist/grid.js";
import daIcon from "@ui5/webcomponents-icons/dist/da.js";
import overflowIcon from "@ui5/webcomponents-icons/dist/overflow.js";

import ShellBarTemplate from "./ShellBarTemplate.js";
import ShellBarStyles from "./generated/themes/ShellBar.css.js";
import ShellBarPopoverCss from "./generated/themes/ShellBarPopover.css.js";
import ShellBarLegacyStyles from "./generated/themes/ShellBarLegacy.css.js";

import type { IShellBarSearchController } from "./ShellBar/IShellBarSearchController.js";

import ShellBarLegacy from "./ShellBar/ShellBarLegacy.js";
import ShellBarSearch from "./ShellBar/ShellBarSearch.js";
import ShellBarSearchLegacy from "./ShellBar/ShellBarSearchLegacy.js";
import ShellBarOverflow from "./ShellBar/ShellBarOverflow.js";
import ShellBarAccessibility from "./ShellBar/ShellBarAccessibility.js";
import ShellBarItemNavigation from "./ShellBar/ShellBarItemNavigation.js";

import ShellBarItem from "./ShellBarItem.js";
import ShellBarSpacer from "./ShellBarSpacer.js";
import type ShellBarBranding from "./ShellBarBranding.js";
import type { ShellBarOverflowResult } from "./ShellBar/ShellBarOverflow.js";

import type {
	ShellBarAccessibilityInfo,
	ShellBarAccessibilityAttributes,
	ShellBarAreaAccessibilityAttributes,
	ShellBarLogoAccessibilityAttributes,
	ShellBarProfileAccessibilityAttributes,
} from "./ShellBar/ShellBarAccessibility.js";

import {
	SHELLBAR_LABEL,
	SHELLBAR_NOTIFICATIONS,
	SHELLBAR_PROFILE,
	SHELLBAR_PRODUCTS,
	SHELLBAR_SEARCH,
	SHELLBAR_OVERFLOW,
	SHELLBAR_ASSISTANT,
	SHELLBAR_ADDITIONAL_CONTEXT,
	SHELLBAR_NOTIFICATIONS_NO_COUNT,
} from "./generated/i18n/i18n-defaults.js";

type ShellBarBreakpoint = "S" | "M" | "L" | "XL" | "XXL";

const ShellBarActions = {
	Search: "search",
	Profile: "profile",
	Overflow: "overflow",
	Assistant: "assistant",
	Notifications: "notifications",
	ProductSwitch: "products",
} as const;

type ShellBarActionId = typeof ShellBarActions[keyof typeof ShellBarActions];

type ShellBarActionItem = {
	id: ShellBarActionId;
	icon?: string;
	count?: string;
	enabled: boolean; // Whether the action is enabled and should be displayed
	stableDomRef?: string;
};

interface IShellBarSearchField extends HTMLElement {
	focused: boolean;
	value: string;
	collapsed?: boolean;
	open?: boolean;
}

// Event Types

type ShellBarNotificationsClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarProfileClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarProductSwitchClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarSearchButtonClickEventDetail = {
	targetRef: HTMLElement;
	searchFieldVisible: boolean;
};

type ShellBarSearchFieldToggleEventDetail = {
	expanded: boolean;
};

type ShellBarSearchFieldClearEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarContentItemVisibilityChangeEventDetail = {
	items: Array<HTMLElement>;
};

// Legacy Event Types (DELETE WHEN REMOVING LEGACY)

type ShellBarLogoClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarMenuItemClickEventDetail = {
	item: HTMLElement;
};

/**
 * @class
 * ### Overview
 *
 * The `ui5-shellbar` is a modular application header with built-in features.
 * This is an experimental MVP implementation.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBar/ShellBar.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-shellbar`
 * @constructor
 * @extends UI5Element
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-shellbar",
	styles: [ShellBarStyles, ShellBarLegacyStyles, ShellBarPopoverCss],
	renderer: jsxRenderer,
	template: ShellBarTemplate,
	fastNavigation: true,
	languageAware: true,
	dependencies: [
		Icon,
		List,
		Button,
		Popover,
		ShellBarSpacer,
		ShellBarItem,
		ListItemStandard,
		// legacy dependencies
		Menu,
	],
})
/**
 * Fired when the notification icon is clicked.
 * @param {HTMLElement} targetRef dom ref of the notifications button
 * @public
 */
@event("notifications-click", {
	cancelable: true,
	bubbles: true,
})
/**
 * Fired when the profile is clicked.
 * @param {HTMLElement} targetRef dom ref of the profile element
 * @public
 */
@event("profile-click", {
	bubbles: true,
})
/**
 * Fired when the product switch icon is clicked.
 * @param {HTMLElement} targetRef dom ref of the product switch button
 * @public
 */
@event("product-switch-click", {
	cancelable: true,
	bubbles: true,
})
/**
 * Fired when the search button is clicked.
 * @param {HTMLElement} targetRef dom ref of the search button
 * @param {Boolean} searchFieldVisible whether the search field is visible
 * @public
 */
@event("search-button-click", {
	cancelable: true,
	bubbles: true,
})
/**
 * Fired when the search field is expanded or collapsed.
 * @param {Boolean} expanded whether the search field is expanded
 * @public
 */
@event("search-field-toggle", {
	bubbles: true,
})
/**
 * Fired when the search cancel button is clicked in full-screen mode.
 * @param {HTMLElement} targetRef dom ref of the cancel button
 * @public
 */
@event("search-field-clear", {
	cancelable: true,
	bubbles: true,
})
/**
 * Fired when content items are hidden or shown due to overflow.
 * @param {Array<HTMLElement>} items array of hidden content items
 * @public
 */
@event("content-item-visibility-change", {
	bubbles: true,
})
// Legacy Events (DELETE WHEN REMOVING LEGACY)
/**
 * Fired when the logo is clicked.
 * @param {HTMLElement} targetRef dom ref of the logo element
 * @public
 */
@event("logo-click", {
	bubbles: true,
})
/**
 * Fired when a menu item is clicked.
 * @param {HTMLElement} item DOM ref of the activated list item
 * @public
 */
@event("menu-item-click", {
	cancelable: true,
	bubbles: true,
})
class ShellBar extends UI5Element {
	eventDetails!: {
		"notifications-click": ShellBarNotificationsClickEventDetail;
		"profile-click": ShellBarProfileClickEventDetail;
		"product-switch-click": ShellBarProductSwitchClickEventDetail;
		"search-button-click": ShellBarSearchButtonClickEventDetail;
		"search-field-toggle": ShellBarSearchFieldToggleEventDetail;
		"search-field-clear": ShellBarSearchFieldClearEventDetail;
		"content-item-visibility-change": ShellBarContentItemVisibilityChangeEventDetail;
		/* Legacy Events (DELETE WHEN REMOVING LEGACY) */
		"logo-click": ShellBarLogoClickEventDetail;
		"menu-item-click": ShellBarMenuItemClickEventDetail;
	};

	/**
	 * Defines the branding slot (logo + title).
	 * The `ui5-shellbar-branding` component is intended to be placed inside this slot.
	 * @public
	 */
	@slot()
	branding!: Array<ShellBarBranding>;

	/**
	 * Defines a start button (menu button).
	 * Use `ui5-button` in this slot.
	 * @public
	 */
	@slot()
	startButton!: Array<IButton>;

	/**
	 * Defines content items displayed in the center area.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true })
	content!: Array<HTMLElement>;

	/**
	 * Defines additional custom items.
	 * Use `ui5-shellbar-item` components.
	 * @public
	 */
	@slot({
		type: ShellBarItem,
		"default": true,
		// invalidateOnChildChange: true,
		individualSlots: true,
	})
	items!: Array<ShellBarItem>;

	/**
	 * Defines the profile slot.
	 * You can pass `ui5-avatar` to set the profile image/icon.
	 * @public
	 */
	@slot()
	profile!: Array<HTMLElement>;

	/**
	 * Defines the assistant slot.
	 * Add a button for AI assistant or copilot.
	 * @public
	 */
	@slot()
	assistant!: Array<IButton>;

	/**
	 * Defines the search field slot.
	 * Use a self-collapsible search field component.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		// invalidateOnChildChange: true,
	})
	searchField!: Array<IShellBarSearchField>;

	/**
	 * Defines the notifications count displayed in the notification icon badge.
	 * @default undefined
	 * @public
	 */
	@property()
	notificationsCount?: string;

	/**
	 * Defines if the notification icon is displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showNotifications = false;

	/**
	 * Defines if the product switch icon is displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showProductSwitch = false;

	/**
	 * Defines if the search field is displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSearchField = false;

	/**
	 * Defines accessibility attributes for different areas of the component.
	 *
	 * The accessibilityAttributes object has the following fields:
	 *
	 * - **notifications** - `notifications.expanded` and `notifications.hasPopup`.
	 * - **profile** - `profile.expanded`, `profile.hasPopup` and `profile.name`.
	 * - **product** - `product.expanded` and `product.hasPopup`.
	 * - **search** - `search.hasPopup`.
	 * - **overflow** - `overflow.expanded` and `overflow.hasPopup`.
	 *
	 * The accessibility attributes support the following values:
	 *
	 * - **expanded**: Indicates whether the button, or another grouping element it controls,
	 * is currently expanded or collapsed. Accepts the following string values: `true` or `false`.
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element,
	 * such as menu or dialog, that can be triggered by the button.
	 * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
	 *
	 * - **name**: Defines the accessible ARIA name of the area.
	 * Accepts any string.
	 *
	 * @default {}
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Object })
	accessibilityAttributes: ShellBarAccessibilityAttributes = {};

	/**
	 * Current breakpoint size.
	 * @private
	 */
	@property()
	breakpointSize: ShellBarBreakpoint = "M";

	/**
	 * Actions computed from controllers.
	 * @private
	 */
	@property({ type: Object })
	actions: ShellBarActionItem[] = [];

	/**
	 * Show overflow button when items are hidden.
	 * @private
	 */
	@property({ type: Boolean })
	showOverflowButton = false;

	/**
	 * Open state of the overflow popover.
	 * @private
	 */
	@property({ type: Boolean })
	overflowPopoverOpen = false;

	/**
	 * IDs of items currently hidden due to overflow.
	 * Used to trigger rerender for conditional rendering.
	 * @private
	 */
	@property({ type: Object })
	hiddenItemsIds: string[] = [];

	/**
	 * Show full-screen search overlay.
	 * @private
	 */
	@property({ type: Boolean })
	showFullWidthSearch = false;

	/**
	 * Spacer element.
	 * @private
	 */
	@query(".ui5-shellbar-spacer")
	spacer?: HTMLElement;

	/**
	 * Outer container of the overflow container.
	 * @private
	 */
	@query(".ui5-shellbar-overflow-container")
	overflowOuter?: HTMLElement;

	/**
	 * Inner container of the overflow container.
	 * @private
	 */
	@query(".ui5-shellbar-overflow-container-inner")
	overflowInner?: HTMLElement;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	private readonly RESIZE_THROTTLE_RATE = 100; // ms
	private handleResizeBound: ResizeObserverCallback = throttle(this.handleResize.bind(this), this.RESIZE_THROTTLE_RATE);

	private readonly breakpoints = [599, 1023, 1439, 1919, 10000];
	private readonly breakpointMap: Record<number, ShellBarBreakpoint> = {
		599: "S",
		1023: "M",
		1439: "L",
		1919: "XL",
		10000: "XXL",
	};

	itemNavigation = new ShellBarItemNavigation({
		getDomRef: () => this.getDomRef() || null,
	});

	overflow = new ShellBarOverflow();
	accessibility: ShellBarAccessibility = new ShellBarAccessibility();

	private _searchAdaptor = new ShellBarSearch(this.getSearchDeps());
	private _searchAdaptorLegacy = new ShellBarSearchLegacy({
		...this.getSearchDeps(),
		getDisableSearchCollapse: () => this.disableSearchCollapse,
	});

	// Legacy Members

	/**
	 * Defines the logo slot (legacy).
	 * For new implementations, use the branding slot.
	 * @public
	 */
	@slot()
	logo!: Array<HTMLElement>;

	/**
	 * Defines the menu items slot (legacy).
	 * @public
	 */
	@slot()
	menuItems!: Array<HTMLElement>;

	/**
	 * Hides the search button.
	 * Only applies to legacy search fields (ui5-input, custom div).
	 * For self-collapsible search (ui5-shellbar-search), use the search field's own collapsed state.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideSearchButton = false;

	/**
	 * Disables automatic search field collapse when space is limited.
	 * Only applies to legacy search fields (ui5-input, custom div).
	 * Self-collapsible search (ui5-shellbar-search) manages its own state.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disableSearchCollapse = false;

	/**
	 * Defines the primary title (legacy).
	 * For new implementations, use the branding slot.
	 * @default undefined
	 * @public
	 */
	@property()
	primaryTitle?: string;

	/**
	 * Defines the secondary title (legacy).
	 * For new implementations, use the branding slot.
	 * @default undefined
	 * @public
	 */
	@property()
	secondaryTitle?: string;

	/**
	 * Open state of the menu popover (legacy).
	 * @private
	 */
	@property({ type: Boolean })
	menuPopoverOpen = false;

	legacyAdaptor?: ShellBarLegacy;

	// Lifecycle Methods

	onEnterDOM() {
		ResizeHandler.register(this, this.handleResizeBound);
		this.searchAdaptor?.subscribe();
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this.handleResizeBound);
		this.searchAdaptor?.unsubscribe();
	}

	onBeforeRendering() {
		if (!this.legacyAdaptor) {
			this.initLegacyController();
		}
		// Sync branding breakpoint state
		this.branding.forEach(brandingEl => {
			brandingEl._isSBreakPoint = this.isSBreakPoint;
		});

		this.buildActions();

		this.searchAdaptor?.syncShowSearchFieldState();
		// subscribe to search adaptor for cases when search is added dynamically
		this.searchAdaptor?.unsubscribe();
		this.searchAdaptor?.subscribe();
	}

	onAfterRendering() {
		this.updateBreakpoint();
		this.updateOverflow();
	}

	// Actions Management

	private buildActions() {
		this.actions = [
			{
				id: ShellBarActions.Search,
				icon: searchIcon,
				enabled: this.enabledFeatures.search,
				stableDomRef: "toggle-search",
			},
			{
				id: ShellBarActions.Profile,
				enabled: this.enabledFeatures.profile,
				stableDomRef: "profile",
			},
			{
				id: ShellBarActions.Assistant,
				icon: daIcon,
				enabled: this.enabledFeatures.assistant,
			},
			{
				id: ShellBarActions.Notifications,
				icon: bellIcon,
				count: this.notificationsCount,
				enabled: this.enabledFeatures.notifications,
				stableDomRef: "notifications",
			},
			{
				id: ShellBarActions.ProductSwitch,
				icon: gridIcon,
				enabled: this.enabledFeatures.productSwitch,
				stableDomRef: "product-switch",
			},
			{
				id: ShellBarActions.Overflow,
				icon: overflowIcon,
				enabled: this.enabledFeatures.overflow,
				stableDomRef: "overflow",
			},
		].filter(action => action.enabled);
	}

	getAction(actionId: ShellBarActionId) {
		return this.actions.find(action => action.id === actionId);
	}

	getActionOverflowText(actionId: ShellBarActionId): string {
		const texts: Record<string, string> = {
			[ShellBarActions.Search]: this.texts.search,
			[ShellBarActions.Profile]: this.texts.profile,
			[ShellBarActions.Overflow]: this.texts.overflow,
			[ShellBarActions.Assistant]: this.texts.assistant,
			[ShellBarActions.Notifications]: this.texts.notificationsNoCount,
			[ShellBarActions.ProductSwitch]: this.texts.products,
		};
		return texts[actionId] || actionId;
	}

	// Breakpoint Management

	get isSBreakPoint() {
		return this.breakpointSize === "S";
	}

	private updateBreakpoint() {
		const width = this.getBoundingClientRect().width;
		const bp = this.breakpoints.find(b => width <= b) || 10000;
		const breakpoint = this.breakpointMap[bp];

		if (this.breakpointSize !== breakpoint) {
			this.breakpointSize = breakpoint;
		}
	}

	// Overflow Management

	private updateOverflow() {
		if (!this.overflow) {
			return;
		}

		const result = this.overflow.updateOverflow({
			actions: this.actions,
			content: this.content,
			customItems: this.items,
			hiddenItemsIds: this.hiddenItemsIds,
			showSearchField: this.enabledFeatures.search && this.showSearchField,
			overflowOuter: this.overflowOuter!,
			overflowInner: this.overflowInner!,
			setVisible: (selector: string, visible: boolean) => {
				const element = this.shadowRoot!.querySelector(selector);
				if (element) {
					element.classList[visible ? "remove" : "add"]("ui5-shellbar-hidden");
				}
			},
		});

		this.handleUpdateOverflowResult(result);

		return result.hiddenItemsIds;
	}

	private handleUpdateOverflowResult(result: ShellBarOverflowResult) {
		const { hiddenItemsIds, showOverflowButton } = result;

		// Update items overflow state
		this.items.forEach(item => {
			item.inOverflow = hiddenItemsIds.includes(item._id);
			if (item.inOverflow) {
				// clear the hidden class to ensure the item is visible in the overflow popover
				item.classList.remove("ui5-shellbar-hidden");
			}
		});

		if (!arraysAreEqual(this.hiddenItemsIds, hiddenItemsIds)) {
			this.handleContentVisibilityChanged(this.hiddenItemsIds, hiddenItemsIds);
			this.hiddenItemsIds = hiddenItemsIds;
			this.showOverflowButton = showOverflowButton;
		}
		this.showFullWidthSearch = this.searchAdaptor?.shouldShowFullScreen() || false;
	}

	private handleContentVisibilityChanged(oldHiddenItemsIds: string[], newHiddenItemsIds: string[]) {
		const filterContentIds = (ids: string[]) => ids.filter(id => this.content.some(item => (item as any)._individualSlot as string === id));
		const oldHiddenContentIds = filterContentIds(oldHiddenItemsIds);
		const newHiddenContentIds = filterContentIds(newHiddenItemsIds);

		if (!arraysAreEqual(oldHiddenContentIds, newHiddenContentIds)) {
			this.fireDecoratorEvent("content-item-visibility-change", {
				items: newHiddenContentIds.map(id => this.content.find(item => (item as any)._individualSlot as string === id)!),
			});
		}
	}

	private handleResize() {
		this.overflowPopoverOpen = false;
		this.updateBreakpoint();
		const hiddenItemsIds = this.updateOverflow() ?? [];
		const spacerWidth = this.spacer?.getBoundingClientRect().width || 0;
		this.searchAdaptor?.autoManageSearchState(hiddenItemsIds.length, spacerWidth);
	}

	handleOverflowClick() {
		this.overflowPopoverOpen = !this.overflowPopoverOpen;
	}

	onPopoverClose() {
		this.overflowPopoverOpen = false;
	}

	/**
	 * Closes the overflow popover.
	 * @public
	 */
	closeOverflow(): void {
		this.overflowPopoverOpen = false;
	}

	handleOverflowItemClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const actionId = target.getAttribute("data-action-id");

		let prevented = e.defaultPrevented; // for custom actions

		if (actionId === ShellBarActions.Notifications) {
			prevented = this.handleNotificationsClick();
		} else if (actionId === ShellBarActions.Search) {
			prevented = this.handleSearchButtonClick();
		}

		if (!prevented) {
			this.overflowPopoverOpen = false;
		}
	}

	get overflowItems() {
		return this.overflow.getOverflowItems({
			actions: this.actions,
			customItems: this.items,
			hiddenItemsIds: this.hiddenItemsIds,
		});
	}

	/**
	 * Returns badge text for overflow button.
	 * Shows count if only one item with count is overflowed, otherwise shows attention dot.
	 */
	get overflowBadge(): string | undefined {
		const itemsWithCount = this.overflowItems.filter(item => item.data.count);
		if (itemsWithCount.length === 1) {
			return itemsWithCount[0].data.count;
		}
		if (itemsWithCount.length > 1) {
			return " "; // Attention dot
		}
		return undefined;
	}

	// Search Management

	get search() {
		return this.searchField.length ? this.searchField[0] : null;
	}

	get isSelfCollapsibleSearch(): boolean {
		const searchField = this.search;
		if (searchField) {
			return "collapsed" in searchField && "open" in searchField;
		}
		return false;
	}

	private getSearchDeps() {
		return {
			getSearchField: () => this.search,
			getSearchState: () => this.enabledFeatures.search && this.showSearchField,
			getCSSVariable: (cssVar: string) => this.getCSSVariable(cssVar),
			setSearchState: (expanded: boolean) => this.setSearchState(expanded),
			getOverflowed: () => this.overflow.isOverflowing(this.overflowOuter!, this.overflowInner!),
		};
	}

	get searchAdaptor(): IShellBarSearchController {
		if (this.isSelfCollapsibleSearch) {
			return this._searchAdaptor;
		}
		return this._searchAdaptorLegacy;
	}

	handleSearchButtonClick() {
		const searchButton = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-search-button");
		const defaultPrevented = !this.fireDecoratorEvent("search-button-click", {
			targetRef: searchButton!,
			searchFieldVisible: this.showSearchField,
		});

		if (defaultPrevented) {
			return defaultPrevented;
		}

		this.setSearchState(!this.showSearchField);

		if (!this.showSearchField) {
			return defaultPrevented;
		}

		const input = this.searchField[0];
		if (input) {
			input.focused = true;
			setTimeout(() => {
				input.focus();
			}, 100);
		}
		return defaultPrevented;
	}

	async setSearchState(expanded: boolean) {
		if (expanded === this.showSearchField) {
			return;
		}
		this.showSearchField = expanded;
		await renderFinished();
		this.fireDecoratorEvent("search-field-toggle", { expanded });
	}

	handleCancelButtonClick() {
		const cancelBtn = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-cancel-button");
		if (!cancelBtn) {
			return;
		}

		const clearDefaultPrevented = !this.fireDecoratorEvent("search-field-clear", {
			targetRef: cancelBtn,
		});

		this.showFullWidthSearch = false;
		this.setSearchState(false);

		if (!clearDefaultPrevented && this.search) {
			this.search.value = "";
		}
	}

	// Legacy Features Management

	private initLegacyController() {
		if (this.hasLegacyFeatures) {
			this.legacyAdaptor = new ShellBarLegacy({
				component: this,
				getShadowRoot: () => this.shadowRoot,
			});
		}
	}

	get hasLegacyFeatures(): boolean {
		return this.logo.length > 0
			|| !!this.primaryTitle
			|| !!this.secondaryTitle
			|| this.menuItems.length > 0;
	}

	// Keyboard Navigation

	_onKeyDown(e: KeyboardEvent) {
		this.itemNavigation.handleKeyDown(e);
	}

	// Content Management

	get startContent(): HTMLElement[] {
		return this.splitContent(this.content).start;
	}

	get endContent(): HTMLElement[] {
		return this.splitContent(this.content).end;
	}

	get separatorConfig() {
		if (this.isSBreakPoint) {
			return { showStartSeparator: false, showEndSeparator: false };
		}

		const { start, end } = this.splitContent(this.content);

		return {
			showStartSeparator: start.some(item => !this.hiddenItemsIds.includes((item as any)._individualSlot as string)),
			showEndSeparator: end.some(item => !this.hiddenItemsIds.includes((item as any)._individualSlot as string)),
		};
	}

	splitContent(content: readonly HTMLElement[]) {
		const spacerIndex = content.findIndex(
			child => child.hasAttribute("ui5-shellbar-spacer"),
		);

		if (spacerIndex === -1) {
			return { start: [...content], end: [] };
		}

		return {
			start: content.slice(0, spacerIndex),
			end: content.slice(spacerIndex + 1),
		};
	}

	getPackedSeparatorInfo(item: HTMLElement, isStartGroup: boolean) {
		const group = isStartGroup ? this.startContent : this.endContent;
		if (this.isSBreakPoint) {
			return { shouldPack: false };
		}

		const isHidden = this.hiddenItemsIds.includes((item as any)._individualSlot as string);
		const isLastItem = group.at(-1) === item;

		return { shouldPack: isHidden && isLastItem };
	}

	// Accessibility

	get actionsAccessibilityInfo(): ShellBarAccessibilityInfo {
		return this.accessibility.getActionsAccessibilityAttributes(this.texts, {
			overflowPopoverOpen: this.overflowPopoverOpen,
			accessibilityAttributes: this.accessibilityAttributes,
		});
	}

	get actionsRole(): "toolbar" | undefined {
		const visibleCount = this.actions.filter(a => !this.hiddenItemsIds.includes(a.id)).length;
		return this.accessibility.getActionsRole(visibleCount);
	}

	get contentRole(): "group" | undefined {
		const visibleItemsCount = this.content.filter(item => !this.hiddenItemsIds.includes((item as any)._individualSlot as string)).length;
		return this.accessibility.getContentRole(visibleItemsCount);
	}

	// Common Members

	get enabledFeatures() {
		return {
			search: this.searchField.length > 0,
			profile: this.profile.length > 0,
			content: this.content.length > 0,
			branding: this.branding.length > 0,
			overflow: this.showOverflowButton,
			assistant: this.assistant.length > 0,
			startButton: this.startButton.length > 0,
			notifications: this.showNotifications,
			productSwitch: this.showProductSwitch,
		};
	}

	get texts() {
		return {
			search: ShellBar.i18nBundle.getText(SHELLBAR_SEARCH),
			profile: ShellBar.i18nBundle.getText(SHELLBAR_PROFILE),
			shellbar: ShellBar.i18nBundle.getText(SHELLBAR_LABEL),
			products: ShellBar.i18nBundle.getText(SHELLBAR_PRODUCTS),
			overflow: ShellBar.i18nBundle.getText(SHELLBAR_OVERFLOW),
			assistant: ShellBar.i18nBundle.getText(SHELLBAR_ASSISTANT),
			notifications: ShellBar.i18nBundle.getText(SHELLBAR_NOTIFICATIONS, this.notificationsCount || 0),
			notificationsNoCount: ShellBar.i18nBundle.getText(SHELLBAR_NOTIFICATIONS_NO_COUNT),
			contentItems: this.content.length > 1 ? ShellBar.i18nBundle.getText(SHELLBAR_ADDITIONAL_CONTEXT) : undefined,
		};
	}

	get popoverHorizontalAlign(): "Start" | "End" {
		return this.effectiveDir === "rtl" ? "Start" : "End";
	}

	/**
	 * Returns the `logo` DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get logoDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="logo"]`);
	}

	/**
	 * Returns the `notifications` icon DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get notificationsDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="notifications"]`);
	}

	/**
	 * Returns the `overflow` icon DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get overflowDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="overflow"]`);
	}

	/**
	 * Returns the `profile` icon DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get profileDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="profile"]`);
	}

	/**
	 * Returns the `product-switch` icon DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get productSwitchDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="product-switch"]`);
	}

	/**
	 * Returns the search button DOM reference.
	 * @public
	 */
	async getSearchButtonDomRef(): Promise<HTMLElement | null> {
		await renderFinished();
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="toggle-search"]`);
	}

	private _fireClickEvent(eventName: string, domRef: HTMLElement | null): boolean {
		return domRef ? !this.fireDecoratorEvent(eventName as any, { targetRef: domRef }) : false;
	}

	handleNotificationsClick() {
		return this._fireClickEvent("notifications-click", this.notificationsDomRef);
	}

	handleProfileClick() {
		return this._fireClickEvent("profile-click", this.profileDomRef);
	}

	handleProductSwitchClick() {
		return this._fireClickEvent("product-switch-click", this.productSwitchDomRef);
	}

	getCSSVariable(cssVar: string): string {
		const styleSet = getComputedStyle(this.getDomRef()!);
		return styleSet.getPropertyValue(getScopedVarName(cssVar));
	}
}

ShellBar.define();

export default ShellBar;
export {
	ShellBarActions,
};
export type {
	/* Event Types */
	ShellBarProfileClickEventDetail,
	ShellBarSearchFieldClearEventDetail,
	ShellBarSearchButtonClickEventDetail,
	ShellBarSearchFieldToggleEventDetail,
	ShellBarProductSwitchClickEventDetail,
	ShellBarNotificationsClickEventDetail,
	ShellBarContentItemVisibilityChangeEventDetail,
	/* Common Types */
	ShellBarActionId,
	ShellBarActionItem,
	IShellBarSearchField,
	ShellBarBreakpoint,
	/* Accessibility Types */
	ShellBarAccessibilityInfo,
	ShellBarAccessibilityAttributes,
	ShellBarAreaAccessibilityAttributes,
	ShellBarProfileAccessibilityAttributes,
	/* Legacy Types (DELETE WHEN REMOVING LEGACY) */
	ShellBarLogoClickEventDetail,
	ShellBarMenuItemClickEventDetail,
	ShellBarLogoAccessibilityAttributes,
};
