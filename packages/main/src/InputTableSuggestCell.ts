import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import TableCell from "./TableCell.js";
import TableCellBase from "./TableCellBase.js";
import TableCellTemplate from "./TableCellTemplate.js";
import TableCellStyles from "./generated/themes/TableCell.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-input-table-suggest-cell` component represents a cell in a `ui5-input-table-suggest-row`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/InputTableSuggestCell.js";`
 *
 * @constructor
 * @extends TableCell
 * @since 2.28.0
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-input-table-suggest-cell",
	styles: [TableCellBase.styles, TableCellStyles],
	template: TableCellTemplate,
})
class InputTableSuggestCell extends TableCell {
	/** @private */
	@property({ type: Boolean })
	declare merged: boolean;

	onEnterDOM() {
		super.onEnterDOM();
		this.toggleAttribute("ui5-table-cell", true);
	}
}

InputTableSuggestCell.define();

export default InputTableSuggestCell;
