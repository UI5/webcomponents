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
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/grid.js";
import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/overflow.js";

import ShellBarV2Template from "./ShellBarV2Template.js";
import shellBarV2Styles from "./generated/themes/ShellBarV2.css.js";
import ShellBarPopoverCss from "./generated/themes/ShellBarPopover.css.js";
import shellBarV2LegacyStyles from "./generated/themes/ShellBarV2Legacy.css.js";

import type { IShellBarSearchController } from "./shellbarv2/IShellBarSearchController.js";

import ShellBarV2Legacy from "./shellbarv2/ShellBarLegacy.js";
import ShellBarV2Search from "./shellbarv2/ShellBarSearch.js";
import ShellBarV2SearchLegacy from "./shellbarv2/ShellBarSearchLegacy.js";
import ShellBarV2Actions from "./shellbarv2/ShellBarActions.js";
import ShellBarV2Overflow from "./shellbarv2/ShellBarOverflow.js";
import ShellBarV2Accessibility from "./shellbarv2/ShellBarAccessibility.js";
import ShellBarV2ItemNavigation from "./shellbarv2/ShellBarItemNavigation.js";

import ShellBarV2Item from "./ShellBarV2Item.js";
import ShellBarSpacer from "./ShellBarSpacer.js";
import type ShellBarBranding from "./ShellBarBranding.js";
import type { ShellBarV2ActionItem } from "./shellbarv2/ShellBarActions.js";
import type { ShellBarV2OverflowResult } from "./shellbarv2/ShellBarOverflow.js";

import type {
	ShellBarV2AccessibilityInfo,
	ShellBarV2AccessibilityAttributes,
	ShellBarV2AreaAccessibilityAttributes,
	ShellBarV2LogoAccessibilityAttributes,
	ShellBarV2ProfileAccessibilityAttributes,
} from "./shellbarv2/ShellBarAccessibility.js";

import {
	SHELLBAR_LABEL,
	SHELLBAR_NOTIFICATIONS,
	SHELLBAR_PROFILE,
	SHELLBAR_PRODUCTS,
	SHELLBAR_SEARCH,
	SHELLBAR_OVERFLOW,
	SHELLBAR_ADDITIONAL_CONTEXT,
	SHELLBAR_NOTIFICATIONS_NO_COUNT,
} from "./generated/i18n/i18n-defaults.js";

type ShellBarV2Breakpoint = "S" | "M" | "L" | "XL" | "XXL";

type ShellBarV2MenuButtonClickEventDetail = {
	menuButton: HTMLElement;
};

type ShellBarV2NotificationsClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarV2ProfileClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarV2ProductSwitchClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarV2SearchButtonClickEventDetail = {
	targetRef: HTMLElement;
	searchFieldVisible: boolean;
};

type ShellBarV2SearchFieldToggleEventDetail = {
	expanded: boolean;
};

type ShellBarV2SearchFieldClearEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarV2ContentItemVisibilityChangeEventDetail = {
	items: Array<HTMLElement>;
};

interface IShellBarSearchField extends HTMLElement {
	focused: boolean;
	value: string;
	collapsed?: boolean;
	open?: boolean;
}

/* =============================================================================
Legacy Event Types (DELETE WHEN REMOVING LEGACY)
================================================================================ */

type ShellBarV2LogoClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarV2MenuItemClickEventDetail = {
	item: HTMLElement;
};

/**
 * @class
 * ### Overview
 *
 * The `ui5-shellbar-v2` is a modular application header with built-in features.
 * This is an experimental MVP implementation.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/shellbarv2/ShellBarV2.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-shellbar-v2`
 * @constructor
 * @extends UI5Element
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-shellbar-v2",
	styles: [shellBarV2Styles, shellBarV2LegacyStyles, ShellBarPopoverCss],
	renderer: jsxRenderer,
	template: ShellBarV2Template,
	fastNavigation: true,
	languageAware: true,
	dependencies: [
		Icon,
		List,
		Button,
		Popover,
		ShellBarSpacer,
		ShellBarV2Item,
		ListItemStandard,
		Menu,
	],
})
/**
 * Fired when the menu button is clicked.
 * @param {HTMLElement} menuButton dom ref of the menu button
 * @public
 */
