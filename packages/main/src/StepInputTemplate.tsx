import type StepInput from "./StepInput.js";
import NumericInput from "./NumericInput.js";

export default function StepInputTemplate(this: StepInput) {
	return (
		<NumericInput
			_showStepButtons={true}
			_externalAriaLabel={this._associatedLabelText}
			value={this.value}
			min={this.min}
			max={this.max}
			step={this.step}
			valueState={this.valueState}
			required={this.required}
			disabled={this.disabled}
			readonly={this.readonly}
			placeholder={this.placeholder}
			valuePrecision={this.valuePrecision}
			accessibleName={this.accessibleName}
			accessibleNameRef={this.accessibleNameRef}
			onChange={this._onNumberInputChange}
			onInput={this._onNumberInputInput}
			onValueStateChange={this._onNumberInputValueStateChange}
			onui5-_request-submit={this._onRequestSubmit}
		>
			{this.valueStateMessage.length > 0 &&
				<slot name="valueStateMessage" slot="valueStateMessage"></slot>
			}
		</NumericInput>
	);
}
