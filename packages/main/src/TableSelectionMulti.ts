import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import TableSelectionBase from "./TableSelectionBase.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { isSelectionCell, isHeaderSelectionCell, findRowInPath } from "./TableUtils.js";
import { isUpShift } from "@ui5/webcomponents-base/dist/Keys.js";
import type Table from "./Table.js";
import type TableRow from "./TableRow.js";
import type TableRowBase from "./TableRowBase.js";
import type TableSelectionMultiHeaderSelector from "./types/TableSelectionMultiHeaderSelector.js";
import {
	TABLE_COLUMNHEADER_SELECTALL_DESCRIPTION,
	TABLE_COLUMNHEADER_SELECTALL_CHECKED,
	TABLE_COLUMNHEADER_SELECTALL_NOT_CHECKED,
	TABLE_COLUMNHEADER_CLEARALL_DESCRIPTION,
	TABLE_ACC_STATE_DISABLED,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-selection-multi` component is used inside the `ui5-table` to add multi-selection capabilities to the `ui5-table`.
 * Since selection is key-based, each `ui5-table-row` must define a unique `row-key` property.
 *
 * ### Usage
 *
 * The `ui5-table-selection-multi` component is a feature designed exclusively for use within the `ui5-table` component.
 * It must be placed inside the `features` slot of `ui5-table`.
 * This component is not intended for standalone use.
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-selection-multi slot="features" selected="Row1 Row3"></ui5-table-selection-multi>
 * </ui5-table>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableSelectionMulti.js";`
 *
 * @constructor
 * @extends TableSelectionBase
 * @since 2.8.0
 * @public
 */
@customElement({ tag: "ui5-table-selection-multi" })

class TableSelectionMulti extends TableSelectionBase {
	/**
	 * Defines the `row-key` values of selected rows, with each value separated by a space.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	selected?: string;

	/**
	 * Defines the selector of the header row.
	 *
	 * @default "SelectAll"
	 * @public
	 * @since 2.12
	 */
	@property()
	headerSelector: `${TableSelectionMultiHeaderSelector}` = "SelectAll";

	private _rangeSelection?: {
		selected: boolean,
		isUp: boolean | null,
		rows: TableRow[],
		isMouse: boolean,
		shiftPressed: boolean
	} | null;

	_onClickCaptureBound: (e: MouseEvent) => void;

	constructor() {
		super();
		this._onClickCaptureBound = this._onclickCapture.bind(this);
	}

	onTableBeforeRendering() {
		super.onTableBeforeRendering();
		this._table?.removeEventListener("click", this._onClickCaptureBound);
	}

	onTableAfterRendering() {
		this._table?.addEventListener("click", this._onClickCaptureBound, { capture: true });
	}

	isMultiSelectable(): boolean {
		return true;
	}

	isSelected(row: TableRowBase): boolean {
		if (row.isHeaderRow()) {
			return this.headerSelector === "ClearAll" ? true : this.areAllRowsSelected();
		}

		const rowKey = this.getRowKey(row as TableRow);
		return this.getSelectedAsSet().has(rowKey);
	}

	setSelected(row: TableRowBase, selected: boolean, fireEvent: boolean = false) {
		if (this._rangeSelection?.isMouse && this._rangeSelection.shiftPressed) {
			return;
		}

		const tableRows = row.isHeaderRow() ? this._table!.rows : [row as TableRow];
		const selectedSet = this.getSelectedAsSet();
		const selectionChanged = tableRows.reduce((selectedSetChanged, tableRow) => {
			const rowKey = this.getRowKey(tableRow);
			if (!rowKey) {
				return selectedSetChanged;
			}

			const setSize = selectedSet.size;
			selectedSet[selected ? "add" : "delete"](rowKey);
			return selectedSetChanged || setSize !== selectedSet.size;
		}, false);

		if (selectionChanged) {
			this.setSelectedAsSet(selectedSet);
			fireEvent && this.fireDecoratorEvent("change");
		}
	}

	/**
	 * Returns an array of the selected rows.
	 *
	 * @public
	 */
	getSelectedRows(): TableRow[] {
		return this._table ? this._table.rows.filter(row => this.isSelected(row)) : [];
	}

	/**
	 * Determines whether all rows are selected.
	 */
	areAllRowsSelected(): boolean {
		if (!this._table || !this._table.rows.length) {
			return false;
		}

		const selectedSet = this.getSelectedAsSet();
		return this._table.rows.every(row => {
			const rowKey = this.getRowKey(row);
			return selectedSet.has(rowKey);
		});
	}

	/**
	 * Returns the `selected` property as a set of unique `row-key` values.
	 *
	 * @public
	 */
	getSelectedAsSet(): Set<string> {
		const selected = this.selected || "";
		const selectedArray = selected.split(" ").filter(String);
		return new Set(selectedArray);
	}

	/**
	 * Sets the `selected` property using the provided set of unique `row-key` values.
	 *
	 * @param selectedSet A set of `row-key` values
	 * @public
	 */
	setSelectedAsSet(selectedSet: Set<string>): void {
		this.selected = [...selectedSet].join(" ");
	}

	/**
	 * Returns the ARIA description of the selection component displayed in the column header.
	 */
	getAriaDescriptionForColumnHeader(): string | undefined {
		if (!this._table || !this._table.rows.length || this.behavior === "RowOnly") {
			return undefined;
		}

		let description = "";
		const seperator = " ";
		const i18nBundle = (this._table.constructor as typeof Table).i18nBundle;
		if (this.headerSelector === "SelectAll") {
			description = i18nBundle.getText(TABLE_COLUMNHEADER_SELECTALL_DESCRIPTION);
			description += seperator + i18nBundle.getText(this.areAllRowsSelected() ? TABLE_COLUMNHEADER_SELECTALL_CHECKED : TABLE_COLUMNHEADER_SELECTALL_NOT_CHECKED);
		} else {
			description = i18nBundle.getText(TABLE_COLUMNHEADER_CLEARALL_DESCRIPTION);
			description += this.getSelectedRows().length === 0 ? seperator + i18nBundle.getText(TABLE_ACC_STATE_DISABLED) : "";
		}
		return description;
	}

	_onkeydown(e: KeyboardEvent) {
		if (!this._table || !e.shiftKey) {
			return;
		}

		const focusedElement = getActiveElement(); // Assumption: The focused element is always the "next" row after navigation.

		if (!(focusedElement?.hasAttribute("ui5-table-row") || this._rangeSelection?.isMouse)) {
			this._stopRangeSelection();
			return;
		}

		if (!this._rangeSelection) {
			// If no range selection is active, start one
			const row = focusedElement as TableRow;
			this._startRangeSelection(row, this.isSelected(row));
		} else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			const change = isUpShift(e) ? -1 : 1;
			this._handleRangeSelection(focusedElement as TableRow, change);
		}

		if (this._rangeSelection) {
			this._rangeSelection.shiftPressed = e.shiftKey;
		}
	}

	_onkeyup(e: KeyboardEvent, eventOrigin: HTMLElement) {
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

	_onclickCapture(e: MouseEvent) {
		if (!this._table) {
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

			// Set checkbox to the selection state of the start row (if it is selected)
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
		} else if (row) {
			this._startRangeSelection(row, !this.isSelected(row), true);
		}
	}

	/**
	 * Start the range selection and initialises the range selection state
	 * @param row starting row
	 * @private
	 */
	_startRangeSelection(row: TableRow, selected: boolean, isMouse = false) {
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
	 * @param targetRow Row that is currently focused
	 * @param change indicates direction
	 * @private
	 */
	_handleRangeSelection(targetRow: TableRow, change: number) {
		if (!this._rangeSelection) {
			return;
		}

		const isUp = change > 0;
		this._rangeSelection.isUp ??= isUp;

		const shouldReverseSelection = isUp !== this._rangeSelection.isUp && !this._rangeSelection.isMouse;
		let selectionChanged = shouldReverseSelection && this.isSelected(targetRow);

		if (shouldReverseSelection) {
			this._reverseRangeSelection();
		} else {
			const rowIndex = this._table!.rows.indexOf(targetRow);
			const [startIndex, endIndex] = [rowIndex, rowIndex - change].sort((a, b) => a - b);
			const selectedSet = this.getSelectedAsSet();

			selectionChanged = this._table?.rows.slice(startIndex, endIndex + 1).reduce((changed, row) => {
				const isRowNotInSelection = !this._rangeSelection?.rows.includes(row);
				const isRowSelectionDifferent = this.isSelected(row) !== this._rangeSelection!.selected;

				if (isRowNotInSelection) {
					this._rangeSelection?.rows.push(row);
				}

				selectedSet[this._rangeSelection!.selected ? "add" : "delete"](this.getRowKey(row));

				return changed || isRowSelectionDifferent;
			}, selectionChanged) || false;

			this.setSelectedAsSet(selectedSet);
		}

		selectionChanged && this.fireDecoratorEvent("change");
	}

	_stopRangeSelection() {
		this._rangeSelection = null;
	}

	_reverseRangeSelection() {
		const row = this._rangeSelection?.rows.pop();
		if (row) {
			this.setSelected(row, false);
		}

		if (this._rangeSelection?.rows.length === 1) {
			this._rangeSelection.isUp = null;
		}
	}
}

TableSelectionMulti.define();

export default TableSelectionMulti;
