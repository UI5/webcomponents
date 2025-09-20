import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function FormItemTemplate() {
    return (_jsx("div", { class: "ui5-form-item-root", children: _jsxs("div", { class: "ui5-form-item-layout", part: "layout", children: [_jsx("div", { class: "ui5-form-item-label", part: "label", children: _jsx("slot", { name: "labelContent" }) }), _jsx("div", { class: "ui5-form-item-content", part: "content", children: this.content.map(item => _jsx("div", { class: "ui5-form-item-content-child", children: _jsx("slot", { name: item._individualSlot }) })) })] }) }));
}
//# sourceMappingURL=FormItemTemplate.js.map