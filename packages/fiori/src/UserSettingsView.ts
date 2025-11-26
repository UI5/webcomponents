import UI5Element, { customElement, property, slot, jsxRenderer } from "@ui5/webcomponents-base";
import UserSettingsViewTemplate from "./UserSettingsViewTemplate.js";
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";

/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-view` represents a view displayed in the `ui5-user-settings-item`.
 *
 * @constructor
 * @extends UI5Element
 * @experimental
 * @public
 * @since 2.8.0
 */
@customElement({
	tag: "ui5-user-settings-view",
	renderer: jsxRenderer,
	template: UserSettingsViewTemplate,
	styles: [UserSettingViewCss],
})

class UserSettingsView extends UI5Element {
	/**
	 * Defines the title text of the user settings view.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;

	/**
	 * Defines whether the view is selected. There can be just one selected view at a time.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Indicates whether the view is secondary. It is relevant only if the view is used in `pages` slot of `ui5-user-settings-item`
	 * and controls the visibility of the back button.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	secondary = false;

	/**
	 * Defines the content of the view.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
	})
	content!: Array<HTMLElement>;
}

UserSettingsView.define();

export default UserSettingsView;
