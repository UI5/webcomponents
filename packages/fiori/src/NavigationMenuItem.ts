import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import MenuItem from "@ui5/webcomponents/dist/MenuItem.js";
import type SideNavigationItemDesign from "./types/SideNavigationItemDesign.js";
import {
	isSpace,
	isEnter,
	isEnterShift,
	isEnterCtrl,
	isEnterAlt,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";

// Templates
import NavigationMenuItemTemplate from "./NavigationMenuItemTemplate.js";

// Styles
import navigationMenuItemCss from "./generated/themes/NavigationMenuItem.css.js";

import {
	NAVIGATION_MENU_CLOSE_BUTTON_ARIA_LABEL,
	NAVIGATION_MENU_SELECTABLE_ITEM_HIDDEN_TEXT,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-navigation-menu-item` is the item to use inside a `ui5-navigation-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting navigation menu items.
 *
 * ### Usage
 *
 * `ui5-navigation-menu-item` represents a node in a `ui5-navigation-menu`. The navigation menu itself is rendered as a list,
 * and each `ui5-navigation-menu-item` is represented by a list item in that list. Therefore, you should only use
 * `ui5-navigation-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NavigationMenuItem.js";`
 * @constructor
 * @extends MenuItem
 * @since 1.22.0
 * @private
 */
@customElement({
	renderer: jsxRenderer,
	tag: "ui5-navigation-menu-item",
	template: NavigationMenuItemTemplate,
	styles: [MenuItem.styles, navigationMenuItemCss],
})
class NavigationMenuItem extends MenuItem {
	/**
	 * Defines the link target URI. Supports standard hyperlink behavior.
	 * If a JavaScript action should be triggered,
	 * this should not be set, but instead an event handler
	 * for the `click` event should be registered.
	 * @public
	 * @default undefined
	 * @since 1.22.0
	 */
	@property()
	href?: string;

	/**
	 * Defines the component target.
	 *
	 * **Notes:**
	 *
	 * - `_self`
	 * - `_top`
	 * - `_blank`
	 * - `_parent`
	 * - `_search`
	 *
	 * **This property must only be used when the `href` property is set.**
	 * @public
	 * @default undefined
	 * @since 1.22.0
	 */
	@property()
	target?: string;

	@property()
	design: `${SideNavigationItemDesign}` = "Default";

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundleFiori: I18nBundle;

	associatedItem?: SideNavigationSelectableItemBase;

	get isExternalLink() {
		return this.href && this.target === "_blank";
	}

	get _href() {
		return (!this.disabled && this.href) ? this.href : undefined;
	}

	get _accInfo() {
		const accInfo = super._accInfo;

		accInfo.role = "none";

		if (this.hasSubmenu && this.associatedItem?.isSelectable) {
			// For the menu item on first level (parent item)
			accInfo.ariaSelectedText = NavigationMenuItem.i18nBundleFiori.getText(NAVIGATION_MENU_SELECTABLE_ITEM_HIDDEN_TEXT);
		}

		return accInfo;
	}

	get classes(): ClassMap {
		const result = super.classes;

		result.main["ui5-navigation-menu-item-root"] = true;

		return result;
	}

	_onclick(e: MouseEvent) {
		this._activate(e);
	}

	_activate(e: MouseEvent | KeyboardEvent) {
		e.stopPropagation();

		const item = this.associatedItem;

		if (this.disabled || !item) {
			return;
		}

		const sideNav = item.sideNavigation;
		const overflowMenu = sideNav?.getOverflowPopover();
		const isSelectable = item.isSelectable;

		const executeEvent = item.fireDecoratorEvent("click", {
			altKey: e.altKey,
			ctrlKey: e.ctrlKey,
			metaKey: e.metaKey,
			shiftKey: e.shiftKey,
		});

		if (!executeEvent) {
			e.preventDefault();

			if (this.hasSubmenu) {
				overflowMenu?._openItemSubMenu(this);
			} else {
				sideNav?.closeMenu();
			}

			return;
		}

		const shouldSelect = !this.hasSubmenu && isSelectable;

		if (this.hasSubmenu) {
			overflowMenu?._openItemSubMenu(this);
		}

		if (shouldSelect) {
			sideNav?._selectItem(item);
		}

		if (!this.hasSubmenu) {
			sideNav?.closeMenu(shouldSelect);
		}
	}

	async _onkeydown(e: KeyboardEvent): Promise<void> {
		if (isSpace(e)) {
			e.preventDefault();
		}

		// "Enter" + "Meta" is missing since it is often reserved by the operating system or window manager
		if (isEnter(e) || isEnterShift(e) || isEnterCtrl(e) || isEnterAlt(e)) {
			this._activate(e);
		}

		return Promise.resolve();
	}

	_onkeyup(e: KeyboardEvent) {
		// "Space" + modifier is often reserved by the operating system or window manager
		if (isSpace(e)) {
			this._activate(e);

			if (this.href && !e.defaultPrevented) {
				const customEvent = new MouseEvent("click");

				customEvent.stopImmediatePropagation();
				if (this.getDomRef()!.querySelector("a")) {
					this.getDomRef()!.querySelector("a")!.dispatchEvent(customEvent);
				} else {
					// when Side Navigation is collapsed and it is first level item we have directly <a> element
					this.getDomRef()!.dispatchEvent(customEvent);
				}
			}
		}
	}

	get accessibleNameText() {
		// For the submenu's dialog
		return this.text ?? "";
	}

	get labelClose() {
		return MenuItem.i18nBundle.getText(NAVIGATION_MENU_CLOSE_BUTTON_ARIA_LABEL);
	}
}

NavigationMenuItem.define();

export default NavigationMenuItem;
