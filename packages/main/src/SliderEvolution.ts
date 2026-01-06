import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SliderEvolutionTemplate from "./SliderEvolutionTemplate.js";
import SliderScale, { SliderScaleOrientation } from "./SliderScale.js";
import SliderHandle from "./SliderHandle.js";
import styles from "./generated/themes/SliderEvolution.css.js";

@customElement({
	tag: "ui5-slider-evolution",
	renderer: jsxRenderer,
	template: SliderEvolutionTemplate,
	styles,
	dependencies: [SliderScale, SliderHandle],
})
class SliderEvolution extends UI5Element {
	@property({ type: Boolean, noAttribute: true })
	_pressed = false;

	@property({ type: Number })
	value = 0;

	@property({ type: Number })
	min = 0;

	@property({ type: Number })
	max = 100;

	@property({ type: Number })
	step = 1;

	@property({ type: Boolean })
	showTickmarks = false;

	@property({ type: Boolean })
	showTickmarkLabels = false;

	@property()
	orientation: `${SliderScaleOrientation}` = "Horizontal";

	get _handlePosition() {
		const range = this.max - this.min;
		const position = ((this.value - this.min) / range) * 100;
		return position;
	}

	_onmousedown = (e: MouseEvent) => {
		const target = e.target as HTMLElement;

		this._pressed = true;

		if (!this.getDomRef()?.contains(target) || !target.hasAttribute("ui5-slider-handle")) {
			this._updateValue(e);
		}

		document.addEventListener("mouseup", this._onmouseup);
		document.addEventListener("mousemove", this._onmousemove);
	};

	_onmouseup = () => {
		this._pressed = false;
		document.removeEventListener("mouseup", this._onmouseup);
		document.removeEventListener("mousemove", this._onmousemove);
	};

	_onmousemove = (e: MouseEvent) => {
		if (this._pressed) {
			this._updateValue(e);
		}
	};

	_updateValue(e: MouseEvent) {
		const rect = this.getBoundingClientRect();
		let percentage = 0;

		if (this.orientation === SliderScaleOrientation.Horizontal) {
			if (this.effectiveDir === "rtl") {
				const x = e.clientX - rect.left;
				percentage = 1 - x / rect.width;
			} else {
				const x = e.clientX - rect.left;
				percentage = x / rect.width;
			}
		} else {
			const y = e.clientY - rect.top;
			percentage = 1 - y / rect.height;
		}

		let value = this.min + percentage * (this.max - this.min);

		value = Math.round(value / this.step) * this.step;

		if (value < this.min) {
			value = this.min;
		}
		if (value > this.max) {
			value = this.max;
		}

		this.value = value;
	}

	keydown(e: KeyboardEvent) {
		if (e.key === "ArrowRight" || e.key === "ArrowUp") {
			this.value = Math.min(this.value + this.step, this.max);
			e.preventDefault();
		} else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
			this.value = Math.max(this.value - this.step, this.min);
			e.preventDefault();
		} else if (e.key === "Home") {
			this.value = this.min;
			e.preventDefault();
		} else if (e.key === "End") {
			this.value = this.max;
			e.preventDefault();
		}
	};
}

SliderEvolution.define();

export default SliderEvolution;
