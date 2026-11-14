import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemStandardTemplate from "./ListItemStandardTemplate.js";
const predefinedHooks = {
    listItemContent,
};
export default function SuggestionListItemTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks };
    return ListItemStandardTemplate.call(this, currentHooks);
}
function listItemContent() {
    return _jsxs(_Fragment, { children: [_jsxs("div", { class: "ui5-li-text-wrapper", children: [this.hasTitle && (_jsx("span", { part: "title", class: "ui5-li-title", children: _jsx("slot", {}) })), this.hasDescription && (_jsxs("div", { class: "ui5-li-description-info-wrapper", children: [_jsx("span", { part: "description", class: "ui5-li-desc", children: this.richDescription.length ? (_jsx("slot", { name: "richDescription" })) : (this.description) }), this.additionalText && (_jsx("span", { part: "additional-text", class: "ui5-li-additional-text", children: this.additionalText }))] })), !this.typeActive && _jsx("span", { class: "ui5-hidden-text", children: this.type })] }), !this.description && this.additionalText && (_jsx("span", { part: "additional-text", class: "ui5-li-additional-text", children: this.additionalText }))] });
}
//# sourceMappingURL=SuggestionListItemTemplate.js.map