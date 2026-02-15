import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import TreeItemBaseTemplate from "./TreeItemBaseTemplate.js";
const predefinedHooks = {
    listItemContent,
};
export default function TreeItemTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks };
    return TreeItemBaseTemplate.call(this, currentHooks);
}
function listItemContent() {
    return _jsxs(_Fragment, { children: [_jsx("div", { class: "ui5-li-text-wrapper", children: !!this._showTitle &&
                    _jsxs("div", { part: "title", class: "ui5-li-title", children: [" ", this.text] }) }), this.additionalText &&
                _jsx("span", { part: "additional-text", class: "ui5-li-additional-text", children: this.additionalText })] });
}
//# sourceMappingURL=TreeItemTemplate.js.map