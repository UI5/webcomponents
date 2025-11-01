/**
 * Different Calendar selection mode.
 * @public
 */
var CalendarSelectionMode;
(function (CalendarSelectionMode) {
    /**
     * Only one date can be selected at a time
     * @public
     */
    CalendarSelectionMode["Single"] = "Single";
    /**
     * Several dates can be selected
     * @public
     */
    CalendarSelectionMode["Multiple"] = "Multiple";
    /**
     * A range defined by a start date and an end date can be selected
     * @public
     */
    CalendarSelectionMode["Range"] = "Range";
})(CalendarSelectionMode || (CalendarSelectionMode = {}));
export default CalendarSelectionMode;
//# sourceMappingURL=CalendarSelectionMode.js.map