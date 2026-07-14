import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import menuSeparatorTemplate from "./MenuSeparatorTemplate.js";
import menuSeparatorCss from "./generated/themes/MenuSeparator.css.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IMenuItem } from "./Menu.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import type { ListItemBaseClickEventDetail } from "./ListItemBase.js";

/**
 * @class
 * The `ui5-menu-separator` represents a horizontal line to separate menu items inside a `ui5-menu`.
 * @constructor
 * @extends UI5Element
 * @implements {IMenuItem}
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-menu-separator",
	renderer: jsxRenderer,
	styles: [menuSeparatorCss],
	template: menuSeparatorTemplate,
})

class MenuSeparator extends UI5Element implements IMenuItem {
	eventDetails!: { click?: ListItemBaseClickEventDetail };

	get isSeparator() {
		return true;
	}
}

MenuSeparator.define();

export default MenuSeparator;

export const isInstanceOfMenuSeparator = createInstanceChecker<MenuSeparator>("isSeparator");
