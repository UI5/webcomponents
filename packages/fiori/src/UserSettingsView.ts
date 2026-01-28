import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, slotStrict as slot } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
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
	content!: DefaultSlot<HTMLElement[]>;
}

UserSettingsView.define();

export default UserSettingsView;
