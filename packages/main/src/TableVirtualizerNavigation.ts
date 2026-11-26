import {
	isUp,
	isUpShift,
	isDown,
	isDownShift,
	isPageUp,
	isPageDown,
	isHome,
	isEnd,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import getParentElement from "@ui5/webcomponents-base/dist/util/getParentElement.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { findRowInPath } from "./TableUtils.js";
import type TableVirtualizer from "./TableVirtualizer.js";
import type TableRow from "./TableRow.js";
import type Table from "./Table.js";

type FocusPosition = {
	index: number,
	col: number,
};

type PendingFocus = {
	tab?: "first" | "last",
};

/**
 * Keeps keyboard focus on a logical row while the application renders or recycles its DOM.
 * @private
 */
class TableVirtualizerNavigation {
	_focus?: FocusPosition;
	_focusPending?: PendingFocus;
	_domFocusIndex = -1;
	_hasFocus = false;
	_focusing = false;
	_focusCheckQueued = false;
	_onTableInvalidateBound = this._onTableInvalidate.bind(this);
	private _virtualizer: TableVirtualizer;

	constructor(virtualizer: TableVirtualizer) {
		this._virtualizer = virtualizer;
	}

	get _table() {
		return this._virtualizer._table;
	}

	get _scrollContainer() {
		return this._virtualizer._scrollContainer;
	}

	connect(table: Table) {
		table.attachInvalidate(this._onTableInvalidateBound);
	}

	disconnect(table: Table) {
		table.detachInvalidate(this._onTableInvalidateBound);
	}

	reset() {
		this._focus = undefined;
		this._focusPending = undefined;
	}

	_getRowOf(element?: Element | null): TableRow | undefined {
		while (element && element !== this._table) {
			if (element.hasAttribute("ui5-table-row")) {
				return element as TableRow;
			}
			element = element.parentNode ? getParentElement(element) : null;
		}
	}

	_isSink(element?: Element | null) {
		return !!this._table && element === this._scrollContainer;
	}

	_getEventRow(event: Event) {
		const path = event.composedPath();
		return findRowInPath(path.slice(0, path.indexOf(this._table!)));
	}

	_isInTable(element?: Element | null) {
		while (element) {
			if (element === this._table) {
				return true;
			}
			element = element.parentNode ? getParentElement(element) : null;
		}
		return false;
	}

	_withPreventedScroll(focus: () => void) {
		this._focusing = true;
		try {
			focus();
		} finally {
			this._focusing = false;
		}
	}

	_focusSink() {
		const scrollContainer = this._scrollContainer;
		if (getActiveElement() !== scrollContainer) {
			scrollContainer.setAttribute("tabindex", "-1");
			this._withPreventedScroll(() => scrollContainer.focus({ preventScroll: true }));
		}
	}

	_onTableInvalidate() {
		if (this._hasFocus && this._focus && !this._focusCheckQueued) {
			this._focusCheckQueued = true;
			queueMicrotask(() => this._checkFocus());
		}
	}

	_checkFocus() {
		this._focusCheckQueued = false;
		if (!this._table || !this._hasFocus || !this._focus) {
			return;
		}

		const activeElement = getActiveElement();
		if (!activeElement || activeElement === document.body) {
			this._focusSink();
		} else if (!this._isSink(activeElement)) {
			const row = this._getRowOf(activeElement);
			if (row && row.position !== this._domFocusIndex) {
				if (row.position === this._focus.index) {
					this._domFocusIndex = row.position;
				} else {
					this._focusSink();
				}
			}
		}

		this.resolveFocus();
	}

	resolveFocus() {
		if (!this._table || !this._focus || !this._hasFocus) {
			return;
		}

		const activeElement = getActiveElement();
		if (!this._focusPending && !this._isSink(activeElement)) {
			return;
		}

		const row = this._virtualizer._findRow(this._focus.index);
		if (row) {
			this._focusRow(row, this._focus.col, this._focusPending?.tab);
		}
	}

	_focusRow(row: TableRow, col: number, tab?: "first" | "last") {
		const navigation = this._table!._tableNavigation;
		if (!navigation) {
			return false;
		}

		let element: HTMLElement;
		if (tab) {
			// the content of loading rows is hidden, so the row itself gets the focus
			const tabbables = row.loading ? [] : getTabbableElements(row);
			element = (tab === "first" ? tabbables[0] : tabbables[tabbables.length - 1]) || row;
		} else {
			const items = navigation._getNavigationItemsOfRow(row);
			if (col > 0 && items.length <= 1) {
				return false; // the row is not rendered yet
			}
			element = items[Math.min(col, items.length - 1)];
		}

		navigation._getNavigationItemsOfGrid();
		navigation._gridWalker.setCurrent(element);
		this._focusPending = undefined;
		this._withPreventedScroll(() => navigation._focusElement(element, true, true));

		this._domFocusIndex = row.position!;
		this._focus = { index: row.position!, col: tab ? this._focus?.col ?? col : col };
		this._scrollContainer.removeAttribute("tabindex");
		return true;
	}

	_navigateTo(index: number, col: number, align: "start" | "end" | "nearest", tab?: "first" | "last") {
		this._focus = { index, col };
		this._focusPending = { tab };
		this._virtualizer._ensureVisible(index, align);
		this.resolveFocus();
	}

	onFocusIn(e: FocusEvent, eventOrigin: HTMLElement) {
		this._hasFocus = true;
		if (this._isSink(eventOrigin) || this._focusing || !this._table) {
			return;
		}

		const row = this._getEventRow(e);
		if (!row || row.position === undefined) {
			this._focus = undefined;
			this._focusPending = undefined;
			return;
		}

		const navigation = this._table._tableNavigation;
		const items = navigation ? navigation._getNavigationItemsOfRow(row) : [];
		const item = e.composedPath().find(target => items.includes(target as HTMLElement)) as HTMLElement | undefined;
		this._focus = { index: row.position, col: Math.max(0, item ? items.indexOf(item) : 0) };
		this._focusPending = undefined;
		this._domFocusIndex = row.position;
	}

	onFocusOut(e: FocusEvent) {
		const relatedTarget = e.relatedTarget as Node | null;
		if (!this._table || this._focusing || (relatedTarget && this._table.contains(relatedTarget))) {
			return;
		}

		const row = this._getEventRow(e);
		const position = row?.position;
		queueMicrotask(() => {
			const table = this._table;
			const activeElement = getActiveElement();
			if (!table || this._isInTable(activeElement)) {
				return;
			}

			// the focused row was removed or recycled for another index by the application
			const recycled = !!row && (row.parentElement !== table || row.position !== position || position !== this._domFocusIndex);
			if (recycled && (!activeElement || activeElement === document.body)) {
				this._focusSink();
				this.resolveFocus();
			} else {
				this._hasFocus = false;
				this._scrollContainer.removeAttribute("tabindex");
			}
		});
	}

	onKeyDown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		const table = this._table;
		const navigation = table?._tableNavigation;
		const count = this._virtualizer._model.count;
		if (!table || !navigation || !count || e.defaultPrevented) {
			return;
		}

		this._virtualizer._onInput();
		let index: number;
		let col: number;
		const row = this._getEventRow(e);
		if (this._isSink(eventOrigin) || (this._focusPending && this._focus)) {
			if (!this._focus) {
				return;
			}
			if (this._isSink(eventOrigin) && (isTabNext(e) || isTabPrevious(e))) {
				navigation._focusElement(e.shiftKey ? table._beforeElement : table._afterElement);
				return;
			}
			({ index, col } = this._focus);
		} else if (row && row.position !== undefined) {
			const items = navigation._getNavigationItemsOfRow(row);
			col = items.indexOf(eventOrigin);
			index = row.position;
			if (col === -1) {
				this._handleTabInContent(e, eventOrigin);
				return;
			}
		} else {
			this._handleHeaderKey(e, eventOrigin);
			return;
		}

		const last = count - 1;
		let target: number | undefined;
		if (e.altKey || e.ctrlKey || e.metaKey) {
			return;
		}

		if (isDown(e) || isDownShift(e)) {
			target = index < last ? index + 1 : undefined;
		} else if (isUp(e) || isUpShift(e)) {
			target = index > 0 ? index - 1 : undefined;
		} else if (isPageDown(e)) {
			target = index < last ? this._getPageDownIndex(index) : undefined;
		} else if (isPageUp(e)) {
			target = index > 0 ? this._getPageUpIndex(index) : undefined;
		} else if (isHome(e) && col === 0) {
			target = index > 0 ? 0 : undefined;
		} else if (isEnd(e) && col === 0) {
			target = index < last ? last : undefined;
		} else {
			return;
		}

		if (target === undefined) {
			if (this._focusPending || this._isSink(eventOrigin)) {
				target = index; // the boundary is reached while the focused row is not rendered
			} else {
				return; // let the TableNavigation handle the boundaries, e.g. moving to the header row
			}
		}

		e.preventDefault();
		this._navigateTo(target, col, "nearest");
	}

	_handleHeaderKey(e: KeyboardEvent, eventOrigin: HTMLElement) {
		const headerRow = this._virtualizer._headerRow;
		const navigation = this._table!._tableNavigation!;
		if (!headerRow || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
			return;
		}

		const col = navigation._getNavigationItemsOfRow(headerRow).indexOf(eventOrigin);
		if (col === -1) {
			return;
		}

		let target: number | undefined;
		if (isDown(e)) {
			target = this._getFirstFullyVisibleIndex();
		} else if (isPageDown(e)) {
			target = this._getLastFullyVisibleIndex();
		} else if (isEnd(e) && col === 0) {
			target = this._virtualizer._model.count - 1;
		}

		if (target !== undefined) {
			e.preventDefault();
			this._navigateTo(target, col, "nearest");
		}
	}

	_handleTabInContent(e: KeyboardEvent, eventOrigin: HTMLElement) {
		const next = isTabNext(e);
		if (!next && !isTabPrevious(e)) {
			return;
		}

		const rows = this._virtualizer._getRows();
		const edgeRow = next ? rows[rows.length - 1] : rows[0];
		if (!edgeRow) {
			return;
		}

		const target = edgeRow.position! + (next ? 1 : -1);
		if (target < 0 || target >= this._virtualizer._model.count) {
			return;
		}

		const tabbables = getTabbableElements(edgeRow);
		if ((next ? tabbables[tabbables.length - 1] : tabbables[0]) === eventOrigin) {
			e.preventDefault();
			this._navigateTo(target, this._focus?.col ?? 0, "nearest", next ? "first" : "last");
		}
	}

	_getFirstFullyVisibleIndex() {
		const virtualizer = this._virtualizer;
		const viewport = virtualizer._getViewport();
		const index = virtualizer._indexAt(Math.max(0, viewport.top));
		return virtualizer._pos(index) < viewport.top - 0.5 && index < virtualizer._model.count - 1 ? index + 1 : index;
	}

	_getLastFullyVisibleIndex() {
		const virtualizer = this._virtualizer;
		const viewport = virtualizer._getViewport();
		const index = virtualizer._indexAt(viewport.bottom - 1);
		return virtualizer._pos(index) + virtualizer._model.height(index) > viewport.bottom + 0.5 && index > 0 ? index - 1 : index;
	}

	_getPageDownIndex(index: number) {
		const lastVisible = this._getLastFullyVisibleIndex();
		if (index < lastVisible && !this._focusPending) {
			return lastVisible;
		}

		const virtualizer = this._virtualizer;
		const viewport = virtualizer._getViewport();
		const bottom = virtualizer._pos(index) + (viewport.bottom - viewport.top);
		let target = virtualizer._indexAt(bottom - 1);
		if (virtualizer._pos(target) + virtualizer._model.height(target) > bottom + 0.5) {
			target--;
		}
		return Math.min(virtualizer._model.count - 1, Math.max(target, index + 1));
	}

	_getPageUpIndex(index: number) {
		const firstVisible = this._getFirstFullyVisibleIndex();
		if (index > firstVisible && !this._focusPending) {
			return firstVisible;
		}

		const virtualizer = this._virtualizer;
		const viewport = virtualizer._getViewport();
		const top = virtualizer._pos(index) + virtualizer._model.height(index) - (viewport.bottom - viewport.top);
		let target = virtualizer._indexAt(Math.max(0, top));
		if (virtualizer._pos(target) < top - 0.5) {
			target++;
		}
		return Math.max(0, Math.min(target, index - 1));
	}
}

export default TableVirtualizerNavigation;
