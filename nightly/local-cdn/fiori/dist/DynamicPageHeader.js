var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DynamicPageHeader_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
// Template
import DynamicPageHeaderTemplate from "./DynamicPageHeaderTemplate.js";
// Styles
import DynamicPageHeaderCss from "./generated/themes/DynamicPageHeader.css.js";
// i18n
import { DYNAMIC_PAGE_ARIA_LABEL_EXPANDED_HEADER, DYNAMIC_PAGE_ARIA_LABEL_SNAPPED_HEADER, } from "./generated/i18n/i18n-defaults.js";
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
 * ### Accessibility
 *
 * The `DynamicPageHeader` provides an accessible label for the header region.
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
let DynamicPageHeader = DynamicPageHeader_1 = class DynamicPageHeader extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines if the header is snapped.
         *
         * @default false
         * @private
         */
        this._snapped = false;
    }
    /**
     * Returns the aria-label for the header region.
     * @internal
     */
    get _headerRegionAriaLabel() {
        const defaultText = this._snapped
            ? DYNAMIC_PAGE_ARIA_LABEL_SNAPPED_HEADER
            : DYNAMIC_PAGE_ARIA_LABEL_EXPANDED_HEADER;
        return DynamicPageHeader_1.i18nBundle.getText(defaultText);
    }
};
__decorate([
    slot({ "default": true, type: HTMLElement })
], DynamicPageHeader.prototype, "content", void 0);
__decorate([
    property({ type: Boolean })
], DynamicPageHeader.prototype, "_snapped", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], DynamicPageHeader, "i18nBundle", void 0);
DynamicPageHeader = DynamicPageHeader_1 = __decorate([
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