import type UserMenuItem from "./UserMenuItem.js";
import MenuItemTemplate from "@ui5/webcomponents/dist/MenuItemTemplate.js";
import type { MenuItemHooks } from "@ui5/webcomponents/dist/MenuItemTemplate.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";

export default function UserMenuItemTemplate(this: UserMenuItem) {
	const hooks: Partial<MenuItemHooks> = {
		menuItemDialogHeaderEnd: function menuItemDialogHeaderEnd(this: UserMenuItem) {
			return (
				<Button
					icon={declineIcon}
					class="ui5-menu-close-button"
					design="Transparent"
					aria-label={this.labelCancel}
					onClick={this._closeAll}
				/>
			);
		},
	};

	if (this.showSelection) {
		hooks.menuItemTextContent = userMenuItemTextContent;
	}

	return [MenuItemTemplate.call(this, hooks)];
}

function userMenuItemTextContent(this: UserMenuItem) {
	return (
		<div class="ui5-user-menu-item-text-wrapper">
			{this.text && <div class="ui5-menu-item-text">{this.text}</div>}
			{this._selectedSubItemText &&
				<div class="ui5-user-menu-item-selection-text">{this._selectedSubItemText}</div>
			}
		</div>
	);
}
