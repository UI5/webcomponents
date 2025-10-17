import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";

@customElement({
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
 * @experimental
 * @public
 * @since 2.5.0
 */
class UserMenuAccount extends UI5Element {
	/**
	 * Defines the avatar image url of the user.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	avatarSrc?: string;

	/**
	 * Defines the avatar initials of the user.
	 *
	 * @default undefined
	 * @public
	 */
	@property({ type: String })
	avatarInitials?: string;

	/**
	 * Defines the title text of the user.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	titleText = "";

	/**
	 * Defines additional text of the user.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	subtitleText = "";

	/**
	 * Defines description of the user.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	description = "";

	/**
	 * Defines additional information for the user.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	additionalInfo = "";

	/**
	 * Defines if the user is selected.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Indicates whether a loading indicator should be shown.
	 * @default false
	 * @public
	 * @since 2.9.0
	 */
	@property({ type: Boolean })
	loading = false;

	get _initials() {
		return this.avatarInitials || "undefined";
	}
}

UserMenuAccount.define();

export default UserMenuAccount;
