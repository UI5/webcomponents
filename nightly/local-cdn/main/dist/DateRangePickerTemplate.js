import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Calendar from "./Calendar.js";
import CalendarDateRange from "./CalendarDateRange.js";
import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";
export default function DateRangePickerTemplate() {
    return [
        DatePickerInputTemplate.call(this),
        DatePickerPopoverTemplate.call(this, { content, initialFocus: this.initialFocusId }),
    ];
}
function content() {
    return (_jsx(Calendar, { id: `${this._id}-calendar`, primaryCalendarType: this._primaryCalendarType, secondaryCalendarType: this.secondaryCalendarType, formatPattern: this._formatPattern, selectionMode: this._calendarSelectionMode, minDate: this.minDate, maxDate: this.maxDate, calendarWeekNumbering: this.calendarWeekNumbering, onSelectionChange: this.onSelectedDatesChange, onShowMonthView: this.onHeaderShowMonthPress, onShowYearView: this.onHeaderShowYearPress, hideWeekNumbers: this.hideWeekNumbers, _currentPicker: this._calendarCurrentPicker, _pickersMode: this._calendarPickersMode, children: _jsx(CalendarDateRange, { startValue: this.startValue, endValue: this.endValue }) }));
}
//# sourceMappingURL=DateRangePickerTemplate.js.map