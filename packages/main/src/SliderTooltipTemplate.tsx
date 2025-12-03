import Input from "./Input.js";
import type SliderTooltip from "./SliderTooltip.js";

export default function SliderTooltipTemplate(this: SliderTooltip) {
	return (
		<div class="ui5-slider-tooltip-root">
			{this.editable ?
				<Input
					value={this.value}
					type="Number"
					accessibleNameRef="ui5-slider-InputLabel"
					onFocusIn={this._onInputFocusin}
					onFocusOut={this._onInputFocusOut}
					onKeyDown={this._onInputKeydown}
					onInput={this._onInputInput}
					tabIndex={-1}
					data-sap-focus-ref
					valueState={this.valueState}
				></Input> :
				<span class="ui5-slider-tooltip-value">{this.value}</span>
			}

			{this.editable && <>
				<span id="ui5-slider-InputLabel" class="ui5-hidden-text">{this._ariaLabelledByInputText}</span>
			</>}
		</div>
	);
}
