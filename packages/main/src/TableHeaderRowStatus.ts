import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type RowStatusDesign from "./types/RowStatusDesign.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-row-status` component configures the status column of a `ui5-table`.
 * Placed in the `status` slot of the `ui5-table-header-row`, its presence reserves the status
 * column so that the `ui5-table-row-status` of the data rows can be rendered.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderRowStatus.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.29.0
 * @public
 */
@customElement({
	tag: "ui5-table-header-row-status",
})
class TableHeaderRowStatus extends UI5Element {
	/**
	 * Defines the rendering design of all row status indicators of the table.
	 *
	 * @default "Simple"
	 * @private
	 */
	@property()
	design: `${RowStatusDesign}` = "Simple";

	/**
	 * Returns the width of the status column for the current design.
	 *
	 * @private
	 */
	get _width() {
		return this.design === "Extended"
			? "var(--_ui5_table_status_cell_extended_width)"
			: "var(--_ui5_table_status_cell_width)";
	}
}

TableHeaderRowStatus.define();

export default TableHeaderRowStatus;
