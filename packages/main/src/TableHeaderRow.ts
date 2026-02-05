import { customElement, slotStrict as slot, property } from "@ui5/webcomponents-base/dist/decorators.js";
import TableRowBase from "./TableRowBase.js";
import TableHeaderRowTemplate from "./TableHeaderRowTemplate.js";
import TableHeaderRowStyles from "./generated/themes/TableHeaderRow.css.js";
import type TableHeaderCell from "./TableHeaderCell.js";
import type TableSelectionMulti from "./TableSelectionMulti.js";
import {
	TABLE_SELECTION,
	TABLE_ROW_POPIN,
	TABLE_ROW_ACTIONS,
	TABLE_COLUMN_HEADER_ROW,
	TABLE_SELECT_ALL_ROWS,
	TABLE_DESELECT_ALL_ROWS,
} from "./generated/i18n/i18n-defaults.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-row` component represents the table headers of a `ui5-table`.
 *
 * It is tightly coupled to the `ui5-table` and should therefore be used in the `ui5-table` only.
 * The header row is placed in the `headerRow` slot of the table.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderRow.js";`
 *
 * @constructor
 * @extends TableRowBase
 * @since 2.0.0
 * @public
 */
@customElement({
	tag: "ui5-table-header-row",
	languageAware: true,
	styles: [TableRowBase.styles, TableHeaderRowStyles],
	template: TableHeaderRowTemplate,
})

/**
 * Example custom event.
 * Please keep in mind that all public events should be documented in the API Reference as shown below.
 *
 * @public
 */
class TableHeaderRow extends TableRowBase<TableHeaderCell> {
	/**
	 * Defines the cells of the component.
	 *
	 * **Note:** Use `ui5-table-header-cell` for the intended design.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		invalidateOnChildChange: {
			properties: ["width", "_popin", "horizontalAlign", "popinHidden"],
			slots: false,
		},
		individualSlots: true,
	})
	cells!: DefaultSlot<TableHeaderCell>;

	/**
	 * Sticks the `ui5-table-header-row` to the top of a table.
	 *
	 * Note: If used in combination with overflowMode "Scroll", the table needs a defined height for the sticky header to work as expected.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	sticky = false;

	onEnterDOM(): void {
		super.onEnterDOM();
		this.ariaRowIndex = "1";
		this.ariaRoleDescription = TableRowBase.i18nBundle.getText(TABLE_COLUMN_HEADER_ROW);
	}

	onBeforeRendering() {
		super.onBeforeRendering();
		if (this._table) {
			this.style.top = this._table.stickyTop;
		}
	}

	isHeaderRow(): boolean {
		return true;
	}

	get _isSelectable() {
		return this._isMultiSelect;
	}

	get _hasSelectedRows() {
		return (this._tableSelection as TableSelectionMulti).getSelectedRows().length > 0;
	}

	get _shouldRenderClearAll() {
		return (this._tableSelection as TableSelectionMulti).headerSelector === "ClearAll";
	}

	get _selectionCellAriaDescription() {
		return this._tableSelection?.getAriaDescriptionForColumnHeader();
	}

	get _i18nSelection() {
		return TableRowBase.i18nBundle.getText(TABLE_SELECTION);
	}

	get _i18nRowPopin() {
		return TableRowBase.i18nBundle.getText(TABLE_ROW_POPIN);
	}

	get _i18nRowActions() {
		return TableRowBase.i18nBundle.getText(TABLE_ROW_ACTIONS);
	}

	get _i18nSelectAllRows() {
		return TableRowBase.i18nBundle.getText(TABLE_SELECT_ALL_ROWS);
	}

	get _i18nDeselectAllRows() {
		return TableRowBase.i18nBundle.getText(TABLE_DESELECT_ALL_ROWS);
	}
}

TableHeaderRow.define();

export default TableHeaderRow;
