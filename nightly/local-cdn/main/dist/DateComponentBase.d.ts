import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import type CalendarWeekNumbering from "./types/CalendarWeekNumbering.js";
/**
 * @class
 *
 * Abstract class that provides common functionality for date-related components (day picker, month picker, year picker, calendar, date picker, date range picker, date time picker)
 * This includes:
 *  - "languageAware: true" metadata setting, CLDR fetch and i18n initialization
 *  - common properties (primaryCalendar, minDate, maxDate and formatPattern) declaration and methods that operate on them
 *  - additional common methods
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 */
declare class DateComponentBase extends UI5Element {
    /**
     * Sets a calendar type used for display.
     * If not set, the calendar type of the global configuration is used.
     * @default undefined
     * @public
     */
    primaryCalendarType?: `${CalendarType}`;
    /**
     * Defines the secondary calendar type.
     * If not set, the calendar will only show the primary calendar type.
     * @since 1.0.0-rc.16
     * @default undefined
     * @public
     */
    secondaryCalendarType?: `${CalendarType}`;
    /**
     * Determines the format, displayed in the input field.
     * @default undefined
     * @deprecated Use displayFormat and valueFormat instead
     * @public
     */
    formatPattern?: string;
    /**
     * Determines the format, displayed in the input field.
     * @default undefined
     * @since 2.14.0
     * @public
     */
    displayFormat?: string;
    /**
     * Determines the format, used for the value attribute.
     * @default undefined
     * @since 2.14.0
     * @public
     */
    valueFormat?: string;
    /**
     * Determines the minimum date available for selection.
     *
     * **Note:** If the formatPattern property is not set, the minDate value must be provided in the ISO date format (yyyy-MM-dd).
     * @default ""
     * @since 1.0.0-rc.6
     * @public
     */
    minDate: string;
    /**
     * Determines the maximum date available for selection.
     *
     * **Note:** If the formatPattern property is not set, the maxDate value must be provided in the ISO date format (yyyy-MM-dd).
     * @default ""
     * @since 1.0.0-rc.6
     * @public
     */
    maxDate: string;
    /**
     * Defines how to calculate calendar weeks and first day of the week.
     * If not set, the calendar will be displayed according to the currently set global configuration.
     * @default "Default"
     * @since 2.2.0
     * @public
     */
    calendarWeekNumbering: `${CalendarWeekNumbering}`;
    static i18nBundle?: I18nBundle;
    /**
     * Cached instance of DateFormat with a format pattern of "yyyy-MM-dd".
     * Used by the getISOFormat method to avoid creating a new DateFormat instance on each call.
     * @private
     */
    _isoFormatInstance?: DateFormat;
    constructor();
    get _primaryCalendarType(): CalendarType | "Gregorian" | "Islamic" | "Japanese" | "Buddhist" | "Persian";
    get _secondaryCalendarType(): CalendarType | "Gregorian" | "Islamic" | "Japanese" | "Buddhist" | "Persian" | undefined;
    get _minDate(): CalendarDate;
    get _maxDate(): CalendarDate;
    get _formatPattern(): string | undefined;
    get _isPattern(): boolean;
    get _isValueFormatPattern(): boolean;
    get _isDisplayFormatPattern(): boolean;
    get initialFocusId(): string;
    get hasSecondaryCalendarType(): boolean;
    _getMinMaxCalendarDateFromString(date: string): CalendarDate | undefined;
    _getCalendarDateFromString(value: string): CalendarDate | undefined;
    _getCalendarDateFromStringDisplayValue(value: string): CalendarDate | undefined;
    _getTimeStampFromString(value: string): number | undefined;
    _getStringFromTimestamp(timestamp: number): string;
    _getDisplayStringFromTimestamp(timestamp: number): string;
    _getValueStringFromTimestamp(timestamp: number): string;
    getFormat(): import("sap/ui/core/format/DateFormat").default;
    get _displayFormat(): string | undefined;
    get _valueFormat(): string;
    getDisplayFormat(): import("sap/ui/core/format/DateFormat").default;
    getValueFormat(): import("sap/ui/core/format/DateFormat").default;
    getISOFormat(): DateFormat;
}
export default DateComponentBase;
