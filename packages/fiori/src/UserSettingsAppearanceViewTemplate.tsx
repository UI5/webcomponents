import type UserSettingsAppearanceView from "./UserSettingsAppearanceView.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemGroupHeader from "@ui5/webcomponents/dist/ListItemGroupHeader.js";

export default function UserSettingsAppearanceViewTemplate(this: UserSettingsAppearanceView) {
	return (
		<div class="ui5-user-settings-view-container">
			<div class="ui5-user-settings-view">
				<slot name="additionalContent"></slot>
				<List class="user-settings-appearance-view-list" onItemClick={this._handleItemClick} data-sap-ui-fastnavgroup="false">
					{this.text && <ListItemGroupHeader class="user-settings-appearance-view-top-header">{this.text}</ListItemGroupHeader>}
					<slot></slot>
				</List>
			</div>
		</div>
	);
}
