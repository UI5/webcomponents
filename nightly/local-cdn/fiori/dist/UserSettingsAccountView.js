var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserSettingsAccountView_1;
import UserSettingsView from "./UserSettingsView.js";
import UserSettingsAccountViewTemplate from "./UserSettingsAccountViewTemplate.js";
import { customElement, slotStrict as slot, eventStrict as event, property, } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
import UserSettingsAccountViewCss from "./generated/themes/UserSettingsAccountView.css.js";
// Texts
import { USER_SETTINGS_ACCOUNT_EDIT_AVATAR_TXT, USER_SETTINGS_ACCOUNT_MANAGE_ACCOUNT_BUTTON_TXT, } from "./generated/i18n/i18n-defaults.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
let UserSettingsAccountView = UserSettingsAccountView_1 = 
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-account-view` represents a view displayed in the `ui5-user-settings-item`.
 *
 * @constructor
 * @extends UserSettingsView
 * @public
 * @since 2.17.0
 */
class UserSettingsAccountView extends UserSettingsView {
    constructor() {
        super(...arguments);
        /**
         * Defines if the User Menu shows the `Manage Account` option.
         *
         * @default false
         * @public
         */
        this.showManageAccount = false;
    }
    _handleEditAvatarClick(e) {
        if (e.type === "click") {
            this.fireDecoratorEvent("edit-accounts-click");
        }
    }
    _handleManageAccountClick() {
        this.fireDecoratorEvent("manage-account-click");
    }
    get _manageAccountButtonText() {
        return UserSettingsAccountView_1.i18nBundle.getText(USER_SETTINGS_ACCOUNT_MANAGE_ACCOUNT_BUTTON_TXT);
    }
    get _editAvatarTooltip() {
        return UserSettingsAccountView_1.i18nBundle.getText(USER_SETTINGS_ACCOUNT_EDIT_AVATAR_TXT);
    }
    get _account() {
        return this?.account?.[0];
    }
};
__decorate([
    slot({
        type: HTMLElement,
        invalidateOnChildChange: {
            properties: true,
            slots: false,
        },
    })
], UserSettingsAccountView.prototype, "account", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsAccountView.prototype, "showManageAccount", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], UserSettingsAccountView, "i18nBundle", void 0);
UserSettingsAccountView = UserSettingsAccountView_1 = __decorate([
    customElement({
        tag: "ui5-user-settings-account-view",
        renderer: jsxRenderer,
        template: UserSettingsAccountViewTemplate,
        styles: [UserSettingViewCss, UserSettingsAccountViewCss],
    })
    /**
     * Fired when the `Edit Accounts` button is selected.
     * @public
     */
    ,
    event("edit-accounts-click")
    /**
     * Fired when the `Manage Account` button is selected.
     * @public
     */
    ,
    event("manage-account-click")
    /**
     * @class
     * ### Overview
     *
     * The `ui5-user-settings-account-view` represents a view displayed in the `ui5-user-settings-item`.
     *
     * @constructor
     * @extends UserSettingsView
     * @public
     * @since 2.17.0
     */
], UserSettingsAccountView);
UserSettingsAccountView.define();
export default UserSettingsAccountView;
//# sourceMappingURL=UserSettingsAccountView.js.map