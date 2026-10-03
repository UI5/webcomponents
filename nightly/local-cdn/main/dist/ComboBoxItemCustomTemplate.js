import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
export default function ComboBoxItemCustomTemplate() {
    return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" });
}
function listItemContent() {
    return _jsx("slot", {});
}
//# sourceMappingURL=ComboBoxItemCustomTemplate.js.map