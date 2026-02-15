import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { InvalidationInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ITableFeature } from "./Table.js";
import type Table from "./Table.js";
declare enum TabBlocking {
    None = 0,
    Next = 1,
    Previous = 2,
    Released = 4,
    NextReleased = 5,
    PreviousReleased = 6
}
/**
 * Fired when the virtualizer is changed by user interaction e.g. on scrolling.
 * @param number {first} The 0-based index of the first children currently rendered
 * @param number {last} The 0-based index of the last children currently rendered
 * @public
 */
type RangeChangeEventDetail = {
    first: number;
    last: number;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-virtualizer` component is used inside the `ui5-table` to virtualize the table rows, if the `overflowMode` property of the table is set to 'Scroll'.
 * It is responsible for rendering only the rows that are visible in the viewport and updating them on scroll.
 * This allows large numbers of rows to exist, but maintain high performance by only paying the cost for those that are currently visible.
 *
 * **Note:** The maximum number of virtualized rows is limited by browser constraints, specifically the maximum supported height for a DOM element.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/TableVirtualizer.js";`
 *
 * @constructor
 * @since 2.5.0
 * @extends UI5Element
 * @public
 * @experimental This component is not intended to be used in a productive enviroment. The API is under development and may be changed in the future.
 */
declare class TableVirtualizer extends UI5Element implements ITableFeature {
    eventDetails: {
        "range-change": RangeChangeEventDetail;
    };
    /**
     * Defines the height of the rows in the table.
     *
     * **Note:** For virtualization to work properly, this property is mandatory.
     *
     * @default 45
     * @public
     */
    rowHeight: number;
    /**
     * Defines the total count of rows in the table.
     *
     * **Note:** For virtualization to work properly, this property is mandatory.
     *
     * @default 100
     * @public
     */
    rowCount: number;
    /**
     * Defines the count of extra rows to be rendered at the top and bottom of the table.
     *
     * **Note:** This property is experimental and may be changed or deleted in the future.
     *
     * @default 0
     * @public
     */
    extraRows: number;
    readonly identifier = "TableVirtualizer";
    _table?: Table;
    _lastRowPosition: number;
    _firstRowPosition: number;
    _visibleRowCount: number;
    _tabBlockingState: TabBlocking;
    _onRowInvalidateBound: (invalidationInfo: InvalidationInfo) => void;
    _onScrollBound: () => void;
    constructor();
    onAfterRendering(): void;
    onTableAfterRendering(table: Table): void;
    onExitDOM(): void;
    /**
     * Resets the virtualizer to its initial state and triggers the `range-change` event.
     * @public
     */
    reset(): void;
    get _scrollContainer(): HTMLElement;
    get _rowsContainer(): HTMLElement;
    _onScroll(): void;
    _updateRowsHeight(): void;
    _getTransform(): string | undefined;
    _onRowInvalidate(invalidationInfo: InvalidationInfo): void;
    _onKeyDown(e: KeyboardEvent): void;
}
export default TableVirtualizer;
export type { RangeChangeEventDetail, };
