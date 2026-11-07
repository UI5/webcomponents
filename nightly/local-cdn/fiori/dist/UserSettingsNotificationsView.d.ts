import UserSettingsView from "./UserSettingsView.js";
import type UserSettingsNotificationsViewItem from "./UserSettingsNotificationsViewItem.js";
import type UserSettingsNotificationsViewGroup from "./UserSettingsNotificationsViewGroup.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type UserSettingsNotificationsViewItemClickEventDetail = {
    item: UserSettingsNotificationsViewItem;
};
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-notifications-view` represents a view displayed in the
 * `ui5-user-settings-item` that lists notification preferences. Individual settings
 * are represented by `ui5-user-settings-notifications-view-item` elements, optionally
 * grouped by `ui5-user-settings-notifications-view-group`.
 *
 * When a navigable item is clicked, the view drills into a sibling secondary view of
 * its parent `ui5-user-settings-item`. When an item's `item-key` matches a target
 * view's `id`, that view is opened and keeps its own `text`. Otherwise the first
 * sibling marked as `secondary` is opened and its `text` is set to the clicked
 * item's `text` so the drill-in header reflects the origin.
 *
 * Apps can override this behavior by preventing the `item-click` event.
 *
 * Applications should listen to the item's `switch-change` event (which bubbles) to
 * be notified when a switch is toggled.
 *
 * Additional content (e.g. an information message strip) can be placed via the
 * `additionalContent` slot, which is rendered above the list.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsNotificationsView.js";`
 *
 * @constructor
 * @extends UserSettingsView
 * @public
 * @since 2.27.0
 */
declare class UserSettingsNotificationsView extends UserSettingsView {
    eventDetails: {
        "item-click": UserSettingsNotificationsViewItemClickEventDetail;
    };
    /**
     * Defines the items of the component. Can be a mix of
     * `ui5-user-settings-notifications-view-item` and
     * `ui5-user-settings-notifications-view-group` elements.
     *
     * @public
     */
    items: DefaultSlot<UserSettingsNotificationsViewGroup | UserSettingsNotificationsViewItem>;
    /**
     * Defines header items rendered above the grouped items list.
     * Each item is wrapped in a `role="form"` landmark — a separate Tab stop.
     * Use this slot for product-level toggles (e.g. "Allow Notifications") that appear
     * above the notification-type groups.
     *
     * @public
     */
    headerItems: Slot<UserSettingsNotificationsViewItem>;
    /**
     * Defines additional content displayed above the items list.
     *
     * @public
     */
    additionalContent: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    getAllItems(): Array<UserSettingsNotificationsViewItem>;
    getItemByKey(itemKey: string): UserSettingsNotificationsViewItem | undefined;
    get _hasHeaderItems(): boolean;
    _lastNavigatedItem: UserSettingsNotificationsViewItem | null;
    get _listAccessibleName(): string;
    _navigateToSecondaryView(item: UserSettingsNotificationsViewItem): void;
    _processItemClick(item: UserSettingsNotificationsViewItem): void;
    _handleItemClick: (e: CustomEvent<ListItemClickEventDetail>) => void;
    _handleFormItemClick: (e: CustomEvent<{
        item: UserSettingsNotificationsViewItem;
    }>) => void;
}
export default UserSettingsNotificationsView;
export type { UserSettingsNotificationsViewItemClickEventDetail, };
