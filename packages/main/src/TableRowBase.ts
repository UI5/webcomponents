import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import { isInstanceOfTable, toggleAttribute } from "./TableUtils.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableRowBaseCss from "./generated/themes/TableRowBase.css.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
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
@customElement({
	renderer: jsxRenderer,
	styles: TableRowBaseCss,
})
abstract class TableRowBase<TCell extends TableCellBase = TableCellBase> extends UI5Element {
	cells!: Array<TCell>;

	@property({ type: Number, noAttribute: true })
	_invalidate = 0;

	@property({ type: Number, noAttribute: true })
	_rowActionCount = 0;

	@property({ type: Boolean, noAttribute: true })
	_renderNavigated = false;

	@property({ type: Boolean, noAttribute: true })
	_alternate = false;

	@property({ type: Boolean })
	_renderDummyCell = false;

	@query("#selection-cell")
	_selectionCell?: HTMLElement;

	@query("#actions-cell")
	_actionsCell?: HTMLElement;

	@query("#navigated-cell")
	_navigatedCell?: HTMLElement;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	isHeaderRow(): boolean {
		return false;
	}

	isGroupRow(): boolean {
		return false;
	}

	onEnterDOM() {
		!this.role && this.setAttribute("role", "row");
		this.toggleAttribute("ui5-table-row-base", true);
	}

	onBeforeRendering() {
		toggleAttribute(this, "aria-selected", this._isSelectable, `${this._isSelected}`);
		toggleAttribute(this, "_has-popin", this._hasPopin);
	}

	onAfterRendering() {
		this._handleCustomFocusOutline();
	}

	getFocusDomRef() {
		return this;
	}

	async focus(focusOptions?: FocusOptions | undefined): Promise<void> {
		this.setAttribute("tabindex", "-1");
		HTMLElement.prototype.focus.call(this, focusOptions);
		this._handleCustomFocusOutline();
		return Promise.resolve();
	}

	_handleCustomFocusOutline() {
		if (this._renderDummyCell && !this._hasPopin && document.activeElement === this) {
			const cells = [...this.shadowRoot!.children].flatMap(element => {
				return element.localName === "slot" ? (element as HTMLSlotElement).assignedElements() : [element];
			});
			const customOutlineAttribute = "data-ui5-custom-outline";
			cells.forEach(cell => cell.removeAttribute(customOutlineAttribute));
			const firstVisibleCell = cells.at(0);
			const lastVisibleCell = cells.at(-2);
			if (firstVisibleCell === lastVisibleCell) {
				firstVisibleCell?.setAttribute(customOutlineAttribute, "startend");
			} else {
				firstVisibleCell?.setAttribute(customOutlineAttribute, "start");
				lastVisibleCell?.setAttribute(customOutlineAttribute, "end");
			}
		}
	}

	get _table(): Table | undefined {
		const element = this.parentElement;
		if (isInstanceOfTable(element)) {
			return element;
		}

		const slotParent = this.assignedSlot?.parentElement;
		return isInstanceOfTable(slotParent) ? slotParent : undefined;
	}

	get _tableId() {
		return this._table?._id;
	}

	get _tableSelection() {
		return this._table?._getSelection();
	}

	get _isSelected() {
		return !!this._tableSelection?.isSelected(this);
	}

	get _isSelectable() {
		return !!this._tableSelection?.isSelectable();
	}

	get _isMultiSelect() {
		return !!this._tableSelection?.isMultiSelectable();
	}

	get _hasSelector() {
		return !!this._table?._isRowSelectorRequired;
	}

	get _visibleCells() {
		return this.cells.filter(c => !c._popin);
	}

	get _firstVisibleCell() {
		return this.cells.find(c => !c._popin);
	}

	get _popinCells() {
		return this.cells.filter(c => c._popin && !c._popinHidden);
	}

	get _hasPopin() {
		return (this._table?.rows.length ?? 0) > 0 && this.cells.some(c => c._popin && !c._popinHidden);
	}

	get _stickyCells() {
		return [this._selectionCell, this._actionsCell, this._navigatedCell].filter(Boolean) as HTMLElement[];
	}
}

export default TableRowBase;
