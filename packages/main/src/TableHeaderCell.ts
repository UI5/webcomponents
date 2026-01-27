import { customElement, property, slotStrict as slot } from "@ui5/webcomponents-base/dist/decorators.js";
import { toggleAttribute } from "./TableUtils.js";
import TableCellBase from "./TableCellBase.js";
import TableHeaderCellTemplate from "./TableHeaderCellTemplate.js";
import TableHeaderCellStyles from "./generated/themes/TableHeaderCell.css.js";
import SortOrder from "@ui5/webcomponents-base/dist/types/SortOrder.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import type TableHeaderCellActionBase from "./TableHeaderCellActionBase.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-cell` component represents a column in the `ui5-table`.
 *
 * As it is tightly coupled to the `ui5-table`, it should only be used in the `ui5-table-header-row`
 * to ensure correct layout and design.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderCell.js";`
 *
 * @constructor
 * @extends TableCellBase
 * @since 2.0.0
 * @public
 */
@customElement({
	tag: "ui5-table-header-cell",
	styles: [TableCellBase.styles, TableHeaderCellStyles],
	template: TableHeaderCellTemplate,
})
class TableHeaderCell extends TableCellBase {
	/**
	 * Defines the width of the column.
	 *
	 * By default, the column will grow and shrink according to the available space.
	 * This will distribute the space proportionally among all columns with no specific width set.
	 *
	 * See [\<length\>](https://developer.mozilla.org/en-US/docs/Web/CSS/length) and
	 * [\<percentage\>](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) for possible width values.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	width?: string;

	/**
 	 * Defines the minimum width of the column.
	 *
	 * If the table is in `Popin` mode and the minimum width does not fit anymore,
	 * the column will move into the popin.
	 *
	 * By default, the table prevents the column from becoming too small.
	 * Changing this value to a small value might lead to accessibility issues.
	 *
	 * **Note:** This property only takes effect for columns with a [\<percentage\>](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) value
	 * or the default width.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	minWidth?: string;

	/**
	 * Defines the importance of the column.
	 *
	 * This property affects the popin behaviour.
	 * Columns with higher importance will move into the popin area later then less important
	 * columns.
	 *
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	importance = 0;

	/**
	 * The text for the column when it pops in.
	 *
	 * @default undefined
	 * @since 2.7.0
	 * @public
	 */
	@property()
	popinText?: string;

	/**
	 * Defines the sort indicator of the column.
	 *
	 * @default "None"
	 * @since 2.8.0
	 * @public
	 */
	@property()
	sortIndicator: `${SortOrder}` = "None";

	/**
	 * Defines if the column is hidden in the popin.
	 *
	 * **Note:** Please be aware that hiding the column in the popin might lead to accessibility issues as
	 * users might not be able to access the content of the column on small screens.
	 *
	 * @default false
	 * @since 2.8.0
	 * @public
	 */
	@property({ type: Boolean })
	popinHidden: boolean = false;

	/**
	 * Defines the action of the column.
	 *
	 * **Note:** While multiple actions are technically possible, this is not supported.
	 *
	 * @public
	 * @since 2.8.0
	 */
	@slot()
	action!: Slot<Array<TableHeaderCellActionBase>>;

	@property({ type: Boolean, noAttribute: true })
	_popin = false;

	@query("slot:not([name])")
	_defaultSlot!: HTMLSlotElement;

	@query("slot[name=action]")
	_actionSlot!: HTMLSlotElement;

	ariaRole: string = "columnheader";
	_popinWidth: number = 0;

	onBeforeRendering() {
		super.onBeforeRendering();
		if (this._individualSlot) {
			// overwrite setting of TableCellBase so that the TableHeaderCell always uses the slot variable
			this.style.justifyContent = `var(--horizontal-align-${this._individualSlot})`;
		}
		toggleAttribute(this, "aria-sort", this.sortIndicator !== SortOrder.None, this.sortIndicator.toLowerCase());
	}

	get accessibilityInfo() {
		return {
			children: [this._defaultSlot, this._actionSlot],
		};
	}
}

TableHeaderCell.define();

export default TableHeaderCell;
