import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function MenuItemGroupTemplate() {
    return (_jsx("div", { role: "group", "aria-label": this.ariaLabelText, "onui5-check": this._handleItemCheck, children: _jsx("slot", {}) }));
}
//# sourceMappingURL=MenuItemGroupTemplate.js.map