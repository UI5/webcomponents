import type SliderScale from "./SliderScale.js";

export default function SliderScaleTemplate(this: SliderScale) {
	return (
		<div class="ui5-slider-scale-root">
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
			<div class="ui5-slider-scale-progress" style={this._progressStyle}></div>
		</div>
	);
}
