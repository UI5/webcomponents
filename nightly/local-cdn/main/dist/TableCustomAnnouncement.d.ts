import TableExtension from "./TableExtension.js";
import type Table from "./Table.js";
import type TableRow from "./TableRow.js";
import type TableCell from "./TableCell.js";
import type TableHeaderRow from "./TableHeaderRow.js";
/**
 * Handles the custom announcement for the ui5-table.
 *
 * @class
 * @private
 */
declare class TableCustomAnnouncement extends TableExtension {
    _table: Table;
    _tableAttributes: string[];
    constructor(table: Table);
    private get i18nBundle();
    _onfocusin(e: FocusEvent, eventOrigin: HTMLElement): void;
    _onfocusout(e: FocusEvent, eventOrigin: HTMLElement): void;
    _handleTableElementFocusin(element: HTMLElement): void;
    _handleTableHeaderRowFocusin(headerRow: TableHeaderRow): void;
    _handleTableRowFocusin(row: TableRow): void;
    _handleTableCellFocusin(cell: TableCell): void;
}
export default TableCustomAnnouncement;
