import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
export default function LinkTemplate() {
    return (_jsxs("a", { part: "root", class: "ui5-link-root", role: this.effectiveAccRole, href: this.parsedRef, target: this.target, rel: this._rel, tabindex: this.effectiveTabIndex, title: this.tooltip, "aria-disabled": this.disabled, "aria-label": this.ariaLabelText, "aria-haspopup": this._hasPopup, "aria-expanded": this.accessibilityAttributes.expanded, "aria-current": this.accessibilityAttributes.current, "aria-description": this.ariaDescriptionText, onClick: this._onclick, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: [this.icon &&
                _jsx(Icon, { class: "ui5-link-icon", name: this.icon, mode: "Decorative", part: "icon" }), _jsx("span", { class: "ui5-link-text", children: _jsx("slot", {}) }), this.hasLinkType &&
                _jsx("span", { class: "ui5-hidden-text", children: this.linkTypeText }), this.endIcon &&
                _jsx(Icon, { class: "ui5-link-end-icon", name: this.endIcon, mode: "Decorative", part: "endIcon" })] }));
}
//# sourceMappingURL=LinkTemplate.js.map