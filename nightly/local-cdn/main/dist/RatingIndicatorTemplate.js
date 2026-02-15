import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
export default function RatingIndicatorTemplate() {
    return (_jsx("div", { class: "ui5-rating-indicator-root", role: "slider", "aria-roledescription": this._ariaRoleDescription, "aria-valuemin": 0, "aria-valuenow": this.value, "aria-valuemax": this.max, "aria-valuetext": `${this.value} of ${this.max}`, "aria-orientation": "horizontal", "aria-disabled": this._ariaDisabled, "aria-readonly": this.ariaReadonly, "aria-description": this._ariaDescription, tabindex: this.effectiveTabIndex, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onClick: this._onclick, onKeyDown: this._onkeydown, title: this.ratingTooltip, "aria-label": this._ariaLabel, children: _jsx("ul", { class: "ui5-rating-indicator-list", "aria-hidden": "true", children: this._stars.map(star => starLi.call(this, star)) }) }));
}
function starLi(star) {
    if (star.selected) {
        return (_jsx("li", { "data-ui5-value": star.index, class: "ui5-rating-indicator-item ui5-rating-indicator-item-sel", children: _jsx(Icon, { "data-ui5-value": star.index, name: this.effectiveIconSelected }) }));
    }
    if (star.halfStar) {
        return (_jsxs("li", { class: "ui5-rating-indicator-item ui5-rating-indicator-item-half", children: [_jsx("div", { class: "ui5-rating-indicator-half-icon-wrapper ui5-rating-indicator-half-icon-left", children: _jsx(Icon, { "data-ui5-value": star.index, name: this.effectiveIconSelected }) }), _jsx("div", { class: "ui5-rating-indicator-half-icon-wrapper ui5-rating-indicator-half-icon-right", children: _jsx(Icon, { "data-ui5-value": star.index, name: halfStarIconName.call(this) }) })] }));
    }
    if (this.readonly) {
        return (_jsx("li", { class: "ui5-rating-indicator-item ui5-rating-indicator-item-unsel", children: _jsx(Icon, { "data-ui5-value": star.index, name: this.effectiveIconSelected }) }));
    }
    if (this.disabled) {
        return (_jsx("li", { class: "ui5-rating-indicator-item ui5-rating-indicator-item-unsel", children: _jsx(Icon, { "data-ui5-value": star.index, name: this.effectiveIconSelected }) }));
    }
    return (_jsx("li", { "data-ui5-value": star.index, class: "ui5-rating-indicator-item ui5-rating-indicator-item-unsel", children: _jsx(Icon, { "data-ui5-value": star.index, name: this.effectiveIconUnselected }) }));
}
function halfStarIconName() {
    return this.disabled || this.readonly ? this.effectiveIconSelected : this.effectiveIconUnselected;
}
//# sourceMappingURL=RatingIndicatorTemplate.js.map