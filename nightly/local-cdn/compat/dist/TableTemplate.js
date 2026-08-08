import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import CheckBox from "@ui5/webcomponents/dist/CheckBox.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
export default function TableTemplate() {
    return (_jsx("div", { class: "ui5-table-root", "onui5-selection-requested": this._handleSelect, "onui5-forward-after": this._onForwardAfter, "onui5-forward-before": this._onForwardBefore, onFocusIn: this._onfocusin, children: _jsxs(BusyIndicator, { id: `${this._id}-busyIndicator`, delay: this.busyDelay, active: this.busy, class: "ui5-table-busy-indicator", children: [_jsx("div", { id: `${this._id}-before`, tabindex: 0, class: "ui5-table-focusarea" }), _jsxs("table", { role: "table", cellSpacing: "0", cellPadding: "0", "aria-label": this.tableAriaLabelText, onKeyDown: this._onkeydown, children: [_jsx("thead", { children: _jsxs("tr", { id: this._columnHeader.id, class: "ui5-table-header-row", "aria-label": this.ariaLabelText, tabindex: this._columnHeader.forcedTabIndex ? parseInt(this._columnHeader.forcedTabIndex) : undefined, onClick: this._onColumnHeaderClick, onFocusIn: this._onColumnHeaderFocused, onKeyDown: this._onColumnHeaderKeydown, children: [this.isMultiSelect &&
                                        _jsx("th", { class: "ui5-table-select-all-column", role: "presentation", "aria-hidden": "true", children: this.rows.length > 0 &&
                                                _jsx(CheckBox, { class: "ui5-table-select-all-checkbox", tabindex: -1, checked: this._allRowsSelected, accessibleName: this.ariaLabelSelectAllText, onChange: this._selectAll }) }), this.visibleColumns.map(col => _jsx("slot", { name: col._individualSlot })), _jsx("th", { class: "ui5-table-header-row-navigated", "aria-hidden": "true" })] }) }), _jsxs("tbody", { children: [this.rows.map(row => _jsx("slot", { name: row._individualSlot, onKeyDown: this.onRowKeyDown })), !this.rows.length && !this.hideNoData &&
                                    _jsx("tr", { class: "ui5-table-no-data-row-root", children: _jsx("td", { colspan: this.visibleColumnsCount, role: "cell", style: "width: 100%", children: _jsx("div", { class: "ui5-table-no-data-row", children: _jsx("span", { children: this.noDataText }) }) }) }), this.growsWithButton && moreRow.call(this), this.growsOnScroll && endRow.call(this)] })] }), _jsx("div", { id: `${this._id}-after`, tabindex: 0, class: "ui5-table-focusarea" })] }) }));
}
function moreRow() {
    return (_jsx("tr", { children: _jsx("td", { colspan: this.visibleColumnsCount, children: _jsx("div", { class: "ui5-table-growing-row", children: _jsxs("div", { id: `${this._id}-growingButton`, class: {
                        "ui5-table-growing-row-inner": true,
                        "ui5-table-growing-row-inner--active": this._loadMoreActive
                    }, role: "button", tabindex: 0, "aria-labelledby": this.loadMoreAriaLabelledBy, onClick: this._onLoadMoreClick, onKeyUp: this._onLoadMoreKeyup, onKeyDown: this._onLoadMoreKeydown, children: [_jsx("span", { id: `${this._id}-growingButton-text`, class: "ui5-table-growing-row-text", children: this._growingButtonText }), this.growingButtonSubtext &&
                            _jsx("span", { id: `${this._id}-growingButton-subtext`, class: "ui5-table-growing-row-subtext", children: this.growingButtonSubtext })] }) }) }) }));
}
function endRow() {
    return (_jsx("tr", { tabindex: -1, "aria-hidden": "true", class: "ui5-table-end-row", children: _jsx("td", { tabindex: -1, children: _jsx("span", { tabindex: -1, "aria-hidden": "true", class: "ui5-table-end-marker" }) }) }));
}
//# sourceMappingURL=TableTemplate.js.map