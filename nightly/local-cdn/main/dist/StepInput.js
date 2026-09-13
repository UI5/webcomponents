var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StepInput_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { submitForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import { getAssociatedLabelForTexts } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { NUMBERINPUT_PATTERN_MISSMATCH, NUMBERINPUT_RANGEOVERFLOW, NUMBERINPUT_RANGEUNDERFLOW, } from "./generated/i18n/i18n-defaults.js";
import StepInputTemplate from "./StepInputTemplate.js";
// Styles
import StepInputCss from "./generated/themes/StepInput.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-step-input` consists of an input field and buttons with icons to increase/decrease the value
 * with the predefined step.
 *
 * The user can change the value of the component by pressing the increase/decrease buttons,
 * by typing a number directly, by using the keyboard up/down and page up/down,
 * or by using the mouse scroll wheel. Decimal values are supported.
 *
 * ### Usage
 *
 * The default step is 1 but the app developer can set a different one.
 *
 * App developers can set a maximum and minimum value for the `StepInput`.
 * The increase/decrease button and the up/down keyboard navigation become disabled when
 * the value reaches the max/min or a new value is entered from the input which is greater/less than the max/min.
 *
 * #### When to use:
 *
 * - To adjust amounts, quantities, or other values quickly.
 * - To adjust values for a specific step.
 *
 * #### When not to use:
 *
 * - To enter a static number (for example, postal code, phone number, or ID). In this case,
 * use the regular `ui5-input` instead.
 * - To display a value that rarely needs to be adjusted and does not pertain to a particular step.
 * In this case, use the regular `ui5-input` instead.
 * - To enter dates and times. In this case, use date/time related components instead.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/StepInput.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.13
 * @public
 */
let StepInput = StepInput_1 = class StepInput extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines a value of the component.
         * @default 0
         * @public
         */
        this.value = 0;
        /**
         * Defines a step of increasing/decreasing the value of the component.
         * @default 1
         * @public
         */
        this.step = 1;
        /**
         * Defines the value state of the component.
         * @default "None"
         * @public
         */
        this.valueState = "None";
        /**
         * Defines whether the component is required.
         * @default false
         * @public
         */
        this.required = false;
        /**
         * Determines whether the component is displayed as disabled.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Determines whether the component is displayed as read-only.
         * @default false
         * @public
         */
        this.readonly = false;
        /**
         * Determines the number of digits after the decimal point of the component.
         * @default 0
         * @public
         */
        this.valuePrecision = 0;
    }
    get _innerNumberInput() {
        return this.shadowRoot.querySelector("[ui5-number-input]");
    }
    async formElementAnchor() {
        return (await this.getFocusDomRefAsync())?.getFocusDomRefAsync();
    }
    get formValidityMessage() {
        const validity = this.formValidity;
        if (validity.patternMismatch) {
            return StepInput_1.i18nBundle.getText(NUMBERINPUT_PATTERN_MISSMATCH, this.valuePrecision);
        }
        if (validity.rangeUnderflow) {
            return StepInput_1.i18nBundle.getText(NUMBERINPUT_RANGEUNDERFLOW, this.min);
        }
        if (validity.rangeOverflow) {
            return StepInput_1.i18nBundle.getText(NUMBERINPUT_RANGEOVERFLOW, this.max);
        }
        return "";
    }
    get formValidity() {
        return {
            patternMismatch: this.value !== 0 && (this._innerNumberInput?.formValidity.patternMismatch ?? false),
            rangeOverflow: this.max !== undefined && this.value > this.max,
            rangeUnderflow: this.min !== undefined && this.value < this.min,
        };
    }
    get formFormattedValue() {
        return this.value.toString();
    }
    getFocusDomRef() {
        return this._innerNumberInput?.getFocusDomRef();
    }
    get _associatedLabelText() {
        return getAssociatedLabelForTexts(this) || undefined;
    }
    _onNumberInputChange(e) {
        e.stopPropagation();
        this._syncFromInner();
        this.fireDecoratorEvent("change");
    }
    _onNumberInputInput(e) {
        e.stopPropagation();
        const prevented = !this.fireDecoratorEvent("input", { inputType: e.detail.inputType });
        if (prevented) {
            e.preventDefault();
        }
    }
    _onNumberInputValueStateChange(e) {
        e.stopPropagation();
        const prevented = !this.fireDecoratorEvent("value-state-change", {
            valueState: e.detail.valueState,
            valid: e.detail.valid,
        });
        if (prevented) {
            // Inner already applied the new valueState — revert it back to the outer's current value
            this._innerNumberInput.valueState = this.valueState;
        }
        else {
            this.valueState = e.detail.valueState;
        }
    }
    _syncFromInner() {
        const ni = this._innerNumberInput;
        if (!ni) {
            return;
        }
        this.value = ni.value;
        this.valueState = ni.valueState;
    }
    _onRequestSubmit() {
        if (this._internals.form) {
            submitForm(this);
        }
    }
};
__decorate([
    property({ type: Number })
], StepInput.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], StepInput.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], StepInput.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], StepInput.prototype, "step", void 0);
__decorate([
    property()
], StepInput.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], StepInput.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], StepInput.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], StepInput.prototype, "readonly", void 0);
__decorate([
    property()
], StepInput.prototype, "placeholder", void 0);
__decorate([
    property()
], StepInput.prototype, "name", void 0);
__decorate([
    property({ type: Number })
], StepInput.prototype, "valuePrecision", void 0);
__decorate([
    property()
], StepInput.prototype, "accessibleName", void 0);
__decorate([
    property()
], StepInput.prototype, "accessibleNameRef", void 0);
__decorate([
    slot()
], StepInput.prototype, "valueStateMessage", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], StepInput, "i18nBundle", void 0);
StepInput = StepInput_1 = __decorate([
    customElement({
        tag: "ui5-step-input",
        cldr: true,
        formAssociated: true,
        renderer: jsxRenderer,
        styles: StepInputCss,
        template: StepInputTemplate,
        languageAware: true,
    })
    /**
     * Fired when the input operation has finished by pressing Enter or on focusout.
     * @public
     */
    ,
    event("change", {
        bubbles: true,
    })
    /**
     * Fired when the value of the component changes at each keystroke.
     * @public
     * @since 2.6.0
     */
    ,
    event("input", {
        cancelable: true,
        bubbles: true,
    })
    /**
     * Fired before the value state of the component is updated internally.
     * The event is preventable, meaning that if it's default action is
     * prevented, the component will not update the value state.
     * @since 1.23.0
     * @public
     * @param {string} valueState The new `valueState` that will be set.
     * @param {boolean} valid Indicator if the value is in between the min and max value.
     */
    ,
    event("value-state-change", {
        bubbles: true,
        cancelable: true,
    })
], StepInput);
StepInput.define();
export default StepInput;
//# sourceMappingURL=StepInput.js.map