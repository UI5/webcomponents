import { Fragment as _Fragment, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import buttonTemplate from "./ButtonTemplate.js";
export default function ToggleSpinButtonTemplate() {
    return (_jsx(_Fragment, { children: buttonTemplate.call(this, {
            ariaValueMax: this.valueMax,
            ariaValueMin: this.valueMin,
            ariaValueNow: this.valueNow,
            ariaValueText: this.valueText,
        }) }));
}
//# sourceMappingURL=ToggleSpinButtonTemplate.js.map