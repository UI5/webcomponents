import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import SliderBase from "./SliderBase.js";
import SliderScaleTemplate from "./SliderScaleTemplate.js";

import SliderScaleCss from "./generated/themes/SliderScale.css.js";
import type SliderHandle from "./SliderHandle.js";

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

	@property()
	orientation: `${SliderScaleOrientation}` = "Horizontal";

	@property({ type: Array })
	tickmarks: Array<Tickmark> = [];

	@property({ type: Number })
	labelInterval = 0;

	/**
	 * @private
	 */
	@property({ type: Number })
	_labelInterval = 1;

	@property({ type: Boolean })
	_labelsOverlapping = false;

	@property({ type: Boolean })
	_hiddenTickmarks = false;

	_resizeHandler: ResizeObserverCallback;
	_notResized = true;

	/**
	 * Defines the component items.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
	})
	handles!: Array<SliderHandle>;

	static get MIN_LABEL_DISTANCE() {
		return 16;
	}

	static get MIN_SPACE_BETWEEN_TICKMARKS() {
		return 8;
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
	 * Handle the responsiveness of the SliderScale's UI elements when resizing
	 * @private
	 */
	_handleResize() {
		if (!this.showTickmarks) {
			this._hiddenTickmarks = false;
			this._labelsOverlapping = false;
			return;
		}

		// Mark resizing to avoid unnecessary calls to that function after rendering
		this._notResized = false;

		const containerSize = this.orientation === SliderScaleOrientation.Horizontal
			? this.getBoundingClientRect().width
			: this.getBoundingClientRect().height;

		const tickmarksCount = this._tickmarksCount;

		// Check if tickmarks should be hidden due to insufficient space
		if (tickmarksCount > 1) {
			const spaceBetweenTickmarks = containerSize / tickmarksCount;
			this._hiddenTickmarks = spaceBetweenTickmarks < SliderScale.MIN_SPACE_BETWEEN_TICKMARKS;
		} else {
			this._hiddenTickmarks = false;
		}

		// Check if labels should be hidden due to insufficient space or overlapping
		if (this.labelInterval <= 0 || this._hiddenTickmarks) {
			this._labelsOverlapping = true;
		} else {
			// Calculate if labels would overlap based on their estimated width
			const visibleLabelCount = Math.ceil((tickmarksCount - 1) / this.labelInterval) + 1;
			const estimatedLabelWidth = 32; // Estimated width in pixels for a label (2rem = ~32px)
			const requiredWidth = visibleLabelCount * estimatedLabelWidth;
			this._labelsOverlapping = containerSize < requiredWidth;
		}
	}

	/**
	 * Calculates space between tickmarks
	 * @private
	 */
	_spaceBetweenTickmarks() {
		const tickmarksCount = this._tickmarksCount;
		if (tickmarksCount <= 1) {
			return 0;
		}

		const containerSize = this.orientation === SliderScaleOrientation.Horizontal
			? this.getBoundingClientRect().width
			: this.getBoundingClientRect().height;

		return containerSize / tickmarksCount;
	}

	get _tickmarksCount() {
		return (this.max - this.min) / this.step;
	}

	get _visibleLabels() {
		return this._tickmarks.filter(tick => tick.showLabel);
	}

	get _progressStyle() {
		const range = this.max - this.min;
		// Clamp startValue and endValue to be within min/max bounds
		const clampedStartValue = Math.max(this.min, Math.min(this.startValue, this.max));
		const clampedEndValue = Math.max(this.min, Math.min(this.endValue, this.max));

		const start = ((clampedStartValue - this.min) / range) * 100;
		const end = ((clampedEndValue - this.min) / range) * 100;

		if (this.orientation === SliderScaleOrientation.Vertical) {
			return {
				top: "auto",
				bottom: `${start}%`,
				height: `${end - start}%`,
			};
		}

		return {
			insetInlineStart: `${start}%`,
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
		const stepPrecision = SliderBase._getDecimalPrecisionOfNumber(this.step);
		const formatLabelPrecision = stepPrecision > 0 ? stepPrecision : 0;

		if (allTickmarks.length === 0) {
			return [];
		}

		return allTickmarks.map((tm, index) => {
			const value = tm.value;
			const isFirstOrLast = index === 0 || index === allTickmarks.length - 1;
			const position = ((value - this.min) / (this.max - this.min)) * 100;

			// Determine if this tickmark should be visible
			const shouldShowTickmark = this._hiddenTickmarks ? isFirstOrLast : true;

			// Determine if the label should be visible
			let showLabel = false;
			if (shouldShowTickmark && !this._labelsOverlapping) {
				if (this.labelInterval > 0) {
					showLabel = index % this.labelInterval === 0;
				} else {
					showLabel = true;
				}
			} else if (shouldShowTickmark && this._labelsOverlapping && this.labelInterval > 0) {
				// When labels overlap, only show first and last
				showLabel = isFirstOrLast;
			}

			return {
				value,
				label: tm.label || value.toFixed(formatLabelPrecision),
				isInRange: value >= this.startValue && value <= this.endValue,
				position,
				showLabel,
				visible: shouldShowTickmark,
			};
		}).filter(tick => tick.visible);
	}
}

SliderScale.define();

export default SliderScale;
export { SliderScaleOrientation };
export type { Tickmark };
