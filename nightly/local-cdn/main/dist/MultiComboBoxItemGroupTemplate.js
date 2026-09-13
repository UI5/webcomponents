import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import ListBoxItemGroupTemplate from "./ListBoxItemGroupTemplate.js";
export default function MultiComboBoxItemGroupTemplate() {
    return [ListBoxItemGroupTemplate.call(this, { items })];
}
function items() {
    return this.items.filter(item => item._isVisible).map(item => _jsx("slot", { name: item._individualSlot }));
}
//# sourceMappingURL=MultiComboBoxItemGroupTemplate.js.map