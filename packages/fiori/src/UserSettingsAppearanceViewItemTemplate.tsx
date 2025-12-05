import type UserSettingsAppearanceViewItem from "./UserSettingsAppearanceViewItem.js";
import ListItemCustomTemplate from "@ui5/webcomponents/dist/ListItemCustomTemplate.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import AvatarSize from "@ui5/webcomponents/dist/types/AvatarSize.js";

export default function UserSettingsAppearanceViewItemTemplate(this: UserSettingsAppearanceViewItem) {
	return ListItemCustomTemplate.call(this, {
		listItemContent: listItemContent.bind(this),
	});
}

function listItemContent(this: UserSettingsAppearanceViewItem) {
	return (
		<div class="list-item">
			<div class="item-left">
				<Avatar class="avatar-cozy" shape="Square" icon={this.icon} color-scheme={this.colorScheme} size={AvatarSize.S}></Avatar>
				<Avatar class="avatar-compact" shape="Square" icon={this.icon} color-scheme={this.colorScheme} size={AvatarSize.XS}></Avatar>
				<div class="item-texts">
					<span class="item-title">{this.text}</span>
				</div>
			</div>
		</div>
	);
}
