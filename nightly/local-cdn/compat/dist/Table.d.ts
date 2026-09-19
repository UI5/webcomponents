import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ChangeInfo, DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import TableGrowingMode from "./types/TableGrowingMode.js";
import type { TableRowClickEventDetail, TableRowSelectionRequestedEventDetail, TableRowF7PressEventDetail, TableRowForwardBeforeEventDetail, TableRowForwardAfterEventDetail } from "./TableRow.js";
import type TableCell from "./TableCell.js";
import type TableColumn from "./TableColumn.js";
import type TableColumnPopinDisplay from "./types/TableColumnPopinDisplay.js";
import TableMode from "./types/TableMode.js";
/**
 * Interface for components that may be slotted inside a `ui5-table` as rows
 * @public
 */
interface ITableRow extends UI5Element, ITabbable {
    mode: `${TableMode}`;
    selected: boolean;
    forcedBusy: boolean;
    forcedAriaPosition?: string;
    _columnsInfoString: string;
    _columnsInfo?: Array<TableColumnInfo>;
    tabbableElements: Array<HTMLElement>;
}
type TableColumnInfo = {
    cell?: TableCell;
    index?: number;
    text?: string | null;
    visible?: boolean;
    demandPopin?: boolean;
    popinText?: string;
    popinDisplay?: `${TableColumnPopinDisplay}`;
    popinDisplayInline?: boolean;
    classes?: string;
    minWidth?: number;
};
type TableColumnHeaderInfo = ITabbable;
type TableSelectionChangeEventDetail = {
    selectedRows: Array<ITableRow>;
    previouslySelectedRows: Array<ITableRow>;
};
type TablePopinChangeEventDetail = {
    poppedColumns: Array<TableColumnInfo>;
};
declare enum TableFocusTargetElement {
    Row = "tableRow",
    GroupRow = "tableGroupRow",
    ColumnHeader = "columnHeader",
    MoreButton = "moreButton"
}
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table` component provides a set of sophisticated and convenient functions for responsive table design.
 * It provides a comprehensive set of features for displaying and dealing with vast amounts of data.
 *
 * To render the `Table` properly, the order of the `columns` should match with the
 * order of the item `cells` in the `rows`.
 *
 * Desktop and tablet devices are supported.
 * On tablets, special consideration should be given to the number of visible columns
 * and rows due to the limited performance of some devices.
 *
 * ### Selection
 * To benefit from the selection mechanism of `ui5-table` component, you can use the available selection modes:
 * `SingleSelect` and `MultiSelect`.
 *
 * In additition to the used mode, you can also specify the `ui5-table-row` type choosing between
 * `Active` or `Inactive`.
 *
 * In `SingleSelect` mode, you can select both an `Active` and `Inactive` row via mouse or
 * by pressing the `Space` or `Enter` keys.
 *
 * In `MultiSelect` mode, you can select both an `Active` and `Inactive` row by pressing the
 * `Space` key when a row is on focus or via mouse click over the selection checkbox of the row.
 * In order to select all the available rows at once, you can use the selection checkbox presented in the table's header.
 *
 * **Note:** Currently, when a column is shown as a pop-in, the visual indication for selection is not presented over it.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * Furthermore, you can interact with `ui5-table` via the following keys.
 *
 * - [F7] - If focus is on an interactive control inside an item, moves focus to the corresponding item.
 * - [Ctrl]+[A] - Selects all items, if MultiSelect mode is enabled.
 * - [Home]/[End] - Focuses the first/last item.
 * - [Page Up]/[Page Down] - Moves focus up/down by page size (20 items by default).
 * - [Alt]+[Down]/[Up] - Switches focus between header, last focused item, and More button (if applies) in either direction.
 * - [Shift]+[Down]/[Up] - Selects the next/previous item in a MultiSelect table, if the current item is selected (Range selection). Otherwise, deselects them (Range deselection).
 * - [Shift]+[Home]/[End] - Range selection to the first/last item of the List.
 * - [Ctrl]+[Home]/[End] - Same behavior as HOME & END.
 *
 * ### ES6 Module Import
 *
 * - `import "@ui5/webcomponents-compat/dist/Table.js";`
 * - `import "@ui5/webcomponents-compat/dist/TableColumn.js";` (`ui5-table-column`)
 * - `import "@ui5/webcomponents-compat/dist/TableRow.js";` (`ui5-table-row`)
 * - `import "@ui5/webcomponents-compat/dist/TableGroupRow.js";` (`ui5-table-group-row`)
 * - `import "@ui5/webcomponents-compat/dist/TableCell.js";` (`ui5-table-cell`)
 * @constructor
 * @extends UI5Element
 * @public
 * @deprecated Deprecated as of version 2.12.0, use `@ui5/webcomponents/dist/Table.js` instead.
 */
declare class Table extends UI5Element {
    eventDetails: {
        "row-click": TableRowClickEventDetail;
        "popin-change": TablePopinChangeEventDetail;
        "load-more": void;
        "selection-change": TableSelectionChangeEventDetail;
    };
    /**
     * Defines the text that will be displayed when there is no data and `hideNoData` is not present.
     * @default undefined
     * @public
     */
    noDataText?: string;
    /**
     * Defines the text that will be displayed inside the growing button at the bottom of the table,
     * meant for loading more rows upon press.
     *
     * **Note:** If not specified a built-in text will be displayed.
     *
     * **Note:** This property takes effect if `growing` is set to `Button`.
     * @default undefined
     * @since 2.0.0
     * @public
     */
    growingButtonText?: string;
    /**
     * Defines the subtext that will be displayed under the `growingButtonText`.
     *
     * **Note:** This property takes effect if `growing` is set to `Button`.
     * @default undefined
     * @since 2.0.0
     * @public
     */
    growingButtonSubtext?: string;
    /**
     * Defines if the value of `noDataText` will be diplayed when there is no rows present in the table.
     * @default false
     * @public
     * @since 2.0.0
     */
    hideNoData: boolean;
    /**
     * Defines whether the table will have growing capability either by pressing a `More` button,
     * or via user scroll. In both cases `load-more` event is fired.
     *
     * Available options:
     *
     * `Button` - Shows a `More` button at the bottom of the table, pressing of which triggers the `load-more` event.
     *
     * `Scroll` - The `load-more` event is triggered when the user scrolls to the bottom of the table;
     *
     * `None` (default) - The growing is off.
     *
     * **Restrictions:** `growing="Scroll"` is not supported for Internet Explorer,
     * and the component will fallback to `growing="Button"`.
     * @default "None"
     * @since 2.0.0
     * @public
     */
    growing: `${TableGrowingMode}`;
    /**
     * Defines if the table is in busy state.
     *
     * In this state the component's opacity is reduced
     * and busy indicator is displayed at the bottom of the table.
     * @default false
     * @since 2.0.0
     * @public
     */
    busy: boolean;
    /**
     * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
     * @default 1000
     * @public
     */
    busyDelay: number;
    /**
     * Determines whether the column headers remain fixed at the top of the page during
     * vertical scrolling as long as the Web Component is in the viewport.
     *
     * **Restrictions:**
     *
     * - Browsers that do not support this feature:
     *
     * - Internet Explorer
     * - Microsoft Edge lower than version 41 (EdgeHTML 16)
     * - Mozilla Firefox lower than version 59
     *
     * - Scrolling behavior:
     *
     * - If the Web Component is placed in layout containers that have the `overflow: hidden`
     * or `overflow: auto` style definition, this can
     * prevent the sticky elements of the Web Component from becoming fixed at the top of the viewport.
     * @default false
     * @public
     */
    stickyColumnHeader: boolean;
    /**
     * Defines the mode of the component.
     * @default "None"
     * @since 2.0.0
     * @public
     */
    mode: `${TableMode}`;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 2.0.0
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default undefined
     * @public
     * @since 2.0.0
     */
    accessibleNameRef?: string;
    _hiddenColumns?: Array<TableColumnInfo>;
    _noDataDisplayed: boolean;
    /**
     * Defines the active state of the `More` button.
     * @private
     */
    _loadMoreActive: boolean;
    /**
     * Used to represent the table column header for the purpose of the item navigation as it does not work with DOM objects directly
     * @private
     */
    _columnHeader: TableColumnHeaderInfo;
    /**
     * Defines whether all rows are selected or not when table is in MultiSelect mode.
     * @default false
     * @since 2.0.0
     * @private
     */
    _allRowsSelected: boolean;
    /**
     * Defines the component rows.
     *
     * **Note:** Use `ui5-table-row` for the intended design.
     * @public
     */
    rows: DefaultSlot<ITableRow>;
    /**
     * Defines the configuration for the columns of the component.
     *
     * **Note:** Use `ui5-table-column` for the intended design.
     * @public
     */
    columns: Slot<TableColumn>;
    static i18nBundle: I18nBundle;
    fnHandleF7: (e: CustomEvent) => void;
    fnOnRowFocused: (e: CustomEvent) => void;
    _handleResize: ResizeObserverCallback;
    tableEndObserved: boolean;
    visibleColumns: Array<TableColumn>;
    visibleColumnsCount?: number;
    lastFocusedElement: HTMLElement | null;
    growingIntersectionObserver?: IntersectionObserver | null;
    initialIntersection: boolean;
    _forwardingFocus: boolean;
    _prevNestedElementIndex: number;
    _itemNavigation: ItemNavigation;
    _prevFocusedRow?: ITableRow;
    _afterElement?: HTMLElement;
    _beforeElement?: HTMLElement;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _onkeydown(e: KeyboardEvent): void;
    _handleTab(e: KeyboardEvent): false | void;
    _focusNextElement(): void;
    _handleArrowNav(e: KeyboardEvent): void;
    _handleHomeEndSelection(e: KeyboardEvent): void;
    /**
     * Handles Alt + Up/Down.
     * Switches focus between column header, last focused item, and "More" button (if applicable).
     * @private
     */
    _handleArrowAlt(e: KeyboardEvent): void | Promise<void>;
    /**
     * Determines the type of the currently focused element.
     * @private
     */
    getFocusedElementType(element: HTMLElement): TableFocusTargetElement | undefined;
    /**
     * Toggles focus between the table row's root and the last focused nested element.
     * @private
     */
    _handleF7(e: CustomEvent<TableRowF7PressEventDetail>): void;
    _onfocusin(e: FocusEvent): void;
    _onForwardBefore(e: CustomEvent<TableRowForwardBeforeEventDetail>): void;
    _onForwardAfter(e: CustomEvent<TableRowForwardAfterEventDetail>): void;
    _focusForwardElement(isAfter: boolean): void;
    _isForwardElement(element: HTMLElement): boolean;
    _getForwardElement(isAfter: boolean): HTMLElement | null;
    _getAfterForwardElement(): HTMLElement;
    _getBeforeForwardElement(): HTMLElement;
    onRowFocused(e: CustomEvent): void;
    onRowKeyDown(e: KeyboardEvent): void;
    _onColumnHeaderFocused(): void;
    _onColumnHeaderClick(e: MouseEvent | KeyboardEvent): void;
    _onColumnHeaderKeydown(e: KeyboardEvent): void;
    _onLoadMoreKeydown(e: KeyboardEvent): void;
    _onLoadMoreKeyup(e: KeyboardEvent): void;
    onInvalidation(change: ChangeInfo): void;
    _onLoadMoreClick(): void;
    observeTableEnd(): void;
    onInteresection(entries: Array<IntersectionObserverEntry>): void;
    loadMore(): void;
    _handleSingleSelect(e: CustomEvent<TableRowSelectionRequestedEventDetail>): void;
    _handleMultiSelect(e: CustomEvent<TableRowSelectionRequestedEventDetail>): void;
    _handleSelect(e: CustomEvent<TableRowSelectionRequestedEventDetail>): void;
    _selectAll(): void;
    getRowParent(child: HTMLElement): ITableRow | undefined;
    get columnHeader(): HTMLElement | null;
    get morеBtn(): HTMLElement | null;
    handleResize(): void;
    popinContent(): void;
    /**
     * Gets settings to be propagated from columns to rows.
     */
    getColumnPropagationSettings(): Array<TableColumnInfo>;
    getIntersectionObserver(): IntersectionObserver;
    get growsWithButton(): boolean;
    get growsOnScroll(): boolean;
    get _growingButtonText(): string;
    get ariaLabelText(): string;
    get tableAriaLabelText(): string | undefined;
    get ariaLabelSelectAllText(): string;
    get loadMoreAriaLabelledBy(): string;
    get tableEndDOM(): Element;
    get isMultiSelect(): boolean;
    get isSingleSelect(): boolean;
    get selectedRows(): Array<ITableRow>;
    get currentItemIdx(): number;
    get currentItem(): ITableRow;
    get currentElement(): HTMLElement | undefined;
    get columnHeaderTabbables(): Array<HTMLElement>;
    get columnHeaderLastElement(): HTMLElement | null;
}
export default Table;
export type { ITableRow, TableColumnInfo, TableRowClickEventDetail, TableSelectionChangeEventDetail, TablePopinChangeEventDetail, };
