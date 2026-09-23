import UserSettingsView from "./UserSettingsView.js";
import UserSettingsAppearanceViewTemplate from "./UserSettingsAppearanceViewTemplate.js";
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
import type UserSettingsAppearanceViewItem from "./UserSettingsAppearanceViewItem.js";
import { isInstanceOfUserSettingsAppearanceViewItem } from "./UserSettingsAppearanceViewItem.js";
import type UserSettingsAppearanceViewGroup from "./UserSettingsAppearanceViewGroup.js";
import { isInstanceOfUserSettingsAppearanceViewGroup } from "./UserSettingsAppearanceViewGroup.js";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";

import {
	customElement, slotStrict as slot, eventStrict as event,
} from "@ui5/webcomponents-base/dist/decorators.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

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
 * @public
 * @since 2.17.0
 */
class UserSettingsAppearanceView extends UserSettingsView {
	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

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
	items!: DefaultSlot<UserSettingsAppearanceViewGroup | UserSettingsAppearanceViewItem>;

	/**
	 * Defines additional content displayed below the items list.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
	})
	additionalContent!: Slot<HTMLElement>;

	_getAllItems(): Array<UserSettingsAppearanceViewItem> {
		const allItems: Array<UserSettingsAppearanceViewItem> = [];

		this.items.forEach(item => {
			if (isInstanceOfUserSettingsAppearanceViewGroup(item)) {
				const groupItems = Array.from(item.children).filter(isInstanceOfUserSettingsAppearanceViewItem);
				allItems.push(...groupItems);
			} else if (isInstanceOfUserSettingsAppearanceViewItem(item)) {
				allItems.push(item);
			}
		});

		return allItems;
	}

	_handleSelectionChange = (e: CustomEvent<ListSelectionChangeEventDetail>) => {
		const listItem = e.detail.targetItem as ListItemBase & { associatedSettingItem?: UserSettingsAppearanceViewItem };
		if (isInstanceOfUserSettingsAppearanceViewItem(listItem)) {
			// The inner list runs in selectionMode="Single", so it already owns the
			// item's selected state and provides the accessibility announcement.
			const eventPrevented = !this.fireDecoratorEvent("selection-change", {
				item: listItem,
			});

			if (eventPrevented) {
				// Revert the list selection so it stays in sync with the model.
				e.preventDefault();
			}
		}
	};
}

UserSettingsAppearanceView.define();
export default UserSettingsAppearanceView;
export type {
	UserSettingsAppearanceViewItemSelectEventDetail,
};
