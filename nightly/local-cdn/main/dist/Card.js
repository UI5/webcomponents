var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Card_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import CardTemplate from "./CardTemplate.js";
import { ARIA_ROLEDESCRIPTION_CARD, ARIA_LABEL_CARD_CONTENT, } from "./generated/i18n/i18n-defaults.js";
// Styles
import cardCss from "./generated/themes/Card.css.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-card` is a component that represents information in the form of a
 * tile with separate header and content areas.
 * The content area of a `ui5-card` can be arbitrary HTML content.
 * The header can be used through slot `header`. For which there is a `ui5-card-header` component to achieve the card look and feel.
 *
 * Note: We recommend the usage of `ui5-card-header` for the header slot, so advantage can be taken for keyboard handling, styling and accessibility.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Card.js";`
 *
 * `import "@ui5/webcomponents/dist/CardHeader.js";` (for `ui5-card-header`)
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart root - Used to style the root DOM element of the card component
 * @csspart content - Used to style the content of the card
 */
let Card = Card_1 = class Card extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines if a loading indicator would be displayed over the card.
         * @default false
         * @public
         * @since 2.1.0
         */
        this.loading = false;
        /**
         * Defines the delay in milliseconds, after which the loading indicator will show up for this card.
         * @default 1000
         * @public
         * @since 2.1.0
         */
        this.loadingDelay = 1000;
    }
    get _hasHeader() {
        return !!this.header.length;
    }
    get _getAriaLabel() {
        const effectiveAriaLabelText = getEffectiveAriaLabelText(this), effectiveAriaLabel = effectiveAriaLabelText ? ` ${effectiveAriaLabelText}` : "";
        return Card_1.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD) + effectiveAriaLabel;
    }
    get _ariaCardContentLabel() {
        return Card_1.i18nBundle.getText(ARIA_LABEL_CARD_CONTENT);
    }
};
__decorate([
    property()
], Card.prototype, "accessibleName", void 0);
__decorate([
    property()
], Card.prototype, "accessibleNameRef", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Card.prototype, "content", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true })
], Card.prototype, "header", void 0);
__decorate([
    property({ type: Boolean })
], Card.prototype, "loading", void 0);
__decorate([
    property({ type: Number })
], Card.prototype, "loadingDelay", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Card, "i18nBundle", void 0);
Card = Card_1 = __decorate([
    customElement({
        tag: "ui5-card",
        languageAware: true,
        renderer: jsxRenderer,
        template: CardTemplate,
        styles: cardCss,
    })
], Card);
Card.define();
export default Card;
//# sourceMappingURL=Card.js.map