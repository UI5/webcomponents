var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NumberInput_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isUp, isDown, isUpCtrl, isDownCtrl, isUpShift, isDownShift, isUpShiftCtrl, isDownShiftCtrl, isPageUpShift, isPageDownShift, isEscape, isEnter, isMinus, } from "@ui5/webcomponents-base/dist/Keys.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { submitForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import NumberInputTemplate from "./NumberInputTemplate.js";
import { NUMBERINPUT_DEC_ICON_TITLE, NUMBERINPUT_INC_ICON_TITLE, NUMBERINPUT_PATTERN_MISSMATCH, NUMBERINPUT_RANGEOVERFLOW, NUMBERINPUT_RANGEUNDERFLOW, } from "./generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents-icons/dist/less.js";
import "@ui5/webcomponents-icons/dist/add.js";
import InputType from "./types/InputType.js";
import NumberFormat from "@ui5/webcomponents-localization/dist/NumberFormat.js";
// Styles
import NumberInputCss from "./generated/themes/NumberInput.css.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import { attachLanguageChange, detachLanguageChange } from "@ui5/webcomponents-base/dist/locale/languageChange.js";
// Spin variables
const INITIAL_WAIT_TIMEOUT = 500; // milliseconds
const ACCELERATION = 0.8;
const MIN_WAIT_TIMEOUT = 50; // milliseconds
const INITIAL_SPEED = 120; // milliseconds
/**
 * @class
 *
 * ### Overview
 *
  * The `ui5-number-input` component is a numeric input field. It allows users to enter, edit and select numeric values.
 *
 * ### Usage
 *
 * The default step is 1 but the app developer can set a different one.
 *
 * App developers can set a maximum and minimum value for `ui5-number-input`.
 * The increase/decrease button and the up/down keyboard navigation become disabled when
 * the value reaches the max/min or a new value is entered from the input which is greater/less than the max/min.
 *
 * #### When to use:
 *
 * - To enter or adjust numeric values.
 * - To adjust values for a specific step.
 *
 * #### When not to use:
 *
 * - To enter a static number (for example, postal code, phone number, or ID). In this case,
 * use the regular `ui5-input` instead.
 * - To enter dates and times. In this case, use date/time related components instead.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/NumberInput.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.26.0
 * @experimental
 * @public
 */
