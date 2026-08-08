import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ListItemClickEventDetail, ListItemToggleEventDetail, ListItemCloseEventDetail } from "@ui5/webcomponents/dist/List.js";
import type NotificationListItemBase from "./NotificationListItemBase.js";
import type NotificationListInternal from "./NotificationListInternal.js";
type NotificationItemEventDetail = {
    item: NotificationListItemBase;
};
type NotificationItemClickEventDetail = NotificationItemEventDetail;
type NotificationItemToggleEventDetail = NotificationItemEventDetail;
type NotificationItemCloseEventDetail = NotificationItemEventDetail;
/**
 * @class
 * ### Overview
 * The `ui5-notification-list` web component represents
 * a container for `ui5-li-notification-group` and `ui5-li-notification`.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The `ui5-notification-list` provides advanced keyboard handling.
 * When a list is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Up] or [Left] - Navigates up the items
 * - [Down] or [Right] - Navigates down the items
 * - [Home] - Navigates to first item
 * - [End] - Navigates to the last item
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NotificationList.js";``
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
declare class NotificationList extends UI5Element {
    eventDetails: {
        "item-click": NotificationItemClickEventDetail;
        "item-close": NotificationItemCloseEventDetail;
        "item-toggle": NotificationItemToggleEventDetail;
        "load-more": void;
    };
    /**
     * Defines the items of the component.
     *
     * @public
     */
    items: DefaultSlot<NotificationListItemBase>;
    /**
     * Defines the text that is displayed when the component contains no items.
     * @default undefined
     * @public
     */
    noDataText?: string;
    get _accessibleName(): string;
    static i18nFioriBundle: I18nBundle;
    getEnabledItems(): import("@ui5/webcomponents/dist/ListItemBase.js").default[];
    get innerList(): NotificationListInternal;
    _onItemClick(e: CustomEvent<ListItemClickEventDetail>): void;
    _onItemClose(e: CustomEvent<ListItemCloseEventDetail>): void;
    _onItemToggle(e: CustomEvent<ListItemToggleEventDetail>): void;
    _onLoadMore(): void;
}
export default NotificationList;
export type { NotificationItemClickEventDetail, NotificationItemToggleEventDetail, NotificationItemCloseEventDetail, };
