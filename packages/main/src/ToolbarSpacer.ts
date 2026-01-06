import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

import ToolbarCss from "./generated/themes/Toolbar.css.js";

import ToolbarItem from "./ToolbarItem.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-spacer` is an element, used for taking needed space for toolbar items to take 100% width.
 * It takes no space in calculating toolbar items width.
 * @constructor
 * @extends ToolbarItem
 * @abstract
 * @since 1.17.0
 * @public
 */
@customElement({
	tag: "ui5-toolbar-spacer",
	styles: ToolbarCss,
})

class ToolbarSpacer extends ToolbarItem {
	/**
	 * Defines the width of the spacer.
	 *
	 * **Note:** all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
	 * @public
	 * @default undefined
	 */
	@property()
	width?: string;

	get styles() {
		return this.width ? { width: this.width } : { flex: "auto" };
	}

	get ignoreSpace() {
		return this.width === "" || this.width === undefined || this.width === "auto";
	}

	get hasFlexibleWidth() {
		return this.width === "" || this.width === undefined || this.width === "auto";
	}

	get isInteractive() {
		return false;
	}

	_kind = "ToolbarSpacer";
}

ToolbarSpacer.define();

export default ToolbarSpacer;
