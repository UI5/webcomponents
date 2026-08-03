import type UserSettingsNotificationsView from "./UserSettingsNotificationsView.js";
import List from "@ui5/webcomponents/dist/List.js";

export default function UserSettingsNotificationsViewTemplate(this: UserSettingsNotificationsView) {
	return (
		<div class="ui5-user-settings-view-container">
			<div class="ui5-user-settings-view">
				<slot name="additionalContent"></slot>
				<List
					class="ui5-user-settings-notifications-view-list"
					onItemClick={this._handleItemClick}
					data-sap-ui-fastnavgroup="false"
				>
					<slot></slot>
				</List>
			</div>
		</div>
	);
}
