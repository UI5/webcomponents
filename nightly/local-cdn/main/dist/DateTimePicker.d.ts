import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import "@ui5/webcomponents-icons/dist/date-time.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import type { SegmentedButtonSelectionChangeEventDetail } from "./SegmentedButton.js";
import type { CalendarSelectionChangeEventDetail } from "./Calendar.js";
import DatePicker from "./DatePicker.js";
import type { DatePickerChangeEventDetail as DateTimePickerChangeEventDetail, DatePickerInputEventDetail as DateTimePickerInputEventDetail } from "./DatePicker.js";
import type { TimeSelectionChangeEventDetail } from "./TimePickerInternals.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import type TimeSelectionClocks from "./TimeSelectionClocks.js";
type PreviewValues = {
    timeSelectionValue?: string;
    calendarTimestamp?: number;
    calendarValue?: string;
};
/**
 * @class
 *
 * ### Overview
 * The `DateTimePicker` component alows users to select both date (day, month and year) and time (hours, minutes and seconds)
 * and for the purpose it consists of input field and Date/Time picker.
 *
 * ### Usage
 *
 * Use the `DateTimePicker` if you need a combined date and time input component.
 * Don't use it if you want to use either date, or time value.
 * In this case, use the `DatePicker` or the `TimePicker` components instead.
 *
 * The user can set date/time by:
 *
 * - using the calendar and the time selectors
 * - typing in the input field
 *
 * Programmatically, to set date/time for the `DateTimePicker`, use the `value` property
 *
 * ### Formatting
 *
 * The value entered by typing into the input field must fit to the used date/time format.
 *
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see [UTS #35: Unicode Locale Data Markup Language](https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 *
 * **Example:** the following format `dd/MM/yyyy, hh:mm:ss aa`
 * corresponds the `13/04/2020, 03:16:16 AM` value.
 *
 * The small 'h' defines "12" hours format and the "aa" symbols - "AM/PM" time periods.
 *
 * **Example:** the following format `dd/MM/yyyy, HH:mm:ss`
 * corresponds the `13/04/2020, 15:16:16` value.
 *
 * The capital 'H' indicates "24" hours format.
 *
 * **Note:** If the `formatPattern` does NOT include time,
 * the `DateTimePicker` will fallback to the default time format according to the locale.
 *
 * **Note:** If no placeholder is set to the `DateTimePicker`,
 * the current `formatPattern` is displayed as a placeholder.
 * If another placeholder is needed, it must be set or in case no placeholder is needed - it can be set to an empty string.
 *
 * **Note:** If the user input does NOT match the `formatPattern`,
 * the `DateTimePicker` makes an attempt to parse it based on the
 * locale settings.
 *
 * ### Responsive behavior
 *
 * The `DateTimePicker` is responsive and fully adapts to all devices.
 * For larger screens, such as tablet or desktop, it is displayed as a popover, while
 * on phone devices, it is displayed full screen.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DateTimePicker.js";`
 * @constructor
 * @extends DatePicker
 * @since 1.0.0-rc.7
 * @public
 */
declare class DateTimePicker extends DatePicker implements IFormInputElement {
    /**
     * Defines the visibility of the time view in `phoneMode`.
     * For more information, see the `phoneMode` property.
     *
     * **Note:** The date view would be displayed by default.
     * @default false
     * @private
     */
    _showTimeView: boolean;
    /**
     * Defines if the `DateTimePicker` should be displayed in phone mode.
     * The phone mode turns on when the component is used on small screens or phone devices.
     * In phone mode the user can see either the calendar view, or the time view
     * and can switch between the views via toggle buttons.
     * @default false
     * @private
     */
    _phoneMode: boolean;
    /**
     * Selected, but not yet confirmed date/time
     * @private
     */
    _previewValues: PreviewValues;
    /**
     * Stores the last valid value to preserve time when entering invalid values
     * @private
     */
    _lastValidValue: string;
    _clocks: TimeSelectionClocks;
    _handleResizeBound: ResizeObserverCallback;
    constructor();
    /**
     * @override
     */
    onResponsivePopoverAfterClose(): void;
    /**
     * LIFECYCLE METHODS
     */
    onEnterDOM(): void;
    onExitDOM(): void;
    /**
     * @override
     * @private
     */
    _togglePicker(): void;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    get _formatPattern(): string;
    get _calendarTimestamp(): number;
    get _calendarSelectedDates(): string[];
    get _timeSelectionValue(): string;
    get openIconName(): string;
    get btnOKLabel(): string;
    get btnCancelLabel(): string;
    get btnDateLabel(): string;
    get btnTimeLabel(): string;
    get showFooter(): boolean;
    get showDateView(): boolean;
    get showTimeView(): boolean;
    get _phoneView(): boolean;
    /**
     * @override
     */
    get roleDescription(): string;
    /**
     * @override
     */
    get pickerAccessibleName(): string;
    /**
     * Defines whether the dialog on mobile should have header
     * @private
     */
    get _shouldHideHeader(): boolean;
    /**
     * EVENT HANDLERS
     */
    /**
     * @override
     */
    onSelectedDatesChange(e: CustomEvent<CalendarSelectionChangeEventDetail>): Promise<void>;
    onTimeSelectionChange(e: CustomEvent<TimeSelectionChangeEventDetail>): void;
    /**
     * Handles document resize to switch between `phoneMode` and normal appearance.
     */
    _handleResize(): void;
    get _submitDisabled(): boolean;
    /**
     * Handles clicking on the `submit` button, within the picker`s footer.
     */
    _submitClick(): void;
    /**
     * Handles clicking on the `cancel` button, within the picker`s footer,
     * that would disregard the user selection.
     */
    _cancelClick(): void;
    /**
     * Handles the date/time switch available in `phoneMode` to switch
     * between the date and time views.
     * @param e
     */
    _dateTimeSwitchChange(e: CustomEvent<SegmentedButtonSelectionChangeEventDetail>): void;
    /**
     * @override
     */
    _modifyDateValue(amount: number, unit: string, preserveDate: boolean): void;
    /**
     * @override
     */
    _updateValueAndFireEvents(value: string, normalizeValue: boolean, events: Array<"change" | "value-changed" | "input">, updateValue?: boolean): void;
    /**
     * Checks if the provided value is valid and within valid range.
     * @override
     * @param value
     */
    _checkValueValidity(value: string): boolean;
    getSelectedDateTime(): Date;
    getFormat(): import("sap/ui/core/format/DateFormat").default;
    getDisplayFormat(): import("sap/ui/core/format/DateFormat").default;
    getValueFormat(): import("sap/ui/core/format/DateFormat").default;
    getISOFormat(): DateFormat;
    /**
     * @override
     */
    get _calendarPickersMode(): CalendarPickersMode;
}
export default DateTimePicker;
export type { DateTimePickerChangeEventDetail, DateTimePickerInputEventDetail, };
