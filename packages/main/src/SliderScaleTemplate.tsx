import type SliderScale from "./SliderScale.js";

export default function SliderScaleTemplate(this: SliderScale) {
	return (
		<div class="ui5-slider-scale-root" part="inner">
			{this._tickmarks.length > 0 && (
				<div class="ui5-slider-scale-tickmarks-container">
					{this._tickmarks.map(tick => (
						<div
							class={{
								"ui5-slider-scale-tickmark": true,
								"ui5-slider-scale-tickmark-in-range": tick.isInRange,
							}}
							style={{
								insetInlineStart: `${this.orientation === "Horizontal" ? tick.position : "50"}%`,
								bottom: `${this.orientation === "Vertical" ? tick.position : "auto"}%`
							}}
						>
							{tick.label && tick.showLabel && (
								<span class="ui5-slider-scale-tickmark-label">
									{tick.label}
								</span>
							)}
						</div>
					))}
				</div>
			)}
			<div
				class={{
					"ui5-slider-scale-progress": true,
					"ui5-slider-progress": true,
					"ui5-slider-progress--focused": this.progressFocused || this.progressPressed,
				}}
				part="progress"
				style={this._progressStyle}
				tabIndex={this.progressTabIndex}
				role="slider"
				aria-orientation="horizontal"
				aria-valuemin={this.min}
				aria-valuemax={this.max}
				aria-valuenow={this.progressAriaValueNow}
				aria-valuetext={this.progressAriaValueText}
				aria-label={this.progressAriaLabel}
				aria-disabled={this.progressAriaDisabled}
				onMouseEnter={this._onProgressMouseEnter}
				onMouseLeave={this._onProgressMouseLeave}
			></div>
			<div
				class="ui5-slider-scale-progress-hover-area"
				style={this._progressStyle}
				onMouseEnter={this._onProgressMouseEnter}
				onMouseLeave={this._onProgressMouseLeave}
			></div>
			<slot></slot>
		</div>
	);
}
