import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import BusyIndicator from "./BusyIndicator.js";
export default function CardTemplate() {
    return (_jsx("div", { part: "root", role: "region", class: {
            "ui5-card-root": true,
            "ui5-card--interactive": this._hasHeader && this.header[0].interactive,
            "ui5-card--nocontent": !this.content.length,
        }, "aria-label": this._getAriaLabel, children: _jsx(BusyIndicator, { id: `${this._id}-busyIndicator`, delay: this.loadingDelay, active: this.loading, class: "ui5-card-busy-indicator", children: _jsxs("div", { class: "ui5-card-inner", children: [this._hasHeader &&
                        _jsx("div", { class: "ui5-card-header-root", children: _jsx("slot", { name: "header" }) }), _jsx("div", { role: "group", "aria-label": this._ariaCardContentLabel, part: "content", children: _jsx("slot", {}) })] }) }) }));
}
//# sourceMappingURL=CardTemplate.js.map