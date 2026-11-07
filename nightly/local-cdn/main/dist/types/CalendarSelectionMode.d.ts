/**
 * Different Calendar selection mode.
 * @public
 */
declare enum CalendarSelectionMode {
    /**
     * Only one date can be selected at a time
     * @public
     */
    Single = "Single",
    /**
     * Several dates can be selected
     * @public
     */
    Multiple = "Multiple",
    /**
     * A range defined by a start date and an end date can be selected
     * @public
     */
    Range = "Range"
}
export default CalendarSelectionMode;
