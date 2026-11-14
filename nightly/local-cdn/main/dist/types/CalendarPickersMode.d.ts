/**
 * Defines which pickers the calendar is allowed to show - day/month/year, only month/year, or only year.
 * @private
 */
declare enum CalendarPickersMode {
    /**
     * User can select days, months and years
     * @private
     */
    DAY_MONTH_YEAR = "DAY_MONTH_YEAR",
    /**
     * User can select months and years
     * @private
     */
    MONTH_YEAR = "MONTH_YEAR",
    /**
     * User can select years
     * @private
     */
    YEAR = "YEAR"
}
export default CalendarPickersMode;
