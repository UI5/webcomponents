import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function TableCellTemplate() {
    return (_jsx(_Fragment, { children: this._popin ?
            _jsxs(_Fragment, { children: [_jsx("div", { id: "popin-header", ref: this._injectHeaderNodes.bind(this) }), _jsx("span", { id: "popin-colon", "aria-hidden": "true", children: this._i18nPopinColon }), _jsx("slot", { id: "popin-content" })] })
            :
                _jsx("slot", {}) }));
}
//# sourceMappingURL=TableCellTemplate.js.map