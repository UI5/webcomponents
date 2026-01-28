import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import {
	isSpace,
	isEnter,
	isLeft,
	isRight,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import List from "@ui5/webcomponents/dist/List.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isDesktop, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import search from "@ui5/webcomponents-icons/dist/search.js";
import da from "@ui5/webcomponents-icons/dist/da.js";
import bell from "@ui5/webcomponents-icons/dist/bell.js";
import overflow from "@ui5/webcomponents-icons/dist/overflow.js";
import grid from "@ui5/webcomponents-icons/dist/grid.js";
import type {
	ClassMap,
	AccessibilityAttributes,
	AriaRole,
	UI5CustomEvent,
} from "@ui5/webcomponents-base";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import throttle from "@ui5/webcomponents-base/dist/util/throttle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import type ShellBarItem from "./ShellBarItem.js";
import type { ShellBarItemAccessibilityAttributes } from "./ShellBarItem.js";
import type ShellBarBranding from "./ShellBarBranding.js";

// Templates
import ShellBarTemplate from "./ShellBarTemplate.js";

// Styles
import shellBarStyles from "./generated/themes/ShellBar.css.js";
import ShellBarPopoverCss from "./generated/themes/ShellBarPopover.css.js";

import {
	SHELLBAR_LABEL,
	SHELLBAR_LOGO,
	SHELLBAR_NOTIFICATIONS,
	SHELLBAR_NOTIFICATIONS_NO_COUNT,
	SHELLBAR_CANCEL,
	SHELLBAR_PROFILE,
	SHELLBAR_PRODUCTS,
	SHELLBAR_SEARCH,
	SHELLBAR_SEARCH_FIELD,
	SHELLBAR_OVERFLOW,
	SHELLBAR_LOGO_AREA,
	SHELLBAR_ADDITIONAL_CONTEXT,
	SHELLBAR_SEARCHFIELD_DESCRIPTION,
	SHELLBAR_SEARCH_BTN_OPEN,
	SHELLBAR_PRODUCT_SWITCH_BTN,
	SHELLBAR_IMAGE_BTN,
} from "./generated/i18n/i18n-defaults.js";

type ShellBarLogoAccessibilityAttributes = {
	role?: Extract<AriaRole, "button" | "link">,
	name?: string,
}
type ShellBarProfileAccessibilityAttributes = Pick<AccessibilityAttributes, "name" | "expanded" | "hasPopup">;
type ShellBarAreaAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "expanded">;
type ShellBarBrandingAccessibilityAttributes = Pick<AccessibilityAttributes, "name">;
type ShellBarAccessibilityAttributes = {
	logo?: ShellBarLogoAccessibilityAttributes
	notifications?: ShellBarAreaAccessibilityAttributes
	profile?: ShellBarProfileAccessibilityAttributes,
	product?: ShellBarAreaAccessibilityAttributes
	search?: ShellBarAreaAccessibilityAttributes
	overflow?: ShellBarAreaAccessibilityAttributes
	branding?: ShellBarBrandingAccessibilityAttributes
};

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

interface IShellBarSearchField extends HTMLElement {
	focused: boolean;
	value: string;
	collapsed?: boolean;
	open?: boolean;
}

interface IShellBarHidableItem {
	classes: string,
	id: string,
	show: boolean,
}

interface IShelBarItemInfo extends IShellBarHidableItem {
	icon?: string,
	text?: string,
	count?: string,
	custom?: boolean,
	title?: string,
	stableDomRef?: string,
	refItemid?: string,
	press: (e: UI5CustomEvent<Button, "click">) => void,
	order?: number,
	profile?: boolean,
	tooltip?: string,
	accessibilityAttributes?: ShellBarItemAccessibilityAttributes,
	accessibleName?: string,
}

interface IShellBarContentItem extends IShellBarHidableItem {
	hideOrder: number,
}

const RESIZE_THROTTLE_RATE = 200; // ms

// actions always visible in lean mode, order is important
const PREDEFINED_PLACE_ACTIONS = ["feedback", "sys-help"];

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
	fastNavigation: true,
	languageAware: true,
	renderer: jsxRenderer,
	template: ShellBarTemplate,
	styles: [shellBarStyles, ShellBarPopoverCss],
	dependencies: [
		Button,
		Icon,
		List,
		Popover,
		ListItemStandard,
		Menu,
		ButtonBadge,
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
	 * @private
	 */
	@property({ type: Boolean })
	withLogo = false;

	@property({ type: Object })
	_itemsInfo: Array<IShelBarItemInfo> = [];

	@property({ type: Object })
	_contentInfo: Array<IShellBarContentItem> = [];

	@property({ type: Boolean, noAttribute: true })
	_menuPopoverExpanded = false;

	@property({ type: Boolean, noAttribute: true })
	_overflowPopoverExpanded = false;

	@property({ type: Boolean, noAttribute: true })
	showFullWidthSearch = false;

	_cachedHiddenContent: Array<HTMLElement> = [];

	/**
	 * Defines the assistant slot.
	 *
	 * @since 2.0.0
	 * @public
	 */
	@slot()
	assistant!: Slot<IButton[]>;

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
	branding!: Slot<ShellBarBranding[]>;

	/**
	 * Defines the `ui5-shellbar` additional items.
	 *
	 * **Note:**
	 * You can use the `<ui5-shellbar-item></ui5-shellbar-item>`.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
	items!: DefaultSlot<ShellBarItem[]>;

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
	profile!: Slot<HTMLElement[]>;

	/**
	 * Defines the logo of the `ui5-shellbar`.
	 * For example, you can use `ui5-avatar` or `img` elements as logo.
	 * @since 1.0.0-rc.8
	 * @public
	 */
	@slot()
	logo!: Slot<HTMLElement[]>;

	/**
	 * Defines the items displayed in menu after a click on a start button.
	 *
	 * **Note:** You can use the  `<ui5-li></ui5-li>` and its ancestors.
	 * @since 0.10
	 * @public
	 */
	@slot()
	menuItems!: Slot<ListItemBase[]>;

	/**
	 * Defines the `ui5-input`, that will be used as a search field.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	searchField!: Slot<IShellBarSearchField[]>;

	/**
	 * Defines a `ui5-button` in the bar that will be placed in the beginning.
	 * We encourage this slot to be used for a menu button.
	 * It gets overstyled to match ShellBar's styling.
	 * @public
	 */
	@slot()
	startButton!: Slot<IButton[]>;

	/**
	 * The container is positioned in the center of the `ui5-shellbar` and occupies one-third of the total length of the `ui5-shellbar`.
	 *
	 * **Note:** If set, the `searchField` slot is not rendered.
	 * @private
	 */
	@slot()
	midContent!: Slot<HTMLElement[]>;

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
	content!: Slot<HTMLElement[]>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;
	overflowPopover?: Popover | null;
	menuPopover?: Popover | null;
	_isInitialRendering: boolean;
	_defaultItemPressPrevented: boolean;
	contentItemsObserver: MutationObserver;
	_hiddenIcons: Array<IShelBarItemInfo>;
	_handleResize: ResizeObserverCallback;
	_overflowNotifications: string | null;
	_lastOffsetWidth = 0;
	_observableContent: Array<HTMLElement> = [];
	_autoRestoreSearchField = false;

	_onSearchOpenBound = this._onSearchOpen.bind(this);
	_onSearchCloseBound = this._onSearchClose.bind(this);
	_onSearchBound = this._onSearch.bind(this);

	_headerPress: () => void;

	static get FIORI_3_BREAKPOINTS() {
		return [
			599,
			1023,
			1439,
			1919,
			10000,
		];
	}

	static get FIORI_3_BREAKPOINTS_MAP(): Record<string, string> {
		return {
			"599": "S",
			"1023": "M",
			"1439": "L",
			"1919": "XL",
			"10000": "XXL",
		};
	}

	constructor() {
		super();

		this._hiddenIcons = [];
		this._isInitialRendering = true;
		this._overflowNotifications = null;

		// marks if preventDefault() is called in item's press handler
		this._defaultItemPressPrevented = false;

		this.contentItemsObserver = new MutationObserver(() => {
			this._handleActionsOverflow();
		});

		this._headerPress = () => {
			if (this.hasMenuItems) {
				const menuPopover = this._getMenuPopover();
				menuPopover.opener = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-menu-button")!;
				menuPopover.open = true;
			}
		};

		this._handleResize = throttle(() => {
			this.menuPopover = this._getMenuPopover();
			this.overflowPopover = this._getOverflowPopover();
			this.overflowPopover.open = false;
			if (this._lastOffsetWidth !== this.offsetWidth) {
				this._overflowActions();
				if (this.autoSearchField) {
					this._updateSearchFieldState();
				}
			}
		}, RESIZE_THROTTLE_RATE);
	}

	_onSearchOpen(e: Event) {
		if (e.target !== this.search) {
			this._detachSearchFieldListeners(e.target as HTMLElement);
			return;
		}
		if (isPhone()) {
			this.setSearchState(true);
		}
	}

	_onSearchClose(e: Event) {
		if (e.target !== this.search) {
			this._detachSearchFieldListeners(e.target as HTMLElement);
			return;
		}
		if (isPhone()) {
			this.setSearchState(false);
		}
	}

	_onSearch(e: Event) {
		if (e.target !== this.search) {
			this._detachSearchFieldListeners(e.target as HTMLElement);
			return;
		}

		// Decide when to toggle the search field:
		// - On mobile, the search opens on its own (we don’t interfere).
		// - If there’s already a value, onSearch is responsible for triggering the search (we don’t interfere)
		// - If the field is closed, we must open it regardless.
		if (isPhone() || (this.search?.value && this.showSearchField)) {
			return;
		}

		this.setSearchState(!this.showSearchField);
	}

	_updateSearchFieldState() {
		const spacerWidth = this.shadowRoot!.querySelector(".ui5-shellbar-spacer") ? this.shadowRoot!.querySelector(".ui5-shellbar-spacer")!.getBoundingClientRect().width : 0;
		const searchFieldWidth = this.domCalculatedValues("--_ui5_shellbar_search_field_width");
		if (this.showFullWidthSearch) {
			this.setSearchState(true);
			return;
		}
		if ((spacerWidth <= searchFieldWidth && this.contentItemsHidden.length !== 0) && this.showSearchField) {
			this.setSearchState(false);
			this._autoRestoreSearchField = true;
		} else if (spacerWidth > searchFieldWidth && this._autoRestoreSearchField) {
			this.setSearchState(true);
			this._autoRestoreSearchField = false;
		}
	}

	_onKeyDown(e: KeyboardEvent) {
		if (!isLeft(e) && !isRight(e) && !isHome(e) && !isEnd(e)) {
			return;
		}

		const domRef = this.getDomRef();
		if (!domRef) {
			// If the component is not rendered yet, we should not handle the keydown event
			return;
		}

		const activeElement = getActiveElement();
		if (!activeElement) {
			return;
		}

		// Check if the active elements should "steal" the navigation
		if (this._allowChildNavigation(activeElement as HTMLElement, e)) {
			return;
		}

		const items = getTabbableElements(domRef).filter(el => this._isVisible(el));
		const currentIndex = items.findIndex(el => el === activeElement);

		// Only handle arrow navigation if the focus is on a ShellBar item
		if (currentIndex !== -1) {
			e.preventDefault();

			// Focus navigation based on the key pressed
			if (isLeft(e)) {
				this._focusPreviousItem(items, currentIndex);
			} else if (isRight(e)) {
				this._focusNextItem(items, currentIndex);
			} else if (isHome(e)) {
				// Move focus to the first ShellBar item
				items[0]?.focus();
			} else if (isEnd(e)) {
				// Move focus to the last ShellBar item
				items[items.length - 1]?.focus();
			}
		}
	}

	private _allowChildNavigation(activeElement: HTMLElement, e: KeyboardEvent): boolean {
		if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") {
			return this._allowInputNavigation(activeElement as HTMLInputElement | HTMLTextAreaElement, e);
		}

		return false; // Default to false for other elements
	}

	private _allowInputNavigation(inputElement: HTMLInputElement | HTMLTextAreaElement, e: KeyboardEvent): boolean {
		const cursorPosition = inputElement.selectionStart || 0;
		const textLength = inputElement.value.length;

		// Allow internal navigation if cursor is not at the boundaries
		if ((isLeft(e) && cursorPosition > 0)
		|| (isRight(e) && cursorPosition < textLength)) {
			return true;
		}

		// Let ShellBar handle navigation if at boundaries
		return false;
	}

	_focusNextItem(items: HTMLElement[], currentIndex: number) {
		if (currentIndex < items.length - 1) {
			(items[currentIndex + 1]).focus(); // Focus the next element
		}
	}

	_focusPreviousItem(items: HTMLElement[], currentIndex: number) {
		if (currentIndex > 0) {
			(items[currentIndex - 1]).focus(); // Focus the previous element
		}
	}

	_isVisible(element: HTMLElement): boolean {
		const style = getComputedStyle(element);

		return style.display !== "none" && style.visibility !== "hidden" && element.offsetWidth > 0 && element.offsetHeight > 0;
	}

	_getRightChildItems() {
		return [
			...this.searchField,
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-search-item-for-arrow-nav"),
			...this.assistant,
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-items-for-arrow-nav"),
		] as HTMLElement[];
	}

	_menuItemPress(e: CustomEvent<ListItemClickEventDetail>) {
		const shouldContinue = this.fireDecoratorEvent("menu-item-click", {
			item: e.detail.item,
		});
		if (shouldContinue) {
			this.menuPopover!.open = false;
		}
	}

	_logoPress() {
		this.fireDecoratorEvent("logo-click", {
			targetRef: this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-logo")!,
		});
	}

	_menuPopoverBeforeOpen() {
		this._menuPopoverExpanded = true;
		if (this.menuPopover!.content && this.menuPopover!.content.length) {
			(<List> this.menuPopover!.content[0]).focusFirstItem();
		}
	}

	_menuPopoverAfterClose() {
		this._menuPopoverExpanded = false;
	}

	_overflowPopoverBeforeOpen() {
		this._overflowPopoverExpanded = true;
		if (this.overflowPopover!.content && this.overflowPopover!.content.length) {
			(<List> this.overflowPopover!.content[0]).focusFirstItem();
		}
	}

	_overflowPopoverAfterClose() {
		this._overflowPopoverExpanded = false;
	}

	_logoKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._logoPress();
		}
	}

	_logoKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			return;
		}

		if (isEnter(e)) {
			this._logoPress();
		}
	}

	_calculateCSSREMValue(styleSet: CSSStyleDeclaration, propertyName: string): number {
		return Number(styleSet.getPropertyValue(propertyName).replace("rem", "")) * parseInt(getComputedStyle(document.body).getPropertyValue("font-size"));
	}

	domCalculatedValues(cssVar: string): number {
		const shellbarComputerStyle = getComputedStyle(this.getDomRef()!);
		return this._calculateCSSREMValue(shellbarComputerStyle, getScopedVarName(cssVar)); // px
	}

	onBeforeRendering() {
		this.withLogo = this.hasLogo;

		this._hiddenIcons = this._itemsInfo.filter(info => {
			const isHidden = (info.classes.indexOf("ui5-shellbar-hidden-button") !== -1);
			const isSet = info.classes.indexOf("ui5-shellbar-invisible-button") === -1;
			const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;
			const isImageIcon = info.classes.indexOf("ui5-shellbar-image-button") !== -1;
			const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.hasProfile);

			return isHidden && isSet && !shouldStayOnScreen;
		});

		this._observeContentItems();

		// search field shouldn't be expanded initially in full width mode
		if (this.showFullWidthSearch && this._isInitialRendering) {
			this.setSearchState(false);
			this._autoRestoreSearchField = true;
		}

		if (isSelfCollapsibleSearch(this.search)) {
			if (isPhone()) {
				this.search.open = this.showSearchField;
			} else {
				this.search.collapsed = !this.showSearchField;
			}

			this._detachSearchFieldListeners(this.search);
			this._attachSearchFieldListeners(this.search);
		}
	}

	/**
	 * Use this method to change the state of the search filed according to internal logic.
	 * An event is fired to notify the change.
	 */
	async setSearchState(expanded: boolean) {
		if (expanded === this.showSearchField) {
			return;
		}
		this.showSearchField = expanded;
		await renderFinished();
		this.fireDecoratorEvent("search-field-toggle", { expanded });
	}

	onAfterRendering() {
		this._lastOffsetWidth = this.offsetWidth;
		this._overflowActions();
		this.onInitialRendering();
	}

	async onInitialRendering() {
		if (this._isInitialRendering) {
			await renderFinished();
			if (this.autoSearchField) {
				this._updateSearchFieldState();
			}
		}
		this._isInitialRendering = false;
	}

	/**
	 * Closes the overflow area.
	 * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
	 * @public
	 */
	closeOverflow(): void {
		if (this.overflowPopover) {
			this.overflowPopover.open = false;
		}
	}

	_handleBarBreakpoints() {
		const width = this.getBoundingClientRect().width;
		const breakpoints = ShellBar.FIORI_3_BREAKPOINTS;

		const size = breakpoints.find(bp1 => width <= bp1) || ShellBar.FIORI_3_BREAKPOINTS[ShellBar.FIORI_3_BREAKPOINTS.length - 1];
		const mappedSize = ShellBar.FIORI_3_BREAKPOINTS_MAP[size];

		if (this.breakpointSize !== mappedSize) {
			this.breakpointSize = mappedSize;
		}

		this.branding.forEach(brandingEl => {
			brandingEl._isSBreakPoint = this.isSBreakPoint;
		});
	}

	_hideItems(items: IShellBarHidableItem[]) {
		items.forEach(item => {
			if (item.classes.indexOf("ui5-shellbar-no-overflow-button") === -1) {
				item.classes = `${item.classes} ui5-shellbar-hidden-button`;
			}
		});
		return items;
	}

	_resetItemsVisibility(items: Array<HTMLElement>) {
		items.forEach(item => {
			item.classList.remove("ui5-shellbar-hidden-button");
		});
	}

	_handleActionsOverflow() {
		const inner = this.overflowInner;
		const wrapper = this.overflowWrapper;
		const hidableDomElements = this.hidableDomElements;
		const hiddenItems: string[] = [];
		let lastHiddenIndex = 0;

		this._resetItemsVisibility(hidableDomElements);

		for (let i = 0; i < hidableDomElements.length; i++) {
			if (inner?.offsetWidth === wrapper?.offsetWidth) {
				lastHiddenIndex = i;
				break;
			}

			const item = hidableDomElements[i];
			hiddenItems.push(item.id);
			item.classList.add("ui5-shellbar-hidden-button");
		}

		if (hiddenItems.length === 1 && !this.showSearchField) {
			const nextItemToHide = hidableDomElements[++lastHiddenIndex];
			if (nextItemToHide) {
				hiddenItems.push(nextItemToHide.id);
			}
		}

		const itemsInfo = this._getItemsInfo().filter(item => item.show && item.classes.indexOf("ui5-shellbar-no-overflow-button") === -1);
		const contentInfo = this._getContentInfo().sort((a, b) => a.hideOrder - b.hideOrder);
		const itemsToHide = [...itemsInfo, ...contentInfo].filter(item => hiddenItems.includes(item.id));

		this._hideItems(itemsToHide);

		return { itemsInfo, contentInfo };
	}

	_overflowActions() {
		this._handleBarBreakpoints();

		const { itemsInfo, contentInfo } = this._handleActionsOverflow();
		this._updateItemsInfo(itemsInfo);
		this._updateContentInfo(contentInfo);
		this._updateOverflowNotifications();
		this.showFullWidthSearch = this.overflowed && this.showSearchField;
	}

	_toggleActionPopover() {
		const overflowButton = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-overflow-button")!;
		const overflowPopover = this._getOverflowPopover();
		overflowPopover.opener = overflowButton;
		overflowPopover.open = true;
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);

		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
		this._attachSearchFieldListeners(this.search);
	}

	onExitDOM() {
		this.contentItemsObserver.disconnect();
		this._observableContent = [];
		ResizeHandler.deregister(this, this._handleResize);
		this._detachSearchFieldListeners(this.search);
	}

	_attachSearchFieldListeners(searchField: HTMLElement | null) {
		if (!searchField) {
			return;
		}
		searchField.addEventListener("ui5-open", this._onSearchOpenBound);
		searchField.addEventListener("ui5-close", this._onSearchCloseBound);
		searchField.addEventListener("ui5-search", this._onSearchBound);
	}

	_detachSearchFieldListeners(searchField: HTMLElement | null) {
		if (!searchField) {
			return;
		}
		searchField.removeEventListener("ui5-open", this._onSearchOpenBound);
		searchField.removeEventListener("ui5-close", this._onSearchCloseBound);
		searchField.removeEventListener("ui5-search", this._onSearchBound);
	}

	_handleSearchIconPress() {
		const searchButtonRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-search-button")!;
		const defaultPrevented = !this.fireDecoratorEvent("search-button-click", {
			targetRef: searchButtonRef,
			searchFieldVisible: this.showSearchField,
		});
		if (defaultPrevented) {
			return;
		}
		this.setSearchState(!this.showSearchField);

		if (!this.showSearchField) {
			return;
		}

		const input = this.searchField[0];

		// update the state immediately
		if (input) {
			input.focused = true;
		}

		// move the focus later
		setTimeout(() => {
			if (input) {
				input.focus();
			}
		}, 100);
	}

	async _handleActionListClick() {
		if (!this._defaultItemPressPrevented) {
			this.closeOverflow();
			// wait for DOM to be updated when ui5-popover is closed, otherwise if Enter key is hold
			// there will be no visual indication that this has happened
			await renderFinished();
		}

		this._defaultItemPressPrevented = false;
	}

	_handleCustomActionPress(e: UI5CustomEvent<Button, "click">) {
		const target = e.target as HTMLElement;
		const refItemId = target.getAttribute("data-ui5-external-action-item-id");

		if (refItemId) {
			const shellbarItem = this.items.find(item => {
				return item._id === refItemId;
			});

			const prevented = shellbarItem!.fireClickEvent(e);

			this._defaultItemPressPrevented = prevented;
		}
	}

	_handleOverflowPress() {
		this._toggleActionPopover();
	}

	_handleNotificationsPress(e: UI5CustomEvent<Button, "click">) {
		const notificationIconRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-bell-button")!,
			target = e.target as HTMLElement;

		this._defaultItemPressPrevented = !this.fireDecoratorEvent("notifications-click", {
			targetRef: notificationIconRef.classList.contains("ui5-shellbar-hidden-button") ? target : notificationIconRef,
		});
	}

	_handleProfilePress() {
		this.fireDecoratorEvent("profile-click", {
			targetRef: this.shadowRoot!.querySelector<Button>(".ui5-shellbar-image-button")!,
		});
	}

	_handleCancelButtonPress() {
		const cancelButtonRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-cancel-button")!;
		const clearDefaultPrevented = !this.fireDecoratorEvent("search-field-clear", {
			targetRef: cancelButtonRef,
		});

		this.showFullWidthSearch = false;
		this.setSearchState(false);

		if (!clearDefaultPrevented) {
			this._clearSearchFieldValue();
		}
	}

	_handleProductSwitchPress(e: UI5CustomEvent<Button, "click">) {
		const buttonRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-button-product-switch")!,
			target = e.target as HTMLElement;

		this._defaultItemPressPrevented = !this.fireDecoratorEvent("product-switch-click", {
			targetRef: buttonRef.classList.contains("ui5-shellbar-hidden-button") ? target : buttonRef,
		});
	}

	_clearSearchFieldValue() {
		if (this.search) {
			this.search.value = "";
		}
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
	 * Returns the `search` icon DOM ref.
	 * @returns The search icon DOM ref
	 * @public
	 * @since 2.10.0
	 */
	async getSearchButtonDomRef(): Promise<HTMLElement | null> {
		await renderFinished();
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="toggle-search"]`);
	}

	_getContentInfo(): Array<IShellBarContentItem> {
		return [
			...this.contentItemsSorted.map(item => {
				return {
					hideOrder: parseInt(item.getAttribute("data-hide-order") || "0"),
					id: item.slot,
					classes: "ui5-shellbar-content-item",
					show: false,
				};
			}),
		];
	}

	/**
	 * Returns all items that will be placed in the right of the bar as icons / dom elements.
	 */
	_getItemsInfo(): Array<IShelBarItemInfo> {
		const items: Array<IShelBarItemInfo> = [
			{
				icon: search,
				text: this._searchText,
				classes: `${this.searchField.length ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-search-button ui5-shellbar-button`,
				id: `${this._id}-item-${1}`,
				press: this._handleSearchIconPress.bind(this),
				show: !!this.searchField.length,
				tooltip: this._searchText,
			},
			{
				icon: da,
				text: "Assistant",
				classes: `${this.assistant.length ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-assistant-button`,
				id: `${this._id}-assistant`,
				show: !!this.assistant.length,
				press: () => { },
				tooltip: this.assistant.length ? (this.assistant[0].getAttribute("text") || this.assistant[0].getAttribute("title") || undefined) : undefined,
			},
			{
				icon: bell,
				title: this._notificationsText,
				text: ShellBar.i18nBundle.getText(SHELLBAR_NOTIFICATIONS_NO_COUNT),
				count: this.notificationsCount,
				classes: `${this.showNotifications ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-bell-button ui5-shellbar-button`,
				id: `${this._id}-item-${2}`,
				show: this.showNotifications,
				press: this._handleNotificationsPress.bind(this),
				tooltip: this._notificationsText,
			},
			// sort feedback and help to always be last
			...this.items.sort((a, b) => {
				const aIndex = PREDEFINED_PLACE_ACTIONS.indexOf(a.icon || "");
				const bIndex = PREDEFINED_PLACE_ACTIONS.indexOf(b.icon || "");
				return aIndex - bIndex;
			}).map((item: ShellBarItem) => {
				item._getRealDomRef = () => this.shadowRoot!.querySelector(`*[data-ui5-stable=${item.stableDomRef}]`)!;
				// check if included for lean mode
				const show = !!item.icon || false;
				return {
					icon: item.icon,
					id: item._id,
					count: item.count || undefined,
					refItemid: item._id,
					text: item.text,
					classes: "ui5-shellbar-custom-item ui5-shellbar-button",
					show,
					press: this._handleCustomActionPress.bind(this),
					custom: true,
					title: item.title,
					stableDomRef: item.stableDomRef,
					tooltip: item.title || item.text,
					accessibilityAttributes: item.accessibilityAttributes,
				};
			}),
			{
				icon: overflow,
				text: "Overflow",
				classes: "ui5-shellbar-hidden-button ui5-shellbar-no-overflow-button ui5-shellbar-overflow-button ui5-shellbar-button",
				id: `${this.id}-item-${5}`,
				press: this._handleOverflowPress.bind(this),
				show: true,
				tooltip: this._overflowText,
			},
			{
				text: "Person",
				classes: `${this.hasProfile ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-no-overflow-button ui5-shellbar-image-button ui5-shellbar-button`,
				profile: true,
				id: `${this._id}-item-${3}`,
				show: this.hasProfile,
				press: this._handleProfilePress.bind(this),
				tooltip: this._profileText,
			},
			{
				icon: grid,
				text: this._productsText,
				classes: `${this.showProductSwitch ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-no-overflow-button ui5-shellbar-button ui5-shellbar-image-button ui5-shellbar-button-product-switch`,
				id: `${this._id}-item-${4}`,
				show: this.showProductSwitch,
				press: this._handleProductSwitchPress.bind(this),
				tooltip: this._productsText,
			},
		];

		return items;
	}

	_updateItemsInfo(newItemsInfo: Array<IShelBarItemInfo>) {
		const isDifferent = JSON.stringify(this._itemsInfo) !== JSON.stringify(newItemsInfo);
		if (isDifferent) {
			this._itemsInfo = newItemsInfo;
		}
	}

	_updateContentInfo(newContentInfo: Array<IShellBarContentItem>) {
		const isDifferent = JSON.stringify(this._contentInfo) !== JSON.stringify(newContentInfo);
		if (isDifferent) {
			this._contentInfo = newContentInfo;
			this._fireContentItemVisibilityChangeEvent();
		}
	}

	_fireContentItemVisibilityChangeEvent() {
		const hiddenByClass = this._contentInfo
			.filter(item => item.classes.indexOf("ui5-shellbar-hidden-button") !== -1)
			.map(item => item.id);

		this.fireDecoratorEvent("content-item-visibility-change", {
			items: this.contentItems.filter(item => hiddenByClass.includes(item.slot)),
		});
	}

	_updateOverflowNotifications() {
		const notificationsArr: Array<string> = [];
		let overflowNotifications = null;

		this._itemsInfo.forEach(item => {
			if (item.count && item.classes.includes("ui5-shellbar-hidden-button")) {
				notificationsArr.push(item.count);
			}
		});

		if (notificationsArr.length === 1) {
			overflowNotifications = notificationsArr[0];
		} else if (notificationsArr.length > 1) {
			overflowNotifications = " ";
		}

		this._overflowNotifications = overflowNotifications;
	}

	_observeContentItems() {
		if (this.hasMatchingContent) {
			return;
		}

		this.contentItems.forEach(item => {
			if (!this._observableContent.includes(item)) {
				this.contentItemsObserver.observe(item, {
					characterData: false,
					childList: false,
					subtree: false,
					attributes: true,
					attributeFilter: ["data-hide-order"],
				});
			}
		});
		this._observableContent = this.contentItems;
	}

	_getOverflowPopover() {
		return this.shadowRoot!.querySelector<Popover>(".ui5-shellbar-overflow-popover")!;
	}

	_getMenuPopover() {
		return this.shadowRoot!.querySelector<Popover>(".ui5-shellbar-menu-popover")!;
	}

	isIconHidden(name: string) {
		const itemInfo = this._itemsInfo.find(item => item.icon === name);

		if (!itemInfo) {
			return false;
		}

		return itemInfo.classes.indexOf("ui5-shellbar-hidden-button") !== -1;
	}

	get hasMatchingContent() {
		if (this._observableContent.length !== this.contentItems.length) {
			return false;
		}

		const observableContentSet = new WeakSet(this._observableContent);
		return this.contentItems.every(item => observableContentSet.has(item));
	}

	get contentItemsSorted() {
		return this.contentItems.toReversed().sort((a, b) => {
			return parseInt(a.getAttribute("data-hide-order") || "0") - parseInt(b.getAttribute("data-hide-order") || "0");
		});
	}

	get contentItemsWrappersSorted() {
		return this.contentItemsSorted.map(item => this.shadowRoot!.querySelector<HTMLElement>(`#${item.slot}`)).filter(item => item !== null);
	}

	get autoSearchField() {
		const onFocus = document.activeElement === this.searchField[0];
		const hasValue = this.searchField[0]?.value?.length > 0;
		const disableSearchCollapse = this.disableSearchCollapse || onFocus || hasValue;
		if (disableSearchCollapse) {
			return false;
		}
		return this.showSearchField || this._autoRestoreSearchField;
	}

	get startContentInfoSorted() {
		return this._contentInfo
			.filter(item => this.startContent.find(contentItem => contentItem.slot === item.id))
			.sort((a, b) => a.hideOrder - b.hideOrder);
	}

	get endContentInfoSorted() {
		return this._contentInfo
			.filter(item => this.endContent.find(contentItem => contentItem.slot === item.id))
			.sort((a, b) => a.hideOrder - b.hideOrder);
	}

	get showStartSeparator(): boolean {
		return this.startContentInfoSorted.some(item => !item.classes.includes("ui5-shellbar-hidden-button"));
	}

	get showEndSeparator(): boolean {
		return this.endContentInfoSorted.some(item => !item.classes.includes("ui5-shellbar-hidden-button"));
	}

	shouldIncludeSeparator(itemInfo: IShellBarContentItem | undefined, contentInfo: IShellBarContentItem[]) {
		// once the last item from the start/end content was hidden, the
		// separator is "packed" with it in order to account for any next measurements
		if (!itemInfo) {
			return false;
		}
		const lastVisibleItem = contentInfo.at(-1);
		return lastVisibleItem?.id === itemInfo.id && itemInfo.classes.indexOf("ui5-shellbar-hidden-button") > -1;
	}

	get classes(): ClassMap {
		return {
			wrapper: {
				"ui5-shellbar-root": true,
				"ui5-shellbar-with-searchfield": this.hasSearchField,
			},
			button: {
				"ui5-shellbar-menu-button--interactive": this.hasMenuItems,
			},
			notification: {
				"ui5-shellbar-hidden-button": this.isIconHidden("bell"),
			},
			search: {
				"ui5-shellbar-hidden-button": this.isIconHidden("search"),
				"ui5-shellbar-search-toggle": true,
			},
			overflow: {
				"ui5-shellbar-hidden-button": this._hiddenIcons.length === 0,
			},
			assistant: {
				"ui5-shellbar-hidden-button": this.isIconHidden("assistant"),
				"ui5-shellbar-assistant-button": true,
			},
			searchField: {
				"ui5-shellbar-search-field": this.showSearchField,
				"ui5-shellbar-search-toggle": isSelfCollapsibleSearch(this.search),
				"ui5-shellbar-hidden-button": !this.showSearchField,
			},
		};
	}

	get styles() {
		const styles = {
			"display": this.showSearchField ? "flex" : "none",
		};
		return {
			searchField: isSelfCollapsibleSearch(this.search) ? {} : styles,
		};
	}

	get customItemsInfo() {
		return this._itemsInfo.filter(itemInfo => !!itemInfo.custom);
	}

	get hasLogo() {
		return !!this.logo.length;
	}

	get showLogoInMenuButton() {
		return this.hasLogo && (this.breakpointSize === "S");
	}

	get showTitleInMenuButton() {
		return this.primaryTitle && !(this.showLogoInMenuButton);
	}

	get showMenuButton() {
		return this.primaryTitle || this.showLogoInMenuButton;
	}

	get hasAssistant() {
		return !!this.assistant.length;
	}

	get hasBranding() {
		return !!this.branding.length;
	}

	get hasSearchField() {
		return !!this.searchField.length;
	}

	get hasMidContent() {
		return !!this.midContent.length;
	}

	get hasProfile() {
		return !!this.profile.length;
	}

	get hasMenuItems() {
		return this.menuItems.length > 0;
	}

	get imageBtnText() {
		return getEffectiveAriaLabelText(this) || ShellBar.i18nBundle.getText(SHELLBAR_IMAGE_BTN);
	}

	get _shellbarText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_LABEL);
	}

	get _logoText() {
		return this.accessibilityAttributes.logo?.name || ShellBar.i18nBundle.getText(SHELLBAR_LOGO);
	}

	get _notificationsText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_NOTIFICATIONS, this.notificationsCount || 0);
	}

	get _cancelBtnText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_CANCEL);
	}

	get _logoAreaText() {
		const primaryTitle = this.primaryTitle ?? "";
		const secondaryTitle = this.secondaryTitle ?? "";

		return ShellBar.i18nBundle.getText(SHELLBAR_LOGO_AREA, primaryTitle, secondaryTitle);
	}

	get _contentItemsText() {
		return this._enableContentAreaAccessibility ? ShellBar.i18nBundle.getText(SHELLBAR_ADDITIONAL_CONTEXT) : undefined;
	}

	get _searchFieldDescription() {
		return ShellBar.i18nBundle.getText(SHELLBAR_SEARCHFIELD_DESCRIPTION);
	}

	get _contentItemsRole() {
		if (this._enableContentAreaAccessibility) {
			return "group";
		}
	}

	get _enableContentAreaAccessibility() {
		return this.contentItems.length > 1;
	}

	get contentItems() {
		return [...this.startContent, ...this.endContent];
	}

	get startContent() {
		// all items before the first spacer
		const spacerIndex = this.content.findIndex(child => child.hasAttribute("ui5-shellbar-spacer"));
		if (spacerIndex === -1) {
			return this.content;
		}
		return this.content.slice(0, spacerIndex);
	}

	get endContent() {
		// all items after the first spacer
		const spacerIndex = this.content.findIndex(child => child.hasAttribute("ui5-shellbar-spacer"));
		if (spacerIndex === -1) {
			return [];
		}
		return this.content.slice(spacerIndex + 1);
	}

	get _rightChildRole() {
		const items = this._getRightChildItems();
		const visibleItems = items.filter(item => {
			return this._isVisible(item);
		});

		if (visibleItems.length === 1) {
			return;
		}

		return "toolbar";
	}

	get _searchFieldText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_SEARCH_FIELD);
	}

	get _searchBtnOpen() {
		return ShellBar.i18nBundle.getText(SHELLBAR_SEARCH_BTN_OPEN);
	}

	get _productSwitchBtnText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_PRODUCT_SWITCH_BTN);
	}

	get _profileText() {
		return this.accessibilityAttributes.profile?.name as string || ShellBar.i18nBundle.getText(SHELLBAR_PROFILE);
	}

	get _productsText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_PRODUCTS);
	}

	get _searchText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_SEARCH);
	}

	get _overflowText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_OVERFLOW);
	}

	get _brandingText() {
		return this.accessibilityAttributes.branding?.name || this.primaryTitle;
	}

	get hasContentItems() {
		return this.contentItems.length > 0;
	}

	get hidableDomElements(): HTMLElement[] {
		const items = Array.from(this.shadowRoot!.querySelectorAll<HTMLElement>(".ui5-shellbar-button:not(.ui5-shellbar-search-button):not(.ui5-shellbar-overflow-button):not(.ui5-shellbar-cancel-button):not(.ui5-shellbar-no-overflow-button)"));
		const assistant = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-assistant-button");
		const searchToggle = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-search-toggle");
		const contentItems = this.contentItemsWrappersSorted;
		const firstContentItem = contentItems.pop();
		const prioritizeContent = this.showSearchField && this.hasSearchField;

		// order here is important for the responsive behavior, the items will be
		// measured and hidden in the order they are returned until no overlap is detected
		let itemsToHide = [];

		if (prioritizeContent) {
			// search field was toggled, the content items should make space for it
			const overflowItems = [...items, assistant];
			const visibleItems = overflowItems.filter(item => item && !item.classList.contains("ui5-shellbar-hidden-button"));
			const hiddenItems = overflowItems.filter(item => item && item.classList.contains("ui5-shellbar-hidden-button"));
			itemsToHide = [
				...hiddenItems,
				...contentItems,
				firstContentItem,
				...visibleItems,
			];
		} else {
			// search field is close, actions should go to the overflow first
			itemsToHide = [
				...items.toReversed(),
				assistant,
				...contentItems,
				searchToggle,
				firstContentItem,
			];
		}
		return itemsToHide.filter(Boolean) as HTMLElement[];
	}

	get contentItemsHidden() {
		return this.contentItemsWrappersSorted.filter(item => item.classList.contains("ui5-shellbar-hidden-button"));
	}

	get overflowWrapper(): HTMLElement | null {
		return this.shadowRoot!.querySelector(".ui5-shellbar-overflow-container-right");
	}

	get overflowInner(): HTMLElement | null {
		return this.shadowRoot!.querySelector(".ui5-shellbar-overflow-container-right-inner");
	}

	get overflowed() {
		const wrapper = this.overflowWrapper;
		const inner = this.overflowInner;
		if (!wrapper || !inner) {
			return false;
		}
		return inner.offsetWidth > wrapper.offsetWidth;
	}

	get accInfo() {
		const overflowExpanded = this.accessibilityAttributes.overflow?.expanded;

		return {
			notifications: {
				"title": this._notificationsText,
				"accessibilityAttributes": {
					expanded: this.accessibilityAttributes.notifications?.expanded,
					hasPopup: this.accessibilityAttributes.notifications?.hasPopup,
				},
			},
			profile: {
				"title": this._profileText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.profile?.hasPopup,
					expanded: this.accessibilityAttributes.profile?.expanded,
				},
			},
			products: {
				"title": this._productsText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.product?.hasPopup,
					expanded: this.accessibilityAttributes.product?.expanded,
				},
			},
			search: {
				"title": this._searchText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.search?.hasPopup,
				},
			},
			overflow: {
				"title": this._overflowText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.overflow?.hasPopup || "menu" as const,
					expanded: overflowExpanded === undefined ? this._overflowPopoverExpanded : overflowExpanded,
				},
			},
			branding: {
				"title": this._brandingText,
				"accessibilityAttributes": {
					name: this.accessibilityAttributes.branding?.name,
				},
			},
		};
	}

	get accLogoRole() {
		return this.accessibilityAttributes.logo?.role || "link";
	}

	get isSBreakPoint() {
		return this.breakpointSize === "S";
	}

	get hasSelfCollapsibleSearch() {
		return isSelfCollapsibleSearch(this.search);
	}

	get search() {
		return this.searchField.length ? this.searchField[0] : null;
	}
}

interface IShellBarSelfCollapsibleSearch extends UI5Element {
	collapsed: boolean;
	open: boolean;
}

const isSelfCollapsibleSearch = (searchField: any): searchField is IShellBarSelfCollapsibleSearch => {
	if (searchField) {
		return "collapsed" in searchField && "open" in searchField;
	}
	return false;
};

ShellBar.define();

export default ShellBar;

export type {
	ShellBarContentItemVisibilityChangeEventDetail,
	ShellBarNotificationsClickEventDetail,
	ShellBarProfileClickEventDetail,
	ShellBarProductSwitchClickEventDetail,
	ShellBarLogoClickEventDetail,
	ShellBarMenuItemClickEventDetail,
	ShellBarAccessibilityAttributes,
	ShellBarSearchButtonEventDetail,
	ShellBarSearchFieldToggleEventDetail,
	ShellBarSearchFieldClearEventDetail,
	IShellBarSelfCollapsibleSearch,
	IShellBarSearchField,
};
