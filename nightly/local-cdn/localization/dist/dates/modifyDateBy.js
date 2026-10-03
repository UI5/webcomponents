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
const modifyDateBy = (date, amount, unit, preserveDate = true, minDate, maxDate) => {
    const newDate = new CalendarDate(date);
    switch (unit) {
        case "day":
            newDate.setDate(date.getDate() + amount);
            break;
        case "month":
            if (preserveDate) {
                newDate.setMonth(date.getMonth() + amount);
                const stillSameMonth = amount === -1 && newDate.getMonth() === date.getMonth(); // f.e. PageUp remained in the same month
                const monthSkipped = amount === 1 && newDate.getMonth() - date.getMonth() > 1; // f.e. PageDown skipped a whole month
                if (stillSameMonth || monthSkipped) { // Select the last day of the month in any of these 2 scenarios
                    newDate.setDate(0);
                }
            }
            else {
                if (amount === 1) {
                    newDate.setMonth(newDate.getMonth() + 1, 1);
                }
                if (amount === -1) {
                    newDate.setDate(0);
                }
            }
            break;
        case "year":
            newDate.setYear(date.getYear() + amount);
            if (newDate.getMonth() !== date.getMonth()) { // f.e. 29th Feb to next/prev year
                newDate.setDate(0); // Select the last day of the month
            }
            break;
        default:
            break;
    }
    if (minDate && newDate.isBefore(minDate)) {
        return new CalendarDate(minDate);
    }
    if (maxDate && newDate.isAfter(maxDate)) {
        return new CalendarDate(maxDate);
    }
    return newDate;
};
export default modifyDateBy;
//# sourceMappingURL=modifyDateBy.js.map