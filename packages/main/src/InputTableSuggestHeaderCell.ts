import { customElement, property, slotStrict as slot } from "@ui5/webcomponents-base/dist/decorators.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type SortOrder from "@ui5/webcomponents-base/dist/types/SortOrder.js";
import TableHeaderCell from "./TableHeaderCell.js";
import TableCellBase from "./TableCellBase.js";
import TableHeaderCellTemplate from "./TableHeaderCellTemplate.js";
import TableHeaderCellStyles from "./generated/themes/TableHeaderCell.css.js";
import type TableCellHorizontalAlign from "./types/TableCellHorizontalAlign.js";
import type TableHeaderCellActionBase from "./TableHeaderCellActionBase.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-input-table-suggest-header-cell` component represents a column in the
 * `ui5-input-table-suggest-header-row`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/InputTableSuggestHeaderCell.js";`
 *
 * @constructor
 * @extends TableHeaderCell
 * @since 2.28.0
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-input-table-suggest-header-cell",
	styles: [TableCellBase.styles, TableHeaderCellStyles],
	template: TableHeaderCellTemplate,
})
class InputTableSuggestHeaderCell extends TableHeaderCell {
	/**
	 * Defines the content of the column (the column title).
	 *
	 * @public
	 */
	@slot({ type: Node, "default": true })
	declare content: DefaultSlot<Node>;

	/**
	 * Defines the width of the column.
	 *
	 * By default, the column will grow and shrink according to the available space.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	declare width?: string;

	/**
	 * Defines the minimum width of the column.
	 *
	 * If the suggestion table moves columns into the popin, the column will move into the popin
	 * once its minimum width no longer fits.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	declare minWidth?: string;

	/**
	 * Determines the horizontal alignment of the column content.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	declare horizontalAlign?: `${TableCellHorizontalAlign}`;

	/** @private */
	@property({ type: Number })
	declare importance: number;

	/** @private */
	@property()
	declare popinText?: string;

	/** @private */
	@property()
	declare sortIndicator: `${SortOrder}`;

	/** @private */
	@property({ type: Boolean })
	declare popinHidden: boolean;

	/** @private */
	@slot()
	declare action: Slot<TableHeaderCellActionBase>;

	onEnterDOM() {
		super.onEnterDOM();
		this.toggleAttribute("ui5-table-header-cell", true);
	}
}

InputTableSuggestHeaderCell.define();

export default InputTableSuggestHeaderCell;
