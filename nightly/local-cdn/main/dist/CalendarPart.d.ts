import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
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
declare class CalendarPart extends DateComponentBase {
    /**
     * The timestamp of the currently focused date. Set this property to move the component's focus to a certain date.
     * **Node:** Timestamp is 10-digit Integer representing the seconds (not milliseconds) since the Unix Epoch.
     * @protected
     */
    timestamp?: number;
    get _minTimestamp(): number;
    get _maxTimestamp(): number;
    /**
     * Returns the effective timestamp to be used by the respective calendar part
     * @protected
     */
    get _timestamp(): number;
    get _localDate(): Date | import("sap/ui/core/date/UI5Date").default;
    /**
     * Returns a CalendarDate instance, representing the _timestamp getter - this date is central to all components' rendering logic
     * @protected
     */
    get _calendarDate(): CalendarDate;
    /**
     * Change a timestamp and enforce limits
     * @param timestamp
     * @protected
     */
    _safelySetTimestamp(timestamp: number): void;
    /**
     * Modify a timestamp by a certain amount of days/months/years and enforce limits
     * @param amount
     * @param unit
     * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @protected
     */
    _safelyModifyTimestampBy(amount: number, unit: string, preserveDate?: boolean): void;
    _getTimestampFromDom(domNode: HTMLElement): number;
}
export default CalendarPart;
