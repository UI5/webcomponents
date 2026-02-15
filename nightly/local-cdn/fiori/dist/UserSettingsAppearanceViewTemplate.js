import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import List from "@ui5/webcomponents/dist/List.js";
export default function UserSettingsAppearanceViewTemplate() {
    return (_jsx("div", { class: "ui5-user-settings-view-container", children: _jsxs("div", { class: "ui5-user-settings-view", children: [_jsx("slot", { name: "additionalContent" }), _jsx(List, { "header-text": this.text, class: "user-settings-appearance-view-list", onItemClick: this._handleItemClick, children: _jsx("slot", {}) })] }) }));
}
//# sourceMappingURL=UserSettingsAppearanceViewTemplate.js.map