import type UserSettingsAppearanceView from "./UserSettingsAppearanceView.js";
import List from "@ui5/webcomponents/dist/List.js";
import Title from "@ui5/webcomponents/dist/Title.js";

export default function UserSettingsAppearanceViewTemplate(this: UserSettingsAppearanceView) {
	return (
		<div class="ui5-user-settings-view-container">
			<div class="ui5-user-settings-view">
				<slot name="additionalContent"></slot>
				<List class="user-settings-appearance-view-list" onItemClick={this._handleItemClick} >
					{this.text && <Title slot="header" level="H3" class="user-settings-appearance-view-list-header">{this.text}</Title>}
					<slot></slot>
				</List>
			</div>
		</div>
	);
}
