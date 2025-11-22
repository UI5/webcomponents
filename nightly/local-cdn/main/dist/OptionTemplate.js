import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
export default function OptionTemplate() {
    return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option", title: this.tooltip });
}
function listItemContent() {
    return (_jsxs("div", { part: "content", id: `${this._id}-content`, class: "ui5-li-content", children: [this.displayIconBegin &&
                _jsx(Icon, { part: "icon", name: this.icon, class: "ui5-li-icon", mode: "Decorative" }), _jsxs("div", { class: "ui5-li-text-wrapper", children: [_jsx("span", { part: "title", class: "ui5-li-title", children: _jsx("slot", {}) }), this.additionalText &&
                        _jsx("span", { part: "additional-text", class: "ui5-li-additional-text", children: this.additionalText })] })] }));
}
//# sourceMappingURL=OptionTemplate.js.map