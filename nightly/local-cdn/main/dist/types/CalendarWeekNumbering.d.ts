/**
 * The <code>CalendarWeekNumbering</code> enum defines how to calculate calendar weeks. Each
 * value defines:
 * - The first day of the week,
 * - The first week of the year.
 *
 * @public
 * @since 2.2.0
 */
declare enum CalendarWeekNumbering {
    /**
     * The default calendar week numbering:
     *
     * The framework determines the week numbering scheme; currently it is derived from the
     * active format locale. Future versions of ui5-webcomponents might select a different week numbering
     * scheme.
     *
     * @public
     */
    Default = "Default",
    /**
     * Official calendar week numbering in most of Europe (ISO 8601 standard):
     * Monday is first day of the week, the week containing January 4th is first week of the year.
     *
     * @public
     */
    ISO_8601 = "ISO_8601",
    /**
     * Official calendar week numbering in much of the Middle East (Middle Eastern calendar):
     * Saturday is first day of the week, the week containing January 1st is first week of the year.
     *
     * @public
     */
    MiddleEastern = "MiddleEastern",
    /**
     * Official calendar week numbering in the United States, Canada, Brazil, Israel, Japan, and
     * other countries (Western traditional calendar):
     * Sunday is first day of the week, the week containing January 1st is first week of the year.
     *
     * @public
     */
    WesternTraditional = "WesternTraditional"
}
export default CalendarWeekNumbering;
