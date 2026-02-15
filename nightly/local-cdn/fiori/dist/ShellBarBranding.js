var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
// Template
import ShellBarBrandingTemplate from "./ShellBarBrandingTemplate.js";
// Styles
import shellBarBrandingCss from "./generated/themes/ShellBarBranding.css.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-shellbar-branding` component is intended to be placed inside the branding slot of the
 * `ui5-shellbar` component. Its content has higher priority than the `primaryTitle` property
 * and the `logo` slot of `ui5-shellbar`.
 *
 * @constructor
 * @extends UI5Element
 * @since 2.12.0
 * @public
 * @experimental
 */
let ShellBarBranding = class ShellBarBranding extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines if the title of the branding is shown on an S breakpoint.
         * @default false
         * @private
         */
        this._isSBreakPoint = false;
    }
    get parsedRef() {
        return (this.href && this.href.length > 0) ? this.href : undefined;
    }
    get _role() {
        return this.href && this.href.length > 0 ? "link" : "button";
    }
    get accessibleNameText() {
        if (this.accessibleName) {
            return this.accessibleName;
        }
        const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])");
        return defaultSlot?.assignedNodes({ flatten: true })
            .find(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
            ?.textContent.trim();
    }
    _fireClick() {
        this.fireDecoratorEvent("click");
    }
    _onclick(e) {
        e.stopPropagation();
        this._fireClick();
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._fireClick();
        }
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            return;
        }
        if (isEnter(e)) {
            this._fireClick();
        }
    }
};
__decorate([
    property()
], ShellBarBranding.prototype, "href", void 0);
__decorate([
    property()
], ShellBarBranding.prototype, "target", void 0);
__decorate([
    property()
], ShellBarBranding.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Boolean })
], ShellBarBranding.prototype, "_isSBreakPoint", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], ShellBarBranding.prototype, "content", void 0);
__decorate([
    slot({ type: HTMLElement })
], ShellBarBranding.prototype, "logo", void 0);
ShellBarBranding = __decorate([
    customElement({
        tag: "ui5-shellbar-branding",
        languageAware: true,
        renderer: jsxRenderer,
        template: ShellBarBrandingTemplate,
        styles: shellBarBrandingCss,
    })
    /**
     * Fired, when the logo is activated.
     * @public
     */
    ,
    event("click", {
        bubbles: true,
    })
], ShellBarBranding);
ShellBarBranding.define();
export default ShellBarBranding;
//# sourceMappingURL=ShellBarBranding.js.map