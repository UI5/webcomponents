import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Calendar from "./Calendar.js";
import CalendarDateRange from "./CalendarDateRange.js";
import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";
import Button from "./Button.js";
export default function DateRangePickerTemplate() {
    return [
        DatePickerInputTemplate.call(this),
        DatePickerPopoverTemplate.call(this, { content, initialFocus: this.initialFocusId, footer: this._isPhone ? footer : undefined }),
    ];
}
function content() {
    return (_jsx(Calendar, { id: `${this._id}-calendar`, primaryCalendarType: this._primaryCalendarType, secondaryCalendarType: this.secondaryCalendarType, formatPattern: this._formatPattern, selectionMode: this._calendarSelectionMode, minDate: this.minDate, maxDate: this.maxDate, calendarWeekNumbering: this.calendarWeekNumbering, onSelectionChange: this.onSelectedDatesChange, onShowMonthView: this.onHeaderShowMonthPress, onShowYearView: this.onHeaderShowYearPress, hideWeekNumbers: this.hideWeekNumbers, _currentPicker: this._calendarCurrentPicker, _pickersMode: this._calendarPickersMode, _showTwoMonths: this.showTwoMonths, children: _jsx(CalendarDateRange, { startValue: this.startValue, endValue: this.endValue }) }));
}
function footer() {
    return (_jsxs("div", { slot: "footer", class: "ui5-dt-picker-footer", children: [_jsx(Button, { id: "ok", class: "ui5-dt-picker-action", design: "Emphasized", disabled: this._submitDisabled, onClick: this._submitClick, children: this._okButtonText }), _jsx(Button, { id: "cancel", class: "ui5-dt-picker-action", design: "Transparent", onClick: this._cancelClick, children: this._cancelButtonText })] }));
}
//# sourceMappingURL=DateRangePickerTemplate.js.map