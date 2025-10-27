import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	isDesktop,
} from "@ui5/webcomponents-base/dist/Device.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import type MenuItem from "@ui5/webcomponents/dist/MenuItem.js";
import type NavigationMenuItem from "./NavigationMenuItem.js";
import NavigationMenuTemplate from "./NavigationMenuTemplate.js";

// Styles
import navigationMenuCss from "./generated/themes/NavigationMenu.css.js";
import menuCss from "@ui5/webcomponents/dist/generated/themes/Menu.css.js";

import {
	NAVIGATION_MENU_POPOVER_HIDDEN_TEXT,
} from "./generated/i18n/i18n-defaults.js";

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
 * `import "@ui5/webcomponents-fiori/dist/NavigationMenu.js";`
 * @constructor
 * @extends Menu
 * @since 1.22.0
 * @private
 */
@customElement({
	tag: "ui5-navigation-menu",
	renderer: jsxRenderer,
	styles: [menuCss, navigationMenuCss],
	template: NavigationMenuTemplate,
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

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundleFiori: I18nBundle;

	_itemMouseOver(e: MouseEvent) {
		if (isDesktop()) {
			// respect mouseover only on desktop
			const item = e.target as MenuItem;

			// Opens submenu with 300ms delay
			this._startOpenTimeout(item);
		}
	}

	get accSideNavigationPopoverHiddenText() {
		return NavigationMenu.i18nBundleFiori.getText(NAVIGATION_MENU_POPOVER_HIDDEN_TEXT);
	}
}

NavigationMenu.define();

export default NavigationMenu;
