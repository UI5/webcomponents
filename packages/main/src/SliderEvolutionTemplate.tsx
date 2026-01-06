import type SliderEvolution from "./SliderEvolution.js";
import SliderScale from "./SliderScale.js";
import SliderHandle from "./SliderHandle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScopeUtils.js";

export default function SliderEvolutionTemplate(this: SliderEvolution) {
	const _handlePosition = () => {
		const range = this.max - this.min;
		const position = ((this.value - this.min) / range) * 100;
		return position;
	};

	const _handleVerticalPosition = () => {
		const range = this.max - this.min;
		const position = ((this.value - this.min) / range) * 100;
		return position;
	};

	const calcHandlePosition = () => {
		if (this.orientation === "Vertical") {
			return `calc(${_handleVerticalPosition()}% - calc(var(${getScopedVarName("--_ui5_slider_handle_height")}) / 2))`;
		}

		if (this.effectiveDir === "rtl") {
			return `calc(${100 - _handlePosition()}% - calc(var(${getScopedVarName("--_ui5_slider_handle_width")}) / 2))`;
		}

		return `calc(${_handlePosition()}% - calc(var(${getScopedVarName("--_ui5_slider_handle_width")}) / 2))`;
	};

	return (
		<div
			class="ui5-slider-evolution-root"
			onMouseDown={this._onmousedown}
		>
			<SliderScale
				min={this.min}
				max={this.max}
				step={this.step}
				startValue={this.min}
				endValue={this.value}
				show-tickmarks={this.showTickmarks}
				show-tickmark-labels={this.showTickmarkLabels}
				orientation={this.orientation}
			/>
			<SliderHandle
				active={this._pressed}
				orientation={this.orientation}
				onKeyDown={this.keydown}
				style={{
					left: this.orientation === "Vertical" ? "0" : calcHandlePosition(),
					bottom: this.orientation === "Vertical" ? calcHandlePosition() : 0,
					top: this.orientation === "Vertical" ? "auto" : "4px"
				}}
			/>
		</div>
	);
}
