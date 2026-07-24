import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemGroupHeader from "@ui5/webcomponents/dist/ListItemGroupHeader.js";
export default function UserSettingsAppearanceViewTemplate() {
    return (_jsx("div", { class: "ui5-user-settings-view-container", children: _jsxs("div", { class: "ui5-user-settings-view", children: [_jsx("slot", { name: "additionalContent" }), _jsxs(List, { class: "user-settings-appearance-view-list", onItemClick: this._handleItemClick, "data-sap-ui-fastnavgroup": "false", children: [this.text && _jsx(ListItemGroupHeader, { class: "user-settings-appearance-view-top-header", children: this.text }), _jsx("slot", {})] })] }) }));
}
//# sourceMappingURL=UserSettingsAppearanceViewTemplate.js.map