var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TimePicker_1;
import { isDesktop, isPhone, isTablet } from "@ui5/webcomponents-base/dist/Device.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import { submitForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts, getAllAccessibleNameRefTexts, getEffectiveAriaDescriptionText, getAllAccessibleDescriptionRefTexts, } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import IconMode from "./types/IconMode.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import { isShow, isPageUp, isPageDown, isPageUpShift, isPageDownShift, isPageUpShiftCtrl, isPageDownShiftCtrl, isTabNext, isTabPrevious, isF6Next, isF6Previous, } from "@ui5/webcomponents-base/dist/Keys.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import TimePickerTemplate from "./TimePickerTemplate.js";
import { TIMEPICKER_SUBMIT_BUTTON, TIMEPICKER_CANCEL_BUTTON, TIMEPICKER_INPUT_DESCRIPTION, TIMEPICKER_POPOVER_ACCESSIBLE_NAME, DATETIME_COMPONENTS_PLACEHOLDER_PREFIX, VALUE_STATE_ERROR, VALUE_STATE_INFORMATION, VALUE_STATE_SUCCESS, VALUE_STATE_WARNING, TIMEPICKER_VALUE_MISSING, TIMEPICKER_PATTERN_MISSMATCH, TIMEPICKER_OPEN_ICON_TITLE_OPENED, TIMEPICKER_OPEN_ICON_TITLE, INPUT_SUGGESTIONS_TITLE, } from "./generated/i18n/i18n-defaults.js";
// Styles
import TimePickerCss from "./generated/themes/TimePicker.css.js";
import TimePickerPopoverCss from "./generated/themes/TimePickerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
const DEFAULT_ISO_FORMAT = "HH:mm:ss";
/**
 * @class
 *
 * ### Overview
 * The `ui5-time-picker` component provides an input field with assigned clocks which are opened on user action.
 * The `ui5-time-picker` allows users to select a localized time using touch, mouse, or keyboard input.
 * It consists of two parts: the time input field and the clocks.
 *
 * ### Usage
 * The user can enter a time by:
 *
 * - Using the clocks that are displayed in a popup
 * - Typing it in directly in the input field
 *
 * When the user makes an entry and chooses the enter key, the clocks show the corresponding time (hours, minutes and seconds separately).
 * When the user directly triggers the clocks display, the actual time is displayed.
 * For the `ui5-time-picker`
 *
 * ### Formatting
 *
 * If a time is entered by typing it into
 * the input field, it must fit to the used time format.
 *
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see [UTS #35: Unicode Locale Data Markup Language](https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 *
 * For example, if the valueFormat is "HH:mm:ss", the displayFormat is "hh:mm: ss a", and the used locale is English, a valid value string is "11:42:35", which leads to an output of "11:42:35 AM".
 * If no placeholder is set to the TimePicker, the used displayFormat is displayed as a placeholder. If another placeholder is needed, it must be set.
 *
 * ### Keyboard handling
 * [F4], [Alt]+[Up], [Alt]+[Down] Open/Close picker dialog and move focus to it.
 *
 * When closed:
 *
 * - [Page Up] - Increments hours by 1. If 12 am is reached, increment hours to 1 pm and vice versa.
 * - [Page Down] - Decrements the corresponding field by 1. If 1 pm is reached, decrement hours to 12 am and vice versa.
 * - [Shift]+[Page Up] - Increments minutes by 1.
 * - [Shift]+[Page Down] - Decrements minutes by 1.
 * - [Shift]+[Ctrl]+[Page Up] - Increments seconds by 1.
 * - [Shift]+[Ctrl]+[Page Down] - Decrements seconds by 1.
 * -
 *
 * When opened:
 *
 * - [Page Up] - Increments hours by 1. If 12 am is reached, increment hours to 1 pm and vice versa.
 * - [Page Down] - Decrements the corresponding field by 1. If 1 pm is reached, decrement hours to 12 am and vice versa.
 * - [Shift]+[Page Up] - Increments minutes by 1.
 * - [Shift]+[Page Down] - Decrements minutes by 1.
 * - [Shift]+[Ctrl]+[Page Up] - Increments seconds by 1.
 * - [Shift]+[Ctrl]+[Page Down] - Decrements seconds by 1.
 * - [A] or [P] - Selects AM or PM respectively.
 * - [0]-[9] - Allows direct time selecting (hours/minutes/seconds).
 * - [:] - Allows switching between hours/minutes/seconds clocks. If the last clock is displayed and [:] is pressed, the first clock is beind displayed.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TimePicker.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.6
 * @csspart input - Used to style the input element. This part is forwarded to the underlying ui5-input element.
 */
