import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import SliderScaleTemplate from "./SliderScaleTemplate.js";

import SliderScaleCss from "./generated/themes/SliderScale.css.js";

type Tickmark = {
	value: number;
	label?: string;
};

enum SliderScaleOrientation {
	/**
	 * Horizontal orientation
	 * @public
	 */
	Horizontal = "Horizontal",

	/**
	 * Vertical orientation
	 * @public
	 */
	Vertical = "Vertical",
}

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

	@property({ type: Number })
	step = 1;

	@property({ type: Boolean })
	showTickmarks = false;

	@property({ type: Boolean })
	showTickmarkLabels = false;

	@property()
	orientation: `${SliderScaleOrientation}` = "Horizontal";

	@property({ type: Array })
	tickmarks: Array<Tickmark> = [];

	/**
	 * @private
	 */
	@property({ type: Number })
	_labelInterval = 1;

	_resizeHandler: ResizeObserverCallback;
	_notResized = true;

	static get MIN_LABEL_DISTANCE() {
		return 16;
	}

	constructor() {
		super();
		this._resizeHandler = this._handleResize.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._resizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._resizeHandler);
	}

	onAfterRendering() {
		if (this._notResized) {
			this._handleResize();
		}
	}

	/**
	 * Handles resize to determine optimal label interval
	 * @private
	 */
	_handleResize() {
		if (!this.showTickmarkLabels) {
			return;
		}

		this._notResized = false;

		const width = this.orientation === SliderScaleOrientation.Horizontal
			? this.getBoundingClientRect().width
			: this.getBoundingClientRect().height;
		const totalTickmarks = this._allTickmarks.length;

		if (totalTickmarks <= 1) {
			this._labelInterval = 1;
			return;
		}

		// Start with showing all labels (interval = 1)
		let interval = 1;
		let visibleLabelCount = Math.floor((totalTickmarks - 1) / interval) + 1;
		let spaceBetweenLabels = width / (visibleLabelCount - 1);

		// Keep doubling the interval until we have enough space
		while (
			spaceBetweenLabels < SliderScale.MIN_LABEL_DISTANCE && interval < totalTickmarks
		) {
			interval *= 2;
			visibleLabelCount = Math.floor((totalTickmarks - 1) / interval) + 1;
			spaceBetweenLabels = width / (visibleLabelCount - 1);
		}

		this._labelInterval = interval;
	}

	get _progressStyle() {
		const range = this.max - this.min;
		const start = ((this.startValue - this.min) / range) * 100;
		const end = ((this.endValue - this.min) / range) * 100;

		if (this.orientation === SliderScaleOrientation.Vertical) {
			return {
				top: "auto",
				bottom: `${start}%`,
				height: `${end - start}%`,
			};
		}

		return {
			left: `${start}%`,
			width: `${end - start}%`,
		};
	}

	get _allTickmarks() {
		// If custom tickmarks are provided, use them
		if (this.tickmarks.length > 0) {
			return this.tickmarks;
		}

		// Otherwise, generate tickmarks based on step
		if (!this.showTickmarks) {
			return [];
		}

		const values = [];
		for (let value = this.min; value <= this.max; value += this.step) {
			values.push({ value });
		}
		return values;
	}

	get _tickmarks() {
		const allTickmarks = this._allTickmarks;

		if (allTickmarks.length === 0) {
			return [];
		}

		// If labels are not shown, show all tickmarks without labels
		if (!this.showTickmarkLabels) {
			return allTickmarks.map(tm => {
				const value = tm.value;
				const isInRange = value >= this.startValue && value <= this.endValue;
				const position = ((value - this.min) / (this.max - this.min)) * 100;

				return {
					value,
					label: undefined,
					isInRange,
					position,
					showLabel: false,
				};
			});
		}

		// If labels are shown, only show tickmarks that have labels
		const tickmarksWithLabels:Array<{value: number; label: string; isInRange: boolean; position: number; showLabel: boolean}> = [];

		allTickmarks.forEach((tm, index) => {
			const value = tm.value;
			const isFirstOrLast = index === 0 || index === allTickmarks.length - 1;
			const isIntervalMatch = index % this._labelInterval === 0;

			// Only include this tickmark if its label should be shown
			if (isFirstOrLast || isIntervalMatch) {
				const isInRange = value >= this.startValue && value <= this.endValue;
				const position = ((value - this.min) / (this.max - this.min)) * 100;

				tickmarksWithLabels.push({
					value,
					label: tm.label || value.toString(),
					isInRange,
					position,
					showLabel: true,
				});
			}
		});

		return tickmarksWithLabels;
	}
}

SliderScale.define();

export default SliderScale;
export type { Tickmark };
