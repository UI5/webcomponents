import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ToolbarSeparatorTemplate from "./ToolbarSeparatorTemplate.js";

// Styles
import ToolbarSeparatorCss from "./generated/themes/ToolbarSeparator.css.js";

import ToolbarItem from "./ToolbarItem.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-separator` is an element, used for visual separation between two elements.
 * It takes no space in calculating toolbar items width.
 * @constructor
 * @extends ToolbarItem
 * @since 1.17.0
 * @abstract
 * @public
 */
@customElement({
	tag: "ui5-toolbar-separator",
	template: ToolbarSeparatorTemplate,
	renderer: jsxRenderer,
	styles: [ToolbarSeparatorCss],
})

class ToolbarSeparator extends ToolbarItem {
	@property({ type: Boolean })
	visible = false;

	get isSeparator() {
		return true;
	}

	get isInteractive() {
		return false;
	}
}

ToolbarSeparator.define();

export default ToolbarSeparator;
