import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import TableCell from "./TableCell.js";
import CheckBox from "./CheckBox.js";
import RadioButton from "./RadioButton.js";
import Button from "./Button.js";
import ButtonDesign from "./types/ButtonDesign.js";
export default function TableRowTemplate() {
    return (_jsxs(_Fragment, { children: [this._hasSelector &&
                _jsx(TableCell, { id: "selection-cell", "aria-selected": this._isSelected, "data-ui5-table-cell-fixed": true, "data-ui5-table-selection-component": true, children: this._isMultiSelect ?
                        _jsx(CheckBox, { id: "selection-component", tabindex: -1, checked: this._isSelected, onChange: this._onSelectionChange, accessibleName: this._i18nRowSelector })
                        :
                            _jsx(RadioButton, { id: "selection-component", tabindex: -1, name: this._tableId, checked: this._isSelected, onChange: this._onSelectionChange, accessibleName: this._i18nRowSelector }) }), this._visibleCells.map(cell => (_jsx("slot", { name: cell._individualSlot }))), this._rowActionCount > 0 &&
                _jsxs(TableCell, { id: "actions-cell", children: [this._flexibleActions.map(action => (_jsx("slot", { name: action._individualSlot }))), this._hasOverflowActions &&
                            _jsx(Button, { id: "overflow", icon: "overflow", design: ButtonDesign.Transparent, onClick: this._onOverflowButtonClick }), this._fixedActions.map(action => (_jsx("slot", { name: action._individualSlot })))] }), this._renderNavigated &&
                _jsx(TableCell, { id: "navigated-cell", "data-excluded-from-navigation": true, "aria-hidden": true, children: _jsx("div", { id: "navigated" }) }), this._popinCells.length > 0 &&
                _jsx(TableCell, { id: "popin-cell", children: this._popinCells.map(cell => (_jsx("slot", { name: cell._individualSlot }))) })] }));
}
//# sourceMappingURL=TableRowTemplate.js.map