@event("menu-button-click", {
	bubbles: true,
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
/* =============================================================================
Legacy Events (DELETE WHEN REMOVING LEGACY)
================================================================================ */
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
class ShellBarV2 extends UI5Element {
	eventDetails!: {
		"menu-button-click": ShellBarV2MenuButtonClickEventDetail;
		"notifications-click": ShellBarV2NotificationsClickEventDetail;
		"profile-click": ShellBarV2ProfileClickEventDetail;
		"product-switch-click": ShellBarV2ProductSwitchClickEventDetail;
		"search-button-click": ShellBarV2SearchButtonClickEventDetail;
		"search-field-toggle": ShellBarV2SearchFieldToggleEventDetail;
		"search-field-clear": ShellBarV2SearchFieldClearEventDetail;
		"content-item-visibility-change": ShellBarV2ContentItemVisibilityChangeEventDetail;
		/* Legacy Events (DELETE WHEN REMOVING LEGACY) */
		"logo-click": ShellBarV2LogoClickEventDetail;
		"menu-item-click": ShellBarV2MenuItemClickEventDetail;
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
	 * Use `ui5-shellbar-v2-item` components.
	 * @public
	 */
	@slot({
		type: ShellBarV2Item,
		"default": true,
		// invalidateOnChildChange: true,
		individualSlots: true,
	})
	items!: Array<ShellBarV2Item>;

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
	accessibilityAttributes: ShellBarV2AccessibilityAttributes = {};

	/**
	 * Current breakpoint size.
	 * @private
	 */
	@property()
	breakpointSize: ShellBarV2Breakpoint = "M";

	/**
	 * Actions computed from controllers.
	 * @private
	 */
	@property({ type: Object })
	actions: ShellBarV2ActionItem[] = [];

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

	private readonly RESIZE_THROTTLE_RATE = 200; // ms
	private handleResizeBound: ResizeObserverCallback = throttle(this.handleResize.bind(this), this.RESIZE_THROTTLE_RATE);

	// Breakpoint constants
	private readonly breakpoints = [599, 1023, 1439, 1919, 10000];
	private readonly breakpointMap: Record<number, ShellBarV2Breakpoint> = {
		599: "S",
		1023: "M",
		1439: "L",
		1919: "XL",
		10000: "XXL",
	};

	itemNavigation = new ShellBarV2ItemNavigation({
		getDomRef: () => this.getDomRef() || null,
	});

	actionsAdaptor = new ShellBarV2Actions();
	overflowAdaptor = new ShellBarV2Overflow();
	accessibilityAdaptor = new ShellBarV2Accessibility();

	private _searchAdaptor = new ShellBarV2Search(this.getSearchDeps());
	private _searchAdaptorLegacy = new ShellBarV2SearchLegacy({
		...this.getSearchDeps(),
		getDisableSearchCollapse: () => this.disableSearchCollapse,
	});

	/* =========================================================================
	Legacy Members
	============================================================================ */

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

	legacyAdaptor?: ShellBarV2Legacy;

	/* =========================================================================
	Lifecycle Methods
	============================================================================ */

	onEnterDOM() {
		ResizeHandler.register(this, this.handleResizeBound);
		this.searchAdaptor?.subscribe();
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this.handleResizeBound);
		this.searchAdaptor?.unsubscribe();
	}

	onBeforeRendering() {
		if (!this.legacyAdaptor && this.hasLegacyFeatures) {
			this.initLegacyController();
		}
		// Sync branding breakpoint state
		this.branding.forEach(brandingEl => {
			brandingEl._isSBreakPoint = this.isSBreakPoint;
		});

		this.updateActions();

		this.searchAdaptor?.syncShowSearchFieldState();
		// subscribe to search adaptor for cases when search is added dynamically
		this.searchAdaptor?.unsubscribe();
		this.searchAdaptor?.subscribe();
	}

	onAfterRendering() {
		this.updateBreakpoint();
		this.updateOverflow();
	}

	/* =========================================================================
	Actions Management
	============================================================================ */

	/**
	 * Updates actions by delegating to controller.
	 * Demonstrates: Component gathers params, controller returns data, component applies.
	 */
	private updateActions() {
		const params = {
			hasSearch: this.hasSearchField,
			showNotifications: this.showNotifications,
			notificationsCount: this.notificationsCount,
			showProductSwitch: this.showProductSwitch,
			hasAssistant: this.hasAssistant,
			showProfile: this.hasProfile,
		};

		this.actions = this.actionsAdaptor.getActions(params);
	}

	getAction(actionId: string) {
		return this.actions.find(action => action.id === actionId);
	}

	getActionText(actionId: string): string {
		const texts: Record<string, string> = {
			"search": this.texts.search,
			"profile": this.texts.profile,
			"overflow": this.texts.overflow,
			"assistant": "Assistant",
			"notifications": this.texts.notificationsNoCount,
			"product-switch": this.texts.products,
		};
		return texts[actionId] || actionId;
	}

	/* =========================================================================
	Breakpoint Management
	============================================================================ */
	/**
	 * Calculate breakpoint based on width
	 */
	private calculateBreakpoint(width: number): ShellBarV2Breakpoint {
		const bp = this.breakpoints.find(b => width <= b) || 10000;
		return this.breakpointMap[bp];
	}

	/**
	 * Updates the breakpoint by delegating calculation to controller.
	 * This is the coordination logic - gather data, delegate, apply result.
	 */
	private updateBreakpoint() {
		const width = this.getBoundingClientRect().width;
		const breakpoint = this.calculateBreakpoint(width);

		if (this.breakpointSize !== breakpoint) {
			this.breakpointSize = breakpoint;
		}
	}

	/* =========================================================================
	Overflow Management
	============================================================================ */

	/**
	 * Updates overflow by delegating to controller.
	 * Controller measures DOM, hides items iteratively, returns result.
	 * Triggers rerender via property update to enable conditional rendering.
	 */
	private updateOverflow() {
		if (!this.overflowAdaptor) {
			return;
		}

		// Update items overflow state
		this.items.forEach(item => {
			item.inOverflow = false;
			// clear the hidden class to ensure the item is visible in the overflow popover
			item.classList.remove("ui5-shellbar-hidden");
		});

		// Delegate to controller - pass all data explicitly
		const result = this.overflowAdaptor.updateOverflow({
			actions: this.actions,
			content: this.content,
			customItems: this.items,
			hiddenItemsIds: this.hiddenItemsIds,
			showSearchField: this.showSearchField,
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

	private handleUpdateOverflowResult(result: ShellBarV2OverflowResult) {
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
		// Compare with previous state
		const oldHiddenContentIds = oldHiddenItemsIds
			.filter(id => this.content
				.some(item => (item as any)._individualSlot as string === id));
		const newHiddenContentIds = newHiddenItemsIds
			.filter(id => this.content
				.some(item => (item as any)._individualSlot as string === id));

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

		let prevented = false;

		// Trigger the appropriate action handler
		if (actionId === "notifications") {
			prevented = this.handleNotificationsClick();
		} else if (actionId === "search") {
			prevented = this.handleSearchButtonClick();
		}

		if (!prevented) {
			this.overflowPopoverOpen = false;
		}
	}

	get overflowItems() {
		return this.overflowAdaptor.getOverflowItems({
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
		const overflowItems = this.overflowAdaptor.getOverflowItems({
			actions: this.actions,
			customItems: this.items,
			hiddenItemsIds: this.hiddenItemsIds,
		});

		const itemsWithCount = overflowItems.filter(item => {
			if (item.type === "action") {
				return item.data.count;
			}
			return item.data.count;
		});

		if (itemsWithCount.length === 1) {
			const item = itemsWithCount[0];
			if (item.type === "action") {
				return item.data.count;
			}
			return item.data.count;
		}

		if (itemsWithCount.length > 1) {
			return " "; // Attention dot
		}

		return undefined;
	}

	/* =========================================================================
	Search Management
	============================================================================ */

	/**
	 * Initialize the appropriate search controller based on search field type.
	 * Self-collapsible search (ui5-shellbar-search) → ShellBarV2Search
	 * Legacy search (ui5-input, custom div) → ShellBarLegacySearch
	 */
	private getSearchDeps() {
		return {
			getSearchField: () => this.search,
			getSearchState: () => this.showSearchField,
			getCSSVariable: (cssVar: string) => this.getCSSVariable(cssVar),
			setSearchState: (expanded: boolean) => this.setSearchState(expanded),
			getOverflowed: () => this.overflowAdaptor.isOverflowing(this.overflowOuter!, this.overflowInner!),
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

	/**
	 * Sets search field state and fires toggle event.
	 * Component coordination: delegates to controller for logic, fires event for external listeners.
	 */
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

	/* =========================================================================
	Legacy Features Management
	============================================================================ */

	/**
	 * Initialize the legacy controller if legacy features are used.
	 */
	private initLegacyController() {
		if (this.hasLegacyFeatures) {
			this.legacyAdaptor = new ShellBarV2Legacy({
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

	/* =========================================================================
	Keyboard Navigation
	============================================================================ */

	_onKeyDown(e: KeyboardEvent) {
		this.itemNavigation.handleKeyDown(e);
	}

	/* =========================================================================
	Common Methods
	============================================================================ */

	handleNotificationsClick() {
		const notificationsBtn = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-bell-button");
		if (notificationsBtn) {
			return !this.fireDecoratorEvent("notifications-click", { targetRef: notificationsBtn });
		}
		return false;
	}

	handleProfileClick() {
		const profileBtn = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-image-button");
		if (profileBtn) {
			return !this.fireDecoratorEvent("profile-click", { targetRef: profileBtn });
		}
		return false;
	}

	handleProductSwitchClick() {
		const productSwitchBtn = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-button-product-switch");
		if (productSwitchBtn) {
			return !this.fireDecoratorEvent("product-switch-click", { targetRef: productSwitchBtn });
		}
		return false;
	}

	getCSSVariable(cssVar: string): string {
		const styleSet = getComputedStyle(this.getDomRef()!);
		return styleSet.getPropertyValue(getScopedVarName(cssVar));
	}

	get hasStartButton() {
		return this.startButton.length > 0;
	}

	get hasBranding() {
		return this.branding.length > 0;
	}

	get hasContent() {
		return this.content.length > 0;
	}

	get hasProfile() {
		return this.profile.length > 0;
	}

	get hasAssistant() {
		return this.assistant.length > 0;
	}
	get isSBreakPoint() {
		return this.breakpointSize === "S";
	}

	get hasSearchField() {
		return this.searchField.length > 0;
	}

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

	/* =========================================================================
	Content Management
	============================================================================ */

	/**
	 * Splits content into start and end groups based on spacer element.
	 * Items before spacer = start (left-aligned)
	 * Items after spacer = end (right-aligned)
	 * Without spacer, all items are start content.
	 *
	 * Spacer can be detected by:
	 * - Component: <ui5-shellbar-spacer slot="content">
	 * - Attribute: <div slot="content" ui5-shellbar-spacer>
	 */
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

	/**
	 * Returns packed separator info for a content item.
	 */
	getPackedSeparatorInfo(item: HTMLElement, isStartGroup: boolean) {
		const group = isStartGroup ? this.startContent : this.endContent;
		if (this.isSBreakPoint) {
			return { shouldPack: false };
		}

		const isHidden = this.hiddenItemsIds.includes((item as any)._individualSlot as string);
		const isLastItem = group.at(-1) === item;

		return { shouldPack: isHidden && isLastItem };
	}

	/* =========================================================================
	Accessibility
	============================================================================ */

	/**
	 * Returns accessibility info for all interactive areas.
	 * Used by template for aria attributes.
	 */
	get accInfo(): ShellBarV2AccessibilityInfo {
		return this.accessibilityAdaptor.getAccessibilityInfo({
			accessibilityAttributes: this.accessibilityAttributes,
			overflowPopoverOpen: this.overflowPopoverOpen,
			notificationsText: this.texts.notificationsNoCount,
			profileText: this.texts.profile,
			productsText: this.texts.products,
			searchText: this.texts.search,
			overflowText: this.texts.overflow,
		});
	}

	/**
	 * Returns toolbar role for actions area based on visible items count.
	 */
	get actionsRole(): "toolbar" | undefined {
		const visibleCount = this.actions.filter(a => !this.hiddenItemsIds.includes(a.id)).length;
		return this.accessibilityAdaptor.getActionsRole(visibleCount);
	}

	/**
	 * Returns group role for content area based on visible items count.
	 */
	get contentRole(): "group" | undefined {
		const visibleItemsCount = this.content.filter(item => !this.hiddenItemsIds.includes((item as any)._individualSlot as string)).length;
		return this.accessibilityAdaptor.getContentRole(visibleItemsCount);
	}

	// i18n text getters

	get texts() {
		return {
			search: ShellBarV2.i18nBundle.getText(SHELLBAR_SEARCH),
			profile: ShellBarV2.i18nBundle.getText(SHELLBAR_PROFILE),
			shellbar: ShellBarV2.i18nBundle.getText(SHELLBAR_LABEL),
			products: ShellBarV2.i18nBundle.getText(SHELLBAR_PRODUCTS),
			overflow: ShellBarV2.i18nBundle.getText(SHELLBAR_OVERFLOW),
			notifications: ShellBarV2.i18nBundle.getText(SHELLBAR_NOTIFICATIONS, this.notificationsCount || 0),
			notificationsNoCount: ShellBarV2.i18nBundle.getText(SHELLBAR_NOTIFICATIONS_NO_COUNT),
			contentItems: this.content.length > 1 ? ShellBarV2.i18nBundle.getText(SHELLBAR_ADDITIONAL_CONTEXT) : undefined,
		};
	}

	/**
	 * Used by overflow popover and legacy menu popover.
	 */
	get popoverHorizontalAlign(): "Start" | "End" {
		return this.effectiveDir === "rtl" ? "Start" : "End";
	}
}

ShellBarV2.define();

export default ShellBarV2;
export type {
	ShellBarV2MenuButtonClickEventDetail,
	ShellBarV2NotificationsClickEventDetail,
	ShellBarV2ProfileClickEventDetail,
	ShellBarV2ProductSwitchClickEventDetail,
	ShellBarV2SearchButtonClickEventDetail,
	ShellBarV2SearchFieldToggleEventDetail,
	ShellBarV2SearchFieldClearEventDetail,
	ShellBarV2ContentItemVisibilityChangeEventDetail,
	IShellBarSearchField,
	ShellBarV2Breakpoint,
	ShellBarV2AccessibilityAttributes,
	ShellBarV2AccessibilityInfo,
	ShellBarV2ProfileAccessibilityAttributes,
	ShellBarV2AreaAccessibilityAttributes,
	/* Legacy Types (DELETE WHEN REMOVING LEGACY) */
	ShellBarV2LogoClickEventDetail,
	ShellBarV2MenuItemClickEventDetail,
	ShellBarV2LogoAccessibilityAttributes,
};
