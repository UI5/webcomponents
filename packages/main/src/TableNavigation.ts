import {
	isUp, isUpShift, isDown, isDownShift, isLeft, isRight, isPageUp, isPageDown, isHome, isEnd, isTabNext, isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import isElementHidden from "@ui5/webcomponents-base/dist/util/isElementHidden.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
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
class TableNavigation extends TableExtension {
	_table: Table;
	_gridWalker: GridWalker;
	_colPosition: number = 0;
	_tabPosition: number = 0;
	_ignoreFocusIn?: boolean;
	_lastFocusedItem?: HTMLElement;
	_onKeyDownCaptureBound: (e: KeyboardEvent) => void;

	constructor(table: Table) {
		super();
		this._table = table;
		this._gridWalker = new GridWalker();
		this._onKeyDownCaptureBound = this._onKeyDownCapture.bind(this);

		// we register the keydown handler on the table element at the capturing phase since the
		// busy indicator stops the propagation of the keydown event and it never reaches the table
		this._table.addEventListener("keydown", this._onKeyDownCaptureBound, { capture: true });
	}

	_getNavigationItemsOfRow(row: TableRowBase) {
		return [row, ...row.shadowRoot!.children].map(element => {
			return element.localName === "slot" ? (element as HTMLSlotElement).assignedElements() : element;
		}).flat().filter(element => {
			return element.localName.includes("ui5-table-") && !element.hasAttribute("data-excluded-from-navigation");
		}) as HTMLElement[];
	}

	_getNavigationItemsOfGrid() {
		const items = [];
		if (this._table.headerRow[0] && !isElementHidden(this._table.headerRow[0])) {
			items.push(this._getNavigationItemsOfRow(this._table.headerRow[0]));
			this._gridWalker.setFirstRowPos(1);
		} else {
			this._gridWalker.setFirstRowPos(0);
		}

		if (this._table.rows.length) {
			this._table.rows.forEach(row => items.push(this._getNavigationItemsOfRow(row)));
		} else if (this._table._noDataRow) {
			items.push(this._getNavigationItemsOfRow(this._table._noDataRow));
		}

		if (this._table.rows.length > 0 && this._table._getGrowing()?.hasGrowingComponent()) {
			items.push([this._table._getGrowing()?.getFocusDomRef()]);
			this._gridWalker.setLastRowPos(-1);
		} else {
			this._gridWalker.setLastRowPos(0);
		}

		if (!this._gridWalker.getCurrent()) {
			this._gridWalker.setRowPos(this._gridWalker.getFirstRowPos());
		}

		this._gridWalker.setGrid(items);
		return items;
	}

	_setCurrentItem(e: Event, callback?: (currentItem: HTMLElement) => void) {
		const navigationItems = this._getNavigationItemsOfGrid().flat();
		const navigationItem = e.composedPath().find(target => navigationItems.includes(target as HTMLElement)) as HTMLElement;
		if (navigationItem) {
			this._gridWalker.setCurrent(navigationItem);
			callback && callback(navigationItem);
		}
	}

	_isEventFromCurrentItem(e: Event) {
		return e.composedPath()[0] === this._gridWalker.getCurrent();
	}

	_focusElement(element: HTMLElement, ignoreFocusIn: boolean = true) {
		if (!element || element === getActiveElement()) {
			return;
		}

		const navigationItems = this._getNavigationItemsOfGrid().flat();
		if (navigationItems.includes(this._lastFocusedItem)) {
			this._lastFocusedItem?.removeAttribute("tabindex");
		}

		if (navigationItems.includes(element)) {
			element.setAttribute("tabindex", "-1");
			this._lastFocusedItem = element;
		}

		this._ignoreFocusIn = ignoreFocusIn;
		element.focus({ preventScroll: element === this._table._beforeElement || element === this._table._afterElement });
		if (element instanceof HTMLInputElement) {
			element.select();
		}
		this._ignoreFocusIn = false;
	}

	_focusCurrentItem() {
		this._focusElement(this._gridWalker.getCurrent() as HTMLElement);
	}

	_handleEnter(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if (eventOrigin.hasAttribute("ui5-table-cell-base")) {
			this._handleF2(e, eventOrigin);
		}
	}

	_handleF2(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if (this._isEventFromCurrentItem(e)) {
			const firstTabbable = getTabbableElements(eventOrigin)[0];
			this._focusElement(firstTabbable);
		} else {
			this._setCurrentItem(e, () => this._focusCurrentItem());
		}
		e.preventDefault();
	}

	_handleF7(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if (eventOrigin.hasAttribute("ui5-table-row-base")) {
			this._gridWalker.setColPos(this._colPosition);
			let elementToFocus = this._gridWalker.getCurrent() as HTMLElement;
			if (this._tabPosition > -1) {
				const tabbables = getTabbableElements(elementToFocus);
				elementToFocus = tabbables[this._tabPosition] || tabbables.pop() || elementToFocus;
			}
			this._focusElement(elementToFocus);
		} else {
			this._setCurrentItem(e, currentItem => {
				this._tabPosition = getTabbableElements(currentItem).indexOf(eventOrigin);
				this._colPosition = this._gridWalker.getColPos();
				this._gridWalker.setColPos(0);
				this._focusCurrentItem();
			});
		}
		e.preventDefault();
	}

	_handleTab(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if (this._isEventFromCurrentItem(e)) {
			this._focusElement(e.shiftKey ? this._table._beforeElement : this._table._afterElement);
		} else {
			const tabbables = getTabbableElements(this._table._tableElement);
			if (e.shiftKey && tabbables[0] === eventOrigin) {
				this._focusElement(this._table._beforeElement);
			}
			if (!e.shiftKey && tabbables[tabbables.length - 1] === eventOrigin) {
				this._focusElement(this._table._afterElement);
			}
		}
	}

	_handleArrowUpDown(e: KeyboardEvent, eventOrigin: HTMLElement, direction: -1 | 1) {
		if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.defaultPrevented || this._isEventFromCurrentItem(e) || /^(input|textarea)$/i.test(eventOrigin.nodeName)) {
			return false;
		}

		this._setCurrentItem(e, currentItem => {
			this._tabPosition = getTabbableElements(currentItem).indexOf(eventOrigin);
			this._gridWalker.setRowPos(this._gridWalker.getRowPos() + direction);
			let elementToFocus = this._gridWalker.getCurrent() as HTMLElement;
			const tabbables = getTabbableElements(elementToFocus);
			elementToFocus = tabbables[this._tabPosition] || tabbables.pop() || elementToFocus;
			this._focusElement(elementToFocus);
			e.preventDefault();
		});
		return false;
	}

	_handleArrowUp(e: KeyboardEvent, eventOrigin: HTMLElement) {
		return this._handleArrowUpDown(e, eventOrigin, -1);
	}

	_handleArrowDown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		return this._handleArrowUpDown(e, eventOrigin, 1);
	}

	_onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if (e.defaultPrevented) {
			return;
		}

		if (!this._isEventFromCurrentItem(e) && this._getNavigationItemsOfGrid().flat().includes(eventOrigin)) {
			this._gridWalker.setCurrent(eventOrigin);
		}

		this._table._getVirtualizer()?._onKeyDown(e);
		if (e.defaultPrevented) {
			return;
		}

		const keydownHandlerName = `_handle${e.code}` as keyof TableNavigation;
		const keydownHandler = this[keydownHandlerName] as (e: KeyboardEvent, eventOrigin: HTMLElement) => void | false;
		if (typeof keydownHandler === "function" && keydownHandler.call(this, e, eventOrigin) === undefined) {
			return;
		}

		if (!this._isEventFromCurrentItem(e)) {
			return;
		}

		if (isLeft(e)) {
			this._gridWalker[this._table.effectiveDir === "rtl" ? "right" : "left"]();
		} else if (isRight(e)) {
			this._gridWalker[this._table.effectiveDir === "rtl" ? "left" : "right"]();
		} else if (isUp(e) || isUpShift(e)) {
			this._gridWalker.up();
		} else if (isDown(e) || isDownShift(e)) {
			this._gridWalker.down();
		} else if (isHome(e)) {
			this._gridWalker.home();
		} else if (isEnd(e)) {
			this._gridWalker.end();
		} else if (isPageUp(e)) {
			this._gridWalker.pageup();
		} else if (isPageDown(e)) {
			this._gridWalker.pagedown();
		} else {
			return;
		}

		this._focusCurrentItem();
		e.preventDefault();
	}

	_onclick(e: PointerEvent) {
		const navigationItems = this._getNavigationItemsOfGrid();
		const flatNavigationItems = navigationItems.flat();
		let navigationItem = null;
		let focusableElement = null;

		// eslint-disable-next-line no-restricted-syntax
		for (const target of e.composedPath() as any[]) {
			if (target.nodeType === Node.ELEMENT_NODE) {
				const element = target as HTMLElement;
				if (element.matches(":focus-within")) {
					focusableElement = element;
					break;
				}
				if (flatNavigationItems.includes(element)) {
					navigationItem = element;
					break;
				}
			}
		}

		if (focusableElement && focusableElement !== this._lastFocusedItem) {
			this._lastFocusedItem?.removeAttribute("tabindex");
			this._lastFocusedItem = undefined;
		} else if (navigationItem) {
			this._gridWalker.setCurrent(navigationItem);
			this._gridWalker.setColPos(0);
			this._focusCurrentItem();
		}
	}

	_onfocusin(e: FocusEvent, eventOrigin: HTMLElement) {
		if (this._ignoreFocusIn) {
			return;
		}

		if (eventOrigin === this._table._beforeElement || eventOrigin === this._table._afterElement) {
			if (this._table.loading) {
				this._table._loadingElement.focus();
			} else {
				this._getNavigationItemsOfGrid();
				this._gridWalker.setColPos(0);
				this._focusCurrentItem();
			}
		} else if (eventOrigin !== this._lastFocusedItem && this._getNavigationItemsOfGrid().flat().includes(eventOrigin)) {
			this._lastFocusedItem = eventOrigin;
		}
	}

	_onKeyDownCapture(e: KeyboardEvent) {
		if (!this._table.loading) {
			return;
		}

		if (isTabNext(e) || isTabPrevious(e)) {
			this._focusElement(e.shiftKey ? this._table._beforeElement : this._table._afterElement);
			e.stopImmediatePropagation();
		}
	}
}

export default TableNavigation;
