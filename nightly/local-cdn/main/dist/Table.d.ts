import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import TableNavigation from "./TableNavigation.js";
import TableOverflowMode from "./types/TableOverflowMode.js";
import TableDragAndDrop from "./TableDragAndDrop.js";
import type DropIndicator from "./DropIndicator.js";
import type TableHeaderRow from "./TableHeaderRow.js";
import type TableRow from "./TableRow.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { MoveEventDetail } from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import type TableHeaderCell from "./TableHeaderCell.js";
import type TableSelection from "./TableSelection.js";
import type TableSelectionBase from "./TableSelectionBase.js";
import type TableRowActionBase from "./TableRowActionBase.js";
import type TableVirtualizer from "./TableVirtualizer.js";
import type TableGrowing from "./TableGrowing.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
/**
 * Interface for components that can be slotted inside the `features` slot of the `ui5-table`.
 *
 * @public
 * @experimental
 */
interface ITableFeature extends UI5Element {
    readonly identifier: string;
    /**
     * Called when the table is activated.
     * @param table Table instance
     */
    onTableActivate?(table: Table): void;
    /**
     * Called every time before the table renders.
     * @param table Table instance
     */
    onTableBeforeRendering?(table?: Table): void;
    /**
     * Called every time after the table renders.
     * @param table Table instance
     */
    onTableAfterRendering?(table?: Table): void;
}
/**
 * Interface for components that can be slotted inside the `features` slot of the `ui5-table`
 * and provide growing/data loading functionality.
 * @public
 * @experimental
 */
interface ITableGrowing extends ITableFeature {
    /**
     * Called when the table needs to load more data.
     */
    loadMore(): void;
    /**
     * Determines whether the table has a growing control, that should be rendered in the table.
     */
    hasGrowingComponent(): boolean;
    _individualSlot?: string;
}
/**
 * Fired when an interactive row is clicked.
 *
 * @param {TableRow} row The clicked row instance
 * @public
 */
type TableRowClickEventDetail = {
    row: TableRow;
};
type TableMoveEventDetail = MoveEventDetail;
/**
 * Fired when a row action is clicked.
 *
 * @param {TableRowActionBase} action The row action instance
 * @param {TableRow} row The row instance
 * @public
 */
