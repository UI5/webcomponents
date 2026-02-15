import CalendarDate from "./CalendarDate.js";
/**
 * Adds or subtracts a given amount of days/months/years from a date.
 * If minDate or maxDate are given, the result will be enforced within these limits
 *
 * @param date CalendarDate instance
 * @param amount how many days/months/years to add (can be a negative number)
 * @param unit what to modify: "day", "month" or "year"
 * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
 * @param minDate minimum date to enforce
 * @param maxDate maximum date to enforce
 */
declare const modifyDateBy: (date: CalendarDate, amount: number, unit: string, preserveDate?: boolean, minDate?: CalendarDate, maxDate?: CalendarDate) => CalendarDate;
export default modifyDateBy;
