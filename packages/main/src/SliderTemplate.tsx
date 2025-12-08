import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import type Slider from "./Slider.js";
import Icon from "./Icon.js";
import SliderBaseTemplate from "./SliderBaseTemplate.js";
import SliderTooltip from "./SliderTooltip.js";

export default function SliderTemplate(this: Slider) {
	return SliderBaseTemplate.call(this, {
		progressBar,
		handles,
	});
}

export function progressBar(this: Slider) {
	return (
		<div
			class="ui5-slider-progress-container"
			aria-hidden="true"
			part="progress-container"
		>
			<div class="ui5-slider-progress"
				style={this.styles.progress}
				onFocusOut={this._onfocusout}
				onFocusIn={this._onfocusin}
				tabIndex={-1}
				part="progress-bar"
			></div>
		</div>
	);
}

export function handles(this: Slider) {
	return (
		<div class="ui5-slider-handle-container" style={this.styles.handle} part="handle-container">
			<div class="ui5-slider-handle"
				onFocusOut={this._onfocusout}
				onFocusIn={this._onfocusin}
				onKeyUp={this._onkeyup}
				role="slider"
				tabIndex={this._tabIndex}
				aria-orientation="horizontal"
				aria-valuemin={this.min}
				aria-valuemax={this.max}
				aria-valuenow={this.value}
				aria-label={this._ariaLabel}
				aria-disabled={this._ariaDisabled}
				aria-keyshortcuts={this._ariaKeyshortcuts}
				aria-describedby={this._ariaDescribedByHandleText}
				data-sap-focus-ref
				part="handle"
				id="handle1"
			>
				<Icon name={directionArrows}
					mode="Decorative"
					part="icon-slider"
					slider-icon
				></Icon>
			</div>

			<SliderTooltip
				open={this._tooltipsOpen}
				value={this.tooltipValue}
				min={this.min}
				max={this.max}
				editable={this.editableTooltip}
				followRef={this.shadowRoot?.querySelector("#handle1") as HTMLElement}
				valueState={this.tooltipValueState}
				onChange={this._onTooltipChange}
				onKeyDown={this._onTooltipKeydown}
				onFocusChange={this._onTooltipFocusChange}
				onOpen={this._onTooltipOpen}
				onInput={this._onTooltipInput}
			>
			</SliderTooltip>
		</div>
	);
}
