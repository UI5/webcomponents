import { customElement, Keys, getActiveElement } from "@ui5/webcomponents-base";
import List from "@ui5/webcomponents/dist/List.js";
import type NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";

import type NotificationListItemBase from "./NotificationListItemBase.js";

const {
	isDown,
	isUp,
	isLeft,
	isRight,
	isHome,
	isEnd,
} = Keys;

/**
 * @class
 *
 * Internal `ui5-li-notification-list-list` component,
 * that is used to support keyboard navigation of the notification list internal list.
 *
 * @private
 */
@customElement("ui5-notification-list-internal")
class NotificationListInternal extends List {
	constructor() {
		super();

		this._itemNavigation._navigationMode = "Auto";
	}

	_allNavigationItems: Array<HTMLElement> = [];

	getEnabledItems(): Array<ListItemBase> {
		const items = new Array<ListItemBase>();
		const allNavigationItems = new Array<HTMLElement>();

		this.getItems().forEach(item => {
			items.push(item);
			allNavigationItems.push(item);

			if (item instanceof NotificationListGroupItem && !item.collapsed && !item.loading) {
				item.items.forEach(subItem => {
					items.push(subItem);
					allNavigationItems.push(subItem);
				});

				const growingButton = item.getGrowingButton();
				if (growingButton) {
					allNavigationItems.push(growingButton);
				}
			}
		});

		const growingButton = this.getGrowingButton();
		if (growingButton) {
			allNavigationItems.push(growingButton);
		}

		this._allNavigationItems = allNavigationItems;

		return items;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnd(e)) {
			this._handleEndKey(e);
			e.preventDefault();
			return;
		}

		if (isHome(e)) {
			this._handleHomeKey(e);
			e.preventDefault();
			return;
		}

		this._focusSameItemOnNextRow(e);
	}

	_handleHomeKey(e: KeyboardEvent) {
		e.stopImmediatePropagation();

		const target = e.target as HTMLElement;
		const activeElement = getActiveElement()! as HTMLElement;

		if ((!this._isGrowingButton(activeElement) && target?.hasAttribute("ui5-li-notification-group"))
			|| target?.hasAttribute("ui5-menu-item")) {
			return;
		}

		const currentFocusedItem = this.getEnabledItems()[this._itemNavigation._currentIndex];
		if (!currentFocusedItem) {
			return;
		}

		const currentFocusedIndex = this._allNavigationItems.indexOf(currentFocusedItem);
		let nextFocusedIndex = 0;

		for (let i = currentFocusedIndex - 1; i >= 0; i--) {
			const item = this._allNavigationItems[i];
			if (item.hasAttribute("ui5-li-notification-group")) {
				nextFocusedIndex = i + 1;
				break;
			}
		}

		this._allNavigationItems[nextFocusedIndex].focus();
	}

	_handleEndKey(e: KeyboardEvent) {
		e.stopImmediatePropagation();

		const target = e.target as HTMLElement;

		if (target?.hasAttribute("ui5-menu-item")) {
			return;
		}

		const currentFocusedItem = this.getEnabledItems()[this._itemNavigation._currentIndex];
		if (!currentFocusedItem) {
			return;
		}

		const currentFocusedIndex = this._allNavigationItems.indexOf(currentFocusedItem);
		let nextFocusedIndex = this._allNavigationItems.length - 1;

		for (let i = currentFocusedIndex + 1; i < this._allNavigationItems.length; i++) {
			const item = this._allNavigationItems[i];

			if (item.hasAttribute("ui5-li-notification-group")) {
				nextFocusedIndex = i - 1;
				break;
			}

			if (this._isGrowingButton(item)) {
				nextFocusedIndex = i === currentFocusedIndex + 1 ? i : i - 1;
				break;
			}
		}

		this._allNavigationItems[nextFocusedIndex].focus();
	}

	_focusSameItemOnNextRow(e: KeyboardEvent) {
		if (!isUp(e) && !isDown(e) && !isLeft(e) && !isRight(e)) {
			return;
		}

		const target = e.target as HTMLElement;
		const shadowTarget = target.shadowRoot!.activeElement as HTMLElement;
		const activeElement = getActiveElement()! as HTMLElement;
		const isGrowingBtn = this._isGrowingButton(activeElement);

		if (!target || target.hasAttribute("ui5-menu-item")) {
			return;
		}

		const isFocusWithin = target.matches(":focus-within");
		if (!isFocusWithin) {
			return;
		}

		e.preventDefault();
		e.stopImmediatePropagation();

		const currentItem = isGrowingBtn ? activeElement : this.getEnabledItems()[this._itemNavigation._currentIndex];
		const index = this._allNavigationItems.indexOf(currentItem) + ((isUp(e) || isLeft(e)) ? -1 : 1);
		const nextItem = this._allNavigationItems[index];
		if (!nextItem) {
			return;
		}

		if (this._isGrowingButton(nextItem) || shadowTarget.classList.contains("ui5-nli-focusable")) {
			nextItem.focus();
			return;
		}

		const nextListItem = nextItem as NotificationListItemBase;
		if (nextListItem.loading || (isLeft(e) || isRight(e))) {
			nextItem.focus();
			return;
		}

		const sameItemOnNextRow = nextListItem.getHeaderDomRef()!.querySelector<HTMLElement>(`.${shadowTarget.className}`);
		if (sameItemOnNextRow && sameItemOnNextRow.offsetParent) {
			sameItemOnNextRow.focus();
		} else {
			nextItem.focus();
		}
	}

	_isGrowingButton(item: Element | null) {
		return item?.classList.contains("ui5-growing-button-inner");
	}
}

NotificationListInternal.define();

export default NotificationListInternal;
