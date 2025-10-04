import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import Input from "./Input.js";
import appointment from "@ui5/webcomponents-icons/dist/appointment-2.js";
export default function DynamicDateRangeInputTemplate() {
    return (_jsx("div", { class: "ui5-dynamic-date-range-root", children: _jsx(Input, { "data-sap-focus-ref": true, id: `${this._id}-inner`, class: "ui5-dynamic-date-range-input", value: this.value && this.getOption(this.value?.operator)?.format(this.value), onChange: this.onInputChange, onKeyDown: this.onInputKeyDown, children: _jsx(Icon, { id: `${this._id}-value-help`, slot: "icon", name: appointment, tabindex: -1, mode: this._iconMode, onClick: this._togglePicker, class: {
                    "inputIcon": true,
                    "inputIcon--pressed": this.open,
                } }) }) }));
}
//# sourceMappingURL=DynamicDateRangeInputTemplate.js.map