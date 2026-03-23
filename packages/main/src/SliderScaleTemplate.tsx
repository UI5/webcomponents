import type SliderScale from "./SliderScale.js";
import type { AriaRole } from "@ui5/webcomponents-base/dist/types.js";

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
				tabIndex={this.progressFocusable ? this.progressTabIndex : undefined}
				role={this.progressRole as AriaRole | undefined}
				aria-orientation={this.progressRole ? "horizontal" : undefined}
				aria-valuemin={this.progressRole ? this.min : undefined}
				aria-valuemax={this.progressRole ? this.max : undefined}
				aria-valuenow={this.progressAriaValueNow}
				aria-valuetext={this.progressAriaValueText}
				aria-label={this.progressAriaLabel}
				aria-disabled={this.progressAriaDisabled}
				onFocusIn={this.onProgressFocusIn}
				onFocusOut={this.onProgressFocusOut}
			></div>
			<slot></slot>
		</div>
	);
}
