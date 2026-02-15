import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import BusyIndicator from "./BusyIndicator.js";
import BusyIndicatorSize from "./types/BusyIndicatorSize.js";
export default function ButtonTemplate(injectedProps) {
    return (_jsxs(_Fragment, { children: [_jsxs("button", { type: "button", class: {
                    "ui5-button-root": true,
                    "ui5-button-badge-placement-end": this.badge[0]?.design === "InlineText",
                    "ui5-button-badge-placement-end-top": this.badge[0]?.design === "OverlayText",
                    "ui5-button-badge-dot": this.badge[0]?.design === "AttentionDot"
                }, disabled: this.disabled, "data-sap-focus-ref": true, "aria-pressed": injectedProps?.ariaPressed, "aria-valuemin": injectedProps?.ariaValueMin, "aria-valuemax": injectedProps?.ariaValueMax, "aria-valuenow": injectedProps?.ariaValueNow, "aria-valuetext": injectedProps?.ariaValueText, onFocusOut: this._onfocusout, onClick: this._onclick, onMouseDown: this._onmousedown, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onTouchStart: this._ontouchstart, onTouchEnd: this._ontouchend, tabindex: this.tabIndexValue, "aria-expanded": this._computedAccessibilityAttributes?.expanded, "aria-controls": this._computedAccessibilityAttributes?.controls, "aria-haspopup": this._computedAccessibilityAttributes?.hasPopup, "aria-label": this._computedAccessibilityAttributes?.ariaLabel, "aria-keyshortcuts": this._computedAccessibilityAttributes?.ariaKeyShortcuts, "aria-description": this.ariaDescriptionText, "aria-busy": this.loading ? "true" : undefined, title: this.buttonTitle, part: "button", role: this.effectiveAccRole, children: [this.icon &&
                        _jsx(Icon, { class: "ui5-button-icon", name: this.icon, mode: "Decorative", part: "icon" }), _jsx("span", { id: `${this._id}-content`, class: "ui5-button-text", children: _jsx("bdi", { children: _jsx("slot", {}) }) }), this.endIcon &&
                        _jsx(Icon, { class: "ui5-button-end-icon", name: this.endIcon, mode: "Decorative", part: "endIcon" }), this.shouldRenderBadge &&
                        _jsx("slot", { name: "badge" })] }), this.loading &&
                _jsx(BusyIndicator, { id: `${this._id}-button-busy-indicator`, class: "ui5-button-busy-indicator", size: this.iconOnly ? BusyIndicatorSize.S : BusyIndicatorSize.M, active: true, delay: this.loadingDelay, inert: this.loading })] }));
}
//# sourceMappingURL=ButtonTemplate.js.map