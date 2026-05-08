import { customElement } from "@ui5/webcomponents-base/dist/decorators.js";
import TableRowBase from "./TableRowBase.js";
import TableGroupRowTemplate from "./TableGroupRowTemplate.js";
import TableGroupRowCss from "./generated/themes/TableGroupRow.css.js";
import type TableCellBase from "./TableCellBase.js";
import {
	TABLE_GROUP_ROW,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-group-row` component represents a group header row in the `ui5-table`.
 * It is used to visually group rows and spans across all table columns.
 *
 * ### Usage
 *
 * The `ui5-table-group-row` is placed as a direct child of `ui5-table`, alongside `ui5-table-row` elements.
 * Rows following a group row are considered part of that group until the next group row.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableGroupRow.js";`
 *
 * @constructor
 * @extends TableRowBase
 * @since 2.9.0
 * @public
 */
@customElement({
	tag: "ui5-table-group-row",
	styles: [TableRowBase.styles, TableGroupRowCss],
	template: TableGroupRowTemplate,
})
class TableGroupRow extends TableRowBase<TableCellBase> {
	cells: Array<TableCellBase> = [];

	onEnterDOM() {
		super.onEnterDOM();
		this.toggleAttribute("ui5-table-group-row", true);
	}

	onBeforeRendering() {
		super.onBeforeRendering();
		this.setAttribute("aria-roledescription", TableGroupRow.i18nBundle.getText(TABLE_GROUP_ROW));
	}

	isGroupRow(): boolean {
		return true;
	}

	get _isSelectable() {
		return false;
	}

	get _hasPopin() {
		return false;
	}

	get _ariaColSpan() {
		const colSpan = this._table?.headerRow[0]?._visibleCells.length ?? 1;
		return (this._renderDummyCell) ? colSpan - 1 : colSpan;
	}
}

TableGroupRow.define();

export default TableGroupRow;
