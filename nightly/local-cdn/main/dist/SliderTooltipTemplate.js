import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Input from "./Input.js";
export default function SliderTooltipTemplate() {
    return (_jsxs("div", { class: "ui5-slider-tooltip-root", children: [this.editable ?
                _jsx(Input, { value: this.value, type: "Number", accessibleNameRef: "ui5-slider-InputLabel", onFocusIn: this._onInputFocusin, onFocusOut: this._onInputFocusOut, onKeyDown: this._onInputKeydown, onInput: this._onInputInput, tabIndex: -1, "data-sap-focus-ref": true, valueState: this.valueState }) :
                _jsx("span", { class: "ui5-slider-tooltip-value", children: this.value }), this.editable && _jsx(_Fragment, { children: _jsx("span", { id: "ui5-slider-InputLabel", class: "ui5-hidden-text", children: this._ariaLabelledByInputText }) })] }));
}
//# sourceMappingURL=SliderTooltipTemplate.js.map