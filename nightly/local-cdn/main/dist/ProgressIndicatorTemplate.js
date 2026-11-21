import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import information from "@ui5/webcomponents-icons/dist/information.js";
import statusNegative from "@ui5/webcomponents-icons/dist/status-negative.js";
import statusPositive from "@ui5/webcomponents-icons/dist/status-positive.js";
import statusCritical from "@ui5/webcomponents-icons/dist/status-critical.js";
const valueStateIconMappings = {
    "Negative": statusNegative,
    "Critical": statusCritical,
    "Positive": statusPositive,
    "Information": information,
};
export default function ProgressIndicatorTemplate() {
    return (_jsxs("div", { class: {
            "ui5-progress-indicator-root": true,
            "ui5-progress-indicator-max-value": this.validatedValue === 100,
            "ui5-progress-indicator-min-value": this.validatedValue === 0,
        }, role: "progressbar", "aria-valuemin": 0, "aria-valuenow": this.validatedValue, "aria-valuemax": 100, "aria-valuetext": this.valueStateText, "aria-label": this.accessibleName, children: [_jsx("div", { class: "ui5-progress-indicator-bar", part: "bar", style: { "width": `${this.validatedValue}%`, "transition-duration": this.shouldAnimate ? `${this._transitionDuration}ms` : "none" }, children: !this.showValueInRemainingBar && valueLabel.call(this) }), _jsx("div", { class: "ui5-progress-indicator-remaining-bar", part: "remaining-bar", children: this.showValueInRemainingBar && valueLabel.call(this) })] }));
}
function valueLabel() {
    return (_jsxs(_Fragment, { children: [this.showIcon &&
                _jsx(Icon, { name: valueStateIcon.call(this), class: "ui5-progress-indicator-icon" }), !this.hideValue &&
                _jsxs("span", { class: "ui5-progress-indicator-value", children: [" ", this.displayValue ? this.displayValue : `${this.validatedValue}%`] })] }));
}
function valueStateIcon() {
    return valueStateIconMappings[this.valueState];
}
//# sourceMappingURL=ProgressIndicatorTemplate.js.map