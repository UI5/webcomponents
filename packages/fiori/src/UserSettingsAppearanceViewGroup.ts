import ListItemGroup from "@ui5/webcomponents/dist/ListItemGroup.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import type UserSettingsAppearanceViewItem from "./UserSettingsAppearanceViewItem.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-appearance-view-group` is a special list item group used to group appearance view items.
 *
 * This is the item to use inside a `ui5-user-settings-appearance-view`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewGroup.js";`
 *
 * @constructor
 * @extends ListItemGroup
 * @experimental
 * @public
 * @since 2.17.0
 */
@customElement({
	tag: "ui5-user-settings-appearance-view-group",
})
class UserSettingsAppearanceViewGroup extends ListItemGroup {
	/**
	 * Defines the items of the <code>ui5-user-settings-appearance-view-group</code>.
	 * @public
	 */
	@slot({
		"default": true,
		invalidateOnChildChange: true,
		type: HTMLElement,
	})
	declare items: DefaultSlot<UserSettingsAppearanceViewItem[]>;

	get isUserSettingsAppearanceViewGroup(): boolean {
		return true;
	}
}

UserSettingsAppearanceViewGroup.define();

export const isInstanceOfUserSettingsAppearanceViewGroup = createInstanceChecker<UserSettingsAppearanceViewGroup>("isUserSettingsAppearanceViewGroup");
export default UserSettingsAppearanceViewGroup;
