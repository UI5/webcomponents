import { Fragment as _Fragment, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import buttonTemplate from "./ButtonTemplate.js";
export default function ToggleButtonTemplate() {
    return (_jsx(_Fragment, { children: buttonTemplate.call(this, { ariaPressed: this.pressed }) }));
}
//# sourceMappingURL=ToggleButtonTemplate.js.map