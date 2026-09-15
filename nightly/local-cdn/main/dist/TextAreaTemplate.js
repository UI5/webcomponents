import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import TextAreaPopoverTemplate from "./TextAreaPopoverTemplate.js";
export default function TextAreaTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: this.classes.root, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, children: [_jsxs("div", { class: "ui5-textarea-wrapper", children: [this.growing &&
                                _jsx("div", { id: `${this._id}-mirror`, class: "ui5-textarea-mirror", "aria-hidden": "true", children: this._mirrorText.map(mirrorText => {
                                        return (_jsxs(_Fragment, { children: [mirrorText.text, _jsx("br", {})] }));
                                    }) }), _jsx("textarea", { id: `${this._id}-inner`, class: "ui5-textarea-inner", part: "textarea", placeholder: this.placeholder, disabled: this.disabled, readonly: this.readonly, "aria-label": this.ariaLabelText, "aria-describedby": this.ariaDescribedBy, "aria-invalid": this._ariaInvalid, "aria-required": this.required, maxlength: this._exceededTextProps.calcedMaxLength, value: this.value, "data-sap-focus-ref": true, onInput: this._oninput, onChange: this._onchange, onKeyUp: this._onkeyup, onKeyDown: this._onkeydown, onSelect: this._onselect, onScroll: this._onscroll })] }), afterTextarea.call(this), this.showExceededText &&
                        _jsx("span", { class: "ui5-textarea-exceeded-text", children: this._exceededTextProps.exceededText }), this.ariaDescriptionText &&
                        _jsx("span", { id: "accessibleDescription", class: "ui5-hidden-text", children: this.ariaDescriptionText }), this.hasValueState &&
                        _jsx("span", { id: `${this._id}-valueStateDesc`, class: "ui5-hidden-text", children: this.ariaValueStateHiddenText })] }), TextAreaPopoverTemplate.call(this)] }));
}
function afterTextarea() { }
//# sourceMappingURL=TextAreaTemplate.js.map