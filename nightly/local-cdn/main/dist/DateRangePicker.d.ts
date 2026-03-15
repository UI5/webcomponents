import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import DatePicker from "./DatePicker.js";
import type { DatePickerChangeEventDetail as DateRangePickerChangeEventDetail, DatePickerInputEventDetail as DateRangePickerInputEventDetail } from "./DatePicker.js";
import type { CalendarSelectionChangeEventDetail } from "./Calendar.js";
import type CalendarSelectionMode from "./types/CalendarSelectionMode.js";
/**
 * @class
 *
 * ### Overview
 * The DateRangePicker enables the users to enter a localized date range using touch, mouse, keyboard input, or by selecting a date range in the calendar.
 *
 * ### Usage
 * The user can enter a date by:
 * Using the calendar that opens in a popup or typing it in directly in the input field (not available for mobile devices).
 * For the `ui5-daterange-picker`
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DateRangePicker.js";`
 *
 * ### Keyboard Handling
 * The `ui5-daterange-picker` provides advanced keyboard handling.
 *
 * When the `ui5-daterange-picker` input field is focused the user can
 * increment or decrement respectively the range start or end date, depending on where the cursor is.
 * The following shortcuts are available:
 *
 * - [Page Down] - Decrements the corresponding day of the month by one
 * - [Shift] + [Page Down] - Decrements the corresponding month by one
 * - [Shift] + [Ctrl] + [Page Down] - Decrements the corresponding year by one
 * - [Page Up] - Increments the corresponding day of the month by one
 * - [Shift] + [Page Up] - Increments the corresponding month by one
 * - [Shift] + [Ctrl] + [Page Up] - Increments the corresponding year by one
 * @constructor
 * @extends DatePicker
 * @since 1.0.0-rc.8
 * @public
 */
declare class DateRangePicker extends DatePicker implements IFormInputElement {
    /**
    * Determines the symbol which separates the dates.
    * If not supplied, the default time interval delimiter for the current locale will be used.
    * @default "-"
    * @public
    */
    delimiter: string;
    /**
    * The first date in the range during selection (this is a temporary value, not the first date in the value range)
    * @private
    */
    _tempValue?: string;
    private _prevDelimiter;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    get formFormattedValue(): string | FormData;
    constructor();
    /**
     * **Note:** The getter method is inherited and not supported. If called it will return an empty value.
     * @public
     * @default null
     */
    get dateValue(): Date | null;
    /**
     * **Note:** The getter method is inherited and not supported. If called it will return an empty value.
     * @public
     * @default null
     */
    get dateValueUTC(): Date | null;
    get _startDateTimestamp(): number | undefined;
    get _endDateTimestamp(): number | undefined;
    get _tempTimestamp(): number | "" | undefined;
    /**
     * Required by DatePicker.js
     * @override
     */
    get _calendarSelectionMode(): `${CalendarSelectionMode}`;
    /**
     * Required by DatePicker.js - set the calendar focus on the first selected date (or today if not set)
     * @override
     */
    get _calendarTimestamp(): number;
    /**
     * Required by DatePicker.js
     * @override
     */
    get _calendarSelectedDates(): string[];
    /**
     * Returns the start date of the currently selected range as JavaScript Date instance.
     * @public
     * @default null
     */
    get startDateValue(): Date | null;
    /**
     * Returns the end date of the currently selected range as JavaScript Date instance.
     * @public
     * @default null
     */
    get endDateValue(): Date | null;
    get startValue(): string;
    get endValue(): string;
    get _lastDateRangeForTheCurrentYear(): string;
    /**
     * @override
     */
    get _placeholder(): string;
    /**
     * @override
     */
    get roleDescription(): string;
    /**
     * @override
     */
    get pickerAccessibleName(): string;
    /**
     * @override
     */
    onResponsivePopoverAfterClose(): void;
    /**
     * Checks if a value is valid against the current date format of the DatePicker.
     * @public
     * @param value A value to be tested against the current date format
     */
    isValid(value: string): boolean;
    /**
     * Checks if a value is valid against the current date format of the DatePicker.
     * @public
     * @param value A value to be tested against the current date format
     */
    isValidValue(value: string): boolean;
    /**
     * Checks if a value is valid against the current date format of the DatePicker.
     * @public
     * @param value A value to be tested against the current date format
     */
    isValidDisplayValue(value: string): boolean;
    /**
     * Checks if a date is between the minimum and maximum date.
     * @public
     * @param value A value to be checked
     */
    isInValidRange(value: string): boolean;
    isValidMin(value: string): boolean;
    isValidMax(value: string): boolean;
    /**
     * Extract both dates as timestamps, flip if necessary, and build (which will use the desired format so we enforce the format too)
     * @override
     */
    normalizeValue(value: string): string;
    /**
     * The parser understands many formats, but we need one format
     * @override
     * @protected
     */
    normalizeDisplayValue(value: string): string;
    /**
     * @override
     */
    getValueFromDisplayValue(value: string): string;
    /**
     * @override
     */
    onSelectedDatesChange(event: CustomEvent<CalendarSelectionChangeEventDetail>): void;
    /**
     * @override
     */
    _modifyDateValue(amount: number, unit: string, preserveDate?: boolean): Promise<void>;
    get _effectiveDelimiter(): string;
    _splitValueByDelimiter(value: string): string[];
    /**
     * The parser understands many formats, but we need one format
     * @protected
     */
    normalizeFormattedValue(value: string): string;
    /**
     * Returns a UTC timestamp, representing the first date in the value string or undefined if the value is empty
     * @private
     */
    _extractFirstTimestamp(value: string): number | undefined;
    /**
     * Returns a UTC timestamp, representing the last date in the value string or undefined if the value is empty or there is just one date
     * @private
     */
    _extractLastTimestamp(value: string): number | undefined;
    _exctractDisplayTimestamp(value: string): number | undefined;
    /**
     * Builds a string value out of two UTC timestamps - this method is the counterpart to _extractFirstTimestamp/_extractLastTimestamp
     * @private
     */
    _buildValue(firstDateTimestamp: number | undefined, lastDateTimestamp: number | undefined): string;
    /**
     * Builds a string value out of two UTC timestamps - this method is the counterpart to _extractFirstTimestamp/_extractLastTimestamp
     * @private
     */
    _buildDisplayValue(firstDateTimestamp: number | undefined, lastDateTimestamp: number | undefined): string;
    getDisplayValueFromValue(value: string): string;
    get displayValue(): string;
}
export default DateRangePicker;
export type { DateRangePickerChangeEventDetail, DateRangePickerInputEventDetail, };
