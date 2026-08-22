import { jsxs as _jsxs, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import Calendar from "./Calendar.js";
import Icon from "./Icon.js";
import CalendarDate from "./CalendarDate.js";
import ResponsivePopover from "./ResponsivePopover.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";
export default function DatePickerPopoverTemplate(hooks) {
    const header = hooks?.header || defaultHeader;
    const content = hooks?.content || defaultContent;
    const footer = hooks?.footer || defaultFooter;
    const initialFocus = hooks?.initialFocus;
    return (_jsxs(ResponsivePopover, { id: `${this._id}-responsive-popover`, class: "ui5-date-picker-popover ui5-popover-with-value-state-header-phone", opener: this, open: this.open, allowTargetOverlap: true, placement: "Bottom", horizontalAlign: "Start", accessibleName: this.pickerAccessibleName, hideArrow: true, _hideHeader: this._shouldHideHeader, initialFocus: initialFocus, onKeyDown: this._onkeydown, onClose: this.onResponsivePopoverAfterClose, onOpen: this.onResponsivePopoverAfterOpen, onBeforeOpen: this.onResponsivePopoverBeforeOpen, children: [this.showHeader && header.call(this), valueStateTextHeader.call(this), content.call(this), this.showFooter && footer.call(this)] }));
}
function defaultHeader() {
    return (_jsx("div", { slot: "header", class: "ui5-responsive-popover-header", children: _jsx("div", { class: "row", children: _jsx("span", { children: this._headerTitleText }) }) }));
}
function defaultContent() {
    return (_jsx(Calendar, { id: `${this._id}-calendar`, primaryCalendarType: this._primaryCalendarType, secondaryCalendarType: this.secondaryCalendarType, formatPattern: this._formatPattern, selectionMode: this._calendarSelectionMode, minDate: this.minDate, maxDate: this.maxDate, calendarWeekNumbering: this.calendarWeekNumbering, onSelectionChange: this.onSelectedDatesChange, onShowMonthView: this.onHeaderShowMonthPress, onShowYearView: this.onHeaderShowYearPress, hideWeekNumbers: this.hideWeekNumbers, _currentPicker: this._calendarCurrentPicker, _pickersMode: this._calendarPickersMode, children: this._calendarSelectedDates.map(date => _jsx(CalendarDate, { value: date })) }));
}
function valueStateMessage() {
    return (this.shouldDisplayDefaultValueStateMessage ? this.valueStateDefaultText : _jsx("slot", { name: "valueStateMessage" }));
}
function valueStateTextHeader() {
    if (!this.hasValueStateText) {
        return;
    }
    return (_jsxs("div", { slot: !isPhone() ? "header" : undefined, class: {
            "ui5-popover-header": true,
            "ui5-valuestatemessage-header": true,
            "ui5-valuestatemessage-root": true,
            "ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
            "ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
            "ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
            "ui5-valuestatemessage--information": this.valueState === ValueState.Information,
        }, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: valueStateMessageInputIcon.call(this) }), valueStateMessage.call(this)] }));
}
function valueStateMessageInputIcon() {
    const iconPerValueState = {
        Negative: error,
        Critical: alert,
        Positive: sysEnter2,
        Information: information,
    };
    return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
}
function defaultFooter() {
    return (_jsx("div", { slot: "footer", class: {
            "ui5-dt-picker-footer": true,
            "ui5-dt-picker-footer-time-hidden": isPhone()
        }, children: _jsx(Button, { id: "cancel", class: "ui5-dt-picker-action", design: "Transparent", onClick: this._togglePicker, children: this.btnCancelLabel }) }));
}
//# sourceMappingURL=DatePickerPopoverTemplate.js.map