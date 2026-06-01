import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { IIcon } from "./Icon.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import InputIconTemplate from "./InputIconTemplate.js";

// Styles
import inputIconCss from "./generated/themes/InputIcon.css.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-input-icon` is an internal component used by `ui5-input` to wrap interactive icons
 * with button-like styling and behavior.
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-input-icon",
	renderer: jsxRender,
	template: InputIconTemplate,
	styles: inputIconCss,
})
class InputIcon extends UI5Element {
	/**
	 * Defines the name of the icon to display.
	 * If provided, InputIcon will create the icon internally.
	 * If not provided, expects an icon to be slotted.
	 * @default undefined
	 * @private
	 */
	@property()
	iconName?: string;

	/**
	 * Defines the accessible name of the icon.
	 * @default undefined
	 * @private
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the value state of the Input that the icon belongs to.
	 * Used for styling the icon according to the input's state.
	 * @default "None"
	 * @private
	 */
	@property()
	valueState?: string = "None";

	/**
	 * Defines the icon element (when not using iconName).
	 * @default []
	 * @private
	 */
	@slot({ type: HTMLElement, "default": true })
	icon!: DefaultSlot<IIcon>;

	onAfterRendering() {
		// Make icons non-focusable - the wrapper handles all focus and interaction
		// Handle both slotted icons and internally created icon (via iconName)

		// Handle slotted icons
		if (this.icon && this.icon.length > 0) {
			this.icon.forEach(iconEl => {
				// Set tabindex="-1" on the icon host to make it non-focusable
				iconEl.setAttribute("tabindex", "-1");
				// Set tabindex="-1" on the SVG inside
				const svg = iconEl.shadowRoot?.querySelector("svg");
				if (svg) {
					svg.setAttribute("tabindex", "-1");
				}
			});
		}

		// Handle internally created icon (when iconName is used)
		if (this.iconName) {
			const internalIcon = this.shadowRoot?.querySelector("[ui5-icon]") as HTMLElement;
			if (internalIcon) {
				// Set tabindex="-1" on the icon host to make it non-focusable
				internalIcon.setAttribute("tabindex", "-1");
				// Set tabindex="-1" on the SVG inside
				const svg = internalIcon.shadowRoot?.querySelector("svg");
				if (svg) {
					svg.setAttribute("tabindex", "-1");
				}
			}
		}
	}
}

InputIcon.define();

export default InputIcon;
