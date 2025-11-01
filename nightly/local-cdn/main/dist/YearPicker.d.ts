import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarPart from "./CalendarPart.js";
import type { CalendarYearRangeT, ICalendarPicker } from "./Calendar.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
type Year = {
    timestamp: string;
    _tabIndex: number;
    focusRef: boolean;
    selected: boolean;
    ariaSelected: boolean;
    year: string;
    yearInSecType: string | undefined;
    disabled: boolean;
    ariaDisabled: boolean | undefined;
    classes: string;
    parts: string;
};
type YearInterval = Array<Array<Year>>;
type YearPickerChangeEventDetail = {
    dates: Array<number>;
    timestamp: number;
};
type YearPickerNavigateEventDetail = {
    timestamp: number;
};
/**
 * @class
 *
 * Displays years which can be selected.
 * @constructor
 * @extends CalendarPart
 * @private
 */
declare class YearPicker extends CalendarPart implements ICalendarPicker {
    eventDetails: CalendarPart["eventDetails"] & {
        "change": YearPickerChangeEventDetail;
        "navigate": YearPickerNavigateEventDetail;
    };
    /**
     * An array of UTC timestamps representing the selected date
     * or dates depending on the capabilities of the picker component.
     * @default []
     */
    selectedDates: Array<number>;
    /**
     * Defines the type of selection used in the year picker component.
     * Accepted property values are:
     *
     * - `CalendarSelectionMode.Single` - enables election of a single year.
     * - `CalendarSelectionMode.Range` - enables selection of a year range.
     *
     * Note that 'CalendarSelectionMode.Multiple` is not supported for Year Picker!
     * @default "Single"
     * @since 2.2.0
     */
    selectionMode: `${CalendarSelectionMode}`;
    _yearsInterval: YearInterval;
    _hidden: boolean;
    /**
     * When selectionMode="Range" and the first year in the range is selected, this is the currently hovered or focused year.
     *
     * @private
     */
    _secondTimestamp?: number;
    _currentYearRange?: CalendarYearRangeT;
    _firstYear?: number;
    static i18nBundle: I18nBundle;
    get roleDescription(): string;
    onBeforeRendering(): void;
    _getPageSize(): 8 | 20;
    _getRowSize(): 2 | 4;
    _buildYears(): void;
    /**
      * Returns true if year timestamp is inside the selection range.
      * @private
      */
    _isYearInsideSelectionRange(timestamp: number): boolean;
    _onkeydown(e: KeyboardEvent): void;
    _onHomeOrEnd(homePressed: boolean): void;
    /**
     * In range selection, the currently focused or hovered year is considered the "second day".
     * @private
     */
    _updateSecondTimestamp(): void;
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
     * Modifies timestamp by a given amount of years and, if necessary, loads the prev/next page.
     * @param amount
     * @private
     */
    _modifyTimestampBy(amount: number): void;
    _onkeyup(e: KeyboardEvent): void;
    /**
     * User clicked with the mouser or pressed Enter/Space
     * @param e
     * @private
     */
    _selectYear(e: Event): void;
    _updateSelectedDates(timestamp: number): void;
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
}
export default YearPicker;
export type { YearPickerChangeEventDetail, YearPickerNavigateEventDetail, };
