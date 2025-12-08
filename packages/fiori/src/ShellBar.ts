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
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import throttle from "@ui5/webcomponents-base/dist/util/throttle.js";

import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
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

import type { IShellBarSearchController } from "./shellbarv2/IShellBarSearchController.js";

import ShellBarLegacy from "./shellbarv2/ShellBarLegacy.js";
import ShellBarSearch from "./shellbarv2/ShellBarSearch.js";
import ShellBarSearchLegacy from "./shellbarv2/ShellBarSearchLegacy.js";
import ShellBarOverflow from "./shellbarv2/ShellBarOverflow.js";
import ShellBarAccessibility from "./shellbarv2/ShellBarAccessibility.js";
import ShellBarItemNavigation from "./shellbarv2/ShellBarItemNavigation.js";

import ShellBarItem from "./ShellBarItem.js";
import ShellBarSpacer from "./ShellBarSpacer.js";
import type ShellBarBranding from "./ShellBarBranding.js";
import type { ShellBarOverflowResult } from "./shellbarv2/ShellBarOverflow.js";

import type {
	ShellBarAccessibilityInfo,
	ShellBarAccessibilityAttributes,
	ShellBarAreaAccessibilityAttributes,
	ShellBarLogoAccessibilityAttributes,
	ShellBarProfileAccessibilityAttributes,
} from "./shellbarv2/ShellBarAccessibility.js";

import {
	SHELLBAR_LABEL,
	SHELLBAR_NOTIFICATIONS,
	SHELLBAR_NOTIFICATIONS_NO_COUNT,
	SHELLBAR_PROFILE,
	SHELLBAR_PRODUCTS,
	SHELLBAR_SEARCH,
	SHELLBAR_ASSISTANT,
	SHELLBAR_OVERFLOW,
	SHELLBAR_ADDITIONAL_CONTEXT,
} from "./generated/i18n/i18n-defaults.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";

type ShellBarBreakpoint = "S" | "M" | "L" | "XL" | "XXL";

// actions always visible in lean mode, order is important
const PREDEFINED_PLACE_ITEMS = ["feedback", "sys-help"];

const ShellBarActions = {
	Search: "search",
	Profile: "profile",
	Overflow: "overflow",
	Assistant: "assistant",
	ProductSwitch: "products",
	Notifications: "notifications",
};

const ShellBarActionsSelectors = {
	Search: ".ui5-shellbar-search-toggle",
	Profile: ".ui5-shellbar-image-button",
	Overflow: ".ui5-shellbar-overflow-button",
	Assistant: ".ui5-shellbar-assistant-button",
	ProductSwitch: ".ui5-shellbar-button-product-switch",
	Notifications: ".ui5-shellbar-bell-button",
};

type ShellBarActionId = typeof ShellBarActions[keyof typeof ShellBarActions];

