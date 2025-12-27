import ListItemGroup from "@ui5/webcomponents/dist/ListItemGroup.js";
import type UserSettingsAppearanceViewItem from "./UserSettingsAppearanceViewItem.js";
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
declare class UserSettingsAppearanceViewGroup extends ListItemGroup {
    /**
     * Defines the items of the <code>ui5-user-settings-appearance-view-group</code>.
     * @public
     */
    items: Array<UserSettingsAppearanceViewItem>;
}
export default UserSettingsAppearanceViewGroup;
