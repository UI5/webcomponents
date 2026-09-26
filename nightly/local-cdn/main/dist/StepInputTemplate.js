import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import NumberInput from "./NumberInput.js";
export default function StepInputTemplate() {
    return (_jsx(NumberInput, { _showStepButtons: true, _externalAriaLabel: this._associatedLabelText, value: this.value, min: this.min, max: this.max, step: this.step, valueState: this.valueState, required: this.required, disabled: this.disabled, readonly: this.readonly, placeholder: this.placeholder, valuePrecision: this.valuePrecision, accessibleName: this.accessibleName, accessibleNameRef: this.accessibleNameRef, onChange: this._onNumberInputChange, onInput: this._onNumberInputInput, onValueStateChange: this._onNumberInputValueStateChange, "onui5-_request-submit": this._onRequestSubmit, children: this.valueStateMessage.length > 0 &&
            _jsx("slot", { name: "valueStateMessage", slot: "valueStateMessage" }) }));
}
//# sourceMappingURL=StepInputTemplate.js.map