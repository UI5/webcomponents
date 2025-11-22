var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TimePickerInternals_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import { getHoursConfigByFormat, getTimeControlsByFormat } from "./timepicker-utils/TimeSlider.js";
import { TIMEPICKER_HOURS_LABEL, TIMEPICKER_MINUTES_LABEL, TIMEPICKER_SECONDS_LABEL, TIMEPICKER_CLOCK_DIAL_LABEL, } from "./generated/i18n/i18n-defaults.js";
const TYPE_COOLDOWN_DELAY = 1000; // Cooldown delay; 0 = disabled cooldown
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-time-picker-internals` is helper component that contains shared methods used in `ui5-time-selection-clocks`
 * and `<ui5-time-selection-inputs>` components and should not be used separately.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.15.0
 * @private
 */
let TimePickerInternals = TimePickerInternals_1 = class TimePickerInternals extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * The index of the active Clock/TogleSpinButton.
         * @default 0
         * @private
         */
        this._activeIndex = 0;
        /**
         * Contains currently available Time Picker components depending on time format.
         * @private
         */
        this._entities = [];
        /**
         * Contains currently available Button components depending on time format.
         * @private
         */
        this._periods = [];
        /**
         * Buffer for entered by keyboard numbers
         * @private
         */
        this._keyboardBuffer = "";
    }
    get _hoursConfiguration() {
        // @ts-ignore aFormatArray is a private API of DateFormat
        const formatArray = this.getFormat().aFormatArray;
        const hourFormat = formatArray.find(item => item.type.startsWith("hour")); // try to find an entry for the hours
        return getHoursConfigByFormat(hourFormat ? hourFormat.type : "hour0_23");
    }
    get _zeroPaddedHours() {
        // @ts-ignore aFormatArray is a private API of DateFormat
        const formatArray = this.getFormat().aFormatArray;
        const hourFormat = formatArray.find(item => item.type.startsWith("hour")); // try to find an entry for the hours
        // @ts-ignore digits is a private API of aFormatArray
        return !(hourFormat.digits && hourFormat.digits === 1);
    }
    get _neededComponents() {
        // @ts-ignore aFormatArray is a private API of DateFormat
        const formatArray = this.getFormat().aFormatArray;
        return getTimeControlsByFormat(formatArray, this._hoursConfiguration);
    }
    get _hasHoursComponent() {
        return this._neededComponents[0];
    }
    get _hasMinutesComponent() {
        return this._neededComponents[1];
    }
    get _hasSecondsComponent() {
        return this._neededComponents[2];
    }
    get _hasPeriodsComponent() {
        return this._neededComponents[3];
    }
    get dateValue() {
        return this.value ? this.getFormat().parse(this.value, undefined, undefined) : UI5Date.getInstance();
    }
    get validDateValue() {
        return this.value !== undefined && this.isValid(this.value) ? this.dateValue : UI5Date.getInstance();
    }
    get periodsArray() {
        // @ts-ignore aDayPeriodsAbbrev is a private API of DateFormat
        const dayPeriodsAbbrev = this.getFormat().aDayPeriodsAbbrev;
        return dayPeriodsAbbrev.map((x) => x.toUpperCase());
    }
    get _hours() {
        let hours;
        const dateValue = this.validDateValue;
        if (this._hoursConfiguration.isTwelveHoursFormat && dateValue.getHours() > this._hoursConfiguration.maxHour) {
            hours = dateValue.getHours() - 12;
        }
        else if (this._hoursConfiguration.isTwelveHoursFormat && dateValue.getHours() < this._hoursConfiguration.minHour) {
            hours = dateValue.getHours() + 12;
        }
        else {
            hours = dateValue.getHours();
        }
        if (hours.toString().length === 1 && this._zeroPaddedHours) {
            hours = `0${hours}`;
        }
        return hours.toString();
    }
    get _minutes() {
        const minutes = this.validDateValue.getMinutes().toString();
        return minutes.length === 1 ? `0${minutes}` : minutes;
    }
    get _seconds() {
        const seconds = this.validDateValue.getSeconds().toString();
        return seconds.length === 1 ? `0${seconds}` : seconds;
    }
    get _period() {
        let period;
        const dateValue = this.validDateValue;
        if (!this._hoursConfiguration.isTwelveHoursFormat) {
            return undefined;
        }
        if (this._hoursConfiguration.minHour === 1) {
            period = dateValue.getHours() >= this._hoursConfiguration.maxHour ? this.periodsArray[1] : this.periodsArray[0];
        }
        else {
            period = (dateValue.getHours() > this._hoursConfiguration.maxHour || dateValue.getHours() === this._hoursConfiguration.minHour) ? this.periodsArray[1] : this.periodsArray[0];
        }
        return period;
    }
    get _formatPattern() {
        const pattern = this.formatPattern;
        const hasHours = !!pattern?.match(/H/i);
        const fallback = !pattern || !hasHours;
        const localeData = getCachedLocaleDataInstance(getLocale());
        return fallback ? localeData.getCombinedDateTimePattern("medium", "medium", undefined) : pattern;
    }
    get _isPattern() {
        return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
    }
    get hoursLabel() {
        return TimePickerInternals_1.i18nBundle.getText(TIMEPICKER_HOURS_LABEL);
    }
    get minutesLabel() {
        return TimePickerInternals_1.i18nBundle.getText(TIMEPICKER_MINUTES_LABEL);
    }
    get secondsLabel() {
        return TimePickerInternals_1.i18nBundle.getText(TIMEPICKER_SECONDS_LABEL);
    }
    get clockDialAriaLabel() {
        return TimePickerInternals_1.i18nBundle.getText(TIMEPICKER_CLOCK_DIAL_LABEL);
    }
    setValue(date) {
        const value = this.formatValue(date);
        if (this.isValid(value)) {
            this.value = this.normalizeValue(value);
            this.fireDecoratorEvent("change", { value: this.value, valid: true });
        }
    }
    isValid(value) {
        return value === "" || this.getFormat().parse(value, undefined, undefined);
    }
    normalizeValue(value) {
        if (value === "") {
            return value;
        }
        return this.getFormat().format(this.getFormat().parse(value, undefined, undefined));
    }
    getFormat() {
        let dateFormat;
        if (this._isPattern) {
            dateFormat = DateFormat.getDateInstance({
                calendarType: this._calendarType,
                pattern: this._formatPattern,
            });
        }
        else {
            dateFormat = DateFormat.getDateInstance({
                calendarType: this._calendarType,
                style: this._formatPattern,
            });
        }
        return dateFormat;
    }
    formatValue(date) {
        return this.getFormat().format(date);
    }
    _componentKey(name) {
        return name;
    }
    _indexFromName(name) {
        return this._componentMap[this._componentKey(name)];
    }
    /**
     * Returns name of the clock or button from the id of the event target.
     * @returns name of the clock/button
     */
    _getNameFromId(id) {
        const parts = id.split("_");
        return parts.length ? parts[parts.length - 1] : undefined;
    }
    /**
     * Returns index of the clock or button from the id of the event target.
     * @returns index of the clock/button
     */
    _getIndexFromId(id) {
        const name = this._getNameFromId(id);
        return name ? this._indexFromName(name) : 0;
    }
    /**
     * Changes hours value.
     * @param hours new hours value
     */
    _hoursChange(hours) {
        if (this._hoursConfiguration.isTwelveHoursFormat) {
            hours = this._shiftHours(hours);
        }
        const date = this.validDateValue;
        date.setHours(hours);
        this.setValue(date);
    }
    /**
     * Changes minutes value.
     * @param minutes new minutes value
     */
    _minutesChange(minutes) {
        const date = this.validDateValue;
        date.setMinutes(minutes);
        this.setValue(date);
    }
    /**
     * Changes seconds value.
     * @param seconds new seconds value
     */
    _secondsChange(seconds) {
        const date = this.validDateValue;
        date.setSeconds(seconds);
        this.setValue(date);
    }
    _buttonAmPm() {
        return this._hasPeriodsComponent ? this.shadowRoot?.querySelector(`#${this._id}_AmPm`) : undefined;
    }
    _createPeriodComponent() {
        if (this._hasPeriodsComponent) {
            // add period item
            this.periodsArray.forEach(item => {
                this._periods.push({
                    "label": item,
                    "selected": this._period === item,
                });
            });
        }
    }
    _periodChange(evt) {
        const periodItem = evt.target;
        if (periodItem) {
            const period = periodItem.textContent;
            this._calculatePeriodChange(period);
        }
    }
    _calculatePeriodChange(period) {
        const date = this.validDateValue;
        if (period === this._periods[0].label && date.getHours() >= 12) {
            date.setHours(date.getHours() - 12);
        }
        if (period === this._periods[1].label && date.getHours() < 12) {
            date.setHours(date.getHours() + 12);
        }
        this.setValue(date);
    }
    /**
     * Shifts hours value with +/- 12 depending on hour value and day period.
     * @param hours current hours
     * @returns shifted hours
     */
    _shiftHours(hours) {
        if (this._period === this.periodsArray[0]) { // AM
            hours = hours === 12 ? 0 : hours;
        }
        else if (this._period === this.periodsArray[1]) { // PM
            hours = hours === 12 ? hours : hours + 12;
        }
        return hours;
    }
    /**
     * Clears the currently existing cooldown period and starts new one if requested.
     * @param startNewCooldown whether to start new cooldown period after clearing previous one
     */
    _resetCooldown(startNewCooldown) {
        if (!TYPE_COOLDOWN_DELAY) {
            return; // if delay is 0, cooldown is disabled
        }
        if (this._typeCooldownId) {
            clearTimeout(this._typeCooldownId);
        }
        if (startNewCooldown) {
            this._startCooldown();
        }
    }
    /**
     * Starts new cooldown period.
     */
    _startCooldown() {
        if (!TYPE_COOLDOWN_DELAY) {
            return; // if delay is 0, cooldown is disabled
        }
        this._typeCooldownId = setTimeout(() => {
            this._keyboardBuffer = "";
            this._typeCooldownId = undefined;
            if (this._exactMatch) {
                this._setExactMatch();
                this._exactMatch = undefined;
            }
        }, TYPE_COOLDOWN_DELAY);
    }
    /**
     * Sets the exact match value. Override if necessary.
     */
    _setExactMatch() { }
};
__decorate([
    property()
], TimePickerInternals.prototype, "value", void 0);
__decorate([
    property()
], TimePickerInternals.prototype, "formatPattern", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], TimePickerInternals.prototype, "_activeIndex", void 0);
__decorate([
    property()
], TimePickerInternals.prototype, "_calendarType", void 0);
__decorate([
    property({ type: Array })
], TimePickerInternals.prototype, "_entities", void 0);
__decorate([
    property({ type: Object })
], TimePickerInternals.prototype, "_componentMap", void 0);
__decorate([
    property({ type: Array })
], TimePickerInternals.prototype, "_periods", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], TimePickerInternals.prototype, "_typeCooldownId", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], TimePickerInternals.prototype, "_exactMatch", void 0);
__decorate([
    property({ noAttribute: true })
], TimePickerInternals.prototype, "_keyboardBuffer", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], TimePickerInternals, "i18nBundle", void 0);
TimePickerInternals = TimePickerInternals_1 = __decorate([
    customElement({
        cldr: true,
        renderer: jsxRenderer,
    })
    /**
     * Fired when the value changes due to user interaction with the sliders.
     */
    ,
    event("change", {
        bubbles: true,
    })
], TimePickerInternals);
export default TimePickerInternals;
//# sourceMappingURL=TimePickerInternals.js.map