import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import VersioningButtonCss from "./generated/themes/VersioningButton.css.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-ai-versioning-button` represents a navigation button for AI versioning,
 * used in the `ui5-toolbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-ai/dist/VersioningButton.js";`
 * @constructor
 * @extends ToolbarButton
 * @private
 * @since 1.0.0-rc.1
 */
@customElement({
	tag: "ui5-ai-versioning-button",
	renderer: jsxRenderer,
	styles: [VersioningButtonCss],
})

/**
 * Fired when the versioning button is clicked.
 * @public
 */
@event("version-navigate")

class VersioningButton extends ToolbarButton {
	eventDetails!: ToolbarButton["eventDetails"] & {
		"version-navigate": {
			backwards: boolean;
		};
	};

	/**
	 * Defines the direction of navigation.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	backwards = false;

	/**
	 * @override
	 */
	onClick(e: Event) {
		e.stopImmediatePropagation();
		const prevented = !this.fireDecoratorEvent("version-navigate", { backwards: this.backwards });
		if (!prevented && !this.preventOverflowClosing) {
			this.fireDecoratorEvent("close-overflow");
		}
	}

	/**
	 * @override
	 */
	get classes() {
		return {
			root: {
				...super.classes.root,
				"ui5-ai-versioning-button": true,
			},
		};
	}
}

VersioningButton.define();

export default VersioningButton;
