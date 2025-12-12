import type SliderScale from "./SliderScale.js";

export default function SliderScaleTemplate(this: SliderScale) {
	return (
		<div class="ui5-slider-scale-root">
			<div class="ui5-slider-scale-progress" style={this._progressStyle}></div>
		</div>
	);
}
