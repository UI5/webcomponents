import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import DOMReference from "@ui5/webcomponents-base/dist/types/DOMReference.js";
import {
	isLeft,
	isRight,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import {
	isPhone,
	isDesktop,
} from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type { ResponsivePopoverBeforeCloseEventDetail } from "./ResponsivePopover.js";
import Button from "./Button.js";
import List from "./List.js";
import MenuListItem from "./MenuListItem.js";
import StandardListItem from "./StandardListItem.js";
import Icon from "./Icon.js";
import BusyIndicator from "./BusyIndicator.js";
import type MenuItem from "./MenuItem.js";
import type { ListItemClickEventDetail } from "./List.js";
import staticAreaMenuTemplate from "./generated/templates/MenuTemplate.lit.js";
import {
	MENU_BACK_BUTTON_ARIA_LABEL,
	MENU_CLOSE_BUTTON_ARIA_LABEL,
	MENU_POPOVER_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";

// Styles
import staticAreaMenuCss from "./generated/themes/Menu.css.js";

type CurrentItem = {
	item: MenuItem,
	position: number,
	ariaHasPopup: string | undefined,
}

const MENU_OPEN_DELAY = 300;
const MENU_CLOSE_DELAY = 400;

type MenuItemClickEventDetail = {
	item: MenuItem,
	text: string,
}

type MenuBeforeOpenEventDetail = { item?: MenuItem };
type MenuBeforeCloseEventDetail = { escPressed: boolean };

type MenuItemFocusEventDetail = {
	ref: HTMLElement,
	item: MenuItem,
};

type OpenerStandardListItem = StandardListItem & { associatedItem: MenuItem };

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu` component represents a hierarchical menu structure.
 *
 * ### Usage
 *
 * `ui5-menu` contains `ui5-menu-item` components.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Keyboard Handling
 *
 * The `ui5-menu` provides advanced keyboard handling.
 * The user can use the following keyboard shortcuts in order to navigate trough the tree:
 *
 * - `Arrow Up` / `Arrow Down` - Navigates up and down the menu items that are currently visible.
 * - `Arrow Right`, `Space` or `Enter` - Opens a sub-menu if there are menu items nested
 * in the currently clicked menu item.
 * - `Arrow Left` or `Escape` - Closes the currently opened sub-menu.
 *
 * Note: if the text ditrection is set to Right-to-left (RTL), `Arrow Right` and `Arrow Left` functionality is swapped.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Menu.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.3.0
 * @public
 */
@customElement({
	tag: "ui5-menu",
	renderer: litRender,
	staticAreaStyles: staticAreaMenuCss,
	staticAreaTemplate: staticAreaMenuTemplate,
	dependencies: [
		ResponsivePopover,
		Button,
		List,
		StandardListItem,
		MenuListItem,
		Icon,
		BusyIndicator,
	],
})

/**
 * Fired when an item is being clicked.
 *
 * **Note:** Since 1.17.0 the event is preventable, allowing the menu to remain open after an item is pressed.
 * @allowPreventDefault
 * @param { HTMLElement } item The currently clicked menu item.
 * @param { string } text The text of the currently clicked menu item.
 * @public
 */
@event<MenuItemClickEventDetail>("item-click", {
	detail: {
		/**
		 * @public
		 */
		item: {
			type: HTMLElement,
		},
		/**
		 * @public
		 */
		text: {
			type: String,
		},
	},
})

/**
 * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening. **This event does not bubble.**
 *
 * **Note:** Since 1.14.0 the event is also fired before a sub-menu opens.
 * @public
 * @allowPreventDefault
 * @since 1.10.0
 * @param { HTMLElement } item The `ui5-menu-item` that triggers opening of the sub-menu or undefined when fired upon root menu opening.
 */
@event<MenuBeforeOpenEventDetail>("before-open", {
	detail: {
		/**
		 * @public
		 * @since 1.14.0
		 */
		item: {
			type: HTMLElement,
		},
	},
})

/**
 * Fired after the menu is opened. **This event does not bubble.**
 * @public
 * @since 1.10.0
 */
@event("after-open")

/**
 * Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing. **This event does not bubble.**
 * @public
 * @allowPreventDefault
 * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
 * @since 1.10.0
 */
@event<MenuBeforeCloseEventDetail>("before-close", {
	detail: {
		/**
		 * @public
		 */
		escPressed: {
			type: Boolean,
		},
	},
})

/**
 * Fired after the menu is closed. **This event does not bubble.**
 * @public
 * @since 1.10.0
 */
@event("after-close")

/**
 * Fired when a menu item receives focus.
 *
 * @public
 * @param { HTMLElement } ref The currently focused element representing a <code>ui5-menu-item</code>.
 * @param { HTMLElement } item The <code>ui5-menu-item</code> represented by the focused element.
 * @since 1.23.1
 */
@event<MenuItemFocusEventDetail>("item-focus", {
	detail: {
		/**
		 * @public
		 */
		ref: {
			type: HTMLElement,
		},
		/**
		 * @public
		 */
		item: {
			type: HTMLElement,
		},
	},
})

class Menu extends UI5Element {
	/**
	 * Defines the header text of the menu (displayed on mobile).
	 * @default ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Indicates if the menu is open
	 * @public
	 * @default false
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	open!:boolean;

	/**
	 * Defines if a loading indicator would be displayed inside the corresponding ui5-menu popover.
	 * @default false
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Boolean })
	busy!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will be displayed inside the corresponding ui5-menu popover..
	 * @default 1000
	 * @public
	 * @since 1.13.0
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	busyDelay!: number;

	/**
	 * Defines the ID or DOM Reference of the element that the menu is shown at
	 * @public
	 * @default ""
	 * @since 1.10.0
	 */
	@property({ validator: DOMReference, defaultValue: "" })
	opener!: HTMLElement | string;

	/**
	 * Defines if the menu is sub-menu (not first-level).
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isSubMenu!: boolean;

	/**
	 * Stores id of a list item that opened sub-menu.
	 * @private
	 */
	@property()
	_subMenuOpenerId!: string;

	/**
	 * Defines the currently available menu items.
	 * (in case of non-phone devices these are the items of the menu,
	 * but for phone devices the items of the currently opened sub-menu
	 * will be populated here)
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_currentItems!: Array<CurrentItem>;

	/**
	 * Stores the ResponsivePopover instance
	 */
	@property({ type: Object, defaultValue: undefined })
	_popover?: ResponsivePopover;

	/**
	 * Stores parent menu item (if there is such).
	 */
	@property({ type: Object, defaultValue: undefined })
	_parentMenuItem?: MenuItem;

	/**
	 * Stores parent menu item DOM representation (if there is such).
	 */
	@property({ type: Object, defaultValue: undefined })
	_opener?: HTMLElement;

	/**
	 * Stores menu item that have sub-menu opened.
	 */
	@property({ type: Object, defaultValue: undefined })
	_openedSubMenuItem?: MenuItem;

	/**
	 * Defines the items of this component.
	 *
	 * **Note:** Use `ui5-menu-item` for the intended design.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<MenuItem>;

	static i18nBundle: I18nBundle;
	_timeout?: Timeout;

	static async onDefine() {
		Menu.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get menuHasSubMenus() {
		return !!this.items.filter(item => item.hasSubmenu).length;
	}

	get itemsWithChildren() {
		return !!this._currentItems.filter(item => item.item.items.length).length;
	}

	get itemsWithIcon() {
		return !!this._currentItems.filter(item => item.item.icon !== "").length;
	}

	get isRtl() {
		return this.effectiveDir === "rtl";
	}

	get placementType() {
		const placement = this.isRtl ? "Left" : "Right";
		return this._isSubMenu ? placement : "Bottom";
	}

	get verticalAlign() {
		return this._isSubMenu ? "Top" : "Bottom";
	}

	get labelBack() {
		return Menu.i18nBundle.getText(MENU_BACK_BUTTON_ARIA_LABEL);
	}

	get labelClose() {
		return Menu.i18nBundle.getText(MENU_CLOSE_BUTTON_ARIA_LABEL);
	}

	get isPhone() {
		return isPhone();
	}

	get isSubMenuOpened() {
		return this.items.some(menuItem => menuItem.subMenuOpened);
	}

	get menuHeaderTextPhone() {
		const parentMenuItem = this._getParentMenuItem(this);
		return parentMenuItem ? parentMenuItem.text : this.headerText;
	}

	get acessibleNameText() {
		return Menu.i18nBundle.getText(MENU_POPOVER_ACCESSIBLE_NAME);
	}

	onBeforeRendering() {
		this._prepareCurrentItems(this.items);

		const itemsWithChildren = this.itemsWithChildren;
		const itemsWithIcon = this.itemsWithIcon;

		this._currentItems.forEach(item => {
			const menuItem = item.item;
			menuItem._siblingsWithChildren = itemsWithChildren;
			menuItem._siblingsWithIcon = itemsWithIcon;

			const subMenu = this._isSubMenu ? this._getSubmenuReference(menuItem) : menuItem._subMenu;

			if (subMenu) {
				subMenu.innerHTML = "";
				const fragment = this._clonedItemsFragment(menuItem);
				subMenu.appendChild(fragment);
				subMenu.busy = menuItem.busy;
				subMenu.busyDelay = menuItem.busyDelay;
			}
		});
	}

	onAfterRendering() {
		if (!this.opener) {
			return;
		}

		if (this.open) {
			const opener = this.getOpener();
			if (opener && !this.isSubMenuOpened) {
				this.showAt(opener);
			}
		} else {
			this.close();
		}
	}

	/**
	 * Shows the Menu near the opener element.
	 * @param opener the element that the popover is shown at
	 * @public
	 */
	async showAt(opener: HTMLElement): Promise<void> {
		let parentMenuItem = this._getParentMenuItem(this);

		if (!this._isSubMenu) {
			parentMenuItem = undefined;
			this._opener = undefined;
		}
		const busyWithoutItems = !parentMenuItem?.items.length && parentMenuItem?.busy;
		const popover = await this._createPopover();
		popover.initialFocus = `${this._id}-menu-item-0`;
		popover.showAt(opener, busyWithoutItems);
	}

	/**
	 * Closes the Menu.
	 * @public
	 */
	close(): void {
		this._popover?.close(false, false, true);
	}

	async _createPopover() {
		if (!this._popover) {
			const staticAreaItemDomRef = await this.getStaticAreaItemDomRef();
			this._popover = staticAreaItemDomRef!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
		}
		return this._popover;
	}

	getOpener() {
		const rootNode = this.getRootNode() as Document;
		return this.opener instanceof HTMLElement ? this.opener : rootNode?.getElementById?.(this.opener);
	}

	_navigateBack() {
		const parentMenuItem = this._getParentMenuItem(this);
		if (parentMenuItem) {
			this._closeItemSubMenu(parentMenuItem, true);
		}
	}

	_closeAll() {
		let menu = this as Menu,
			parentMenuItem;

		do {
			if (menu) {
				menu.close();
				parentMenuItem = menu._getParentMenuItem(menu);
			}
			menu = parentMenuItem ? parentMenuItem.parentElement as Menu : menu;
		} while (parentMenuItem);
	}

	_prepareCurrentItems(items: Array<MenuItem>) {
		this._currentItems = items.map((item, index) => {
			return {
				item,
				position: index + 1,
				ariaHasPopup: item.hasSubmenu ? "menu" : undefined,
			};
		});
	}

	_createSubMenu(item: MenuItem, opener: HTMLElement) {
		let subMenu = item._subMenu;
		let subMenuRef = this._getSubmenuReference(item);

		if ((!subMenu && !this._isSubMenu) || (!subMenuRef && this._isSubMenu)) {
			subMenu = document.createElement(this.tagName.toLowerCase()) as Menu;
			subMenu._isSubMenu = true;
			subMenu.setAttribute("id", `submenu-${opener.id}`);
			subMenu._parentMenuItem = item;
			subMenu._opener = opener;
			subMenu.busy = item.busy;
			subMenu.busyDelay = item.busyDelay;
			const fragment = this._clonedItemsFragment(item);
			subMenu.appendChild(fragment);
			this.staticAreaItem!.shadowRoot!.querySelector(".ui5-menu-submenus")!.appendChild(subMenu);
			subMenuRef = subMenu;
		}

		item._subMenu = this._isSubMenu ? subMenuRef : subMenu;
	}

	_getSubmenuReference(item: MenuItem) {
		const index = (item.parentElement as Menu)?.items.indexOf(item);
		return this.staticAreaItem
			? this.staticAreaItem.shadowRoot!.querySelector(`.ui5-menu-submenus > ui5-menu[id$=menu-item-${index}]`) as Menu
			: undefined;
	}

	_clonedItemsFragment(item: MenuItem) {
		const fragment = document.createDocumentFragment();

		for (let i = 0; i < item.items.length; ++i) {
			const clonedItem = item.items[i].cloneNode(true);
			fragment.appendChild(clonedItem);
		}

		return fragment;
	}

	async _openItemSubMenu(item: MenuItem, opener: HTMLElement) {
		const mainMenu = this._findMainMenu(item);
		mainMenu?.fireEvent<MenuBeforeOpenEventDetail>("before-open", {
			item,
		}, false, false);
		await item._subMenu!.showAt(opener);
		item._preventSubMenuClose = true;
		this._openedSubMenuItem = item;
		this._subMenuOpenerId = opener.id;
	}

	_closeItemSubMenu(item: MenuItem, forceClose = false, keyboard = false) {
		if (item) {
			const subMenu = item._subMenu
				? item._subMenu
				: (item.parentElement as Menu)?._getSubmenuReference(item);
			if (forceClose) {
				item._preventSubMenuClose = false;
				this._closeSubMenuPopover(subMenu!, forceClose, keyboard);
			} else {
				setTimeout(() => this._closeSubMenuPopover(subMenu!), 0);
			}
		}
	}

	_closeSubMenuPopover(subMenu: Menu, forceClose = false, keyboard = false) {
		if (subMenu) {
			const parentItem = subMenu._getParentMenuItem(subMenu)!;

			if (forceClose || !parentItem._preventSubMenuClose) {
				subMenu.close();
				if (keyboard) {
					subMenu._opener?.focus();
				}
				this._openedSubMenuItem = undefined;
				this._subMenuOpenerId = "";
			}
		}
	}

	async _prepareSubMenu(item: MenuItem, opener: HTMLElement) {
		const menuItem = item.parentElement ? item : (opener as OpenerStandardListItem).associatedItem;
		const parentMenuItem = this._getParentMenuItem(menuItem);

		if (opener.id !== this._subMenuOpenerId || (menuItem && menuItem.hasSubmenu)) {
			// close opened sub-menu if there is any opened
			this._closeItemSubMenu(this._openedSubMenuItem!, true);
		}
		if (menuItem && menuItem.hasSubmenu) {
			// create new sub-menu
			this._createSubMenu(menuItem, opener);
			await this._openItemSubMenu(menuItem, opener);
		}
		if (parentMenuItem) {
			parentMenuItem._preventSubMenuClose = true;
		}
	}

	_onfocusin(e: FocusEvent): void {
		const target = e.target as HTMLElement;
		const menuListItem = target.hasAttribute("ui5-menu-li")
			? target as MenuListItem
			: (target.getRootNode() as ShadowRoot).host as MenuListItem;
		const item = menuListItem.associatedItem;
		const mainMenu = this._findMainMenu(item);
		mainMenu?.fireEvent<MenuItemFocusEventDetail>("item-focus", { ref: menuListItem, item });
	}

	_startOpenTimeout(item: MenuItem, opener: HTMLElement) {
		clearTimeout(this._timeout);

		// Sets the new timeout
		this._timeout = setTimeout(() => {
			this._prepareSubMenu(item, opener);
		}, MENU_OPEN_DELAY);
	}

	_startCloseTimeout(item: MenuItem) {
		clearTimeout(this._timeout);

		// Sets the new timeout
		this._timeout = setTimeout(() => {
			this._closeItemSubMenu(item);
		}, MENU_CLOSE_DELAY);
	}

	_itemMouseOver(e: MouseEvent) {
		if (isDesktop()) {
			// respect mouseover only on desktop
			const opener = e.target as OpenerStandardListItem;
			const item = opener.associatedItem;

			opener.focus();

			// Opens submenu with 300ms delay
			this._startOpenTimeout(item, opener);
		}
	}

	_busyMouseOver() {
		const parentMenuItem = this._getParentMenuItem(this);
		if (parentMenuItem) {
			parentMenuItem._preventSubMenuClose = true;
		}
	}

	_itemMouseOut(e: MouseEvent) {
		if (isDesktop()) {
			const opener = e.currentTarget as OpenerStandardListItem;
			const item = opener.associatedItem;

			clearTimeout(this._timeout);

			// Close submenu with 400ms delay
			const subMenu = this._getSubmenuReference(item);

			if (item && item.hasSubmenu && subMenu) {
				// try to close the sub-menu
				item._preventSubMenuClose = false;
				this._startCloseTimeout(item);
			}
		}
	}

	_itemKeyDown(e: KeyboardEvent) {
		const shouldCloseMenu = this.isRtl ? isRight(e) : isLeft(e);
		const shouldOpenMenu = this.isRtl ? isLeft(e) : isRight(e);
		const opener = e.target as OpenerStandardListItem;
		const item = opener.associatedItem;
		const parentMenuItem = this._getParentMenuItem(item);

		if (isEnter(e)) {
			e.preventDefault();
		}
		if (shouldOpenMenu) {
			item.hasSubmenu && this._prepareSubMenu(item, opener);
		} else if (shouldCloseMenu && this._isSubMenu && parentMenuItem) {
			const parentMenuItemMenu = parentMenuItem.parentElement as Menu;
			parentMenuItemMenu?._closeItemSubMenu(parentMenuItem, true, true);
		}
	}

	_itemClick(e: CustomEvent<ListItemClickEventDetail>) {
		clearTimeout(this._timeout);
		const opener = e.detail.item as OpenerStandardListItem;
		const item = opener.associatedItem;

		if (!item.hasSubmenu) {
			// click on an item that doesn't have sub-items fires an "item-click" event
			if (!this._isSubMenu) {
				// fire event if the click is on top-level menu item
				const prevented = !this.fireEvent<MenuItemClickEventDetail>("item-click", {
					"item": item,
					"text": item.text,
				}, true, false);

				if (!prevented) {
					this._popover!.close();
				}
			} else {
				const mainMenu = this._findMainMenu(item);
				const prevented = !mainMenu?.fireEvent<MenuItemClickEventDetail>("item-click", {
					"item": item,
					"text": item.text,
				}, true, false);

				if (!prevented) {
					let openerMenuItem = item;
					let parentMenu = openerMenuItem.parentElement as Menu;
					do {
						openerMenuItem._preventSubMenuClose = false;
						this._closeItemSubMenu(openerMenuItem);
						parentMenu = openerMenuItem.parentElement as Menu;
						openerMenuItem = parentMenu._getParentMenuItem(parentMenu) as MenuItem;
					} while (parentMenu._getParentMenuItem(parentMenu));

					mainMenu._popover!.close();
				}
			}
		} else {
			this._prepareSubMenu(item, opener);
		}
	}

	_findMainMenu(element: MenuItem | Menu) {
		let menu = this._isMenu(element) ? element as Menu : element.parentElement as Menu,
			parentMenuItem;

		do {
			parentMenuItem = this._getParentMenuItem(menu);
			menu = parentMenuItem ? parentMenuItem.parentElement as Menu : menu;
		} while (parentMenuItem);

		return menu;
	}

	_isMenu(element: HTMLElement) {
		return element?.hasAttribute("ui5-menu");
	}

	_getParentMenuItem(element: MenuItem | Menu) {
		if (!element) {
			return;
		}
		const menu = this._isMenu(element) ? element as Menu : element.parentElement as Menu;
		return !menu._parentMenuItem || menu._parentMenuItem.parentElement
			? menu._parentMenuItem
			: (menu._opener as MenuListItem)?.associatedItem;
	}

	_beforePopoverOpen(e: CustomEvent) {
		const prevented = !this.fireEvent<MenuBeforeOpenEventDetail>("before-open", {}, true, false);

		if (prevented) {
			this.open = false;
			e.preventDefault();
		}
	}

	_afterPopoverOpen() {
		this.open = true;
		this.fireEvent("after-open", {}, false, false);
	}

	_beforePopoverClose(e: CustomEvent<ResponsivePopoverBeforeCloseEventDetail>) {
		const prevented = !this.fireEvent<MenuBeforeCloseEventDetail>("before-close", { escPressed: e.detail.escPressed }, true, false);

		if (prevented) {
			this.open = true;
			e.preventDefault();
			return;
		}

		if (this._openedSubMenuItem) {
			this._openedSubMenuItem._preventSubMenuClose = false;
			this._closeItemSubMenu(this._openedSubMenuItem);
		}
	}

	_afterPopoverClose() {
		this.open = false;
		this.fireEvent("after-close", {}, false, false);
	}
}

Menu.define();

export default Menu;
export type {
	MenuItemClickEventDetail,
	MenuBeforeCloseEventDetail,
	MenuBeforeOpenEventDetail,
	MenuItemFocusEventDetail,
};
