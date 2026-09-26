import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function NavigationLayoutTemplate() {
    return (_jsxs("div", { class: "ui5-nl-root", children: [_jsx("header", { class: "ui5-nl-header", children: _jsx("slot", { name: "header" }) }), _jsxs("section", { class: "ui5-nl-section", children: [_jsx("aside", { class: "ui5-nl-aside", children: _jsx("slot", { name: "sideContent" }) }), _jsx("div", { class: "ui5-nl-content", children: _jsx("slot", {}) })] })] }));
}
//# sourceMappingURL=NavigationLayoutTemplate.js.map