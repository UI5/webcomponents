import type UserSettingsAppearanceView from "./UserSettingsAppearanceView.js";
import List from "@ui5/webcomponents/dist/List.js";

export default function UserSettingsAppearanceViewTemplate(this: UserSettingsAppearanceView) {
	return (
		<div class="ui5-user-settings-view-container">
			<div class="ui5-user-settings-view">
				<slot name="additionalContent"></slot>
				<List header-text={this.text} class="user-settings-appearance-view-list" onItemClick={this._handleItemClick} >
					<slot></slot>
				</List>
			</div>
		</div>
	);
}
