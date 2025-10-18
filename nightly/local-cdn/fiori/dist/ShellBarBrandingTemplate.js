import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function ShellBarBrandingTemplate() {
    return (_jsxs("a", { class: "ui5-shellbar-branding-root", href: this.parsedRef, target: this.target, role: this._role, tabIndex: 0, "aria-label": this.accessibleNameText, onClick: this._onclick, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: [_jsx("span", { class: "ui5-shellbar-logo", children: _jsx("slot", { name: "logo" }) }), !this._isSBreakPoint && (_jsx("bdi", { class: "ui5-shellbar-title", children: _jsx("slot", {}) }))] }));
}
//# sourceMappingURL=ShellBarBrandingTemplate.js.map