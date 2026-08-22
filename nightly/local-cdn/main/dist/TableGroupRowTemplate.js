import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import TableCell from "./TableCell.js";
export default function TableGroupRowTemplate() {
    return (_jsxs(_Fragment, { children: [_jsx(TableCell, { id: "group-cell", "aria-colindex": 1, "aria-colspan": this._ariaColSpan, "data-excluded-from-navigation": true, children: _jsx("slot", {}) }), this._renderDummyCell &&
                _jsx(TableCell, { id: "dummy-cell", role: "none", "aria-hidden": true, "data-excluded-from-navigation": "nofocus" })] }));
}
//# sourceMappingURL=TableGroupRowTemplate.js.map