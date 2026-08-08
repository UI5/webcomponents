var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import TableSelectionBase from "./TableSelectionBase.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-selection-single` component is used inside the `ui5-table` to add single selection capabilities to the `ui5-table`.
 * Since selection is key-based, each `ui5-table-row` must define a unique `row-key` property.
 *
 * ### Usage
 *
 * The `ui5-table-selection-single` component is a feature designed exclusively for use within the `ui5-table` component.
 * It must be placed inside the `features` slot of `ui5-table`.
 * This component is not intended for standalone use.
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-selection-single slot="features" selected="Row1"></ui5-table-selection-single>
 * </ui5-table>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableSelectionSingle.js";`
 *
 * @constructor
 * @extends TableSelectionBase
 * @since 2.8.0
 * @public
 */
let TableSelectionSingle = class TableSelectionSingle extends TableSelectionBase {
    isSelected(row) {
        const rowKey = this.getRowKey(row);
        return rowKey ? this.selected === rowKey : false;
    }
    setSelected(row, selected, fireEvent = false) {
        const rowKey = this.getRowKey(row);
        if (rowKey) {
            this.selected = selected ? rowKey : undefined;
            fireEvent && this.fireDecoratorEvent("change");
        }
    }
    /**
     * Returns the selected row.
     *
     * @public
     */
    getSelectedRow() {
        return this._table?.rows.find(row => this.isSelected(row));
    }
};
__decorate([
    property()
], TableSelectionSingle.prototype, "selected", void 0);
TableSelectionSingle = __decorate([
    customElement({ tag: "ui5-table-selection-single" })
], TableSelectionSingle);
TableSelectionSingle.define();
export default TableSelectionSingle;
//# sourceMappingURL=TableSelectionSingle.js.map