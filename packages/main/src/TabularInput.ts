import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isPhone, isAndroid } from "@ui5/webcomponents-base/dist/Device.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkupFirstMatch.js";

import Input from "./Input.js";
import type { IInputSuggestionItem } from "./Input.js";
import type Table from "./Table.js";
import type TableHeaderCell from "./TableHeaderCell.js";
import type TableCell from "./TableCell.js";
import type TableRow from "./TableRow.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import type TableOverflowMode from "./types/TableOverflowMode.js";

import TabularInputTemplate from "./TabularInputTemplate.js";
import tabularInputStyles from "./generated/themes/TabularInput.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";

import {
	ROW_ITEM_POSITION,
} from "./generated/i18n/i18n-defaults.js";

/**
 * Represents highlighted cell content for a row
 * @private
 */
type HighlightedCellContent = {
	text: string;
	highlightedMarkup: string;
};

/**
 * Represents a processed suggestion row with highlighted content
 * @private
 */
type ProcessedSuggestionRow = {
	row: ITabularSuggestionRow;
	cells: HighlightedCellContent[];
};

/**
 * Interface for tabular suggestion row items
 * @public
 */
interface ITabularSuggestionRow extends UI5Element {
	cells: TableCell[];
	selected?: boolean;
	focused?: boolean;
}

type TabularInputSelectionChangeEventDetail = {
	row: ITabularSuggestionRow | null;
}

