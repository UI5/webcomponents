import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type Title from "@ui5/webcomponents/dist/Title.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { PopupScrollEventDetail } from "@ui5/webcomponents/dist/Popup.js";
import type UserMenuAccount from "./UserMenuAccount.js";
import type UserMenuItem from "./UserMenuItem.js";
type UserMenuItemClickEventDetail = {
    item: UserMenuItem;
};
type UserMenuOtherAccountClickEventDetail = {
    prevSelectedAccount: UserMenuAccount;
    selectedAccount: UserMenuAccount;
};
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
declare class UserMenu extends UI5Element {
    eventDetails: {
        "avatar-click": void;
        "manage-account-click": void;
        "edit-accounts-click": void;
        "change-account": UserMenuOtherAccountClickEventDetail;
        "item-click": UserMenuItemClickEventDetail;
        "sign-out-click": void;
        "open": void;
        "close": void;
    };
    /**
     * Defines if the User Menu is opened.
     *
     * @default false
     * @public
     */
    open: boolean;
    /**
     * Defines the ID or DOM Reference of the element at which the user menu is shown.
     * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
     * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
     * @public
     * @default undefined
     */
    opener?: HTMLElement | string | null;
    /**
     * Defines if the User Menu shows the Manage Account option.
     *
     * @default false
     * @public
     */
    showManageAccount: boolean;
    /**
     * Defines if the User Menu shows the Other Accounts option.
     *
     * @default false
     * @public
     */
    showOtherAccounts: boolean;
    /**
     * Defines if the User Menu shows the Edit Accounts option.
     *
     * @default false
     * @public
     */
    showEditAccounts: boolean;
    /**
     * Defines if the User menu shows edit button.
     *
     * @default false
     * @public
     * @since 2.7.0
     */
    showEditButton: boolean;
    /**
     * Defines the menu items.
     * @public
     */
    menuItems: DefaultSlot<UserMenuItem>;
    /**
     * Defines the user accounts.
     *
     * **Note:** If one item is used, it will be shown as the selected one. If more than one item is used, the first one will be shown as selected unless
     * there is an item with `selected` property set to `true`.
     * @public
     */
    accounts: Slot<UserMenuAccount>;
    static i18nBundle: I18nBundle;
    /**
     * @default false
     * @private
     */
    _titleMovedToHeader: boolean;
    /**
     * @default false
     * @private
     */
    _isScrolled: boolean;
    /**
     * @private
     */
    _selectedAccount: UserMenuAccount;
    /**
     * @private
     */
    _observer?: IntersectionObserver;
    /**
     * @private
     */
    _responsivePopover?: ResponsivePopover;
    /**
     * @private
     */
    _selectedAccountTitleEl?: Title;
    /**
     * @private
     */
    _selectedAccountManageBtn?: Button;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    get _isPhone(): boolean;
    _handleScroll(e: CustomEvent<PopupScrollEventDetail>): void;
    _handleIntersection(entries: IntersectionObserverEntry[]): void;
    _handleAvatarClick(e: CustomEvent): void;
    _handleManageAccountClick(): void;
    _handleEditAccountsClick(): void;
    _handleAccountSwitch(e: CustomEvent<ListItemClickEventDetail>): void;
    _handleSignOutClick(): void;
    _handleMenuItemClick(e: CustomEvent<ListItemClickEventDetail>): void;
    _handleMenuItemClose(): void;
    _handlePopoverAfterOpen(): void;
    _handlePopoverAfterClose(): void;
    _openItemSubMenu(item: UserMenuItem): void;
    _closeUserMenu(): void;
    get _otherAccounts(): Slot<UserMenuAccount>;
    get _manageAccountButtonText(): string;
    get _otherAccountsButtonText(): string;
    get _signOutButtonText(): string;
    get _editAvatarTooltip(): string;
    get _editAccountsTooltip(): string;
    get _closeDialogAriaLabel(): string;
    get accessibleNameText(): string;
    get _ariaLabelledByAccountInformationText(): string;
    get _ariaLabelledByActions(): string;
    getAccountDescriptionText(account: UserMenuAccount): string;
    getAccountByRefId(refId: string): UserMenuAccount;
    captureRef(ref: HTMLElement & {
        associatedAccount?: UI5Element;
    } | null): void;
    get _menuItems(): UserMenuItem[];
}
export default UserMenu;
export type { UserMenuItemClickEventDetail, UserMenuOtherAccountClickEventDetail, };
