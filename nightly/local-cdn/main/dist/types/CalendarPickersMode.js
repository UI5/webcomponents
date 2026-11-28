/**
 * Defines which pickers the calendar is allowed to show - day/month/year, only month/year, or only year.
 * @private
 */
var CalendarPickersMode;
(function (CalendarPickersMode) {
    /**
     * User can select days, months and years
     * @private
     */
    CalendarPickersMode["DAY_MONTH_YEAR"] = "DAY_MONTH_YEAR";
    /**
     * User can select months and years
     * @private
     */
    CalendarPickersMode["MONTH_YEAR"] = "MONTH_YEAR";
    /**
     * User can select years
     * @private
     */
    CalendarPickersMode["YEAR"] = "YEAR";
})(CalendarPickersMode || (CalendarPickersMode = {}));
export default CalendarPickersMode;
//# sourceMappingURL=CalendarPickersMode.js.map