import type UserSettingsNotificationsViewItem from "./UserSettingsNotificationsViewItem.js";
import ListItemCustomTemplate from "@ui5/webcomponents/dist/ListItemCustomTemplate.js";
import Switch from "@ui5/webcomponents/dist/Switch.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

export default function UserSettingsNotificationsViewItemTemplate(this: UserSettingsNotificationsViewItem) {
	return ListItemCustomTemplate.call(this, {
		listItemContent: listItemContent.bind(this),
	});
}

function listItemContent(this: UserSettingsNotificationsViewItem) {
	const rootClasses = ["ui5-user-settings-notifications-item"];
	if (this.bylineText && this.text) {
		rootClasses.push("has-byline");
	}

	return (
		<div class={rootClasses.join(" ")}>
			<div class="ui5-user-settings-notifications-item-start">
				<div class="ui5-user-settings-notifications-item-texts">
					{this.text &&
						<span class="ui5-user-settings-notifications-item-title">{this.text}</span>
					}
					{this.bylineText &&
						<span class="ui5-user-settings-notifications-item-byline">{this.bylineText}</span>
					}
				</div>
			</div>
			<div class="ui5-user-settings-notifications-item-end">
				{this._hasEndContent
					? <slot name="endContent" onClick={this._handleEndClick}></slot>
					: <Switch
						class="ui5-user-settings-notifications-item-switch"
						checked={this.checked}
						onChange={this._handleSwitchChange}
						accessibleName={this._accessibleSwitchName}
						onClick={this._handleEndClick}
					></Switch>
				}
				{this.navigable &&
					<Icon
						class="ui5-user-settings-notifications-item-arrow"
						name={slimArrowRight}
						mode="Decorative"
					></Icon>
				}
			</div>
		</div>
	);
}
