import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function TableHeaderCellTemplate() {
    const SortIconComponent = this._sortIconComponent;
    return (_jsxs(_Fragment, { children: [_jsx("slot", { name: "action" }), _jsx("slot", {}), SortIconComponent &&
                _jsx(SortIconComponent, { name: this._sortIcon })] }));
}
//# sourceMappingURL=TableHeaderCellTemplate.js.map