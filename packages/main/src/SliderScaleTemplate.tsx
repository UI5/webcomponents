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
				role={this.progressRole}
				aria-orientation={this.progressRole ? "horizontal" : undefined}
				aria-valuemin={this.progressRole ? this.min : undefined}
				aria-valuemax={this.progressRole ? this.max : undefined}
				aria-valuenow={this.progressRole ? this.progressAriaValueNow : undefined}
				aria-valuetext={this.progressRole ? this.progressAriaValueText : undefined}
				aria-label={this.progressRole ? this.progressAriaLabel : undefined}
				aria-disabled={this.progressRole ? this.progressAriaDisabled : undefined}
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
