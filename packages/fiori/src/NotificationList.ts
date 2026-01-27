import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import UI5Element, { type DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type {
	ListItemClickEventDetail,
	ListItemToggleEventDetail,
	ListItemCloseEventDetail,
} from "@ui5/webcomponents/dist/List.js";
import type NotificationListItemBase from "./NotificationListItemBase.js";
import type NotificationListInternal from "./NotificationListInternal.js";

// Template
import NotificationListTemplate from "./NotificationListTemplate.js";

// Styles
import NotificationListCss from "./generated/themes/NotificationList.css.js";

// Texts
import {
	NOTIFICATION_LIST_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";

type NotificationItemEventDetail = {
	item: NotificationListItemBase,
}

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
@customElement({
	tag: "ui5-notification-list",
	renderer: jsxRenderer,
	languageAware: true,
	styles: [NotificationListCss],
	template: NotificationListTemplate,
})

/**
 * Fired when an item is clicked.
 * @param {HTMLElement} item The clicked item.
 * @public
 */
@event("item-click", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired when the `Close` button of any item is clicked.
 * @param {HTMLElement} item the item about to be closed.
 * @public
 */
@event("item-close", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired when an item is toggled.
 *
 * @param {HTMLElement} item the toggled item.
 * @public
 */
@event("item-toggle", {
	bubbles: true,
	cancelable: true,
})

class NotificationList extends UI5Element {
	eventDetails!: {
		"item-click": NotificationItemClickEventDetail,
		"item-close": NotificationItemCloseEventDetail,
		"item-toggle": NotificationItemToggleEventDetail,
		"load-more": void,
	}
	/**
	 * Defines the items of the component.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: DefaultSlot<Array<NotificationListItemBase>>;

	/**
	 * Defines the text that is displayed when the component contains no items.
	 * @default undefined
	 * @public
	 */
	@property()
	noDataText?: string;

	get _accessibleName() {
		return NotificationList.i18nFioriBundle.getText(NOTIFICATION_LIST_ACCESSIBLE_NAME);
	}

	@i18n("@ui5/webcomponents-fiori")
	static i18nFioriBundle: I18nBundle;

	getEnabledItems() {
		return this.innerList?.getEnabledItems() || [];
	}

	get innerList() {
		return this.shadowRoot?.querySelector("[ui5-notification-list-internal]") as NotificationListInternal;
	}

	_onItemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item as NotificationListItemBase;

		if (!this.fireDecoratorEvent("item-click", { item })) {
			e.preventDefault();
		}
	}

	_onItemClose(e: CustomEvent<ListItemCloseEventDetail>) {
		const item = e.detail.item as NotificationListItemBase;

		if (!this.fireDecoratorEvent("item-close", { item })) {
			e.preventDefault();
		}
	}

	_onItemToggle(e: CustomEvent<ListItemToggleEventDetail>) {
		const item = e.detail.item as NotificationListItemBase;

		if (!this.fireDecoratorEvent("item-toggle", { item })) {
			e.preventDefault();
		}
	}

	_onLoadMore() {
		this.fireDecoratorEvent("load-more");
	}
}

NotificationList.define();

export default NotificationList;
export type {
	NotificationItemClickEventDetail,
	NotificationItemToggleEventDetail,
	NotificationItemCloseEventDetail,
};
