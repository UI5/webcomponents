import type UserMenuItemGroup from "./UserMenuItemGroup.js";
import MenuItemGroupTemplate from "@ui5/webcomponents/dist/MenuItemGroupTemplate.js";

export default function UserMenuItemTemplate(this: UserMenuItemGroup) {
	return [MenuItemGroupTemplate.call(this)];
}
