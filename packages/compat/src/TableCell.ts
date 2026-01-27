import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import TableCellTemplate from "./TableCellTemplate.js";

// Styles
import tableCellStyles from "./generated/themes/TableCell.css.js";

// Texts
import {
	ARIA_LABEL_EMPTY_CELL,
} from "./generated/i18n/i18n-defaults.js";
import { patchScopingSuffix } from "./utils/CompatCustomElementsScope.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-cell` component defines the structure of the data in a single `ui5-table` cell.
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart cell - Used to style the native `td` element
 * @deprecated Deprecated as of version 2.12.0, use `@ui5/webcomponents/dist/TableCell.js` instead.
 */
@customElement({
	tag: "ui5-table-cell",
	renderer: jsxRenderer,
	template: TableCellTemplate,
	styles: tableCellStyles,
})
class TableCell extends UI5Element {
	/**
	 * @private
	 */
	@property({ type: Boolean })
	lastInRow = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	popined = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_popinedInline = false;

	/**
	 * Specifies the content of the component.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: DefaultSlot<Array<HTMLElement>>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get cellContent(): Array<HTMLElement> {
		return this.getSlottedNodes<HTMLElement>("content");
	}

	get ariaLabelEmptyCellText(): string {
		return TableCell.i18nBundle.getText(ARIA_LABEL_EMPTY_CELL);
	}
}

patchScopingSuffix(TableCell);

TableCell.define();

export default TableCell;
