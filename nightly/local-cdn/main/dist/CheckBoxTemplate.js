import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import Label from "./Label.js";
import Icon from "./Icon.js";
import accept from "@ui5/webcomponents-icons/dist/accept.js";
import complete from "@ui5/webcomponents-icons/dist/complete.js";
import border from "@ui5/webcomponents-icons/dist/border.js";
import triState from "@ui5/webcomponents-icons/dist/tri-state.js";
export default function CheckBoxTemplate() {
    return (_jsxs("div", { class: {
            "ui5-checkbox-root": true,
            "ui5-checkbox--hoverable": !this.disabled && !this.readonly && isDesktop(),
        }, role: this.accInfo.role, part: "root", "aria-checked": this.accInfo.ariaChecked, "aria-readonly": this.accInfo.ariaReadonly, "aria-disabled": this.accInfo.ariaDisabled, "aria-label": this.ariaLabelText, "aria-labelledby": this.ariaLabelledBy, "aria-describedby": this.ariaDescribedBy, "aria-required": this.accInfo.ariaRequired, tabindex: this.accInfo.tabindex, onMouseDown: this._onmousedown, onMouseUp: this._onmouseup, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onFocusOut: this._onfocusout, children: [this.isDisplayOnly ?
                _jsx("div", { class: "ui5-checkbox-display-only-icon-inner", children: _jsx(Icon, { "aria-hidden": "true", name: displayOnlyIcon.call(this), class: "ui5-checkbox-display-only-icon", part: "icon" }) })
                :
                    _jsx("div", { id: `${this._id}-CbBg`, class: "ui5-checkbox-inner", children: this.isCompletelyChecked &&
                            _jsx(Icon, { "aria-hidden": "true", name: accept, class: "ui5-checkbox-icon", part: "icon" }) }), this.accInfo.role === "checkbox" &&
                _jsx("input", { id: `${this._id}-CB`, type: "checkbox", checked: this.checked, value: this.value, readonly: this.readonly, disabled: this.disabled, tabindex: -1, "aria-hidden": "true", "data-sap-no-tab-ref": true }), this.text &&
                _jsx(Label, { id: `${this._id}-label`, part: "label", class: "ui5-checkbox-label", wrappingType: this.wrappingType, required: this.required, children: this.text }), this.hasValueState &&
                _jsx("span", { id: `${this._id}-descr`, class: "ui5-hidden-text", children: this.valueStateText })] }));
}
function displayOnlyIcon() {
    if (this.isCompletelyChecked) {
        return complete;
    }
    if (this.checked && this.indeterminate) {
        return triState;
    }
    return border;
}
//# sourceMappingURL=CheckBoxTemplate.js.map