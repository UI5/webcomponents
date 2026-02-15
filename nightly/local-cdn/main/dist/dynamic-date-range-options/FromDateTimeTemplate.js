import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Calendar from "../Calendar.js";
import CalendarDate from "../CalendarDate.js";
import SegmentedButton from "../SegmentedButton.js";
import SegmentedButtonItem from "../SegmentedButtonItem.js";
import TimeSelectionClocks from "../TimeSelectionClocks.js";
export default function FromDateTime() {
    const currentOption = this._currentOption;
    const currentValue = this.value?.values ? this.value.values[0] : undefined;
    return (_jsxs("div", { class: "ui5-dynamic-date-range-option-datetime-container", children: [_jsx("div", { class: "ui5-dt-picker-header", children: _jsxs(SegmentedButton, { class: "ui5-dt-picker-toggle-button", onSelectionChange: this.handleSelectionChange, children: [_jsx(SegmentedButtonItem, { "data-ui5-key": "Date", selected: currentOption.showDateView, children: currentOption.btnDateLabel }), _jsx(SegmentedButtonItem, { "data-ui5-key": "Time", selected: currentOption.showTimeView, children: currentOption.btnTimeLabel })] }) }), _jsxs("div", { class: {
                    "ui5-dt-picker-content": true,
                }, children: [!!currentOption.showDateView &&
                        _jsx(Calendar, { class: {
                                "ui5-dt-cal": true,
                                "ui5-dt-cal--hidden": currentOption.showTimeView,
                                "ui5-dt-time--hidden": currentOption.showDateView,
                            }, onSelectionChange: this.handleSelectionChange, children: _jsx(CalendarDate, { value: currentOption.getDateValue(currentValue) }) }), !!currentOption.showTimeView &&
                        _jsx(TimeSelectionClocks, { class: {
                                "ui5-dt-time": true,
                                "ui5-dt-cal--hidden": currentOption.showTimeView,
                                "ui5-dt-time--hidden": currentOption.showDateView,
                            }, value: currentOption.getTimeValue(currentValue), onChange: this.handleSelectionChange })] })] }));
}
//# sourceMappingURL=FromDateTimeTemplate.js.map