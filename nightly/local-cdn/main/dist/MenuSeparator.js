var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import menuSeparatorTemplate from "./MenuSeparatorTemplate.js";
import menuSeparatorCss from "./generated/themes/MenuSeparator.css.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
/**
 * @class
 * The `ui5-menu-separator` represents a horizontal line to separate menu items inside a `ui5-menu`.
 * @constructor
 * @extends UI5Element
 * @implements {IMenuItem}
 * @public
 * @since 2.0.0
 */
let MenuSeparator = class MenuSeparator extends UI5Element {
    get isSeparator() {
        return true;
    }
};
MenuSeparator = __decorate([
    customElement({
        tag: "ui5-menu-separator",
        renderer: jsxRenderer,
        styles: [menuSeparatorCss],
        template: menuSeparatorTemplate,
    })
], MenuSeparator);
MenuSeparator.define();
export default MenuSeparator;
export const isInstanceOfMenuSeparator = createInstanceChecker("isSeparator");
//# sourceMappingURL=MenuSeparator.js.map