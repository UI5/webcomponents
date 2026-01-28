import UserSettingsView from "./UserSettingsView.js";
import UserSettingsAccountViewTemplate from "./UserSettingsAccountViewTemplate.js";
import {
	customElement, slotStrict as slot, eventStrict as event, property,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
import UserSettingsAccountViewCss from "./generated/themes/UserSettingsAccountView.css.js";
import type UserMenuAccount from "./UserMenuAccount.js";

// Texts
import {
	USER_SETTINGS_ACCOUNT_EDIT_AVATAR_TXT,
	USER_SETTINGS_ACCOUNT_MANAGE_ACCOUNT_BUTTON_TXT,
} from "./generated/i18n/i18n-defaults.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

@customElement({
	tag: "ui5-user-settings-account-view",
	renderer: jsxRenderer,
	template: UserSettingsAccountViewTemplate,
	styles: [UserSettingViewCss, UserSettingsAccountViewCss],
})
/**
 * Fired when the `Edit Accounts` button is selected.
 * @public
 */
@event("edit-accounts-click")

/**
 * Fired when the `Manage Account` button is selected.
 * @public
 */
@event("manage-account-click")

/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-account-view` represents a view displayed in the `ui5-user-settings-item`.
 *
 * @constructor
 * @extends UserSettingsView
 * @experimental
 * @public
 * @since 2.17.0
 */
class UserSettingsAccountView extends UserSettingsView {
	eventDetails!: {
		"edit-accounts-click": void;
		"manage-account-click": void;
	}
	/**
	 * Defines the user account.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	account!: Slot<UserMenuAccount[]>;

	/**
	 * Defines if the User Menu shows the `Manage Account` option.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showManageAccount = false;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	_handleEditAvatarClick(e: CustomEvent) {
		if (e.type === "click") {
			this.fireDecoratorEvent("edit-accounts-click");
		}
	}

	_handleManageAccountClick() {
		this.fireDecoratorEvent("manage-account-click");
	}

	get _manageAccountButtonText() {
		return UserSettingsAccountView.i18nBundle.getText(USER_SETTINGS_ACCOUNT_MANAGE_ACCOUNT_BUTTON_TXT);
	}

	get _editAvatarTooltip() {
		return UserSettingsAccountView.i18nBundle.getText(USER_SETTINGS_ACCOUNT_EDIT_AVATAR_TXT);
	}

	get _account() {
		return this?.account?.[0];
	}
}

UserSettingsAccountView.define();
export default UserSettingsAccountView;