let NumberInput = NumberInput_1 = class NumberInput extends UI5Element {
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
        /**
         * Controls whether the increment/decrement step buttons are shown.
         * @default false
         * @private
         */
        this._showStepButtons = false;
        this._decIconDisabled = false;
        this._incIconDisabled = false;
        this.focused = false;
        this._inputFocused = false;
        this._waitTimeout = INITIAL_WAIT_TIMEOUT;
        this._speed = INITIAL_SPEED;
        this._spinStarted = false;
        this._languageChanged = false;
    }
    async formElementAnchor() {
        return (await this.getFocusDomRefAsync())?.getFocusDomRefAsync();
    }
    get formValidityMessage() {
        const validity = this.formValidity;
        if (validity.patternMismatch) {
            return NumberInput_1.i18nBundle.getText(NUMBERINPUT_PATTERN_MISSMATCH, this.valuePrecision);
        }
        if (validity.rangeUnderflow) {
            return NumberInput_1.i18nBundle.getText(NUMBERINPUT_RANGEUNDERFLOW, this.min);
        }
        if (validity.rangeOverflow) {
            return NumberInput_1.i18nBundle.getText(NUMBERINPUT_RANGEOVERFLOW, this.max);
        }
        return "";
    }
    get formValidity() {
        return {
            patternMismatch: this.value !== 0 && !this._isValueWithCorrectPrecision,
            rangeOverflow: this.max !== undefined && this.value > this.max,
            rangeUnderflow: this.min !== undefined && this.value < this.min,
        };
    }
    get formFormattedValue() {
        return this.value.toString();
    }
    get type() {
        return InputType.Text;
    }
    // icons-related
    get decIconTitle() {
        return NumberInput_1.i18nBundle.getText(NUMBERINPUT_DEC_ICON_TITLE);
    }
    get incIconTitle() {
        return NumberInput_1.i18nBundle.getText(NUMBERINPUT_INC_ICON_TITLE);
    }
    get _decIconClickable() {
        return !this._decIconDisabled && !this.readonly && !this.disabled;
    }
    get _incIconClickable() {
        return !this._incIconDisabled && !this.readonly && !this.disabled;
    }
    get _isFocused() {
        return this.focused;
    }
    get _displayValue() {
        // For the cases when there is set value precision but the input value is not with correct precision we don't need to format it
        const value = this.input?.value && !this._isValueWithCorrectPrecision ? this.input.value : this._formatNumber(this.value);
        if ((this.value === 0) || (Number.isInteger(this.value))) {
            return value;
        }
        if (this.input && this.value === this._parseNumber(this.input.value)) { // For the cases where the number is fractional and is ending with 0s.
            return this.input.value;
        }
        return value;
    }
    get accInfo() {
        return {
            "ariaRequired": this.required,
            "ariaLabel": getEffectiveAriaLabelText(this) || this._externalAriaLabel || getAssociatedLabelForTexts(this),
        };
    }
    get inputAttributes() {
        return {
            min: this.min === undefined ? undefined : this.min,
            max: this.max === undefined ? undefined : this.max,
            step: this.step,
        };
    }
    onBeforeRendering() {
        if (this._languageChanged) {
            this._inputValue = this._formatNumber(this.value);
            this._languageChanged = false;
            this.valueState = ValueState.None;
        }
        this._setButtonState();
    }
    onEnterDOM() {
        this._setupLanguageChangeHandler();
    }
    onExitDOM() {
        this._cleanupLanguageChangeHandler();
        this._resetSpin();
    }
    _setupLanguageChangeHandler() {
        if (this._languageChangeHandler) {
            return;
        }
        this._languageChangeHandler = () => {
            this._formatter = undefined;
            this._languageChanged = true;
            this._delimiter = undefined;
            this._groupSeparator = undefined;
            return Promise.resolve();
        };
        attachLanguageChange(this._languageChangeHandler);
    }
    _cleanupLanguageChangeHandler() {
        if (this._languageChangeHandler) {
            detachLanguageChange(this._languageChangeHandler);
            this._languageChangeHandler = undefined;
        }
    }
    get formatter() {
        if (!this._formatter) {
            this._formatter = NumberFormat.getFloatInstance({
                decimals: this.valuePrecision,
            });
        }
        return this._formatter;
    }
    get delimiter() {
        if (!this._delimiter) {
            const localeData = getCachedLocaleDataInstance(getLocale());
            this._delimiter = localeData.getNumberSymbol("decimal") || ".";
        }
        return this._delimiter;
    }
    get groupSeparator() {
        if (!this._groupSeparator) {
            const localeData = getCachedLocaleDataInstance(getLocale());
            this._groupSeparator = localeData.getNumberSymbol("group") || ",";
        }
        return this._groupSeparator;
    }
    get input() {
        return this.shadowRoot.querySelector("[ui5-input]");
    }
    get innerInput() {
        return this.input.shadowRoot.querySelector("input");
    }
    _onButtonFocusOut() {
        setTimeout(() => {
            if (!this._inputFocused && !this.shadowRoot.activeElement) {
                this.focused = false;
            }
        }, 0);
    }
    _onInput(e) {
        const prevented = !this.fireDecoratorEvent("input", { inputType: e.detail.inputType });
        if (prevented) {
            e.preventDefault();
        }
    }
    _onInputFocusIn() {
        this._inputFocused = true;
    }
    _onInputFocusOut() {
        this._inputFocused = false;
        this._onInputChange();
    }
    _onMouseWheel(e) {
        if (this.disabled || this.readonly || !this._isFocused) {
            return;
        }
        e.preventDefault();
        const isScrollUp = e.deltaY < 0;
        const modifier = isScrollUp ? this.step : -this.step;
        this._modifyValue(modifier, true);
    }
    _setButtonState() {
        this._decIconDisabled = this.min !== undefined && this.value <= this.min;
        this._incIconDisabled = this.max !== undefined && this.value >= this.max;
    }
    _validate() {
        if (this._initialValueState === undefined) {
            this._initialValueState = this.valueState;
        }
        this._updateValueState();
    }
    _updateValueState() {
        const isWithinRange = (this.min === undefined || this._parseNumber(this.input.value) >= this.min)
            && (this.max === undefined || this._parseNumber(this.input.value) <= this.max);
        const isValueWithCorrectPrecision = this._isValueWithCorrectPrecision;
        const previousValueState = this.valueState;
        const isValid = isWithinRange && isValueWithCorrectPrecision;
        this.valueState = isValid ? ValueState.None : ValueState.Negative;
        const eventPrevented = !this.fireDecoratorEvent("value-state-change", {
            valueState: this.valueState,
            valid: isValid,
        });
        if (eventPrevented) {
            this.valueState = previousValueState;
        }
    }
    _preciseValue(value) {
        const pow = 10 ** this.valuePrecision;
        return Math.round(value * pow) / pow;
    }
    _fireChangeEvent() {
        if (this._previousValue !== this.value) {
            this._previousValue = this.value;
            this.fireDecoratorEvent("change");
        }
    }
    /**
     * Value modifier - modifies the value of the component, validates the new value and enables/disables increment and
     * decrement buttons according to the value and min/max values (if set). Fires `change` event when requested
     * @private
     * @param modifier modifies the value of the component with the given modifier (positive or negative)
     * @param fireChangeEvent if `true`, fires `change` event when the value is changed
     */
    _modifyValue(modifier, fireChangeEvent = false) {
        if (this.min !== undefined && this.max !== undefined && this.min > this.max) {
            console.warn(`[ui5-number-input] Invalid configuration: 'min' (${this.min}) is greater than 'max' (${this.max}). Value modification skipped.`); // eslint-disable-line
            return;
        }
        let value;
        value = this.value + modifier;
        if (this.min !== undefined && value < this.min) {
            value = this.min;
        }
        if (this.max !== undefined && value > this.max) {
            value = this.max;
        }
        value = this._preciseValue(value);
        if (value !== this.value) {
            this.value = value;
            this._inputValue = this._formatNumber(value);
            this._validate();
            this._setButtonState();
            this.focused = true;
            if (fireChangeEvent) {
                this._fireChangeEvent();
            }
            else {
                this.input.focus();
            }
        }
    }
    /**
     * Formats a number with thousands separator based on current locale
     * @private
     */
    _formatNumber(value) {
        return this.formatter.format(value);
    }
    /**
     * Parses formatted number string back to numeric value
     * @private
    */
    _parseNumber(formattedValue) {
        return this.formatter.parse(formattedValue);
    }
    _incValue() {
        if (this._incIconClickable && !this.disabled && !this.readonly) {
            this._modifyValue(this.step, true);
            this._previousValue = this.value;
        }
    }
    _decValue() {
        if (this._decIconClickable && !this.disabled && !this.readonly) {
            this._modifyValue(-this.step, true);
            this._previousValue = this.value;
        }
    }
    get _isValueWithCorrectPrecision() {
        const delimiter = this.delimiter;
        // check if the value will be displayed with correct precision
        // _displayValue has special formatting logic
        if (this.valuePrecision === 0 && !this.input?.value.includes(delimiter) && ((this.value === 0) || (Number.isInteger(this.value)))) {
            // integers and zero will be formatted with toFixed, so they're always valid
            return true;
        }
        const numberParts = this.input?.value?.split(delimiter);
        const decimalPartLength = numberParts?.length > 1 ? numberParts[1].length : 0;
        return decimalPartLength === this.valuePrecision;
    }
    _onInputChange() {
        this._setDefaultInputValueIfNeeded();
        const updatedValue = this._removeGroupSeparators(this.input.value);
        const inputValue = this._parseNumber(updatedValue);
        if (this._isValueChanged(inputValue)) {
            this._updateValueAndValidate(Number.isNaN(inputValue) ? this.min || 0 : inputValue);
        }
    }
    _setDefaultInputValueIfNeeded() {
        if (this.input.value === "") {
            this._inputValue = this._formatNumber(this.min || 0);
        }
    }
    _isValueChanged(inputValue) {
        const isValueWithCorrectPrecision = this._isValueWithCorrectPrecision;
        const isWithinRange = (this.min === undefined || inputValue >= this.min) && (this.max === undefined || inputValue <= this.max);
        // Treat values as distinct when the precision was just corrected (e.g., from 3.4000 to 3.40) while
        // the value was previously invalid due to precision — but only when the value is in range. Without
        // this guard the condition also triggers for range violations, causing a redundant second _validate call.
        const isPrecisionCorrectButValueStateError = isValueWithCorrectPrecision && isWithinRange && this.valueState === ValueState.Negative;
        return this.value !== this._previousValue
            || this.value !== inputValue
            || inputValue === 0
            || !isValueWithCorrectPrecision
            || isPrecisionCorrectButValueStateError
            || Number.isNaN(inputValue);
    }
    _updateValueAndValidate(inputValue) {
        this.value = inputValue;
        this._inputValue = undefined;
        this._validate();
        this._setButtonState();
        this._fireChangeEvent();
    }
    _onfocusin() {
        this.focused = true;
        this._previousValue = this.value;
    }
    _onfocusout() {
        this.focused = false;
        this._previousValue = undefined;
    }
    _onInputRequestSubmit() {
        if (this._internals.form) {
            submitForm(this);
        }
        else {
            this.fireDecoratorEvent("_request-submit");
        }
    }
    _onkeydown(e) {
        let preventDefault = true;
        if (this.disabled || this.readonly) {
            return;
        }
        if (isEnter(e)) {
            this._onInputChange();
            return;
        }
        if (isUp(e)) {
            // step up
            this._modifyValue(this.step);
        }
        else if (isDown(e)) {
            // step down
            this._modifyValue(-this.step);
        }
        else if (isEscape(e)) {
            // return previous value
            if (this._previousValue === undefined) {
                this._previousValue = this.value;
            }
            this.value = this._previousValue;
            this._inputValue = this._formatNumber(this.value);
        }
        else if (this.max !== undefined && (isPageUpShift(e) || isUpShiftCtrl(e))) {
            // step to max
            this._modifyValue(this.max - this.value);
        }
        else if (this.min !== undefined && (isPageDownShift(e) || isDownShiftCtrl(e))) {
            // step to min
            this._modifyValue(this.min - this.value);
        }
        else if (!isUpCtrl(e) && !isDownCtrl(e) && !isUpShift(e) && !isDownShift(e)) {
            preventDefault = false;
        }
        if (e.key && e.key.length !== 1) {
            return;
        }
        const caretPosition = this._getCaretPosition();
        const inputValue = this.innerInput.value;
        const typedValue = this._getValueOnkeyDown(e, inputValue, caretPosition);
        const parsedValue = this._parseNumber(typedValue);
        const isValidTypedValue = this._isInputValueValid(typedValue, parsedValue);
        if (preventDefault || !isValidTypedValue) {
            e.preventDefault();
        }
        if (caretPosition === 0 && isMinus(e)) {
            this._updateValueAndValidate(parsedValue);
        }
    }
    _getCaretPosition() {
        return this.input.getDomRef().querySelector("input").selectionStart;
    }
    _getValueOnkeyDown(e, inputValue, cursorPosition) {
        const typedValue = `${inputValue.substring(0, cursorPosition)}${e.key}${inputValue.substring(cursorPosition)}`;
        const updatedValue = this._removeGroupSeparators(typedValue);
        return updatedValue;
    }
    _removeGroupSeparators(value) {
        const groupSeparator = this.groupSeparator;
        return value.replaceAll(groupSeparator, "");
    }
    _isInputValueValid(typedValue, parsedValue) {
        return !Number.isNaN(parsedValue) && !/, {2,}/.test(typedValue);
    }
    _decSpin(e) {
        if (this._isFocused || this._decIconDisabled) {
            e.preventDefault();
        }
        if (!this._decIconDisabled) {
            this._spinValue(false, true);
        }
        else {
            this.input.focus();
        }
    }
    _incSpin(e) {
        if (this._isFocused || this._incIconDisabled) {
            e.preventDefault();
        }
        if (!this._incIconDisabled) {
            this._spinValue(true, true);
        }
        else {
            this.input.focus();
        }
    }
    /**
     * Calculates the time which should be waited until _spinValue function is called.
     */
    _calcWaitTimeout() {
        this._speed *= ACCELERATION;
        this._waitTimeout = ((this._waitTimeout - this._speed) < MIN_WAIT_TIMEOUT ? MIN_WAIT_TIMEOUT : (this._waitTimeout - this._speed));
        return this._waitTimeout;
    }
    /**
     * Called when the increment or decrement button is pressed and held to set new value.
     * @private
     * @param increment - is this the increment button or not so the values should be spin accordingly up or down
     * @param resetVariables - whether to reset the spin-related variables or not
     */
    _spinValue(increment, resetVariables = false) {
        if (resetVariables) {
            this._waitTimeout = INITIAL_WAIT_TIMEOUT;
            this._speed = INITIAL_SPEED;
            this._btnDown = true;
        }
        this._spinTimeoutId = setTimeout(() => {
            if (this._btnDown) {
                this._spinStarted = true;
                this._modifyValue(increment ? this.step : -this.step);
                this._setButtonState();
                if ((!this._incIconDisabled && increment) || (!this._decIconDisabled && !increment)) {
                    this._spinValue(increment);
                }
                else {
                    this._resetSpin();
                    this._fireChangeEvent();
                }
            }
        }, this._calcWaitTimeout());
    }
    /**
    * Resets spin process
    */
    _resetSpin() {
        clearTimeout(this._spinTimeoutId);
        this._btnDown = false;
        this._spinStarted = false;
    }
    /**
    * Resets spin process when mouse outs + or - buttons
    */
    _resetSpinOut() {
        if (this._btnDown) {
            this._resetSpin();
            this._fireChangeEvent();
        }
    }
};
__decorate([
    property({ type: Number })
], NumberInput.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], NumberInput.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], NumberInput.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], NumberInput.prototype, "step", void 0);
__decorate([
    property()
], NumberInput.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], NumberInput.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], NumberInput.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], NumberInput.prototype, "readonly", void 0);
__decorate([
    property()
], NumberInput.prototype, "placeholder", void 0);
__decorate([
    property()
], NumberInput.prototype, "name", void 0);
__decorate([
    property({ type: Number })
], NumberInput.prototype, "valuePrecision", void 0);
__decorate([
    property()
], NumberInput.prototype, "accessibleName", void 0);
__decorate([
    property()
], NumberInput.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], NumberInput.prototype, "_showStepButtons", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_externalAriaLabel", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_decIconDisabled", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_incIconDisabled", void 0);
__decorate([
    property({ type: Boolean })
], NumberInput.prototype, "focused", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_inputFocused", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_previousValue", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_waitTimeout", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_speed", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_btnDown", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_spinTimeoutId", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_spinStarted", void 0);
__decorate([
    property({ noAttribute: true })
], NumberInput.prototype, "_inputValue", void 0);
__decorate([
    slot()
], NumberInput.prototype, "valueStateMessage", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], NumberInput, "i18nBundle", void 0);
NumberInput = NumberInput_1 = __decorate([
    customElement({
        tag: "ui5-number-input",
        cldr: true,
        formAssociated: true,
        renderer: jsxRenderer,
        styles: NumberInputCss,
        template: NumberInputTemplate,
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
     */
    ,
    event("input", {
        cancelable: true,
        bubbles: true,
    })
    /**
     * Fired before the value state of the component is updated internally.
     * The event is preventable, meaning that if its default action is
     * prevented, the component will not update the value state.
     * @public
     * @param {string} valueState The new `valueState` that will be set.
     * @param {boolean} valid Indicator if the value is in between the min and max value.
     */
    ,
    event("value-state-change", {
        bubbles: true,
        cancelable: true,
    }),
    event("_request-submit", {
        bubbles: true,
    })
], NumberInput);
NumberInput.define();
export default NumberInput;
//# sourceMappingURL=NumberInput.js.map