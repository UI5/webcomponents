import TableExtension from "./TableExtension.js";
import { getCustomAnnouncement, applyCustomAnnouncement } from "./CustomAnnouncement.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import type Table from "./Table.js";
import type TableRow from "./TableRow.js";
import type TableCell from "./TableCell.js";
import type TableHeaderRow from "./TableHeaderRow.js";
import {
	TABLE_ROW,
	TABLE_ROW_INDEX,
	TABLE_ROW_SELECTED,
	TABLE_ROW_ACTIVE,
	TABLE_ROW_NAVIGABLE,
	TABLE_ROW_NAVIGATED,
	TABLE_COLUMN_HEADER_ROW,
	TABLE_ENTERING,
	TABLE_ENTERING_MULTI_SELECTABLE,
	TABLE_ENTERING_SELECTED,
	TABLE_ROW_SELECTED_LIVE,
	TABLE_ROW_NOT_SELECTED_LIVE,
} from "./generated/i18n/i18n-defaults.js";

/**
 * Handles the custom announcement for the ui5-table.
 *
 * @class
 * @private
 */
class TableCustomAnnouncement extends TableExtension {
	_table: Table;
	_tableAttributes = ["ui5-table-header-row", "ui5-table-header-cell", "ui5-table-row", "ui5-table-cell"];
	_hasBeenFocused = false;
	_focusLeaveTimer?: ReturnType<typeof setTimeout>;

	constructor(table: Table) {
		super();
		this._table = table;
	}

	private get i18nBundle() {
		return (this._table.constructor as typeof Table).i18nBundle;
	}

	_onfocusin(e: FocusEvent, eventOrigin: HTMLElement) {
		const tableAttribute = this._tableAttributes.find(attr => eventOrigin.hasAttribute(attr));
		if (!tableAttribute) {
			return;
		}

		// Cancel any pending focus-leave timer, since focus is still in the table
		if (this._focusLeaveTimer) {
			clearTimeout(this._focusLeaveTimer);
			this._focusLeaveTimer = undefined;
		}

		const tableElementName = tableAttribute.replace("ui5-table", "Table").replace(/-([a-z])/g, g => g[1].toUpperCase());
		const eventHandlerName = `_handle${tableElementName}Focusin` as keyof TableCustomAnnouncement;
		const eventHandler = this[eventHandlerName] as (target: HTMLElement, e?: FocusEvent) => void;
		if (typeof eventHandler === "function") {
			eventHandler.call(this, eventOrigin, e);
		} else {
			this._handleTableElementFocusin(eventOrigin);
		}
	}

	_onfocusout(_e: FocusEvent, eventOrigin: HTMLElement) {
		const isTableElement = this._tableAttributes.some(attr => eventOrigin.hasAttribute(attr));
		isTableElement && applyCustomAnnouncement(eventOrigin);

		// Schedule a focus-leave check. If no focusin follows within the same
		// event cycle (i.e., focus truly left the table), reset the entering flag.
		// Internal navigation (row-to-row) will cancel this via _onfocusin.
		this._focusLeaveTimer = setTimeout(() => {
			this._focusLeaveTimer = undefined;
			this._hasBeenFocused = false;
		}, 0);
	}

	_handleTableElementFocusin(element: HTMLElement) {
		const description = getCustomAnnouncement(element);
		applyCustomAnnouncement(element, description);
	}

	_handleTableHeaderRowFocusin(headerRow: TableHeaderRow) {
		const descriptions = [
			this.i18nBundle.getText(TABLE_COLUMN_HEADER_ROW),
		];

		if (headerRow._hasSelector) {
			descriptions.push(headerRow._isMultiSelect ? headerRow._selectionCellAriaDescription! : headerRow._i18nSelection);
		}

		headerRow._visibleCells.forEach(headerCell => {
			const cellDescription = getCustomAnnouncement(headerCell, { lessDetails: true });
			descriptions.push(cellDescription);
		});

		if (headerRow._rowActionCount > 0) {
			descriptions.push(headerRow._i18nRowActions);
		}

		applyCustomAnnouncement(headerRow, descriptions);
	}

	_handleTableRowFocusin(row: TableRow) {
		if (!row._table) {
			return;
		}

		const identifierCell = row._identifierCell;
		const identifierHeaderCell = row._identifierHeaderCell;

		if (identifierHeaderCell && identifierCell) {
			this._handleTableRowFocusinNew(row, identifierHeaderCell, identifierCell);
		} else {
			this._handleTableRowFocusinLegacy(row);
		}
	}