type TableRowActionClickEventDetail = {
    action: TableRowActionBase;
    row: TableRow;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table` component provides a set of sophisticated features for displaying and dealing with vast amounts of data in a responsive manner.
 * To render the `ui5-table`, you need to define the columns and rows. You can use the provided `ui5-table-header-row` and `ui5-table-row` components for this purpose.
 *
 * ### Features
 *
 * The `ui5-table` can be enhanced in its functionalities by applying different features.
 * Features can be slotted into the `features` slot, to enable them in the component.
 * Features need to be imported separately, as they are not enabled by default.
 *
 * The following features are currently available:
 *
 * * [TableSelection](../TableSelection) - adds selection capabilities to the table
 * * [TableGrowing](../TableGrowing) - provides growing capabilities to load more data
 *
 * ### Keyboard Handling
 *
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * Furthermore, you can interact with `ui5-table` via the following keys:
 *
 * If the focus is on a row, the following keyboard shortcuts are available:
 * * <kbd>Down</kbd> - Navigates down
 * * <kbd>Up</kbd> - Navigates up
 * * <kbd>Right</kbd> - Selects the first cell of the row
 * * <kbd>Space</kbd> - Toggles the selection of the row
 * * <kbd>Ctrl/Cmd + A</kbd> - In multi selection mode, toggles the selection of all rows
 * * <kbd>Home</kbd> - Navigates to the first row, if the focus is on the first row, navigates to the header row
 * * <kbd>End</kbd> - Navigates to the last row, if the focus is on the last row, navigates to the growing button
 * * <kbd>Page Up</kbd> - Navigates one page up, if the focus is on the first row, navigates to the header row
 * * <kbd>Page Down</kbd> - Navigates one page down, if the focus is on the last row, navigates to the growing button
 * * <kbd>F2</kbd> - Focuses the first tabbable element in the row
 * * <kbd>F7</kbd> - If focus position is remembered, moves focus to the corresponding focus position row, otherwise to the first tabbable element within the row
 * * <kbd>[Shift]Tab</kbd> - Move focus to the element in the tab chain outside the table

 *
 * If the focus is on a cell, the following keyboard shortcuts are available:
 * * <kbd>Down</kbd> - Navigates down
 * * <kbd>Up</kbd> - Navigates up
 * * <kbd>Right</kbd> - Navigates right
 * * <kbd>Left</kbd> - Navigates left, if the focus is on the first cell of the row, the focus is moved to the row.
 * * <kbd>Home</kbd> - Navigates to the first cell of the current row, if the focus is on the first cell, navigates to the corresponding row
 * * <kbd>End</kbd> - Navigates to the last cell of the current row, if the focus is on the last cell, navigates to the corresponding row
 * * <kbd>Page Up</kbd> - Navigates one page up while keeping the focus in same column
 * * <kbd>Page Down</kbd> - Navigates one page down while keeping the focus in same column
 * * <kbd>F2</kbd> - Toggles the focus between the first tabbable cell content and the cell
 * * <kbd>Enter</kbd> - Focuses the first tabbable cell content
 * * <kbd>F7</kbd> - If the focus is on an interactive element inside a row, moves focus to the corresponding row and remembers the focus position of the element within the row
 * * <kbd>[Shift]Tab</kbd> - Move focus to the element in the tab chain outside the table

 *
 * If the focus is on an interactive cell content, the following keyboard shortcuts are available:
 * * <kbd>Down</kbd> - Move the focus to the interactive element in the same column of the previous row, unless the focused element prevents the default
 * * <kbd>Up</kbd> - Move the focus to the interactive element in the same column of the next row, unless the focused element prevents the default
 * * <kbd>[Shift]Tab</kbd> - Move the focus to the element in the tab chain
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Table.js";`\
 * `import "@ui5/webcomponents/dist/TableRow.js";` (`ui5-table-row`)\
 * `import "@ui5/webcomponents/dist/TableCell.js";` (`ui5-table-cell`)\
 * `import "@ui5/webcomponents/dist/TableHeaderRow.js";` (`ui5-table-header-row`)\
 * `import "@ui5/webcomponents/dist/TableHeaderCell.js";` (`ui5-table-header-cell`)
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
declare class Table extends UI5Element {
    eventDetails: {
        "row-click": TableRowClickEventDetail;
        "move-over": TableMoveEventDetail;
        "move": TableMoveEventDetail;
        "row-action-click": TableRowActionClickEventDetail;
    };
    /**
     * Defines the rows of the component.
     *
     * **Note:** Use `ui5-table-row` for the intended design.
     *
     * @public
     */
    rows: Array<TableRow>;
    /**
     * Defines the header row of the component.
     *
     * **Note:** Use `ui5-table-header-row` for the intended design.
     *
     * @public
     */
    headerRow: Array<TableHeaderRow>;
    /**
     * Defines the custom visualization if there is no data available.
     *
     * @public
     */
    noData: Array<HTMLElement>;
    /**
     * Defines the features of the component.
     *
     * @public
     */
    features: Array<ITableFeature>;
    /**
     * Defines the accessible ARIA name of the component.
     *
     * @default undefined
     * @public
     */
    accessibleName?: string;
    /**
     * Identifies the element (or elements) that labels the component.
     *
     * @default undefined
     * @public
     */
    accessibleNameRef?: string;
    /**
     * Defines the text to be displayed when there are no rows in the component.
     *
     * @default undefined
     * @public
     */
    noDataText?: string;
    /**
     * Defines the mode of the <code>ui5-table</code> overflow behavior.
     *
     * Available options are:
     *
     * <code>Scroll</code> - Columns are shown as regular columns and horizontal scrolling is enabled.
     * <code>Popin</code> - Columns are shown as pop-ins instead of regular columns.
     *
     * @default "Scroll"
     * @public
     */
    overflowMode: `${TableOverflowMode}`;
    /**
     * Defines if the loading indicator should be shown.
     *
     * **Note:** When the component is loading, it is not interactive.
     *
     * @default false
     * @public
     */
    loading: boolean;
    /**
     * Defines the delay in milliseconds, after which the loading indicator will show up for this component.
     *
     * @default 1000
     * @public
     */
    loadingDelay: number;
    /**
     * Defines the maximum number of row actions that is displayed, which determines the width of the row action column.
     *
     * **Note:** It is recommended to use a maximum of 3 row actions, as exceeding this limit may take up too much space on smaller screens.
     *
     * @default 0
     * @since 2.7.0
     * @public
     */
    rowActionCount: number;
    /**
     * Defines the sticky top offset of the table, if other sticky elements outside of the table exist.
     */
    stickyTop: string;
    _invalidate: number;
    _renderNavigated: boolean;
    dropIndicatorDOM: DropIndicator;
    _noDataRow?: TableRow;
    _endRow: TableRow;
    _tableElement: HTMLElement;
    _beforeElement: HTMLElement;
    _afterElement: HTMLElement;
    _loadingElement: HTMLElement;
    static i18nBundle: I18nBundle;
    _events: string[];
    _onEventBound: (e: Event) => void;
    _onResizeBound: ResizeObserverCallback;
    _tableNavigation?: TableNavigation;
    _tableDragAndDrop?: TableDragAndDrop;
    _poppedIn: Array<{
        col: TableHeaderCell;
        width: number;
    }>;
    _containerWidth: number;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    _findFeature<T>(featureName: string): T;
    _getSelection(): TableSelectionBase | TableSelection | undefined;
    _getVirtualizer(): TableVirtualizer | undefined;
    _getGrowing(): TableGrowing | undefined;
    _onEvent(e: Event): void;
    _onResize(): void;
    _onfocusin(e: FocusEvent): void;
    _onGrow(): void;
    _getPopinOrderedColumns(reverse: boolean): TableHeaderCell[];
    /**
     * Refreshes the popin state of the columns.
     * Syncs the popin state of the columns with the popin state of the header cells.
     * This is needed when additional rows are manually added and no resize happens.
     * @private
     */
    _refreshPopinState(): void;
    _setHeaderPopinState(headerCell: TableHeaderCell, inPopin: boolean, popinWidth: number): void;
    _isGrowingFeature(feature: any): boolean;
    _onRowClick(row: TableRow): void;
    _onRowActionClick(action: TableRowActionBase): void;
    get styles(): {
        table: {
            "grid-template-columns": string | undefined;
            "--row-height": string;
        };
        spacer: {
            transform: string | undefined;
            "will-change": string | undefined;
        };
    };
    get _gridTemplateColumns(): string | undefined;
    get _isRowSelectorRequired(): boolean | undefined;
    get _scrollContainer(): HTMLElement;
    get _stickyElements(): (TableHeaderRow | TableHeaderCell)[];
    get _effectiveNoDataText(): string;
    get _ariaLabel(): string | undefined;
    get _ariaDescription(): string | undefined;
    get _ariaRowCount(): number;
    get _ariaColCount(): number;
    get _ariaMultiSelectable(): boolean | undefined;
    get isTable(): boolean;
}
export default Table;
export type { ITableFeature, ITableGrowing, TableRowClickEventDetail, TableMoveEventDetail, TableRowActionClickEventDetail, };
