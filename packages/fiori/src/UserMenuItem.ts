import { customElement, slotStrict as slot, property } from "@ui5/webcomponents-base/dist/decorators.js";
import MenuItem, { isInstanceOfMenuItem } from "@ui5/webcomponents/dist/MenuItem.js";
import MenuItemGroupCheckMode from "@ui5/webcomponents/dist/types/MenuItemGroupCheckMode.js";

import UserMenuItemTemplate from "./UserMenuItemTemplate.js";

// Styles
import userMenuItemCss from "./generated/themes/UserMenuItem.css.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-user-menu-item` is the item to use inside a `ui5-user-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Usage
 *
 * `ui5-user-menu-item` represents a node in a `ui5-user-menu`. The user menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a menu item in that menu. Therefore, you should only use
 * `ui5-user-menu-item` directly in your apps. The `ui5-menu` menu item is internal for the menu, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";`
 * @constructor
 * @extends MenuItem
 * @public
 * @since 2.5.0
 */
@customElement({
	tag: "ui5-user-menu-item",
	template: UserMenuItemTemplate,
	styles: [MenuItem.styles, userMenuItemCss],
})
class UserMenuItem extends MenuItem {
	/**
	 * Defines the items of this component.
	 *
	 * **Note:** Use `ui5-user-menu-item` for the intended design.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	declare items: DefaultSlot<UserMenuItem>;

	/**
	 * When set, a second line appears below the menu item text
	 * showing the text of the currently selected (checked) sub-item.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSelectionText = false;

	get _menuItems() {
		return this.items.filter(isInstanceOfMenuItem);
	}

	/**
	 * Returns the text of the currently checked sub-item.
	 * Only returns text for single-select groups.
	 */
	get _selectedSubItemText(): string {
		if (!this.showSelectionText) {
			return "";
		}

		const singleSelectGroup = this._menuItemGroups.find(
			g => g.checkMode === MenuItemGroupCheckMode.Single,
		);
		if (!singleSelectGroup) {
			return "";
		}

		const checkedItem = singleSelectGroup._menuItems.find(item => item.checked);
		return checkedItem?.text || "";
	}
}

UserMenuItem.define();

export default UserMenuItem;
