import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isDesktop,
} from "@ui5/webcomponents-base/dist/Device.js";
import type { ListItemClickEventDetail } from "./List.js";
import Menu from "./Menu.js";
import type { MenuItemClickEventDetail } from "./Menu.js";
import StandardListItem from "./StandardListItem.js";
import MenuItem from "./MenuItem.js";
import NavigationMenuItem from "./NavigationMenuItem.js";
import staticAreaMenuTemplate from "./generated/templates/NavigationMenuTemplate.lit.js";

// Styles
import staticAreaNavigationMenuCss from "./generated/themes/NavigationMenu.css.js";
import staticAreaMenuCss from "./generated/themes/Menu.css.js";

import {
	NAVIGATION_MENU_POPOVER_HIDDEN_TEXT,
} from "./generated/i18n/i18n-defaults.js";

type OpenerStandardListItem = StandardListItem & { associatedItem: MenuItem };

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-navigation-menu` component represents a hierarchical menu structure, inherits all the functionality of `ui5-menu`.
 *
 * ### Usage
 *
 * `ui5-navigation-menu` contains `ui5-navigation-menu-item` components.
 * An arbitrary hierarchy structure can be represented by recursively nesting navigation menu items.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/NavigationMenu.js";`
 * @constructor
 * @extends Menu
 * @since 1.22.0
 * @private
 */
@customElement({
	tag: "ui5-navigation-menu",
	renderer: litRender,
	staticAreaStyles: [staticAreaMenuCss, staticAreaNavigationMenuCss],
	staticAreaTemplate: staticAreaMenuTemplate,
	dependencies: [
		NavigationMenuItem,
	],
})

class NavigationMenu extends Menu {
	/**
	 * Defines the items of this component.
	 *
	 * **Note:** Use `ui5-navigation-menu-item` for the intended design.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	declare items: Array<NavigationMenuItem>;

	_isMenu(element: HTMLElement) {
		return element.hasAttribute("ui5-navigation-menu");
	}

	_itemMouseOver(e: MouseEvent) {
		let opener;
		if (isDesktop()) {
			// respect mouseover only on desktop
			opener = e.target as OpenerStandardListItem;

			// If the opener is a ui5-icon inside a Navigation item, we need to get the Navigation Item
			if (opener?.hasAttribute("ui5-icon") && opener.parentElement) {
				opener = opener.parentElement;
			}

			let item = (opener as OpenerStandardListItem).associatedItem;

			if (!item) {
				// for nested <a>
				const test = opener.parentElement as any;
				if (opener.parentElement) {
					item = test.associatedItem;
				}
			}

			// The opener should be the navigation list item, not the anchor inside it
			if (opener?.hasAttribute("target")) {
				opener = opener.parentElement;
			}

			// Opens submenu with 300ms delay
			if (item && opener) {
				this._startOpenTimeout(item, opener);
			}
		}
	}

	_clonedItemsFragment(item: MenuItem) {
		const fragment = document.createDocumentFragment();

		for (let i = 0; i < item.items.length; ++i) {
			const subItem = item.items[i] as any;

			const clonedItem = item.items[i].cloneNode(true) as any;
			if (subItem.associatedItem) {
				clonedItem.associatedItem = subItem.associatedItem;
			}
			fragment.appendChild(clonedItem);
		}

		return fragment;
	}

	_itemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const opener = e.detail.item as OpenerStandardListItem;
		const item = opener.associatedItem;
		const mainMenu = this._findMainMenu(item);
		const prevented = !mainMenu.fireEvent<MenuItemClickEventDetail>("item-click", {
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
				openerMenuItem = parentMenu._parentMenuItem as MenuItem;
			} while (parentMenu._parentMenuItem);

			mainMenu._popover!.close();
		}

		this._prepareSubMenu(item, opener);
	}

	get accSideNavigationPopoverHiddenText() {
		return NavigationMenu.i18nBundle.getText(NAVIGATION_MENU_POPOVER_HIDDEN_TEXT);
	}
}

NavigationMenu.define();

export default NavigationMenu;
