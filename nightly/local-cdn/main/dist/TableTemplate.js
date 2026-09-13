import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import TableRow from "./TableRow.js";
import TableCell from "./TableCell.js";
import DropIndicator from "./DropIndicator.js";
import BusyIndicator from "./BusyIndicator.js";
export default function TableTemplate() {
    return (_jsxs(_Fragment, { children: [_jsx("div", { id: "before", role: "none", tabindex: 0, "ui5-table-dummy-focus-area": true }), _jsxs("div", { id: "table", role: "grid", style: this.styles.table, "aria-label": this._ariaLabel, "aria-description": this._ariaDescription, "aria-rowcount": this._ariaRowCount, "aria-colcount": this._ariaColCount, "aria-multiselectable": this._ariaMultiSelectable, children: [_jsx("slot", { name: "headerRow" }), _jsx("div", { id: "rows", children: _jsx("div", { id: "spacer", style: this.styles.spacer, children: _jsx("slot", {}) }) }), this.rows.length === 0 &&
                        _jsx(TableRow, { id: "no-data-row", children: _jsx(TableCell, { id: "no-data-cell", "data-excluded-from-navigation": true, "horizontal-align": "Center", children: this.noData.length > 0 ?
                                    _jsx("slot", { name: "noData" })
                                    :
                                        this._effectiveNoDataText }) }), _jsx(DropIndicator, { orientation: "Horizontal", ownerReference: this }), _jsx("div", { "aria-hidden": "true", id: "table-end-row" }), this.loading &&
                        _jsx(BusyIndicator, { id: "loading", delay: this.loadingDelay, active: true, "data-sap-focus-ref": true })] }), _jsx("div", { id: "after", role: "none", tabindex: 0, "ui5-table-dummy-focus-area": true }), this.rows.length > 0 && this._getGrowing()?.hasGrowingComponent() &&
                _jsx("slot", { name: this._getGrowing()?._individualSlot })] }));
}
//# sourceMappingURL=TableTemplate.js.map