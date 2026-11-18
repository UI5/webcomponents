import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, slotStrict as slot, property, i18n,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableCellBaseStyles from "./generated/themes/TableCellBase.css.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TableCellHorizontalAlign from "./types/TableCellHorizontalAlign.js";
import type { TableIBCSCellState } from "./TableIBCS.js";
import { toggleAttribute } from "./TableUtils.js";
import TableIBCSCellStyles from "./generated/themes/TableIBCSCell.css.js";

/**
 * @class
 * A class to serve as a foundation for the `TableCell` and `TableHeaderCell` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
@customElement({
	renderer: jsxRenderer,
	styles: [TableCellBaseStyles, TableIBCSCellStyles],
})
abstract class TableCellBase extends UI5Element {
	/**
	 * Defines the content of the component.
	 *
	 * @public
	 */
	@slot({ type: Node, "default": true })
	content!: DefaultSlot<Node>;

	/**
	 * Determines the horizontal alignment of table cells.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
    horizontalAlign?: `${TableCellHorizontalAlign}`;

	@property({ type: Boolean })
	_popin = false;

	@property({ type: Boolean, noAttribute: true })
	_popinHidden = false;

	@property({ type: Object, noAttribute: true })
	_ibcs?: TableIBCSCellState;

	ariaRole: string = "gridcell";

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onEnterDOM() {
		!this.role && this.setAttribute("role", this.ariaRole);
		this.toggleAttribute("ui5-table-cell-base", true);
	}

	onBeforeRendering() {
		const state = this._ibcs;
		toggleAttribute(this, "data-ui5-ibcs-row-type", !!state?.rowType, state?.rowType);
		toggleAttribute(this, "data-ui5-ibcs-column-type", !!state?.columnType, state?.columnType);
		toggleAttribute(this, "data-ui5-ibcs-scenario", !!state?.scenario, state?.scenario);
		toggleAttribute(this, "data-ui5-ibcs-impact", !!state?.impact, state?.impact);
		toggleAttribute(this, "data-ui5-ibcs-group-start", !!state?.groupStart);
		toggleAttribute(this, "data-ui5-ibcs-result", !!state?.result);
		if (state?.columnType === "RowHeader" && state.depth) {
			this.style.setProperty("--_ui5_table_ibcs_indent", `calc(${state.depth} * var(--ui5_table_ibcs_indent, 1rem))`);
		} else {
			this.style.removeProperty("--_ui5_table_ibcs_indent");
		}
	}

	get _effectiveHorizontalAlign(): `${TableCellHorizontalAlign}` | undefined {
		if (this.horizontalAlign || !this._ibcs?.columnType) {
			return this.horizontalAlign;
		}
		return this._ibcs.columnType === "RowHeader" ? "Start" : "End";
	}

	getFocusDomRef() {
		return this;
	}

	isTableCellBase() {
		return true;
	}
}

export default TableCellBase;
