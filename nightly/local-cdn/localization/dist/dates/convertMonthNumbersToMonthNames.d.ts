import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
/**
 * Convert month number to month name (text).
 * If the numbers of the two months are the same you will get the name of the month,
 * otherwise you will get the two names separated by a dash
 *
 * @param firstMonth CalendarDate Month
 * @param lastMonth CalendarDate Month
 * @param calendarType calendar type
 * @returns {String}
 */
declare const convertMonthNumbersToMonthNames: (firstMonth: number, lastMonth: number, calendarType?: `${CalendarType}`) => {
    text: any;
    textInfo: any;
};
export default convertMonthNumbersToMonthNames;
