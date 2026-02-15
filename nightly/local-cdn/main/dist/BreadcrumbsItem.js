var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import LinkDesign from "./types/LinkDesign.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-breadcrumbs-item` component defines the content of an item in `ui5-breadcrumbs`.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 * @abstract
 */
let BreadcrumbsItem = class BreadcrumbsItem extends UI5Element {
    get stableDomRef() {
        return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
    }
    get _linkDesign() {
        return this._isCurrentPageItem ? LinkDesign.Emphasized : LinkDesign.Default;
    }
    get accessibilityAttributes() {
        return {
            current: this._isCurrentPageItem ? "page" : false,
        };
    }
};
__decorate([
    property()
], BreadcrumbsItem.prototype, "href", void 0);
__decorate([
    property()
], BreadcrumbsItem.prototype, "target", void 0);
__decorate([
    property()
], BreadcrumbsItem.prototype, "accessibleName", void 0);
__decorate([
    slot({ type: Node, "default": true })
], BreadcrumbsItem.prototype, "text", void 0);
BreadcrumbsItem = __decorate([
    customElement("ui5-breadcrumbs-item")
], BreadcrumbsItem);
BreadcrumbsItem.define();
export default BreadcrumbsItem;
//# sourceMappingURL=BreadcrumbsItem.js.map