let TimePicker = TimePicker_1 = class TimePicker extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines a formatted time value.
         * @default ""
         * @formEvents change input
         * @formProperty
         * @public
         */
        this.value = "";
        /**
         * Defines the value state of the component.
         * @default "None"
         * @public
         */
        this.valueState = "None";
        /**
         * Defines the disabled state of the comonent.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines the readonly state of the comonent.
         * @default false
         * @public
         */
        this.readonly = false;
        /**
         * Defines the open or closed state of the popover.
         * @public
         * @default false
         * @since 2.0.0
         */
        this.open = false;
        /**
         * Defines whether the component is required.
         * @since 2.1.0
         * @default false
         * @public
         */
        this.required = false;
        this._isInputsPopoverOpen = false;
    }
    get formValidityMessage() {
        const validity = this.formValidity;
        if (validity.valueMissing) {
            // @ts-ignore oFormatOptions is a private API of DateFormat
            return TimePicker_1.i18nBundle.getText(TIMEPICKER_VALUE_MISSING, this.getValueFormat().oFormatOptions.pattern);
        }
        if (validity.patternMismatch) {
            // @ts-ignore oFormatOptions is a private API of DateFormat
            return TimePicker_1.i18nBundle.getText(TIMEPICKER_PATTERN_MISSMATCH, this.getValueFormat().oFormatOptions.pattern);
        }
        return "";
    }
    get formValidity() {
        return {
            valueMissing: this.required && !this.value,
            patternMismatch: !this.isValidValue(this.value),
        };
    }
    async formElementAnchor() {
        return (await this.getFocusDomRefAsync())?.getFocusDomRefAsync();
    }
    get formFormattedValue() {
        return this.value || "";
    }
    onBeforeRendering() {
        if (this.value) {
            this.value = this.normalizeValue(this.value) || this.value;
        }
        this.tempValue = this.value && this.isValid(this.value) ? this.value : this.getFormat().format(UI5Date.getInstance());
    }
    get roleDescription() {
        return TimePicker_1.i18nBundle.getText(TIMEPICKER_INPUT_DESCRIPTION);
    }
    get pickerAccessibleName() {
        return TimePicker_1.i18nBundle.getText(TIMEPICKER_POPOVER_ACCESSIBLE_NAME, this.ariaLabelText);
    }
    get accInfo() {
        return {
            "ariaRoledescription": this.roleDescription,
            "ariaHasPopup": "grid",
            "ariaRequired": this.required,
            "ariaLabel": this.ariaLabelText || undefined,
            "ariaDescription": getAllAccessibleDescriptionRefTexts(this) || getEffectiveAriaDescriptionText(this) || undefined,
        };
    }
    get ariaLabelText() {
        return getAllAccessibleNameRefTexts(this) || getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this) || "";
    }
    /**
     * Currently selected time represented as JavaScript Date instance
     * @public
     * @default null
     */
    get dateValue() {
        return this.getValueFormat().parse(this._effectiveValue);
    }
    get _lastAvailableTime() {
        const date = UI5Date.getInstance();
        date.setHours(23, 59, 59, 999);
        return this.getValueFormat().format(date);
    }
    /**
     * @protected
     */
    get _placeholder() {
        if (this.placeholder) {
            return this.placeholder;
        }
        // translatable placeholder – for example "e.g. 23:59:59"
        return `${TimePicker_1.i18nBundle.getText(DATETIME_COMPONENTS_PLACEHOLDER_PREFIX)} ${this._lastAvailableTime}`;
    }
    /**
     * @protected
     */
    get _formatPattern() {
        const hasHours = !!this.formatPattern?.match(/H/i);
        const fallback = !this.formatPattern || !hasHours;
        const localeData = getCachedLocaleDataInstance(getLocale());
        return fallback ? localeData.getTimePattern("medium") : this.formatPattern;
    }
    get _displayFormat() {
        if (this.displayFormat) {
            return this.displayFormat;
        }
        if (this._formatPattern) {
            return this._formatPattern;
        }
    }
    get _valueFormat() {
        if (this.valueFormat) {
            return this.valueFormat;
        }
        if (this.formatPattern) {
            return this._formatPattern;
        }
        return "";
    }
    get _effectiveValue() {
        return this.value;
    }
    get _timeSelectionValue() {
        return this.tempValue;
    }
    get _isPhone() {
        return isPhone();
    }
    get _isMobileDevice() {
        return !isDesktop() && (isPhone() || isTablet());
    }
    get shouldDisplayValueStateMessageInResponsivePopover() {
        return this.hasValueStateText && !this._inputsPopover?.open;
    }
    /**
     * Defines whether the value help icon is hidden
     * @private
     */
    get _iconMode() {
        return isDesktop() ? IconMode.Decorative : IconMode.Interactive;
    }
    onTimeSelectionChange(e) {
        this.tempValue = e.detail.value; // every time the user changes the time selection -> update tempValue
    }
    get openIconTitle() {
        if (this.open) {
            return TimePicker_1.i18nBundle.getText(TIMEPICKER_OPEN_ICON_TITLE_OPENED);
        }
        return TimePicker_1.i18nBundle.getText(TIMEPICKER_OPEN_ICON_TITLE);
    }
    _togglePicker() {
        this.open = !this.open;
        if (this._isMobileDevice) {
            this._inputsPopover.open = false;
        }
    }
    submitPickers() {
        this._updateValueAndFireEvents(this.tempValue, true, ["change", "value-changed"]);
        this._togglePicker();
    }
    onResponsivePopoverAfterClose() {
        this.open = false;
        this.fireDecoratorEvent("close");
    }
    onResponsivePopoverBeforeOpen() {
        const clocks = this._timeSelectionClocks;
        if (clocks) {
            clocks._activeIndex = 0;
            clocks._skipAnimation = true;
        }
    }
    onResponsivePopoverAfterOpen() {
        this.fireDecoratorEvent("open");
    }
    /**
     * Opens the Inputs popover.
     * @private
     * @returns Resolves when the Inputs popover is open
     */
    openInputsPopover() {
        this.tempValue = this.value && this.isValidValue(this.value) ? this.value : this.getValueFormat().format(UI5Date.getInstance());
        const popover = this._inputsPopover;
        popover.opener = this;
        popover.open = true;
        this._isInputsPopoverOpen = true;
    }
    /**
     * Closes the Inputs popover
     * @private
     * @returns Resolves when the Inputs popover is closed
     */
    closeInputsPopover() {
        const popover = this._inputsPopover;
        popover.open = false;
    }
    toggleInputsPopover() {
        if (this.isInputsPopoverOpen()) {
            this.closeInputsPopover();
        }
        else if (this._canOpenInputsPopover()) {
            this.openInputsPopover();
        }
    }
    /**
     * Checks if the inputs popover is open
     * @private
     */
    isInputsPopoverOpen() {
        return !!this._isInputsPopoverOpen;
    }
    submitInputsPopover() {
        this._updateValueAndFireEvents(this.tempValue, true, ["change", "value-changed"]);
        this.closeInputsPopover();
    }
    onInputsPopoverAfterOpen() {
        const popover = this._inputsPopover;
        popover.querySelector("[ui5-time-selection-inputs]")._addNumericAttributes();
    }
    onInputsPopoverAfterClose() {
        this._isInputsPopoverOpen = false;
    }
    _handleInputClick(e) {
        const target = e.target;
        if (this.open) {
            return;
        }
        if (this._isMobileDevice && target && !target.hasAttribute("ui5-icon")) {
            this.toggleInputsPopover();
        }
        const inputField = this._getInputField();
        if (inputField) {
            inputField.select();
        }
    }
    _updateValueAndFireEvents(value, normalizeValue, eventsNames) {
        const isInputEvent = eventsNames.includes("input");
        const valid = this.isValidValue(value);
        let normalizedValue = value;
        // Only normalize if valid - if invalid, keep raw value
        if (value !== undefined && valid && normalizeValue && !isInputEvent) {
            normalizedValue = this.normalizeValue(value); // transform valid values (in any format) to the correct format
        }
        // Store the previous value to check if it actually changed
        const previousValue = this.value;
        // During input events (live typing), only update tempValue, not the public value property
        if (!isInputEvent) {
            this.value = ""; // Do not remove! DurationPicker (an external component extending TimePicker) use case
            this.value = normalizedValue;
        }
        // Always sync tempValue for the picker
        this.tempValue = isInputEvent ? value : normalizedValue;
        this._updateValueState(); // Change the value state to Error/None, but only if needed (must be called before early return)
        if (previousValue === this.value) {
            return;
        }
        eventsNames.forEach(eventName => {
            this.fireDecoratorEvent(eventName, { value, valid });
        });
    }
    _updateValueState() {
        // During live typing, validate against displayFormat (what user types), otherwise validate against valueFormat (stored value)
        const isValid = this.isValidValue(this.value);
        if (!isValid) { // If not valid - always set Error regardless of the current value state
            this.valueState = ValueState.Negative;
        }
        else if (isValid && this.valueState === ValueState.Negative) { // However if valid, change only Error (but not the others) to None
            this.valueState = ValueState.None;
        }
    }
    _handleInputChange(e) {
        const target = e.target;
        this._updateValueAndFireEvents(target.value, true, ["change", "value-changed"]);
    }
    _onInputRequestSubmit() {
        if (this._internals.form) {
            submitForm(this);
        }
    }
    _handleInputLiveChange(e) {
        if (this._isPhone) {
            e.preventDefault();
        }
        const target = e.target;
        this._updateValueAndFireEvents(target.value, false, ["input"]);
    }
    _canOpenPicker() {
        return !this.disabled && !this.readonly;
    }
    _canOpenInputsPopover() {
        return !this.disabled && this._isMobileDevice;
    }
    _getInputField() {
        const input = this._dateTimeInput;
        return input && input.getInputDOMRef();
    }
    _onkeydown(e) {
        if (this._isMobileDevice && !this.isInputsPopoverOpen()) {
            e.preventDefault();
        }
        if (isShow(e)) {
            e.preventDefault();
            this._togglePicker();
        }
        const target = e.target;
        if (target && this.open && this._dateTimeInput.id === target.id && (isTabNext(e) || isTabPrevious(e) || isF6Next(e) || isF6Previous(e))) {
            this._togglePicker();
        }
        if (this.open) {
            return;
        }
        if (isPageUpShiftCtrl(e)) {
            e.preventDefault();
            this._modifyValueBy(1, "second");
        }
        else if (isPageUpShift(e)) {
            e.preventDefault();
            this._modifyValueBy(1, "minute");
        }
        else if (isPageUp(e)) {
            e.preventDefault();
            this._modifyValueBy(1, "hour");
        }
        else if (isPageDownShiftCtrl(e)) {
            e.preventDefault();
            this._modifyValueBy(-1, "second");
        }
        else if (isPageDownShift(e)) {
            e.preventDefault();
            this._modifyValueBy(-1, "minute");
        }
        else if (isPageDown(e)) {
            e.preventDefault();
            this._modifyValueBy(-1, "hour");
        }
    }
    get _isPattern() {
        return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
    }
    get _isValueFormatPattern() {
        return this._valueFormat !== "medium" && this._valueFormat !== "short" && this._valueFormat !== "long";
    }
    get _isDisplayFormatPattern() {
        return this._displayFormat !== "medium" && this._displayFormat !== "short" && this._displayFormat !== "long";
    }
    get displayValue() {
        if (!this.value) {
            return "";
        }
        if (!this.getValueFormat().parse(this.value, true)) {
            return this.value;
        }
        return this.getDisplayFormat().format(this.getValueFormat().parse(this.value, true), true);
    }
    getFormat() {
        let dateFormat;
        if (this._isPattern) {
            dateFormat = DateFormat.getDateInstance({
                strictParsing: true,
                pattern: this._formatPattern,
            });
        }
        else {
            dateFormat = DateFormat.getDateInstance({
                strictParsing: true,
                style: this._formatPattern,
            });
        }
        return dateFormat;
    }
    getISOFormat() {
        if (!this._isoFormatInstance) {
            this._isoFormatInstance = DateFormat.getTimeInstance({
                strictParsing: true,
                pattern: DEFAULT_ISO_FORMAT,
            });
        }
        return this._isoFormatInstance;
    }
    getDisplayFormat() {
        // If no displayFormat is set, use the deprecated getFormat() for backward compatibility
        if (!this._displayFormat) {
            return this.getFormat();
        }
        return this._isDisplayFormatPattern
            ? DateFormat.getDateInstance({
                strictParsing: true,
                pattern: this._displayFormat,
            })
            : DateFormat.getDateInstance({
                strictParsing: true,
                style: this._displayFormat,
            });
    }
    getValueFormat() {
        if (!this._valueFormat) {
            return this.getISOFormat();
        }
        return this._isValueFormatPattern
            ? DateFormat.getTimeInstance({
                strictParsing: true,
                pattern: this._valueFormat,
            })
            : DateFormat.getTimeInstance({
                strictParsing: true,
                style: this._valueFormat,
            });
    }
    /**
     * Formats a Java Script date object into a string representing a locale date and time
     * according to the `formatPattern` property of the TimePicker instance
     * @param date A Java Script date object to be formatted as string
     * @public
     * @returns formatted value
     */
    formatValue(date) {
        return this.getValueFormat().format(date);
    }
    /**
     * Checks if a value is valid against the current `formatPattern` value.
     *
     * **Note:** an empty string is considered as valid value.
     * @param value The value to be tested against the current date format
     * @public
     */
    isValid(value) {
        if (value === "") {
            return true;
        }
        return !!this.getFormat().parse(value, true);
    }
    isValidDisplayValue(value) {
        if (value === "") {
            return true;
        }
        return !!this.getDisplayFormat().parse(value, true);
    }
    /**
     * Checks if a value is valid against the current `valueFormat` value.
     *
     * **Note:** an empty string is considered as valid value.
     * @param value The value to be tested against the value format
     * @public
     * @since 2.21.0
     */
    isValidValue(value) {
        if (value === "") {
            return true;
        }
        return !!this.getValueFormat().parse(value, true);
    }
    /**
     * Converts a value from displayFormat to valueFormat
     * @param value Value in displayFormat
     * @returns Value in valueFormat
     * @private
     */
    getValueFromDisplayValue(value) {
        if (!this.getDisplayFormat().parse(value, true)) {
            return value;
        }
        return this.getValueFormat().format(this.getDisplayFormat().parse(value, true), true);
    }
    /**
     * Converts a value from valueFormat to displayFormat
     * @param value Value in valueFormat
     * @returns Value in displayFormat
     * @private
     */
    getDisplayValueFromValue(value) {
        if (!this.getValueFormat().parse(value, true)) {
            return value;
        }
        return this.getDisplayFormat().format(this.getValueFormat().parse(value, true), true);
    }
    normalizeValue(value) {
        if (value === "") {
            return value;
        }
        const parsedFromDisplay = this.getDisplayFormat().parse(value, true);
        if (parsedFromDisplay) {
            return this.getValueFormat().format(parsedFromDisplay, true);
        }
        const parsedFromValue = this.getValueFormat().parse(value, true);
        if (parsedFromValue) {
            return this.getValueFormat().format(parsedFromValue, true);
        }
        return value;
    }
    _modifyValueBy(amount, unit) {
        const date = this.getValueFormat().parse(this._effectiveValue);
        if (!date) {
            return;
        }
        if (unit === "hour") {
            date.setHours(date.getHours() + amount);
        }
        else if (unit === "minute") {
            date.setMinutes(date.getMinutes() + amount);
        }
        else if (unit === "second") {
            date.setSeconds(date.getSeconds() + amount);
        }
        const newValue = this.formatValue(date);
        this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
    }
    /**
     * The listener for this event can't be passive as it calls preventDefault()
     * @param e Wheel Event
     * @private
     */
    _handleWheel(e) {
        e.preventDefault();
    }
    /**
     * Hides mobile device keyboard by temporary setting the input to readonly state.
     */
    _hideMobileKeyboard() {
        this._dateTimeInput.readonly = true;
        setTimeout(() => { this._dateTimeInput.readonly = false; }, 0);
    }
    _onfocusin(e) {
        if (this._isMobileDevice) {
            this._hideMobileKeyboard();
            if (this._isInputsPopoverOpen) {
                const popover = this._inputsPopover;
                popover.applyFocus();
            }
            e.preventDefault();
        }
    }
    get valueStateDefaultText() {
        if (this.valueState === ValueState.None) {
            return;
        }
        return this.valueStateTextMappings[this.valueState];
    }
    get valueStateTextMappings() {
        return {
            [ValueState.Positive]: TimePicker_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            [ValueState.Negative]: TimePicker_1.i18nBundle.getText(VALUE_STATE_ERROR),
            [ValueState.Critical]: TimePicker_1.i18nBundle.getText(VALUE_STATE_WARNING),
            [ValueState.Information]: TimePicker_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
        };
    }
    get shouldDisplayDefaultValueStateMessage() {
        return !willShowContent(this.valueStateMessage) && this.hasValueStateText;
    }
    get submitButtonLabel() {
        return TimePicker_1.i18nBundle.getText(TIMEPICKER_SUBMIT_BUTTON);
    }
    get cancelButtonLabel() {
        return TimePicker_1.i18nBundle.getText(TIMEPICKER_CANCEL_BUTTON);
    }
    get hasValueStateText() {
        return this.hasValueState && this.valueState !== ValueState.Positive;
    }
    get hasValueState() {
        return this.valueState !== ValueState.None;
    }
    get shouldDisplayValueStateMessageOnDesktop() {
        return this.valueStateMessage.length > 0 && !this.open && !this._isMobileDevice;
    }
    get _headerTitleText() {
        return this.ariaLabelText || TimePicker_1.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
    }
    get showHeader() {
        return isPhone();
    }
    /**
     * Defines whether the dialog on mobile should have header
     * @private
     */
    get _shouldHideHeader() {
        return !this.showHeader && !this.hasValueStateText;
    }
    /**
     * @protected
     */
    get openIconName() {
        return "time-entry-request";
    }
};
__decorate([
    property()
], TimePicker.prototype, "value", void 0);
__decorate([
    property()
], TimePicker.prototype, "name", void 0);
__decorate([
    property()
], TimePicker.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], TimePicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], TimePicker.prototype, "readonly", void 0);
__decorate([
    property()
], TimePicker.prototype, "placeholder", void 0);
__decorate([
    property()
], TimePicker.prototype, "displayFormat", void 0);
__decorate([
    property()
], TimePicker.prototype, "valueFormat", void 0);
__decorate([
    property()
], TimePicker.prototype, "formatPattern", void 0);
__decorate([
    property({ type: Boolean })
], TimePicker.prototype, "open", void 0);
__decorate([
    property({ type: Boolean })
], TimePicker.prototype, "required", void 0);
__decorate([
    property()
], TimePicker.prototype, "accessibleName", void 0);
__decorate([
    property()
], TimePicker.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], TimePicker.prototype, "accessibleDescription", void 0);
__decorate([
    property()
], TimePicker.prototype, "accessibleDescriptionRef", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TimePicker.prototype, "_isInputsPopoverOpen", void 0);
__decorate([
    slot()
], TimePicker.prototype, "valueStateMessage", void 0);
__decorate([
    query("[ui5-time-selection-clocks]")
], TimePicker.prototype, "_timeSelectionClocks", void 0);
__decorate([
    query("[ui5-popover]")
], TimePicker.prototype, "_inputsPopover", void 0);
__decorate([
    query("[ui5-datetime-input]")
], TimePicker.prototype, "_dateTimeInput", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], TimePicker, "i18nBundle", void 0);
TimePicker = TimePicker_1 = __decorate([
    customElement({
        tag: "ui5-time-picker",
        languageAware: true,
        cldr: true,
        formAssociated: true,
        renderer: jsxRenderer,
        template: TimePickerTemplate,
        styles: [
            TimePickerCss,
            ResponsivePopoverCommonCss,
            TimePickerPopoverCss,
            ValueStateMessageCss,
        ],
    })
    /**
     * Fired when the input operation has finished by clicking the "OK" button or
     * when the text in the input field has changed and the focus leaves the input field.
     * @public
     * @param {string} value The submitted value.
     * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
     */
    ,
    event("change", {
        bubbles: true,
    })
    /**
     * Fired when the value of the `ui5-time-picker` is changed at each key stroke.
     * @public
     * @param {string} value The current value.
     * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
     */
    ,
    event("input", {
        bubbles: true,
    })
    /**
     * Fired after the value-help dialog of the component is opened.
     * @since 2.0.0
     * @public
     */
    ,
    event("open", {
        bubbles: true,
    })
    /**
     * Fired after the value-help dialog of the component is closed.
     * @since 2.0.0
     * @public
     */
    ,
    event("close", {
        bubbles: true,
    })
], TimePicker);
TimePicker.define();
export default TimePicker;
//# sourceMappingURL=TimePicker.js.map