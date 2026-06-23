import { customElement } from "@ui5/webcomponents-base/dist/decorators.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import TableRow from "./TableRow.js";
import TableRowBase from "./TableRowBase.js";
import TableGroupRowTemplate from "./TableGroupRowTemplate.js";
import TableGroupRowCss from "./generated/themes/TableGroupRow.css.js";
import type TableCell from "./TableCell.js";
import type TableRowActionBase from "./TableRowActionBase.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	TABLE_GROUP_ROW,
} from "./generated/i18n/i18n-defaults.js";

const EMPTY_CELLS = [] as unknown as DefaultSlot<TableCell>;
const EMPTY_ACTIONS = [] as unknown as Slot<TableRowActionBase>;

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-group-row` component represents a group header row in the `ui5-table`.
 * It is used to visually group rows and spans across all visible table columns.
 *
 * ### Usage
 *
 * The `ui5-table-group-row` is placed as a direct child of `ui5-table`, alongside `ui5-table-row` elements.
 * Rows following a group row are considered part of that group until the next group row.
 *
 * ```html
 * <ui5-table>
 *   <ui5-table-header-row>...</ui5-table-header-row>
 *   <ui5-table-group-row>Country: Germany</ui5-table-group-row>
 *   <ui5-table-row>...</ui5-table-row>
 *   <ui5-table-row>...</ui5-table-row>
 *   <ui5-table-group-row>Country: France</ui5-table-group-row>
 *   <ui5-table-row>...</ui5-table-row>
 * </ui5-table>
 * ```
 *
 * ### Unsupported Features
 *
 * The following features of `ui5-table-row` are currently not supported by `ui5-table-group-row` and have no effect:
 *
 * - **Cells** (`cells` slot): Group rows render a single spanning cell with a text. Any slotted `ui5-table-cell` elements are ignored.
 * - **Actions** (`actions` slot): Row actions such as `ui5-table-row-action` or `ui5-table-row-action-navigation` are not rendered.
 * - **Navigation** (`navigated` property): The navigated indicator is not rendered on group rows.
 * - **Interactive** (`interactive` property): Group rows do not support click/activation behavior.
 * - **Selection** (`rowKey` property`): Group rows cannot be selected. They are excluded from select all and range selection operations.
 * - **Virtualizer** (`position` property`): Group rows are not supported by the `ui5-table-virtualizer`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableGroupRow.js";`
 *
 * @constructor
 * @extends TableRow
 * @since 2.23.0
 * @public
 */
@customElement({
	tag: "ui5-table-group-row",
	styles: [TableRowBase.styles, TableGroupRowCss],
	template: TableGroupRowTemplate,
})
class TableGroupRow extends TableRow {
	@query("#group-cell")
	_groupCell!: TableCell;

	constructor() {
		super();
		Object.defineProperty(this, "cells", {
			get: () => EMPTY_CELLS,
		});
		Object.defineProperty(this, "actions", {
			get: () => EMPTY_ACTIONS,
		});
	}

	isGroupRow(): boolean {
		return true;
	}

	onEnterDOM() {
		super.onEnterDOM();
		this.toggleAttribute("ui5-table-row", true);
		this.setAttribute("aria-roledescription", TableGroupRow.i18nBundle.getText(TABLE_GROUP_ROW));
	}

	get _tableSelection() {
		return undefined;
	}

	get _hasSelector() {
		return false;
	}

	get _isSelectable() {
		return false;
	}

	get _isInteractive() {
		return false;
	}

	get _isNavigable() {
		return false;
	}

	get _hasPopin() {
		return false;
	}

	get _ariaColSpan(): number {
		const colSpan = this._table?.headerRow[0]?._visibleCells.length ?? 1;
		return (this._renderDummyCell) ? colSpan - 1 : colSpan;
	}
}

TableGroupRow.define();

export default TableGroupRow;
