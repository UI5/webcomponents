var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Table_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { isTabNext, isTabPrevious, isSpace, isEnter, isDown, isCtrlA, isUpAlt, isDownAlt, isUpShift, isDownShift, isHomeCtrl, isEndCtrl, isHomeShift, isEndShift, } from "@ui5/webcomponents-base/dist/Keys.js";
import getNormalizedTarget from "@ui5/webcomponents-base/dist/util/getNormalizedTarget.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getLastTabbableElement, getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import TableGrowingMode from "./types/TableGrowingMode.js";
import TableMode from "./types/TableMode.js";
// Texts
import { LOAD_MORE_TEXT, ARIA_LABEL_SELECT_ALL_CHECKBOX, TABLE_HEADER_ROW_INFORMATION, TABLE_ROW_POSITION, } from "./generated/i18n/i18n-defaults.js";
// Template
import TableTemplate from "./TableTemplate.js";
// Styles
import tableStyles from "./generated/themes/Table.css.js";
import { patchScopingSuffix } from "./utils/CompatCustomElementsScope.js";
const GROWING_WITH_SCROLL_DEBOUNCE_RATE = 250; // ms
const PAGE_UP_DOWN_SIZE = 20;
var TableFocusTargetElement;
(function (TableFocusTargetElement) {
    TableFocusTargetElement["Row"] = "tableRow";
    TableFocusTargetElement["GroupRow"] = "tableGroupRow";
    TableFocusTargetElement["ColumnHeader"] = "columnHeader";
    TableFocusTargetElement["MoreButton"] = "moreButton";
})(TableFocusTargetElement || (TableFocusTargetElement = {}));
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
let Table = Table_1 = class Table extends UI5Element {
    constructor() {
        super();
        /**
         * Defines if the value of `noDataText` will be diplayed when there is no rows present in the table.
         * @default false
         * @public
         * @since 2.0.0
         */
        this.hideNoData = false;
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
        this.growing = "None";
        /**
         * Defines if the table is in busy state.
         *
         * In this state the component's opacity is reduced
         * and busy indicator is displayed at the bottom of the table.
         * @default false
         * @since 2.0.0
         * @public
         */
        this.busy = false;
        /**
         * Defines the delay in milliseconds, after which the busy indicator will show up for this component.
         * @default 1000
         * @public
         */
        this.busyDelay = 1000;
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
        this.stickyColumnHeader = false;
        /**
         * Defines the mode of the component.
         * @default "None"
         * @since 2.0.0
         * @public
         */
        this.mode = "None";
        this._noDataDisplayed = false;
        /**
         * Defines the active state of the `More` button.
         * @private
         */
        this._loadMoreActive = false;
        /**
         * Defines whether all rows are selected or not when table is in MultiSelect mode.
         * @default false
         * @since 2.0.0
         * @private
         */
        this._allRowsSelected = false;
        this.visibleColumns = []; // template loop should always have a defined array
        // The ItemNavigation requires each item to 1) have a "forcedTabIndex" property and 2) be either a UI5Element, or have an id property (to find it in the component's shadow DOM by)
        this._columnHeader = {
            id: `${this._id}-columnHeader`,
            forcedTabIndex: "0",
        };
        this._itemNavigation = new ItemNavigation(this, {
            navigationMode: NavigationMode.Vertical,
            affectedPropertiesNames: ["_columnHeader"],
            getItemsCallback: () => [this._columnHeader, ...this.rows],
            skipItemsSize: PAGE_UP_DOWN_SIZE,
        });
        this._handleResize = this.popinContent.bind(this);
        this.fnOnRowFocused = this.onRowFocused.bind(this);
        this.fnHandleF7 = this._handleF7.bind(this);
        this.tableEndObserved = false;
        // Stores the last focused element within the table.
        this.lastFocusedElement = null;
        // Indicates whether the table is forwarding focus before or after the current table row.
        this._forwardingFocus = false;
        // Stores the last focused nested element index (within a table row) for F7 navigation.
        this._prevNestedElementIndex = 0;
        // Indicates the Table bottom most part has been detected by the IntersectionObserver
        // for the first time.
        this.initialIntersection = true;
    }
    onBeforeRendering() {
        const columnSettings = this.getColumnPropagationSettings();
        const columnSettingsString = JSON.stringify(columnSettings);
        const rowsCount = this.rows.length + 1;
        const selectedRows = this.selectedRows;
        this.rows.forEach((row, index) => {
            if (row._columnsInfoString !== columnSettingsString) {
                row._columnsInfo = columnSettings;
                row._columnsInfoString = JSON.stringify(row._columnsInfo);
            }
            row.forcedAriaPosition = Table_1.i18nBundle.getText(TABLE_ROW_POSITION, index + 2, rowsCount);
            row.forcedBusy = this.busy;
            row.removeEventListener("ui5-_focused", this.fnOnRowFocused);
            row.addEventListener("ui5-_focused", this.fnOnRowFocused);
            row.removeEventListener("ui5-f7-pressed", this.fnHandleF7);
            row.addEventListener("ui5-f7-pressed", this.fnHandleF7);
            row.mode = this.mode;
        });
        this.visibleColumns = this.columns.filter((column, index) => {
            return !this._hiddenColumns?.[index];
        });
        this._noDataDisplayed = !this.rows.length && !this.hideNoData;
        this.visibleColumnsCount = this.visibleColumns.length;
        if (this.isMultiSelect) {
            // we have to count the selection column as well
            this.visibleColumnsCount += 1;
        }
        this._allRowsSelected = selectedRows.length === this.rows.length;
        this._prevFocusedRow = this._prevFocusedRow || this.rows[0];
    }
    onAfterRendering() {
        if (this.growsOnScroll) {
            this.observeTableEnd();
        }
    }
    onEnterDOM() {
        this.growingIntersectionObserver = this.getIntersectionObserver();
        ResizeHandler.register(this.getDomRef(), this._handleResize);
        this._itemNavigation.setCurrentItem(this.rows.length ? this.rows[0] : this._columnHeader);
    }
    onExitDOM() {
        ResizeHandler.deregister(this.getDomRef(), this._handleResize);
        this.growingIntersectionObserver.disconnect();
        this.growingIntersectionObserver = null;
        this.tableEndObserved = false;
    }
    _onkeydown(e) {
        if (isTabNext(e) || isTabPrevious(e)) {
            this._handleTab(e);
        }
        if (isCtrlA(e)) {
            e.preventDefault();
            this.isMultiSelect && this._selectAll();
        }
        if (isUpAlt(e) || isDownAlt(e)) {
            this._handleArrowAlt(e);
        }
        if ((isUpShift(e) || isDownShift(e)) && this.isMultiSelect) {
            this._handleArrowNav(e);
        }
        if (isHomeCtrl(e)) {
            e.preventDefault();
            this._itemNavigation._handleHome();
            this._itemNavigation._applyTabIndex();
            this._itemNavigation._focusCurrentItem();
        }
        if (isEndCtrl(e)) {
            e.preventDefault();
            this._itemNavigation._handleEnd();
            this._itemNavigation._applyTabIndex();
            this._itemNavigation._focusCurrentItem();
        }
        if ((isHomeShift(e) || isEndShift(e)) && this.isMultiSelect) {
            this._handleHomeEndSelection(e);
        }
    }
    _handleTab(e) {
        const isNext = isTabNext(e);
        const target = getNormalizedTarget(e.target);
        const targetType = this.getFocusedElementType(e.target);
        if (this.columnHeaderTabbables.includes(target)) {
            if (isNext && this.columnHeaderLastElement === target) {
                return this._focusNextElement();
            }
            return;
        }
        if (isNext && targetType === TableFocusTargetElement.ColumnHeader && !this.columnHeaderTabbables.length) {
            return this._focusNextElement();
        }
        if (targetType === TableFocusTargetElement.Row || !targetType) {
            return;
        }
        switch (targetType) {
            case TableFocusTargetElement.GroupRow:
                return isNext ? this._focusNextElement() : this._focusForwardElement(false);
            case TableFocusTargetElement.ColumnHeader:
                return !isNext && this._focusForwardElement(false);
            case TableFocusTargetElement.MoreButton:
                if (isNext) {
                    this._focusForwardElement(true);
                }
                else {
                    e.preventDefault();
                    this.currentElement?.focus();
                }
        }
    }
    _focusNextElement() {
        if (!this.growsWithButton) {
            this._focusForwardElement(true);
        }
        else {
            this.morеBtn.focus();
        }
    }
    _handleArrowNav(e) {
        const isRowFocused = this.currentElement.localName === "tr";
        if (!isRowFocused) {
            return;
        }
        const previouslySelectedRows = this.selectedRows;
        const currentItem = this.currentItem;
        const currentItemIdx = this.currentItemIdx;
        const prevItemIdx = currentItemIdx - 1;
        const nextItemIdx = currentItemIdx + 1;
        const prevItem = this.rows[prevItemIdx];
        const nextItem = this.rows[nextItemIdx];
        const wasSelected = !!currentItem.selected;
        if ((isUpShift(e) && !prevItem) || (isDownShift(e) && !nextItem)) {
            return;
        }
        if (isUpShift(e)) {
            currentItem.selected = currentItem.selected && !prevItem.selected;
            prevItem.selected = currentItem.selected || (wasSelected && !currentItem.selected);
            prevItem.focus();
        }
        if (isDownShift(e)) {
            currentItem.selected = currentItem.selected && !nextItem.selected;
            nextItem.selected = currentItem.selected || (wasSelected && !currentItem.selected);
            nextItem.focus();
        }
        const selectedRows = this.selectedRows;
        this.fireDecoratorEvent("selection-change", {
            selectedRows,
            previouslySelectedRows,
        });
    }
    _handleHomeEndSelection(e) {
        const isRowFocused = this.currentElement.localName === "tr";
        if (!isRowFocused) {
            return;
        }
        const rows = this.rows;
        const previouslySelectedRows = this.selectedRows;
        const currentItemIdx = this.currentItemIdx;
        if (isHomeShift(e)) {
            rows.slice(0, currentItemIdx + 1).forEach(item => {
                item.selected = true;
            });
            rows[0].focus();
        }
        if (isEndShift(e)) {
            rows.slice(currentItemIdx).forEach(item => {
                item.selected = true;
            });
            rows[rows.length - 1].focus();
        }
        const selectedRows = this.selectedRows;
        this.fireDecoratorEvent("selection-change", {
            selectedRows,
            previouslySelectedRows,
        });
    }
    /**
     * Handles Alt + Up/Down.
     * Switches focus between column header, last focused item, and "More" button (if applicable).
     * @private
     */
    _handleArrowAlt(e) {
        const shouldMoveUp = isUpAlt(e);
        const target = e.target;
        const focusedElementType = this.getFocusedElementType(target);
        if (shouldMoveUp) {
            switch (focusedElementType) {
                case TableFocusTargetElement.Row:
                case TableFocusTargetElement.GroupRow:
                    this._prevFocusedRow = target;
                    return this._onColumnHeaderClick(e);
                case TableFocusTargetElement.ColumnHeader:
                    return this.morеBtn ? this.morеBtn.focus() : this._prevFocusedRow?.focus();
                case TableFocusTargetElement.MoreButton:
                    return this._prevFocusedRow ? this._prevFocusedRow.focus() : this._onColumnHeaderClick(e);
            }
        }
        else {
            switch (focusedElementType) {
                case TableFocusTargetElement.Row:
                case TableFocusTargetElement.GroupRow:
                    this._prevFocusedRow = target;
                    return this.morеBtn ? this.morеBtn.focus() : this._onColumnHeaderClick(e);
                case TableFocusTargetElement.ColumnHeader:
                    if (this._prevFocusedRow) {
                        this._prevFocusedRow.focus();
                    }
                    else if (this.morеBtn) {
                        this.morеBtn.focus();
                    }
                    return;
                case TableFocusTargetElement.MoreButton:
                    return this._onColumnHeaderClick(e);
            }
        }
    }
    /**
     * Determines the type of the currently focused element.
     * @private
     */
    getFocusedElementType(element) {
        if (element === this.columnHeader) {
            return TableFocusTargetElement.ColumnHeader;
        }
        if (element === this.morеBtn) {
            return TableFocusTargetElement.MoreButton;
        }
        if (this.rows.includes(element)) {
            const isGroupRow = element.hasAttribute("ui5-table-group-row");
            return isGroupRow ? TableFocusTargetElement.GroupRow : TableFocusTargetElement.Row;
        }
    }
    /**
     * Toggles focus between the table row's root and the last focused nested element.
     * @private
     */
    _handleF7(e) {
        const row = e.detail.row;
        row.tabbableElements = getTabbableElements(row);
        const activeElement = getActiveElement();
        const lastFocusedElement = row.tabbableElements[this._prevNestedElementIndex] || row.tabbableElements[0];
        const targetIndex = row.tabbableElements.indexOf(activeElement);
        if (!row.tabbableElements.length) {
            return;
        }
        if (activeElement === row.root) {
            lastFocusedElement.focus();
        }
        else if (targetIndex > -1) {
            this._prevNestedElementIndex = targetIndex;
            row.root.focus();
        }
    }
    _onfocusin(e) {
        const target = getNormalizedTarget(e.target);
        if (!this._isForwardElement(target)) {
            this.lastFocusedElement = target;
            return;
        }
        if (!this._forwardingFocus) {
            if (this.lastFocusedElement) {
                this.lastFocusedElement.focus();
            }
            else {
                this.currentElement.focus();
            }
            e.stopImmediatePropagation();
        }
        this._forwardingFocus = false;
    }
    _onForwardBefore(e) {
        this.lastFocusedElement = e.detail.target;
        this._focusForwardElement(false);
        e.stopImmediatePropagation();
    }
    _onForwardAfter(e) {
        this.lastFocusedElement = e.detail.target;
        if (!this.growsWithButton) {
            this._focusForwardElement(true);
        }
        else {
            this.morеBtn.focus();
        }
    }
    _focusForwardElement(isAfter) {
        this._forwardingFocus = true;
        this.shadowRoot.querySelector(`#${this._id}-${isAfter ? "after" : "before"}`).focus();
    }
    _isForwardElement(element) {
        const elementId = element.id;
        const afterElement = this._getForwardElement(true);
        const beforeElement = this._getForwardElement(false);
        if (this._id === elementId || (beforeElement && beforeElement.id === elementId)) {
            return true;
        }
        return !!(afterElement && afterElement.id === elementId);
    }
    _getForwardElement(isAfter) {
        if (isAfter) {
            return this._getAfterForwardElement();
        }
        return this._getBeforeForwardElement();
    }
    _getAfterForwardElement() {
        if (!this._afterElement) {
            this._afterElement = this.shadowRoot.querySelector(`[id="${this._id}-after"]`);
        }
        return this._afterElement;
    }
    _getBeforeForwardElement() {
        if (!this._beforeElement) {
            this._beforeElement = this.shadowRoot.querySelector(`[id="${this._id}-before"]`);
        }
        return this._beforeElement;
    }
    onRowFocused(e) {
        this._itemNavigation.setCurrentItem(e.target);
    }
    onRowKeyDown(e) {
        if (this.growing === "Scroll" && isDown(e) && this.currentItemIdx === this.rows.length - 1) {
            debounce(this.loadMore.bind(this), GROWING_WITH_SCROLL_DEBOUNCE_RATE);
        }
    }
    _onColumnHeaderFocused() {
        this._itemNavigation.setCurrentItem(this._columnHeader);
    }
    _onColumnHeaderClick(e) {
        if (!e.target) {
            this.columnHeader.focus();
        }
        const target = getNormalizedTarget(e.target);
        const isNestedElement = this.columnHeaderTabbables.includes(target);
        if (!isNestedElement) {
            this.columnHeader.focus();
        }
    }
    _onColumnHeaderKeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this.isMultiSelect && this._selectAll();
        }
    }
    _onLoadMoreKeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this._loadMoreActive = true;
        }
        if (isEnter(e)) {
            this._onLoadMoreClick();
            this._loadMoreActive = true;
        }
    }
    _onLoadMoreKeyup(e) {
        if (isSpace(e)) {
            this._onLoadMoreClick();
        }
        this._loadMoreActive = false;
    }
    onInvalidation(change) {
        if (change.type === "property" && change.name === "growing") {
            this.tableEndObserved = false;
            this.getIntersectionObserver().disconnect();
        }
    }
    _onLoadMoreClick() {
        this.fireDecoratorEvent("load-more");
    }
    observeTableEnd() {
        if (!this.tableEndObserved) {
            this.getIntersectionObserver().observe(this.tableEndDOM);
            this.tableEndObserved = true;
        }
    }
    onInteresection(entries) {
        if (this.initialIntersection) {
            this.initialIntersection = false;
            return;
        }
        if (entries.some(entry => entry.isIntersecting)) {
            debounce(this.loadMore.bind(this), GROWING_WITH_SCROLL_DEBOUNCE_RATE);
        }
    }
    loadMore() {
        this.fireDecoratorEvent("load-more");
    }
    _handleSingleSelect(e) {
        const row = this.getRowParent(e.target);
        if (!row) {
            return;
        }
        if (!row.selected) {
            const previouslySelectedRows = this.selectedRows;
            this.rows.forEach(item => {
                if (item.selected) {
                    item.selected = false;
                }
            });
            row.selected = true;
            this.fireDecoratorEvent("selection-change", {
                selectedRows: [row],
                previouslySelectedRows,
            });
        }
    }
    _handleMultiSelect(e) {
        const row = this.getRowParent(e.target);
        const previouslySelectedRows = this.selectedRows;
        if (!row) {
            return;
        }
        row.selected = !row.selected;
        const selectedRows = this.selectedRows;
        if (selectedRows.length === this.rows.length) {
            this._allRowsSelected = true;
        }
        else {
            this._allRowsSelected = false;
        }
        this.fireDecoratorEvent("selection-change", {
            selectedRows,
            previouslySelectedRows,
        });
    }
    _handleSelect(e) {
        if (this.isSingleSelect) {
            this._handleSingleSelect(e);
            return;
        }
        if (this.isMultiSelect) {
            this._handleMultiSelect(e);
        }
    }
    _selectAll() {
        const bAllSelected = !this._allRowsSelected;
        const previouslySelectedRows = this.rows.filter(row => row.selected);
        this._allRowsSelected = bAllSelected;
        this.rows.forEach(row => {
            row.selected = bAllSelected;
        });
        const selectedRows = bAllSelected ? this.rows : [];
        this.fireDecoratorEvent("selection-change", {
            selectedRows,
            previouslySelectedRows,
        });
    }
    getRowParent(child) {
        if (child.hasAttribute("ui5-table-row")) {
            return child;
        }
        const parent = child.parentElement;
        if (!parent) {
            return;
        }
        if (parent.hasAttribute("ui5-table-row")) {
            return parent;
        }
        return this.getRowParent(parent);
    }
    get columnHeader() {
        const domRef = this.getDomRef();
        return domRef ? domRef.querySelector(`#${this._id}-columnHeader`) : null;
    }
    get morеBtn() {
        const domRef = this.getDomRef();
        if (this.growsWithButton && domRef) {
            return domRef.querySelector(`#${this._id}-growingButton`);
        }
        return null;
    }
    handleResize() {
        this.popinContent();
    }
    popinContent() {
        const clientRect = this.getDomRef().getBoundingClientRect();
        const tableWidth = clientRect.width;
        const hiddenColumns = [];
        const visibleColumnsIndexes = [];
        // store the hidden columns
        this.columns.forEach((column, index) => {
            if (tableWidth < column.minWidth && column.minWidth !== Infinity) {
                hiddenColumns[index] = {
                    index,
                    popinText: column.popinText,
                    demandPopin: column.demandPopin,
                };
            }
            else {
                visibleColumnsIndexes.push(index);
            }
        });
        if (visibleColumnsIndexes.length) {
            if (!this.isMultiSelect) {
                this.columns[visibleColumnsIndexes[0]].first = true;
            }
            this.columns[visibleColumnsIndexes[visibleColumnsIndexes.length - 1]].last = true;
        }
        const hiddenColumnsChange = (this._hiddenColumns?.length !== hiddenColumns.length) || this._hiddenColumns?.some((column, index) => column !== hiddenColumns[index]);
        const shownColumnsChange = hiddenColumns.length === 0;
        // invalidate if hidden columns count has changed or columns are shown
        if (hiddenColumnsChange || shownColumnsChange) {
            this._hiddenColumns = hiddenColumns;
            this.fireDecoratorEvent("popin-change", {
                poppedColumns: this._hiddenColumns,
            });
        }
    }
    /**
     * Gets settings to be propagated from columns to rows.
     */
    getColumnPropagationSettings() {
        return this.columns.map((column, index) => {
            return {
                index,
                minWidth: column.minWidth,
                demandPopin: column.demandPopin,
                text: column.textContent,
                popinText: column.popinText,
                popinDisplay: column.popinDisplay,
                visible: !this._hiddenColumns?.[index],
            };
        }, this);
    }
    getIntersectionObserver() {
        if (!this.growingIntersectionObserver) {
            this.growingIntersectionObserver = new IntersectionObserver(this.onInteresection.bind(this), {
                root: document,
                rootMargin: "0px",
                threshold: 1.0,
            });
        }
        return this.growingIntersectionObserver;
    }
    get growsWithButton() {
        return this.growing === TableGrowingMode.Button;
    }
    get growsOnScroll() {
        return this.growing === TableGrowingMode.Scroll;
    }
    get _growingButtonText() {
        return this.growingButtonText || Table_1.i18nBundle.getText(LOAD_MORE_TEXT);
    }
    get ariaLabelText() {
        const rowsCount = this.rows.length + 1;
        const headerRowText = Table_1.i18nBundle.getText(TABLE_HEADER_ROW_INFORMATION, rowsCount);
        const columnsTitle = this.columns.map(column => {
            return column.textContent.trim();
        }).join(" ");
        return `${headerRowText} ${columnsTitle}`;
    }
    get tableAriaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get ariaLabelSelectAllText() {
        return Table_1.i18nBundle.getText(ARIA_LABEL_SELECT_ALL_CHECKBOX);
    }
    get loadMoreAriaLabelledBy() {
        if (this.growingButtonSubtext) {
            return `${this._id}-growingButton-text ${this._id}-growingButton-subtext`;
        }
        return `${this._id}-growingButton-text`;
    }
    get tableEndDOM() {
        return this.shadowRoot.querySelector(".ui5-table-end-marker");
    }
    get isMultiSelect() {
        return this.mode === TableMode.MultiSelect;
    }
    get isSingleSelect() {
        return this.mode === TableMode.SingleSelect;
    }
    get selectedRows() {
        return this.rows.filter(row => row.selected);
    }
    get currentItemIdx() {
        return this.rows.indexOf(this.currentItem);
    }
    get currentItem() {
        return this.getRootNode().activeElement;
    }
    get currentElement() {
        return this._itemNavigation._getCurrentItem();
    }
    get columnHeaderTabbables() {
        return this.columnHeader ? getTabbableElements(this.columnHeader) : [];
    }
    get columnHeaderLastElement() {
        return this.columnHeader && getLastTabbableElement(this.columnHeader);
    }
};
__decorate([
    property()
], Table.prototype, "noDataText", void 0);
__decorate([
    property()
], Table.prototype, "growingButtonText", void 0);
__decorate([
    property()
], Table.prototype, "growingButtonSubtext", void 0);
__decorate([
    property({ type: Boolean })
], Table.prototype, "hideNoData", void 0);
__decorate([
    property()
], Table.prototype, "growing", void 0);
__decorate([
    property({ type: Boolean })
], Table.prototype, "busy", void 0);
__decorate([
    property({ type: Number })
], Table.prototype, "busyDelay", void 0);
__decorate([
    property({ type: Boolean })
], Table.prototype, "stickyColumnHeader", void 0);
__decorate([
    property()
], Table.prototype, "mode", void 0);
__decorate([
    property()
], Table.prototype, "accessibleName", void 0);
__decorate([
    property()
], Table.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Array })
], Table.prototype, "_hiddenColumns", void 0);
__decorate([
    property({ type: Boolean })
], Table.prototype, "_noDataDisplayed", void 0);
__decorate([
    property({ type: Boolean })
], Table.prototype, "_loadMoreActive", void 0);
__decorate([
    property({ type: Object })
], Table.prototype, "_columnHeader", void 0);
__decorate([
    property({ type: Boolean })
], Table.prototype, "_allRowsSelected", void 0);
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
        individualSlots: true,
        invalidateOnChildChange: true,
    })
], Table.prototype, "rows", void 0);
__decorate([
    slot({
        type: HTMLElement,
        individualSlots: true,
        invalidateOnChildChange: {
            properties: true,
            slots: false,
        },
    })
], Table.prototype, "columns", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Table, "i18nBundle", void 0);
Table = Table_1 = __decorate([
    customElement({
        tag: "ui5-table",
        fastNavigation: true,
        styles: tableStyles,
        renderer: jsxRenderer,
        template: TableTemplate,
    })
    /** Fired when a row in `Active` mode is clicked or `Enter` key is pressed.
     * @param {HTMLElement} row the activated row.
     * @public
     */
    ,
    event("row-click", {
        bubbles: true,
    })
    /**
     * Fired when `ui5-table-column` is shown as a pop-in instead of hiding it.
     * @param {Array} poppedColumns popped-in columns.
     * @since 2.0.0
     * @public
     */
    ,
    event("popin-change", {
        bubbles: true,
    })
    /**
     * Fired when the user presses the `More` button or scrolls to the table's end.
     *
     * **Note:** The event will be fired if `growing` is set to `Button` or `Scroll`.
     * @public
     * @since 2.0.0
     */
    ,
    event("load-more", {
        bubbles: true,
    })
    /**
     * Fired when selection is changed by user interaction
     * in `SingleSelect` and `MultiSelect` modes.
     * @param {Array} selectedRows An array of the selected rows.
     * @param {Array} previouslySelectedRows An array of the previously selected rows.
     * @public
     * @since 2.0.0
     */
    ,
    event("selection-change", {
        bubbles: true,
    })
], Table);
patchScopingSuffix(Table);
Table.define();
export default Table;
//# sourceMappingURL=Table.js.map