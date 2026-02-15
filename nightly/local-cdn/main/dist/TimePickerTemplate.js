import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import DateTimeInput from "./DateTimeInput.js";
import TimePickerPopoverTemplate from "./TimePickerPopoverTemplate.js";
import timeEntryRequest from "@ui5/webcomponents-icons/dist/time-entry-request.js";
export default function TimePickerTemplate() {
    return (_jsxs(_Fragment, { children: [_jsx("div", { id: this._id, class: "ui5-time-picker-root", children: _jsxs(DateTimeInput, { "data-sap-focus-ref": true, id: `${this._id}-inner`, class: "ui5-time-picker-input", part: "input", value: this.value, placeholder: this._placeholder, disabled: this.disabled, readonly: this.readonly, required: this.required, valueState: this.valueState, _shouldOpenValueStatePopover: !this.open, _inputAccInfo: this.accInfo, onClick: this._handleInputClick, onChange: this._handleInputChange, onInput: this._handleInputLiveChange, "onui5-_request-submit": this._onInputRequestSubmit, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, children: [this.shouldDisplayValueStateMessageOnDesktop &&
                            _jsx("slot", { name: "valueStateMessage", slot: "valueStateMessage" }), !this.readonly &&
                            _jsx(Icon, { slot: "icon", name: timeEntryRequest, tabindex: -1, showTooltip: true, accessibleName: this.openIconTitle, mode: this._iconMode, onClick: this._togglePicker, class: {
                                    "ui5-time-picker-input-icon-button": true,
                                    "inputIcon": true,
                                    "inputIcon--pressed": this.open,
                                } })] }) }), TimePickerPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=TimePickerTemplate.js.map