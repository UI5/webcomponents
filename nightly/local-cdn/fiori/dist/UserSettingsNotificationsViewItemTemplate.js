import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemCustomTemplate from "@ui5/webcomponents/dist/ListItemCustomTemplate.js";
import Switch from "@ui5/webcomponents/dist/Switch.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
export default function UserSettingsNotificationsViewItemTemplate() {
    if (this._isHeaderItem) {
        return headerItemContent(this);
    }
    return ListItemCustomTemplate.call(this, {
        listItemContent: listItemContent.bind(this),
    });
}
function headerItemContent(item) {
    return (_jsxs("div", { class: "ui5-user-settings-notifications-form-item", role: "group", "aria-label": item._accessibleSwitchName, "data-sap-focus-ref": true, tabindex: item._effectiveTabIndex, onFocusIn: item._onfocusin, onFocusOut: item._onfocusout, onKeyUp: item._onkeyup, onKeyDown: item._onkeydown, onClick: item._handleFormItemClick, children: [itemBody(item), item.navigable &&
                _jsx(Icon, { class: "ui5-user-settings-notifications-item-arrow", name: slimArrowRight, mode: "Decorative" })] }));
}
function listItemContent() {
    return itemBody(this);
}
function itemBody(item) {
    return (_jsxs("div", { class: `ui5-user-settings-notifications-item${item.bylineText && item.text ? " has-byline" : ""}`, children: [_jsx("div", { class: "ui5-user-settings-notifications-item-start", children: _jsxs("div", { class: "ui5-user-settings-notifications-item-texts", children: [item.text &&
                            _jsx("span", { class: "ui5-user-settings-notifications-item-title", children: item.text }), item.bylineText &&
                            _jsx("span", { class: "ui5-user-settings-notifications-item-byline", children: item.bylineText })] }) }), _jsx("div", { class: "ui5-user-settings-notifications-item-end", children: item._hasEndContent
                    ? _jsx("slot", { name: "endContent", onClick: item._handleEndClick })
                    : _jsx(Switch, { class: "ui5-user-settings-notifications-item-switch", checked: item.checked, onChange: item._handleSwitchChange, accessibleName: item._accessibleSwitchName, onClick: item._handleEndClick }) })] }));
}
//# sourceMappingURL=UserSettingsNotificationsViewItemTemplate.js.map