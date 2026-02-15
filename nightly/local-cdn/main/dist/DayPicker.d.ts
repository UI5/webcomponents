import type LocaleData from "@ui5/webcomponents-localization/dist/LocaleData.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import CalendarPart from "./CalendarPart.js";
import type { DisabledDateRangeT, ICalendarPicker, SpecialCalendarDateT } from "./Calendar.js";
type DayName = {
    name: string;
    classes: string;
    ultraShortName?: string;
};
type Day = {
    timestamp: string;
    day: number;
    focusRef: boolean;
    _tabIndex: number;
    selected: boolean;
    _isSecondaryCalendarType: boolean;
    classes: string;
    tooltip?: string;
    ariaLabel: string;
    ariaSelected: boolean;
    ariaDisabled: boolean | undefined;
    disabled: boolean;
    secondDay?: number;
    weekNum?: number;
    isHidden?: boolean;
    type?: string;
    parts: string;
};
type WeekNumber = {
    weekNum: number;
    isHidden: boolean;
};
type Week = Array<Day | WeekNumber>;
type DayPickerChangeEventDetail = {
    dates: Array<number>;
    timestamp?: number;
};
type DayPickerNavigateEventDetail = {
    timestamp: number;
};
/**
 * @class
 *
 * Represents the days inside a single month view of the `ui5-calendar` component.
 * @constructor
 * @extends CalendarPart
 * @private
 */
