import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import SortOrder from "@ui5/webcomponents-base/dist/types/SortOrder.js";
import SortAscending from "@ui5/webcomponents-icons/dist/sort-ascending.js";
import SortDescending from "@ui5/webcomponents-icons/dist/sort-descending.js";
export default function TableHeaderCellTemplate() {
    return (_jsxs(_Fragment, { children: [_jsx("slot", { name: "action" }), _jsx("slot", {}), sortIcon.call(this)] }));
}
function sortIcon() {
    switch (this.sortIndicator) {
        case SortOrder.Ascending:
            return _jsx(Icon, { name: SortAscending });
        case SortOrder.Descending:
            return _jsx(Icon, { name: SortDescending });
        default:
            return _jsx(_Fragment, {});
    }
}
//# sourceMappingURL=TableHeaderCellTemplate.js.map