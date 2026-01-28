import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import TableCellTemplate from "./TableCellTemplate.js";
import TableCellStyles from "./generated/themes/TableCell.css.js";
import TableCellBase from "./TableCellBase.js";
import type TableRow from "./TableRow.js";
import type Table from "./Table.js";
import { LABEL_COLON } from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-cell` represents a cell inside of a `ui5-table`.
 * It is tightly coupled to the `ui5-table` and thus should only be used in the table component.
 *
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/TableCell.js;`
 *
 * @constructor
 * @extends TableCellBase
 * @since 2.0.0
 * @public
 */
@customElement({
	tag: "ui5-table-cell",
	styles: [TableCellBase.styles, TableCellStyles],
	template: TableCellTemplate,
})
class TableCell extends TableCellBase {
	@query("#popin-header")
	_popinHeader?: HTMLElement;

	@query("#popin-content")
	_popinContent?: HTMLElement;

	onBeforeRendering() {
		super.onBeforeRendering();
		if (this.horizontalAlign) {
			this.style.justifyContent = this.horizontalAlign;
		} else if (this._headerCell) {
			this.style.justifyContent = `var(--halign-${this._headerCell._id})`;
		}
	}

	_injectHeaderNodes(ref: HTMLElement | null) {
		if (ref && !ref.hasChildNodes()) {
			ref.replaceChildren(...this._popinHeaderNodes);
		}
	}

	get _headerCell() {
		const row = this.parentElement as TableRow | null;
		const table = row?.parentElement as Table | null;
		const index = row?.cells?.indexOf(this) ?? -1;

		return (index !== -1) ? table?.headerRow?.[0]?.cells?.[index] : null;
	}

	get _popinHeaderNodes() {
		const nodes: Node[] = [];
		const headerCell = this._headerCell;
		if (headerCell) {
			if (headerCell.popinText) {
				nodes.push(document.createTextNode(headerCell.popinText));
			} else {
				nodes.push(...headerCell.content.map(node => node.cloneNode(true)));
			}
			if (headerCell.action[0]) {
				nodes.push(headerCell.action[0].cloneNode(true));
			}
		}
		return nodes;
	}

	get _i18nPopinColon() {
		return TableCellBase.i18nBundle.getText(LABEL_COLON);
	}
}

TableCell.define();

export default TableCell;
