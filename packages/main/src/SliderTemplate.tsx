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
	const position = _handlePosition(slider.min, slider.max, slider.value);

	return (
		<>
			<SliderHandle
				data-sap-focus-ref
				value={slider.value}
				min={slider.min}
				max={slider.max}
				tabIndex={slider.disabled ? -1 : 0}
				disabled={slider.disabled}
				aria-orientation="horizontal"
				part="handle-container"
				aria-valuemin={slider.min}
				aria-valuemax={slider.max}
				aria-valuenow={slider.value}
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
		min={slider.min}
		max={slider.max}
		editable={slider.editableTooltip}
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
					min={this.min}
					max={this.max}
					step={this.step}
					startValue={this.min}
					showTickmarks={this.showTickmarks}
					labelInterval={this.labelInterval}
					onFocusOut={this._onfocusout}
					onFocusIn={this._onfocusin}
				>
					{handle(this)}
				</SliderScale>
			</div>
		</>
	);
}
