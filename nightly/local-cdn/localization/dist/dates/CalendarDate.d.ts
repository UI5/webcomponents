import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import UI5Date from "./UI5Date.js";
import UniversalDate from "./UniversalDate.js";
declare class CalendarDate {
    _oUDate: UI5Date | Date | UniversalDate;
    constructor(year?: number | CalendarDate, month?: number | string, date?: number, calendarType?: string);
    getYear(): number;
    setYear(year: number): this;
    getMonth(): number;
    /**
     * Sets the given month as ordinal month of the year.
     * @param {int} month An integer between 0 and 11, representing the months January through December( or their
     * equivalent month names for the given calendar).
     * If the specified value is is outside of the expected range, this method attempts to update the date information
     * accordingly. For example, if 12 is given as a month, the year will be incremented by 1, and 1 will be used for month.
     * @param {int} [date] An integer between 1 and 31, representing the day of the month, but other values are allowed.
     * 0 will result in the previous month's last day.
     * -1 will result in the day before the previous month's last day.
     * 32 will result in:
     * - first day of the next month if the current month has 31 days.
     * - second day of the next month if the current month has 30 days.
     * Other value will result in adding or subtracting days according to the given value.
     * @returns {sap.ui.unified.calendar.CalendarDate} <code>this</code> for method chaining.
     */
    setMonth(month: number, date?: number): this;
    getDate(): number;
    setDate(date: number): this;
    getDay(): number;
    getCalendarType(): string;
    isBefore(oCalendarDate: CalendarDate): boolean;
    isAfter(oCalendarDate: CalendarDate): boolean;
    isSameOrBefore(oCalendarDate: CalendarDate): boolean;
    isSameOrAfter(oCalendarDate: CalendarDate): boolean;
    isSame(oCalendarDate: CalendarDate): boolean;
    toLocalJSDate(): import("sap/ui/core/date/UI5Date").default | Date;
    toUTCJSDate(): import("sap/ui/core/date/UI5Date").default | Date;
    toString(): string;
    valueOf(): number;
    static fromLocalJSDate(oJSDate: Date | UI5Date, sCalendarType?: `${CalendarType}`): CalendarDate;
    static fromTimestamp(iTimestamp: number, sCalendarType?: `${CalendarType}`): CalendarDate;
}
export default CalendarDate;
