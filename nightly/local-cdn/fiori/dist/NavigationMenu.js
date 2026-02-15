var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NavigationMenu_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isDesktop, } from "@ui5/webcomponents-base/dist/Device.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import NavigationMenuTemplate from "./NavigationMenuTemplate.js";
// Styles
import navigationMenuCss from "./generated/themes/NavigationMenu.css.js";
import menuCss from "@ui5/webcomponents/dist/generated/themes/Menu.css.js";
import { NAVIGATION_MENU_POPOVER_HIDDEN_TEXT, } from "./generated/i18n/i18n-defaults.js";
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
let NavigationMenu = NavigationMenu_1 = class NavigationMenu extends Menu {
    _itemMouseOver(e) {
        if (isDesktop()) {
            // respect mouseover only on desktop
            const item = e.target;
            // Opens submenu with 300ms delay
            this._startOpenTimeout(item);
        }
    }
    get accSideNavigationPopoverHiddenText() {
        return NavigationMenu_1.i18nBundleFiori.getText(NAVIGATION_MENU_POPOVER_HIDDEN_TEXT);
    }
};
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], NavigationMenu.prototype, "items", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], NavigationMenu, "i18nBundleFiori", void 0);
NavigationMenu = NavigationMenu_1 = __decorate([
    customElement({
        tag: "ui5-navigation-menu",
        renderer: jsxRenderer,
        styles: [menuCss, navigationMenuCss],
        template: NavigationMenuTemplate,
    })
], NavigationMenu);
NavigationMenu.define();
export default NavigationMenu;
//# sourceMappingURL=NavigationMenu.js.map