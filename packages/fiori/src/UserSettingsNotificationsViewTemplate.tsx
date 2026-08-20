import type UserSettingsNotificationsView from "./UserSettingsNotificationsView.js";
import List from "@ui5/webcomponents/dist/List.js";

export default function UserSettingsNotificationsViewTemplate(this: UserSettingsNotificationsView) {
	return (
		<div class="ui5-user-settings-view-container">
			<div class="ui5-user-settings-view ui5-user-settings-notifications-view-content">
				<slot name="additionalContent"></slot>
				<List
					class="ui5-user-settings-notifications-view-list"
					separators="All"
					onItemClick={this._handleItemClick}
					data-sap-ui-fastnavgroup="false"
					accessibleName={this._listAccessibleName}
				>
					<slot></slot>
				</List>
			</div>
		</div>
	);
}
