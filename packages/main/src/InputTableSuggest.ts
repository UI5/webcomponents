import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isPhone, isAndroid } from "@ui5/webcomponents-base/dist/Device.js";
import {
	isUp,
	isDown,
	isEnter,
	isBackSpace,
	isDelete,
	isEscape,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkupFirstMatch.js";

import InputField from "./InputField.js";
import type Table from "./Table.js";
import type TableHeaderCell from "./TableHeaderCell.js";
import type TableCell from "./TableCell.js";
import type TableRow from "./TableRow.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import type TableOverflowMode from "./types/TableOverflowMode.js";

import InputTableSuggestTemplate from "./InputTableSuggestTemplate.js";
import InputTableSuggestStyles from "./generated/themes/InputTableSuggest.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";

import {
	ROW_ITEM_POSITION,
	INPUT_SUGGESTIONS_TITLE,
	INPUT_SUGGESTIONS,
	INPUT_SUGGESTIONS_OK_BUTTON,
	INPUT_SUGGESTIONS_CANCEL_BUTTON,
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
 * Represents a suggestion row with highlighted content
 * @private
 */
type HighlightedSuggestionRow = {
	row: ITableSuggestionRow;
	cells: HighlightedCellContent[];
};

/**
 * Interface for tabular suggestion row items
 * @public
 */
interface ITableSuggestionRow extends UI5Element {
	cells: TableCell[];
	selected?: boolean;
	focused?: boolean;
}

type InputTableSuggestSelectionChangeEventDetail = {
	row: ITableSuggestionRow | null;
}

/**
 * @class
 * ### Overview
 *
 * The `ui5-input-table-suggest` component is an input field with tabular suggestions support.
 * It displays suggestions in a table format with multiple columns, allowing users to
 * see more information about each suggestion before selecting it.
 *
 * This component supports:
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
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/InputTableSuggest.js";`
 *
 * @constructor
 * @extends InputField
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-input-table-suggest",
	languageAware: true,
	formAssociated: true,
	renderer: jsxRenderer,
	template: InputTableSuggestTemplate,
	styles: [InputField.styles, SuggestionsCss, InputTableSuggestStyles],
})
@event("selection-change", { bubbles: true })
@event("open", { bubbles: true })
@event("close")
@event("type-ahead")

class InputTableSuggest extends InputField {
	eventDetails!: InputField["eventDetails"] & {
		"selection-change": InputTableSuggestSelectionChangeEventDetail,
		"open": void,
		"close": void,
		"type-ahead": void,
	}

	/**
	 * Defines whether the suggestions picker is open.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines whether suggestions should be shown.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSuggestions = false;

	/**
	 * Defines whether typeahead is disabled.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	noTypeahead = false;

	/**
	 * The typed-in value before suggestion selection.
	 * @private
	 */
	typedInValue = "";

	/**
	 * Value before any selection started.
	 * @private
	 */
	valueBeforeSelectionStart = "";

	/**
	 * Whether autocomplete should run on next render.
	 * @private
	 */
	_shouldAutocomplete?: boolean;

	/**
	 * Whether text selection should be performed.
	 * @private
	 */
	_performTextSelection?: boolean;

	/**
	 * Whether key navigation is in progress.
	 * @private
	 */
	_isKeyNavigation?: boolean;

	/**
	 * Defines the columns for the tabular suggestions.
	 * Use `ui5-table-header-cell` component to define the column headers.
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
	 * Use `ui5-table-row` component with `ui5-table-cell` children to define each suggestion row.
	 *
	 * **Note:** The cells in each row should correspond to the columns defined in `suggestionColumns`.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	suggestionRows!: Slot<ITableSuggestionRow>;

	/**
	 * Defines the overflow behavior of the suggestion table.
	 * @default "Popin"
	 * @private
	 */
	@property({ noAttribute: true })
	_overflowMode: `${TableOverflowMode}` = "Popin";

	/**
	 * Internal property to track if table suggestions are being used
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_useTableSuggestions = false;

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
	_highlightedRows: HighlightedSuggestionRow[] = [];

	/**
	 * Stores the matched row for typeahead (similar to Input's _matchedSuggestionItem)
	 * @private
	 */
	_matchedTabularRow?: ITableSuggestionRow;

	get _effectiveShowSuggestions() {
		return this.showSuggestions && this._useTableSuggestions;
	}

	get _visibleRows(): ITableSuggestionRow[] {
		return this.suggestionRows.filter(row => !(row as UI5Element).hidden);
	}

	get _visibleHighlightedRows(): HighlightedSuggestionRow[] {
		const visibleRowSet = new Set(this._visibleRows);
		return this._highlightedRows.filter(pr => visibleRowSet.has(pr.row));
	}

	onBeforeRendering() {
		this._useTableSuggestions = this.suggestionColumns.length > 0;

		if (this._useTableSuggestions) {
			this._highlightRows();
			this._handleTabularPopoverOpen();
			this._handleTabularTypeAhead();
		}

		super.onBeforeRendering();
	}

	_input(e: CustomEvent | InputEvent, eventType: string) {
		super._input(e, eventType);

		this.typedInValue = this.value;
		this.valueBeforeSelectionStart = this.value;
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

		if (preventOpenPicker || !hasValue) {
			this.open = false;
		} else if (!this._isPhone) {
			const isTyping = isFocused && this.isTyping;
			if (isTyping) {
				this.open = hasItems && !!this._getFirstMatchingRow(this.value);
			} else {
				this.open = hasItems && this.open;
			}
		}
	}

	/**
	 * @private
	 */
	_handleTabularTypeAhead() {
		if (!this._effectiveShowSuggestions || this.noTypeahead) {
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
	_getFirstMatchingRow(current: string): ITableSuggestionRow | undefined {
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
	_performRowTypeAhead(row: ITableSuggestionRow) {
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
	_selectMatchingRow(row: ITableSuggestionRow) {
		this._deselectAllRows();

		row.selected = true;
		this._matchedTabularRow = row;

		this.fireDecoratorEvent("selection-change", {
			row,
		});
	}

	onAfterRendering() {
		if (!this._useTableSuggestions) {
			return super.onAfterRendering();
		}

		if (this._performTextSelection) {
			if (this.typedInValue.length && this.value.length) {
				this._adjustSelectionRange();
			}
			this.fireDecoratorEvent("type-ahead");
		}
		this._performTextSelection = false;
		this._updateValueStateLinks();
	}

	/**
	 * Updates event listeners for links in value state message.
	 * @private
	 */
	_updateValueStateLinks() {
		const currentLinks = this.linksInAriaValueStateHiddenText;
		if (this._valueStateLinks.length !== currentLinks.length
			|| !this._valueStateLinks.every((link, i) => link === currentLinks[i])) {
			this._removeLinksEventListeners();
			this._addLinksEventListeners();
			this._valueStateLinks = currentLinks;
		}
	}

	/**
	 * @private
	 */
	_adjustSelectionRange() {
		const innerInput = this.getInputDOMRefSync();
		if (innerInput && this.typedInValue.length && this.value.length) {
			innerInput.setSelectionRange(this.typedInValue.length, this.value.length);
		}
	}

	/**
	 * Processes rows and generates highlighted markup for cell content.
	 * @private
	 */
	_highlightRows() {
		const typedValue = this.typedInValue;
		this._highlightedRows = [];

		this.suggestionRows.forEach(row => {
			const cells = row.cells || [];
			const highlightedCells: HighlightedCellContent[] = cells.map(cell => {
				const cellText = cell.textContent?.trim() || "";

				return {
					text: cellText,
					highlightedMarkup: generateHighlightedMarkup(cellText, typedValue),
				};
			});

			this._highlightedRows.push({
				row,
				cells: highlightedCells,
			});
		});
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
	_selectRow(row: ITableSuggestionRow, keyboardUsed: boolean) {
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
	_getRowValue(row: ITableSuggestionRow): string {
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

	_onkeydown(e: KeyboardEvent) {
		this._shouldAutocomplete = !this.noTypeahead && !(isBackSpace(e) || isDelete(e) || isEscape(e));

		if (this._useTableSuggestions && this.open) {
			if (isDown(e)) {
				e.preventDefault();
				this._isKeyNavigation = true;
				this._navigateRows(true);
				return;
			}

			if (isUp(e)) {
				e.preventDefault();
				this._isKeyNavigation = true;
				this._navigateRows(false);
				return;
			}

			if (isEnter(e)) {
				const visibleRows = this._visibleRows;
				const focusedRow = visibleRows.find(row => row.focused);
				const innerInput = this.getInputDOMRefSync();

				let rowToSelect = focusedRow || this._matchedTabularRow;

				if (!rowToSelect) {
					rowToSelect = visibleRows.find(row => {
						return this._getRowValue(row).toLowerCase() === this.value.toLowerCase();
					});
				}

				if (rowToSelect && innerInput) {
					const rowValue = this._getRowValue(rowToSelect);
					innerInput.setSelectionRange(rowValue.length, rowValue.length);

					e.preventDefault();
					this._selectRow(rowToSelect, true);
					return;
				}

				this.open = false;
			}
		}

		super._onkeydown(e);
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

	_handleEscape() {
		if (!this._useTableSuggestions || !this.open) {
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
		this._deselectAllRows();
	}

	get _hasTabularSuggestions(): boolean {
		return this._useTableSuggestions && this._visibleRows.length > 0;
	}

	get _columnsCount(): number {
		return this.suggestionColumns.length;
	}

	get _isRowFocused(): boolean {
		return this._useTableSuggestions && this._visibleRows.some(row => row.focused);
	}

	get _isSuggestionsFocused(): boolean {
		return this._isRowFocused;
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

		const positionText = InputField.i18nBundle.getText(ROW_ITEM_POSITION, rowIndex + 1, this._visibleRows.length);

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

		const scrollContainer = popover.querySelector<HTMLElement>(".ui5-input-table-suggest-wrapper");
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
	_shouldSkipFocusOut(toBeFocused: HTMLElement): boolean {
		const popover = this._getTabularPopover();
		return !!(popover?.contains(toBeFocused) || this.contains(toBeFocused));
	}

	/**
	 * Override focusout handler for additional cleanup
	 * @private
	 */
	_onfocusout(e: FocusEvent) {
		const toBeFocused = e.relatedTarget as HTMLElement;

		if (this._shouldSkipFocusOut(toBeFocused)) {
			return;
		}

		this.focused = false;
		this.open = false;
		this.isTyping = false;
		this.lastConfirmedValue = "";
		this._rowFocused = false;
		this._clearPopoverFocusAndSelection();
	}

	// ======================= Suggestion-specific getters =======================

	get _headerTitleText() {
		return this._associatedLabelsTexts || InputField.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get suggestionsText() {
		return InputField.i18nBundle.getText(INPUT_SUGGESTIONS);
	}

	get _suggestionsOkButtonText() {
		return InputField.i18nBundle.getText(INPUT_SUGGESTIONS_OK_BUTTON);
	}

	get _suggestionsCancelButtonText() {
		return InputField.i18nBundle.getText(INPUT_SUGGESTIONS_CANCEL_BUTTON);
	}

	_afterOpenPicker() {
		this.fireDecoratorEvent("open");
	}

	_afterClosePicker() {
		this.fireDecoratorEvent("close");
		this._deselectAllRows();
		this._rowFocused = false;
	}

	_confirmMobileValue() {
		const focusedRow = this._visibleRows.find(row => row.focused);
		if (focusedRow) {
			this._selectRow(focusedRow, false);
		}
		this.open = false;
	}

	_cancelMobileValue() {
		this.value = this.typedInValue || "";
		this.open = false;
		this._deselectAllRows();
	}

	get styles() {
		const remSizeInPx = parseInt(getComputedStyle(document.documentElement).fontSize);
		const inputWidth = this._inputWidth || 0;

		return {
			innerInput: {
				"padding": "",
			},
			suggestionsPopover: {
				"min-width": inputWidth ? `${inputWidth}px` : "",
				"max-width": inputWidth && (inputWidth / remSizeInPx) > 40 ? `${inputWidth}px` : "40rem",
			},
			suggestionPopoverHeader: {
				"display": "inline-block",
				"width": "100%",
				"max-width": "inherit",
			},
		};
	}
}

InputTableSuggest.define();

export default InputTableSuggest;
export type {
	ITableSuggestionRow,
	InputTableSuggestSelectionChangeEventDetail,
};
