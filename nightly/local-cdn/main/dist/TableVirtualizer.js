var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable no-bitwise */
import { isUp, isUpShift, isDown, isDownShift, isPageUp, isPageDown, isHome, isEnd, isTabNext, isTabPrevious, } from "@ui5/webcomponents-base/dist/Keys.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { throttle } from "./TableUtils.js";
var TabBlocking;
(function (TabBlocking) {
    TabBlocking[TabBlocking["None"] = 0] = "None";
    TabBlocking[TabBlocking["Next"] = 1] = "Next";
    TabBlocking[TabBlocking["Previous"] = 2] = "Previous";
    TabBlocking[TabBlocking["Released"] = 4] = "Released";
    TabBlocking[TabBlocking["NextReleased"] = 5] = "NextReleased";
    TabBlocking[TabBlocking["PreviousReleased"] = 6] = "PreviousReleased";
})(TabBlocking || (TabBlocking = {}));
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
let TableVirtualizer = class TableVirtualizer extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the height of the rows in the table.
         *
         * **Note:** For virtualization to work properly, this property is mandatory.
         *
         * @default 45
         * @public
         */
        this.rowHeight = 45;
        /**
         * Defines the total count of rows in the table.
         *
         * **Note:** For virtualization to work properly, this property is mandatory.
         *
         * @default 100
         * @public
         */
        this.rowCount = 100;
        /**
         * Defines the count of extra rows to be rendered at the top and bottom of the table.
         *
         * **Note:** This property is experimental and may be changed or deleted in the future.
         *
         * @default 0
         * @public
         */
        this.extraRows = 0;
        this.identifier = "TableVirtualizer";
        this._lastRowPosition = 0;
        this._firstRowPosition = 0;
        this._visibleRowCount = 0;
        this._tabBlockingState = TabBlocking.None;
        this._onScrollBound = throttle(this._onScroll.bind(this));
        this._onRowInvalidateBound = this._onRowInvalidate.bind(this);
    }
    onAfterRendering() {
        this._table && this._table._invalidate++;
    }
    onTableAfterRendering(table) {
        if (!this._table) {
            this._table = table;
            this._scrollContainer.addEventListener("scroll", this._onScrollBound, { passive: true });
            this._updateRowsHeight();
            this._onScroll();
        }
        else {
            this._updateRowsHeight();
        }
        if (this._tabBlockingState & TabBlocking.Released) {
            const tabBlockingRow = this._table.rows.at(this._tabBlockingState & TabBlocking.Next ? -1 : 0);
            const tabForwardingElement = getTabbableElements(tabBlockingRow).at(this._tabBlockingState & TabBlocking.Next ? 0 : -1);
            this._tabBlockingState = TabBlocking.None;
            (tabForwardingElement || tabBlockingRow).focus();
        }
    }
    onExitDOM() {
        if (this._table) {
            this._scrollContainer.removeEventListener("scroll", this._onScrollBound);
            this._table = undefined;
        }
    }
    /**
     * Resets the virtualizer to its initial state and triggers the `range-change` event.
     * @public
     */
    reset() {
        this._lastRowPosition = -1;
        this._firstRowPosition = -1;
        if (this._table) {
            if (this._scrollContainer.scrollTop > 0) {
                this._scrollContainer.scrollTop = 0;
            }
            else {
                this._onScroll();
            }
        }
    }
    get _scrollContainer() {
        return this._table._tableElement;
    }
    get _rowsContainer() {
        return this._table.shadowRoot.getElementById("rows");
    }
    _onScroll() {
        const headerRow = this._table.headerRow[0];
        const headerHeight = headerRow.offsetHeight;
        let scrollTop = this._scrollContainer.scrollTop;
        let scrollableHeight = this._scrollContainer.clientHeight;
        if (headerRow.sticky) {
            scrollableHeight = Math.max(0, scrollableHeight - headerHeight);
        }
        else {
            scrollTop = Math.max(0, scrollTop - headerHeight);
        }
        this._visibleRowCount = Math.ceil(scrollableHeight / this.rowHeight);
        let firstRowPosition = Math.floor(scrollTop / this.rowHeight) - this.extraRows;
        firstRowPosition = Math.max(0, firstRowPosition);
        let lastRowPosition = Math.max(0, firstRowPosition + this._visibleRowCount + 2 * this.extraRows);
        lastRowPosition = Math.min(lastRowPosition, this.rowCount);
        if (this._firstRowPosition === firstRowPosition && this._lastRowPosition === lastRowPosition) {
            return;
        }
        this._lastRowPosition = lastRowPosition;
        this._firstRowPosition = firstRowPosition;
        this.fireDecoratorEvent("range-change", {
            first: firstRowPosition,
            last: lastRowPosition,
        });
    }
    _updateRowsHeight() {
        const rowsHeight = this.rowCount * this.rowHeight;
        this._rowsContainer.style.height = `${rowsHeight}px`;
    }
    _getTransform() {
        if (!this._table) {
            return;
        }
        const firstRow = this._table.rows[0];
        if (firstRow && firstRow.position !== undefined && firstRow.position > 0) {
            const transform = firstRow.position * this.rowHeight;
            return `translateY(${transform}px)`;
        }
    }
    _onRowInvalidate(invalidationInfo) {
        if (invalidationInfo.name === "position") {
            invalidationInfo.target.detachInvalidate(this._onRowInvalidateBound);
            this._tabBlockingState |= TabBlocking.Released;
        }
    }
    _onKeyDown(e) {
        if (!this._table) {
            return;
        }
        let scrollTopChange = 0;
        const rows = this._table.rows;
        const firstRow = rows[0];
        const lastRow = rows[rows.length - 1];
        const hasDataBeforeFirstRow = firstRow.position !== 0;
        const hasDataAfterLastRow = lastRow.position !== this.rowCount - 1;
        const tableNavigation = this._table._tableNavigation;
        const activeElement = getActiveElement();
        if (isTabNext(e) && hasDataAfterLastRow && getTabbableElements(this._rowsContainer).pop() === activeElement) {
            this._tabBlockingState = TabBlocking.Next;
            lastRow.attachInvalidate(this._onRowInvalidateBound);
            scrollTopChange = this.rowHeight;
        }
        else if (isTabPrevious(e) && hasDataBeforeFirstRow && getTabbableElements(this._rowsContainer).shift() === activeElement) {
            this._tabBlockingState = TabBlocking.Previous;
            firstRow.attachInvalidate(this._onRowInvalidateBound);
            scrollTopChange = this.rowHeight * -1;
        }
        else if (hasDataAfterLastRow && tableNavigation._getNavigationItemsOfRow(lastRow).includes(activeElement)) {
            if (isDown(e) || isDownShift(e)) {
                scrollTopChange = this.rowHeight;
            }
            else if (isPageDown(e)) {
                scrollTopChange = this._visibleRowCount * this.rowHeight;
            }
            else if (isEnd(e) && activeElement === lastRow) {
                scrollTopChange = this.rowCount * this.rowHeight;
            }
        }
        else if (hasDataBeforeFirstRow && tableNavigation._getNavigationItemsOfRow(firstRow).includes(activeElement)) {
            if (isUp(e) || isUpShift(e)) {
                scrollTopChange = this.rowHeight * -1;
            }
            else if (isPageUp(e)) {
                scrollTopChange = this._visibleRowCount * this.rowHeight * -1;
            }
            else if (isHome(e) && activeElement === firstRow) {
                scrollTopChange = this.rowCount * this.rowHeight * -1;
            }
        }
        if (scrollTopChange) {
            const scrollTop = this._table.scrollTop;
            this._scrollContainer.scrollTop += scrollTopChange;
            if (this._scrollContainer.scrollTop !== scrollTop) {
                e.preventDefault();
            }
        }
    }
};
__decorate([
    property({ type: Number })
], TableVirtualizer.prototype, "rowHeight", void 0);
__decorate([
    property({ type: Number })
], TableVirtualizer.prototype, "rowCount", void 0);
__decorate([
    property({ type: Number })
], TableVirtualizer.prototype, "extraRows", void 0);
TableVirtualizer = __decorate([
    customElement({ tag: "ui5-table-virtualizer" })
    /**
     * Fired when the virtualizer is changed by user interaction e.g. on scrolling.
     *
     * @param {number} first The 0-based index of the first children currently rendered
     * @param {number} last The 0-based index of the last children currently rendered
     * @public
     */
    ,
    event("range-change")
], TableVirtualizer);
TableVirtualizer.define();
export default TableVirtualizer;
//# sourceMappingURL=TableVirtualizer.js.map