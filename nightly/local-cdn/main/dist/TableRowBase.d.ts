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
declare abstract class TableRowBase<TCell extends TableCellBase = TableCellBase> extends UI5Element {
    cells: Array<TCell>;
    _invalidate: number;
    _rowActionCount: number;
    _renderNavigated: boolean;
    _alternate: boolean;
    _selectionCell?: HTMLElement;
    _navigatedCell?: HTMLElement;
    static i18nBundle: I18nBundle;
    onEnterDOM(): void;
    onBeforeRendering(): void;
    getFocusDomRef(): this;
    isHeaderRow(): boolean;
    _onSelectionChange(): void;
    _onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    get _table(): Table | undefined;
    get _tableId(): string | undefined;
    get _tableSelection(): import("./TableSelectionBase.js").default | import("./TableSelection.js").default | undefined;
    get _isSelected(): boolean | undefined;
    get _isSelectable(): boolean | undefined;
    get _isMultiSelect(): boolean;
    get _hasSelector(): boolean | undefined;
    get _visibleCells(): TCell[];
    get _popinCells(): TCell[];
    get _stickyCells(): (HTMLElement | undefined)[];
    get _i18nRowSelector(): string;
}
export default TableRowBase;
