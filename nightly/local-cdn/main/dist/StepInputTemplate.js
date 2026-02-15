import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import Input from "./Input.js";
import less from "@ui5/webcomponents-icons/dist/less.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
export default function StepInputTemplate() {
    return (_jsxs("div", { id: `${this._id}`, class: "ui5-step-input-root", onKeyDown: this._onkeydown, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onWheel: this._onMouseWheel, children: [!this.readonly &&
                _jsx("div", { class: "ui5-step-icon ui5-step-dec", title: this.decIconTitle, children: _jsx(Icon, { id: `${this._id}-dec`, name: less, tabindex: -1, accessibleName: this.decIconTitle, onClick: this._decValue, onFocusOut: this._onButtonFocusOut, onMouseDown: this._decSpin, onMouseUp: this._resetSpin, onMouseOut: this._resetSpinOut, class: {
                            "inputIcon": true,
                            "ui5-step-input-icon--clickable": this._decIconClickable,
                        }, showTooltip: true }) }), _jsx(Input, { id: `${this._id}-inner`, "data-sap-focus-ref": true, class: "ui5-step-input-input", placeholder: this.placeholder, type: this.type, value: this._displayValue, disabled: this.disabled, required: this.required, readonly: this.readonly, "onui5-_request-submit": this._onInputRequestSubmit, valueState: this.valueState, _inputAccInfo: this.accInfo, _nativeInputAttributes: this.inputAttributes, onChange: this._onInputChange, onFocusOut: this._onInputFocusOut, onFocusIn: this._onInputFocusIn, onInput: this._onInput, children: this.valueStateMessage.length > 0 &&
                    _jsx("slot", { name: "valueStateMessage", slot: "valueStateMessage" }) }), !this.readonly &&
                _jsx("div", { class: "ui5-step-icon ui5-step-inc", title: this.incIconTitle, children: _jsx(Icon, { id: `${this._id}-inc`, class: {
                            "inputIcon": true,
                            "ui5-step-input-icon--clickable": this._incIconClickable,
                        }, name: add, tabindex: -1, accessibleName: this.incIconTitle, onClick: this._incValue, onFocusOut: this._onButtonFocusOut, onMouseDown: this._incSpin, onMouseUp: this._resetSpin, onMouseOut: this._resetSpinOut, showTooltip: true }) })] }));
}
//# sourceMappingURL=StepInputTemplate.js.map