declare class DayPicker extends CalendarPart implements ICalendarPicker {
    eventDetails: CalendarPart["eventDetails"] & {
        "change": DayPickerChangeEventDetail;
        "navigate": DayPickerNavigateEventDetail;
    };
    /**
     * An array of UTC timestamps representing the selected date or dates depending on the capabilities of the picker component.
     * @default []
     */
    selectedDates: Array<number>;
    /**
     * Defines the type of selection used in the day picker component.
     * Accepted property values are:
     *
     * - `CalendarSelectionMode.Single` - enables a single date selection.(default value)
     * - `CalendarSelectionMode.Range` - enables selection of a date range.
     * - `CalendarSelectionMode.Multiple` - enables selection of multiple dates.
     * @default "Single"
     */
    selectionMode: `${CalendarSelectionMode}`;
    /**
     * Defines the visibility of the week numbers column.
     *
     * **Note:** For calendars other than Gregorian,
     * the week numbers are not displayed regardless of what is set.
     * @default false
     * @since 1.0.0-rc.8
     */
    hideWeekNumbers: boolean;
    /**
     * @private
     */
    _weeks: Array<Week>;
    _dayNames: Array<DayName>;
    /**
     * When set, the component will skip all work in onBeforeRendering and will not automatically set the focus on itself
     * @private
     */
    _hidden: boolean;
    /**
     * When selectionMode="Range" and the first day in the range is selected, this is the currently hovered (when using mouse) or focused (when using keyboard) day by the user
     * @private
     */
    _secondTimestamp?: number;
    /**
     * Array of special calendar dates (if such are passed) from the calendar.
     * @private
     */
    specialCalendarDates: Array<SpecialCalendarDateT>;
    /**
     * Array of disabled date ranges that cannot be selected.
     * Each range can have a start and/or end date value.
     * @private
     */
    disabledDates: Array<DisabledDateRangeT>;
    _focusableDay: HTMLElement;
    _autoFocus?: boolean;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    /**
     * Builds the "_weeks" object that represents the month.
     * @param localeData
     * @private
     */
    _buildWeeks(localeData: LocaleData): void;
    _calculateWeekNumber(date: Date): number;
    /**
     * Builds the dayNames object (header of the month).
     * @param localeData
     * @private
     */
    _buildDayNames(localeData: LocaleData): void;
    /**
     * Tells if any of the days is more than 4 characters(too long to render).
     * @param dayNames
     * @private
     */
    namesTooLong(dayNames: Array<string>): boolean;
    onAfterRendering(): void;
    _focusCorrectDay(): void;
    get _shouldFocusDay(): boolean;
    _onfocusin(): void;
    _onfocusout(): void;
    /**
     * Tells if the day is selected (dark blue).
     * @param timestamp
     * @private
     */
    _isDaySelected(timestamp: number): boolean;
    _isRangeEndDate(timestamp: number): boolean;
    _isRangeStartDate(timestamp: number): boolean;
    /**
     * Tells if the day is inside a selection range (light blue).
     * @param timestamp
     * @private
     */
    _isDayInsideSelectionRange(timestamp: number): boolean;
    /**
     * Selects/deselects a day.
     * @param e
     * @param isShift true if the user did Click+Shift or Enter+Shift (but not Space+Shift)
     * @private
     */
    _selectDate(e: Event, isShift: boolean): void;
    _updateSelectedDates(timestamp: number, isShift: boolean): void;
    /**
     * Selects/deselects the whole row (week).
     * @private
     */
    _selectWeek(): void;
    _toggleTimestampInSelection(timestamp: number): void;
    _addTimestampToSelection(timestamp: number): void;
    _removeTimestampFromSelection(timestamp: number): void;
    /**
     * Called when at least one day is selected and the user presses "Shift".
     * @param timestamp
     * @private
     */
    _multipleSelection(timestamp: number): void;
    /**
     * Set the hovered day as the "_secondTimestamp".
     * @param e
     * @private
     */
    _onmouseover(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    /**
     * Click is the same as "Enter".
     * **Note:** "Click+Shift" has the same effect as "Enter+Shift".
     * @param e
     * @private
     */
    _onclick(e: MouseEvent): void;
    /**
     * Called upon "Home" or "End" - moves the focus to the first or last item in the row.
     * @param homePressed
     * @private
     */
    _onHomeOrEnd(homePressed: boolean): void;
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasPreviousPage(): boolean;
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasNextPage(): boolean;
    /**
     * Called by the Calendar component.
     * @protected
     */
    _showPreviousPage(): void;
    /**
     * Called by the Calendar component.
     * @protected
     */
    _showNextPage(): void;
    /**
     * Modifies the timestamp by a certain amount of days/months/years.
     * @param amount
     * @param unit
     * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @private
     */
    _modifyTimestampBy(amount: number, unit: string, preserveDate?: boolean): void;
    /**
     * Sets the timestamp to an absolute value.
     * @param value
     * @private
     */
    _setTimestamp(value: number): void;
    /**
     * During range selection, when the user is navigating with the keyboard,
     * the currently focused day is considered the "second day".
     * @private
     */
    _updateSecondTimestamp(): void;
    get _specialCalendarDates(): SpecialCalendarDateT[];
    get shouldHideWeekNumbers(): boolean;
    _isWeekend(oDate: CalendarDate): boolean;
    /**
     * Checks if a given date is enabled (selectable).
     * A date is considered disabled if:
     * - It falls outside the min/max date range defined by the component
     * - It matches a single disabled date
     * - It falls within a disabled date range (exclusive of start and end dates)
     * @param date - The date to check
     * @returns `true` if the date is enabled (selectable), `false` if disabled
     * @private
     */
    _isDateEnabled(date: CalendarDate): boolean;
    /**
     * Converts a date value string to a timestamp.
     * @param dateValue - Date string to convert
     * @returns timestamp in seconds, or 0 if invalid
     * @private
     */
    _getTimestampFromDateValue(dateValue?: string): number;
    _isDayPressed(target: HTMLElement): boolean;
    _isDefaultCalendarLegendType(type: string): boolean;
    _getSecondaryDay(tempDate: CalendarDate): CalendarDate;
    _getFirstDay(): CalendarDate;
    _getFirstDayOfWeek(): number;
    get styles(): {
        wrapper: {
            display: string;
            "justify-content": string;
        };
        main: {
            width: string;
        };
    };
    get ariaRoledescription(): string;
}
export default DayPicker;
export type { DayPickerNavigateEventDetail, DayPickerChangeEventDetail, };
