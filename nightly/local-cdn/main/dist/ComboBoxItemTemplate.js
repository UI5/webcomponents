import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
export default function ComboBoxItemTemplate() {
    return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" });
}
function listItemContent() {
    return (_jsx("div", { part: "content", id: "content", class: "ui5-li-content", children: _jsxs("div", { class: "ui5-li-text-wrapper", children: [this.text && _jsx("span", { part: "title", className: "ui5-li-title", children: this.text }), this.additionalText && _jsx("span", { part: "additional-text", class: "ui5-li-additional-text", children: this.additionalText })] }) }));
}
//# sourceMappingURL=ComboBoxItemTemplate.js.map