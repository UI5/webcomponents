import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import type RangeSlider from "./RangeSlider.js";
import Icon from "./Icon.js";
import SliderBaseTemplate from "./SliderBaseTemplate.js";
import SliderTooltip from "./SliderTooltip.js";

export default function RangeSliderTemplate(this: RangeSlider) {
	return SliderBaseTemplate.call(this, {
		handlesAriaText,
		progressBar,
		handles,
	});
}

export function handlesAriaText(this: RangeSlider) {
	return (<>
		<span id="ui5-slider-startHandleDesc" class="ui5-hidden-text">{this._ariaHandlesText.startHandleText}</span>
		<span id="ui5-slider-endHandleDesc" class="ui5-hidden-text">{this._ariaHandlesText.endHandleText}</span>
	</>);
}

export function progressBar(this: RangeSlider) {
	return (
		<div
			class="ui5-slider-progress-container"
			part="progress-container"
		>
			<div class="ui5-slider-progress"
				part="progress-bar"
				style={this.styles.progress}
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				role="slider"
				tabIndex={this._tabIndex}
				aria-orientation="horizontal"
				aria-valuemin={this.min}
				aria-valuemax={this.max}
				aria-valuenow={this._ariaValueNow}
				aria-valuetext={`From ${this.startValue} to ${this.endValue}`}
				aria-label={this._ariaLabel}
				aria-disabled={this._ariaDisabled}
			></div>
		</div>
	);
}

export function handles(this: RangeSlider) {
	return (<>
		<div class="ui5-slider-handle-container" style={this.styles.startHandle} part="handle-container">
			<div class="ui5-slider-handle ui5-slider-handle--start"
				part="handle"
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				role="slider"
				tabindex={this._tabIndex}
				aria-orientation="horizontal"
				aria-valuemin={this.min}
				aria-valuemax={this.max}
				aria-valuenow={this.startValue}
				aria-labelledby={this._ariaLabelledByStartHandleText}
				aria-disabled={this._ariaDisabled}
				aria-describedby={this._ariaDescribedByHandleText}
				aria-keyshortcuts={this._ariaKeyshortcuts}
			>
				<Icon name={directionArrows}
					mode="Decorative"
					slider-icon
				></Icon>
			</div>

			<SliderTooltip
				open={this._tooltipsOpen}
				value={this.tooltipStartValue}
				valueState={this.tooltipStartValueState}
				min={this.min}
				max={this.max}
				data-sap-ui-start-value
				editable={this.editableTooltip}
				followRef={this._startHandle}
				onChange={this._onTooltipChange}
				onKeyDown={this._onTooltipKeydown}
				onFocusChange={this._onTooltipFocusChange}
				onOpen={this._onTooltipOpen}
				onInput={this._onTooltipInput}
			>
			</SliderTooltip>
		</div>
		<div class="ui5-slider-handle-container" style={this.styles.endHandle} part="handle-container">
			<div class="ui5-slider-handle ui5-slider-handle--end"
				part="handle"
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				role="slider"
				tabIndex={this._tabIndex}
				aria-orientation="horizontal"
				aria-valuemin={this.min}
				aria-valuemax={this.max}
				aria-valuenow={this.endValue}
				aria-labelledby={this._ariaLabelledByEndHandleText}
				aria-describedby={this._ariaDescribedByHandleText}
				aria-disabled={this._ariaDisabled}
				aria-keyshortcuts="F2"
			>
				<Icon name={directionArrows}
					mode="Decorative"
					slider-icon
				></Icon>
			</div>

			<SliderTooltip
				open={this._tooltipsOpen}
				value={this.tooltipEndValue}
				valueState={this.tooltipEndValueState}
				min={this.min}
				max={this.max}
				data-sap-ui-end-value
				editable={this.editableTooltip}
				followRef={this._endHandle}
				onChange={this._onTooltipChange}
				onKeyDown={this._onTooltipKeydown}
				onFocusChange={this._onTooltipFocusChange}
				onOpen={this._onTooltipOpen}
				onInput={this._onTooltipInput}
			>
			</SliderTooltip>
		</div>
	</>);
}
