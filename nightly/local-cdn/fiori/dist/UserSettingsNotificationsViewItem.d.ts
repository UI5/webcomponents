import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { AccessibilityInfo } from "@ui5/webcomponents-base/dist/types.js";
type UserSettingsNotificationsViewItemSwitchChangeEventDetail = {
    item: UserSettingsNotificationsViewItem;
    checked: boolean;
};
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-notifications-view-item` represents a single notification setting
 * within the `ui5-user-settings-notifications-view`.
 *
 * It displays a title and an optional byline. By default a trailing switch reflects
 * the `checked` state. Applications can override the trailing control by providing content
 * in the `endContent` slot (e.g. a `ui5-select` for a value picker); the built-in switch and
 * its `switch-change` event are then suppressed. Items can additionally be flagged as
 * `navigable` to display a navigation arrow and behave as clickable list rows.
 *
 * **Note:** The default switch and the `endContent` slot are mutually exclusive.
 * When any content is provided in `endContent`, the trailing switch is not rendered
 * and no `switch-change` event is fired.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsNotificationsViewItem.js";`
 *
 * @constructor
 * @extends ListItemCustom
 * @public
 * @since 2.27.0
 */
declare class UserSettingsNotificationsViewItem extends ListItemCustom {
    eventDetails: ListItemCustom["eventDetails"] & {
        "switch-change": UserSettingsNotificationsViewItemSwitchChangeEventDetail;
        "_form-item-click": {
            item: UserSettingsNotificationsViewItem;
        };
    };
    /**
     * Defines the unique identifier of the item.
     *
     * When the item is navigable, `itemKey` is also used to route to a matching sibling
     * `secondary` view by id.
     *
     * @default ""
     * @public
     */
    itemKey: string;
    /**
     * Defines the title text of the item.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines the byline text of the item, rendered below the title.
     * @default ""
     * @public
     */
    bylineText: string;
    /**
     * Defines whether the trailing switch is on.
     *
     * Ignored when the `endContent` slot is used.
     *
     * @default false
     * @public
     */
    checked: boolean;
    /**
     * Defines whether the item is navigable. When true, a navigation arrow is rendered
     * and the whole row becomes clickable (fires the parent view's `item-click` event).
     * @default false
     * @public
     */
    navigable: boolean;
    /**
     * Defines custom content rendered at the trailing end of the item, replacing the
     * default switch. Use this to place a `ui5-select`, `ui5-input`, or any other
     * control instead of a boolean toggle.
     *
     * @public
     */
    endContent: Slot<HTMLElement>;
    get isUserSettingsNotificationsViewItem(): boolean;
    get typeNavigation(): boolean;
    get _isHeaderItem(): boolean;
    shouldForwardTabAfter(): boolean;
    get _hasEndContent(): boolean;
    get _accessibleSwitchName(): string;
    _onkeyup(e: KeyboardEvent): void;
    _handleSwitchChange: (e: Event) => void;
    _handleFormItemClick: (e: MouseEvent) => void;
    _handleEndClick: (e: MouseEvent) => void;
    get accessibilityInfo(): AccessibilityInfo;
}
export declare const isInstanceOfUserSettingsNotificationsViewItem: (object: any) => object is UserSettingsNotificationsViewItem;
export default UserSettingsNotificationsViewItem;
export type { UserSettingsNotificationsViewItemSwitchChangeEventDetail, };
