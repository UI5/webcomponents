var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TableRowBase_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { isInstanceOfTable, toggleAttribute } from "./TableUtils.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableRowBaseCss from "./generated/themes/TableRowBase.css.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import { TABLE_ROW_SELECTOR, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 * A class to serve as a foundation for the `TableRow` and `TableHeaderRow` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
let TableRowBase = TableRowBase_1 = class TableRowBase extends UI5Element {
    constructor() {
        super(...arguments);
        this._invalidate = 0;
        this._rowActionCount = 0;
        this._renderNavigated = false;
        this._alternate = false;
    }
    onEnterDOM() {
        !this.role && this.setAttribute("role", "row");
        this.toggleAttribute("ui5-table-row-base", true);
    }
    onBeforeRendering() {
        toggleAttribute(this, "aria-selected", this._isSelectable, `${this._isSelected}`);
    }
    getFocusDomRef() {
        return this;
    }
    isHeaderRow() {
        return false;
    }
    _onSelectionChange() {
        const tableSelection = this._tableSelection;
        const selected = tableSelection.isMultiSelectable() ? !this._isSelected : true;
        tableSelection.setSelected(this, selected, true);
    }
    _onkeydown(e, eventOrigin) {
        if ((eventOrigin === this && this._isSelectable && isSpace(e)) || (eventOrigin === this._selectionCell && (isSpace(e) || isEnter(e)))) {
            this._onSelectionChange();
            e.preventDefault();
        }
    }
    get _table() {
        const element = this.parentElement;
        return isInstanceOfTable(element) ? element : undefined;
    }
    get _tableId() {
        return this._table?._id;
    }
    get _tableSelection() {
        return this._table?._getSelection();
    }
    get _isSelected() {
        return this._tableSelection?.isSelected(this);
    }
    get _isSelectable() {
        return this._tableSelection?.isSelectable();
    }
    get _isMultiSelect() {
        return !!this._tableSelection?.isMultiSelectable();
    }
    get _hasSelector() {
        return this._table?._isRowSelectorRequired;
    }
    get _visibleCells() {
        return this.cells.filter(c => !c._popin);
    }
    get _popinCells() {
        return this.cells.filter(c => c._popin && !c._popinHidden);
    }
    get _stickyCells() {
        return [this._selectionCell, ...this.cells, this._navigatedCell].filter(cell => cell?.hasAttribute("fixed"));
    }
    get _i18nRowSelector() {
        return TableRowBase_1.i18nBundle.getText(TABLE_ROW_SELECTOR);
    }
};
__decorate([
    property({ type: Number, noAttribute: true })
], TableRowBase.prototype, "_invalidate", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], TableRowBase.prototype, "_rowActionCount", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TableRowBase.prototype, "_renderNavigated", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TableRowBase.prototype, "_alternate", void 0);
__decorate([
    query("#selection-cell")
], TableRowBase.prototype, "_selectionCell", void 0);
__decorate([
    query("#navigated-cell")
], TableRowBase.prototype, "_navigatedCell", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], TableRowBase, "i18nBundle", void 0);
TableRowBase = TableRowBase_1 = __decorate([
    customElement({
        renderer: jsxRenderer,
        styles: TableRowBaseCss,
    })
], TableRowBase);
export default TableRowBase;
//# sourceMappingURL=TableRowBase.js.map