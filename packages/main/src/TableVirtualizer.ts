import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import TableVirtualizerHeightModel from "./TableVirtualizerHeightModel.js";
import TableVirtualizerNavigation from "./TableVirtualizerNavigation.js";
import type { ITableFeature } from "./Table.js";
import type Table from "./Table.js";
import type TableRow from "./TableRow.js";

/**
 * Fired when the range of rows that should be rendered changes.
 * @param number {first} The 0-based index of the first row that should be rendered
 * @param number {last} The 0-based index after the last row that should be rendered (exclusive)
 * @public
 */
type RangeChangeEventDetail = {
	first: number,
	last: number,
};

/**
 * Alignment of a row within the viewport when scrolling to it.
 * @public
 */
type TableVirtualizerScrollAlignment = "Start" | "Center" | "End" | "Nearest";

type Anchor = {
	index: number,
	pos: number,
};

type Viewport = {
	top: number,
	bottom: number,
};

type ScrollAlignment = "start" | "center" | "end";

type ScrollTarget = {
	index: number,
	align: ScrollAlignment,
	until: number,
};

// Larger virtual heights are mapped into the browser's physical scroll range.
const MAX_SCROLL_HEIGHT = 16_000_000;

// Recent wheel, touch or keyboard input scrolls 1:1; scrollbar dragging maps proportionally.
const INPUT_SCROLL_WINDOW = 300;

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-virtualizer` component is used inside the `ui5-table` to virtualize the table rows, if the `overflowMode` property of the table is set to 'Scroll'.
 * It is responsible for rendering only the rows that are visible in the viewport and updating them on scroll.
 * This allows large numbers of rows to exist, but maintain high performance by only paying the cost for those that are currently visible.
 *
 * ### Rendering Contract
 *
 * The virtualizer does not create or own any rows. Whenever the range of rows that should be rendered changes,
 * the `range-change` event is fired, and the application renders the rows from `first` (inclusive) to `last` (exclusive):
 *
 * - The rows must be rendered in ascending order as a contiguous block, and the `position` property of every row must be set to its 0-based logical index.
 * - Rows can have different heights. The heights are measured once the rows are rendered. Rows that have not yet been rendered are estimated with the average measured row height, or `estimatedRowHeight` before any row is measured.
 * - Row elements may be reused freely (e.g. by rebinding an existing row to a new `position`, or by keeping a pool of detached rows). The virtualizer tracks the rows by their `position` only, never by their DOM identity.
 * In frameworks like React, render the rows with `key={position}`, so that the framework reuses the row elements of the rows that stay in the range.
 * - Rows whose data is not available yet can be rendered as placeholders by setting their `loading` property. Keep the cells of loading rows, their content can be empty. Loading rows have the estimated row height, and their height does not affect the row height estimation.
 *
 * **Note:** The `ui5-table-group-row` component is not supported by the virtualizer. Only `ui5-table-row` elements can be virtualized.
 * **Note:** The measured heights are cached per row index. If rows are inserted, removed or reordered, call `reset()`.
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
@customElement({ tag: "ui5-table-virtualizer" })

/**
 * Fired when the range of rows that should be rendered changes, e.g. on scrolling, on resizing, or on keyboard navigation.
 *
 * The rows from `first` (inclusive) to `last` (exclusive) must be rendered in ascending order with their `position` property set.
 *
 * @param {number} first The 0-based index of the first row that should be rendered
 * @param {number} last The 0-based index after the last row that should be rendered (exclusive)
 * @public
 */
@event("range-change")

class TableVirtualizer extends UI5Element implements ITableFeature {
	eventDetails!: {
		"range-change": RangeChangeEventDetail
	}

	/**
	 * Defines the total count of rows in the table.
	 *
	 * **Note:** For virtualization to work properly, this property is mandatory.
	 *
	 * @default 100
	 * @public
	 */
	@property({ type: Number })
	rowCount = 100;

	/**
	 * Defines the estimated height of the rows in pixels.
	 *
	 * The estimate is used for rows that have not yet been rendered, until the first rows are measured.
	 * Afterwards, the average height of the measured rows is used.
	 * The closer the estimate is to the actual row heights, the more accurate the scrollbar is initially.
	 *
	 * @default 44
	 * @since 2.30.0
	 * @public
	 */
	@property({ type: Number })
	estimatedRowHeight = 44;

	/**
	 * Defines the extent in pixels that is rendered in addition to the visible area.
	 *
	 * The full extent is rendered in the scrolling direction, half of it in the opposite direction.
	 * A larger value reduces the risk of blank areas during fast scrolling, a smaller value reduces the rendering costs.
	 *
	 * @default 400
	 * @since 2.30.0
	 * @public
	 */
	@property({ type: Number })
	overscan = 400;

	readonly identifier = "TableVirtualizer";

	_table?: Table;
	_model = new TableVirtualizerHeightModel(44);
	_resizeObserver?: ResizeObserver;
	_observedRows = new Map<TableRow, number>();

	// Physical row position = measured prefix + drift. Absorb height changes here, reconcile on scrollend.
	_drift = 0;
	_first = 0;
	_last = 0;
	_renderedFirst = -1;
	_renderedLast = -1;
	_visibleFirst = 0;
	_visibleLast = 0;
	_appliedOffset = NaN;
	_appliedHeight = NaN;
	_appliedEstimate = NaN;
	_appliedViewportHeight = NaN;

	_lastScrollTop = 0;
	_expectedScrollTop = NaN;
	_direction: 1 | -1 = 1;
	_clientHeight = 0;
	_headerHeight = 0;
	_scrolling = false;
	_touching = false;
	_lastInputTime = 0;
	_updateTimer?: ReturnType<typeof setTimeout>;
	_scrollTarget?: ScrollTarget;
	_stickyAnchor?: number;
	_updating = false;
	_updatePending = false;

	_navigation = new TableVirtualizerNavigation(this);

	_stats = {
		rangeChanges: 0,
		measurements: 0,
		anchorCorrections: 0,
		reconciliations: 0,
		reconciliationsWhileScrolling: 0,
	};

	_scrollListeners: Record<string, EventListener> = {
		scroll: this._onScroll.bind(this),
		scrollend: this._onScrollEnd.bind(this),
		wheel: this._onInput.bind(this),
		touchstart: this._onTouchStart.bind(this),
		touchend: this._onTouchEnd.bind(this),
		touchcancel: this._onTouchEnd.bind(this),
	};
	_onResizeBound = this._onResize.bind(this);

	onAfterRendering(): void {
		this._model.setBaseEstimate(this.estimatedRowHeight > 0 ? this.estimatedRowHeight : 44);
		if (this._model.count !== this.rowCount) {
			this._mutateModel(() => this._model.setCount(this.rowCount));
		}

		if (this._table) {
			this._table._invalidate++;
			this._applyLayout();
			this._update();
		}
	}

	onTableAfterRendering(table: Table): void {
		if (!this._table) {
			this._init(table);
		}

		this._syncRows();
		this._navigation.resolveFocus();
	}

	onExitDOM(): void {
		if (!this._table) {
			return;
		}

		const scrollContainer = this._scrollContainer;
		Object.entries(this._scrollListeners).forEach(([type, listener]) => scrollContainer.removeEventListener(type, listener));
		scrollContainer.removeAttribute("tabindex");
		this._spacer.style.transform = "";
		this._spacer.style.willChange = "";
		this._rowsContainer.style.height = "";
		this._rowsContainer.style.removeProperty("--_ui5_table_row_loading_height");
		this._rowsContainer.style.removeProperty("--_ui5_table_virtualizer_viewport_height");
		this._rowsContainer.removeAttribute("data-virtualized");
		this._appliedHeight = NaN;
		this._appliedOffset = NaN;
		this._appliedEstimate = NaN;
		this._appliedViewportHeight = NaN;
		this._resizeObserver?.disconnect();
		this._resizeObserver = undefined;
		this._observedRows.clear();
		this._navigation.disconnect(this._table);
		clearTimeout(this._updateTimer);
		this._updateTimer = undefined;
		this._table = undefined;
	}

	/**
	 * Resets the virtualizer to its initial state, discards all measured row heights, scrolls to the top,
	 * and fires the `range-change` event.
	 *
	 * Call this method if the rows are inserted, removed or reordered.
	 * @public
	 */
	reset(): void {
		this._model.setCount(this.rowCount);
		this._model.clear();
		this._model.updateEstimate();
		// rendered rows must be measured again, even if they keep their position and size
		this._observedRows.forEach((_, row) => this._resizeObserver?.unobserve(row));
		this._observedRows.clear();
		this._drift = 0;
		this._first = -1;
		this._last = -1;
		this._scrollTarget = undefined;
		this._stickyAnchor = undefined;
		this._navigation.reset();

		if (this._table) {
			this._scrollToRowsTop(0);
			this._applyLayout();
			this._update(true);
		}
	}

	/**
	 * Scrolls the row with the given index into the viewport.
	 *
	 * The row is kept aligned while the rows around it are rendered and measured, until the user scrolls.
	 *
	 * @param index The 0-based index of the row
	 * @param alignment The alignment of the row within the viewport
	 * @since 2.30.0
	 * @public
	 */
	scrollToIndex(index: number, alignment: TableVirtualizerScrollAlignment = "Start"): void {
		if (!this._table || !this._model.count) {
			return;
		}

		const align = alignment.toLowerCase() as ScrollAlignment | "nearest";
		this._ensureVisible(Math.max(0, Math.min(Math.floor(index), this._model.count - 1)), align);
	}

	_init(table: Table) {
		this._table = table;
		const scrollContainer = this._scrollContainer;
		Object.entries(this._scrollListeners).forEach(([type, listener]) => scrollContainer.addEventListener(type, listener, { passive: true }));
		this._navigation.connect(table);

		this._spacer.style.willChange = "transform";
		this._rowsContainer.toggleAttribute("data-virtualized", true);
		this._clientHeight = scrollContainer.clientHeight;
		this._headerHeight = this._headerRow?.offsetHeight || 0;
		this._lastScrollTop = scrollContainer.scrollTop;

		this._resizeObserver = new ResizeObserver(this._onResizeBound);
		this._resizeObserver.observe(scrollContainer);
		this._headerRow && this._resizeObserver.observe(this._headerRow, { box: "border-box" });

		this._model.setBaseEstimate(this.estimatedRowHeight > 0 ? this.estimatedRowHeight : 44);
		this._model.setCount(this.rowCount);
		this._applyLayout();
		this._update(true);
	}

	get _scrollContainer() {
		return this._table!._tableElement;
	}

	get _rowsContainer() {
		return this._table!.shadowRoot!.getElementById("rows")!;
	}

	get _spacer() {
		return this._table!.shadowRoot!.getElementById("spacer")!;
	}

	get _headerRow() {
		return this._table?.headerRow[0];
	}

	get _isScaled() {
		return this._model.total() > MAX_SCROLL_HEIGHT;
	}

	_pos(index: number) {
		return this._model.prefix(index) + this._drift;
	}

	_indexAt(y: number) {
		return this._model.indexAt(y - this._drift);
	}

	// Viewport coordinates exclude the header and share the row model's origin.
	_getViewport(scrollTop = this._scrollContainer.scrollTop): Viewport {
		const sticky = !!this._headerRow?.sticky;
		const top = scrollTop - (sticky ? 0 : this._headerHeight);
		const bottom = scrollTop + this._clientHeight - this._headerHeight;
		return { top, bottom: Math.max(top, bottom) };
	}

	_toScrollTop(rowsTop: number) {
		return rowsTop + (this._headerRow?.sticky ? 0 : this._headerHeight);
	}

	_getPhysicalHeight() {
		const total = this._model.total();
		return total > MAX_SCROLL_HEIGHT ? MAX_SCROLL_HEIGHT : Math.max(0, total + this._drift);
	}

	_scaleRatio() {
		const viewport = this._getViewport();
		const viewportHeight = viewport.bottom - viewport.top;
		return (MAX_SCROLL_HEIGHT - viewportHeight) / Math.max(1, this._model.total() - viewportHeight);
	}

	_targetDrift() {
		if (!this._isScaled) {
			return 0;
		}

		const virtualTop = Math.max(0, this._getViewport().top) - this._drift;
		return virtualTop * (this._scaleRatio() - 1);
	}

	_remap() {
		const top = Math.max(0, this._getViewport().top);
		this._drift = top - top / this._scaleRatio();
	}

	// Shift content and scrollTop together without moving the visible rows.
	_reconcile(targetDrift: number) {
		const delta = targetDrift - this._drift;
		this._drift = targetDrift;
		if (Math.abs(delta) < 0.5) {
			return false;
		}

		// read before the layout changes, as shrinking the scroll height may clamp the scroll position
		const scrollContainer = this._scrollContainer;
		const scrollTop = scrollContainer.scrollTop + delta;
		this._applyLayout(true);
		scrollContainer.scrollTop = scrollTop;
		this._lastScrollTop = scrollContainer.scrollTop;
		this._expectedScrollTop = this._lastScrollTop;
		this._stats.reconciliations++;
		this._scrolling && this._stats.reconciliationsWhileScrolling++;
		return true;
	}

	// Reconcile at the physical boundaries even during scrolling, to avoid gaps or unreachable rows.
	_checkBoundaries() {
		const count = this._model.count;
		if (!count) {
			return;
		}

		const viewport = this._getViewport();
		const first = this._indexAt(viewport.top - this.overscan);
		if (this._drift && (first === 0 || this._pos(first) < 0)) {
			this._reconcile(0);
		} else if (this._isScaled) {
			const endDrift = MAX_SCROLL_HEIGHT - this._model.total();
			const last = this._indexAt(viewport.bottom + this.overscan);
			if (Math.abs(this._drift - endDrift) >= 0.5 && (last === count - 1 || this._pos(last + 1) > MAX_SCROLL_HEIGHT)) {
				this._reconcile(endDrift);
			}
		}
	}

	_computeAnchor(): Anchor | undefined {
		const count = this._model.count;
		if (!count || !this._table) {
			return;
		}

		let index: number | undefined;
		const viewport = this._getViewport();
		if (this._scrollTarget && this._scrollTarget.index < count) {
			index = this._scrollTarget.index;
		} else if (this._focus && this._navigation._hasFocus && this._focus.index < count && this._isVisible(this._focus.index, viewport)) {
			index = this._focus.index;
		} else if (this._stickyAnchor !== undefined && this._stickyAnchor < count && this._isVisible(this._stickyAnchor, viewport)) {
			// Keep the anchor until user input, even if it becomes a placeholder.
			index = this._stickyAnchor;
		}

		if (index === undefined) {
			// A partially visible row grows upwards; anchor the next readable row.
			index = this._indexAt(Math.max(0, viewport.top));
			if (this._pos(index) < viewport.top - 0.5 && index + 1 < count && this._pos(index + 1) < viewport.bottom) {
				index++;
			}

			// placeholders are not readable content, prefer the first visible row with real content
			let candidate = index;
			while (this._model.isProvisional(candidate) && candidate + 1 < count && this._pos(candidate + 1) < viewport.bottom) {
				candidate++;
			}
			if (!this._model.isProvisional(candidate)) {
				index = candidate;
			}
			this._stickyAnchor = index;
		}

		return { index, pos: this._pos(index) };
	}

	_isVisible(index: number, viewport = this._getViewport()) {
		const pos = this._pos(index);
		return pos < viewport.bottom && pos + this._model.height(index) > viewport.top;
	}

	_restoreAnchor(anchor?: Anchor) {
		if (anchor) {
			const drift = anchor.pos - this._model.prefix(anchor.index);
			if (drift !== this._drift) {
				this._drift = drift;
				this._stats.anchorCorrections++;
			}
		}
	}

	_mutateModel(mutation: () => void) {
		const anchor = this._table ? this._computeAnchor() : undefined;
		mutation();
		this._restoreAnchor(anchor);
	}

	_getRows() {
		return Array.from(this._table!.children).filter(element => {
			return element.hasAttribute("ui5-table-row") && (element as TableRow).position !== undefined;
		}) as Array<TableRow>;
	}

	_findRow(index: number) {
		const rows = this._getRows();
		const candidate = rows[index - (rows[0]?.position ?? 0)];
		return candidate?.position === index ? candidate : rows.find(row => row.position === index);
	}

	_syncRows() {
		if (!this._table || !this._resizeObserver) {
			return;
		}

		const rows = this._getRows();
		const resizeObserver = this._resizeObserver;
		rows.forEach(row => {
			const known = this._observedRows.get(row);
			if (known !== row.position) {
				// re-observe rebound rows, so that their size gets reported even if it did not change
				known !== undefined && resizeObserver.unobserve(row);
				resizeObserver.observe(row, { box: "border-box" });
				this._observedRows.set(row, row.position!);
			}
		});

		if (this._observedRows.size !== rows.length) {
			const rowSet = new Set(rows);
			this._observedRows.forEach((_, row) => {
				if (!rowSet.has(row)) {
					resizeObserver.unobserve(row);
					this._observedRows.delete(row);
				}
			});
		}

		this._renderedFirst = rows.length ? rows[0].position! : -1;
		this._renderedLast = rows.length ? rows[rows.length - 1].position! + 1 : -1;

		if (this._model.provisionalCount) {
			let anchor: Anchor | undefined;
			this._model.discardProvisionalOutside(this._renderedFirst, this._renderedLast, () => {
				anchor = this._computeAnchor();
			});
			this._restoreAnchor(anchor);
		}

		this._applyLayout();
	}

	// Move one rendered block; defer scroll-height changes during scrolling unless near the end.
	_applyLayout(force = false) {
		if (!this._table) {
			return;
		}

		if (this._clientHeight !== this._appliedViewportHeight) {
			this._appliedViewportHeight = this._clientHeight;
			this._rowsContainer.style.setProperty("--_ui5_table_virtualizer_viewport_height", `${this._clientHeight}px`);
		}

		const offset = this._renderedFirst >= 0 ? Math.round(this._pos(this._renderedFirst)) : 0;
		if (offset !== this._appliedOffset) {
			this._appliedOffset = offset;
			this._spacer.style.transform = offset ? `translateY(${offset}px)` : "";
		}

		// loading rows and the placeholder pattern of unrendered areas use the estimated row height
		const estimate = Math.round(this._model.estimate);
		if (estimate !== this._appliedEstimate) {
			this._appliedEstimate = estimate;
			this._rowsContainer.style.setProperty("--_ui5_table_row_loading_height", `${estimate}px`);
		}

		const height = Math.round(this._getPhysicalHeight());
		if (height !== this._appliedHeight) {
			const windowEnd = this._renderedLast > 0 ? this._pos(this._renderedLast) : 0;
			const nearEnd = this._last >= this._model.count || this._renderedLast >= this._model.count || windowEnd + 2 * this.overscan > Math.min(height, this._appliedHeight);
			if (force || !this._scrolling || nearEnd || Number.isNaN(this._appliedHeight)) {
				this._appliedHeight = height;
				this._rowsContainer.style.height = `${height}px`;
			}
		}
	}

	_update(force = false) {
		if (!this._table) {
			return;
		}

		if (this._updating) {
			this._updatePending = true;
			return;
		}

		this._updating = true;
		try {
			do {
				this._updatePending = false;
				this._updateRange(force);
				force = false;
			} while (this._updatePending);
		} finally {
			this._updating = false;
		}
	}

	_updateRange(force: boolean) {
		const count = this._model.count;
		this._checkBoundaries();

		let first = 0;
		let last = 0;
		if (count) {
			const viewport = this._getViewport();
			this._visibleFirst = this._indexAt(Math.max(0, viewport.top));
			this._visibleLast = Math.min(count, this._indexAt(viewport.bottom - 1) + 1);

			const ahead = Math.max(0, this.overscan);
			const behind = ahead / 2;
			const before = this._direction > 0 ? behind : ahead;
			const after = this._direction > 0 ? ahead : behind;

			// Keep the range while it covers half the overscan without exceeding twice the overscan.
			const required = this._rangeForViewport(viewport, before / 2, after / 2);
			const retained = this._rangeForViewport(viewport, before * 2, after * 2);
			if (!force && this._first <= required.first && this._last >= required.last && this._first >= retained.first && this._last <= retained.last) {
				return;
			}

			({ first, last } = this._rangeForViewport(viewport, before, after));
		}

		if (!force && first === this._first && last === this._last) {
			return;
		}

		this._first = first;
		this._last = last;
		this._stats.rangeChanges++;
		this.fireDecoratorEvent("range-change", { first, last });
		this._syncRows();
	}

	_rangeForViewport(viewport: Viewport, before: number, after: number): RangeChangeEventDetail {
		return {
			first: this._indexAt(viewport.top - before),
			// A row starting exactly at the bottom edge is outside the range.
			last: Math.min(this._model.count, this._indexAt(viewport.bottom + after - 1) + 1),
		};
	}

	_onScroll() {
		const scrollTop = this._scrollContainer.scrollTop;
		const delta = scrollTop - this._lastScrollTop;
		if (!delta) {
			return; // horizontal scrolling
		}

		const programmatic = Math.abs(scrollTop - this._expectedScrollTop) < 1;
		this._expectedScrollTop = NaN;
		this._direction = delta > 0 ? 1 : -1;
		this._lastScrollTop = scrollTop;
		this._scrolling = true;

		if (!programmatic) {
			this._scrollTarget = undefined;
			this._stickyAnchor = undefined;
			if (this._isScaled && performance.now() - this._lastInputTime > INPUT_SCROLL_WINDOW) {
				this._remap();
			}
		}

		this._update();
	}

	_onScrollEnd() {
		this._scrolling = false;
		if (!this._touching) {
			this._settle();
		}
	}

	_onInput() {
		this._lastInputTime = performance.now();
	}

	_onTouchStart() {
		this._touching = true;
		this._onInput();
	}

	_onTouchEnd() {
		this._touching = false;
		this._onInput();
		if (!this._scrolling) {
			this._settle();
		}
	}

	_settle(update = true) {
		if (!this._table) {
			return;
		}

		const anchor = this._computeAnchor();
		if (this._model.updateEstimate()) {
			this._restoreAnchor(anchor);
		}

		this._reconcile(this._targetDrift());
		this._applyLayout();
		update && this._update();
	}

	// Render outside ResizeObserver delivery to avoid resize-observer loops.
	_scheduleUpdate() {
		if (this._updateTimer === undefined) {
			this._updateTimer = setTimeout(() => {
				this._updateTimer = undefined;
				this._update();
			});
		}
	}

	_onResize(entries: ResizeObserverEntry[]) {
		if (!this._table) {
			return;
		}

		let anchor: Anchor | undefined;
		let rowsChanged = false;
		let viewportChanged = false;
		entries.forEach(entry => {
			const target = entry.target as HTMLElement;
			if (target === this._scrollContainer) {
				this._clientHeight = target.clientHeight;
				viewportChanged = true;
				return;
			}

			if (target === this._headerRow) {
				this._headerHeight = entry.borderBoxSize?.[0]?.blockSize ?? target.offsetHeight;
				viewportChanged = true;
				return;
			}

			const row = target as TableRow;
			const index = row.position;
			if (row.parentElement !== this._table || index === undefined || index < 0 || index >= this._model.count) {
				return;
			}

			const height = entry.borderBoxSize?.[0]?.blockSize ?? row.offsetHeight;
			if (!height) {
				return;
			}

			const provisional = row.loading;
			anchor ??= this._computeAnchor();
			if (this._model.set(index, height, provisional)) {
				rowsChanged = true;
			}
		});

		if (rowsChanged) {
			this._stats.measurements++;
			if (!this._scrolling) {
				this._model.updateEstimate();
			}
			this._restoreAnchor(anchor);
		}

		if (rowsChanged || viewportChanged) {
			this._applyLayout();
			this._alignScrollTarget();
			if (!this._scrolling && !this._touching) {
				this._settle(false);
			}
			this._checkBoundaries();
			this._scheduleUpdate();
			this._navigation.resolveFocus();
		}
	}

	_ensureVisible(index: number, align: ScrollAlignment | "nearest") {
		if (this._isScaled) {
			const pos = this._pos(index);
			const viewport = this._getViewport();
			if (pos < 0 || pos > MAX_SCROLL_HEIGHT - (viewport.bottom - viewport.top)) {
				// the target is outside of the physical range: map it proportionally
				const virtualTop = this._model.prefix(index);
				this._drift = virtualTop * (this._scaleRatio() - 1);
				this._applyLayout();
			}
		}

		const resolvedAlign = this._resolveAlign(index, align);
		if (!resolvedAlign) {
			return;
		}

		this._scrollTarget = { index, align: resolvedAlign, until: performance.now() + 1000 };
		this._scrollToRowsTop(this._getAlignedTop(index, resolvedAlign));
		this._update();
	}

	_resolveAlign(index: number, align: ScrollAlignment | "nearest") {
		if (align !== "nearest") {
			return align;
		}

		const viewport = this._getViewport();
		const pos = this._pos(index);
		if (pos < viewport.top) {
			return "start";
		}
		if (pos + this._model.height(index) > viewport.bottom) {
			return "end";
		}
	}

	_getAlignedTop(index: number, align: ScrollAlignment) {
		const viewport = this._getViewport();
		const viewportHeight = viewport.bottom - viewport.top;
		const pos = this._pos(index);
		const height = this._model.height(index);
		if (align === "center") {
			return pos + height / 2 - viewportHeight / 2;
		}
		if (align === "end" && height < viewportHeight) {
			return pos + height - viewportHeight;
		}
		return pos;
	}

	_alignScrollTarget() {
		const target = this._scrollTarget;
		if (!target) {
			return;
		}

		if (performance.now() > target.until) {
			this._scrollTarget = undefined;
			return;
		}

		const top = this._getAlignedTop(target.index, target.align);
		if (Math.abs(top - this._getViewport().top) >= 1) {
			this._scrollToRowsTop(top);
		}
	}

	_scrollToRowsTop(top: number) {
		this._applyLayout(true);
		const scrollContainer = this._scrollContainer;
		scrollContainer.scrollTop = top <= 0 ? 0 : this._toScrollTop(top);
		const scrollTop = scrollContainer.scrollTop;
		if (scrollTop !== this._lastScrollTop) {
			this._direction = scrollTop > this._lastScrollTop ? 1 : -1;
		}
		this._lastScrollTop = scrollTop;
		this._expectedScrollTop = scrollTop;
	}

	get _focus() {
		return this._navigation._focus;
	}

	get _focusPending() {
		return this._navigation._focusPending;
	}

	get _focusing() {
		return this._navigation._focusing;
	}

	_onfocusin(e: FocusEvent, eventOrigin: HTMLElement) {
		this._navigation.onFocusIn(e, eventOrigin);
	}

	_onfocusout(e: FocusEvent) {
		this._navigation.onFocusOut(e);
	}
}

TableVirtualizer.define();

export default TableVirtualizer;

export type {
	RangeChangeEventDetail,
	TableVirtualizerScrollAlignment,
};
