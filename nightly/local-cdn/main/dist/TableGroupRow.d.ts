import TableRow from "./TableRow.js";
import type TableCell from "./TableCell.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-group-row` component represents a group header row in the `ui5-table`.
 * It is used to visually group rows and spans across all visible table columns.
 *
 * ### Usage
 *
 * The `ui5-table-group-row` is placed as a direct child of `ui5-table`, alongside `ui5-table-row` elements.
 * Rows following a group row are considered part of that group until the next group row.
 *
 * ```html
 * <ui5-table>
 *   <ui5-table-header-row>...</ui5-table-header-row>
 *   <ui5-table-group-row>Country: Germany</ui5-table-group-row>
 *   <ui5-table-row>...</ui5-table-row>
 *   <ui5-table-row>...</ui5-table-row>
 *   <ui5-table-group-row>Country: France</ui5-table-group-row>
 *   <ui5-table-row>...</ui5-table-row>
 * </ui5-table>
 * ```
 *
 * ### Unsupported Features
 *
 * The following features of `ui5-table-row` are currently not supported by `ui5-table-group-row` and have no effect:
 *
 * - **Cells** (`cells` slot): Group rows render a single spanning cell with a text. Any slotted `ui5-table-cell` elements are ignored.
 * - **Actions** (`actions` slot): Row actions such as `ui5-table-row-action` or `ui5-table-row-action-navigation` are not rendered.
 * - **Navigation** (`navigated` property): The navigated indicator is not rendered on group rows.
 * - **Interactive** (`interactive` property): Group rows do not support click/activation behavior.
 * - **Selection** (`rowKey` property`): Group rows cannot be selected. They are excluded from select all and range selection operations.
 * - **Virtualizer** (`position` property`): Group rows are not supported by the `ui5-table-virtualizer`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableGroupRow.js";`
 *
 * @constructor
 * @extends TableRow
 * @since 2.23.0
 * @public
 */
declare class TableGroupRow extends TableRow {
    _groupCell: TableCell;
    constructor();
    isGroupRow(): boolean;
    onEnterDOM(): void;
    get _tableSelection(): undefined;
    get _hasSelector(): boolean;
    get _isSelectable(): boolean;
    get _isInteractive(): boolean;
    get _isNavigable(): boolean;
    get _hasPopin(): boolean;
    get _ariaColSpan(): number;
}
export default TableGroupRow;
