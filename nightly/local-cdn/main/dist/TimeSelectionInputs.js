var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import { isEnter, isNumber, } from "@ui5/webcomponents-base/dist/Keys.js";
import TimePickerInternals from "./TimePickerInternals.js";
import InputType from "./types/InputType.js";
import { TIMEPICKER_INPUTS_ENTER_HOURS, TIMEPICKER_INPUTS_ENTER_MINUTES, TIMEPICKER_INPUTS_ENTER_SECONDS, } from "./generated/i18n/i18n-defaults.js";
// Template
import TimeSelectionInputsTemplate from "./TimeSelectionInputsTemplate.js";
// Styles
import TimeSelectionInputsCss from "./generated/themes/TimeSelectionInputs.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-time-selection-inputs` displays a popover with `ui5-input` components of type="number" and an
 * optional a AM/PM `ui5-segmented-button` according to the display format given to the `ui5-time-picker`.
 * Using of numeric input components enables display of mobile devices' native numeric keyboard, which speeds up entering of the time.
 * The popup appears only on mobile devices when there is a tap on the `ui5-time-picker` input.
 *
 * This component should not be used separately.
 * @constructor
 * @extends TimePickerInternals
 * @abstract
 * @since 1.18.0
 * @private
 */
let TimeSelectionInputs = class TimeSelectionInputs extends TimePickerInternals {
    constructor() {
        super(...arguments);
        this._editedInput = -1;
    }
    get enterHoursLabel() {
        return TimePickerInternals.i18nBundle.getText(TIMEPICKER_INPUTS_ENTER_HOURS);
    }
    get enterMinutesLabel() {
        return TimePickerInternals.i18nBundle.getText(TIMEPICKER_INPUTS_ENTER_MINUTES);
    }
    get enterSecondsLabel() {
        return TimePickerInternals.i18nBundle.getText(TIMEPICKER_INPUTS_ENTER_SECONDS);
    }
    get _numberType() {
        return InputType.Number;
    }
    get _isHoursInput() {
        const key = this._componentKey("hours");
        return this._componentMap[key] === this._activeIndex;
    }
    get _is24HoursFormat() {
        return this.formatPattern?.includes("HH") || this.formatPattern?.includes("H");
    }
    onBeforeRendering() {
        this._createComponents();
    }
    _addNumericAttributes() {
        this._entities.forEach((item, index) => {
            const input = this._inputComponent(index);
            if (input) {
                const innerInput = this._innerInput(input);
                innerInput.setAttribute("autocomplete", "off");
                innerInput.setAttribute("pattern", "[0-9]*");
                innerInput.setAttribute("inputmode", "numeric");
            }
        });
    }
    /**
     * Returns Input component by index or name.
     * @param indexOrName the index or name of the component
     * @returns component (if exists) or undefined
     */
    _inputComponent(indexOrName) {
        const index = typeof indexOrName === "string" ? this._indexFromName(indexOrName) : indexOrName;
        const entity = this._entities[index].entity;
        return entity ? this.shadowRoot?.querySelector(`#${this._id}_input_${entity}`) : undefined;
    }
    /**
     * Returns the inner input element DOM reference.
     * @param input the Input component
     * @returns inner input element
     */
    _innerInput(input) {
        return input && input.getInputDOMRefSync();
    }
    /**
     * Creates clock and button components according to the display format pattern.
     */
    _createComponents() {
        let value;
        this._entities = [];
        this._periods = [];
        this._componentMap = {
            hours: -1,
            minutes: -1,
            seconds: -1,
        };
        if (this._hasHoursComponent) {
            // add Hours input
            this._componentMap.hours = this._entities.length;
            value = parseInt(this._hours);
            this._entities.push({
                "entity": "hours",
                "label": this.enterHoursLabel,
                "value": value,
                "stringValue": this._editedInput === this._entities.length ? this._editedInputValue : this._formatNumberToString(value, this._zeroPaddedHours),
                "hasSeparator": this._entities.length > 0,
                "prependZero": this._zeroPaddedHours,
                "attributes": {
                    "min": this._hoursConfiguration.minHour,
                    "max": this._hoursConfiguration.maxHour,
                    "step": 1,
                },
            });
        }
        if (this._hasMinutesComponent) {
            // add Minutes clock
            this._componentMap.minutes = this._entities.length;
            value = parseInt(this._minutes);
            this._entities.push({
                "entity": "minutes",
                "label": this.enterMinutesLabel,
                "value": value,
                "stringValue": this._editedInput === this._entities.length ? this._editedInputValue : this._formatNumberToString(value, true),
                "hasSeparator": this._entities.length > 0,
                "prependZero": true,
                "attributes": {
                    "min": 0,
                    "max": 59,
                    "step": 1,
                },
            });
        }
        if (this._hasSecondsComponent) {
            // add Seconds clock
            this._componentMap.seconds = this._entities.length;
            value = parseInt(this._seconds);
            this._entities.push({
                "entity": "seconds",
                "label": this.enterSecondsLabel,
                "value": value,
                "stringValue": this._editedInput === this._entities.length ? this._editedInputValue : this._formatNumberToString(value, true),
                "hasSeparator": this._entities.length > 0,
                "prependZero": true,
                "attributes": {
                    "min": 0,
                    "max": 59,
                    "step": 1,
                },
            });
        }
        this._createPeriodComponent();
    }
    /**
     * Switches to the specific input.
     * @param index the index (in _entities array) of the input
     * @private
     */
    _switchInput(index) {
        if (index >= this._entities.length) {
            index = 0;
        }
        this._inputComponent(index).focus();
    }
    /**
     * Switches to the next input that can de focused.
     * @param wrapAround whether to start with first clock after reaching the last one, or not
     * @private
     */
    _switchNextInput(wrapAround = false) {
        let activeInput = this._activeIndex;
        const startActiveInput = activeInput;
        if (!this._entities.length) {
            return;
        }
        do {
            activeInput++;
            if (activeInput >= this._entities.length) {
                activeInput = wrapAround ? 0 : this._entities.length - 1;
            }
            // false-positive finding of no-unmodified-loop-condition rule
            // eslint-disable-next-line no-unmodified-loop-condition
        } while (this._inputComponent(activeInput).disabled && activeInput !== startActiveInput && (wrapAround || activeInput < this._entities.length));
        if (activeInput !== startActiveInput && !this._inputComponent(activeInput).disabled) {
            this._switchInput(activeInput);
        }
    }
    /**
     * Return a value as string, formatted and prepended with zero if necessary.
     * @param num A number to format
     * @param prependZero Whether to prepend with zero or not
     * @returns Formatted value
     * @private
     */
    _formatNumberToString(num, prependZero) {
        return num < 10 && prependZero ? `0${num}` : num.toString();
    }
    _onkeydown(evt) {
        if (this._activeIndex === -1) {
            return;
        }
        if (isEnter(evt)) {
            // Accept the time and close the popover
            this.fireDecoratorEvent("close-inputs");
        }
        else if (isNumber(evt) && this._entities[this._activeIndex]) {
            const char = evt.key;
            const buffer = this._keyboardBuffer + char;
            const bufferValue = parseInt(buffer);
            evt.preventDefault();
            this._resetCooldown(true);
            if (bufferValue > this._entities[this._activeIndex].attributes.max) {
                // value accumulated in the buffer (old entry + new entry) is greater than the input maximum value,
                // so assign old entry to the current inut and then switch to the next input, and add new entry as an old value
                this._inputChange(parseInt(this._keyboardBuffer));
                this._switchNextInput();
                this._keyboardBuffer = char;
                this._inputChange(parseInt(char));
                this._resetCooldown(true);
            }
            else {
                // value is less than clock's max value, so add new entry to the buffer
                this._keyboardBuffer = buffer;
                this._inputChange(parseInt(this._keyboardBuffer));
                if (this._keyboardBuffer.length === 2 || parseInt(`${this._keyboardBuffer}0`) > this._entities[this._activeIndex].attributes.max) {
                    // if buffer length is 2, or buffer value + one more (any) number is greater than clock's max value
                    // there is no place for more entry - just set buffer as a value, and switch to the next clock
                    this._resetCooldown(this._keyboardBuffer.length !== 2);
                    this._keyboardBuffer = "";
                    this._switchNextInput();
                }
            }
        }
    }
    /**
     * Input 'change' event handler.
     * @param value new value to set on active input
     */
    _inputChange(value) {
        const stringValue = this._formatNumberToString(value, this._entities[this._activeIndex].prependZero);
        if (this._activeIndex === -1) {
            return;
        }
        value = parseInt(stringValue);
        this._entities[this._activeIndex].value = value;
        this._inputComponent(this._activeIndex).value = this._formatNumberToString(value, this._entities[this._activeIndex].prependZero);
        switch (this._activeIndex) {
            case this._componentMap.hours:
                this._hoursChange(value);
                break;
            case this._componentMap.minutes:
                this._minutesChange(value);
                break;
            case this._componentMap.seconds:
                this._secondsChange(value);
                break;
        }
    }
    _onfocusin(e) {
        const input = e.target;
        const innerInput = this._innerInput(input);
        this._editedInput = -1;
        innerInput.select();
        this._activeIndex = this._getIndexFromId(input.id);
    }
    _onfocusout() {
        let value = this._inputComponent(this._activeIndex).value === "" ? 0 : this._entities[this._activeIndex].value;
        this._editedInput = -1;
        if (this._isHoursInput && !this._is24HoursFormat && value === 0) {
            value = 12;
        }
        this._inputChange(value);
        this._activeIndex = -1;
    }
    _oninput() {
        const stringValue = this._inputComponent(this._activeIndex).value;
        const value = stringValue === "" ? 0 : parseInt(stringValue);
        if (value !== this._entities[this._activeIndex].value) {
            this._editedInput = this._activeIndex;
            this._editedInputValue = stringValue;
            this._inputChange(value);
            this._keyboardBuffer = stringValue;
        }
    }
};
__decorate([
    property({ type: Number })
], TimeSelectionInputs.prototype, "_editedInput", void 0);
__decorate([
    property()
], TimeSelectionInputs.prototype, "_editedInputValue", void 0);
TimeSelectionInputs = __decorate([
    customElement({
        tag: "ui5-time-selection-inputs",
        styles: TimeSelectionInputsCss,
        template: TimeSelectionInputsTemplate,
    }),
    event("close-inputs", {
        bubbles: true,
    })
], TimeSelectionInputs);
TimeSelectionInputs.define();
export default TimeSelectionInputs;
//# sourceMappingURL=TimeSelectionInputs.js.map