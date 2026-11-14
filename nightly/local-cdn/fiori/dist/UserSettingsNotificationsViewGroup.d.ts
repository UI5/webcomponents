import ListItemGroup from "@ui5/webcomponents/dist/ListItemGroup.js";
import type UserSettingsNotificationsViewItem from "./UserSettingsNotificationsViewItem.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-notifications-view-group` groups `ui5-user-settings-notifications-view-item`
 * elements inside a `ui5-user-settings-notifications-view`. Its header renders as a plain bold
 * section title with a separator line below, per the notifications design spec.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsNotificationsViewGroup.js";`
 *
 * @constructor
 * @extends ListItemGroup
 * @public
 * @since 2.27.0
 */
declare class UserSettingsNotificationsViewGroup extends ListItemGroup {
    /**
     * Defines the items of the `ui5-user-settings-notifications-view-group`.
     * @public
     */
    items: DefaultSlot<UserSettingsNotificationsViewItem>;
    get isUserSettingsNotificationsViewGroup(): boolean;
}
export declare const isInstanceOfUserSettingsNotificationsViewGroup: (object: any) => object is UserSettingsNotificationsViewGroup;
export default UserSettingsNotificationsViewGroup;
