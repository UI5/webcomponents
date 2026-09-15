var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserMenuItem_1;
import { customElement, slotStrict as slot, property } from "@ui5/webcomponents-base/dist/decorators.js";
import MenuItem, { isInstanceOfMenuItem } from "@ui5/webcomponents/dist/MenuItem.js";
import MenuItemGroupCheckMode from "@ui5/webcomponents/dist/types/MenuItemGroupCheckMode.js";
import UserMenuItemTemplate from "./UserMenuItemTemplate.js";
// Styles
import userMenuItemCss from "./generated/themes/UserMenuItem.css.js";
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
let UserMenuItem = UserMenuItem_1 = class UserMenuItem extends MenuItem {
    constructor() {
        super(...arguments);
        /**
         * When set, a second line appears below the menu item text showing the text
         * of the currently selected sub-item. Intended for use with a single-select
         * ui5-menu-item-group (check-mode="Single").
         * When enabled, the checked sub-item cannot be unchecked,
         * ensuring the selection text is always displayed.
         *
         * @default false
         * @public
         * @since 2.22.0
         */
        this.showSelection = false;
    }
    get _menuItems() {
        return this.items.filter(isInstanceOfMenuItem);
    }
    /**
     * Overrides the base MenuItem behavior to prevent unchecking
     * the currently checked item in single-select mode when
     * the parent item uses showSelection, ensuring there is always
     * a visible selection.
     */
    _updateCheckedState() {
        const parentItem = this.parentElement?.parentElement;
        const hasShowSelection = parentItem instanceof UserMenuItem_1 && parentItem.showSelection;
        if (hasShowSelection && this._checkMode === MenuItemGroupCheckMode.Single && this.checked) {
            return;
        }
        super._updateCheckedState();
    }
    /**
     * Returns the text of the currently checked sub-item.
     * Only returns text for single-select groups.
     */
    get _selectedSubItemText() {
        if (!this.showSelection) {
            return "";
        }
        const singleSelectGroup = this._menuItemGroups.find(g => g.checkMode === MenuItemGroupCheckMode.Single);
        if (!singleSelectGroup) {
            return "";
        }
        const checkedItem = singleSelectGroup._menuItems.find(item => item.checked);
        return checkedItem?.text || "";
    }
};
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], UserMenuItem.prototype, "items", void 0);
__decorate([
    property({ type: Boolean })
], UserMenuItem.prototype, "showSelection", void 0);
UserMenuItem = UserMenuItem_1 = __decorate([
    customElement({
        tag: "ui5-user-menu-item",
        template: UserMenuItemTemplate,
        styles: [MenuItem.styles, userMenuItemCss],
    })
], UserMenuItem);
UserMenuItem.define();
export default UserMenuItem;
//# sourceMappingURL=UserMenuItem.js.map