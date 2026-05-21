import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import MenuItemTemplate from "@ui5/webcomponents/dist/MenuItemTemplate.js";
export default function UserMenuItemTemplate() {
    const hooks = {};
    if (this.showSelection) {
        hooks.menuItemTextContent = userMenuItemTextContent;
    }
    return [MenuItemTemplate.call(this, hooks)];
}
function userMenuItemTextContent() {
    return (_jsxs("div", { class: "ui5-user-menu-item-text-wrapper", children: [this.text && _jsx("div", { class: "ui5-menu-item-text", children: this.text }), this._selectedSubItemText &&
                _jsx("div", { class: "ui5-user-menu-item-selection-text", children: this._selectedSubItemText })] }));
}
//# sourceMappingURL=UserMenuItemTemplate.js.map