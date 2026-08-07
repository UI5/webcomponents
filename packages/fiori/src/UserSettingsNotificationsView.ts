import UserSettingsView from "./UserSettingsView.js";
import UserSettingsNotificationsViewTemplate from "./UserSettingsNotificationsViewTemplate.js";
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
import UserSettingsNotificationsViewCss from "./generated/themes/UserSettingsNotificationsView.css.js";
import type UserSettingsNotificationsViewItem from "./UserSettingsNotificationsViewItem.js";
import { isInstanceOfUserSettingsNotificationsViewItem } from "./UserSettingsNotificationsViewItem.js";
import type UserSettingsNotificationsViewGroup from "./UserSettingsNotificationsViewGroup.js";
import { isInstanceOfUserSettingsNotificationsViewGroup } from "./UserSettingsNotificationsViewGroup.js";
import type UserSettingsItem from "./UserSettingsItem.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";

import {
	customElement, slotStrict as slot, eventStrict as event,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

type UserSettingsNotificationsViewItemClickEventDetail = {
	item: UserSettingsNotificationsViewItem;
}

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
 * @since 2.26.0
 */
@customElement({
	tag: "ui5-user-settings-notifications-view",
	renderer: jsxRenderer,
	template: UserSettingsNotificationsViewTemplate,
	styles: [UserSettingViewCss, UserSettingsNotificationsViewCss],
})

/**
 * Fired when a navigable item in the list is clicked.
 *
 * The event is cancelable: preventing it skips the built-in drill-in to the
 * parent's secondary view, allowing the application to take over.
 *
 * @param {UserSettingsNotificationsViewItem} item The clicked notifications view item.
 * @public
 */
@event("item-click", {
	cancelable: true,
})

class UserSettingsNotificationsView extends UserSettingsView {
	eventDetails!: {
		"item-click": UserSettingsNotificationsViewItemClickEventDetail;
	}

	/**
	 * Defines the items of the component. Can be a mix of
	 * `ui5-user-settings-notifications-view-item` and
	 * `ui5-user-settings-notifications-view-group` elements.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		invalidateOnChildChange: true,
	})
	items!: DefaultSlot<UserSettingsNotificationsViewGroup | UserSettingsNotificationsViewItem>;

	/**
	 * Defines additional content displayed above the items list.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
	})
	additionalContent!: Slot<HTMLElement>;

	/**
	 * Returns a flat list of all notification items, including items nested inside groups.
	 *
	 * @public
	 */
	getAllItems(): Array<UserSettingsNotificationsViewItem> {
		const allItems: Array<UserSettingsNotificationsViewItem> = [];

		this.items.forEach(item => {
			if (isInstanceOfUserSettingsNotificationsViewGroup(item)) {
				item.items.forEach(child => {
					if (isInstanceOfUserSettingsNotificationsViewItem(child)) {
						allItems.push(child);
					}
				});
			} else if (isInstanceOfUserSettingsNotificationsViewItem(item)) {
				allItems.push(item);
			}
		});

		return allItems;
	}

	/**
	 * Returns the first item with the given `itemKey`, or `undefined` if none matches.
	 *
	 * @public
	 */
	getItemByKey(itemKey: string): UserSettingsNotificationsViewItem | undefined {
		return this.getAllItems().find(item => item.itemKey === itemKey);
	}

	_navigateToSecondaryView(item: UserSettingsNotificationsViewItem) {
		const parentItem = this.closest<UserSettingsItem>("[ui5-user-settings-item]");
		const secondaryViews = parentItem?.pages?.filter(view => view !== this && view.secondary) ?? [];

		const matched = item.itemKey ? secondaryViews.find(view => view.id === item.itemKey) : undefined;
		const target = matched ?? secondaryViews[0];

		if (!target) {
			return;
		}

		if (!matched || !target.text) {
			target.text = item.text;
		}

		this.selected = false;
		target.selected = true;

		if (item.matches(":focus-visible")) {
			renderFinished().then(() => {
				if (!this.isConnected) {
					return;
				}
				parentItem?._focusBackButton?.();
			});
		}
	}

	_handleItemClick = (e: CustomEvent<ListItemClickEventDetail>) => {
		const listItem = e.detail.item;
		if (!isInstanceOfUserSettingsNotificationsViewItem(listItem) || !listItem.navigable) {
			return;
		}

		const eventPrevented = !this.fireDecoratorEvent("item-click", {
			item: listItem,
		});

		if (eventPrevented) {
			return;
		}

		this._navigateToSecondaryView(listItem);
	};
}

UserSettingsNotificationsView.define();
export default UserSettingsNotificationsView;
export type {
	UserSettingsNotificationsViewItemClickEventDetail,
};
