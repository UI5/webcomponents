import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	isSpace,
	isEnter,
	isF7,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getLastTabbableElement } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import type TableCell from "./TableCell.js";
import type { ITableRow, TableColumnInfo } from "./Table.js";
import TableMode from "./types/TableMode.js";
import TableRowType from "./types/TableRowType.js";
import TableColumnPopinDisplay from "./types/TableColumnPopinDisplay.js";
import TableRowTemplate from "./TableRowTemplate.js";
import {
	ARIA_LABEL_ROW_SELECTION,
	LIST_ITEM_NOT_SELECTED,
	LIST_ITEM_SELECTED,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import tableRowStyles from "./generated/themes/TableRow.css.js";
import { patchScopingSuffix } from "./utils/CompatCustomElementsScope.js";

type TableRowClickEventDetail = {
	row: TableRow,
}

type TableRowSelectionRequestedEventDetail = {
	row: TableRow,
}

type TableRowForwardBeforeEventDetail = {
	target: HTMLElement,
}

type TableRowForwardAfterEventDetail = {
	target: HTMLElement,
}

type TableRowF7PressEventDetail = {
	row: TableRow,
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row` component represents a row in the `ui5-table`.
 * @constructor
 * @extends UI5Element
 * @implements {ITableRow}
 * @public
 * @csspart row - Used to style the native `tr` element
 * @csspart popin-row - Used to style the `tr` element when a row pops in
 * @deprecated Deprecated as of version 2.12.0, use `@ui5/webcomponents/dist/TableRow.js` instead.
 */
@customElement({
	tag: "ui5-table-row",
	styles: tableRowStyles,
	renderer: jsxRenderer,
	template: TableRowTemplate,
})
/**
 * Fired when a row in `Active` mode is clicked or `Enter` key is pressed.
 * @since 2.0.0
 * @private
 */
@event("row-click", {
	bubbles: true,
})
/**
 * @private
 */
@event("_focused", {
	bubbles: true,
})
/**
 * @private
 */
@event("forward-before", {
	bubbles: true,
})
/**
 * @private
 */
@event("forward-after", {
	bubbles: true,
})
/**
 * Fired on selection change of an active row.
 * @since 2.0.0
 * @private
 */
@event("selection-requested", {
	bubbles: true,
})
/**
 * Fired when F7 is pressed.
 * @since 2.0.0
 * @private
 */
@event("f7-pressed", {
	bubbles: true,
})
class TableRow extends UI5Element implements ITableRow {
	eventDetails!: {
		"row-click": TableRowClickEventDetail,
		"_focused": FocusEvent,
		"forward-before": TableRowForwardBeforeEventDetail,
		"forward-after": TableRowForwardAfterEventDetail,
		"selection-requested": TableRowSelectionRequestedEventDetail,
		"f7-pressed": TableRowF7PressEventDetail,
	}
	/**
	 * Defines the visual indication and behavior of the component.
	 *
	 * **Note:** When set to `Active`, the item will provide visual response upon press,
	 * while with type `Inactive`-will not.
	 * @default "Inactive"
	 * @since 2.0.0
	 * @public
	 */
	@property()
	type: `${TableRowType}` = "Inactive";

	/**
	 * Defines the row's selected state.
	 * @default false
	 * @since 2.0.0
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Indicates if the table row is navigated.
	 * @default false
	 * @since 2.0.0
	 * @public
	 */
	@property({ type: Boolean })
	navigated = false;

	/**
	 * Defines the mode of the row (None, SingleSelect, MultiSelect).
	 * @default "None"
	 * @since 2.0.0
	 * @private
	 */
	@property()
	mode: `${TableMode}` = "None";

	/**
	 * Indicates if the table row is active.
	 * @default false
	 * @since 2.0.0
	 * @private
	 */
	@property({ type: Boolean })
	active = false;

	@property({ type: Array })
	_columnsInfo?: Array<TableColumnInfo>;

	@property()
	forcedTabIndex?: string;

	@property({ type: Boolean })
	forcedBusy = false;

	@property({ noAttribute: true })
	forcedAriaPosition?: string;

	/**
	 * Defines the cells of the component.
	 *
	 * **Note:** Use `ui5-table-cell` for the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, individualSlots: true })
	cells!: DefaultSlot<TableCell>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	visibleCells: Array<TableCell> = [];
	popinCells: Array<TableColumnInfo> = [];

	// Properties, set and handled by the Table
	tabbableElements: Array<HTMLElement> = [];
	_columnsInfoString = "";

	_ontouchstart() {
		this.activate();
	}

	_onmouseup() {
		this.deactivate();
	}

	_onkeydown(e: KeyboardEvent) {
		const activeElement = getActiveElement() as HTMLElement;
		const itemActive = this.type === TableRowType.Active;
		const isSingleSelect = this.isSingleSelect;
		const itemSelectable = isSingleSelect || this.isMultiSelect;
		const isRowFocused = this._activeElementHasAttribute("ui5-table-row");
		const target = e.target as HTMLElement;
		const checkboxPressed = target.classList.contains("ui5-multi-select-checkbox");
		const rowElements = Array.from(this.shadowRoot!.querySelectorAll("tr") || []);
		const elements = rowElements.map(getLastTabbableElement).filter(Boolean);
		const lastFocusableElement = elements.pop();

		if (isTabNext(e) && activeElement === (lastFocusableElement || this.root)) {
			this.fireDecoratorEvent("forward-after", { target: activeElement });
		}

		if (isTabPrevious(e) && activeElement === this.root) {
			this.fireDecoratorEvent("forward-before", { target: activeElement });
		}

		if (isSpace(e) && target.tagName.toLowerCase() === "tr") {
			e.preventDefault();
		}

		if (isRowFocused && !checkboxPressed) {
			if ((isSpace(e) && itemSelectable) || (isEnter(e) && isSingleSelect)) {
				this.fireDecoratorEvent("selection-requested", { row: this });
			}

			if (isEnter(e) && itemActive) {
				this.fireDecoratorEvent("row-click", { row: this });
				if (!isSingleSelect) {
					this.activate();
				}
			}
		}

		if (isF7(e)) {
			e.preventDefault();
			this.fireDecoratorEvent("f7-pressed", { row: this });
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.deactivate();
		}
	}

	_ontouchend() {
		this.deactivate();
	}

	_onfocusout() {
		this.deactivate();
	}

	_onfocusin(e: FocusEvent, forceSelfFocus = false) {
		if (forceSelfFocus || this._activeElementHasAttribute("ui5-table-cell")) {
			this.root.focus();
			this.activate();
		}

		this.fireDecoratorEvent("_focused");
	}

	_onrowclick(e: MouseEvent) {
		const checkboxPressed = (e.target as HTMLElement).classList.contains("ui5-multi-select-checkbox");
		// If the user tab over a button on IOS device, the document.activeElement
		// is the ui5-table-row. The check below ensure that, if a button within the row is pressed,
		// the row will not be selected.

		if (this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			return;
		}

		const activeElement = (this.getRootNode() as Document).activeElement;
		if (!this.contains(activeElement)) {
			// If the user clickes on non-focusable element within the ui5-table-cell,
			// the focus goes to the body, se we have to bring it back to the row.
			// If the user clicks on input, button or similar clickable element,
			// the focus remains on that element.
			this._onfocusin(e, true /* force row focus */);
			this.deactivate();
		}

		if (this._activeElementHasAttribute("ui5-table-row")) {
			if (this.isSingleSelect) {
				this._handleSelection();
			}

			if (this.type === TableRowType.Active && !checkboxPressed) {
				this.fireDecoratorEvent("row-click", { row: this });
			}
		}
	}

	_handleSelection() {
		this.fireDecoratorEvent("selection-requested", { row: this });
	}

	_activeElementHasAttribute(attr: string): boolean {
		return !!((this.getRootNode() as Document).activeElement?.hasAttribute(attr));
	}

	get _ariaCurrent() {
		return this.navigated ? true : undefined;
	}

	activate() {
		if (this.type === TableRowType.Active) {
			this.active = true;
		}
	}

	deactivate() {
		if (this.active) {
			this.active = false;
		}
	}

	get shouldPopin(): boolean {
		return !!(this._columnsInfo?.filter(el => {
			return el.demandPopin || !el.visible;
		}).length);
	}

	get allColumnsPoppedIn() {
		return this._columnsInfo?.every(el => el.demandPopin && !el.visible);
	}

	onBeforeRendering() {
		if (!this.shouldPopin) {
			return;
		}

		this.visibleCells = [];
		this.popinCells = [];

		if (this.cells.length === 0) {
			return;
		}

		const allColumnsPoppedInClass = this.allColumnsPoppedIn ? "all-columns-popped-in" : "";
		this._columnsInfo?.forEach((info, index) => {
			const cell = this.cells[index];
			const popinDisplay = info.popinDisplay === TableColumnPopinDisplay.Inline;

			if (!cell) {
				return;
			}

			if (info.visible) {
				this.visibleCells.push(cell);
				cell.popined = false;
				cell._popinedInline = false;
			} else if (info.demandPopin) {
				const popinHeaderClass = this.popinCells.length === 0 ? "popin-header" : "";
				this.popinCells.push({
					cell,
					popinText: info.popinText,
					classes: `ui5-table-popin-row ${allColumnsPoppedInClass} ${popinHeaderClass}`,
					popinDisplayInline: popinDisplay,
				});
				cell.popined = true;
				if (info.popinDisplay === TableColumnPopinDisplay.Inline) {
					cell._popinedInline = true;
				}
			} else {
				cell.popined = false;
				cell._popinedInline = false;
			}
		});

		const lastVisibleCell = this.visibleCells[this.visibleCells.length - 1];

		if (lastVisibleCell) {
			lastVisibleCell.lastInRow = true;
		}
	}

	get visibleCellsCount() {
		let visibleCellsCount = this.visibleCells.length;

		if (this.isMultiSelect) {
			visibleCellsCount += 1;
		}

		return visibleCellsCount;
	}

	get ariaLabelText() {
		const isSelected = this.selected ? TableRow.i18nBundle.getText(LIST_ITEM_SELECTED) : TableRow.i18nBundle.getText(LIST_ITEM_NOT_SELECTED);
		const isRowSelectable = this.isSingleSelect || this.isMultiSelect;
		const ariaLabel = this.cells.map((cell, index) => {
			const columText = this.getColumnTextByIdx(index);
			const cellText = cell.cellContent.length ? this.getCellText(cell) : cell.ariaLabelEmptyCellText;
			return `${columText} ${cellText}`;
		}).join(" ");

		if (isRowSelectable) {
			return `${ariaLabel}. ${this.forcedAriaPosition}. ${isSelected}`;
		}

		return `${ariaLabel}. ${this.forcedAriaPosition}`;
	}

	get ariaLabelRowSelection() {
		return TableRow.i18nBundle.getText(ARIA_LABEL_ROW_SELECTION);
	}

	get isSingleSelect() {
		return this.mode === TableMode.SingleSelect;
	}

	get isMultiSelect() {
		return this.mode === TableMode.MultiSelect;
	}

	get root() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-table-row-root")!;
	}

	getCellText(cell: TableCell): string {
		const cellTextContent = cell.textContent;

		return cellTextContent ? this.getNormilzedTextContent(cellTextContent) : "";
	}

	getColumnTextByIdx(index: number): string {
		const columnInfo: TableColumnInfo | undefined = this._columnsInfo?.[index];

		if (!columnInfo) {
			return "";
		}

		return columnInfo.text ? this.getNormilzedTextContent(columnInfo.text) : "";
	}

	getNormilzedTextContent(textContent: string): string {
		return textContent.replace(/[\n\r\t]/g, "").trim();
	}
}

patchScopingSuffix(TableRow);

TableRow.define();

export default TableRow;

export type {
	TableRowClickEventDetail,
	TableRowSelectionRequestedEventDetail,
	TableRowForwardBeforeEventDetail,
	TableRowForwardAfterEventDetail,
	TableRowF7PressEventDetail,
};
