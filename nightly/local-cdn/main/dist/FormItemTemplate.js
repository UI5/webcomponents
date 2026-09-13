import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function FormItemTemplate() {
    return (_jsx("div", { class: "ui5-form-item-root", children: _jsx("div", { class: "ui5-form-item-layout", part: "layout", children: this.accessibleMode === "Edit" ? content.call(this) : contentAsDefinitionList.call(this) }) }));
}
function content() {
    return _jsxs(_Fragment, { children: [_jsx("div", { class: "ui5-form-item-label", part: "label", children: _jsx("slot", { name: "labelContent" }) }), _jsx("div", { class: "ui5-form-item-content", part: "content", children: this.content.map(item => _jsx("div", { class: "ui5-form-item-content-child", children: _jsx("slot", { name: item._individualSlot }) })) })] });
}
function contentAsDefinitionList() {
    return _jsxs(_Fragment, { children: [_jsx("dt", { class: "ui5-form-item-label", part: "label", children: _jsx("slot", { name: "labelContent" }) }), _jsx("dd", { class: "ui5-form-item-content", part: "content", children: this.content.map(item => _jsx("div", { class: "ui5-form-item-content-child", children: _jsx("slot", { name: item._individualSlot }) })) })] });
}
//# sourceMappingURL=FormItemTemplate.js.map