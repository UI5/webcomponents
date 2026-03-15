import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Link from "@ui5/webcomponents/dist/Link.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import TimelineLayout from "./types/TimelineLayout.js";
export default function TimelineItemTemplate() {
    // Create accessible label with status information
    const accessibleLabel = this._getAccessibleLabel;
    return (_jsxs("div", { class: "ui5-tli-root", children: [_jsx("div", { class: {
                    "ui5-tli-indicator": true,
                    "ui5-tli-indicator-short-line": this.forcedLineWidth === "ShortLineWidth",
                    "ui5-tli-indicator-large-line": this.forcedLineWidth === "LargeLineWidth",
                }, children: _jsx("div", { class: "ui5-tli-icon-outer", children: this.icon ?
                        _jsx(Icon, { class: "ui5-tli-icon", name: this.icon, mode: "Decorative" })
                        :
                            _jsx("div", { class: "ui5-tli-dummy-icon-container" }) }) }), !this.hideBubble &&
                _jsxs("div", { "data-sap-focus-ref": true, class: "ui5-tli-bubble", role: this.effectiveRole, tabindex: parseInt(this.forcedTabIndex), "aria-label": accessibleLabel, "aria-description": this.timelineItemStateText, children: [_jsxs("div", { class: "ui5-tli-title", children: [this.name && name.call(this), _jsx("span", { children: this.titleText })] }), _jsx("div", { class: "ui5-tli-subtitle", children: this.subtitleText }), this.content &&
                            _jsx("div", { class: "ui5-tli-desc", children: _jsx("slot", {}) }), _jsx("span", { class: {
                                "ui5-tli-bubble-arrow": true,
                                "ui5-tli-bubble-arrow--left": this.layout === TimelineLayout.Vertical,
                                "ui5-tli-bubble-arrow--top": this.layout === TimelineLayout.Horizontal,
                            } })] })] }));
}
function name() {
    return (_jsx(_Fragment, { children: this.nameClickable ?
            _jsxs(Link, { class: "ui5-tli-title-name-clickable", wrappingType: this.layout === TimelineLayout.Horizontal ? "None" : "Normal", onClick: this.onNamePress, children: [this.name, "\u00A0"] })
            :
                _jsxs("span", { class: "ui5-tli-title-name", children: [this.name, "\u00A0"] }) }));
}
//# sourceMappingURL=TimelineItemTemplate.js.map