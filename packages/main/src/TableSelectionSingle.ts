import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import TableSelectionBase from "./TableSelectionBase.js";
import CheckBox from "./CheckBox.js";
import type TableRow from "./TableRow.js";

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
@customElement({ tag: "ui5-table-selection-single" })

class TableSelectionSingle extends TableSelectionBase {
	CheckBox = CheckBox;
	/**
	 * Defines the `row-key` value of the selected row.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	selected?: string;

	isSelected(row: TableRow): boolean {
		const rowKey = this.getRowKey(row);
		return rowKey ? this.selected === rowKey : false;
	}

	setSelected(row: TableRow, selected: boolean, fireEvent: boolean = false) {
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
	getSelectedRow(): TableRow | undefined {
		return this._table?.rows.find(row => this.isSelected(row));
	}
}

TableSelectionSingle.define();

export default TableSelectionSingle;
