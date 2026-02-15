import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import TableSelectionMode from "./types/TableSelectionMode.js";
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
declare class TableSelection extends UI5Element implements ITableFeature {
    eventDetails: {
        change: void;
    };
    /**
     * Defines the selection mode.
     *
     * @default "Multiple"
     * @public
     */
    mode: `${TableSelectionMode}`;
    /**
     * Defines the selected rows separated by a space.
     *
     * @default ""
     * @public
     */
    selected: string;
    readonly identifier = "TableSelection";
    _table?: Table;
    _rowsLength: number;
    _rangeSelection?: {
        selected: boolean;
        isUp: boolean | null;
        rows: TableRow[];
        isMouse: boolean;
        shiftPressed: boolean;
    } | null;
    onClickCaptureBound: (e: MouseEvent) => void;
    constructor();
    onTableActivate(table: Table): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    onTableBeforeRendering(): void;
    onTableAfterRendering(): void;
    isSelectable(): boolean;
    isMultiSelectable(): boolean;
    isRowSelectorRequired(): boolean;
    getAriaDescriptionForTable(): string | undefined;
    getAriaDescriptionForColumnHeader(): string | undefined;
    getRowKey(row: TableRow): string;
    isSelected(row: TableRowBase): boolean;
    hasSelectedRow(): boolean;
    areAllRowsSelected(): boolean;
    setSelected(row: TableRowBase, selected: boolean, fireEvent?: boolean): void;
    get selectedAsArray(): string[];
    set selectedAsArray(selectedArray: string[]);
    get selectedAsSet(): Set<string>;
    set selectedAsSet(selectedSet: Set<string>);
    _selectRow(row: TableRow, selected: boolean): void;
    _selectHeaderRow(selected: boolean): void;
    _invalidateTableAndRows(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    _onClickCapture(e: MouseEvent): void;
    /**
     * Start the range selection and initialises the range selection state
     * @param row starting row
     * @private
     */
    _startRangeSelection(row: TableRow, selected: boolean, isMouse?: boolean): void;
    /**
     * Handles the range selection
     * @param targetRow row that is currently focused
     * @param change indicates direction
     * @private
     */
    _handleRangeSelection(targetRow: TableRow, change: number): void;
    _stopRangeSelection(): void;
    _reverseRangeSelection(): void;
}
export default TableSelection;
