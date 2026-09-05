var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ButtonBadgeDesign from "./types/ButtonBadgeDesign.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ButtonBadgeTemplate from "./ButtonBadgeTemplate.js";
// Styles
import buttonBadgeCss from "./generated/themes/ButtonBadge.css.js";
/**
 * @class
 *
 * The `ui5-button-badge` component defines a badge that appears in the `ui5-button`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ButtonBadge.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.7.0
 * @public
 */
let ButtonBadge = class ButtonBadge extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the badge placement and appearance.
         * - **InlineText** - displayed inside the button after its text, and recommended for **compact** density.
         * - **OverlayText** - displayed at the top-end corner of the button, and recommended for **cozy** density.
         * - **AttentionDot** - displayed at the top-end corner of the button as a dot, and suitable for both **cozy** and **compact** densities.
         * @since 2.7.0
         * @public
        */
        this.design = "AttentionDot";
        /**
         * Defines the text of the component.
         *
         * **Note:** Text is not applied when the `design` property is set to `AttentionDot`.
         *
         * **Note:** The badge component only accepts numeric values and the "+" symbol. Using other characters or formats may result in unpredictable behavior, which is not guaranteed or supported.
         * @since 2.7.0
         * @public
        */
        this.text = "";
    }
    get effectiveText() {
        return this.design === ButtonBadgeDesign.AttentionDot ? "" : this.text;
    }
};
__decorate([
    property()
], ButtonBadge.prototype, "design", void 0);
__decorate([
    property()
], ButtonBadge.prototype, "text", void 0);
ButtonBadge = __decorate([
    customElement({
        tag: "ui5-button-badge",
        renderer: jsxRenderer,
        template: ButtonBadgeTemplate,
        styles: buttonBadgeCss,
    })
], ButtonBadge);
ButtonBadge.define();
export default ButtonBadge;
//# sourceMappingURL=ButtonBadge.js.map