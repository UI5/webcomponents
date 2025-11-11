import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import type { ButtonAccessibilityAttributes } from "./Button.js";
import type ButtonDesign from "./types/ButtonDesign.js";

import ToolbarItem from "./ToolbarItem.js";
import ToolbarButtonTemplate from "./ToolbarButtonTemplate.js";
import ToolbarButtonCss from "./generated/themes/ToolbarButton.css.js";

type ToolbarButtonAccessibilityAttributes = ButtonAccessibilityAttributes;

/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-button` represents an abstract action,
 * used in the `ui5-toolbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ToolbarButton.js";`
 * @constructor
 * @abstract
 * @extends ToolbarItem
 * @public
 * @since 1.17.0
 */
@customElement({
	tag: "ui5-toolbar-button",
	template: ToolbarButtonTemplate,
	renderer: jsxRenderer,
	styles: [ToolbarButtonCss],
})

/**
 * Fired when the component is activated either with a
 * mouse/tap or by using the Enter or Space key.
 *
 * **Note:** The event will not be fired if the `disabled`
 * property is set to `true`.
 * @public
 */
@event("click", {
	bubbles: true,
	cancelable: true,
})
class ToolbarButton extends ToolbarItem {
	/**
	 * Defines if the action is disabled.
	 *
	 * **Note:** a disabled action can't be pressed or focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the action design.
	 * @default "Default"
	 * @public
	 */
	@property()
	design: `${ButtonDesign}` = "Default";

	/**
	 * Defines the `icon` source URI.
	 *
	 * **Note:** SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string

	/**
	 * Defines the icon, displayed as graphical element within the component after the button text.
	 *
	 * **Note:** It is highly recommended to use `endIcon` property only together with `icon` and/or `text` properties.
	 * Usage of `endIcon` only should be avoided.
	 *
	 * The SAP-icons font provides numerous options.
	 *
	 * Example:
	 * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	endIcon?: string;

	/**
	 * Defines the tooltip of the component.
	 *
	 * **Note:** A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
	 * @default undefined
	 * @public
	 */
	@property()
	tooltip?: string

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the additional accessibility attributes that will be applied to the component.
	 *
	 * The following fields are supported:
	 *
	 * - **expanded**: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed.
	 * Accepts the following string values: `true` or `false`
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
	 * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
	 *
	 * - **controls**: Identifies the element (or elements) whose contents or presence are controlled by the button element.
	 * Accepts a lowercase string value.
	 *
	 * @default {}
	 * @public
	 */
	@property({ type: Object })
	accessibilityAttributes: ToolbarButtonAccessibilityAttributes = {};

	/**
	 * Button text
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;

	/**
	 * Defines whether the button text should only be displayed in the overflow popover.
	 *
	 * When set to `true`, the button appears as icon-only in the main toolbar,
	 * but shows both icon and text when moved to the overflow popover.
	 *
	 * **Note:** This property only takes effect when the `text` property is also set.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showOverflowText = false;

	/**
	 * Defines the width of the button.
	 *
	 * **Note:** all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
	 * @default undefined
	 * @public
	 */
	@property()
	width?: string;

	get styles() {
		return {
			width: this.width,
			display: this.hidden ? "none" : "inline-block",
		};
	}

	/**
	 * Returns the effective text to display based on overflow state and showOverflowText property.
	 *
	 * When showOverflowText is true:
	 * - Normal state: returns empty string (icon-only)
	 * - Overflow state: returns text
	 *
	 * When showOverflowText is false:
	 * - Returns text in both states (normal behavior)
	 */
	get effectiveText(): string | undefined {
		if (this.showOverflowText) {
			return this.isOverflowed ? this.text : "";
		}
		return this.text;
	}

	onClick(e: Event) {
		e.stopImmediatePropagation();
		const prevented = !this.fireDecoratorEvent("click", { targetRef: e.target as HTMLElement });
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
				"ui5-tb-button": true,
			},
		};
	}
}

ToolbarButton.define();

export default ToolbarButton;

export type {
	ToolbarButtonAccessibilityAttributes,
};
