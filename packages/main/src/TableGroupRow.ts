import { customElement } from "@ui5/webcomponents-base/dist/decorators.js";
import TableRowBase from "./TableRowBase.js";
import TableGroupRowTemplate from "./TableGroupRowTemplate.js";
import TableGroupRowCss from "./generated/themes/TableGroupRow.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-group-row` component represents a group header row in the `ui5-table`.
 * It spans all columns and displays a group label.
 *
 * When group rows are present in the table, the table automatically switches
 * from `role="grid"` to `role="treegrid"` for proper accessibility.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableGroupRow.js";`
 *
 * @constructor
 * @extends TableRowBase
 * @since 2.0.0
 * @public
 */
@customElement({
	tag: "ui5-table-group-row",
	styles: [TableRowBase.styles, TableGroupRowCss],
	template: TableGroupRowTemplate,
})
class TableGroupRow extends TableRowBase {
	onEnterDOM() {
		super.onEnterDOM();
		this.toggleAttribute("ui5-table-group-row", true);
	}

	onBeforeRendering() {
		super.onBeforeRendering();
		this.setAttribute("aria-level", "1");
		this.setAttribute("aria-expanded", "true");
	}

	get _ariaColSpan(): number {
		return this._table?._ariaColCount || 1;
	}

	async focus(focusOptions?: FocusOptions): Promise<void> {
		this.setAttribute("tabindex", "-1");
		HTMLElement.prototype.focus.call(this, focusOptions);
		return Promise.resolve();
	}
}

TableGroupRow.define();

export default TableGroupRow;
