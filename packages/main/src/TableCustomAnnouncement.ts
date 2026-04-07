import TableExtension from "./TableExtension.js";
import { getCustomAnnouncement, applyCustomAnnouncement } from "./CustomAnnouncement.js";
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

		const tableElementName = tableAttribute.replace("ui5-table", "Table").replace(/-([a-z])/g, g => g[1].toUpperCase());
		const eventHandlerName = `_handle${tableElementName}Focusin` as keyof TableCustomAnnouncement;
		const eventHandler = this[eventHandlerName] as (target: HTMLElement, e?: FocusEvent) => void;
		if (typeof eventHandler === "function") {
			eventHandler.call(this, eventOrigin, e);
		} else {
			this._handleTableElementFocusin(eventOrigin);
		}
	}

	_onfocusout(e: FocusEvent, eventOrigin: HTMLElement) {
		const isTableElement = this._tableAttributes.some(attr => eventOrigin.hasAttribute(attr));
		isTableElement && applyCustomAnnouncement(eventOrigin);
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
}

export default TableCustomAnnouncement;
