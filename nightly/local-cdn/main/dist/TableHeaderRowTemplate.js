import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import CheckBox from "./CheckBox.js";
import TableHeaderCell from "./TableHeaderCell.js";
import Icon from "./Icon.js";
import IconMode from "./types/IconMode.js";
import ClearAll from "@ui5/webcomponents-icons/dist/clear-all.js";
import IconDesign from "./types/IconDesign.js";
export default function TableHeaderRowTemplate(ariaColIndex = 1) {
    return (_jsxs(_Fragment, { children: [this._hasSelector &&
                _jsx(TableHeaderCell, { id: "selection-cell", "aria-selected": this._isSelected, "aria-label": this._i18nSelection, "aria-description": this._selectionCellAriaDescription, "aria-colindex": ariaColIndex++, "data-ui5-table-selection-cell": true, "data-ui5-table-cell-fixed": true, "data-ui5-acc-text": "", children: !this._isMultiSelect ?
                        _jsx(_Fragment, {})
                        :
                            this._shouldRenderClearAll ?
                                _jsx(Icon, { name: ClearAll, mode: IconMode.Decorative, showTooltip: true, accessibleName: this._i18nDeselectAllRows, design: this._hasSelectedRows ? IconDesign.Default : IconDesign.NonInteractive, onClick: this._onSelectionChange })
                                :
                                    _jsx(CheckBox, { id: "selection-component", tabindex: -1, checked: this._isSelected, onChange: this._onSelectionChange, accessibleName: this._i18nRowSelector, title: this._isSelected ? this._i18nDeselectAllRows : this._i18nSelectAllRows }) }), this.cells.flatMap(cell => {
                if (cell._popin) {
                    cell.role = null;
                    cell.ariaColIndex = null;
                    return [];
                }
                cell.role ??= cell.ariaRole;
                cell.ariaColIndex = (cell.role === cell.ariaRole) ? `${ariaColIndex++}` : null;
                return [_jsx("slot", { name: cell._individualSlot })];
            }), this._rowActionCount > 0 &&
                _jsx(TableHeaderCell, { id: "actions-cell", "aria-colindex": ariaColIndex++, children: _jsx("div", { id: "actions-cell-content", children: this._i18nRowActions }) }), this._popinCells.length > 0 &&
                _jsx(TableHeaderCell, { id: "popin-cell", "aria-colindex": ariaColIndex++, "data-excluded-from-navigation": true, children: _jsx("div", { id: "popin-cell-content", children: this._i18nRowPopin }) })] }));
}
//# sourceMappingURL=TableHeaderRowTemplate.js.map