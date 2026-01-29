import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import ComboBoxPopoverTemplate from "./ComboBoxPopoverTemplate.js";
export default function ComboBoxTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: "ui5-combobox-root ui5-input-focusable-element", children: [this.hasValueState &&
                        _jsx("span", { id: "value-state-description", class: "ui5-hidden-text", children: this.ariaValueStateHiddenText }), this.linksInAriaValueStateHiddenText.length > 0 &&
                        _jsx("span", { id: "hiddenText-value-state-link-shortcut", class: "ui5-hidden-text", children: this.valueStateLinksShortcutsTextAcc }), _jsx("input", { id: "ui5-combobox-input", value: this.value, "inner-input": true, placeholder: this.placeholder, disabled: this.disabled, readonly: this.readonly, "value-state": this.valueState, onKeyDown: this._keydown, onInput: this._input, onChange: this._inputChange, onClick: this._click, onKeyUp: this._keyup, onFocusIn: this._focusin, onFocusOut: this._focusout, "aria-expanded": this.open, role: "combobox", "aria-haspopup": "dialog", "aria-autocomplete": "both", "aria-describedby": this.ariaDescribedByText, "aria-label": this.ariaLabelText, "aria-required": this.required, "aria-controls": this.responsivePopoverId, autocomplete: "off", "data-sap-focus-ref": true }), this._effectiveShowClearIcon &&
                        _jsx("div", { onClick: this._clear, class: "ui5-input-clear-icon-wrapper inputIcon", tabindex: -1, children: _jsx(Icon, { tabindex: -1, class: "ui5-input-clear-icon", name: decline, accessibleName: this.clearIconAccessibleName }) }), this.icon &&
                        _jsx("slot", { name: "icon" }), !this.readonly &&
                        _jsx(Icon, { slot: "icon", name: slimArrowDown, tabindex: -1, class: {
                                "inputIcon": true,
                                "inputIcon--pressed": this._iconPressed,
                            }, accessibleName: this._iconAccessibleNameText, onClick: this._arrowClick })] }), ComboBoxPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=ComboBoxTemplate.js.map