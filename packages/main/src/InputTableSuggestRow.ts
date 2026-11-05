import { customElement, slotStrict as slot, property } from "@ui5/webcomponents-base/dist/decorators.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import TableRow from "./TableRow.js";
import TableRowBase from "./TableRowBase.js";
import TableRowTemplate from "./TableRowTemplate.js";
import TableRowCss from "./generated/themes/TableRow.css.js";
import type InputTableSuggestCell from "./InputTableSuggestCell.js";
import type TableRowActionBase from "./TableRowActionBase.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-input-table-suggest-row` component represents a suggestion row in the `ui5-input-table-suggest`.
 * It is authored in the default slot of `ui5-input-table-suggest` and uses `ui5-input-table-suggest-cell`
 * children to define the cells of the row.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/InputTableSuggestRow.js";`
 *
 * @constructor
 * @extends TableRow
 * @since 2.28.0
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-input-table-suggest-row",
	styles: [TableRowBase.styles, TableRowCss],
	template: TableRowTemplate,
})
class InputTableSuggestRow extends TableRow {
	/**
	 * Defines the cells of the suggestion row.
	 *
	 * **Note:** Use `ui5-input-table-suggest-cell` for the intended design.
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
	declare cells: DefaultSlot<InputTableSuggestCell>;

	/** @private */
	@property()
	declare rowKey?: string;

	/** @private */
	@property({ type: Number })
	declare position?: number;

	/** @private */
	@property({ type: Boolean })
	declare interactive: boolean;

	/** @private */
	@property({ type: Boolean })
	declare navigated: boolean;

	/** @private */
	@property({ type: Boolean })
	declare movable: boolean;

	/** @private */
	@slot({
		type: HTMLElement,
		individualSlots: true,
	})
	declare actions: Slot<TableRowActionBase>;

	onEnterDOM() {
		super.onEnterDOM();
		this.toggleAttribute("ui5-table-row", true);
	}
}

InputTableSuggestRow.define();

export default InputTableSuggestRow;
