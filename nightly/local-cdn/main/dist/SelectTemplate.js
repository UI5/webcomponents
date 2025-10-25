import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import SelectPopoverTemplate from "./SelectPopoverTemplate.js";
export default function SelectTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: {
                    "ui5-select-root": true,
                    "ui5-input-focusable-element": true,
                }, id: `${this._id}-select`, onClick: this._onclick, title: this._effectiveTooltip, children: [!this.icon && this.selectedOptionIcon &&
                        _jsx(Icon, { mode: "Decorative", class: "ui5-select-option-icon", name: this.selectedOptionIcon }), _jsx("div", { class: "ui5-select-label-root", "data-sap-focus-ref": true, tabindex: this._effectiveTabIndex, role: "combobox", "aria-haspopup": "listbox", "aria-label": this.ariaLabelText, ...this.ariaDescribedByIds && {
                            "aria-describedby": this.ariaDescribedByIds
                        }, "aria-disabled": this.isDisabled, "aria-required": this.required, "aria-readonly": this.readonly, "aria-expanded": this._isPickerOpen, "aria-roledescription": this._ariaRoleDescription, onKeyDown: this._onkeydown, onKeyPress: this._handleKeyboardNavigation, onKeyUp: this._onkeyup, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, "aria-controls": this.responsivePopoverId, children: this.hasCustomLabel
                            ? _jsx("slot", { name: "label" })
                            : this.text }), this.icon &&
                        _jsx("div", { class: {
                                "ui5-select-icon-root": true,
                                "inputIcon": true,
                                "inputIcon--pressed": this._iconPressed,
                            }, children: _jsx(Icon, { name: this.icon, class: {
                                    "ui5-select-icon": true,
                                } }) }), !this.icon && !this.readonly &&
                        _jsx("div", { part: "icon-wrapper", class: {
                                "ui5-select-icon-root": true,
                                "inputIcon": true,
                                "inputIcon--pressed": this._iconPressed,
                            }, children: _jsx(Icon, { part: "icon", name: slimArrowDown, class: {
                                    "ui5-select-icon": true,
                                } }) }), this.hasValueState &&
                        _jsx("span", { id: `${this._id}-valueStateDesc`, class: "ui5-hidden-text", children: this.valueStateText }), this.ariaDescriptionText &&
                        _jsx("span", { id: "accessibleDescription", class: "ui5-hidden-text", children: this.ariaDescriptionText })] }), SelectPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=SelectTemplate.js.map