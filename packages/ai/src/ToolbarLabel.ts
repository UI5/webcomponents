import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import ToolbarItem from "@ui5/webcomponents/dist/ToolbarItem.js";
import ToolbarLabelTemplate from "./ToolbarLabelTemplate.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-ai-toolbar-label` represents a text label,
 * used in the `ui5-toolbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-ai/dist/ToolbarLabel.js";`
 * @constructor
 * @extends ToolbarItem
 * @private
 * @since 1.0.0-rc.1
 */
@customElement({
	tag: "ui5-ai-toolbar-label",
	template: ToolbarLabelTemplate,
	renderer: jsxRenderer,
})
class ToolbarLabel extends ToolbarItem {
	/**
	 * Defines the text of the label.
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	/**
	 * @override
	 * ToolbarLabel is not interactive.
	 */
	get isInteractive(): boolean {
		return false;
	}

	/**
	 * @override
	 */
	get classes() {
		return {
			root: {
				...super.classes.root,
				"ui5-ai-tb-label": true,
			},
		};
	}
}

ToolbarLabel.define();

export default ToolbarLabel;
