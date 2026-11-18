import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import type { InvalidationInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type Table from "./Table.js";
import type { ITableFeature } from "./Table.js";
import type TableRow from "./TableRow.js";
import type TableCellBase from "./TableCellBase.js";
import { isInstanceOfTable } from "./TableUtils.js";

/**
 * Semantic row types used by the experimental IBCS presentation feature.
 * Results are a specialization of measure rows; hierarchy is represented separately.
 * @public
 * @experimental
 */
type TableIBCSRowType = "Measure" | "Structure" | "Result" | "Total" | "OfWhich" | "Remainder" | "PercentOf";

/**
 * Semantic column types used by the experimental IBCS presentation feature.
 * @public
 * @experimental
 */
type TableIBCSColumnType = "RowHeader" | "Measure" | "Structure" | "Scenario" | "Time" | "Variance" | "Total" | "OfWhich" | "Remainder" | "PercentOf";

/**
 * Fill notation for measured, earlier measured, planned and expected data.
 * Previous represents an earlier actual period, not a separate data certainty.
 * @public
 * @experimental
 */
type TableIBCSScenario = "Actual" | "Previous" | "Plan" | "Forecast";

/**
 * Business impact supplied by the application independently of the numeric sign.
 * @public
 * @experimental
 */
type TableIBCSImpact = "Favorable" | "Unfavorable" | "Neutral";

/**
 * Row metadata indexed by the row's `rowKey`.
 * @public
 * @experimental
 */
type TableIBCSRow = {
	/** Semantic row type. */
	type: TableIBCSRowType;
	/** Key of the hierarchy parent. This is not an of-which reference or a calculation operand. */
	parentKey?: string;
};

/**
 * Column metadata indexed by the header cell's application-assigned HTML `id`.
 * @public
 * @experimental
 */
type TableIBCSColumn = {
	/** Semantic column type. */
	type: TableIBCSColumnType;
	/** Scenario notation, typically used on Scenario columns. */
	scenario?: TableIBCSScenario;
	/** Starts a new column group with a wider gap. */
	groupStart?: boolean;
	/** Intermediate result in a measure column, not a separately named IBCS column type. */
	result?: boolean;
};

/** @private */
type TableIBCSRowState = {
	owner: string;
	type: TableIBCSRowType;
};

/** @private */
type TableIBCSCellState = {
	owner: string;
	rowType?: TableIBCSRowType;
	columnType?: TableIBCSColumnType;
	scenario?: TableIBCSScenario;
	impact?: TableIBCSImpact;
	depth?: number;
	groupStart?: boolean;
	result?: boolean;
};

/**
 * @class
 *
 * ### Overview
 *
 * Experimental, opt-in IBCS-oriented presentation for `ui5-table`.
 * Use it in the `features` slot, alongside selection or growing features.
 * The feature adds semantic row/column styling, hierarchy indentation,
 * scenario strips and application-supplied impact colors.
 *
 * ```html
 * <ui5-table>
 *   <ui5-table-ibcs slot="features"></ui5-table-ibcs>
 *   <!-- existing header, rows and selection feature -->
 * </ui5-table>
 * ```
 *
 * Set `rows`, `columns` and `cellImpacts` as JavaScript objects. Replace an object
 * to update its configuration; in-place mutations are not observed.
 * Column keys are header-cell IDs, not visual indices, so reordering is supported.
 *
 * ### Responsibilities
 *
 * Applications supply values, number formatting, calculation results and impact
 * assessments. Keep row/column labels meaningful: patterns and colors supplement
 * the text, rather than replacing it. Use existing `width`, `minWidth` and
 * `horizontalAlign` properties for layout; explicit alignment takes precedence.
 *
 * Totals and hierarchy parents should follow their components; of-which rows
 * should follow their reference. This feature does not reorder content or calculate
 * values. It demonstrates a presentation-layer integration, not IBCS certification.
 * Group rows retain their existing UI5 behavior. Only one IBCS feature is used per table.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/TableIBCS.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.29.0
 * @public
 * @experimental This proof of concept and its metadata API are subject to change.
 */
@customElement({ tag: "ui5-table-ibcs" })
class TableIBCS extends UI5Element implements ITableFeature {
	/**
	 * Row semantics keyed by `ui5-table-row.rowKey`.
	 * @default {}
	 * @public
	 */
	@property({ type: Object })
	rows: Record<string, TableIBCSRow> = {};

	/**
	 * Column semantics keyed by `ui5-table-header-cell.id`.
	 * @default {}
	 * @public
	 */
	@property({ type: Object })
	columns: Record<string, TableIBCSColumn> = {};

	/**
	 * Cell impacts keyed first by rowKey, then by header-cell id.
	 * A missing entry has no impact color. No impact is inferred from displayed text.
	 * @default {}
	 * @public
	 */
	@property({ type: Object })
	cellImpacts: Record<string, Record<string, TableIBCSImpact>> = {};

	readonly identifier = "TableIBCS";
	private _table?: Table;
	private _rows = new Set<TableRow>();
	private _cells = new Set<TableCellBase>();
	private _onRowInvalidateBound: (info: InvalidationInfo) => void;

	constructor() {
		super();
		this._onRowInvalidateBound = this._onRowInvalidate.bind(this);
	}

	onTableActivate(table: Table) {
		this._table = table;
		this._apply();
	}

	onBeforeRendering() {
		if (isInstanceOfTable(this.parentElement)) {
			this._table = this.parentElement;
		}
		this._apply();
		if (this._table) {
			this._table._invalidate++;
		}
	}

	onTableBeforeRendering(table?: Table) {
		if (table) {
			this._table = table;
		}
		this._apply();
	}

	onExitDOM() {
		this._clear();
		if (this._table) {
			this._table._invalidate++;
		}
		this._table = undefined;
	}

	private _onRowInvalidate(info: InvalidationInfo) {
		if (info.name === "rowKey" || (info.type === "slot" && info.name === "default")) {
			this._apply();
		}
	}

	private _depth(key: string) {
		let depth = 0;
		let current = this.rows?.[key];
		const visited = new Set([key]);
		while (current?.parentKey) {
			if (visited.has(current.parentKey) || !Object.hasOwn(this.rows, current.parentKey)) {
				return 0; // Invalid/incomplete hierarchies must not hang rendering.
			}
			visited.add(current.parentKey);
			current = this.rows[current.parentKey];
			depth++;
		}
		return depth;
	}

	private _setCellState(cell: TableCellBase, state?: TableIBCSCellState) {
		const previous = cell._ibcs;
		if (previous?.owner === state?.owner
			&& previous?.rowType === state?.rowType
			&& previous?.columnType === state?.columnType
			&& previous?.scenario === state?.scenario
			&& previous?.impact === state?.impact
			&& previous?.depth === state?.depth
			&& previous?.groupStart === state?.groupStart
			&& previous?.result === state?.result) {
			return;
		}
		cell._ibcs = state;
	}

	private _apply() {
		const table = this._table;
		if (!table || table.features.find(feature => feature.identifier === this.identifier) !== this) {
			this._clear();
			return;
		}
		const headers = table.headerRow[0]?.cells ?? [];
		const rows = new Set(table.rows.filter(row => !row.isGroupRow()));
		const cells = new Set<TableCellBase>(headers);

		headers.forEach(header => {
			const column = Object.hasOwn(this.columns, header.id) ? this.columns[header.id] : undefined;
			this._setCellState(header, column ? {
				owner: this._id,
				columnType: column.type,
				scenario: column.scenario,
				groupStart: column.groupStart,
				result: column.result,
			} : undefined);
		});

		rows.forEach(row => {
			if (!this._rows.has(row)) {
				row.attachInvalidate(this._onRowInvalidateBound);
			}
			const key = row.rowKey || "";
			const semantics = Object.hasOwn(this.rows, key) ? this.rows[key] : undefined;
			if (row._ibcs?.type !== semantics?.type || (semantics && row._ibcs?.owner !== this._id)) {
				row._ibcs = semantics ? { owner: this._id, type: semantics.type } : undefined;
			}
			row.cells.forEach((cell, index) => {
				cells.add(cell);
				const header = headers[index];
				const column = header && Object.hasOwn(this.columns, header.id) ? this.columns[header.id] : undefined;
				const impacts = Object.hasOwn(this.cellImpacts, key) ? this.cellImpacts[key] : undefined;
				const impact = header && impacts && Object.hasOwn(impacts, header.id) ? impacts[header.id] : undefined;
				this._setCellState(cell, semantics || column || impact ? {
					owner: this._id,
					rowType: semantics?.type,
					columnType: column?.type,
					depth: column?.type === "RowHeader" ? this._depth(key) : 0,
					groupStart: column?.groupStart,
					result: column?.result,
					impact,
				} : undefined);
			});
		});

		this._rows.forEach(row => {
			if (!rows.has(row)) {
				row.detachInvalidate(this._onRowInvalidateBound);
				if (row._ibcs?.owner === this._id) {
					row._ibcs = undefined;
				}
			}
		});
		this._cells.forEach(cell => {
			if (!cells.has(cell) && cell._ibcs?.owner === this._id) {
				cell._ibcs = undefined;
			}
		});
		this._rows = rows;
		this._cells = cells;
	}

	private _clear() {
		this._rows.forEach(row => {
			row.detachInvalidate(this._onRowInvalidateBound);
			if (row._ibcs?.owner === this._id) {
				row._ibcs = undefined;
			}
		});
		this._cells.forEach(cell => {
			if (cell._ibcs?.owner === this._id) {
				cell._ibcs = undefined;
			}
		});
		this._rows.clear();
		this._cells.clear();
	}
}

TableIBCS.define();
export default TableIBCS;
export type {
	TableIBCSRowType, TableIBCSColumnType, TableIBCSScenario, TableIBCSImpact,
	TableIBCSRow, TableIBCSColumn, TableIBCSRowState, TableIBCSCellState,
};
