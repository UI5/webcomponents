import TableExtension from "./TableExtension.js";
import GridWalker from "./GridWalker.js";
import type TableRowBase from "./TableRowBase.js";
import type Table from "./Table.js";
/**
 * Handles the keyboard navigation for the ui5-table.
 *
 * @class
 * @private
 */
declare class TableNavigation extends TableExtension {
    _table: Table;
    _gridWalker: GridWalker;
    _colPosition: number;
    _tabPosition: number;
    _ignoreFocusIn?: boolean;
    _lastFocusedItem?: HTMLElement;
    _onKeyDownCaptureBound: (e: KeyboardEvent) => void;
    constructor(table: Table);
    _getNavigationItemsOfRow(row: TableRowBase): HTMLElement[];
    _getNavigationItemsOfGrid(): (HTMLElement | undefined)[][];
    _setCurrentItem(e: Event, callback?: (currentItem: HTMLElement) => void): void;
    _isEventFromCurrentItem(e: Event): boolean;
    _focusElement(element: HTMLElement, ignoreFocusIn?: boolean): void;
    _focusCurrentItem(): void;
    _handleEnter(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    _handleF2(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    _handleF7(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    _handleTab(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    _handleArrowUpDown(e: KeyboardEvent, eventOrigin: HTMLElement, direction: -1 | 1): boolean;
    _handleArrowUp(e: KeyboardEvent, eventOrigin: HTMLElement): boolean;
    _handleArrowDown(e: KeyboardEvent, eventOrigin: HTMLElement): boolean;
    _onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement): void;
    _onclick(e: PointerEvent): void;
    _onfocusin(e: FocusEvent, eventOrigin: HTMLElement): void;
    _onKeyDownCapture(e: KeyboardEvent): void;
}
export default TableNavigation;
