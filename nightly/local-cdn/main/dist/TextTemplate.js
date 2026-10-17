import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function TextTemplate() {
    return _jsx(_Fragment, { children: _jsx("span", { children: this._renderEmptyIndicator ?
                _jsxs(_Fragment, { children: [_jsx("span", { className: "empty-indicator", "aria-hidden": "true", children: this._emptyIndicatorSymbol }), _jsx("span", { className: "empty-indicator-aria-label", children: this._emptyIndicatorAriaLabel })] })
                :
                    _jsx("slot", {}) }) });
}
//# sourceMappingURL=TextTemplate.js.map