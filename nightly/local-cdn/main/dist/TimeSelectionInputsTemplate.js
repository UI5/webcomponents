import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Input from "./Input.js";
import SegmentedButton from "./SegmentedButton.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";
export default function TimeSelectionInputsTemplate() {
    return (_jsxs("div", { class: "ui5-time-selection-inputs", onKeyDown: this._onkeydown, children: [this._entities.map(entity => (_jsxs(_Fragment, { children: [entity.hasSeparator && _jsx("span", { class: "ui5-time-selection-separator", children: ":" }), _jsx(Input, { id: `${this._id}_input_${entity.entity}`, class: "ui5-time-selection-numeric-input", type: this._numberType, maxlength: 2, autocomplete: "off", pattern: "[0-9]*", inputmode: "numeric", value: entity.stringValue, accessibleName: entity.label, _nativeInputAttributes: entity.attributes, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onInput: this._oninput })] }))), this._periods.length > 0 &&
                _jsxs(_Fragment, { children: [_jsx("span", { class: "ui5-time-selection-separator" }), _jsx(SegmentedButton, { id: `${this._id}_AmPm`, onClick: this._periodChange, children: this._periods.map(period => _jsx(SegmentedButtonItem, { selected: period.selected, children: period.label })) })] })] }));
}
//# sourceMappingURL=TimeSelectionInputsTemplate.js.map