type ShellBarActionItem = {
	id: ShellBarActionId;
	icon?: string;
	count?: string;
	enabled: boolean; 		// Whether the action is enabled and should be displayed
	selector: string; 		// The selector by which we can target the action
	isProtected: boolean 	// Whether the action can go into the overflow
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

type ShellBarLogoClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarMenuItemClickEventDetail = {
	item: HTMLElement;
};

type ShellBarContentItemVisibilityChangeEventDetail = {
	items: Array<HTMLElement>
};

type ShellBarSearchButtonEventDetail = {
	targetRef: HTMLElement;
	searchFieldVisible: boolean;
};

type ShellBarSearchFieldToggleEventDetail = {
	expanded: boolean;
};

type ShellBarSearchFieldClearEventDetail = {
	targetRef: HTMLElement;
};

/**
 * @class
 * ### Overview
 *
 * The `ui5-shellbar` is meant to serve as an application header
 * and includes numerous built-in features, such as: logo, profile image/icon, title, search field, notifications and so on.
 *
 * ### Stable DOM Refs
 *
 * You can use the following stable DOM refs for the `ui5-shellbar`:
 *
 * - logo
 * - notifications
 * - overflow
 * - profile
 * - product-switch
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBar.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-shellbar`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
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
		ButtonBadge,
		Popover,
		ShellBarSpacer,
		ShellBarItem,
		ListItemStandard,
		// legacy dependencies
		Menu,
	],
})
/**
 *
 * Fired, when the notification icon is activated.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event("notifications-click", {
	cancelable: true,
	bubbles: true,
})

/**
 * Fired, when the profile slot is present.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event("profile-click", {
	bubbles: true,
})

/**
 * Fired, when the product switch icon is activated.
 *
 * **Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event("product-switch-click", {
	cancelable: true,
	bubbles: true,
})

/**
 * Fired, when the logo is activated.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @since 0.10
 * @public
 */
@event("logo-click", {
	bubbles: true,
})

/**
 * Fired, when a menu item is activated
 *
 * **Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.
 * @param {HTMLElement} item DOM ref of the activated list item
 * @since 0.10
 * @public
 */
@event("menu-item-click", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired, when the search button is activated.
 *
 * **Note:** You can prevent expanding/collapsing of the search field by calling `event.preventDefault()`.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @param {Boolean} searchFieldVisible whether the search field is visible
 * @public
 */

@event("search-button-click", {
	cancelable: true,
	bubbles: true,
})

/**
 * Fired, when the search field is expanded or collapsed.
 * @since 2.10.0
 * @param {Boolean} expanded whether the search field is expanded
 * @public
 */
@event("search-field-toggle", {
	bubbles: true,
})

/**
 * Fired, when the search cancel button is activated.
 *
 * **Note:** You can prevent the default behavior (clearing the search field value) by calling `event.preventDefault()`. The search will still be closed.
 * **Note:** The `search-field-clear` event is in an experimental state and is a subject to change.
 * @param {HTMLElement} targetRef dom ref of the cancel button element
 * @since 2.14.0
 * @public
 */
@event("search-field-clear", {
	cancelable: true,
	bubbles: true,
})

/**
 * Fired, when an item from the content slot is hidden or shown.
 * **Note:** The `content-item-visibility-change` event is in an experimental state and is a subject to change.
 *
 * @param {Array<HTMLElement>} array of all the items that are hidden
 * @public
 * @since 2.7.0
 */
@event("content-item-visibility-change", {
	bubbles: true,
})

class ShellBar extends UI5Element {
	eventDetails!: {
		"notifications-click": ShellBarNotificationsClickEventDetail,
		"profile-click": ShellBarProfileClickEventDetail,
		"product-switch-click": ShellBarProductSwitchClickEventDetail,
		"logo-click": ShellBarLogoClickEventDetail,
		"menu-item-click": ShellBarMenuItemClickEventDetail,
		"search-button-click": ShellBarSearchButtonEventDetail,
		"search-field-toggle": ShellBarSearchFieldToggleEventDetail,
		"search-field-clear": ShellBarSearchFieldClearEventDetail,
		"content-item-visibility-change": ShellBarContentItemVisibilityChangeEventDetail
	}

	/**
	 * Defines a `ui5-button` in the bar that will be placed in the beginning.
	 * We encourage this slot to be used for a menu button.
	 * It gets overstyled to match ShellBar's styling.
	 * @public
	 */
	@slot()
	startButton!: Array<IButton>;

	/**
	 * Defines the branding slot.
	 * The `ui5-shellbar-branding` component is intended to be placed inside this slot.
	 * Content placed here takes precedence over the `primaryTitle` property and the `logo` content slot.
	 *
	 * **Note:** The `branding` slot is in an experimental state and is a subject to change.
	 *
	 * @since 2.12.0
	 * @public
	 */
	@slot()
	branding!: Array<ShellBarBranding>;

	/**
	 * Define the items displayed in the content area.
	 *
	 * Use the `data-hide-order` attribute with numeric value to specify the order of the items to be hidden when the space is not enough.
	 * Lower values will be hidden first.
	 *
	 * **Note:** The `content` slot is in an experimental state and is a subject to change.
	 *
	 * @public
	 * @since 2.7.0
	 */
	@slot({ type: HTMLElement, individualSlots: true })
	content!: Array<HTMLElement>;

	/**
	 * Defines the `ui5-input`, that will be used as a search field.
	 * @public
	 */
	@slot({ type: HTMLElement })
	searchField!: Array<IShellBarSearchField>;

	/**
	 * Defines the assistant slot.
	 *
	 * @since 2.0.0
	 * @public
	 */
	@slot()
	assistant!: Array<IButton>;

	/**
	 * Defines the `ui5-shellbar` additional items.
	 *
	 * **Note:**
	 * You can use the `<ui5-shellbar-item></ui5-shellbar-item>`.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, individualSlots: true })
	items!: Array<ShellBarItem>;

	/**
	 * You can pass `ui5-avatar` to set the profile image/icon.
	 * If no profile slot is set - profile will be excluded from actions.
	 *
	 * **Note:** We recommend not using the `size` attribute of `ui5-avatar` because
	 * it should have specific size by design in the context of `ui5-shellbar` profile.
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@slot()
	profile!: Array<HTMLElement>;

	/**
	 * Defines the visibility state of the search button.
	 *
	 * **Note:** The `hideSearchButton` property is in an experimental state and is a subject to change.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideSearchButton = false;

	/**
	 * Disables the automatic search field expansion/collapse when the available space is not enough.
	 *
	 * **Note:** The `disableSearchCollapse` property is in an experimental state and is a subject to change.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disableSearchCollapse = false;

	/**
	 * Defines the `primaryTitle`.
	 *
	 * **Note:** The `primaryTitle` would be hidden on S screen size (less than approx. 700px).
	 * @default undefined
	 * @public
	 */
	@property()
	primaryTitle?: string;

	/**
	 * Defines the `secondaryTitle`.
	 *
	 * **Note:** The `secondaryTitle` would be hidden on S and M screen sizes (less than approx. 1300px).
	 * @default undefined
	 * @public
	 */
	@property()
	secondaryTitle?: string;

	/**
	 * Defines the `notificationsCount`,
	 * displayed in the notification icon top-right corner.
	 * @default undefined
	 * @public
	 */
	@property()
	notificationsCount?: string;

	/**
	 * Defines, if the notification icon would be displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showNotifications = false;

	/**
	 * Defines, if the product switch icon would be displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showProductSwitch = false;

	/**
	 * Defines, if the Search Field would be displayed when there is a valid `searchField` slot.
	 *
	 * **Note:** By default the Search Field is not displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSearchField = false;

	/**
	 * Defines additional accessibility attributes on different areas of the component.
	 *
	 * The accessibilityAttributes object has the following fields,
	 * where each field is an object supporting one or more accessibility attributes:
	 *
	 * - **logo** - `logo.role` and `logo.name`.
	 * - **notifications** - `notifications.expanded` and `notifications.hasPopup`.
	 * - **profile** - `profile.expanded`, `profile.hasPopup` and `profile.name`.
	 * - **product** - `product.expanded` and `product.hasPopup`.
	 * - **search** - `search.hasPopup`.
	 * - **overflow** - `overflow.expanded` and `overflow.hasPopup`.
	 * - **branding** - `branding.name`.
	 *
	 * The accessibility attributes support the following values:
	 *
	 * - **role**: Defines the accessible ARIA role of the logo area.
	 * Accepts the following string values: `button` or `link`.
	 *
	 * - **expanded**: Indicates whether the button, or another grouping element it controls,
	 * is currently expanded or collapsed.
	 * Accepts the following string values: `true` or `false`.
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element,
	 * such as menu or dialog, that can be triggered by the button.
	 *
	 * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
	 * - **name**: Defines the accessible ARIA name of the area.
	 * Accepts any string.
	 *
	 * @default {}
	 * @public
	 * @since 1.10.0
	 */
	@property({ type: Object })
	accessibilityAttributes: ShellBarAccessibilityAttributes = {};

	/**
	 * @private
	 */
	@property()
	breakpointSize = "S";

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

	/* =================== Legacy Members =================== */

	/**
	 * Defines the logo of the `ui5-shellbar`.
	 * For example, you can use `ui5-avatar` or `img` elements as logo.
	 * @since 1.0.0-rc.8
	 * @public
	 */
	@slot()
	logo!: Array<HTMLElement>;

	/**
	 * Defines the items displayed in menu after a click on a start button.
	 *
	 * **Note:** You can use the  `<ui5-li></ui5-li>` and its ancestors.
	 * @since 0.10
	 * @public
	 */
	@slot()
	menuItems!: Array<ListItemBase>;

	/**
	 * Open state of the menu popover (legacy).
	 * @private
	 */
	@property({ type: Boolean })
	menuPopoverOpen = false;

	/**
	 * The container is positioned in the center of the `ui5-shellbar` and occupies one-third of the total length of the `ui5-shellbar`.
	 *
	 * **Note:** If set, the `searchField` slot is not rendered.
	 * @private
	 */
	@slot()
	midContent!: Array<HTMLElement>;

	legacyAdaptor?: ShellBarLegacy;

	/* =================== Lifecycle Methods =================== */

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

	/* =================== Actions Management =================== */

	private buildActions() {
		this.actions = [
			{
				id: ShellBarActions.Search,
				icon: searchIcon,
				enabled: this.enabledFeatures.search,
				selector: ShellBarActionsSelectors.Search,
				isProtected: false,
				stableDomRef: "toggle-search",
			},
			{
				id: ShellBarActions.Assistant,
				icon: daIcon,
				enabled: this.enabledFeatures.assistant,
				selector: ShellBarActionsSelectors.Assistant,
				isProtected: false,
			},
			{
				id: ShellBarActions.Notifications,
				icon: bellIcon,
				count: this.notificationsCount,
				enabled: this.enabledFeatures.notifications,
				selector: ShellBarActionsSelectors.Notifications,
				isProtected: false,
				stableDomRef: "notifications",
			},
			{
				id: ShellBarActions.Overflow,
				icon: overflowIcon,
				enabled: this.enabledFeatures.overflow,
				selector: ShellBarActionsSelectors.Overflow,
				isProtected: true,
				stableDomRef: "overflow",
			},
			{
				id: ShellBarActions.Profile,
				enabled: this.enabledFeatures.profile,
				selector: ShellBarActionsSelectors.Profile,
				isProtected: true,
				stableDomRef: "profile",
			},
			{
				id: ShellBarActions.ProductSwitch,
				icon: gridIcon,
				enabled: this.enabledFeatures.productSwitch,
				selector: ShellBarActionsSelectors.ProductSwitch,
				isProtected: true,
				stableDomRef: "product-switch",
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
			[ShellBarActions.ProductSwitch]: this.texts.products,
			[ShellBarActions.Notifications]: this.texts.notificationsNoCount,
		};
		return texts[actionId] || actionId;
	}

	/* =================== Breakpoint Management =================== */

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

	/* =================== Overflow Management =================== */

	private updateOverflow() {
		if (!this.overflow) {
			return;
		}

		const result = this.overflow.updateOverflow({
			actions: this.actions,
			content: this.sortContent(this.content),
			customItems: this.sortItems(this.items),
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

	isHidden(itemId: string) {
		return this.hiddenItemsIds.includes(itemId);
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
			customItems: this.sortItems(this.items),
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

	/* =================== Search Management =================== */

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

	/* =================== Legacy Features Management =================== */

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

	/* =================== Keyboard Navigation =================== */

	_onKeyDown(e: KeyboardEvent) {
		this.itemNavigation.handleKeyDown(e);
	}

	/* =================== Content Management =================== */

	get startContent(): HTMLElement[] {
		return this.splitContent(this.content).start;
	}

	get endContent(): HTMLElement[] {
		return this.splitContent(this.content).end;
	}

	get separatorConfig() {
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

	sortContent(content: readonly HTMLElement[]) {
		// reverse so items on the right are hidden first
		// then sort by hide order to apply custom preferences
		return content.toReversed().toSorted((a, b) => {
			const aOrder = parseInt(a.getAttribute("data-hide-order") || "0");
			const bOrder = parseInt(b.getAttribute("data-hide-order") || "0");
			return aOrder - bOrder;
		});
	}

	/*
	 * Determines whether a separator should be packed with an item.
	 * Separators are packed with the last item that is hidden to account for
	 * the space they occupy when next overflow calculation occurs.
	 */
	getPackedSeparatorInfo(item: HTMLElement, isStartGroup: boolean) {
		const group = isStartGroup ? this.startContent : this.endContent;
		const sorted = this.sortContent(group);
		const isHidden = this.hiddenItemsIds.includes((item as any)._individualSlot as string);
		const isLastItem = sorted.at(-1) === item;

		return { shouldPack: isHidden && isLastItem };
	}

	/* =================== Items Management =================== */

	sortItems(items: readonly ShellBarItem[]) {
		return items.toSorted((a, b) => {
			const aIndex = PREDEFINED_PLACE_ITEMS.indexOf(a.icon || "");
			const bIndex = PREDEFINED_PLACE_ITEMS.indexOf(b.icon || "");
			return aIndex - bIndex;
		});
	}

	/* =================== Accessibility =================== */

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

	/* =================== Common Members =================== */

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
	ShellBarActionsSelectors,
};
export type {
	/* Event Types */
	ShellBarProfileClickEventDetail,
	ShellBarSearchFieldClearEventDetail,
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
