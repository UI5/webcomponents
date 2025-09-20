import List from "@ui5/webcomponents/dist/List.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
/**
 * @class
 *
 * Internal `ui5-li-notification-list-list` component,
 * that is used to support keyboard navigation of the notification list internal list.
 *
 * @private
 */
declare class NotificationListInternal extends List {
    constructor();
    _allNavigationItems: Array<HTMLElement>;
    getEnabledItems(): Array<ListItemBase>;
    _onkeydown(e: KeyboardEvent): void;
    _handleHomeKey(e: KeyboardEvent): void;
    _handleEndKey(e: KeyboardEvent): void;
    _focusSameItemOnNextRow(e: KeyboardEvent): void;
    _isGrowingButton(item: Element | null): boolean | undefined;
}
export default NotificationListInternal;
