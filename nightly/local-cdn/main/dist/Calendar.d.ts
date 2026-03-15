import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ChangeInfo, DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import CalendarDateComponent from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import CalendarDateRange from "./CalendarDateRange.js";
import "./SpecialCalendarDate.js";
import CalendarPart from "./CalendarPart.js";
import type { DayPickerChangeEventDetail } from "./DayPicker.js";
import type { MonthPickerChangeEventDetail } from "./MonthPicker.js";
import type { YearPickerChangeEventDetail } from "./YearPicker.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import type CalendarLegend from "./CalendarLegend.js";
import type { CalendarLegendItemSelectionChangeEventDetail } from "./CalendarLegend.js";
import type SpecialCalendarDate from "./SpecialCalendarDate.js";
import type CalendarLegendItemType from "./types/CalendarLegendItemType.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import type { YearRangePickerChangeEventDetail } from "./YearRangePicker.js";
interface ICalendarPicker extends HTMLElement {
    _showPreviousPage: () => void;
    _showNextPage: () => void;
    _hasPreviousPage: () => boolean;
    _hasNextPage: () => boolean;
    _currentYearRange?: CalendarYearRangeT;
}
/**
 * Interface for components that may be slotted inside a `ui5-calendar`.
 *
 * **Note:** Use with `ui5-date` or `ui5-date-range` as calendar date selection types.
 * @public
 */
