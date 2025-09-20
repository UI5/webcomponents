import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import CheckBox from "./CheckBox.js";
import TableHeaderCell from "./TableHeaderCell.js";
import Icon from "./Icon.js";
import IconMode from "./types/IconMode.js";
import ClearAll from "@ui5/webcomponents-icons/dist/clear-all.js";
import IconDesign from "./types/IconDesign.js";
export default function TableHeaderRowTemplate(ariaColIndex = 1) {
    return (_jsxs(_Fragment, { children: [this._hasSelector &&
                _jsx(TableHeaderCell, { id: "selection-cell", "aria-selected": this._isSelected, "aria-label": this._i18nSelection, "aria-description": this._selectionCellAriaDescription, "aria-colindex": ariaColIndex++, "data-ui5-table-cell-fixed": true, "data-ui5-table-selection-component": true, children: !this._isMultiSelect ?
                        _jsx(_Fragment, {})
                        :
                            this._shouldRenderClearAll ?
                                _jsx(Icon, { name: ClearAll, mode: IconMode.Decorative, showTooltip: true, accessibleName: this._i18nDeselectAllRows, design: this._hasSelectedRows ? IconDesign.Default : IconDesign.NonInteractive, onClick: this._onSelectionChange })
                                :
                                    _jsx(CheckBox, { id: "selection-component", tabindex: -1, checked: this._isSelected, onChange: this._onSelectionChange, accessibleName: this._i18nRowSelector, title: this._isSelected ? this._i18nDeselectAllRows : this._i18nSelectAllRows }) }), this._visibleCells.map(cell => {
                cell.ariaColIndex = `${ariaColIndex++}`;
                return _jsx("slot", { name: cell._individualSlot }, cell._individualSlot);
            }), this._rowActionCount > 0 &&
                _jsx(TableHeaderCell, { id: "actions-cell", "aria-colindex": ariaColIndex++, "aria-label": this._i18nRowActions }), this._popinCells.length > 0 &&
                _jsx(TableHeaderCell, { id: "popin-cell", "aria-label": this._i18nRowPopin, "data-excluded-from-navigation": true })] }));
}
//# sourceMappingURL=TableHeaderRowTemplate.js.map