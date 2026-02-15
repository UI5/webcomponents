var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserMenu_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, slotStrict as slot, eventStrict as event, property, } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isInstanceOfMenuItem } from "@ui5/webcomponents/dist/MenuItem.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import UserMenuTemplate from "./UserMenuTemplate.js";
import UserMenuCss from "./generated/themes/UserMenu.css.js";
// Texts
import { USER_MENU_OTHER_ACCOUNT_BUTTON_TXT, USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT, USER_MENU_SIGN_OUT_BUTTON_TXT, USER_MENU_POPOVER_ACCESSIBLE_NAME, USER_MENU_EDIT_AVATAR_TXT, USER_MENU_EDIT_ACCOUNTS_TXT, USER_MENU_CLOSE_DIALOG_BUTTON, USER_MENU_POPOVER_ACCESSIBLE_ACCOUNT_SELECTED_TXT, USER_MENU_CURRENT_INFORMATION_TXT, USER_MENU_ACTIONS_TXT, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-menu` is an SAP Fiori specific web component that is used in `ui5-shellbar`
 * and allows the user to easily see information and settings for the current user and all other logged in accounts.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserMenu.js";`
 *
 * `import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";` (for `ui5-user-menu-item`)
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.5.0
 */
let UserMenu = UserMenu_1 = class UserMenu extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines if the User Menu is opened.
         *
         * @default false
         * @public
         */
        this.open = false;
        /**
         * Defines if the User Menu shows the Manage Account option.
         *
         * @default false
         * @public
         */
        this.showManageAccount = false;
        /**
         * Defines if the User Menu shows the Other Accounts option.
         *
         * @default false
         * @public
         */
        this.showOtherAccounts = false;
        /**
         * Defines if the User Menu shows the Edit Accounts option.
         *
         * @default false
         * @public
         */
        this.showEditAccounts = false;
        /**
         * Defines if the User menu shows edit button.
         *
         * @default false
         * @public
         * @since 2.7.0
         */
        this.showEditButton = false;
        /**
         * @default false
         * @private
         */
        this._titleMovedToHeader = false;
        /**
         * @default false
         * @private
         */
        this._isScrolled = false;
    }
    onBeforeRendering() {
        this._selectedAccount = this.accounts.find(account => account.selected) || this.accounts[0];
        const siblingsWithIcon = this._menuItems.some(menuItem => !!menuItem.icon);
        this._menuItems.forEach(item => {
            item._siblingsWithIcon = siblingsWithIcon;
        });
    }
    onAfterRendering() {
        if (this._responsivePopover) {
            const observerOptions = {
                threshold: [0.15],
            };
            this._observer?.disconnect();
            this._observer = new IntersectionObserver(entries => this._handleIntersection(entries), observerOptions);
            if (this._selectedAccountTitleEl) {
                this._observer.observe(this._selectedAccountTitleEl);
            }
            if (this._selectedAccountManageBtn) {
                this._observer.observe(this._selectedAccountManageBtn);
            }
        }
    }
    get _isPhone() {
        return isPhone();
    }
    _handleScroll(e) {
        this._isScrolled = e.detail.scrollTop > 0;
    }
    _handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === "selected-account-title") {
                    this._titleMovedToHeader = false;
                }
                return;
            }
            if (entry.target.id === "selected-account-title") {
                this._titleMovedToHeader = true;
            }
        }, this);
    }
    _handleAvatarClick(e) {
        if (e.type === "click") {
            // TOFIX: Discuss this check: Fire the custom UserMenu#avatar-click only for Avatar#click (not for Avatar#ui5-click as well).
            this.fireDecoratorEvent("avatar-click");
        }
    }
    _handleManageAccountClick() {
        this.fireDecoratorEvent("manage-account-click");
    }
    _handleEditAccountsClick() {
        this.fireDecoratorEvent("edit-accounts-click");
    }
    _handleAccountSwitch(e) {
        const item = e.detail.item;
        const eventPrevented = !this.fireDecoratorEvent("change-account", {
            prevSelectedAccount: this._selectedAccount,
            selectedAccount: item.associatedAccount,
        });
        if (eventPrevented) {
            return;
        }
        this._selectedAccount.selected = false;
        item.associatedAccount.selected = true;
    }
    _handleSignOutClick() {
        const eventPrevented = !this.fireDecoratorEvent("sign-out-click");
        if (eventPrevented) {
            return;
        }
        this._closeUserMenu();
    }
    _handleMenuItemClick(e) {
        const item = e.detail.item; // imrove: improve this ideally without "as" cating
        item._updateCheckedState();
        if (!item._popover) {
            const eventPrevented = !this.fireDecoratorEvent("item-click", {
                "item": item,
            });
            if (!eventPrevented) {
                item.fireEvent("close-menu");
            }
        }
        else {
            this._openItemSubMenu(item);
        }
    }
    _handleMenuItemClose() {
        this._closeUserMenu();
    }
    _handlePopoverAfterOpen() {
        this.fireDecoratorEvent("open");
    }
    _handlePopoverAfterClose() {
        this.open = false;
        this.fireDecoratorEvent("close");
    }
    _openItemSubMenu(item) {
        if (!item._popover || item._popover.open) {
            return;
        }
        item._popover.opener = item;
        item._popover.open = true;
        item.selected = true;
    }
    _closeUserMenu() {
        this.open = false;
    }
    get _otherAccounts() {
        return this.accounts;
    }
    get _manageAccountButtonText() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT);
    }
    get _otherAccountsButtonText() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_OTHER_ACCOUNT_BUTTON_TXT);
    }
    get _signOutButtonText() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_SIGN_OUT_BUTTON_TXT);
    }
    get _editAvatarTooltip() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_EDIT_AVATAR_TXT);
    }
    get _editAccountsTooltip() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_EDIT_ACCOUNTS_TXT);
    }
    get _closeDialogAriaLabel() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_CLOSE_DIALOG_BUTTON);
    }
    get accessibleNameText() {
        if (!this._selectedAccount) {
            return "";
        }
        return `${UserMenu_1.i18nBundle.getText(USER_MENU_POPOVER_ACCESSIBLE_NAME)} ${this._selectedAccount.titleText}`;
    }
    get _ariaLabelledByAccountInformationText() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_CURRENT_INFORMATION_TXT);
    }
    get _ariaLabelledByActions() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_ACTIONS_TXT);
    }
    getAccountDescriptionText(account) {
        return `${account.subtitleText} ${account.description} ${account.selected ? UserMenu_1.i18nBundle.getText(USER_MENU_POPOVER_ACCESSIBLE_ACCOUNT_SELECTED_TXT) : ""}`;
    }
    getAccountByRefId(refId) {
        return this.accounts.find(account => account._id === refId);
    }
    captureRef(ref) {
        if (ref) {
            ref.associatedAccount = this;
        }
    }
    get _menuItems() {
        return this.menuItems.filter(isInstanceOfMenuItem);
    }
};
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "open", void 0);
__decorate([
    property({ converter: DOMReferenceConverter })
], UserMenu.prototype, "opener", void 0);
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "showManageAccount", void 0);
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "showOtherAccounts", void 0);
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "showEditAccounts", void 0);
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "showEditButton", void 0);
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
    })
], UserMenu.prototype, "menuItems", void 0);
__decorate([
    slot({
        type: HTMLElement,
        invalidateOnChildChange: {
            properties: true,
            slots: false,
        },
    })
], UserMenu.prototype, "accounts", void 0);
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "_titleMovedToHeader", void 0);
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "_isScrolled", void 0);
__decorate([
    query("#user-menu-rp")
], UserMenu.prototype, "_responsivePopover", void 0);
__decorate([
    query("#selected-account-title")
], UserMenu.prototype, "_selectedAccountTitleEl", void 0);
__decorate([
    query("#selected-account-manage-btn")
], UserMenu.prototype, "_selectedAccountManageBtn", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], UserMenu, "i18nBundle", void 0);
UserMenu = UserMenu_1 = __decorate([
    customElement({
        tag: "ui5-user-menu",
        languageAware: true,
        renderer: jsxRenderer,
        template: UserMenuTemplate,
        styles: [UserMenuCss],
    })
    /**
     * Fired when the account avatar is selected.
     * @public
     */
    ,
    event("avatar-click")
    /**
     * Fired when the "Manage Account" button is selected.
     * @public
     */
    ,
    event("manage-account-click")
    /**
     * Fired when the "Edit Accounts" button is selected.
     * @public
     */
    ,
    event("edit-accounts-click")
    /**
     * Fired when the account is switched to a different one.
     * @param {UserMenuAccount} prevSelectedAccount The previously selected account.
     * @param {UserMenuAccount} selectedAccount The selected account.
     * @public
     */
    ,
    event("change-account", {
        cancelable: true,
    })
    /**
     * Fired when a menu item is selected.
     * @param {UserMenuItem} item The selected `user menu item`.
     * @public
     */
    ,
    event("item-click", {
        cancelable: true,
    })
    /**
     * Fired when a user menu is open.
     * @public
     * @since 2.6.0
     */
    ,
    event("open")
    /**
     * Fired when a user menu is close.
     * @public
     * @since 2.6.0
     */
    ,
    event("close")
    /**
     * Fired when the "Sign Out" button is selected.
     * @public
     * @since 2.6.0
     */
    ,
    event("sign-out-click", {
        cancelable: true,
    })
], UserMenu);
UserMenu.define();
export default UserMenu;
//# sourceMappingURL=UserMenu.js.map