interface ICalendarSelectedDates extends UI5Element {
    value?: string;
    startValue?: string;
    endValue?: string;
}
type CalendarSelectionChangeEventDetail = {
    selectedValues: Array<string>;
    selectedDates: Array<number>;
    timestamp: number | undefined;
};
type SpecialCalendarDateT = {
    specialDateTimestamp: number;
    type: `${CalendarLegendItemType}`;
    tooltip?: string;
};
type CalendarYearRangeT = {
    startYear: number;
    endYear: number;
};
type DisabledDateRangeT = {
    startValue?: string;
    endValue?: string;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-calendar` component allows users to select one or more dates.
 *
 * Currently selected dates are represented with instances of `ui5-date` as
 * children of the `ui5-calendar`. The value property of each `ui5-date` must be a
 * date string, correctly formatted according to the `ui5-calendar`'s `formatPattern` property.
 * Whenever the user changes the date selection, `ui5-calendar` will automatically create/remove instances
 * of `ui5-date` in itself, unless you prevent this behavior by calling `preventDefault()` for the
 * `selection-change` event. This is useful if you want to control the selected dates externally.
 *
 * ### Usage
 *
 * The user can navigate to a particular date by:
 *
 * - Pressing over a month inside the months view
 * - Pressing over an year inside the years view
 *
 * The user can confirm a date selection by pressing over a date inside the days view.
 *
 * ### Keyboard Handling
 * The `ui5-calendar` provides advanced keyboard handling.
 * When a picker is showed and focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - Day picker:
 *
 * - [F4] - Shows month picker
 * - [Shift] + [F4] - Shows year picker
 * - [Page Up] - Navigate to the previous month
 * - [Page Down] - Navigate to the next month
 * - [Shift] + [Page Up] - Navigate to the previous year
 * - [Shift] + [Page Down] - Navigate to the next year
 * - [Ctrl] + [Shift] + [Page Up] - Navigate ten years backwards
 * - [Ctrl] + [Shift] + [Page Down] - Navigate ten years forwards
 * - [Home] - Navigate to the first day of the week
 * - [End] - Navigate to the last day of the week
 * - [Ctrl] + [Home] - Navigate to the first day of the month
 * - [Ctrl] + [End] - Navigate to the last day of the month
 *
 * - Month picker:
 *
 * - [Page Up] - Navigate to the previous year
 * - [Page Down] - Navigate to the next year
 * - [Home] - Navigate to the first month of the current row
 * - [End] - Navigate to the last month of the current row
 * - [Ctrl] + [Home] - Navigate to the first month of the current year
 * - [Ctrl] + [End] - Navigate to the last month of the year
 *
 * - Year picker:
 *
 * - [Page Up] - Navigate to the previous year range
 * - [Page Down] - Navigate the next year range
 * - [Home] - Navigate to the first year of the current row
 * - [End] - Navigate to the last year of the current row
 * - [Ctrl] + [Home] - Navigate to the first year of the current year range
 * - [Ctrl] + [End] - Navigate to the last year of the current year range
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### Calendar types
 * The component supports several calendar types - Gregorian, Buddhist, Islamic, Japanese and Persian.
 * By default the Gregorian Calendar is used. In order to use the Buddhist, Islamic, Japanese or Persian calendar,
 * you need to set the `primaryCalendarType` property and import one or more of the following modules:
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";`
 *
 * Or, you can use the global configuration and set the `calendarType` key:
 *
 * ```html
 * <script data-id="sap-ui-config" type="application/json">
 * 	{
 * 		"calendarType": "Japanese"
 * 	}
 * </script>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Calendar.js";`
 * @constructor
 * @extends CalendarPart
 * @public
 * @csspart day-cell - Used to style the day cells.
 * @csspart day-cell-selected - Used to style the day cells when selected.
 * @csspart day-cell-selected-between - Used to style the day cells in between of selected dates in range.
 * @csspart month-cell - Used to style the month cells.
 * @csspart month-cell-selected - Used to style the month cells when selected.
 * @csspart month-cell-selected-between - Used to style the day cells in between of selected months in range.
 * @csspart month-picker-root - Used to style the month picker root container.
 * @csspart year-cell - Used to style the year cells.
 * @csspart year-cell-selected - Used to style the year cells when selected.
 * @csspart year-cell-selected-between - Used to style the year cells in between of selected years in range.
 * @csspart year-picker-root - Used to style the year picker root container.
 * @csspart year-range-cell - Used to style the year range cells.
 * @csspart year-range-cell-selected - Used to style the year range cells when selected.
 * @csspart year-range-cell-selected-between - Used to style the year range cells in between of selected year ranges.
 * @csspart year-range-picker-root - Used to style the year range picker root container.
 * @csspart calendar-header-middle-button - Used to style the calendar header middle buttons (month/year/year-range buttons).
 * @csspart calendar-header-arrow-button - Used to style the calendar header navigation arrow buttons (previous/next buttons).
 * @since 1.0.0-rc.11
 */
declare class Calendar extends CalendarPart {
    eventDetails: CalendarPart["eventDetails"] & {
        "selection-change": CalendarSelectionChangeEventDetail;
        "show-month-view": void;
        "show-year-view": void;
        "show-year-range-view": void;
    };
    /**
     * Defines the type of selection used in the calendar component.
     * Accepted property values are:
     *
     * - `CalendarSelectionMode.Single` - enables a single date selection.(default value)
     * - `CalendarSelectionMode.Range` - enables selection of a date range.
     * - `CalendarSelectionMode.Multiple` - enables selection of multiple dates.
     * @default "Single"
     * @public
     */
    selectionMode: `${CalendarSelectionMode}`;
    /**
     * Defines the visibility of the week numbers column.
     *
     * **Note:** For calendars other than Gregorian,
     * the week numbers are not displayed regardless of what is set.
     * @default false
     * @public
     */
    hideWeekNumbers: boolean;
    /**
     * Which picker is currently visible to the user: day/month/year/yearRange
     * @private
     */
    _currentPicker: "day" | "month" | "year" | "yearrange";
    _previousButtonDisabled: boolean;
    _nextButtonDisabled: boolean;
    _headerMonthButtonText?: string;
    _headerYearButtonText?: string;
    _headerYearButtonTextSecType?: string;
    _headerYearRangeButtonText?: string;
    _headerYearRangeButtonTextSecType?: string;
    _pickersMode: `${CalendarPickersMode}`;
    _valueIsProcessed: boolean;
    _rangeStartYear?: number;
    /**
     * Defines the calendar legend of the component.
     * @public
     * @since 1.23.0
     */
    calendarLegend: Slot<CalendarLegend>;
    /**
     * Defines the selected date or dates (depending on the `selectionMode` property)
     * for this calendar as instances of `ui5-date` or `ui5-date-range`.
     * Use `ui5-date` for single or multiple selection, and `ui5-date-range` for range selection.
     * @public
     */
    dates: DefaultSlot<ICalendarSelectedDates>;
    /**
     * Defines the special dates, visually emphasized in the calendar.
     * @public
     * @since 1.23.0
     */
    specialDates: Slot<SpecialCalendarDate>;
    /**
     * Defines the disabled date ranges that cannot be selected in the calendar.
     * Use `ui5-date-range` elements to specify ranges of disabled dates.
     * Each range can define a start date, an end date, or both.
     * @public
     * @since 2.16.0
     */
    disabledDates: Slot<CalendarDateRange>;
    /**
     * Defines the selected item type of the calendar legend item (if such exists).
     * @private
     */
    _selectedItemType: `${CalendarLegendItemType}`;
    static i18nBundle: I18nBundle;
    constructor();
    /**
     * @private
     */
    get _selectedDatesTimestamps(): Array<number>;
    /**
     * @private
     */
    _setSelectedDates(selectedDates: Array<number>): void;
    _isValidCalendarDate(dateString: string): boolean;
    get _disabledDates(): {
        startValue: string;
        endValue: string;
    }[];
    get _specialCalendarDates(): SpecialCalendarDateT[];
    _onCalendarLegendSelectionChange(e: CustomEvent<CalendarLegendItemSelectionChangeEventDetail>): void;
    /**
     * Makes sure that _currentPicker is always set to a value, allowed by _pickersMode
     */
    _normalizeCurrentPicker(): void;
    onBeforeRendering(): void;
    onAfterRendering(): Promise<void>;
    onInvalidation(changeInfo: ChangeInfo): void;
    /**
     * The user clicked the "month" button in the header
     */
    onHeaderMonthButtonPress(): void;
    switchToDayPicker(suppressFocus?: boolean): Promise<void>;
    switchToMonthPicker(suppressFocus?: boolean): Promise<void>;
    /**
     * The user clicked the "year" button in the header
     */
    onHeaderYearButtonPress(): void;
    switchToYearPicker(suppressFocus?: boolean): Promise<void>;
    /**
     * The user clicked the "year range" button in the YearPicker header
     */
    onHeaderYearRangeButtonPress(): void;
    switchToYearRangePicker(suppressFocus?: boolean): Promise<void>;
    get _currentPickerDOM(): ICalendarPicker;
    /**
     * Returns the focusable element inside the Calendar (the current picker)
     * @override
     */
    getFocusDomRef(): HTMLElement | undefined;
    /**
     * The year clicked the "Previous" button in the header
     */
    onHeaderPreviousPress(): void;
    /**
     * The year clicked the "Next" button in the header
     */
    onHeaderNextPress(): void;
    _setSecondaryCalendarTypeButtonText(): void;
    get secondaryCalendarTypeButtonText(): {
        yearButtonText: string;
        monthButtonText: any;
        monthButtonInfo: any;
    } | undefined;
    /**
     * The month button is hidden when the month picker or year picker is shown
     * @private
     */
    get _isHeaderMonthButtonHidden(): boolean;
    /**
     * The year range picker button is shown only in the year picker
     * @private
     */
    get _isHeaderYearRangeButtonHidden(): boolean;
    /**
     * The year button is shown only in the day & month pickers
     * @private
     */
    get _isHeaderYearButtonHidden(): boolean;
    get _isDayPickerHidden(): boolean;
    get _isMonthPickerHidden(): boolean;
    get _isYearPickerHidden(): boolean;
    get _isYearRangePickerHidden(): boolean;
    get _currentYearRange(): CalendarYearRangeT;
    _fireEventAndUpdateSelectedDates(selectedDates: Array<number>): void;
    onSelectedDatesChange(e: CustomEvent<DayPickerChangeEventDetail>): void;
    onSelectedMonthChange(e: CustomEvent<MonthPickerChangeEventDetail>): void;
    onSelectedYearChange(e: CustomEvent<YearPickerChangeEventDetail>): void;
    onSelectedYearRangeChange(e: CustomEvent<YearRangePickerChangeEventDetail>): void;
    onNavigate(e: CustomEvent): Promise<void>;
    _onkeydown(e: KeyboardEvent): void;
    _onLegendFocusOut(): void;
    get _specialDates(): SpecialCalendarDate[];
    get classes(): {
        prevButton: {
            "ui5-calheader-arrowbtn": boolean;
            "ui5-calheader-arrowbtn-disabled": boolean;
        };
        nextButton: {
            "ui5-calheader-arrowbtn": boolean;
            "ui5-calheader-arrowbtn-disabled": boolean;
        };
    };
    get accInfo(): {
        ariaLabelMonthButton: string;
        ariaLabelYearButton: string;
        ariaLabelYearRangeButton: string;
        ariaLabelNextButton: string;
        ariaLabelPrevButton: string;
        keyShortcutMonthButton: string;
        keyShortcutYearButton: string;
        keyShortcutYearRangeButton: string;
        keyShortcutNextButton: string;
        keyShortcutPrevButton: string;
        tooltipMonthButton: string;
        tooltipYearButton: string;
        tooltipYearRangeButton: string;
        tooltipNextButton: string;
        tooltipPrevButton: string;
    };
    /**
     * Helper method to create CalendarDateComponent instances for year range
     * @private
     */
    _createYearRangeDates(yearRange: CalendarYearRangeT, calendarType?: string): {
        rangeStart: CalendarDateComponent;
        rangeEnd: CalendarDateComponent;
    };
    /**
     * Helper method to format year range text
     * @private
     */
    _formatYearRangeText(yearRange: CalendarYearRangeT): {
        rangeStartText: string;
        rangeEndText: string;
    };
    get secondMonthButtonText(): string;
    onMonthButtonKeyDown(e: KeyboardEvent): void;
    onMonthButtonKeyUp(e: KeyboardEvent): void;
    onYearButtonKeyDown(e: KeyboardEvent): void;
    onYearButtonKeyUp(e: KeyboardEvent): void;
    onYearRangeButtonKeyDown(e: KeyboardEvent): void;
    onYearRangeButtonKeyUp(e: KeyboardEvent): void;
    _handleNavigationButtonKeyDown(e: MouseEvent, isDisabled: boolean, action: () => void): void;
    onPrevButtonClick(e: MouseEvent): void;
    onNextButtonClick(e: MouseEvent): void;
    /**
     * Returns an array of UTC timestamps, representing the selected dates.
     * @protected
     * @deprecated
     */
    get selectedDates(): Array<number>;
    /**
     * Creates instances of `ui5-date` or `ui5-date-range` inside this `ui5-calendar` with values, equal to the provided UTC timestamps
     * @protected
     * @deprecated
     * @param selectedDates Array of UTC timestamps
     */
    set selectedDates(selectedDates: Array<number>);
}
export default Calendar;
export type { ICalendarPicker, CalendarYearRangeT, ICalendarSelectedDates, CalendarSelectionChangeEventDetail, SpecialCalendarDateT, DisabledDateRangeT, };
