import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TableCell from "./TableCell.js";
import type { ITableRow, TableColumnInfo } from "./Table.js";
import TableMode from "./types/TableMode.js";
import TableRowType from "./types/TableRowType.js";
type TableRowClickEventDetail = {
    row: TableRow;
};
type TableRowSelectionRequestedEventDetail = {
    row: TableRow;
};
type TableRowForwardBeforeEventDetail = {
    target: HTMLElement;
};
type TableRowForwardAfterEventDetail = {
    target: HTMLElement;
};
type TableRowF7PressEventDetail = {
    row: TableRow;
};
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
declare class TableRow extends UI5Element implements ITableRow {
    eventDetails: {
        "row-click": TableRowClickEventDetail;
        "_focused": FocusEvent;
        "forward-before": TableRowForwardBeforeEventDetail;
        "forward-after": TableRowForwardAfterEventDetail;
        "selection-requested": TableRowSelectionRequestedEventDetail;
        "f7-pressed": TableRowF7PressEventDetail;
    };
    /**
     * Defines the visual indication and behavior of the component.
     *
     * **Note:** When set to `Active`, the item will provide visual response upon press,
     * while with type `Inactive`-will not.
     * @default "Inactive"
     * @since 2.0.0
     * @public
     */
    type: `${TableRowType}`;
    /**
     * Defines the row's selected state.
     * @default false
     * @since 2.0.0
     * @public
     */
    selected: boolean;
    /**
     * Indicates if the table row is navigated.
     * @default false
     * @since 2.0.0
     * @public
     */
    navigated: boolean;
    /**
     * Defines the mode of the row (None, SingleSelect, MultiSelect).
     * @default "None"
     * @since 2.0.0
     * @private
     */
    mode: `${TableMode}`;
    /**
     * Indicates if the table row is active.
     * @default false
     * @since 2.0.0
     * @private
     */
    active: boolean;
    _columnsInfo?: Array<TableColumnInfo>;
    forcedTabIndex?: string;
    forcedBusy: boolean;
    forcedAriaPosition?: string;
    /**
     * Defines the cells of the component.
     *
     * **Note:** Use `ui5-table-cell` for the intended design.
     * @public
     */
    cells: DefaultSlot<TableCell>;
    static i18nBundle: I18nBundle;
    visibleCells: Array<TableCell>;
    popinCells: Array<TableColumnInfo>;
    tabbableElements: Array<HTMLElement>;
    _columnsInfoString: string;
    _ontouchstart(): void;
    _onmouseup(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _ontouchend(): void;
    _onfocusout(): void;
    _onfocusin(e: FocusEvent, forceSelfFocus?: boolean): void;
    _onrowclick(e: MouseEvent): void;
    _handleSelection(): void;
    _activeElementHasAttribute(attr: string): boolean;
    get _ariaCurrent(): true | undefined;
    activate(): void;
    deactivate(): void;
    get shouldPopin(): boolean;
    get allColumnsPoppedIn(): boolean | undefined;
    onBeforeRendering(): void;
    get visibleCellsCount(): number;
    get ariaLabelText(): string;
    get ariaLabelRowSelection(): string;
    get isSingleSelect(): boolean;
    get isMultiSelect(): boolean;
    get root(): HTMLElement;
    getCellText(cell: TableCell): string;
    getColumnTextByIdx(index: number): string;
    getNormilzedTextContent(textContent: string): string;
}
export default TableRow;
export type { TableRowClickEventDetail, TableRowSelectionRequestedEventDetail, TableRowForwardBeforeEventDetail, TableRowForwardAfterEventDetail, TableRowF7PressEventDetail, };
