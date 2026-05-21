var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProgressIndicator_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { VALUE_STATE_ERROR, VALUE_STATE_WARNING, VALUE_STATE_SUCCESS, VALUE_STATE_INFORMATION, } from "./generated/i18n/i18n-defaults.js";
// Template
import ProgressIndicatorTemplate from "./ProgressIndicatorTemplate.js";
// Styles
import ProgressIndicatorCss from "./generated/themes/ProgressIndicator.css.js";
/**
 * @class
 *
 * ### Overview
 * Shows the progress of a process in a graphical way. To indicate the progress,
 * the inside of the component is filled with a color.
 *
 * ### Responsive Behavior
 * You can change the size of the Progress Indicator by changing its `width` or `height` CSS properties.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ProgressIndicator.js";`
 * @csspart bar - Used to style the main bar of the `ui5-progress-indicator`
 * @csspart remaining-bar - Used to style the remaining bar of the `ui5-progress-indicator`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
let ProgressIndicator = ProgressIndicator_1 = class ProgressIndicator extends UI5Element {
    constructor() {
        super();
        /**
         * Defines whether the component value is shown.
         * @default false
         * @public
         */
        this.hideValue = false;
        /**
         * Specifies the numerical value in percent for the length of the component.
         *
         * **Note:**
         * If a value greater than 100 is provided, the percentValue is set to 100. In other cases of invalid value, percentValue is set to its default of 0.
         * @default 0
         * @public
         */
        this.value = 0;
        /**
         * Defines the value state of the component.
         * @default "None"
         * @public
         */
        this.valueState = "None";
        this._previousValue = 0;
        this._transitionDuration = 0;
    }
    onBeforeRendering() {
        this._transitionDuration = Math.abs(this._previousValue - this.validatedValue) * 20;
        this._previousValue = this.validatedValue;
    }
    valueStateTextMappings() {
        return {
            "Negative": ProgressIndicator_1.i18nBundle.getText(VALUE_STATE_ERROR),
            "Critical": ProgressIndicator_1.i18nBundle.getText(VALUE_STATE_WARNING),
            "Positive": ProgressIndicator_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            "Information": ProgressIndicator_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
        };
    }
    get validatedValue() {
        if (this.value < 0) {
            return 0;
        }
        if (this.value > 100) {
            return 100;
        }
        return this.value;
    }
    get showValueInRemainingBar() {
        return this.value <= 50;
    }
    get shouldAnimate() {
        return getAnimationMode() !== AnimationMode.None;
    }
    get valueStateText() {
        const percentValue = `${this.validatedValue}%`;
        const valueText = this.valueStateTextMappings()[this.valueState];
        return valueText ? `${percentValue} ${valueText}` : percentValue;
    }
    get showIcon() {
        return this.valueState !== ValueState.None;
    }
};
__decorate([
    property()
], ProgressIndicator.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Boolean })
], ProgressIndicator.prototype, "hideValue", void 0);
__decorate([
    property({ type: Number })
], ProgressIndicator.prototype, "value", void 0);
__decorate([
    property()
], ProgressIndicator.prototype, "displayValue", void 0);
__decorate([
    property()
], ProgressIndicator.prototype, "valueState", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], ProgressIndicator, "i18nBundle", void 0);
ProgressIndicator = ProgressIndicator_1 = __decorate([
    customElement({
        tag: "ui5-progress-indicator",
        renderer: jsxRenderer,
        styles: ProgressIndicatorCss,
        template: ProgressIndicatorTemplate,
    })
], ProgressIndicator);
ProgressIndicator.define();
export default ProgressIndicator;
//# sourceMappingURL=ProgressIndicator.js.map