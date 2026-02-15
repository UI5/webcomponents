import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarPart from "./CalendarPart.js";
import type { ICalendarPicker } from "./Calendar.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
type Month = {
    timestamp: string;
    focusRef: boolean;
    _tabIndex: number;
    selected: boolean;
    ariaSelected: boolean;
    name: string;
    nameInSecType: string;
    disabled: boolean;
    ariaDisabled: boolean | undefined;
    classes: string;
    parts: string;
};
type MonthInterval = Array<Array<Month>>;
type MonthPickerChangeEventDetail = {
    dates: Array<number>;
    timestamp: number;
};
type MonthPickerNavigateEventDetail = {
    timestamp: number;
};
/**
 * Month picker component.
 * @class
 *
 * Displays months which can be selected.
 * @constructor
 * @extends CalendarPart
 * @private
 */
declare class MonthPicker extends CalendarPart implements ICalendarPicker {
    eventDetails: CalendarPart["eventDetails"] & {
        change: MonthPickerChangeEventDetail;
        navigate: MonthPickerNavigateEventDetail;
    };
    /**
     * An array of UTC timestamps representing the selected date
     * or dates depending on the capabilities of the picker component.
     * @default []
     */
    selectedDates: Array<number>;
    /**
     * Defines the type of selection used in the month picker component.
     * Accepted property values are:
     *
     * - `CalendarSelectionMode.Single` - enables election of a single month.
     * - `CalendarSelectionMode.Range` - enables selection of a month range.
     *
     * Note that 'CalendarSelectionMode.Multiple` is not supported for Month Picker!
     * @default "Single"
     * @since 2.2.0
     */
    selectionMode: `${CalendarSelectionMode}`;
    _monthsInterval: MonthInterval;
    _hidden: boolean;
    /**
     * When selectionMode="Range" and the first month in the range is selected, this is the currently hovered or focused month.
     *
     * @private
     */
    _secondTimestamp?: number;
    static i18nBundle: I18nBundle;
    get roleDescription(): string;
    onBeforeRendering(): void;
    get rowSize(): 2 | 3;
    _buildMonths(): void;
    _getDisplayedSecondaryMonthText(timestamp: number): {
        text: any;
        textInfo: any;
    };
    /**
      * Returns true if month timestamp is inside the selection range.
      * @private
      */
    _isMonthInsideSelectionRange(timestamp: number): boolean;
    _onkeydown(e: KeyboardEvent): void;
    _onHomeOrEnd(homePressed: boolean): void;
    /**
     * Sets the timestamp to an absolute value.
     * @param value
     * @private
     */
    _setTimestamp(value: number): void;
    /**
     * In range selection, the currently focused or hovered month is considered the "second day".
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
     * Sets the focus reference to the month that was clicked with mousedown.
     * @param e
     * @private
     */
    _onmousedown(e: MouseEvent): void;
    /**
     * Modifies timestamp by a given amount of months and,
     * if necessary, loads the prev/next page.
     * @param amount
     * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @private
     */
    _modifyTimestampBy(amount: number, preserveDate?: boolean): void;
    _onkeyup(e: KeyboardEvent): void;
    /**
     * Selects a month, when user made selection with mouse or using Space/Enter.
     * @param e
     * @private
     */
    _selectMonth(e: Event): void;
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
     * Called by Calendar.js.
     *
     * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
     * @protected
     */
    _showPreviousPage(): void;
    /**
     * Called by Calendar.js
     * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
     * @protected
     */
    _showNextPage(): void;
    _isOutOfSelectableRange(date: CalendarDate, minDate: CalendarDate, maxDate: CalendarDate): boolean;
}
export default MonthPicker;
export type { MonthPickerNavigateEventDetail, MonthPickerChangeEventDetail, };
