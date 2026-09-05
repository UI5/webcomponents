import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import List from "@ui5/webcomponents/dist/List.js";
export default function UserSettingsNotificationsViewTemplate() {
    return (_jsx("div", { class: "ui5-user-settings-view-container", children: _jsxs("div", { class: "ui5-user-settings-view ui5-user-settings-notifications-view-content", children: [_jsx("slot", { name: "additionalContent" }), this._hasHeaderItems && this.headerItems.map(item => (_jsx("div", { role: "form", class: "ui5-user-settings-notifications-view-form", "onui5-_form-item-click": this._handleFormItemClick, children: _jsx("slot", { name: item._individualSlot }) }))), _jsx(List, { class: "ui5-user-settings-notifications-view-list", separators: "All", onItemClick: this._handleItemClick, "data-sap-ui-fastnavgroup": "false", accessibleName: this._listAccessibleName, children: _jsx("slot", {}) })] }) }));
}
//# sourceMappingURL=UserSettingsNotificationsViewTemplate.js.map