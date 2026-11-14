import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Bar from "./Bar.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";
import TimeSelectionInputs from "./TimeSelectionInputs.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";
import keyboardAndMouse from "@ui5/webcomponents-icons/dist/keyboard-and-mouse.js";
import timeEntryRequest from "@ui5/webcomponents-icons/dist/time-entry-request.js";
export default function TimePickerPopoverTemplate() {
    return (_jsxs(ResponsivePopover, { id: `${this._id}-responsive-popover`, class: "ui5-time-picker-popover ui5-popover-with-value-state-header-phone", placement: "Bottom", horizontalAlign: "Start", opener: this, open: this.open, allowTargetOverlap: true, _hideHeader: this._shouldHideHeader, hideArrow: true, preventInitialFocus: this._preventPickerInitialFocus, accessibleName: this.pickerAccessibleName, onClose: this.onResponsivePopoverAfterClose, onBeforeOpen: this.onResponsivePopoverBeforeOpen, onOpen: this.onResponsivePopoverAfterOpen, onWheel: this._handleWheel, onKeyDown: this._onkeydown, children: [!!this.showHeader && defaultHeader.call(this), this.shouldDisplayValueStateMessageInResponsivePopover && valueStateTextHeader.call(this), this._useInputs
                ? _jsx(TimeSelectionInputs, { id: `${this._id}-time-sel`, class: "ui5-tp-mode-inputs", value: this._timeSelectionValue, formatPattern: this._formatPattern, _showLabels: true, onChange: this.onTimeSelectionChange })
                : _jsx(TimeSelectionClocks, { id: `${this._id}-time-sel`, value: this._timeSelectionValue, formatPattern: this._formatPattern, onChange: this.onTimeSelectionChange, onClosePicker: this.submitPickers }), _jsxs("div", { slot: "footer", class: "ui5-time-picker-footer", children: [_jsx(Button, { id: "submit", design: "Emphasized", onClick: this.submitPickers, children: this.submitButtonLabel }), _jsx(Button, { id: "close", design: "Transparent", onClick: this._togglePicker, children: this.cancelButtonLabel })] })] }));
}
function defaultHeader() {
    return (_jsxs(Bar, { slot: "header", design: "Header", children: [_jsx("span", { class: "ui5-tp-header-title", slot: "startContent", children: this._headerTitleText }), _jsx(Button, { id: `${this._id}-mode-toggle`, slot: "endContent", design: "Transparent", icon: this._useInputs ? timeEntryRequest : keyboardAndMouse, tooltip: this._pickerModeToggleLabel, accessibleName: this._pickerModeToggleAccessibleName, accessibleDescription: this._pickerModeToggleAccessibleDesc, onClick: this._togglePickerMode })] }));
}
function valueStateMessage() {
    return (this.shouldDisplayDefaultValueStateMessage ? this.valueStateDefaultText : _jsx("slot", { name: "valueStateMessage" }));
}
function valueStateTextHeader() {
    if (!this.hasValueStateText) {
        return;
    }
    return (_jsxs("div", { slot: !this.showHeader ? "header" : undefined, class: {
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
//# sourceMappingURL=TimePickerPopoverTemplate.js.map