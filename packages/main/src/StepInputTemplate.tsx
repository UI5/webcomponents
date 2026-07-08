import type StepInput from "./StepInput.js";
import NumberInput from "./NumberInput.js";

export default function StepInputTemplate(this: StepInput) {
	return (
		<NumberInput
			_showStepButtons={true}
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
			onChange={this._onNiChange}
			onInput={this._onNiInput}
			onValueStateChange={this._onNiValueStateChange}
			onui5-_request-submit={this._onRequestSubmit}
		>
			{this.valueStateMessage.length > 0 &&
				<slot name="valueStateMessage" slot="valueStateMessage"></slot>
			}
		</NumberInput>
	);
}
