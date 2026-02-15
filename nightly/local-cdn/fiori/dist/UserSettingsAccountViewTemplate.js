import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import personPlaceholder from "@ui5/webcomponents-icons/dist/person-placeholder.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";
import userSettings from "@ui5/webcomponents-icons/dist/user-settings.js";
export default function UserSettingsAccountViewTemplate() {
    return (_jsx("div", { class: "ui5-user-settings-view-container", children: _jsxs("div", { class: "ui5-user-settings-view ui5-user-settings-account-view", children: [_jsxs("div", { class: "ui5-user-settings-account", children: [_jsxs(Avatar, { size: "XL", onClick: this._handleEditAvatarClick, initials: this._account?._initials, fallbackIcon: personPlaceholder, class: "ui5-user-settings-account-avatar", interactive: true, children: [this._account?.avatarSrc &&
                                    _jsx("img", { src: this._account.avatarSrc }), _jsx(Tag, { slot: "badge", wrappingType: "None", design: "Set1", colorScheme: "5", title: this._editAvatarTooltip, children: _jsx(Icon, { slot: "icon", name: edit }) })] }), this._account?.titleText &&
                            _jsx(Text, { id: "account-title", class: "ui5-user-settings-account-title", children: this._account.titleText }), this._account?.subtitleText &&
                            _jsx(Text, { class: "ui5-user-settings-account-subtitleText", children: this._account.subtitleText }), this._account?.description &&
                            _jsx(Text, { class: "ui5-user-settings-account-description", children: this._account.description }), this.showManageAccount &&
                            _jsx(Button, { id: "account-manage-btn", icon: userSettings, class: "ui5-user-settings-account-btn", onClick: this._handleManageAccountClick, children: this._manageAccountButtonText })] }), _jsx("slot", {})] }) }));
}
//# sourceMappingURL=UserSettingsAccountViewTemplate.js.map