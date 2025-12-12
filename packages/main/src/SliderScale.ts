import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SliderScaleTemplate from "./SliderScaleTemplate.js";

import SliderScaleCss from "./generated/themes/SliderScale.css.js";

@customElement({
	tag: "ui5-slider-scale",
	renderer: jsxRenderer,
	styles: SliderScaleCss,
	template: SliderScaleTemplate,
})
class SliderScale extends UI5Element {
	@property({ type: Number })
	startValue = 0;

	@property({ type: Number })
	endValue = 100;

	@property({ type: Number })
	min = 0;

	@property({ type: Number })
	max = 100;

	get _progressStyle() {
		const range = this.max - this.min;
		const start = ((this.startValue - this.min) / range) * 100;
		const end = ((this.endValue - this.min) / range) * 100;

		return {
			left: `${start}%`,
			width: `${end - start}%`,
		};
	}
}

SliderScale.define();

export default SliderScale;
