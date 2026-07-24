import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemCustom from "./ListItemCustom.js";
export default function TabSeparatorInOverflowTemplate() {
    return (_jsx(ListItemCustom, { id: this._id, 
        // role="separator"
        class: "ui5-tc__separator", disabled: true, style: this._forcedStyleInOverflow, ref: this.captureRef.bind(this) }));
}
//# sourceMappingURL=TabSeparatorInOverflowTemplate.js.map