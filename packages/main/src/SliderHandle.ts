import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SliderHandleTemplate from "./SliderHandleTemplate.js";
import styles from "./generated/themes/SliderHandle.css.js";
import type { SliderScaleOrientation } from "./SliderScale.js";

/**
 * @class
 * The <code>ui5-slider-handle</code> component represents the handle of the <code>ui5-slider</code> component.
 *
 * @constructor
 * @extends UI5Element
 * @since 2.19.0
 * @private
 */
@customElement({
	tag: "ui5-slider-handle",
	renderer: jsxRenderer,
	template: SliderHandleTemplate,
	styles,
})
class SliderHandle extends UI5Element {
	/**
	 * Defines the value of the slider handle.
	 * <br><br>
	 * <b>Note:</b> The value should be between the <code>min</code> and <code>max</code> properties of the parent <code>ui5-slider</code>.
	 * @since 2.19.0
	 * @public
	 */
	@property({ type: Number })
	value = 0;

	/**
	 * Defines the minimum value of the slider handle.
	 * <br><br>
	 * <b>Note:</b> The value should be less than the <code>max</code> property of the parent <code>ui5-slider</code>.
	 * @since 2.19.0
	 * @public
	 */
	@property({ type: Number })
	min = 0;

	/**
	 * Defines the maximum value of the slider handle.
	 * <br><br>
	 * <b>Note:</b> The value should be greater than the <code>min</code> property of the parent <code>ui5-slider</code>.
	 * @since 2.19.0
	 * @public
	 */
	@property({ type: Number })
	max = 100;

	/**
	 * Defines whether the slider handle is disabled.
	 * <br><br>
	 * <b>Note:</b> A disabled slider handle cannot be interacted with.
	 * @since 2.19.0
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines whether the slider handle is active.
	 * <br><br>
	 * <b>Note:</b> An active slider handle is currently being interacted with.
	 * @since 2.19.0
	 * @public
	 */
	@property({ type: Boolean })
	active = false;

	@property()
	orientation: `${SliderScaleOrientation}` = "Horizontal";

	get _handlePosition() {
		const range = this.max - this.min;
		const position = ((this.value - this.min) / range) * 100;
		return position;
	}

	getFocusDomRef(): HTMLElement | undefined {
		return this;
	}
}

SliderHandle.define();

export default SliderHandle;
