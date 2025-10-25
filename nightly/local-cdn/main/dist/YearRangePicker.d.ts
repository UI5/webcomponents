import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarPart from "./CalendarPart.js";
import type { ICalendarPicker, CalendarYearRangeT } from "./Calendar.js";
type YearRange = {
    timestamp: string;
    _tabIndex: number;
    focusRef: boolean;
    selected: boolean;
    ariaSelected: boolean;
    range: string;
    rangeInSecType: string | undefined;
    disabled: boolean;
    ariaDisabled: boolean | undefined;
    classes: string;
    parts: string;
};
type YearRanges = Array<Array<YearRange>>;
type YearRangePickerChangeEventDetail = {
    timestamp: number;
};
type YearRangePickerNavigateEventDetail = {
    timestamp: number;
};
/**
 * @class
 *
 * Displays year ranges which help navigate through years faster.
 * @constructor
 * @extends CalendarPart
 * @private
 */
declare class YearRangePicker extends CalendarPart implements ICalendarPicker {
    eventDetails: CalendarPart["eventDetails"] & {
        "change": YearRangePickerChangeEventDetail;
        "navigate": YearRangePickerNavigateEventDetail;
    };
    /**
     * An array of UTC timestamps representing the selected date
     * or dates depending on the capabilities of the picker component.
     * @default []
     */
    selectedDates: Array<number>;
    /**
     * Defines if the YearRangePicker should visualize the selected dates as a range.
     * @default false
     *
     * @private
     */
    _showRangeSelection: boolean;
    /**
     * When _showRangeSelection is "true" and the first year in the range is selected, this is the currently hovered or focused year range.
     *
     * @private
     */
    _secondTimestamp?: number;
    _yearRanges: YearRanges;
    _hidden: boolean;
    _currentYearRange?: CalendarYearRangeT;
    _gridStartYear?: number;
    static i18nBundle: I18nBundle;
    get roleDescription(): string;
    onBeforeRendering(): void;
    _shouldShowOneColumn(): boolean;
    _getPageSize(): 6 | 8;
    _getRowSize(): 1 | 2;
    _getInitialFocusedIndex(): number;
    _getRangeSize(): 8 | 20;
    _getYearRangeFormattedText(startDate: CalendarDate, endDate: CalendarDate, yearFormat: DateFormat): string;
    _getGridStartYear(): number;
    _getYearRanges(): YearRanges;
    _getYearRange(timestamp: number, isFocused: boolean, isSelected: boolean, isSelectedBetween: boolean, yearRangeText: string, secYearRangeText: string | undefined, isDisabled: boolean): YearRange;
    _isYearRangeSelected(startYear: number, endYear: number): boolean;
    /**
      * Returns true if the timestamp is inside the selection range.
      * @private
      */
    _isInsideSelectionRange(timestamp: number): boolean;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onHomeOrEnd(homePressed: boolean): void;
    /**
     * Set the hovered day as the "_secondTimestamp".
     *
     * @param e
     * @private
     */
    _onmouseover(e: MouseEvent): void;
    /**
     * Sets the timestamp to an absolute value.
     * @param value
     * @private
     */
    _setTimestamp(value: number): void;
    /**
     * In range selection, the currently focused or hovered year range is considered the "second timestamp".
     * @private
     */
    _updateSecondTimestamp(): void;
    /**
     * User selected range with the mouse or pressed Enter/Space.
     * @param e
     * @private
     */
    _selectYearRange(e: Event): void;
    /**
     * Returns the centered timestamp for the year picker.
     * @private
     */
    _getYearPickerCenteredTimestamp(oldTimestamp: number): number;
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
     * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
     * @protected
     */
    _showPreviousPage(): void;
    /**
     * Called by the Calendar component.
     * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
     * @protected
     */
    _showNextPage(): void;
    /**
     * Modifies timestamp by a given amount of year ranges and, if necessary, loads the prev/next page.
     * @param amount
     * @private
     */
    _modifyTimestampBy(amount: number): void;
    _modifyGridStartBy(years: number): void;
}
export default YearRangePicker;
export type { YearRangePickerChangeEventDetail, YearRangePickerNavigateEventDetail, };
