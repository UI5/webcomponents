import List from "@ui5/webcomponents/dist/List.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
/**
 * @class
 *
 * Internal `ui5-li-notification-group-list` component,
 * that is used to support keyboard navigation of the notification group internal list.
 *
 * @private
 */
declare class NotificationListGroupList extends List {
    getEnabledItems(): never[];
    _handleTabNext(): void;
    onForwardBefore(): void;
    onForwardAfter(): void;
    onItemTabIndexChange(): void;
    onItemFocused(): void;
    _onfocusin(e: FocusEvent): void;
    _onkeydown(): void;
    focusItem(item: ListItemBase): void;
    _onLoadMoreKeydown(e: KeyboardEvent): void;
}
export default NotificationListGroupList;
