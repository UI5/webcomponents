import List from "@ui5/webcomponents/dist/List.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";

/**
 * @class
 *
 * Internal `ui5-li-notification-group-list` component,
 * that is used to support keyboard navigation of the notification group internal list.
 *
 * @private
 */
@customElement("ui5-notification-group-list")
class NotificationListGroupList extends List {
	getEnabledItems() {
		return [];
	}

	_handleTabNext() {
	}

	onForwardBefore() {
	}

	onForwardAfter() {
	}

	onItemTabIndexChange() {
	}

	onItemFocused() {
	}

	_onfocusin(e: FocusEvent) {
		e.stopImmediatePropagation();
	}

	_onkeydown() {

	}

	focusItem(item: ListItemBase) {
		item.focus();
	}

	_onLoadMoreKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.stopImmediatePropagation();
		}

		super._onLoadMoreKeydown(e);
	}
}

NotificationListGroupList.define();

export default NotificationListGroupList;
