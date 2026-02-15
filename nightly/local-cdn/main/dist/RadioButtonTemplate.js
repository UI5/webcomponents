import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import Label from "./Label.js";
export default function RadioButtonTemplate() {
    return (_jsxs("div", { role: "radio", class: "ui5-radio-root", "aria-checked": this.checked, "aria-disabled": this.effectiveAriaDisabled, "aria-describedby": this.effectiveAriaDescribedBy, "aria-label": this.ariaLabelText, tabindex: this.effectiveTabIndex, onClick: this._onclick, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onMouseDown: this._onmousedown, onMouseUp: this._onmouseup, onFocusOut: this._onfocusout, children: [_jsxs("div", { class: {
                    "ui5-radio-inner": true,
                    "ui5-radio-inner--hoverable": !this.disabled && !this.readonly && isDesktop(),
                }, children: [_jsxs("svg", { class: "ui5-radio-svg", focusable: "false", "aria-hidden": "true", children: [_jsx("circle", { part: "outer-ring", class: "ui5-radio-svg-outer", cx: "50%", cy: "50%", r: "50%" }), _jsx("circle", { part: "inner-ring", class: "ui5-radio-svg-inner", cx: "50%", cy: "50%" })] }), _jsx("input", { type: "radio", required: this.required, checked: this.checked, readonly: this.readonly, disabled: this.disabled, name: this.name, "data-sap-no-tab-ref": true })] }), this.text &&
                _jsx(Label, { id: `${this._id}-label`, class: "ui5-radio-label", for: this._id, wrappingType: this.wrappingType, children: this.text }), this.hasValueState &&
                _jsx("span", { id: `${this._id}-descr`, class: "ui5-hidden-text", children: this.valueStateText })] }));
}
//# sourceMappingURL=RadioButtonTemplate.js.map