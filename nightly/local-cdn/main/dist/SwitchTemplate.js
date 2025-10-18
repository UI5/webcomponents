import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import { isDesktop, isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import acceptIcon from "@ui5/webcomponents-icons/dist/accept.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";
export default function SwitchTemplate() {
    return (_jsxs("div", { class: {
            "ui5-switch-root": true,
            "ui5-switch--desktop": isDesktop(),
            "ui5-switch--disabled": this.disabled,
            "ui5-switch--checked": this.checked,
            "ui5-switch--semantic": this.graphical,
            "ui5-switch--no-label": !(this.graphical || this.textOn || this.textOff),
            "ui5-switch--safari": isSafari(),
        }, role: "switch", "aria-label": this.ariaLabelText, "aria-checked": this.checked, "aria-disabled": this.effectiveAriaDisabled, "aria-required": this.required, onClick: this._onclick, onKeyUp: this._onkeyup, onKeyDown: this._onkeydown, tabindex: this.effectiveTabIndex, title: this.tooltip, children: [_jsx("div", { class: "ui5-switch-inner", children: _jsx("div", { class: "ui5-switch-track", part: "slider", children: _jsxs("div", { class: "ui5-switch-slider", children: [this.graphical ?
                                _jsxs(_Fragment, { children: [_jsx("span", { class: "ui5-switch-text ui5-switch-text--on", children: _jsx(Icon, { name: acceptIcon, class: "ui5-switch-icon-on" }) }), _jsx("span", { class: "ui5-switch-text ui5-switch-text--off", children: _jsx(Icon, { name: declineIcon, class: "ui5-switch-icon-off" }) })] })
                                :
                                    _jsx(_Fragment, { children: this.hasNoLabel ?
                                            _jsxs(_Fragment, { children: [_jsx("span", { class: "ui5-switch-text ui5-switch-text--on ui5-switch-no-label-icon", part: "text-on", children: _jsx(Icon, { name: this.sapNextIcon, class: "ui5-switch-no-label-icon-on" }) }), _jsx("span", { class: "ui5-switch-text ui5-switch-text--off ui5-switch-no-label-icon", part: "text-off", children: _jsx(Icon, { name: this.sapNextIcon, class: "ui5-switch-no-label-icon-off" }) })] })
                                            :
                                                _jsxs(_Fragment, { children: [_jsx("span", { class: "ui5-switch-text ui5-switch-text--on", part: "text-on", children: this._textOn }), _jsx("span", { class: "ui5-switch-text ui5-switch-text--off", part: "text-off", children: this._textOff })] }) }), _jsx("span", { class: "ui5-switch-handle", part: "handle" })] }) }) }), _jsx("input", { type: 'checkbox', checked: this.checked, class: "ui5-switch-input", "data-sap-no-tab-ref": true })] }));
}
//# sourceMappingURL=SwitchTemplate.js.map