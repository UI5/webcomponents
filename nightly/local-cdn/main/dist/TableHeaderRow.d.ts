import TableRowBase from "./TableRowBase.js";
import type TableHeaderCell from "./TableHeaderCell.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-row` component represents the table headers of a `ui5-table`.
 *
 * It is tightly coupled to the `ui5-table` and should therefore be used in the `ui5-table` only.
 * The header row is placed in the `headerRow` slot of the table.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderRow.js";`
 *
 * @constructor
 * @extends TableRowBase
 * @since 2.0.0
 * @public
 */
declare class TableHeaderRow extends TableRowBase<TableHeaderCell> {
    /**
     * Defines the cells of the component.
     *
     * **Note:** Use `ui5-table-header-cell` for the intended design.
     *
     * @public
     */
    cells: DefaultSlot<TableHeaderCell>;
    /**
     * Sticks the `ui5-table-header-row` to the top of a table.
     *
     * Note: If used in combination with overflowMode "Scroll", the table needs a defined height for the sticky header to work as expected.
     *
     * @default false
     * @public
     */
    sticky: boolean;
    onEnterDOM(): void;
    onBeforeRendering(): void;
    isHeaderRow(): boolean;
    get _isSelectable(): boolean;
    get _hasSelectedRows(): boolean;
    get _shouldRenderClearAll(): boolean;
    get _selectionCellAriaDescription(): string | undefined;
    get _i18nSelection(): string;
    get _i18nRowPopin(): string;
    get _i18nRowActions(): string;
    get _i18nSelectAllRows(): string;
    get _i18nDeselectAllRows(): string;
}
export default TableHeaderRow;
