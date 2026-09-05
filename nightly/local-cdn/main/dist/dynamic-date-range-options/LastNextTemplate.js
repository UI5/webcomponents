import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import DynamicDateRange from "../DynamicDateRange.js";
import StepInput from "../StepInput.js";
import Select from "../Select.js";
import Option from "../Option.js";
import Label from "../Label.js";
import { DYNAMIC_DATE_RANGE_VALUE_LABEL_TEXT, DYNAMIC_DATE_RANGE_UNIT_OF_TIME_LABEL_TEXT, } from "../generated/i18n/i18n-defaults.js";
export default function LastNextTemplate() {
    const currentOption = this._currentOption;
    const availableOptionInfos = currentOption.availableOptions;
    const filteredOptions = availableOptionInfos.filter(info => currentOption.options?.includes(info.operator) || currentOption.operator === info.operator);
    const isGrouped = filteredOptions.length > 1;
    const currentNumber = this.currentValue?.values ? typeof this.currentValue.values[0] === "number" ? this.currentValue.values[0] : 1 : 1;
    const currentOperator = this.currentValue?.operator || filteredOptions[0]?.operator || "";
    // Input handlers
    const handleNumberChange = (e) => {
        const newValue = Number(e.target.value);
        this.currentValue = {
            operator: currentOperator,
            values: [newValue],
        };
    };
    const handleUnitChange = (e) => {
        const newOperator = String(e.detail.selectedOption.value);
        this.currentValue = {
            operator: newOperator,
            values: [currentNumber],
        };
    };
    return (_jsx("div", { class: "ui5-last-next-container ui5-last-next-container-padded", children: _jsxs("div", { class: "ui5-ddr-input-container ui5-ddr-input-container-right-aligned", children: [_jsx(Label, { class: "ui5-ddr-label", children: DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_VALUE_LABEL_TEXT) }), _jsx(StepInput, { value: currentNumber, min: 1, max: isGrouped ? 9999 : 999, onChange: handleNumberChange }), isGrouped && (_jsxs(_Fragment, { children: [_jsx(Label, { class: "ui5-ddr-label", children: DynamicDateRange.i18nBundle.getText(DYNAMIC_DATE_RANGE_UNIT_OF_TIME_LABEL_TEXT) }), _jsx(Select, { value: currentOperator, onChange: handleUnitChange, children: filteredOptions.map(option => (_jsx(Option, { value: option.operator, children: option.unitText }, option.operator))) })] }))] }) }));
}
//# sourceMappingURL=LastNextTemplate.js.map