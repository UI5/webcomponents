import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import CheckBox from "@ui5/webcomponents/dist/CheckBox.js";
export default function TableRowTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("tr", { class: "ui5-table-row-root", tabindex: this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onClick: this._onrowclick, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onMouseUp: this._onmouseup, onTouchStart: this._ontouchstart, onTouchEnd: this._ontouchend, "aria-label": this.ariaLabelText, "aria-selected": this.selected, "aria-current": this._ariaCurrent, "data-sap-focus-ref": true, part: "row", children: [this.isMultiSelect &&
                        _jsx("td", { class: "ui5-table-multi-select-cell", "aria-hidden": "true", role: "presentation", children: _jsx(CheckBox, { class: "ui5-multi-select-checkbox", checked: this.selected, accessibleName: this.ariaLabelRowSelection, onChange: this._handleSelection, tabindex: -1 }) }), this.shouldPopin ?
                        this.visibleCells.map(cell => _jsx("slot", { name: cell._individualSlot }))
                        :
                            this.cells.map(cell => _jsx("slot", { name: cell._individualSlot })), _jsx("td", { class: "ui5-table-row-navigated", "aria-hidden": "true", children: _jsx("div", { class: "ui5-table-div-navigated" }) })] }), this.shouldPopin && this.popinCells.map(cellData => _jsxs("tr", { part: "popin-row", class: cellData.classes, onClick: this._onrowclick, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: [_jsx("td", { colspan: this.visibleCellsCount, role: "cell", children: cellData.popinDisplayInline ?
                            _jsxs("div", { class: "ui5-table-display-inline-container", children: [cellData.popinText &&
                                        _jsxs("span", { class: "ui5-table-row-popin-title", children: [cellData.popinText, ":"] }), _jsx("span", { class: "ui5-table-cell-display-inline", children: _jsx("slot", { name: cellData.cell?._individualSlot }) })] })
                            :
                                _jsxs(_Fragment, { children: [cellData.popinText &&
                                            _jsxs("span", { class: "ui5-table-row-popin-title", children: [cellData.popinText, ":"] }), _jsx("div", { children: _jsx("slot", { name: cellData.cell?._individualSlot }) })] }) }), _jsx("td", { class: "ui5-table-row-navigated", "aria-hidden": "true", children: _jsx("div", { class: "ui5-table-div-navigated" }) })] }))] }));
}
//# sourceMappingURL=TableRowTemplate.js.map