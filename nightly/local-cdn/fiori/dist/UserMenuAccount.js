var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
let UserMenuAccount = 
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-menu-account` represents an account in the `ui5-user-menu`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.5.0
 */
class UserMenuAccount extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the background color of the desired image.
         * If `avatarColorScheme` is set to `Auto`, the avatar will be displayed with the `Accent6` color.
         *
         * @default "Auto"
         * @public
         */
        this.avatarColorScheme = "Auto";
        /**
         * Defines the title text of the user.
         *
         * @default ""
         * @public
         */
        this.titleText = "";
        /**
         * Defines additional text of the user.
         *
         * @default ""
         * @public
         */
        this.subtitleText = "";
        /**
         * Defines description of the user.
         *
         * @default ""
         * @public
         */
        this.description = "";
        /**
         * Defines additional information for the user.
         *
         * @default ""
         * @public
         */
        this.additionalInfo = "";
        /**
         * Defines if the user is selected.
         *
         * @default false
         * @public
         */
        this.selected = false;
        /**
         * Indicates whether a loading indicator should be shown.
         * @default false
         * @public
         * @since 2.9.0
         */
        this.loading = false;
    }
    get _initials() {
        return this.avatarInitials || "undefined";
    }
};
__decorate([
    property({ type: String })
], UserMenuAccount.prototype, "avatarSrc", void 0);
__decorate([
    property({ type: String })
], UserMenuAccount.prototype, "avatarInitials", void 0);
__decorate([
    property()
], UserMenuAccount.prototype, "avatarColorScheme", void 0);
__decorate([
    property({ type: String })
], UserMenuAccount.prototype, "titleText", void 0);
__decorate([
    property({ type: String })
], UserMenuAccount.prototype, "subtitleText", void 0);
__decorate([
    property({ type: String })
], UserMenuAccount.prototype, "description", void 0);
__decorate([
    property({ type: String })
], UserMenuAccount.prototype, "additionalInfo", void 0);
__decorate([
    property({ type: Boolean })
], UserMenuAccount.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], UserMenuAccount.prototype, "loading", void 0);
UserMenuAccount = __decorate([
    customElement({
        tag: "ui5-user-menu-account",
    })
    /**
     * @class
     * ### Overview
     *
     * The `ui5-user-menu-account` represents an account in the `ui5-user-menu`.
     *
     * ### ES6 Module Import
     * `import "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";`
     *
     * @constructor
     * @extends UI5Element
     * @public
     * @since 2.5.0
     */
], UserMenuAccount);
UserMenuAccount.define();
export default UserMenuAccount;
//# sourceMappingURL=UserMenuAccount.js.map