import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRendererer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import menuSeparatorTemplate from "./MenuSeparatorTemplate.js";
import menuSeparatorCss from "./generated/themes/MenuSeparator.css.js";
import ListItemBase from "./ListItemBase.js";
import type { IMenuItem } from "./Menu.js";
/**
 * @class
 * The `ui5-menu-separator` represents a horizontal line to separate menu items inside a `ui5-menu`.
 * @constructor
 * @extends ListItemBase
 * @implements {IMenuItem}
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-menu-separator",
	renderer: jsxRendererer,
	styles: [menuSeparatorCss],
	template: menuSeparatorTemplate,
})

class MenuSeparator extends ListItemBase implements IMenuItem {
	eventDetails!: ListItemBase["eventDetails"];

	get isSeparator() {
		return true;
	}

	get classes(): ClassMap {
		return {
			main: {
				"ui5-menu-separator": true,
			},
		};
	}

	/**
	 * @override
	 */
	get _focusable() {
		return false;
	}

	/**
	 * @override
	 */
	get _pressable() {
		return false;
	}
}

MenuSeparator.define();

export default MenuSeparator;
