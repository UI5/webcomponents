import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function OptionGroupTemplate() {
    return (_jsxs("div", { class: "ui5-option-group-root", role: "group", "aria-label": this.headerText || undefined, "aria-roledescription": this._groupHeaderRoleDescription, children: [this.headerText &&
                _jsx("div", { class: "ui5-option-group-header", "aria-hidden": "true", children: this.headerText }), this.items.map((item) => _jsx("slot", { name: item._individualSlot }))] }));
}
//# sourceMappingURL=OptionGroupTemplate.js.map