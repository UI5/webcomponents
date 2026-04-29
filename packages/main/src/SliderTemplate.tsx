import type Slider from "./Slider.js";
import SliderTooltip from "./SliderTooltip.js";
import SliderHandle from "./SliderHandle.js";
import SliderScale from "./SliderScale.js";

const _handlePosition = (min: number, max: number, value: number) => {
	const range = max - min;
	const position = ((value - min) / range) * 100;
	return position;
};

const handle = (slider: Slider) => {
	const position = _handlePosition(slider._effectiveMin, slider._effectiveMax, slider.value);

	return (
		<>
			<SliderHandle
				data-sap-focus-ref
				value={slider.value}
				min={slider._effectiveMin}
				max={slider._effectiveMax}
				tabIndex={slider.disabled ? -1 : 0}
				aria-orientation="horizontal"
				part="handle"
				exportparts="icon: handle-icon"
				role="slider"
				aria-valuemin={slider._effectiveMin}
				aria-valuemax={slider._effectiveMax}
				aria-valuenow={slider.value}
				aria-valuetext={slider._ariaValueText}
				aria-label={slider._ariaLabel}
				aria-disabled={slider._ariaDisabled}
				aria-keyshortcuts={slider._ariaKeyshortcuts}
				aria-describedby={slider._ariaDescribedByHandleText}
				style={{
					"inset-inline-start": `clamp(0%, ${position}%, 100%)`,
				}}
			></SliderHandle>

			{tooltip(slider)}
		</>
	);
};

const tooltip = (slider: Slider) => (
	<SliderTooltip
		open={slider._tooltipsOpen}
		value={slider.tooltipValue}
		min={slider._effectiveMin}
		max={slider._effectiveMax}
		editable={slider.editableTooltip && !slider._isCustomValuesMode}
		followRef={slider.shadowRoot?.querySelector("[ui5-slider-handle]") as HTMLElement}
		valueState={slider.tooltipValueState}
		onChange={slider._onTooltipChange}
		onKeyDown={slider._onTooltipKeydown}
		onFocusChange={slider._onTooltipFocusChange}
		onOpen={slider._onTooltipOpen}
		onInput={slider._onTooltipInput}
	>
	</SliderTooltip>
);

export default function SliderTemplate(this: Slider) {
	return (
		<>
			<div
				class="ui5-slider-evo-root"
				part="root-container"
				onMouseDown={this._onmousedown}
				onTouchStart={this._onmousedown}
				onMouseOver={this._onmouseover}
				onMouseOut={this._onmouseout}
				onKeyDown={this._onkeydown}
				onKeyUp={this._onkeyup}
			>
				<SliderScale
					endValue={this.value}
					min={this._effectiveMin}
					max={this._effectiveMax}
					step={this.step}
					startValue={this._effectiveMin}
					showTickmarks={this.showTickmarks || this._isCustomValuesMode}
					labelInterval={this._isCustomValuesMode ? 1 : this.labelInterval}
					tickmarks={this.tickmarks}
					onFocusOut={this._onfocusout}
					onFocusIn={this._onfocusin}
					part="scale"
					exportparts="inner: scale-inner, progress: progress"
				>
					{handle(this)}

					{this.editableTooltip && <>
						<span id="ui5-slider-InputDesc" class="ui5-hidden-text">{this._ariaDescribedByInputText}</span>
					</>}
				</SliderScale>
			</div>
		</>
	);
}
