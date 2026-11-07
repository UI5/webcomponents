import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import DatePickerInputTemplate from "./DatePickerInputTemplate.js";
import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js";
import Button from "./Button.js";
import Calendar from "./Calendar.js";
import CalendarDate from "./CalendarDate.js";
import SegmentedButton from "./SegmentedButton.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";
export default function DateTimePickerTemplate() {
    return [
        DatePickerInputTemplate.call(this),
        DatePickerPopoverTemplate.call(this, { content, footer, initialFocus: this.initialFocusId }),
    ];
}
function content() {
    return (_jsxs(_Fragment, { children: [this._phoneView &&
                _jsx("div", { class: "ui5-dt-picker-header", children: _jsxs(SegmentedButton, { class: "ui5-dt-picker-toggle-button", onSelectionChange: this._dateTimeSwitchChange, children: [_jsx(SegmentedButtonItem, { "data-ui5-key": "Date", selected: this.showDateView, children: this.btnDateLabel }), _jsx(SegmentedButtonItem, { "data-ui5-key": "Time", selected: this.showTimeView, children: this.btnTimeLabel })] }) }), _jsxs("div", { class: {
                    "ui5-dt-picker-content": true,
                    "ui5-dt-picker-content--phone": this._phoneView,
                }, children: [_jsx(Calendar, { class: {
                            "ui5-dt-cal": true,
                            "ui5-dt-cal--hidden": this._phoneView && this.showTimeView,
                            "ui5-dt-time--hidden": this._phoneView && this.showDateView,
                        }, id: `${this._id}-calendar`, primaryCalendarType: this._primaryCalendarType, secondaryCalendarType: this.secondaryCalendarType, formatPattern: this._formatPattern, selectionMode: this._calendarSelectionMode, minDate: this.minDate, maxDate: this.maxDate, calendarWeekNumbering: this.calendarWeekNumbering, onSelectionChange: this.onSelectedDatesChange, onShowMonthView: this.onHeaderShowMonthPress, onShowYearView: this.onHeaderShowYearPress, hideWeekNumbers: this.hideWeekNumbers, _currentPicker: this._calendarCurrentPicker, children: this._calendarSelectedDates.map(date => _jsx(CalendarDate, { value: date })) }), !this._phoneView && _jsx("span", { class: "ui5-dt-picker-separator" }), this.showTimeView &&
                        _jsx(TimeSelectionClocks, { id: `${this._id}-time-sel`, class: {
                                "ui5-dt-time": true,
                                "ui5-dt-cal--hidden": this._phoneView && this.showTimeView,
                                "ui5-dt-time--hidden": this._phoneView && this.showDateView,
                            }, formatPattern: this._formatPattern, value: this._timeSelectionValue, onChange: this.onTimeSelectionChange, _calendarType: this._primaryCalendarType })] })] }));
}
function footer() {
    return (_jsxs("div", { slot: "footer", class: {
            "ui5-dt-picker-footer": true,
            "ui5-dt-picker-footer-time-hidden": (this._phoneView && this.showTimeView) || (this._phoneView && this.showDateView)
        }, children: [_jsx(Button, { id: "ok", class: "ui5-dt-picker-action", design: "Emphasized", disabled: this._submitDisabled, onClick: this._submitClick, children: this.btnOKLabel }), _jsx(Button, { id: "cancel", class: "ui5-dt-picker-action", design: "Transparent", onClick: this._cancelClick, children: this.btnCancelLabel })] }));
}
//# sourceMappingURL=DateTimePickerTemplate.js.map