import TableRowBase from "./TableRowBase.js";
import type TableCell from "./TableCell.js";
import type TableRowActionBase from "./TableRowActionBase.js";
import type Button from "./Button.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row` component represents a row in the `ui5-table`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRow.js";`
 *
 * @constructor
 * @extends TableRowBase
 * @since 2.0.0
 * @public
 */
declare class TableRow extends TableRowBase<TableCell> {
    /**
     * Defines the cells of the component.
     *
     * **Note:** Use `ui5-table-cell` for the intended design.
     *
     * @public
     */
    cells: DefaultSlot<TableCell>;
    /**
     * Defines the actions of the component.
     *
     * **Note:** Use `ui5-table-row-action` or `ui5-table-row-action-navigation` for the intended design.
     *
     * @since 2.7.0
     * @public
     */
    actions: Slot<TableRowActionBase>;
    /**
     * Unique identifier of the row.
     *
     * **Note:** For selection features to work properly, this property is mandatory, and its value must not contain spaces.
     *
     * @default undefined
     * @public
     */
    rowKey?: string;
    /**
     * Defines the 0-based position of the row related to the total number of rows within the table when the `ui5-table-virtualizer` feature is used.
     *
     * @default undefined
     * @since 2.5.0
     * @public
     */
    position?: number;
    /**
     * Defines the interactive state of the row.
     *
     * @default false
     * @public
     */
    interactive: boolean;
    /**
     * Defines the navigated state of the row.
     *
     * @default false
     * @public
     */
    navigated: boolean;
    /**
     * Defines whether the row is movable.
     *
     * @default false
     * @since 2.6.0
     * @public
     */
    movable: boolean;
    _popinCell?: TableCell;
    _actionsCell?: TableCell;
    onBeforeRendering(): void;
    focus(focusOptions?: FocusOptions | undefined): Promise<void>;
    _onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    _onclick(): void;
    _onkeyup(): void;
    _onfocusout(): void;
    _onOverflowButtonClick(e: UI5CustomEvent<Button, "click">): void;
    get _isInteractive(): boolean;
    get _isNavigable(): boolean;
    get _rowIndex(): number;
    get _hasOverflowActions(): boolean;
    get _flexibleActions(): TableRowActionBase[];
    get _fixedActions(): TableRowActionBase[];
    get _overflowActions(): TableRowActionBase[];
    get _availableActionsCount(): number;
    get _actionCellAccText(): string | undefined;
}
export default TableRow;
