import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import TableHeaderCell from "./TableHeaderCell.js";
export default function TableHeaderRowTemplate(ariaColIndex = 1) {
    const SelectionComponent = this._selectionComponent;
    const ClearAllComponent = this._clearAllComponent;
    return (_jsxs(_Fragment, { children: [this._hasSelector &&
                _jsx(TableHeaderCell, { id: "selection-cell", "aria-selected": this._isSelected, "aria-label": this._i18nSelection, "aria-description": this._selectionCellAriaDescription, "aria-colindex": ariaColIndex++, "data-ui5-table-selection-cell": true, "data-ui5-acc-text": "", children: !this._isMultiSelect ?
                        _jsx(_Fragment, {})
                        :
                            this._shouldRenderClearAll ?
                                (ClearAllComponent &&
                                    _jsx(ClearAllComponent, { name: this._clearAllIcon, mode: "Decorative", showTooltip: true, accessibleName: this._i18nDeselectAllRows, design: this._hasSelectedRows ? "Default" : "NonInteractive", onClick: this._onSelectionChange }))
                                :
                                    SelectionComponent &&
                                        _jsx(SelectionComponent, { id: "selection-component", tabindex: -1, checked: this._isSelected, onChange: this._onSelectionChange, accessibleName: this._i18nRowSelector, title: this._isSelected ? this._i18nDeselectAllRows : this._i18nSelectAllRows }) }), this.cells.flatMap(cell => {
                if (cell._popin) {
                    cell.role = null;
                    cell.ariaColIndex = null;
                    return [];
                }
                cell.role ??= cell.ariaRole;
                cell.ariaColIndex = (cell.role === cell.ariaRole) ? `${ariaColIndex++}` : null;
                return [_jsx("slot", { name: cell._individualSlot })];
            }), this._renderDummyCell && this._hasPopin &&
                _jsx(TableHeaderCell, { id: "dummy-cell", role: "none", "aria-hidden": true, "data-excluded-from-navigation": "" }), this._rowActionCount > 0 &&
                _jsx(TableHeaderCell, { id: "actions-cell", "aria-colindex": ariaColIndex++, children: _jsx("div", { id: "actions-cell-content", children: this._i18nRowActions }) }), this._renderNavigated &&
                _jsx(TableHeaderCell, { id: "navigated-cell", "data-excluded-from-navigation": true, "aria-hidden": true, role: "none", children: _jsx("div", { id: "navigated" }) }), this._renderDummyCell && !this._hasPopin &&
                _jsx(TableHeaderCell, { id: "dummy-cell", role: "none", "aria-hidden": true, "data-excluded-from-navigation": "nofocus" }), this._hasPopin &&
                _jsx(TableHeaderCell, { id: "popin-cell", "aria-colindex": ariaColIndex++, "data-excluded-from-navigation": true, children: _jsx("div", { id: "popin-cell-content", children: this._i18nRowPopin }) })] }));
}
//# sourceMappingURL=TableHeaderRowTemplate.js.map