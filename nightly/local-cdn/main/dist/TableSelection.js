var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { isUpShift, } from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import TableSelectionMode from "./types/TableSelectionMode.js";
import { isSelectionCell, isHeaderSelectionCell, findRowInPath } from "./TableUtils.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-selection` component is used inside the `ui5-table` to add key-based selection capabilities to the `ui5-table`.
 *
 * The component offers three selection modes:
 * * Single - select a single row.
 * * Multiple - select multiple rows.
 * * None - no selection active.
 *
 * As the selection is key-based, `ui5-table-row` components need to define a unique `row-key` property.
 *
 * ### Usage
 *
 * The `ui5-table-selection` component is only used inside the `ui5-table` component as a feature.
 * It has to be slotted inside the `ui5-table` in the `features` slot.
 * The component is not intended to be used as a standalone component.
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-selection mode="Multiple" slot="features"></ui5-table-selection>
 * </ui5-table>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableSelection.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 * @deprecated This component is deprecated and will be removed in future releases. Use the `ui5-table-selection-single` or `ui5-table-selection-multi` components instead.
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
let TableSelection = class TableSelection extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the selection mode.
         *
         * @default "Multiple"
         * @public
         */
        this.mode = "Multiple";
        /**
         * Defines the selected rows separated by a space.
         *
         * @default ""
         * @public
         */
        this.selected = "";
        this.identifier = "TableSelection";
        this._rowsLength = 0;
        this.onClickCaptureBound = this._onClickCapture.bind(this);
    }
    onTableActivate(table) {
        this._table = table;
        this._invalidateTableAndRows();
    }
    onExitDOM() {
        this.mode = TableSelectionMode.None;
        this._invalidateTableAndRows();
        this._table = undefined;
    }
    onBeforeRendering() {
        this._invalidateTableAndRows();
    }
    onTableBeforeRendering() {
        if (this.isMultiSelectable() && this._table && this._table.headerRow[0] && this._rowsLength !== this._table.rows.length) {
            this._rowsLength = this._table.rows.length;
            this._table.headerRow[0]._invalidate++;
        }
        this._table?.removeEventListener("click", this.onClickCaptureBound);
    }
    onTableAfterRendering() {
        this._table?.addEventListener("click", this.onClickCaptureBound, { capture: true });
    }
    isSelectable() {
        return this.mode !== TableSelectionMode.None;
    }
    isMultiSelectable() {
        return this.mode === TableSelectionMode.Multiple;
    }
    isRowSelectorRequired() {
        return this.mode !== TableSelectionMode.None;
    }
    getAriaDescriptionForTable() {
        return undefined;
    }
    getAriaDescriptionForColumnHeader() {
        return undefined;
    }
    getRowKey(row) {
        return row.rowKey || "";
    }
    isSelected(row) {
        if (!this._table || !this.isSelectable()) {
            return false;
        }
        if (row.isHeaderRow()) {
            return this.areAllRowsSelected();
        }
        const rowKey = this.getRowKey(row);
        return this.selectedAsArray.includes(rowKey);
    }
    hasSelectedRow() {
        if (!this._table || !this.isSelectable()) {
            return false;
        }
        const selectedArray = this.selectedAsArray;
        return this._table.rows.some(row => {
            const rowKey = this.getRowKey(row);
            return selectedArray.includes(rowKey);
        });
    }
    areAllRowsSelected() {
        if (!this._table || !this._table.rows.length || this.mode !== TableSelectionMode.Multiple) {
            return false;
        }
        const selectedArray = this.selectedAsArray;
        return this._table.rows.every(row => {
            const rowKey = this.getRowKey(row);
            return selectedArray.includes(rowKey);
        });
    }
    setSelected(row, selected, fireEvent = false) {
        if (this._rangeSelection?.isMouse && this._rangeSelection.shiftPressed) {
            return;
        }
        if (row.isHeaderRow()) {
            this._selectHeaderRow(selected);
        }
        else {
            this._selectRow(row, selected);
        }
        if (fireEvent) {
            this.fireDecoratorEvent("change");
        }
    }
    get selectedAsArray() {
        return this.selected.split(" ").filter(String);
    }
    set selectedAsArray(selectedArray) {
        this.selected = selectedArray.filter(String).join(" ");
    }
    get selectedAsSet() {
        return new Set(this.selectedAsArray);
    }
    set selectedAsSet(selectedSet) {
        this.selectedAsArray = [...selectedSet];
    }
    _selectRow(row, selected) {
        const rowKey = this.getRowKey(row);
        if (this.mode === TableSelectionMode.Multiple) {
            const selectedSet = this.selectedAsSet;
            selectedSet[selected ? "add" : "delete"](rowKey);
            this.selectedAsSet = selectedSet;
        }
        else {
            this.selected = selected ? rowKey : "";
        }
    }
    _selectHeaderRow(selected) {
        const selectedSet = this.selectedAsSet;
        this._table.rows.forEach(row => {
            const rowKey = this.getRowKey(row);
            selectedSet[selected ? "add" : "delete"](rowKey);
        });
        this.selectedAsSet = selectedSet;
    }
    _invalidateTableAndRows() {
        if (!this._table) {
            return;
        }
        if (!this.isSelectable()) {
            this.selected = "";
        }
        else if (!this.isMultiSelectable()) {
            this.selected = this.selectedAsArray.shift() || "";
        }
        this._table._invalidate++;
        this._table.headerRow[0]._invalidate++;
        this._table.rows.forEach(row => row._invalidate++);
    }
    _onkeydown(e) {
        if (!this.isMultiSelectable() || !this._table || !e.shiftKey) {
            return;
        }
        const focusedElement = getActiveElement(); // Assumption: The focused element is always the "next" row after navigation.
        if (!(focusedElement?.hasAttribute("ui5-table-row") || this._rangeSelection?.isMouse)) {
            this._stopRangeSelection();
            return;
        }
        if (!this._rangeSelection) {
            // If no range selection is active, start one
            const row = focusedElement;
            this._startRangeSelection(row, this.isSelected(row));
        }
        else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            const change = isUpShift(e) ? -1 : 1;
            this._handleRangeSelection(focusedElement, change);
        }
        if (this._rangeSelection) {
            this._rangeSelection.shiftPressed = e.shiftKey;
        }
    }
    _onkeyup(e, eventOrigin) {
        if (!this._table) {
            return;
        }
        if (!eventOrigin.hasAttribute("ui5-table-row") || !this._rangeSelection || !e.shiftKey) {
            // Stop range selection if a) Shift is relased or b) the event target is not a row
            this._stopRangeSelection();
        }
        if (this._rangeSelection) {
            this._rangeSelection.shiftPressed = e.shiftKey;
        }
    }
    _onClickCapture(e) {
        if (!this._table || this.mode !== TableSelectionMode.Multiple) {
            return;
        }
        if (isHeaderSelectionCell(e)) {
            this._stopRangeSelection();
            return;
        }
        if (!isSelectionCell(e)) {
            this._stopRangeSelection();
            return;
        }
        const row = findRowInPath(e.composedPath());
        if (e.shiftKey && this._rangeSelection?.isMouse) {
            const startRow = this._rangeSelection.rows[0];
            const startIndex = this._table.rows.indexOf(startRow);
            const endIndex = this._table.rows.indexOf(row);
            const selectionState = this.isSelected(startRow);
            // When doing a range selection and clicking on an already selected row, the checked status should not change
            // Therefore, we need to manually set the checked attribute again, as clicking it would deselect it and leads to
            // a visual inconsistency.
            row.shadowRoot?.querySelector("#selection-component")?.toggleAttribute("checked", selectionState);
            e.stopPropagation();
            if (startIndex === -1 || endIndex === -1 || row.rowKey === startRow.rowKey || row.rowKey === this._rangeSelection.rows[this._rangeSelection.rows.length - 1].rowKey) {
                return;
            }
            const change = endIndex - startIndex;
            this._handleRangeSelection(row, change);
        }
        else if (row) {
            this._startRangeSelection(row, !this.isSelected(row), true);
        }
    }
    /**
     * Start the range selection and initialises the range selection state
     * @param row starting row
     * @private
     */
    _startRangeSelection(row, selected, isMouse = false) {
        this._rangeSelection = {
            selected,
            isUp: null,
            rows: [row],
            isMouse,
            shiftPressed: false,
        };
    }
    /**
     * Handles the range selection
     * @param targetRow row that is currently focused
     * @param change indicates direction
     * @private
     */
    _handleRangeSelection(targetRow, change) {
        if (!this._rangeSelection) {
            return;
        }
        const isUp = change > 0;
        this._rangeSelection.isUp ??= isUp;
        const shouldReverseSelection = isUp !== this._rangeSelection.isUp && !this._rangeSelection.isMouse;
        let selectionChanged = shouldReverseSelection && this.isSelected(targetRow);
        if (shouldReverseSelection) {
            this._reverseRangeSelection();
        }
        else {
            const rowIndex = this._table.rows.indexOf(targetRow);
            const [startIndex, endIndex] = [rowIndex, rowIndex - change].sort((a, b) => a - b);
            selectionChanged = this._table?.rows.slice(startIndex, endIndex + 1).reduce((changed, row) => {
                const isRowNotInSelection = !this._rangeSelection?.rows.includes(row);
                const isRowSelectionDifferent = this.isSelected(row) !== this._rangeSelection.selected;
                if (isRowNotInSelection) {
                    this._rangeSelection?.rows.push(row);
                }
                this._selectRow(row, this._rangeSelection.selected);
                return changed || isRowSelectionDifferent;
            }, selectionChanged) || false;
        }
        selectionChanged && this.fireDecoratorEvent("change");
    }
    _stopRangeSelection() {
        this._rangeSelection = null;
    }
    _reverseRangeSelection() {
        const row = this._rangeSelection?.rows.pop();
        if (row) {
            this._selectRow(row, false);
        }
        if (this._rangeSelection?.rows.length === 1) {
            this._rangeSelection.isUp = null;
        }
    }
};
__decorate([
    property()
], TableSelection.prototype, "mode", void 0);
__decorate([
    property()
], TableSelection.prototype, "selected", void 0);
TableSelection = __decorate([
    customElement({ tag: "ui5-table-selection" })
    /**
     * Fired when the selection is changed by user interaction.
     *
     * @public
     */
    ,
    event("change", {
        bubbles: true,
    })
], TableSelection);
TableSelection.define();
export default TableSelection;
//# sourceMappingURL=TableSelection.js.map