import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Label from "./Label.js";
export default function BusyIndicatorTemplate() {
    return (_jsxs("div", { class: "ui5-busy-indicator-root", children: [this._isBusy && (_jsxs("div", { class: {
                    "ui5-busy-indicator-busy-area": true,
                    "ui5-busy-indicator-busy-area-over-content": this.hasContent,
                }, title: this.ariaTitle, tabindex: 0, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuetext": "Busy", "aria-labelledby": this.labelId, "data-sap-focus-ref": true, children: [this.textPosition.top && BusyIndicatorBusyText.call(this), _jsxs("div", { class: "ui5-busy-indicator-circles-wrapper", children: [_jsx("div", { class: "ui5-busy-indicator-circle circle-animation-0" }), _jsx("div", { class: "ui5-busy-indicator-circle circle-animation-1" }), _jsx("div", { class: "ui5-busy-indicator-circle circle-animation-2" })] }), this.textPosition.bottom && BusyIndicatorBusyText.call(this)] })), _jsx("slot", {}), this._isBusy && (_jsx("span", { "data-ui5-focus-redirect": true, tabindex: 0, role: "none", onFocusIn: this._redirectFocus }))] }));
}
function BusyIndicatorBusyText() {
    return (_jsx(_Fragment, { children: this.text && (_jsx(Label, { id: `${this._id}-label`, class: "ui5-busy-indicator-text", children: this.text })) }));
}
//# sourceMappingURL=BusyIndicatorTemplate.js.map