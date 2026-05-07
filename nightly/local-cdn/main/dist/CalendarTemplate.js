import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import DayPicker from "./DayPicker.js";
import MonthPicker from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";
import YearRangePicker from "./YearRangePicker.js";
import CalendarHeaderTemplate from "./CalendarHeaderTemplate.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
export default function CalendarTemplate() {
    const showMultipleMonths = this._monthsToShow > 1 && !this._isDayPickerHidden;
    const shouldRenderSeparateHeaders = this._isDefaultHeaderModeInMultipleMonths && !this._portraitView && !this._isCompactMode;
    const shouldRenderInlineHeaders = this._isDefaultHeaderModeInMultipleMonths && (this._portraitView || this._isCompactMode);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: {
                    "ui5-cal-root": true,
                    "ui5-dt-cal--mobile": this._phoneView,
                    "ui5-dt-cal--portrait": this._portraitView,
                    "ui5-dt-cal--multiple": showMultipleMonths,
                }, onKeyDown: this._onkeydown, children: [!showMultipleMonths && (_jsx("div", { class: "ui5-calheader", exportparts: "calendar-header-arrow-button, calendar-header-middle-button", children: CalendarHeaderTemplate.call(this) })), _jsx("div", { id: `${this._id}-content`, class: {
                            "ui5-cal-content": true,
                            "ui5-cal-content-multiple": showMultipleMonths,
                        }, children: showMultipleMonths ? (_jsxs(_Fragment, { children: [this._shouldShowOnePickerHeaderButtonInMultipleMonths && (_jsx("div", { class: "ui5-calheader ui5-calheader-multiple ui5-calheader-default-multiple", exportparts: "calendar-header-arrow-button, calendar-header-middle-button", children: CalendarHeaderTemplate.call(this) })), _jsx("div", { class: "ui5-cal-daypicker-overlay" }), shouldRenderSeparateHeaders && (_jsx("div", { class: "ui5-cal-multiple-months-header-wrapper", children: renderMonthHeaders.call(this) })), _jsx("div", { class: "ui5-cal-multiple-months-wrapper", children: renderMonthPickers.call(this, shouldRenderInlineHeaders) })] })) : (_jsxs(_Fragment, { children: [_jsx(DayPicker, { id: `${this._id}-daypicker`, hidden: this._isDayPickerHidden, formatPattern: this._formatPattern, selectedDates: this._selectedDatesTimestamps, specialCalendarDates: this._specialCalendarDates, disabledDates: this._disabledDates, _hidden: this._isDayPickerHidden, primaryCalendarType: this._primaryCalendarType, secondaryCalendarType: this._secondaryCalendarType, selectionMode: this.selectionMode, minDate: this.minDate, maxDate: this.maxDate, calendarWeekNumbering: this.calendarWeekNumbering, timestamp: this._timestamp, hideWeekNumbers: this.hideWeekNumbers, onChange: this.onSelectedDatesChange, onNavigate: this.onNavigate, exportparts: "day-cell, day-cell-selected, day-cell-selected-between" }), renderMonthPicker.call(this), renderYearPicker.call(this), renderYearRangePicker.call(this)] })) }), showMultipleMonths && (_jsxs("div", { class: {
                            "ui5-cal-overlay-container": true,
                            "ui5-cal-overlay-hidden": this._isMonthPickerHidden && this._isYearPickerHidden && this._isYearRangePickerHidden,
                        }, children: [renderMonthPicker.call(this), renderYearPicker.call(this), renderYearRangePicker.call(this)] }))] }), _jsx("div", { "onui5-calendar-legend-selection-change": this._onCalendarLegendSelectionChange, "onui5-calendar-legend-focus-out": this._onLegendFocusOut, children: _jsx("slot", { name: "calendarLegend" }) })] }));
}
/**
 * Renders month headers in a separate loop (horizontal layout)
 */
function renderMonthHeaders() {
    return Array.from({ length: this._monthsToShow }, (_, index) => {
        const monthTimestamp = this._getMonthTimestamp(index);
        const isFirst = index === 0;
        const isLast = index === this._monthsToShow - 1;
        return (_jsx("div", { class: "ui5-cal-month-header-container", children: CalendarHeaderTemplate.call(this, {
                headerText: this._getHeaderTextForMonth(monthTimestamp),
                isFirst,
                isLast,
                isMultiple: true,
            }) }, `calendar-month-header-${index}`));
    });
}
/**
 * Renders month pickers (with optional inline headers for vertical layout)
 */
