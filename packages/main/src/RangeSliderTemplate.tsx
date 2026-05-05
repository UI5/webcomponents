import type RangeSlider from "./RangeSlider.js";
import SliderTooltip from "./SliderTooltip.js";
import SliderHandle, { SliderHandleType } from "./SliderHandle.js";
import SliderScale from "./SliderScale.js";

const _handlePosition = (min: number, max: number, value: number) => {
	const range = max - min;
	const position = ((value - min) / range) * 100;
	return position;
};

const startHandle = (slider: RangeSlider) => {
	const position = _handlePosition(slider.min, slider.max, slider.startValue);

	return (
		<>
			<SliderHandle
				value={slider.startValue}
				min={slider.min}
				max={slider.max}
				tabIndex={slider._tabIndex}
				active={slider.rangePressed}
				handleType={SliderHandleType.Start}
				aria-orientation="horizontal"
				part="handle"
				exportparts="icon: handle-icon"
				role="slider"
				aria-valuemin={slider.min}
				aria-valuemax={slider.max}
				aria-valuenow={slider.startValue}
				aria-valuetext={slider._ariaValueTextStart}
				aria-label={slider._ariaLabelStartHandle}
				aria-disabled={slider._ariaDisabled}
				aria-describedby={slider._ariaDescribedByHandleText}
				onFocusIn={slider._onfocusin}
				onFocusOut={slider._onfocusout}
				style={{
					"inset-inline-start": `clamp(0%, ${position}%, 100%)`,
				}}
			></SliderHandle>

			{startTooltip(slider)}
		</>
	);
};

const endHandle = (slider: RangeSlider) => {
	const position = _handlePosition(slider.min, slider.max, slider.endValue);

	return (
		<>
			<SliderHandle
				value={slider.endValue}
				min={slider.min}
				max={slider.max}
				tabIndex={slider._tabIndex}
				active={slider.rangePressed}
				handleType={SliderHandleType.End}
				aria-orientation="horizontal"
				part="handle"
				exportparts="icon: handle-icon"
				role="slider"
				aria-valuemin={slider.min}
				aria-valuemax={slider.max}
				aria-valuenow={slider.endValue}
				aria-valuetext={slider._ariaValueTextEnd}
				aria-label={slider._ariaLabelEndHandle}
				aria-disabled={slider._ariaDisabled}
				aria-describedby={slider._ariaDescribedByHandleText}
				onFocusIn={slider._onfocusin}
				onFocusOut={slider._onfocusout}
				style={{
					"inset-inline-start": `clamp(0%, ${position}%, 100%)`,
				}}
			></SliderHandle>

			{endTooltip(slider)}
		</>
	);
};

const startTooltip = (slider: RangeSlider) => (
	<SliderTooltip
		open={slider._tooltipsOpen}
		value={slider.tooltipStartValue}
		valueState={slider.tooltipStartValueState}
		min={slider.min}
		max={slider.max}
		data-sap-ui-start-value
		editable={slider.editableTooltip}
		followRef={slider._startHandle}
		onChange={slider._onTooltipChange}
		onKeyDown={slider._onTooltipKeydown}
		onFocusChange={slider._onTooltipFocusChange}
		onOpen={slider._onTooltipOpen}
		onInput={slider._onTooltipInput}
	>
	</SliderTooltip>
);

const endTooltip = (slider: RangeSlider) => (
	<SliderTooltip
		open={slider._tooltipsOpen}
		value={slider.tooltipEndValue}
		valueState={slider.tooltipEndValueState}
		min={slider.min}
		max={slider.max}
		data-sap-ui-end-value
		editable={slider.editableTooltip}
		followRef={slider._endHandle}
		onChange={slider._onTooltipChange}
		onKeyDown={slider._onTooltipKeydown}
		onFocusChange={slider._onTooltipFocusChange}
		onOpen={slider._onTooltipOpen}
		onInput={slider._onTooltipInput}
	>
	</SliderTooltip>
);

export default function RangeSliderTemplate(this: RangeSlider) {
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
					startValue={this.startValue}
					endValue={this.endValue}
					min={this.min}
					max={this.max}
					step={this._effectiveStep}
					showTickmarks={this.showTickmarks || this._hasCustomTickmarks}
					labelInterval={this._hasCustomTickmarks ? 1 : this.labelInterval}
					tickmarks={this.tickmarks}
					progressTabIndex={this._tabIndex}
					progressAriaValueNow={this._ariaValueNow}
					progressAriaValueText={`From ${this.startValue} to ${this.endValue}`}
					progressAriaLabel={this._ariaLabel}
					progressAriaDisabled={this._ariaDisabled}
					progressPressed={this.rangePressed}
					progressFocused={this._progressFocused}
					onFocusIn={this._onfocusin}
					onFocusOut={this._onfocusout}
					part="scale"
					exportparts="inner: scale-inner, progress: progress-bar"
				>
					{startHandle(this)}
					{endHandle(this)}

					{this.editableTooltip && <>
						<span id="ui5-slider-InputDesc" class="ui5-hidden-text">{this._ariaDescribedByInputText}</span>
					</>}
				</SliderScale>
			</div>
		</>
	);
}
