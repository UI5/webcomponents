import type RangeSlider from "./RangeSlider.js";
import SliderTooltip from "./SliderTooltip.js";
import SliderHandle from "./SliderHandle.js";
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
				disabled={slider.disabled}
				handleType="start"
				aria-orientation="horizontal"
				part="handle"
				exportparts="icon: handle-icon"
				role="slider"
				aria-valuemin={slider.min}
				aria-valuemax={slider.max}
				aria-valuenow={slider.startValue}
				aria-labelledby={slider._ariaLabelledByStartHandleText}
				aria-disabled={slider._ariaDisabled}
				aria-describedby={slider._ariaDescribedByHandleText}
				aria-keyshortcuts={slider._ariaKeyshortcuts}
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
				disabled={slider.disabled}
				handleType="end"
				aria-orientation="horizontal"
				part="handle"
				exportparts="icon: handle-icon"
				role="slider"
				aria-valuemin={slider.min}
				aria-valuemax={slider.max}
				aria-valuenow={slider.endValue}
				aria-labelledby={slider._ariaLabelledByEndHandleText}
				aria-disabled={slider._ariaDisabled}
				aria-describedby={slider._ariaDescribedByHandleText}
				aria-keyshortcuts="F2"
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
				{/* Hidden accessibility text for handle descriptions */}
				<span id="ui5-slider-startHandleDesc" class="ui5-hidden-text">{this._ariaHandlesText.startHandleText}</span>
				<span id="ui5-slider-endHandleDesc" class="ui5-hidden-text">{this._ariaHandlesText.endHandleText}</span>
				{this.accessibleName && <span id="ui5-slider-accName" class="ui5-hidden-text">{this.accessibleName}</span>}

				<SliderScale
					startValue={this.startValue}
					endValue={this.endValue}
					min={this.min}
					max={this.max}
					step={this._effectiveStep}
					showTickmarks={this.showTickmarks}
					labelInterval={this.labelInterval}
					progressFocusable={true}
					progressTabIndex={this._tabIndex}
					progressRole="slider"
					progressAriaValueNow={this._ariaValueNow}
					progressAriaValueText={`From ${this.startValue} to ${this.endValue}`}
					progressAriaLabel={this._ariaLabel}
					progressAriaDisabled={this._ariaDisabled}
					progressPressed={this.rangePressed}
					progressFocused={this._progressFocused}
					onProgressFocusIn={this._onfocusin}
					onProgressFocusOut={this._onfocusout}
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
