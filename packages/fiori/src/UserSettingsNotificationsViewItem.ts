import UserSettingsNotificationsViewItemTemplate from "./UserSettingsNotificationsViewItemTemplate.js";
import UserSettingsNotificationsViewItemCss from "./generated/themes/UserSettingsNotificationsViewItem.css.js";
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
import {
	customElement, property, slotStrict as slot, eventStrict as event,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import type Switch from "@ui5/webcomponents/dist/Switch.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

type UserSettingsNotificationsViewItemSwitchChangeEventDetail = {
	item: UserSettingsNotificationsViewItem;
	checked: boolean;
}

/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-notifications-view-item` represents a single notification setting
 * within the `ui5-user-settings-notifications-view`.
 *
 * It displays a title and an optional byline. By default a trailing switch reflects
 * the `checked` state. Applications can override the trailing control by providing content
 * in the `endContent` slot (e.g. a `ui5-select` for a value picker); the built-in switch and
 * its `switch-change` event are then suppressed. Items can additionally be flagged as
 * `navigable` to display a navigation arrow and behave as clickable list rows.
 *
 * **Note:** The default switch and the `endContent` slot are mutually exclusive.
 * When any content is provided in `endContent`, the trailing switch is not rendered
 * and no `switch-change` event is fired.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsNotificationsViewItem.js";`
 *
 * @constructor
 * @extends ListItemCustom
 * @public
 * @since 2.26.0
 */
@customElement({
	tag: "ui5-user-settings-notifications-view-item",
	renderer: jsxRenderer,
	template: UserSettingsNotificationsViewItemTemplate,
	styles: [ListItemCustom.styles, UserSettingViewCss, UserSettingsNotificationsViewItemCss],
})

/**
 * Fired when the switch state changes.
 *
 * Not fired when the `endContent` slot is used to override the trailing control.
 *
 * @param {UserSettingsNotificationsViewItem} item The item whose switch was toggled.
 * @param {boolean} checked The new checked state of the switch.
 * @public
 */
@event("switch-change", {
	bubbles: true,
})

class UserSettingsNotificationsViewItem extends ListItemCustom {
	eventDetails!: ListItemCustom["eventDetails"] & {
		"switch-change": UserSettingsNotificationsViewItemSwitchChangeEventDetail;
	}

	/**
	 * Defines the unique identifier of the item.
	 *
	 * When the item is navigable, `itemKey` is also used to route to a matching sibling
	 * `secondary` view by id.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	itemKey = "";

	/**
	 * Defines the title text of the item.
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	/**
	 * Defines the byline text of the item, rendered below the title.
	 * @default ""
	 * @public
	 */
	@property()
	bylineText = "";

	/**
	 * Defines whether the trailing switch is on.
	 *
	 * Ignored when the `endContent` slot is used.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	checked = false;

	/**
	 * Defines whether the item is navigable. When true, a navigation arrow is rendered
	 * and the whole row becomes clickable (fires the parent view's `item-click` event).
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	navigable = false;

	/**
	 * Defines custom content rendered at the trailing end of the item, replacing the
	 * default switch. Use this to place a `ui5-select`, `ui5-input`, or any other
	 * control instead of a boolean toggle.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
	})
	endContent!: Slot<HTMLElement>;

	get isUserSettingsNotificationsViewItem(): boolean {
		return true;
	}

	get _hasEndContent(): boolean {
		return this.endContent.length > 0;
	}

	get _accessibleSwitchName(): string {
		return this.bylineText ? `${this.text} ${this.bylineText}` : this.text;
	}

	_handleSwitchChange = (e: Event) => {
		const target = e.target as Switch;
		this.checked = target.checked;
		this.fireDecoratorEvent("switch-change", { item: this, checked: this.checked });
	};

	_handleEndClick = (e: MouseEvent) => {
		e.stopPropagation();
	};
}

UserSettingsNotificationsViewItem.define();

export const isInstanceOfUserSettingsNotificationsViewItem = createInstanceChecker<UserSettingsNotificationsViewItem>("isUserSettingsNotificationsViewItem");
export default UserSettingsNotificationsViewItem;
export type {
	UserSettingsNotificationsViewItemSwitchChangeEventDetail,
};
