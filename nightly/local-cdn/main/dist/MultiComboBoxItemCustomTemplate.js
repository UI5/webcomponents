import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import CheckBox from "./CheckBox.js";
import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
export default function MultiComboBoxItemCustomTemplate() {
    return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" });
}
function listItemContent() {
    return (_jsxs(_Fragment, { children: [_jsx(CheckBox, { disabled: this._readonly, checked: this.selected, _accInfo: this.checkBoxAccInfo }), _jsx("div", { part: "content", id: "content", class: "ui5-li-content", children: _jsx("slot", {}) })] }));
}
//# sourceMappingURL=MultiComboBoxItemCustomTemplate.js.map