var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
// Template
import DynamicPageHeaderTemplate from "./DynamicPageHeaderTemplate.js";
// Styles
import DynamicPageHeaderCss from "./generated/themes/DynamicPageHeader.css.js";
/**
 * @class
 *
 * Header of the DynamicPage.
 *
 * ### Overview
 *
 * The DynamicPageHeader `ui5-dynamic-page-header` is part of the DynamicPage family
 * and is used to serve as header of the `DynamicPage`.
 *
 * ### Usage
 *
 * The `DynamicPageHeader` can hold any layout control and has two states - expanded
 * and collapsed (snapped). The switching between these states happens when:
 *	- the user scrolls below its bottom margin
 *	- the user clicks on the `DynamicPageTitle`
 *	- through the `DynamicPage` property `headerSnapped`
 *
 * ### Responsive Behavior
 *
 * The responsive behavior of the `DynamicPageHeader` depends on the behavior of the
 * content that is displayed.
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
let DynamicPageHeader = class DynamicPageHeader extends UI5Element {
};
__decorate([
    slot({ "default": true, type: HTMLElement })
], DynamicPageHeader.prototype, "content", void 0);
DynamicPageHeader = __decorate([
    customElement({
        tag: "ui5-dynamic-page-header",
        renderer: jsxRenderer,
        styles: DynamicPageHeaderCss,
        template: DynamicPageHeaderTemplate,
    })
], DynamicPageHeader);
DynamicPageHeader.define();
export default DynamicPageHeader;
//# sourceMappingURL=DynamicPageHeader.js.map