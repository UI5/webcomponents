import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type Table from "./Table.js";
import type TableRowBase from "./TableRowBase.js";
import type TableRow from "./TableRow.js";
import type { ITableFeature } from "./Table.js";
import TableSelectionBehavior from "./types/TableSelectionBehavior.js";
/**
 * Fired when selection is changed by user interaction.
 *
 * @public
 */
type TableSelectionBaseChangeEventDetail = void;
/**
 * Fired when the selection is changed by user interaction.
 *
 * @public
 */
declare abstract class TableSelectionBase extends UI5Element implements ITableFeature {
    eventDetails: {
        change: TableSelectionBaseChangeEventDetail;
    };
    /**
     * Defines the selected elements of the component.
     *
     * @default undefined
     * @public
     */
    selected?: string;
    /**
     * Defines the selection behavior.
     *
     * @default "RowSelector"
     * @public
     * @since 2.11
     */
    behavior: `${TableSelectionBehavior}`;
    readonly identifier = "TableSelection";
    protected _table?: Table;
    private _rowsLength;
    onTableActivate(table: Table): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    onTableBeforeRendering(): void;
    isSelectable(): boolean;
    /**
     * Determines if the component allows multiple selection.
     */
    isMultiSelectable(): boolean;
    /**
     * Determines whether a row selector (for example, `radiobutton` or `checkbox`) is rendered.
     */
    isRowSelectorRequired(): boolean;
    /**
     * Returns the ARIA description of the Table as an alternative to aria-multiselectable.
     */
    getAriaDescriptionForTable(): string | undefined;
    /**
     * Returns the ARIA description of the selection component displayed in the column header.
     */
    getAriaDescriptionForColumnHeader(): string | undefined;
    /**
     * Returns the unique key associated with the table row.
     *
     * @param row The row instance
     */
    getRowKey(row: TableRow): string;
    /**
     * Returns the table row instance for the given row key.
     *
     * @param rowKey The row key
     * @public
     */
    getRowByKey(rowKey: string): TableRow | undefined;
    /**
     * Determines whether the specified table row is currently selected.
     *
     * @param row The row instance
     */
    abstract isSelected(row: TableRowBase): boolean;
    /**
     * Sets the selected state of the specified table row.
     *
     * @param row The row instance
     * @param selected Whether the row is selected
     * @param fireEvent Whether the change event should be fired
     */
    abstract setSelected(row: TableRowBase, selected: boolean, fireEvent: boolean): void;
    /**
     * Invalidates the table and its rows to re-evaluate the selection.
     */
    protected _invalidateTableAndRows(): void;
}
export default TableSelectionBase;
export type { TableSelectionBaseChangeEventDetail, };
