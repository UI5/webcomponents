var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, slotStrict as slot } from "@ui5/webcomponents-base/dist/decorators.js";
import MenuItem, { isInstanceOfMenuItem } from "@ui5/webcomponents/dist/MenuItem.js";
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
let UserMenuItem = class UserMenuItem extends MenuItem {
    get _menuItems() {
        return this.items.filter(isInstanceOfMenuItem);
    }
};
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], UserMenuItem.prototype, "items", void 0);
UserMenuItem = __decorate([
    customElement({
        tag: "ui5-user-menu-item",
        template: UserMenuItemTemplate,
        styles: [MenuItem.styles, userMenuItemCss],
    })
], UserMenuItem);
UserMenuItem.define();
export default UserMenuItem;
//# sourceMappingURL=UserMenuItem.js.map