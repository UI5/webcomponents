import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, eventStrict, i18n, property,
} from "@ui5/webcomponents-base/dist/decorators.js";
import { isPlus, isMinus } from "@ui5/webcomponents-base/dist/Keys.js";
import Button from "./Button.js";
import navigationRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import navigationDownArrow from "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import { isInstanceOfTable, findRowInPath } from "./TableUtils.js";
import type { VNode } from "@ui5/webcomponents-base/dist/jsx-runtime.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type Table from "./Table.js";
import type { ITableFeature } from "./Table.js";
import type TableRow from "./TableRow.js";
import type TableCell from "./TableCell.js";
import {
	TREE_ITEM_EXPAND_NODE,
	TREE_ITEM_COLLAPSE_NODE,
} from "./generated/i18n/i18n-defaults.js";
import type { AriaRole } from "@ui5/webcomponents-base";

import type TableHierarchyNodeState from "./types/TableHierarchyNodeState.js";

/**
 * Fired when the expand state of a row is toggled by user interaction.
 *
 * @param {TableRow} row The row whose expand state is toggled
 * @param {boolean} expanded The new expand state of the row
 * @public
 */
type TableHierarchyToggleEventDetail = {
	row: TableRow,
	expanded: boolean,
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-hierarchy` component is used inside the `ui5-table` to display hierarchical data (tree table).
 *
 * The table keeps its flat list of rows. The hierarchy information is provided by the application
 * via the following properties of the `ui5-table-row`:
 *
 * - `hierarchyLevel` (`hierarchy-level` attribute) - the 1-based level of the row in the hierarchy (default: `1`)
 * - `hierarchyState` (`hierarchy-state` attribute) - `Expanded`, `Collapsed`, or `Leaf` (default: `Leaf`).
 *
 * When the feature is applied, the table uses the `treegrid` ARIA role, the rows get the corresponding `aria-level` and `aria-expanded`
 * attributes, and an expand/collapse indicator is rendered with a level dependent indentation inside the first visible cell of each row.
 *
 * The child rows are managed by the application: when a node is expanded or collapsed by user interaction, the `toggle` event is fired
 * and the `hierarchyState` property of the row is updated unless the event is canceled. The application is responsible for adding or removing the child rows.
 *
 * ### Usage
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-hierarchy slot="features"></ui5-table-hierarchy>
 * 	<ui5-table-row hierarchy-level="1" hierarchy-state="Expanded">...</ui5-table-row>
 * 	<ui5-table-row hierarchy-level="2">...</ui5-table-row>
 * </ui5-table>
 * ```
 *
 * ### Keyboard Handling
 *
 * If the focus is on a row or a cell, the following keyboard shortcuts are available:
 * * <kbd>+</kbd> - Expands a collapsed node
 * * <kbd>-</kbd> - Collapses an expanded node
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHierarchy.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.29.0
 * @experimental This component is a proof of concept and its API may change.
 * @public
 */
@customElement({ tag: "ui5-table-hierarchy" })

/**
 * Fired when the expand state of a row is toggled by user interaction.
 *
 * **Note:** Call `preventDefault()` to keep the current expand state.
 *
 * @param {TableRow} row The row whose expand state is toggled
 * @param {boolean} expanded The new expand state of the row
 * @public
 */
@eventStrict("toggle", {
	bubbles: false,
	cancelable: true,
})

class TableHierarchy extends UI5Element implements ITableFeature {
	eventDetails!: {
		toggle: TableHierarchyToggleEventDetail,
	}

	/**
	 * Hides the expand/collapse icons and disables user expansion and collapse, including keyboard shortcuts.
	 *
	 * The icons remain rendered but invisible and do not occupy space. Hierarchy indentation is preserved,
	 * with no additional indentation for root rows. The rows retain their hierarchy ARIA attributes.
	 *
	 * @default false
	 * @since 2.29.0
	 * @public
	 */
	@property({ type: Boolean })
	hideExpandCollapseIcons = false;

	readonly identifier = "TableHierarchy";
	_table?: Table;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onEnterDOM() {
		if (isInstanceOfTable(this.parentElement)) {
			this.onTableActivate(this.parentElement);
		}
	}

	onBeforeRendering() {
		this._invalidateTableAndRows(this._table);
	}

	onExitDOM() {
		const table = this._table;
		this._table = undefined;
		this._invalidateTableAndRows(table);
	}

	onTableActivate(table: Table) {
		if (this._table === table) {
			return;
		}

		this._table = table;
		this._invalidateTableAndRows(table);
	}

	/**
	 * Returns the ARIA role of the table when the hierarchy feature is applied.
	 */
	getAriaRoleForTable(): AriaRole {
		return "treegrid";
	}

	/**
	 * Returns the 1-based hierarchy level of the given row.
	 *
	 * @param row The row instance
	 */
	getLevel(row: TableRow) {
		const level = row.hierarchyLevel;
		return Number.isInteger(level) && level > 0 ? level : 1;
	}

	/**
	 * Returns the hierarchy state of the given row.
	 *
	 * @param row The row instance
	 */
	getState(row: TableRow): `${TableHierarchyNodeState}` {
		return row.hierarchyState || "Leaf";
	}

	/**
	 * Renders the expand/collapse indicator inside the given cell.
	 * @private
	 */
	renderToggle(cell: TableCell): VNode | undefined {
		const row = cell.parentElement as TableRow;
		const state = cell._hierarchyState;
		if (!state) {
			return;
		}

		const isLeaf = state === "Leaf";
		const isExpanded = state === "Expanded";
		const tooltip = isLeaf ? undefined : TableHierarchy.i18nBundle.getText(isExpanded ? TREE_ITEM_COLLAPSE_NODE : TREE_ITEM_EXPAND_NODE);

		return <span id="hierarchy-toggle"
			data-ui5-table-hierarchy-toggle
			data-leaf={isLeaf ? "" : undefined}
			data-hidden={this.hideExpandCollapseIcons ? "" : undefined}
			aria-hidden={isLeaf || this.hideExpandCollapseIcons ? "true" : undefined}
			style={{ "margin-inline-start": `calc(${cell._hierarchyLevel - 1} * var(--_ui5_table_hierarchy_indent))` }}
		>
			<Button
				icon={isExpanded ? navigationDownArrow : navigationRightArrow}
				design="Transparent"
				tooltip={tooltip}
				accessibleName={tooltip}
				disabled={isLeaf || this.hideExpandCollapseIcons}
				onClick={() => !isLeaf && this._toggle(row)}
			></Button>
		</span>;
	}

	_onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if (this.hideExpandCollapseIcons) {
			return;
		}

		const expand = isPlus(e);
		if (!expand && !isMinus(e)) {
			return;
		}

		const row = findRowInPath(e.composedPath());
		if (!row || row.isGroupRow() || (eventOrigin !== row && !eventOrigin.hasAttribute("ui5-table-cell-base"))) {
			return;
		}

		const state = this.getState(row);
		if ((expand && state === "Collapsed") || (!expand && state === "Expanded")) {
			this._toggle(row);
		}
		e.preventDefault();
	}

	_toggle(row: TableRow) {
		if (this.hideExpandCollapseIcons) {
			return;
		}

		const expanded = this.getState(row) === "Collapsed";
		if (this.fireDecoratorEvent("toggle", { row, expanded })) {
			row.hierarchyState = expanded ? "Expanded" : "Collapsed";
		}
	}

	_invalidateTableAndRows(table?: Table) {
		if (table) {
			table._invalidate++;
			table.rows.forEach(row => row._invalidate++);
		}
	}
}

TableHierarchy.define();

export default TableHierarchy;

export type {
	TableHierarchyNodeState,
	TableHierarchyToggleEventDetail,
};
