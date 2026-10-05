import { customElement, slotStrict as slot, property } from "@ui5/webcomponents-base/dist/decorators.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import TableHeaderRow from "./TableHeaderRow.js";
import TableRowBase from "./TableRowBase.js";
import TableHeaderRowTemplate from "./TableHeaderRowTemplate.js";
import TableHeaderRowStyles from "./generated/themes/TableHeaderRow.css.js";
import type InputTableSuggestHeaderCell from "./InputTableSuggestHeaderCell.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-input-table-suggest-header-row` component represents the header row in the `ui5-input-table-suggest`.
 * It is authored in the `headerRow` slot of `ui5-input-table-suggest` and uses
 * `ui5-input-table-suggest-header-cell` children to define the columns.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/InputTableSuggestHeaderRow.js";`
 *
 * @constructor
 * @extends TableHeaderRow
 * @since 2.28.0
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-input-table-suggest-header-row",
	styles: [TableRowBase.styles, TableHeaderRowStyles],
	template: TableHeaderRowTemplate,
})
class InputTableSuggestHeaderRow extends TableHeaderRow {
	/**
	 * Defines the columns of the suggestion table.
	 *
	 * **Note:** Use `ui5-input-table-suggest-header-cell` for the intended design.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		invalidateOnChildChange: {
			properties: ["width", "_popin", "horizontalAlign", "popinHidden"],
			slots: false,
		},
		individualSlots: true,
	})
	declare cells: DefaultSlot<InputTableSuggestHeaderCell>;

	/** @private */
	@property({ type: Boolean })
	declare sticky: boolean;

	onEnterDOM() {
		super.onEnterDOM();
		this.toggleAttribute("ui5-table-header-row", true);
	}
}

InputTableSuggestHeaderRow.define();

export default InputTableSuggestHeaderRow;
