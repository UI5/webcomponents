import type UserSettingsView from "./UserSettingsView.js";

export default function UserSettingsViewTemplate(this: UserSettingsView) {
	return (
		<div class="ui5-user-settings-view-container">
			<div class="ui5-user-settings-view">
				<slot></slot>
			</div>
		</div>
	);
}
