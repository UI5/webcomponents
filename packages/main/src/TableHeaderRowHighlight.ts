import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type HighlightDesign from "./types/HighlightDesign.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-row-highlight` component configures the highlight column of a `ui5-table`.
 * Placed in the `highlight` slot of the `ui5-table-header-row`, its presence reserves the highlight
 * column so that the `ui5-table-row-highlight` of the data rows can be rendered.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderRowHighlight.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.30.0
 * @public
 */
@customElement({
	tag: "ui5-table-header-row-highlight",
})
class TableHeaderRowHighlight extends UI5Element {
	/**
	 * Defines the rendering design of all row highlight indicators of the table.
	 *
	 * @default "Simple"
	 * @private
	 */
	@property()
	design: `${HighlightDesign}` = "Simple";

	/**
	 * Returns the width of the highlight column for the current design.
	 *
	 * @private
	 */
	get _width() {
		return this.design === "Extended"
			? "var(--_ui5_table_highlight_cell_extended_width)"
			: "var(--_ui5_table_highlight_cell_width)";
	}
}

TableHeaderRowHighlight.define();

export default TableHeaderRowHighlight;
