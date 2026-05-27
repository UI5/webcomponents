import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
import UserSettingsAppearanceViewItemTemplate from "./UserSettingsAppearanceViewItemTemplate.js";
import UserSettingsAppearanceViewItemCss from "./generated/themes/UserSettingsAppearanceViewItem.css.js";
import {
	customElement, property,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";

// Import default icon used by appearance view items
import "@ui5/webcomponents-icons/dist/product.js";

@customElement({
	tag: "ui5-user-settings-appearance-view-item",
	renderer: jsxRenderer,
	template: UserSettingsAppearanceViewItemTemplate,
	styles: [ListItemCustom.styles, UserSettingViewCss, UserSettingsAppearanceViewItemCss],
})

/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-appearance-view-item` represents a theme/appearance option item
 * within the `ui5-user-settings-appearance-view`.
 *
 * It displays a theme with an avatar icon, text label, and can be selected.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewItem.js";`
 *
 * @constructor
 * @extends ListItemCustom
 * @public
 * @since 2.17.0
 */
class UserSettingsAppearanceViewItem extends ListItemCustom {
	/**
	 * Defines the unique identifier of the item.
	 * @default ""
	 * @public
	 */
	@property()
	itemKey = "";

	/**
	 * Defines the text label displayed for the appearance item.
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	/**
	 * Defines the icon of the appearance item.
	 * @default "product"
	 * @public
	 */
	@property()
	icon = "product";

	/**
	 * Defines the color scheme of the avatar.
	 * @default "Accent7"
	 * @public
	 */
	@property()
	colorScheme = "Accent7";

	get isUserSettingsAppearanceViewItem(): boolean {
		return true;
	}
}

UserSettingsAppearanceViewItem.define();

export const isInstanceOfUserSettingsAppearanceViewItem = createInstanceChecker<UserSettingsAppearanceViewItem>("isUserSettingsAppearanceViewItem");
export default UserSettingsAppearanceViewItem;
