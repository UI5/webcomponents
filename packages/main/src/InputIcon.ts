import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import InputIconTemplate from "./InputIconTemplate.js";
import inputIconCss from "./generated/themes/InputIcon.css.js";
import "./Icon.js";

/**
 * @class
 * ### Overview
 * The `ui5-input-icon` component represents an interactive icon that can be placed inside an `ui5-input` component.
 * Unlike the standard `ui5-icon`, this component provides button-like behavior with hover, focus, and active states,
 * matching the visual style of the input's built-in clear icon.
 *
 * ### Usage
 * Use `ui5-input-icon` for interactive icons that users can click (e.g., search, voice input, camera).
 * For decorative icons, use the standard `ui5-icon` component instead.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/InputIcon.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.25.0
 */
@customElement({
	tag: "ui5-input-icon",
	renderer: jsxRenderer,
	template: InputIconTemplate,
	styles: inputIconCss,
	languageAware: false,
	themeAware: true,
})
/**
 * Fired when the `ui5-input-icon` is activated either with a click/tap or by using the Enter or Space key.
 * @public
 */
@event("click", {
	bubbles: true,
})
class InputIcon extends UI5Element {
	eventDetails!: {
		click: void;
	}

	/**
	 * Defines the icon name to be displayed.
	 *
	 * **Note:** Make sure you import the desired icon before using it.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	name?: string;

	/**
	 * Defines the accessible name of the icon.
	 *
	 * **Note:** This property is used for accessibility purposes and will be announced by screen readers.
	 * When set, it is also rendered as a native `title` tooltip.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_pressed = false;

	/**
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_focused = false;

	_onclick(e: MouseEvent) {
		e.stopImmediatePropagation();
		this.fireDecoratorEvent("click");
	}

	_onmousedown() {
		this._pressed = true;
	}

	_onmouseup() {
		this._pressed = false;
	}

	_onmouseleave() {
		this._pressed = false;
	}

	_onfocus() {
		this._focused = true;
	}

	_onblur() {
		this._focused = false;
		this._pressed = false;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e) || isSpace(e)) {
			this._pressed = true;
			e.preventDefault(); // Prevent scrolling on Space
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isEnter(e) || isSpace(e)) {
			this._pressed = false;
			this.fireDecoratorEvent("click");
		}
	}

	get effectiveAriaLabel() {
		return this.accessibleName || undefined;
	}

	get effectiveTitle() {
		return this.accessibleName || undefined;
	}
}

InputIcon.define();

export default InputIcon;
