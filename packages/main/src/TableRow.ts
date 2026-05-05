import { customElement, slotStrict as slot, property } from "@ui5/webcomponents-base/dist/decorators.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import { toggleAttribute } from "./TableUtils.js";
import TableRowTemplate from "./TableRowTemplate.js";
import TableRowBase from "./TableRowBase.js";
import TableRowCss from "./generated/themes/TableRow.css.js";
import type TableCell from "./TableCell.js";
import type TableHeaderCell from "./TableHeaderCell.js";
import type TableRowActionBase from "./TableRowActionBase.js";
import type Button from "./Button.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type Highlight from "./types/Highlight.js";
import {
	TABLE_ROW_MULTIPLE_ACTIONS, TABLE_ROW_SINGLE_ACTION,
	TABLE_ROW_ACTION, TABLE_ROW_ACTIONS_LIST, TABLE_ROW_MORE_ACTIONS,
	TABLE_HIGHLIGHT_NEGATIVE, TABLE_HIGHLIGHT_CRITICAL, TABLE_HIGHLIGHT_POSITIVE, TABLE_HIGHLIGHT_INFORMATION,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row` component represents a row in the `ui5-table`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRow.js";`
 *
 * @constructor
 * @extends TableRowBase
 * @since 2.0.0
 * @public
 */
@customElement({
	tag: "ui5-table-row",
	styles: [TableRowBase.styles, TableRowCss],
	template: TableRowTemplate,
})
class TableRow extends TableRowBase<TableCell> {
	/**
	 * Defines the cells of the component.
	 *
	 * **Note:** Use `ui5-table-cell` for the intended design.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: ["merged", "_popin", "_popinHidden"],
			slots: false,
		},
	})
	cells!: DefaultSlot<TableCell>;

	/**
	 * Defines the actions of the component.
	 *
	 * **Note:** Use `ui5-table-row-action` or `ui5-table-row-action-navigation` for the intended design.
	 *
	 * @since 2.7.0
	 * @public
	 */
	@slot({
		type: HTMLElement,
		individualSlots: true,
	})
	actions!: Slot<TableRowActionBase>;

	/**
	 * Unique identifier of the row.
	 *
	 * **Note:** For selection features to work properly, this property is mandatory, and its value must not contain spaces.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	rowKey?: string;

	/**
	 * Defines the 0-based position of the row related to the total number of rows within the table when the `ui5-table-virtualizer` feature is used.
	 *
	 * @default undefined
	 * @since 2.5.0
	 * @public
	 */
	@property({ type: Number })
	position?: number;

	/**
	 * Defines the interactive state of the row.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	interactive = false;

	/**
	 * Defines the navigated state of the row.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	navigated = false;

	/**
	 * Defines the highlight state of the row.
	 *
	 * @default "None"
	 * @since 2.23.0
	 * @public
	 */
	@property()
	highlight: `${Highlight}` = "None";

	/**
	 * Defines the text associated with the highlight state of the row.
	 *
	 * This text is announced by the screen reader together with the highlight state.
	 *
	 * @default undefined
	 * @since 2.23.0
	 * @public
	 */
	@property()
	highlightText?: string;

	/**
	 * Defines whether the row is movable.
	 *
	 * @default false
	 * @since 2.6.0
	 * @public
	 */
	@property({ type: Boolean })
	movable = false;

	@query("#popin-cell")
	_popinCell?: TableCell;

	@query("#actions-cell")
	_actionsCell?: TableCell;

	onBeforeRendering() {
		super.onBeforeRendering();
		this.ariaRowIndex = (this.role === "row") ? `${this._rowIndex + 2}` : null;
		toggleAttribute(this, "draggable", this.movable, "true");
		toggleAttribute(this, "_interactive", this._isInteractive);
		toggleAttribute(this, "_alternate", this._alternate);
		toggleAttribute(this, "_haspopin", this._hasPopin);
	}

	async focus(focusOptions?: FocusOptions | undefined): Promise<void> {
		this.setAttribute("tabindex", "-1");
		HTMLElement.prototype.focus.call(this, focusOptions);
		return Promise.resolve();
	}

	async _onpointerdown(e: PointerEvent) {
		if (e.button !== 0 || !this._isInteractive) {
			return;
		}

		const composedPath = e.composedPath();
		composedPath.splice(composedPath.indexOf(this));
		await new Promise(resolve => setTimeout(resolve)); // wait for the focus to be set
		const activeElement = getActiveElement() as Element;
		if (!composedPath.includes(activeElement)) {
			this._setActive("pointerup");
		}
	}

	_onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		super._onkeydown(e, eventOrigin);
		if (e.defaultPrevented) {
			return;
		}

		if (eventOrigin === this && this._isInteractive && isEnter(e)) {
			this._setActive("keyup");
			this._onclick();
		}
	}

	_onclick() {
		if (this === getActiveElement()) {
			if (this._isSelectable && !this._hasSelector) {
				this._onSelectionChange();
			} else 	if (this.interactive || this._isNavigable) {
				this._table?._onRowClick(this);
			}
		}
	}

	_setActive(deactivationEvent: string) {
		this.toggleAttribute("_active", true);
		document.addEventListener(deactivationEvent, () => {
			this.removeAttribute("_active");
		}, { once: true });
	}

	_onOverflowButtonClick(e: UI5CustomEvent<Button, "click">) {
		const ctor = this.actions[0].constructor as typeof TableRowActionBase;
		ctor.showMenu(this._overflowActions, e.target as HTMLElement);
		e.stopPropagation();
	}

	get _isInteractive() {
		return this.interactive || (this._isSelectable && !this._hasSelector) || this._isNavigable;
	}

	get _isNavigable() {
		return this._fixedActions.find(action => {
			return action.hasAttribute("ui5-table-row-action-navigation") && !action.invisible && !action._isInteractive;
		}) !== undefined;
	}

	get _identifierCell(): TableCell | undefined {
		if (!this._table) {
			return undefined;
		}
		const headerRow = this._table.headerRow[0];
		if (!headerRow) {
			return undefined;
		}
		const identifierIndex = headerRow.cells.findIndex(cell => cell.identifier);
		if (identifierIndex === -1) {
			return undefined;
		}
		return this.cells[identifierIndex];
	}

	get _identifierHeaderCell(): TableHeaderCell | undefined {
		if (!this._table) {
			return undefined;
		}
		const headerRow = this._table.headerRow[0];
		return headerRow?.cells.find(cell => cell.identifier);
	}

	get _actionDescriptionText(): string | undefined {
		const actionTexts: string[] = [];
		const fixedActions = this._fixedActions.filter(a => !a.invisible && a._isInteractive);
		const flexibleActions = this._flexibleActions.filter(a => !a.invisible && a._isInteractive);

		// Collect texts from visible interactive actions
		[...flexibleActions, ...fixedActions].forEach(action => {
			actionTexts.push(action._text);
		});

		// Add "more actions" if overflow exists
		if (this._hasOverflowActions) {
			actionTexts.push(TableRowBase.i18nBundle.getText(TABLE_ROW_MORE_ACTIONS));
		}

		if (actionTexts.length === 0) {
			return undefined;
		}

		if (actionTexts.length === 1) {
			return TableRowBase.i18nBundle.getText(TABLE_ROW_ACTION, actionTexts[0]);
		}

		return TableRowBase.i18nBundle.getText(TABLE_ROW_ACTIONS_LIST, actionTexts.join(", "));
	}

	get _highlightDescription(): string | undefined {
		if (this.highlight === "None") {
			return undefined;
		}

		const highlightI18nMap: Record<string, typeof TABLE_HIGHLIGHT_NEGATIVE> = {
			Negative: TABLE_HIGHLIGHT_NEGATIVE,
			Critical: TABLE_HIGHLIGHT_CRITICAL,
			Positive: TABLE_HIGHLIGHT_POSITIVE,
			Information: TABLE_HIGHLIGHT_INFORMATION,
		};

		const i18nKey = highlightI18nMap[this.highlight];
		return i18nKey ? TableRowBase.i18nBundle.getText(i18nKey) : undefined;
	}

	get _hasPopin() {
		return this.cells.some(c => c._popin && !c._popinHidden);
	}

	get _rowIndex() {
		if (this.position !== undefined) {
			return this.position;
		}
		if (this._table) {
			return this._table.rows.indexOf(this);
		}
		return -1;
	}

	get _hasOverflowActions() {
		let renderableActionsCount = 0;
		return this.actions.some(action => {
			if (action.isFixedAction() || !action.invisible) {
				renderableActionsCount++;
			}
			return renderableActionsCount > this._rowActionCount;
		});
	}

	get _flexibleActions() {
		const flexibleActions = this.actions.filter(action => !action.isFixedAction());
		const fixedActionsCount = this.actions.length - flexibleActions.length;
		let maxFlexibleActionsCount = this._rowActionCount - fixedActionsCount;
		if (maxFlexibleActionsCount < 1) {
			return []; // fixed actions occupy all the available space
		}
		if (flexibleActions.length <= maxFlexibleActionsCount) {
			return flexibleActions; // all actions fit the available space
		}

		const visibleFlexibleActions = flexibleActions.filter(action => !action.invisible);
		if (visibleFlexibleActions.length > maxFlexibleActionsCount) {
			maxFlexibleActionsCount--;	// preserve space for the overflow button
		}

		return visibleFlexibleActions.slice(0, maxFlexibleActionsCount);
	}

	get _fixedActions() {
		let maxFixedActionsCount = this._rowActionCount;
		if (this._hasOverflowActions) {
			maxFixedActionsCount--;
		}

		const fixedActions = this.actions.filter(action => action.isFixedAction());
		return fixedActions.slice(0, maxFixedActionsCount);
	}

	get _overflowActions() {
		const fixedActions = this._fixedActions;
		const flexibleActions = this._flexibleActions;
		const overflowActions: Array<TableRowActionBase> = [];
		this.actions.forEach(action => {
			if (!action.invisible && !fixedActions.includes(action) && !flexibleActions.includes(action)) {
				overflowActions.push(action);
			}
		});

		return overflowActions;
	}

	get _availableActionsCount() {
		if (this._rowActionCount < 1) {
			return 0;
		}

		return [...this._flexibleActions, ...this._fixedActions].filter(action => {
			return !action.invisible && action._isInteractive;
		}).length + (this._hasOverflowActions ? 1 : 0);
	}

	get _actionCellAccText() {
		const availableActionsCount = this._availableActionsCount;
		if (availableActionsCount > 0) {
			const bundleKey = availableActionsCount === 1 ? TABLE_ROW_SINGLE_ACTION : TABLE_ROW_MULTIPLE_ACTIONS;
			return TableRowBase.i18nBundle.getText(bundleKey, availableActionsCount);
		}
	}
}

TableRow.define();

export default TableRow;
