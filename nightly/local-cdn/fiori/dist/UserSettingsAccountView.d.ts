import UserSettingsView from "./UserSettingsView.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type UserMenuAccount from "./UserMenuAccount.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
declare class UserSettingsAccountView extends UserSettingsView {
    eventDetails: {
        "edit-accounts-click": void;
        "manage-account-click": void;
    };
    /**
     * Defines the user account.
     *
     * @public
     */
    account: Slot<UserMenuAccount>;
    /**
     * Defines if the User Menu shows the `Manage Account` option.
     *
     * @default false
     * @public
     */
    showManageAccount: boolean;
    static i18nBundle: I18nBundle;
    _handleEditAvatarClick(e: CustomEvent): void;
    _handleManageAccountClick(): void;
    get _manageAccountButtonText(): string;
    get _editAvatarTooltip(): string;
    get _account(): UserMenuAccount;
}
export default UserSettingsAccountView;
