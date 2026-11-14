import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
export default function OptionCustomTemplate() {
    return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option", title: this.tooltip });
}
function listItemContent() {
    return _jsx("slot", {});
}
//# sourceMappingURL=OptionCustomTemplate.js.map