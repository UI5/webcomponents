import UserSettingsView from "./UserSettingsView.js";
import UserSettingsAppearanceViewTemplate from "./UserSettingsAppearanceViewTemplate.js";
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
import type UserSettingsAppearanceViewItem from "./UserSettingsAppearanceViewItem.js";
import type UserSettingsAppearanceViewGroup from "./UserSettingsAppearanceViewGroup.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";

import {
	customElement, slot, eventStrict as event, property,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

type UserSettingsAppearanceViewItemSelectEventDetail = {
	item: UserSettingsAppearanceViewItem;
}

@customElement({
	tag: "ui5-user-settings-appearance-view",
	renderer: jsxRenderer,
	template: UserSettingsAppearanceViewTemplate,
	styles: [UserSettingViewCss],
})

/**
 * Fired when an item is selected.
 * @param {UserSettingsAppearanceViewItem} item The selected `user settings appearance view item`.
 * @public
 */
@event("selection-change", {
	cancelable: true,
})

/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-appearance-view` represents a view displayed in the `ui5-user-settings-item`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceView.js";`
 *
 * @constructor
 * @extends UserSettingsView
 * @experimental
 * @public
 * @since 2.17.0
 */
class UserSettingsAppearanceView extends UserSettingsView {
	eventDetails!: {
		"selection-change": UserSettingsAppearanceViewItemSelectEventDetail;
	}

	/**
	 * Defines the items of the component.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		invalidateOnChildChange: true,
	})
	items!: Array<UserSettingsAppearanceViewGroup | UserSettingsAppearanceViewItem>;

	/**
	 * Defines additional content displayed below the items list.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
	})
	additionalContent?: Array<HTMLElement>;

	_getAllItems(): Array<UserSettingsAppearanceViewItem> {
		const allItems: Array<UserSettingsAppearanceViewItem> = [];

		this.items.forEach(item => {
			if (item.tagName === "UI5-USER-SETTINGS-APPEARANCE-VIEW-GROUP") {
				const group = item as UserSettingsAppearanceViewGroup;
				const groupItems = Array.from(group.children).filter(
					child => child.tagName === "UI5-USER-SETTINGS-APPEARANCE-VIEW-ITEM",
				) as Array<UserSettingsAppearanceViewItem>;
				allItems.push(...groupItems);
			} else if (item.tagName === "UI5-USER-SETTINGS-APPEARANCE-VIEW-ITEM") {
				allItems.push(item as UserSettingsAppearanceViewItem);
			}
		});

		return allItems;
	}

	_handleItemClick = (e: CustomEvent<ListItemClickEventDetail>) => {
		const listItem = e.detail.item as ListItemBase & { associatedSettingItem?: UserSettingsAppearanceViewItem };
		if (listItem.tagName === "UI5-USER-SETTINGS-APPEARANCE-VIEW-ITEM") {
			const item = listItem as UserSettingsAppearanceViewItem;
			const eventPrevented = !this.fireDecoratorEvent("selection-change", {
				item,
			});

			if (!eventPrevented) {
				this._getAllItems().forEach(viewItem => {
					viewItem.selected = false;
				});
				item.selected = true;
			}
		}
	};
}

UserSettingsAppearanceView.define();
export default UserSettingsAppearanceView;
export type {
	UserSettingsAppearanceViewItemSelectEventDetail,
};
