import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SliderHandleTemplate from "./SliderHandleTemplate.js";
import styles from "./generated/themes/SliderHandle.css.js";
import type { SliderScaleOrientation } from "./SliderScale.js";

@customElement({
	tag: "ui5-slider-handle",
	renderer: jsxRenderer,
	template: SliderHandleTemplate,
	styles,
})
class SliderHandle extends UI5Element {
	@property({ type: Number })
	value = 0;

	@property({ type: Number })
	min = 0;

	@property({ type: Number })
	max = 100;

	@property({ type: Boolean })
	disabled = false;

	@property({ type: Boolean })
	active = false;

	@property()
	orientation: `${SliderScaleOrientation}` = "Horizontal";

	get _handlePosition() {
		const range = this.max - this.min;
		const position = ((this.value - this.min) / range) * 100;
		return position;
	}
}

SliderHandle.define();

export default SliderHandle;