function renderMonthPickers(shouldRenderInlineHeaders) {
    return Array.from({ length: this._monthsToShow }, (_, index) => {
        const monthTimestamp = this._getMonthTimestamp(index);
        const isFirst = index === 0;
        const isLast = index === this._monthsToShow - 1;
        return (_jsxs("div", { class: "ui5-cal-month-container", children: [shouldRenderInlineHeaders &&
                    CalendarHeaderTemplate.call(this, {
                        headerText: this._getHeaderTextForMonth(monthTimestamp),
                        isFirst,
                        isLast,
                        isMultiple: true,
                    }), _jsx("div", { class: "ui5-cal-daypicker-wrapper", children: _jsx(DayPicker, { id: `${this._id}-daypicker-${index}`, hidden: this._isDayPickerHidden, formatPattern: this._formatPattern, selectedDates: this._selectedDatesTimestamps, specialCalendarDates: this._specialCalendarDates, disabledDates: this._disabledDates, _hidden: this._isDayPickerHidden, primaryCalendarType: this._primaryCalendarType, secondaryCalendarType: this._secondaryCalendarType, selectionMode: this.selectionMode, minDate: this.minDate, maxDate: this.maxDate, calendarWeekNumbering: this.calendarWeekNumbering, timestamp: monthTimestamp, hideWeekNumbers: this.hideWeekNumbers, onChange: this.onSelectedDatesChange, onNavigate: this.onNavigate, exportparts: "day-cell, day-cell-selected, day-cell-selected-between", inert: this._inert }) })] }, `calendar-month-picker-${index}`));
    });
}
function renderMonthPicker() {
    return (_jsx(MonthPicker, { id: `${this._id}-MP`, hidden: this._isMonthPickerHidden, formatPattern: this._formatPattern, selectedDates: this._selectedDatesTimestamps, _hidden: this._isMonthPickerHidden, primaryCalendarType: this._primaryCalendarType, secondaryCalendarType: this._secondaryCalendarType, selectionMode: this.selectionMode, minDate: this.minDate, maxDate: this.maxDate, timestamp: this._timestamp, onChange: this.onSelectedMonthChange, onNavigate: this.onNavigate, exportparts: "month-cell, month-cell-selected, month-cell-selected-between, month-picker-root" }));
}
function renderYearPicker() {
    return (_jsx(YearPicker, { id: `${this._id}-YP`, hidden: this._isYearPickerHidden, formatPattern: this._formatPattern, selectedDates: this._selectedDatesTimestamps, _hidden: this._isYearPickerHidden, primaryCalendarType: this._primaryCalendarType, secondaryCalendarType: this._secondaryCalendarType, selectionMode: this.selectionMode, minDate: this.minDate, maxDate: this.maxDate, timestamp: this._timestamp, _currentYearRange: this._currentYearRange, onChange: this.onSelectedYearChange, onNavigate: this.onNavigate, exportparts: "year-cell, year-cell-selected, year-cell-selected-between, year-picker-root" }));
}
function renderYearRangePicker() {
    return (_jsx(YearRangePicker, { id: `${this._id}-YRP`, hidden: this._isYearRangePickerHidden, formatPattern: this._formatPattern, selectedDates: this._selectedDatesTimestamps, _showRangeSelection: this.selectionMode === CalendarSelectionMode.Range, _hidden: this._isYearRangePickerHidden, primaryCalendarType: this._primaryCalendarType, secondaryCalendarType: this._secondaryCalendarType, minDate: this.minDate, maxDate: this.maxDate, timestamp: this._timestamp, _currentYearRange: this._currentYearRange, onChange: this.onSelectedYearRangeChange, onNavigate: this.onNavigate, exportparts: "year-range-cell, year-range-cell-selected, year-range-cell-selected-between, year-range-picker-root" }));
}
//# sourceMappingURL=CalendarTemplate.js.map