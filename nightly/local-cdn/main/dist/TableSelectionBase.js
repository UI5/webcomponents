var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { property, eventStrict } from "@ui5/webcomponents-base/dist/decorators.js";
import { isInstanceOfTable } from "./TableUtils.js";
import TableSelectionBehavior from "./types/TableSelectionBehavior.js";
import { TABLE_MULTI_SELECTABLE, TABLE_SINGLE_SELECTABLE, } from "./generated/i18n/i18n-defaults.js";
/**
 * Fired when the selection is changed by user interaction.
 *
 * @public
 */
let TableSelectionBase = 
/**
 * @class
 * The `TableSelectionBase` class serves as a foundation for table selections.
 * @constructor
 * @extends UI5Element
 * @since 2.8.0
 * @public
 */
class TableSelectionBase extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the selection behavior.
         *
         * @default "RowSelector"
         * @public
         * @since 2.11
         */
        this.behavior = "RowSelector";
        this.identifier = "TableSelection";
        this._rowsLength = 0;
    }
    onTableActivate(table) {
        this._table = table;
        this._invalidateTableAndRows();
    }
    onExitDOM() {
        this._invalidateTableAndRows();
        this._table = undefined;
    }
    onBeforeRendering() {
        if (!this._table && this.parentElement && isInstanceOfTable(this.parentElement)) {
            this._table = this.parentElement;
        }
        this._invalidateTableAndRows();
    }
    onTableBeforeRendering() {
        if (this._table && this._table.headerRow[0] && this._rowsLength !== this._table.rows.length) {
            this._rowsLength = this._table.rows.length;
            this._table.headerRow[0]._invalidate++;
        }
    }
    // this will be removed when the legacy selection component is removed
    isSelectable() {
        return true;
    }
    /**
     * Determines if the component allows multiple selection.
     */
    isMultiSelectable() {
        return false;
    }
    /**
     * Determines whether a row selector (for example, `radiobutton` or `checkbox`) is rendered.
     */
    isRowSelectorRequired() {
        return this.behavior === TableSelectionBehavior.RowSelector;
    }
    /**
     * Returns the ARIA description of the Table as an alternative to aria-multiselectable.
     */
    getAriaDescriptionForTable() {
        if (!this._table || !this._table.rows.length) {
            return undefined;
        }
        const i18nBundle = this._table.constructor.i18nBundle;
        return i18nBundle.getText(this.isMultiSelectable() ? TABLE_MULTI_SELECTABLE : TABLE_SINGLE_SELECTABLE);
    }
    /**
     * Returns the ARIA description of the selection component displayed in the column header.
     */
    getAriaDescriptionForColumnHeader() {
        return undefined;
    }
    /**
     * Returns the unique key associated with the table row.
     *
     * @param row The row instance
     */
    getRowKey(row) {
        return row.rowKey || "";
    }
    /**
     * Returns the table row instance for the given row key.
     *
     * @param rowKey The row key
     * @public
     */
    getRowByKey(rowKey) {
        if (this._table && rowKey) {
            return this._table.rows.find(row => this.getRowKey(row) === rowKey);
        }
    }
    /**
     * Invalidates the table and its rows to re-evaluate the selection.
     */
    _invalidateTableAndRows() {
        if (this._table) {
            this._table._invalidate++;
            this._table.rows.forEach(row => row._invalidate++);
            this._table.headerRow.forEach(row => row._invalidate++);
        }
    }
};
__decorate([
    property()
], TableSelectionBase.prototype, "selected", void 0);
__decorate([
    property()
], TableSelectionBase.prototype, "behavior", void 0);
TableSelectionBase = __decorate([
    eventStrict("change", {
        bubbles: false,
    })
    /**
     * @class
     * The `TableSelectionBase` class serves as a foundation for table selections.
     * @constructor
     * @extends UI5Element
     * @since 2.8.0
     * @public
     */
], TableSelectionBase);
export default TableSelectionBase;
//# sourceMappingURL=TableSelectionBase.js.map