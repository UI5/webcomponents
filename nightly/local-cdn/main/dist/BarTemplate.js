import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function BarTemplate() {
    return (_jsxs("div", { class: "ui5-bar-root", "aria-label": this.accInfo.label, role: this.accInfo.role, part: "bar", children: [_jsx("div", { class: "ui5-bar-content-container ui5-bar-startcontent-container", part: "startContent", children: _jsx("slot", { name: "startContent" }) }), _jsx("div", { class: "ui5-bar-content-container ui5-bar-midcontent-container", part: "midContent", children: _jsx("slot", {}) }), _jsx("div", { class: "ui5-bar-content-container ui5-bar-endcontent-container", part: "endContent", children: _jsx("slot", { name: "endContent" }) })] }));
}
//# sourceMappingURL=BarTemplate.js.map