	/**
	 * New announcement format when identifier column is set:
	 * [entering] → identifier value → "Row" → highlight → highlightText → actions → position
	 */
	_handleTableRowFocusinNew(row: TableRow, identifierHeaderCell: HTMLElement, identifierCell: TableCell) {
		const descriptions: string[] = [];

		// Entering-the-table one-time announcement
		if (!this._hasBeenFocused) {
			this._hasBeenFocused = true;
			const enteringDescription = this._getEnteringDescription();
			if (enteringDescription) {
				descriptions.push(enteringDescription);
			}
		}

		// Identifier column value (header text + cell value)
		const headerText = getCustomAnnouncement(identifierHeaderCell, { lessDetails: true });
		const cellText = getCustomAnnouncement(identifierCell, { lessDetails: true });
		descriptions.push(`${headerText} ${cellText}`.trim());

		// Role: "Row"
		descriptions.push(this.i18nBundle.getText(TABLE_ROW));

		// Highlight state
		const highlightDescription = row._highlightDescription;
		if (highlightDescription) {
			descriptions.push(highlightDescription);
			if (row.highlightText) {
				descriptions.push(row.highlightText);
			}
		}

		// Actions
		const actionDescription = row._actionDescriptionText;
		if (actionDescription) {
			descriptions.push(actionDescription);
		}

		// Position: "X of Y"
		descriptions.push(this.i18nBundle.getText(TABLE_ROW_INDEX, row.ariaRowIndex as string, this._table._ariaRowCount));

		applyCustomAnnouncement(row, descriptions);
	}

	/**
	 * Original announcement format when no identifier column is set:
	 * "Row" → position → selected → navigable/active → ALL cells → actions count → navigated
	 */
	_handleTableRowFocusinLegacy(row: TableRow) {
		const descriptions = [
			this.i18nBundle.getText(TABLE_ROW),
			this.i18nBundle.getText(TABLE_ROW_INDEX, row.ariaRowIndex!, this._table._ariaRowCount),
		];

		if (row._isSelected) {
			descriptions.push(this.i18nBundle.getText(TABLE_ROW_SELECTED));
		}

		if (row._isNavigable) {
			descriptions.push(this.i18nBundle.getText(TABLE_ROW_NAVIGABLE));
		} else if (row.interactive) {
			descriptions.push(this.i18nBundle.getText(TABLE_ROW_ACTIVE));
		}

		const cells = [...row._visibleCells, ...row._popinCells];
		cells.flatMap(cell => {
			return cell._popin ? [cell._popinHeader!, cell._popinContent!] : [cell._headerCell!, cell];
		}).forEach(node => {
			const nodeDescription = getCustomAnnouncement(node, { lessDetails: true });
			descriptions.push(nodeDescription);
		});

		if (row._availableActionsCount > 0) {
			descriptions.push(row._actionCellAccText!);
		}

		if (row._renderNavigated && row.navigated) {
			descriptions.push(this.i18nBundle.getText(TABLE_ROW_NAVIGATED));
		}

		applyCustomAnnouncement(row, descriptions);
	}

	_handleTableCellFocusin(cell: TableCell) {
		if (cell.hasAttribute("data-ui5-table-popin-cell")) {
			const popinCells = (cell.getDomRef() as HTMLSlotElement).assignedNodes({ flatten: true }) as TableCell[];
			const descriptions = popinCells.flatMap(popinCell => {
				const headerDescription = getCustomAnnouncement(popinCell._popinHeader!);
				const contentDescription = getCustomAnnouncement(popinCell._popinContent!);
				return [headerDescription, contentDescription];
			});
			applyCustomAnnouncement(cell, descriptions);
		} else {
			this._handleTableElementFocusin(cell);
		}
	}

	_getEnteringDescription(): string | undefined {
		const tableLabel = this._table._ariaLabel || this._table._ariaDescription || "";
		const rowCount = this._table.rows.length;
		if (!tableLabel && rowCount === 0) {
			return undefined;
		}

		const parts = [this.i18nBundle.getText(TABLE_ENTERING, tableLabel, rowCount)];

		const selection = this._table._getSelection();
		if (selection?.hasAttribute("ui5-table-selection-multi")) {
			parts.push(this.i18nBundle.getText(TABLE_ENTERING_MULTI_SELECTABLE));
			const selectedCount = this._table.rows.filter(r => r._isSelected).length;
			if (selectedCount > 0) {
				parts.push(this.i18nBundle.getText(TABLE_ENTERING_SELECTED, selectedCount));
			}
		}

		return parts.join(" , ");
	}

	/**
	 * Announces the selection state change via InvisibleMessage.
	 * Called by selection features after selection changes.
	 */
	announceSelectionChange(selectedCount: number, isSelected: boolean) {
		const bundleKey = isSelected ? TABLE_ROW_SELECTED_LIVE : TABLE_ROW_NOT_SELECTED_LIVE;
		const text = this.i18nBundle.getText(bundleKey, selectedCount);
		announce(text, InvisibleMessageMode.Assertive);
	}
}

export default TableCustomAnnouncement;
