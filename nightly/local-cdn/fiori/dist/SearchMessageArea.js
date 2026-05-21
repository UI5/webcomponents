var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SearchMessageAreaTemplate from "./SearchMessageAreaTemplate.js";
import SearchMessageAreaStyles from "./generated/themes/SearchMessageArea.css.js";
/**
 * @class
 * `import "@ui5/webcomponents-fiori/dist/SearchMessageArea.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.9.0
 * @experimental
 */
let SearchMessageArea = class SearchMessageArea extends UI5Element {
};
__decorate([
    property()
], SearchMessageArea.prototype, "text", void 0);
__decorate([
    property()
], SearchMessageArea.prototype, "description", void 0);
SearchMessageArea = __decorate([
    customElement({
        tag: "ui5-search-message-area",
        languageAware: true,
        styles: SearchMessageAreaStyles,
        renderer: jsxRenderer,
        template: SearchMessageAreaTemplate,
    })
], SearchMessageArea);
SearchMessageArea.define();
export default SearchMessageArea;
//# sourceMappingURL=SearchMessageArea.js.map