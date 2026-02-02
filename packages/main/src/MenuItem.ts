import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { AccessibilityAttributes, AriaHasPopup, AriaRole } from "@ui5/webcomponents-base";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import {
	isLeft,
	isRight,
	isEnter,
	isSpace,
	isEnterShift,
	isSpaceShift,
	isShift,
	isTabNext,
	isTabPrevious,
	isDown,
	isUp,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import MenuItemGroupCheckMode from "./types/MenuItemGroupCheckMode.js";
import type { ListItemAccessibilityAttributes } from "./ListItem.js";
import type List from "./List.js";
import ListItem from "./ListItem.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import { isInstanceOfMenuSeparator } from "./MenuSeparator.js";
import { isInstanceOfMenuItemGroup } from "./MenuItemGroup.js";
import MenuItemTemplate from "./MenuItemTemplate.js";
import {
	MENU_BACK_BUTTON_ARIA_LABEL,
	MENU_CANCEL_BUTTON_TEXT,
	MENU_POPOVER_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";
import type { IMenuItem } from "./Menu.js";

// Styles
import menuItemCss from "./generated/themes/MenuItem.css.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";

type MenuBeforeOpenEventDetail = { item?: MenuItem };
type MenuBeforeCloseEventDetail = { escPressed: boolean };

type MenuNavigateOutOfEndContentEventDetail = { shouldNavigateToNextItem: boolean };

type MenuItemAccessibilityAttributes = Pick<AccessibilityAttributes, "ariaKeyShortcuts" | "role"> & ListItemAccessibilityAttributes;

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu-item` is the item to use inside a `ui5-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Usage
 *
 * `ui5-menu-item` represents a node in a `ui5-menu`. The menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a list item in that list. Therefore, you should only use
 * `ui5-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItem.js";`
 * @constructor
 * @extends ListItem
 * @implements {IMenuItem}
 * @since 1.3.0
 * @public
 */
@customElement({
	tag: "ui5-menu-item",
	renderer: jsxRenderer,
	template: MenuItemTemplate,
	styles: [ListItem.styles, menuItemCss],
})

/**
 * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening.
 *
 * **Note:** Since 1.14.0 the event is also fired before a sub-menu opens.
 * @public
 * @since 1.10.0
 * @param { HTMLElement } item The menu item that triggers opening of the sub-menu or undefined when fired upon root menu opening.
 */
@event("before-open", {
	cancelable: true,
})

/**
 * Fired after the menu is opened.
 * @public
 */
@event("open")

/**
 * Fired when the menu is being closed.
 * @private
 */
@event("close-menu", {
	bubbles: true,
})

/**
 * Fired when navigating out of end-content.
 * @private
 */
@event("exit-end-content", {
	bubbles: true,
})

/**
 * Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing.
 * @public
 * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
 * @since 1.10.0
 */
@event("before-close", {
	cancelable: true,
})

/**
 * Fired after the menu is closed.
 * @public
 * @since 1.10.0
 */
@event("close")

/**
 * Fired when an item is checked or unchecked.
 * @public
 * @since 2.12.0
 */
@event("check", {
	bubbles: true,
})
class MenuItem extends ListItem implements IMenuItem {
	eventDetails!: ListItem["eventDetails"] & {
		"before-open": MenuBeforeOpenEventDetail
		"open": void
		"before-close": MenuBeforeCloseEventDetail
		"close": void
		"close-menu": void
		"check": void
		"exit-end-content": MenuNavigateOutOfEndContentEventDetail
	}

	/**
	 * Defines the text of the tree item.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the `additionalText`, displayed in the end of the menu item.
	 *
	 * **Note:** The additional text will not be displayed if there are items added in `items` slot or there are
	 * components added to `endContent` slot.
	 *
	 * The priority of what will be displayed at the end of the menu item is as follows:
	 * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
	 * @default undefined
	 * @public
	 * @since 1.8.0
	 */
	@property()
	additionalText?: string;

	/**
	 * Defines the icon to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * **Example:**
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether menu item is in disabled state.
	 *
	 * **Note:** A disabled menu item is noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding menu popover.
	 *
	 * **Note:** If set to `true` a busy indicator component will be displayed into the related one to the current menu item sub-menu popover.
	 * @default false
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding menu popover.
	 * @default 1000
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Number })
	loadingDelay = 1000;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.7.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the text of the tooltip for the menu item.
	 * @default undefined
	 * @public
	 * @since 1.23.0
	 */
	@property()
	tooltip?: string;

	/**
	 * Defines whether menu item is in checked state.
	 *
	 * **Note:** checked state is only taken into account when menu item is added to menu item group
	 * with `checkMode` other than `None`.
	 *
	 * **Note:** A checked menu item has a checkmark displayed at its end.
	 * @default false
	 * @public
	 * @since 2.12.0
	 */
	@property({ type: Boolean })
	checked = false;

	/**
	 * Defines the additional accessibility attributes that will be applied to the component.
	 * The following fields are supported:
	 *
	 * - **ariaKeyShortcuts**: Indicated the availability of a keyboard shortcuts defined for the menu item.
	 *
	 * - **role**: Defines the role of the menu item. If not set, menu item will have default role="menuitem".
	 * @public
	 * @since 2.1.0
	 * @default {}
	 */
	@property({ type: Object })
	declare accessibilityAttributes: MenuItemAccessibilityAttributes;

	/**
	 * Indicates whether any of the element siblings have icon.
	 */
	@property({ type: Boolean, noAttribute: true })
	_siblingsWithIcon = false;

	/**
	 * Defines the component's check mode.
	 * @default "None"
	 * @private
	 */
	@property()
	_checkMode: `${MenuItemGroupCheckMode}` = "None";

	/**
	 * Defines the items of this component.
	 *
	 * **Note:** The slot can hold menu item and menu separator items.
	 *
	 * If there are items added to this slot, an arrow will be displayed at the end
	 * of the item in order to indicate that there are items added. In that case components added
	 * to `endContent` slot or `additionalText` content will not be displayed.
	 *
	 * The priority of what will be displayed at the end of the menu item is as follows:
	 * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<IMenuItem>;

	/**
	 * Defines the components that should be displayed at the end of the menu item.
	 *
	 * **Note:** It is highly recommended to slot only components of type `ui5-button`,`ui5-link`
	 * or `ui5-icon` in order to preserve the intended design. If there are components added to this slot,
	 * and there is text set in `additionalText`, it will not be displayed. If there are items added to `items` slot,
	 * nether `additionalText` nor components added to this slot would be displayed.
	 *
	 * The priority of what will be displayed at the end of the menu item is as follows:
	 * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
	 *
	 * Application developers are responsible for ensuring that interactive elements placed in the `endContent` slot
	 * have the correct accessibility behaviour, including their enabled or disabled states.
	 * The menu does not manage these aspects when the menu item state changes.
	 * @public
	 * @since 2.0.0
	 */
	@slot({ type: HTMLElement })
	endContent!: Array<HTMLElement>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_itemNavigation: ItemNavigation;
	_shiftPressed: boolean = false;

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Horizontal,
			behavior: ItemNavigationBehavior.Static,
			getItemsCallback: () => this._navigableItems,
		});
	}

	get _list() {
		return this.shadowRoot && this.shadowRoot.querySelector<List>("[ui5-list]")!;
	}

	get _navigableItems(): Array<HTMLElement> {
		return [...this.endContent].filter(item => {
			return item.hasAttribute("ui5-button")
			|| item.hasAttribute("ui5-link")
			|| (item.hasAttribute("ui5-icon") && item.getAttribute("mode") === "Interactive");
		});
	}

	get _isCheckable() {
		return this._checkMode !== MenuItemGroupCheckMode.None;
	}

	_navigateToEndContent(shouldNavigateToPreviousItem: boolean) {
		const navigatableItems = this._navigableItems;
		const item = shouldNavigateToPreviousItem
			? navigatableItems[navigatableItems.length - 1]
			: navigatableItems[0];

		if (item) {
			this._itemNavigation.setCurrentItem(item);
			this._itemNavigation._focusCurrentItem();
		}
	}

	get isRtl() {
		return this.effectiveDir === "rtl";
	}

	get hasSubmenu() {
		return !!(this.items.length || this.loading) && !this.disabled;
	}

	get hasEndContent() {
		return !!(this.endContent.length);
	}

	get hasIcon() {
		return !!this.icon;
	}

	get isSubMenuOpen() {
		return this._popover?.open;
	}

	get menuHeaderTextPhone() {
		return this.text;
	}

	get isPhone() {
		return isPhone();
	}

	get labelBack() {
		return MenuItem.i18nBundle.getText(MENU_BACK_BUTTON_ARIA_LABEL);
	}

	get labelCancel() {
		return MenuItem.i18nBundle.getText(MENU_CANCEL_BUTTON_TEXT);
	}

	get accessibleNameText() {
		return MenuItem.i18nBundle.getText(MENU_POPOVER_ACCESSIBLE_NAME);
	}

	onBeforeRendering() {
		super.onBeforeRendering();

		const siblingsWithIcon = this._allMenuItems.some(menuItem => !!menuItem.icon);

		this._setupItemNavigation();

		this._allMenuItems.forEach(item => {
			item._siblingsWithIcon = siblingsWithIcon;
		});
	}

	async focus(focusOptions?: FocusOptions): Promise<void> {
		await renderFinished();

		if (this.hasSubmenu && this.isSubMenuOpen) {
			const menuItems = this._allMenuItems;
			return menuItems[0] && menuItems[0].focus(focusOptions);
		}

		return super.focus(focusOptions);
	}

	get _focusable() {
		return true;
	}

	get _role() {
		switch (this._checkMode) {
		case MenuItemGroupCheckMode.Single:
			return "menuitemradio";
		case MenuItemGroupCheckMode.Multiple:
			return "menuitemcheckbox";
		default:
			return "menuitem";
		}
	}

	get _accInfo() {
		const accInfoSettings: {
			role: AriaRole;
			ariaHaspopup?: `${AriaHasPopup}`;
			ariaKeyShortcuts?: string;
			ariaExpanded?: boolean;
			ariaHidden?: boolean;
			ariaChecked?: boolean;
		} = {
			role: this.accessibilityAttributes.role || this._role,
			ariaHaspopup: this.hasSubmenu ? "menu" : undefined,
			ariaKeyShortcuts: this.accessibilityAttributes.ariaKeyShortcuts,
			ariaExpanded: this.hasSubmenu ? this.isSubMenuOpen : undefined,
			ariaHidden: !!this.additionalText && !!this.accessibilityAttributes.ariaKeyShortcuts ? true : undefined,
			ariaChecked: this._markChecked ? true : undefined,
		};

		return { ...super._accInfo, ...accInfoSettings };
	}

	get _popover() {
		return this.shadowRoot && this.shadowRoot.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	get _markChecked() {
		return !this.hasSubmenu && this.checked && this._checkMode !== MenuItemGroupCheckMode.None;
	}

	/** Returns menu item groups */
	get _menuItemGroups() {
		return this.items.filter(isInstanceOfMenuItemGroup);
	}

	/** Returns menu items */
	get _menuItems() {
		return this.items.filter(isInstanceOfMenuItem);
	}

	/** Returns all menu items (including those in groups */
	get _allMenuItems() {
		const items: MenuItem[] = [];
		const slottedItems = this.getSlottedNodes<IMenuItem>("items");

		slottedItems.forEach(item => {
			if (isInstanceOfMenuItemGroup(item)) {
				items.push(...item._menuItems);
			} else if (!isInstanceOfMenuSeparator(item)) {
				items.push(item as MenuItem);
			}
		});

		return items;
	}

	/** Returns menu items included in the ItemNavigation */
	get _navigatableMenuItems() {
		const items: MenuItem[] = [];
		const slottedItems = this.getSlottedNodes<MenuItem>("items");

		slottedItems.forEach(item => {
			if (isInstanceOfMenuItemGroup(item)) {
				const groupItems = item.getSlottedNodes<MenuItem>("items");
				items.push(...groupItems);
			} else if (!isInstanceOfMenuSeparator(item)) {
				items.push(item);
			}
		});

		return items;
	}

	_setupItemNavigation() {
		if (this._list) {
			this._list._itemNavigation._getItems = () => this._navigatableMenuItems;
		}
	}

	_closeOtherSubMenus(item: MenuItem) {
		const menuItems = this._allMenuItems;
		if (!menuItems.includes(item)) {
			return;
		}

		menuItems.forEach(menuItem => {
			if (menuItem !== item) {
				menuItem._close();
			}
		});
	}

	_itemMouseOver(e: MouseEvent) {
		if (!isDesktop()) {
			return;
		}
		const item = e.target as MenuItem;

		if (!isInstanceOfMenuItem(item)) {
			return;
		}
		item.focus();

		this._closeOtherSubMenus(item);
	}

	_isSpace(e: KeyboardEvent) {
		this._shiftPressed = this._isCheckable && isSpaceShift(e);
		return isSpace(e) || isSpaceShift(e);
	}

	_isEnter(e: KeyboardEvent) {
		this._shiftPressed = this._isCheckable && isEnterShift(e);
		return isEnter(e) || isEnterShift(e);
	}

	_onclick(e: MouseEvent) {
		this._shiftPressed = this._isCheckable && e.shiftKey;
		super._onclick(e);
	}

	_itemKeyDown(e: KeyboardEvent) {
		const item = e.target as MenuItem;
		const itemInMenuItems = this._allMenuItems.includes(item);
		const isTabNextPrevious = isTabNext(e) || isTabPrevious(e);
		const shouldCloseMenu = this.isRtl ? isRight(e) : isLeft(e);

		if (itemInMenuItems && (isTabNextPrevious || shouldCloseMenu)) {
			this._close();
			this.focus();
			e.stopPropagation();
		}
	}

	_itemKeyUp(e: KeyboardEvent) {
		if (isShift(e)) {
			this._shiftPressed = false;
		}
	}

	_endContentKeyDown(e: KeyboardEvent) {
		const shouldNavigateOutOfEndContent = isUp(e) || isDown(e);

		if (shouldNavigateOutOfEndContent) {
			this.fireDecoratorEvent("exit-end-content", { shouldNavigateToNextItem: isDown(e) });
		}
	}

	_navigateOutOfEndContent(e: CustomEvent) {
		const item = e.target as MenuItem;
		const shouldNavigateToNextItem = e.detail.shouldNavigateToNextItem;
		const menuItems = this._allMenuItems;
		const itemIndex = menuItems.indexOf(item);

		if (itemIndex > -1) {
			const nextItem = shouldNavigateToNextItem ? menuItems[itemIndex + 1] : menuItems[itemIndex - 1];
			const itemToFocus = nextItem || menuItems[itemIndex];
			itemToFocus?.focus();

			e.stopPropagation();
		}
	}

	_closeAll() {
		if (this._popover) {
			this._popover.open = false;
		}
		this.selected = false;
		this.fireDecoratorEvent("close-menu");
	}

	_close() {
		if (this._popover) {
			this._popover.open = false;
			this._allMenuItems.forEach(item => item._close());
		}
		this.selected = false;
	}

	_beforePopoverOpen(e: CustomEvent) {
		const prevented = !this.fireDecoratorEvent("before-open", {});

		if (prevented) {
			e.preventDefault();
		}
	}

	_afterPopoverOpen() {
		this._allMenuItems[0]?.focus();
		this.fireDecoratorEvent("open");
	}

	_beforePopoverClose(e: CustomEvent) {
		const prevented = !this.fireDecoratorEvent("before-close", { escPressed: e.detail.escPressed });

		if (prevented) {
			e.preventDefault();
			return;
		}

		this.selected = false;
		if (e.detail.escPressed) {
			this.focus();
			if (isPhone()) {
				this.fireDecoratorEvent("close-menu");
			}
		}
	}

	_afterPopoverClose() {
		this.fireDecoratorEvent("close");
	}

	get isMenuItem(): boolean {
		return true;
	}

	_updateCheckedState() {
		if (this._checkMode === MenuItemGroupCheckMode.None) {
			return;
		}

		const newState = !this.checked;

		this.checked = newState;
		this.fireDecoratorEvent("check");
	}
}

MenuItem.define();

export default MenuItem;

export type {
	MenuBeforeCloseEventDetail,
	MenuBeforeOpenEventDetail,
	MenuItemAccessibilityAttributes,
};

export const isInstanceOfMenuItem = createInstanceChecker<MenuItem>("isMenuItem");
