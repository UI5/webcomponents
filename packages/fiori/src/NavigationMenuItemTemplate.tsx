import type NavigationMenuItem from "./NavigationMenuItem.js";
import MenuItemTemplate from "@ui5/webcomponents/dist/MenuItemTemplate.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import slimArrowRightIcon from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import arrowRightIcon from "@ui5/webcomponents-icons/dist/arrow-right.js";
import type { ListItemHooks } from "@ui5/webcomponents/dist/ListItemTemplate.js";

const predefinedHooks: Partial<ListItemHooks> = {
	listItemContent,
	iconBegin,
	iconEnd,
};

export default function NavigationMenuItemTemplate(this: NavigationMenuItem, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks, };

	return <>
		{
			this._href ? (
				<a role="menuitem"
					class="ui5-navmenu-item-link"
					href={this.href}
					target={this.target}
				>
					{MenuItemTemplate.call(this, currentHooks)}
				</a>
			) : MenuItemTemplate.call(this, currentHooks)
		}
	</>;
}

function listItemContent(this: NavigationMenuItem) {
	return <>{this.text}</>;
}

function iconBegin(this: NavigationMenuItem) {
	if (this.hasIcon) {
		return <Icon part="icon"
			class="ui5-li-icon"
			name={this.icon}
		/>;
	}

	if (this._siblingsWithIcon) {
		return <div class="ui5-menu-item-dummy-icon"></div>;
	}
}

function iconEnd(this: NavigationMenuItem) {
	if (this.hasSubmenu) {
		return <Icon
			part="icon"
			name={slimArrowRightIcon}
			class="ui5-menu-item-icon-end"
		/>;
	}

	if (this.isExternalLink) {
		return <Icon
			class="ui5-sn-item-external-link-icon"
			name={arrowRightIcon}
		/>;
	}
}
