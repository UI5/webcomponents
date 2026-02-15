import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function TableGrowingTemplate() {
    return (_jsxs("div", { id: "button", tabindex: -1, "data-ui5-growing-active": this._activeState, onClick: this.loadMore, onKeyDown: this._onKeydown, onKeyUp: this._onKeyup, onFocusOut: this._onFocusout, role: "button", "aria-labelledby": "text subtext", "aria-describedby": "description", children: [_jsx("span", { id: "text", children: this._buttonText }), this.subtext &&
                _jsx("span", { id: "subtext", children: this.subtext }), _jsx("span", { id: "description", class: "ui5-hidden-text", "aria-hidden": "true", children: this._buttonDescription })] }));
}
//# sourceMappingURL=TableGrowingTemplate.js.map