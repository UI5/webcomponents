import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";
import personPlaceholder from "@ui5/webcomponents-icons/dist/person-placeholder.js";
import userSettings from "@ui5/webcomponents-icons/dist/user-settings.js";
import log from "@ui5/webcomponents-icons/dist/log.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import userEdit from "@ui5/webcomponents-icons/dist/user-edit.js";
import selectedAccount from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
export default function UserMenuTemplate() {
    return (_jsxs(ResponsivePopover, { id: "user-menu-rp", class: "ui5-user-menu-rp", placement: "Bottom", verticalAlign: "Bottom", horizontalAlign: "End", tabindex: -1, accessibleName: this.accessibleNameText, "aria-label": this.accessibleNameText, open: this.open, opener: this.opener, onClose: this._handlePopoverAfterClose, onOpen: this._handlePopoverAfterOpen, onScroll: this._handleScroll, children: [_jsxs(_Fragment, { children: [_jsxs(Bar, { class: {
                            "ui5-user-menu-fixed-header": true,
                            "ui5-user-menu-rp-scrolled": this._isScrolled || this._titleMovedToHeader
                        }, slot: "header", children: [this._titleMovedToHeader &&
                                _jsx(Title, { level: "H1", wrappingType: "None", children: this._selectedAccount.titleText }), this._isPhone && _jsx(Button, { icon: decline, design: "Transparent", accessibleName: this._closeDialogAriaLabel, onClick: this._closeUserMenu, slot: "endContent" })] }), _jsx("div", { class: "ui5-user-menu-header", children: headerContent.call(this) })] }), this.showOtherAccounts &&
                _jsx(_Fragment, { children: otherAccountsContent.call(this) }), this.menuItems.length > 0 &&
                _jsx(List, { id: "ui5-user-menu-list", class: "ui5-user-menu-list", selectionMode: "None", separators: "None", accessibleRole: "Menu", onItemClick: this._handleMenuItemClick, "onui5-close-menu": this._handleMenuItemClose, children: _jsx("slot", {}) }), _jsx("div", { slot: "footer", class: "ui5-user-menu-footer", children: _jsx(Button, { class: "ui5-user-menu-sign-out-btn", design: "Transparent", icon: log, onClick: this._handleSignOutClick, children: this._signOutButtonText }) })] }));
}
function headerContent() {
    return (_jsx(_Fragment, { children: this._selectedAccount &&
            _jsxs("div", { class: "ui5-user-menu-selected-account", "aria-label": this._ariaLabelledByAccountInformationText, children: [_jsxs(Avatar, { size: "L", onClick: this._handleAvatarClick, initials: this._selectedAccount._initials, colorScheme: this._selectedAccount.avatarColorScheme, fallbackIcon: personPlaceholder, class: "ui5-user-menu-selected-account-avatar", interactive: true, children: [this._selectedAccount.avatarSrc &&
                                _jsx("img", { src: this._selectedAccount.avatarSrc, title: this.showEditButton ? this._editAvatarTooltip : undefined }), this.showEditButton &&
                                _jsx(Tag, { slot: "badge", wrappingType: "None", design: "Set1", colorScheme: "5", children: _jsx(Icon, { slot: "icon", name: edit }) })] }), this._selectedAccount.titleText &&
                        _jsx(Text, { id: "selected-account-title", class: "ui5-user-menu-selected-account-title", children: this._selectedAccount.titleText }), this._selectedAccount.subtitleText &&
                        _jsx(Text, { class: "ui5-user-menu-selected-account-subtitleText", children: this._selectedAccount.subtitleText }), this._selectedAccount.description &&
                        _jsx(Text, { class: "ui5-user-menu-selected-account-description", children: this._selectedAccount.description }), this._selectedAccount.additionalInfo &&
                        _jsx(Text, { class: "ui5-user-menu-selected-account-additional-info", children: this._selectedAccount.additionalInfo }), this.showManageAccount &&
                        _jsx(Button, { id: "selected-account-manage-btn", icon: userSettings, class: "ui5-user-menu-manage-account-btn", onClick: this._handleManageAccountClick, children: this._manageAccountButtonText })] }) }));
}
function otherAccountsContent() {
    return (_jsx(_Fragment, { children: _jsxs(Panel, { collapsed: true, class: "ui5-user-menu-other-accounts", "aria-label": this._otherAccountsButtonText, children: [_jsxs("div", { slot: "header", class: "ui5-user-menu-account-header", children: [_jsxs(Title, { slot: "header", level: "H4", "wrapping-type": "None", children: [this._otherAccountsButtonText, " (", this._otherAccounts.length, ")"] }), this.showEditAccounts &&
                            _jsx(Button, { slot: "header", class: "ui5-user-menu-add-account-btn", design: "Transparent", icon: userEdit, onClick: this._handleEditAccountsClick, tooltip: this._editAccountsTooltip })] }), this._otherAccounts.length > 0 &&
                    _jsx(_Fragment, { children: otherAccountsList.call(this) })] }) }));
}
function otherAccountsList() {
    return (_jsx(_Fragment, { children: _jsx(List, { onItemClick: this._handleAccountSwitch, "aria-label": this._ariaLabelledByActions, loadingDelay: 0, loading: this._otherAccounts.some(account => account.loading === true), children: this._otherAccounts.map((account, index) => _jsx(ListItemCustom, { ref: this.captureRef.bind(account), accessibilityAttributes: {
                    "ariaPosinset": index + 1,
                    "ariaSetsize": this._otherAccounts.length
                }, "aria-label": account.titleText, children: _jsxs("div", { class: "ui5-user-menu-other-accounts-content", children: [_jsx(Avatar, { slot: "image", size: "S", initials: account._initials, fallbackIcon: personPlaceholder, colorScheme: account.avatarColorScheme, children: account.avatarSrc &&
                                _jsx("img", { src: account.avatarSrc }) }), _jsxs("div", { class: "ui5-user-menu-other-accounts-info", children: [account.titleText &&
                                    _jsx(Title, { class: "ui5-user-menu-other-accounts-title", children: account.titleText }), account.subtitleText &&
                                    _jsx(Label, { class: "ui5-user-menu-other-accounts-additional-info", children: account.subtitleText }), account.description &&
                                    _jsx(Label, { class: "ui5-user-menu-other-accounts-additional-info", children: account.description })] }), _jsx("div", { children: account.selected &&
                                _jsx(Icon, { part: "icon", name: selectedAccount, class: "ui5-user-menu-selected-account-icon", mode: "Decorative" }) })] }) })) }) }));
}
//# sourceMappingURL=UserMenuTemplate.js.map