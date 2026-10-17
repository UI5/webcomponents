var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import getTodayUTCTimestamp from "@ui5/webcomponents-localization/dist/dates/getTodayUTCTimestamp.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import DateComponentBase from "./DateComponentBase.js";
/**
 * @class
 *
 * Abstract base class for Calendar, DayPicker, MonthPicker and YearPicker that adds support for:
 *  - common properties (timestamp, selectedDates): declarations and methods that operate on them
 *  - other common code
 * @constructor
 * @extends DateComponentBase
 * @public
 */
let CalendarPart = class CalendarPart extends DateComponentBase {
    get _minTimestamp() {
        return this._minDate.valueOf() / 1000;
    }
    get _maxTimestamp() {
        return this._maxDate.valueOf() / 1000;
    }
    /**
     * Returns the effective timestamp to be used by the respective calendar part
     * @protected
     */
    get _timestamp() {
        let timestamp = this.timestamp !== undefined ? this.timestamp : getTodayUTCTimestamp(this._primaryCalendarType);
        if (this._maxTimestamp && this._maxTimestamp < timestamp) {
            timestamp = this._maxTimestamp;
        }
        else if (this._minTimestamp && this._minTimestamp > timestamp) {
            timestamp = this._minTimestamp;
        }
        return timestamp;
    }
    get _localDate() {
        return UI5Date.getInstance(this._timestamp * 1000);
    }
    /**
     * Returns a CalendarDate instance, representing the _timestamp getter - this date is central to all components' rendering logic
     * @protected
     */
    get _calendarDate() {
        return CalendarDate.fromTimestamp(this._localDate.getTime(), this._primaryCalendarType);
    }
    /**
     * Change a timestamp and enforce limits
     * @param timestamp
     * @protected
     */
    _safelySetTimestamp(timestamp) {
        const min = this._minDate.valueOf() / 1000;
        const max = this._maxDate.valueOf() / 1000;
        if (timestamp < min) {
            timestamp = min;
        }
        if (timestamp > max) {
            timestamp = max;
        }
        this.timestamp = timestamp;
    }
    /**
     * Modify a timestamp by a certain amount of days/months/years and enforce limits
     * @param amount
     * @param unit
     * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @protected
     */
    _safelyModifyTimestampBy(amount, unit, preserveDate) {
        const newDate = modifyDateBy(this._calendarDate, amount, unit, preserveDate);
        this._safelySetTimestamp(newDate.valueOf() / 1000);
    }
    _getTimestampFromDom(domNode) {
        const oMonthDomRef = domNode.getAttribute("data-sap-timestamp");
        return parseInt(oMonthDomRef);
    }
};
__decorate([
    property({ type: Number })
], CalendarPart.prototype, "timestamp", void 0);
CalendarPart = __decorate([
    customElement()
], CalendarPart);
export default CalendarPart;
//# sourceMappingURL=CalendarPart.js.map