/**
 * @class
 * ### Overview
 *
 * The `ui5-tabular-input` component is an input field with tabular suggestions support.
 * It displays suggestions in a table format with multiple columns, allowing users to
 * see more information about each suggestion before selecting it.
 *
 * Similar to the OpenUI5 sap.m.Input with tabular suggestions, this component supports:
 * - Multiple columns via `suggestionColumns` slot
 * - Tabular rows via `suggestionRows` slot
 * - Automatic popin mode for responsive behavior
 *
 * ### Usage
 *
 * Use this component when:
 * - Users need to see additional information in columns for each suggestion
 * - A simple text-based suggestion list is not sufficient
 * - You want to display data in a tabular format
 *
 * ### Difference from ui5-input
 *
 * This component uses its own tabular suggestion mechanism instead of the standard
 * `showSuggestions` / `suggestionItems` from ui5-input. The tabular suggestions
 * are defined via:
 * - `suggestionColumns`: Table header cells defining the columns
 * - `suggestionRows`: Table rows with cells containing the suggestion data
 *
 * **Note:** Autocomplete (typeahead) matches only the first column of suggestion rows.
 *
 * ### Keyboard Handling
 *
 * The component inherits keyboard handling from `ui5-input`:
 * - [Down] - Navigates to the next suggestion row
 * - [Up] - Navigates to the previous suggestion row
 * - [Enter] - Selects the focused suggestion row
 * - [Escape] - Closes the suggestion popover
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TabularInput.js";`
 *
 * @constructor
 * @extends Input
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-tabular-input",
	languageAware: true,
	formAssociated: true,
	renderer: jsxRenderer,
	template: TabularInputTemplate,
	styles: [Input.styles, SuggestionsCss, tabularInputStyles],
})

class TabularInput extends Input {
	// @ts-expect-error - Intentionally override selection-change to use 'row' instead of 'item'
	eventDetails!: Omit<Input["eventDetails"], "selection-change"> & {
		"selection-change": TabularInputSelectionChangeEventDetail,
	}

	/**
	 * Defines the columns for the tabular suggestions.
	 * Use `ui5-table-header-cell` components to define the column headers.
	 *
	 * **Note:** The columns define the structure of the suggestion table header.
	 * Each column can have properties like `width`, `minWidth`, `importance` (for popin),
	 * and `popinText`.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	suggestionColumns!: Slot<TableHeaderCell>;

	/**
	 * Defines the rows for the tabular suggestions.
	 * Use `ui5-table-row` components with `ui5-table-cell` children to define each suggestion row.
	 *
	 * **Note:** The cells in each row should correspond to the columns defined in `suggestionColumns`.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	suggestionRows!: Slot<ITabularSuggestionRow>;

	/**
	 * Defines the overflow behavior of the suggestion table.
	 *
	 * **Note:** When set to `Popin`, columns that don't fit will be shown as pop-in content.
	 * When set to `Scroll`, a horizontal scrollbar will appear.
	 *
	 * @default "Popin"
	 * @public
	 */
	@property()
	overflowMode: `${TableOverflowMode}` = "Popin";

	/**
	 * Internal property to track if table suggestions are being used
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_useTabularSuggestions = false;

	/**
	 * Internal property reflecting whether a suggestion row has focus.
	 * Used by CSS to hide input focus outline during row navigation.
	 * @private
	 */
	@property({ type: Boolean })
	_rowFocused = false;

	/**
	 * Stores processed rows with highlighted cell content
	 * @private
	 */
	_processedRows: ProcessedSuggestionRow[] = [];

	/**
	 * Stores the matched row for typeahead (similar to Input's _matchedSuggestionItem)
	 * @private
	 */
	_matchedTabularRow?: ITabularSuggestionRow;

	get _effectiveShowSuggestions() {
		if (this._useTabularSuggestions) {
			return this.showSuggestions;
		}
		return super._effectiveShowSuggestions;
	}

	/**
	 * Override: Return tabular rows as suggestion items for the parent's hasItems check
	 * Returns empty when showSuggestions is false to prevent parent from opening popover
	 */
	get _flattenItems(): Array<IInputSuggestionItem> {
		if (this._useTabularSuggestions) {
			return this.showSuggestions ? this.suggestionRows as unknown as Array<IInputSuggestionItem> : [];
		}
		return super._flattenItems;
	}

	onBeforeRendering() {
		this._useTabularSuggestions = this.suggestionColumns.length > 0;

		if (this._useTabularSuggestions) {
			this._processRows();
			this._handleTabularPopoverOpen();
			this._handleTabularTypeAhead();
		}

		super.onBeforeRendering();
	}

	/**
	 * @private
	 */
	_handleTabularPopoverOpen() {
		if (!this._effectiveShowSuggestions) {
			return;
		}

		const hasItems = this._visibleRows.length > 0;
		const hasValue = !!this.value;
		const isFocused = this.shadowRoot?.querySelector("input") === getActiveElement();
		const preventOpenPicker = this.disabled || this.readonly;

		if (preventOpenPicker) {
			this.open = false;
		} else if (!this._isPhone) {
			this.open = hasItems && (this.open || (hasValue && isFocused && this.isTyping));
		}
	}

	/**
	 * @private
	 */
	_handleTabularTypeAhead() {
		if (!this._effectiveShowSuggestions) {
			return;
		}

		const innerInput = this.getInputDOMRefSync();
		if (!innerInput || !this.value) {
			return;
		}

		const autoCompletedChars = innerInput.selectionEnd! - innerInput.selectionStart!;

		if (this._shouldAutocomplete && !isAndroid() && !autoCompletedChars && !this._isKeyNavigation) {
			const matchingRow = this._getFirstMatchingRow(this.value);
			if (matchingRow) {
				if (!this._isComposing) {
					this._performRowTypeAhead(matchingRow);
				}
				this._selectMatchingRow(matchingRow);
			} else {
				this._matchedTabularRow = undefined;
			}
		}
	}

	/**
	 * @private
	 */
	_getFirstMatchingRow(current: string): ITabularSuggestionRow | undefined {
		const visibleRows = this._visibleRows;
		if (!visibleRows.length) {
			return;
		}

		const currentLower = current.toLowerCase();

		return visibleRows.find(row => {
			const firstCellText = this._getRowValue(row).toLowerCase();
			return firstCellText.startsWith(currentLower);
		});
	}

	/**
	 * @private
	 */
	_performRowTypeAhead(row: ITabularSuggestionRow) {
		const suggestionText = this._getRowValue(row);
		const typedValue = this.typedInValue;

		if (suggestionText.toLowerCase().startsWith(typedValue.toLowerCase())) {
			this.value = typedValue + suggestionText.substring(typedValue.length);
		}

		this._performTextSelection = true;
		this._shouldAutocomplete = false;
	}

	/**
	 * @private
	 */
	_selectMatchingRow(row: ITabularSuggestionRow) {
		this._deselectAllRows();

		row.selected = true;
		this._matchedTabularRow = row;

		this.fireDecoratorEvent("selection-change", {
			row,
		});
	}

	onAfterRendering() {
		if (!this._useTabularSuggestions) {
			return super.onAfterRendering();
		}

		if (this._performTextSelection) {
			if (this.typedInValue.length && this.value.length) {
				this._adjustSelectionRange();
			}
			this.fireDecoratorEvent("type-ahead");
		}
		this._performTextSelection = false;
	}

	/**
	 * @private
	 */
	_adjustSelectionRange() {
		if (this._useTabularSuggestions) {
			const innerInput = this.getInputDOMRefSync();
			if (innerInput) {
				innerInput.setSelectionRange(this.typedInValue.length, this.value.length);
			}
			return;
		}
		super._adjustSelectionRange();
	}

	/**
	 * Processes rows and generates highlighted markup for cell content.
	 * @private
	 */
	_processRows() {
		const typedValue = this.typedInValue;
		this._processedRows = [];

		this.suggestionRows.forEach(row => {
			const cells = row.cells || [];
			const processedCells: HighlightedCellContent[] = cells.map(cell => {
				const cellText = cell.textContent?.trim() || "";

				return {
					text: cellText,
					highlightedMarkup: generateHighlightedMarkup(cellText, typedValue),
				};
			});

			this._processedRows.push({
				row,
				cells: processedCells,
			});
		});
	}

	get _visibleRows(): ITabularSuggestionRow[] {
		return this.suggestionRows.filter(row => !(row as UI5Element).hidden);
	}

	get _visibleProcessedRows(): ProcessedSuggestionRow[] {
		const visibleRowSet = new Set(this._visibleRows);
		return this._processedRows.filter(pr => visibleRowSet.has(pr.row));
	}

	/**
	 * Handles row-click event from the table to select the corresponding suggestion.
	 * @private
	 */
	_onTableRowClick(e: CustomEvent<{ row: TableRow }>) {
		const clickedRow = e.detail.row;
		const rowIndex = parseInt(clickedRow.dataset.rowIndex || "0");
		const suggestionRow = this._visibleRows[rowIndex];

		if (suggestionRow) {
			this._selectRow(suggestionRow, false);
		}
	}

	/**
	 * @private
	 */
	_selectRow(row: ITabularSuggestionRow, keyboardUsed: boolean) {
		const rowValue = this._getRowValue(row);
		const isAlreadySelected = row.focused || row.selected;

		this.value = rowValue;
		this.typedInValue = rowValue;
		this.open = false;

		if (!isAlreadySelected) {
			this.fireDecoratorEvent("selection-change", {
				row,
			});
		}
		this.fireDecoratorEvent("change");

		this._deselectAllRows();
		row.selected = true;
		this._matchedTabularRow = undefined;
		this._rowFocused = false;
		this.isTyping = false;

		if (!keyboardUsed && !isPhone()) {
			this.focus();
		}
	}

	/**
	 * @private
	 */
	_getRowValue(row: ITabularSuggestionRow): string {
		const cells = row.cells || [];

		if (cells.length > 0) {
			return cells[0].textContent?.trim() || "";
		}

		return "";
	}

	/**
	 * @private
	 */
	_deselectAllRows() {
		this.suggestionRows.forEach(row => {
			row.selected = false;
			row.focused = false;
		});
	}

	/**
	 * @private
	 */
	_handleDown(e: KeyboardEvent) {
		if (this._useTabularSuggestions && this.open) {
			e.preventDefault();
			this._navigateRows(true);
			return;
		}
		super._handleDown(e);
	}

	/**
	 * @private
	 */
	_handleUp(e: KeyboardEvent) {
		if (this._useTabularSuggestions && this.open) {
			e.preventDefault();
			this._navigateRows(false);
			return;
		}
		super._handleUp(e);
	}

	/**
	 * @private
	 */
	_navigateRows(forward: boolean) {
		const visibleRows = this._visibleRows;

		if (visibleRows.length === 0) {
			return;
		}

		const currentIndex = visibleRows.findIndex(row => row.focused || row.selected);

		let nextIndex: number;
		if (forward) {
			if (currentIndex >= visibleRows.length - 1) {
				return;
			}
			nextIndex = currentIndex < 0 ? 0 : currentIndex + 1;
		} else {
			if (currentIndex <= 0) {
				this._deselectAllRows();
				this._matchedTabularRow = undefined;
				this._rowFocused = false;
				this._clearAnnouncement();
				this.value = this.typedInValue;
				return;
			}
			nextIndex = currentIndex - 1;
		}

		this._deselectAllRows();
		this._matchedTabularRow = undefined;

		visibleRows[nextIndex].focused = true;
		this._rowFocused = true;

		const previewValue = this._getRowValue(visibleRows[nextIndex]);
		this.value = previewValue;
		this._performTextSelection = true;

		this._announceSelectedRow(nextIndex);
		this._scrollRowIntoView(nextIndex);

		this.fireDecoratorEvent("selection-change", {
			row: visibleRows[nextIndex],
		});
	}

	/**
	 * @private
	 */
	_handleEnter(e: KeyboardEvent) {
		if (!this._useTabularSuggestions) {
			return super._handleEnter(e);
		}

		const visibleRows = this._visibleRows;
		const focusedRow = visibleRows.find(row => row.focused);
		const innerInput = this.getInputDOMRefSync()!;

		let rowToSelect = focusedRow || this._matchedTabularRow;

		if (!rowToSelect) {
			rowToSelect = visibleRows.find(row => {
				return this._getRowValue(row).toLowerCase() === this.value.toLowerCase();
			});
		}

		if (rowToSelect) {
			const rowValue = this._getRowValue(rowToSelect);
			innerInput.setSelectionRange(rowValue.length, rowValue.length);

			if (this.open) {
				e.preventDefault();
			}
			this._selectRow(rowToSelect, true);
			return;
		}

		if (this.open) {
			this.open = false;
		}
		this.lastConfirmedValue = this.value;
	}

	/**
	 * @private
	 */
	_handleEscape() {
		if (!this._useTabularSuggestions || !this.open) {
			return super._handleEscape();
		}

		this.value = this.typedInValue || this.valueBeforeSelectionStart;
		this.open = false;
		this._deselectAllRows();
		this._matchedTabularRow = undefined;
		this._rowFocused = false;
		this.isTyping = false;
		this._clearAnnouncement();
	}

	/**
	 * @private
	 */
	_clearPopoverFocusAndSelection() {
		if (!this._useTabularSuggestions) {
			return super._clearPopoverFocusAndSelection();
		}

		this._deselectAllRows();
		this.hasSuggestionItemSelected = false;
	}

	get _hasTabularSuggestions(): boolean {
		return this._useTabularSuggestions && this._visibleRows.length > 0;
	}

	get _columnsCount(): number {
		return this.suggestionColumns.length;
	}

	get _isRowFocused(): boolean {
		return this._useTabularSuggestions && this._visibleRows.some(row => row.focused);
	}

	override get _isSuggestionsFocused(): boolean {
		if (this._useTabularSuggestions) {
			return this._isRowFocused;
		}
		return super._isSuggestionsFocused || false;
	}

	/**
	 * Announces the currently selected row for screen readers using a live region.
	 * Includes row position and all column values with their headers.
	 * @private
	 */
	_announceSelectedRow(rowIndex: number) {
		const invisibleText = this.shadowRoot?.querySelector("#selectionText");
		if (!invisibleText) {
			return;
		}

		const row = this._visibleRows[rowIndex];
		const cells = row.cells || [];
		const columns = this.suggestionColumns;

		const positionText = Input.i18nBundle.getText(ROW_ITEM_POSITION, rowIndex + 1, this._visibleRows.length);

		const cellTexts = cells.map((cell, index) => {
			const cellValue = cell.textContent?.trim() || "";
			const columnHeader = columns[index]?.textContent?.trim() || "";
			return columnHeader ? `${columnHeader}: ${cellValue}` : cellValue;
		}).join(", ");

		invisibleText.textContent = `${positionText}. ${cellTexts}`;
	}

	/**
	 * Clears the announcement text when closing the popover.
	 * @private
	 */
	_clearAnnouncement() {
		const invisibleText = this.shadowRoot?.querySelector("#selectionText");
		if (invisibleText) {
			invisibleText.textContent = "";
		}
	}

	/**
	 * Returns the tabular suggestions popover element
	 * @private
	 */
	_getTabularPopover() {
		return this.shadowRoot?.querySelector<ResponsivePopover>(".ui5-suggestions-popover");
	}

	/**
	 * Scrolls the row at the given index into view within the suggestions popover.
	 * @private
	 */
	_scrollRowIntoView(rowIndex: number) {
		const popover = this._getTabularPopover();
		if (!popover) {
			return;
		}

		const table = popover.querySelector<Table>("[ui5-table]");
		const rowElement = table?.rows[rowIndex];

		if (!rowElement) {
			return;
		}

		const scrollContainer = popover.querySelector<HTMLElement>(".ui5-tabular-input-suggestions-wrapper");
		if (!scrollContainer) {
			return;
		}

		const containerRect = scrollContainer.getBoundingClientRect();
		const rowRect = rowElement.getBoundingClientRect();

		const isRowAboveView = rowRect.top < containerRect.top;
		const isRowBelowView = rowRect.bottom > containerRect.bottom;

		if (isRowAboveView || isRowBelowView) {
			rowElement.scrollIntoView({
				behavior: "auto",
				block: "nearest",
			});
		}
	}

	/**
	 * Override focusout handler to prevent closing popover when clicking inside it
	 * @private
	 */
	_onfocusout(e: FocusEvent) {
		if (!this._useTabularSuggestions) {
			return super._onfocusout(e);
		}

		const toBeFocused = e.relatedTarget as HTMLElement;
		const popover = this._getTabularPopover();

		if (popover?.contains(toBeFocused) || this.contains(toBeFocused)) {
			return;
		}

		this.focused = false;
		this.open = false;
		this.isTyping = false;
		this.lastConfirmedValue = "";
		this._clearPopoverFocusAndSelection();
	}
}

TabularInput.define();

export default TabularInput;
export type {
	ITabularSuggestionRow,
	TabularInputSelectionChangeEventDetail,
};
