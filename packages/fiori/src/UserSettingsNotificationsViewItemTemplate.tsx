import type UserSettingsNotificationsViewItem from "./UserSettingsNotificationsViewItem.js";
import ListItemCustomTemplate from "@ui5/webcomponents/dist/ListItemCustomTemplate.js";
import Switch from "@ui5/webcomponents/dist/Switch.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

export default function UserSettingsNotificationsViewItemTemplate(this: UserSettingsNotificationsViewItem) {
	if (this._isHeaderItem) {
		return headerItemContent(this);
	}
	return ListItemCustomTemplate.call(this, {
		listItemContent: listItemContent.bind(this),
	});
}

function headerItemContent(item: UserSettingsNotificationsViewItem) {
	return (
		<div
			class="ui5-user-settings-notifications-form-item"
			role="group"
			aria-label={item._accessibleSwitchName}
			data-sap-focus-ref
			tabindex={item._effectiveTabIndex}
			onFocusIn={item._onfocusin}
			onFocusOut={item._onfocusout}
			onKeyUp={item._onkeyup}
			onKeyDown={item._onkeydown}
			onClick={item._handleFormItemClick}
		>
			{itemBody(item)}
			{item.navigable &&
				<Icon
					class="ui5-user-settings-notifications-item-arrow"
					name={slimArrowRight}
					mode="Decorative"
				></Icon>
			}
		</div>
	);
}

function listItemContent(this: UserSettingsNotificationsViewItem) {
	return itemBody(this);
}

function itemBody(item: UserSettingsNotificationsViewItem) {
	return (
		<div class={`ui5-user-settings-notifications-item${item.bylineText && item.text ? " has-byline" : ""}`}>
			<div class="ui5-user-settings-notifications-item-start">
				<div class="ui5-user-settings-notifications-item-texts">
					{item.text &&
						<span class="ui5-user-settings-notifications-item-title">{item.text}</span>
					}
					{item.bylineText &&
						<span class="ui5-user-settings-notifications-item-byline">{item.bylineText}</span>
					}
				</div>
			</div>
			<div class="ui5-user-settings-notifications-item-end">
				{item._hasEndContent
					? <slot name="endContent" onClick={item._handleEndClick}></slot>
					: <Switch
						class="ui5-user-settings-notifications-item-switch"
						checked={item.checked}
						onChange={item._handleSwitchChange}
						accessibleName={item._accessibleSwitchName}
						onClick={item._handleEndClick}
					></Switch>
				}
			</div>
		</div>
	);
}
