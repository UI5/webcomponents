import { jsx as _jsx, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
export default function InputIconTemplate() {
    return (_jsx(_Fragment, { children: !this.readonly &&
            _jsx("div", { class: {
                    "ui5-input-icon-root": true,
                    "inputIcon": true,
                    "inputIcon--pressed": this._pressed,
                    "inputIcon--focused": this._focused,
                    "inputIcon--disabled": this.disabled,
                }, role: "button", tabindex: this.effectiveTabIndex, "aria-label": this.effectiveAriaLabel, "aria-disabled": this.disabled, title: this.effectiveTitle, onClick: this._onclick, onMouseDown: this._onmousedown, onMouseUp: this._onmouseup, onMouseLeave: this._onmouseleave, onFocus: this._onfocus, onBlur: this._onblur, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, part: "root", children: this.name && (_jsx(Icon, { name: this.name, class: "ui5-input-icon-inner", "aria-hidden": "true" })) }) }));
}
//# sourceMappingURL=InputIconTemplate.js.map