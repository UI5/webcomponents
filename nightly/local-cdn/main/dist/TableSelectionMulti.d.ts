import TableSelectionBase from "./TableSelectionBase.js";
import type TableRow from "./TableRow.js";
import type TableRowBase from "./TableRowBase.js";
import type TableSelectionMultiHeaderSelector from "./types/TableSelectionMultiHeaderSelector.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-selection-multi` component is used inside the `ui5-table` to add multi-selection capabilities to the `ui5-table`.
 * Since selection is key-based, each `ui5-table-row` must define a unique `row-key` property.
 *
 * ### Usage
 *
 * The `ui5-table-selection-multi` component is a feature designed exclusively for use within the `ui5-table` component.
 * It must be placed inside the `features` slot of `ui5-table`.
 * This component is not intended for standalone use.
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-selection-multi slot="features" selected="Row1 Row3"></ui5-table-selection-multi>
 * </ui5-table>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableSelectionMulti.js";`
 *
 * @constructor
 * @extends TableSelectionBase
 * @since 2.8.0
 * @public
 */
declare class TableSelectionMulti extends TableSelectionBase {
    /**
     * Defines the `row-key` values of selected rows, with each value separated by a space.
     *
     * @default undefined
     * @public
     */
    selected?: string;
    /**
     * Defines the selector of the header row.
     *
     * @default "SelectAll"
     * @public
     * @since 2.12
     */
    headerSelector: `${TableSelectionMultiHeaderSelector}`;
    private _rangeSelection?;
    _onClickCaptureBound: (e: MouseEvent) => void;
    constructor();
    onTableBeforeRendering(): void;
    onTableAfterRendering(): void;
    isMultiSelectable(): boolean;
    isSelected(row: TableRowBase): boolean;
    setSelected(row: TableRowBase, selected: boolean, fireEvent?: boolean): void;
    /**
     * Returns an array of the selected rows.
     *
     * @public
     */
    getSelectedRows(): TableRow[];
    /**
     * Determines whether all rows are selected.
     */
    areAllRowsSelected(): boolean;
    /**
     * Returns the `selected` property as a set of unique `row-key` values.
     *
     * @public
     */
    getSelectedAsSet(): Set<string>;
    /**
     * Sets the `selected` property using the provided set of unique `row-key` values.
     *
     * @param selectedSet A set of `row-key` values
     * @public
     */
    setSelectedAsSet(selectedSet: Set<string>): void;
    /**
     * Returns the ARIA description of the selection component displayed in the column header.
     */
    getAriaDescriptionForColumnHeader(): string | undefined;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    _onclickCapture(e: MouseEvent): void;
    /**
     * Start the range selection and initialises the range selection state
     * @param row starting row
     * @private
     */
    _startRangeSelection(row: TableRow, selected: boolean, isMouse?: boolean): void;
    /**
     * Handles the range selection
     * @param targetRow Row that is currently focused
     * @param change indicates direction
     * @private
     */
    _handleRangeSelection(targetRow: TableRow, change: number): void;
    _stopRangeSelection(): void;
    _reverseRangeSelection(): void;
}
export default TableSelectionMulti;
