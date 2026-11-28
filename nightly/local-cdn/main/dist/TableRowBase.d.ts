import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TableCellBase from "./TableCellBase.js";
import type Table from "./Table.js";
/**
 * @class
 * A class to serve as a foundation for the `TableRow` and `TableHeaderRow` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
declare abstract class TableRowBase<TCell extends TableCellBase = TableCellBase, TStatus extends HTMLElement = HTMLElement> extends UI5Element {
    cells: Array<TCell>;
    status: Array<TStatus>;
    _invalidate: number;
    _rowActionCount: number;
    _renderNavigated: boolean;
    _renderStatus: boolean;
    _alternate: boolean;
    _renderDummyCell: boolean;
    _selectionCell?: HTMLElement;
    _actionsCell?: HTMLElement;
    _navigatedCell?: HTMLElement;
    _statusCell?: HTMLElement;
    static i18nBundle: I18nBundle;
    isHeaderRow(): boolean;
    isGroupRow(): boolean;
    onEnterDOM(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    getFocusDomRef(): this;
    focus(focusOptions?: FocusOptions | undefined): Promise<void>;
    _handleCustomFocusOutline(): void;
    get _table(): Table | undefined;
    get _tableId(): string | undefined;
    get _status(): TStatus;
    get _tableSelection(): import("./TableSelectionBase.js").default | import("./TableSelection.js").default | undefined;
    get _isSelected(): boolean;
    get _isSelectable(): boolean;
    get _isMultiSelect(): boolean;
    get _hasSelector(): boolean;
    get _visibleCells(): TCell[];
    get _firstVisibleCell(): TCell | undefined;
    get _popinCells(): TCell[];
    get _hasPopin(): boolean;
    get _stickyCells(): HTMLElement[];
}
export default TableRowBase;
