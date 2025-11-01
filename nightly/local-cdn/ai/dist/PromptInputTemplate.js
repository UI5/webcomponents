import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Label from "@ui5/webcomponents/dist/Label.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import paperPlane from "@ui5/webcomponents-icons/dist/paper-plane.js";
export default function PromptInputTemplate() {
    return (_jsxs("div", { class: "ai-prompt-input-wrapper", children: [this.label &&
                _jsx(Label, { for: "input", children: this.label }), _jsxs("div", { class: "ai-prompt-input-form-wrapper", children: [_jsxs("div", { class: "ai-prompt-inner-input-wrapper", children: [_jsxs(Input, { id: "input", value: this.value, placeholder: this.placeholder, valueState: this.valueState, showClearIcon: this.showClearIcon, disabled: this.disabled, readonly: this.readonly, showSuggestions: this.showSuggestions, onKeyDown: this._onkeydown, onInput: this._onInnerInput, onChange: this._onInnerChange, onTypeAhead: this._onTypeAhead, children: [_jsx("slot", {}), this.valueStateMessage.length > 0 &&
                                        _jsx("slot", { name: "valueStateMessage", slot: "valueStateMessage" })] }), this.showExceededText &&
                                _jsx(Label, { class: "ai-prompt-input-counter", children: this._exceededText })] }), _jsx(Button, { icon: paperPlane, disabled: this._submitButtonDisabled, class: "ai-prompt-input-button", design: "Emphasized", onClick: this._onButtonClick })] })] }));
}
//# sourceMappingURL=PromptInputTemplate.js.map