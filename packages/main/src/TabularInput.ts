import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isPhone, isAndroid } from "@ui5/webcomponents-base/dist/Device.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
// @ts-expect-error
import encodeXML from "@ui5/webcomponents-base/dist/sap/base/security/encodeXML.js";

import Input from "./Input.js";
import type { IInputSuggestionItem } from "./Input.js";
import type TableHeaderCell from "./TableHeaderCell.js";
import type TableCell from "./TableCell.js";
import type ResponsivePopover from "./ResponsivePopover.js";

import TabularInputTemplate from "./TabularInputTemplate.js";
import tabularInputStyles from "./generated/themes/TabularInput.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";

import {
	INPUT_SUGGESTIONS,
	INPUT_SUGGESTIONS_MORE_HITS,
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

type TabularInputRowSelectEventDetail = {
	row: ITabularSuggestionRow;
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

/**
 * Fired when a suggestion row is selected.
 * @param {ITabularSuggestionRow} row The selected row instance
 * @public
 */
@event("row-select", {
	bubbles: true,
})

class TabularInput extends Input {
	// @ts-expect-error - Intentionally override selection-change to use 'row' instead of 'item'
	eventDetails!: Omit<Input["eventDetails"], "selection-change"> & {
		"row-select": TabularInputRowSelectEventDetail,
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

	/**
	 * Override: For tabular suggestions, we always show suggestions
	 * (we don't use the parent's showSuggestions property)
	 */
	get _effectiveShowSuggestions() {
		if (this._useTabularSuggestions) {
			return true;
		}
		return super._effectiveShowSuggestions;
	}

	/**
	 * Override: Return tabular rows as suggestion items for the parent's hasItems check
	 * This ensures the parent's open logic works correctly
	 */
	get _flattenItems(): Array<IInputSuggestionItem> {
		if (this._useTabularSuggestions) {
			return this.suggestionRows as unknown as Array<IInputSuggestionItem>;
		}
		return super._flattenItems;
	}

	onBeforeRendering() {
		this._useTabularSuggestions = this.suggestionColumns.length > 0 && this.suggestionRows.length > 0;

		if (this._useTabularSuggestions) {
			if (this.filter !== "None" && this.typedInValue) {
				this._filterTabularRows();
			} else {
				this._resetRowVisibility();
			}

			this._handleTabularPopoverOpen();
			this._handleTabularTypeAhead();

			this._effectiveShowClearIcon = (this.showClearIcon && !!this.value && !this.readonly && !this.disabled);
			this.style.setProperty("--_ui5-input-icons-count", `${this.iconsCount}`);
			return;
		}

		super.onBeforeRendering();
	}

	/**
	 * @private
	 */
	_handleTabularPopoverOpen() {
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
		if (this._useTabularSuggestions) {
			if (this._performTextSelection) {
				if (this.typedInValue.length && this.value.length) {
					this._adjustSelectionRange();
				}
				this.fireDecoratorEvent("type-ahead");
			}
			this._performTextSelection = false;
			return;
		}

		super.onAfterRendering();
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
	 * @private
	 */
	_filterTabularRows() {
		const typedValue = this.typedInValue;
		const typedValueLower = typedValue.toLowerCase();

		this._processedRows = [];

		this.suggestionRows.forEach(row => {
			const cells = row.cells || [];
			let matches = false;

			const processedCells: HighlightedCellContent[] = cells.map(cell => {
				const cellText = cell.textContent?.trim() || "";
				const cellMatches = this._matchesStartsWithPerTerm(cellText, typedValueLower);

				if (cellMatches) {
					matches = true;
				}

				const highlightedMarkup = typedValue
					? this._generateStartsWithPerTermHighlight(cellText, typedValue)
					: encodeXML(cellText);

				return {
					text: cellText,
					highlightedMarkup,
				};
			});

			(row as UI5Element).hidden = !matches;

			if (matches) {
				this._processedRows.push({
					row,
					cells: processedCells,
				});
			}
		});
	}

	/**
	 * @private
	 */
	_matchesStartsWithPerTerm(text: string, valueLower: string): boolean {
		if (!valueLower) {
			return true;
		}
		const textLower = text.toLowerCase();
		const reg = new RegExp(`(^|\\s)${this._escapeRegExp(valueLower)}`, "i");
		return reg.test(textLower);
	}

	/**
	 * @private
	 */
	_escapeRegExp(str: string): string {
		return str.replace(/[[\]{}()*+?.\\^$|]/g, "\\$&");
	}

	/**
	 * Generates highlighted markup using StartsWithPerTerm logic.
	 * Highlights the typed value when it appears at the start of the text or at the start of any word.
	 * @private
	 */
	_generateStartsWithPerTermHighlight(text: string, value: string): string {
		if (!text || !value) {
			return encodeXML(text);
		}

		const valueLower = value.toLowerCase();
		const valueLength = value.length;

		// Find all positions where the value starts at beginning of text or after whitespace
		const positions: Array<{ start: number; end: number }> = [];
		const textLower = text.toLowerCase();

		// Check start of string
		if (textLower.startsWith(valueLower)) {
			positions.push({ start: 0, end: valueLength });
		}

		// Check after each whitespace
		let searchStart = 0;
		while (searchStart < text.length) {
			const spaceIndex = text.indexOf(" ", searchStart);
			if (spaceIndex === -1) {
				break;
			}

			const wordStart = spaceIndex + 1;
			if (wordStart < text.length && textLower.substring(wordStart).startsWith(valueLower)) {
				positions.push({ start: wordStart, end: wordStart + valueLength });
			}
			searchStart = spaceIndex + 1;
		}

		if (positions.length === 0) {
			return encodeXML(text);
		}

		let result = "";
		let lastEnd = 0;

		for (const pos of positions) {
			if (pos.start > lastEnd) {
				result += encodeXML(text.substring(lastEnd, pos.start));
			}
			result += `<b>${encodeXML(text.substring(pos.start, pos.end))}</b>`;
			lastEnd = pos.end;
		}

		if (lastEnd < text.length) {
			result += encodeXML(text.substring(lastEnd));
		}

		return result;
	}

	/**
	 * @private
	 */
	_resetRowVisibility() {
		const typedValue = this.typedInValue;
		this._processedRows = [];

		this.suggestionRows.forEach(row => {
			(row as UI5Element).hidden = false;

			const cells = row.cells || [];
			const processedCells: HighlightedCellContent[] = cells.map(cell => {
				const cellText = cell.textContent?.trim() || "";
				const highlightedMarkup = typedValue
					? this._generateStartsWithPerTermHighlight(cellText, typedValue)
					: encodeXML(cellText);

				return {
					text: cellText,
					highlightedMarkup,
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
		return this._processedRows.filter(pr => !(pr.row as UI5Element).hidden);
	}

	_onSuggestionRowClick(row: ITabularSuggestionRow) {
		this._selectRow(row, false);
	}

	_selectRow(row: ITabularSuggestionRow, keyboardUsed: boolean) {
		const rowValue = this._getRowValue(row);

		this.value = rowValue;
		this.typedInValue = rowValue;
		this.open = false;

		this.fireDecoratorEvent("selection-change", {
			row,
		});
		this.fireDecoratorEvent("row-select", { row });
		this.fireDecoratorEvent("change");
		this.fireDecoratorEvent("input", { inputType: "" });

		this._deselectAllRows();
		row.selected = true;
		this._matchedTabularRow = undefined;
		this._rowFocused = false;
		this.isTyping = false;

		if (!keyboardUsed && !isPhone()) {
			this.focus();
		}
	}

	_getRowValue(row: ITabularSuggestionRow): string {
		const cells = row.cells || [];

		if (cells.length > 0) {
			return cells[0].textContent?.trim() || "";
		}

		return "";
	}

	_deselectAllRows() {
		this.suggestionRows.forEach(row => {
			row.selected = false;
			row.focused = false;
		});
	}

	_handleDown(e: KeyboardEvent) {
		if (this._useTabularSuggestions && this.open) {
			e.preventDefault();
			this._navigateRows(true);
			return;
		}
		super._handleDown(e);
	}

	_handleUp(e: KeyboardEvent) {
		if (this._useTabularSuggestions && this.open) {
			e.preventDefault();
			this._navigateRows(false);
			return;
		}
		super._handleUp(e);
	}

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

		this.fireDecoratorEvent("selection-change", {
			row: visibleRows[nextIndex],
		});
	}

	_handleEnter(e: KeyboardEvent) {
		if (this._useTabularSuggestions) {
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
					this._selectRow(rowToSelect, true);
				} else {
					this.fireSelectionChange(rowToSelect as unknown as IInputSuggestionItem, true);
					this._selectRow(rowToSelect, true);
				}
				return;
			}

			if (this.open) {
				this.open = false;
			}
			this.lastConfirmedValue = this.value;
			return;
		}
		super._handleEnter(e);
	}

	_handleEscape() {
		if (this._useTabularSuggestions && this.open) {
			this.value = this.typedInValue || this.valueBeforeSelectionStart;
			this.open = false;
			this._deselectAllRows();
			this._matchedTabularRow = undefined;
			this._rowFocused = false;
			this.isTyping = false;
			return;
		}
		super._handleEscape();
	}

	_clearPopoverFocusAndSelection() {
		if (this._useTabularSuggestions) {
			this._deselectAllRows();
			this.hasSuggestionItemSelected = false;
			return;
		}
		super._clearPopoverFocusAndSelection();
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
	 * Returns the accessible name for the suggestions popover
	 * @private
	 */
	get _tabularSuggestionsAccessibleName(): string {
		return Input.i18nBundle.getText(INPUT_SUGGESTIONS);
	}

	/**
	 * Returns the count text for available suggestions
	 * @private
	 */
	get _tabularSuggestionsCountText(): string {
		return Input.i18nBundle.getText(INPUT_SUGGESTIONS_MORE_HITS, this._visibleRows.length);
	}

	/**
	 * Returns the ID of the currently focused row for aria-activedescendant
	 * @private
	 */
	get _activeDescendantId(): string | undefined {
		const focusedRow = this._visibleRows.find(row => row.focused);
		if (focusedRow) {
			const index = this._visibleRows.indexOf(focusedRow);
			return `${this._id}-row-${index}`;
		}
		return undefined;
	}

	/**
	 * Returns the tabular suggestions popover element
	 * @private
	 */
	_getTabularPopover() {
		return this.shadowRoot?.querySelector<ResponsivePopover>(".ui5-suggestions-popover");
	}

	/**
	 * Override focusout handler to prevent closing popover when clicking inside it
	 * @private
	 */
	_onfocusout(e: FocusEvent) {
		if (this._useTabularSuggestions) {
			const toBeFocused = e.relatedTarget as HTMLElement;
			const popover = this._getTabularPopover();

			if (popover?.contains(toBeFocused) || this.contains(toBeFocused)) {
				return;
			}

			this.focused = false;
			this.open = false;
			this._clearPopoverFocusAndSelection();
			return;
		}

		super._onfocusout(e);
	}
}

TabularInput.define();

export default TabularInput;
export type {
	ITabularSuggestionRow,
	TabularInputRowSelectEventDetail,
	TabularInputSelectionChangeEventDetail,
};
