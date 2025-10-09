import {
	isUpShift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import TableSelectionMode from "./types/TableSelectionMode.js";
import { isSelectionCell, isHeaderSelectionCell, findRowInPath } from "./TableUtils.js";
import type Table from "./Table.js";
import type { ITableFeature } from "./Table.js";
import type TableRow from "./TableRow.js";
import type TableRowBase from "./TableRowBase.js";

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
@customElement({ tag: "ui5-table-selection" })

/**
 * Fired when the selection is changed by user interaction.
 *
 * @public
 */
@event("change", {
	bubbles: true,
})

class TableSelection extends UI5Element implements ITableFeature {
	eventDetails!: {
		change: void,
	}
	/**
	 * Defines the selection mode.
	 *
	 * @default "Multiple"
	 * @public
	 */
	@property()
	mode: `${TableSelectionMode}` = "Multiple";

	/**
	 * Defines the selected rows separated by a space.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	selected = "";

	readonly identifier = "TableSelection";
	_table?: Table;
	_rowsLength = 0;
	_rangeSelection?: {selected: boolean, isUp: boolean | null, rows: TableRow[], isMouse: boolean, shiftPressed: boolean} | null;

	onClickCaptureBound: (e: MouseEvent) => void;

	constructor() {
		super();
		this.onClickCaptureBound = this._onClickCapture.bind(this);
	}

	onTableActivate(table: Table) {
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

	onTableAfterRendering(): void {
		this._table?.addEventListener("click", this.onClickCaptureBound, { capture: true });
	}

	isSelectable(): boolean {
		return this.mode !== TableSelectionMode.None;
	}

	isMultiSelectable(): boolean {
		return this.mode === TableSelectionMode.Multiple;
	}

	isRowSelectorRequired(): boolean {
		return this.mode !== TableSelectionMode.None;
	}

	getAriaDescriptionForTable(): string | undefined {
		return undefined;
	}

	getAriaDescriptionForColumnHeader(): string | undefined {
		return undefined;
	}

	getRowKey(row: TableRow): string {
		return row.rowKey || "";
	}

	isSelected(row: TableRowBase): boolean {
		if (!this._table || !this.isSelectable()) {
			return false;
		}

		if (row.isHeaderRow()) {
			return this.areAllRowsSelected();
		}

		const rowKey = this.getRowKey(row as TableRow);
		return this.selectedAsArray.includes(rowKey);
	}

	hasSelectedRow(): boolean {
		if (!this._table || !this.isSelectable()) {
			return false;
		}

		const selectedArray = this.selectedAsArray;
		return this._table.rows.some(row => {
			const rowKey = this.getRowKey(row);
			return selectedArray.includes(rowKey);
		});
	}

	areAllRowsSelected(): boolean {
		if (!this._table || !this._table.rows.length || this.mode !== TableSelectionMode.Multiple) {
			return false;
		}

		const selectedArray = this.selectedAsArray;
		return this._table.rows.every(row => {
			const rowKey = this.getRowKey(row);
			return selectedArray.includes(rowKey);
		});
	}

	setSelected(row: TableRowBase, selected: boolean, fireEvent = false) {
		if (this._rangeSelection?.isMouse && this._rangeSelection.shiftPressed) {
			return;
		}

		if (row.isHeaderRow()) {
			this._selectHeaderRow(selected);
		} else {
			this._selectRow(row as TableRow, selected);
		}

		if (fireEvent) {
			this.fireDecoratorEvent("change");
		}
	}

	get selectedAsArray(): string[] {
		return this.selected.split(" ").filter(String);
	}

	set selectedAsArray(selectedArray: string[]) {
		this.selected = selectedArray.filter(String).join(" ");
	}

	get selectedAsSet(): Set<string> {
		return new Set(this.selectedAsArray);
	}

	set selectedAsSet(selectedSet: Set<string>) {
		this.selectedAsArray = [...selectedSet];
	}

	_selectRow(row: TableRow, selected: boolean) {
		const rowKey = this.getRowKey(row);
		if (this.mode === TableSelectionMode.Multiple) {
			const selectedSet = this.selectedAsSet;
			selectedSet[selected ? "add" : "delete"](rowKey);
			this.selectedAsSet = selectedSet;
		} else {
			this.selected = selected ? rowKey : "";
		}
	}

	_selectHeaderRow(selected: boolean) {
		const selectedSet = this.selectedAsSet;
		this._table!.rows.forEach(row => {
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
		} else if (!this.isMultiSelectable()) {
			this.selected = this.selectedAsArray.shift() || "";
		}

		this._table._invalidate++;
		this._table.headerRow[0]._invalidate++;
		this._table.rows.forEach(row => row._invalidate++);
	}

	_onkeydown(e: KeyboardEvent) {
		if (!this.isMultiSelectable() || !this._table || !e.shiftKey) {
			return;
		}

		const focusedElement = getActiveElement(); // Assumption: The focused element is always the "next" row after navigation.

		if (!(focusedElement?.hasAttribute("ui5-table-row") || this._rangeSelection?.isMouse || focusedElement?.hasAttribute("ui5-growing-row"))) {
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

	_onClickCapture(e: MouseEvent) {
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
	 * @param targetRow row that is currently focused
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

			selectionChanged = this._table?.rows.slice(startIndex, endIndex + 1).reduce((changed, row) => {
				const isRowNotInSelection = !this._rangeSelection?.rows.includes(row);
				const isRowSelectionDifferent = this.isSelected(row) !== this._rangeSelection!.selected;

				if (isRowNotInSelection) {
					this._rangeSelection?.rows.push(row);
				}

				this._selectRow(row, this._rangeSelection!.selected);

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
}

TableSelection.define();

export default TableSelection;
