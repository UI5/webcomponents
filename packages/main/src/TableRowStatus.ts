import { customElement, property, i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import TableRowStatusTemplate from "./TableRowStatusTemplate.js";
import TableRowStatusCss from "./generated/themes/TableRowStatus.css.js";
import type RowStatus from "./types/RowStatus.js";
import type RowStatusDesign from "./types/RowStatusDesign.js";
import {
	TABLE_ROW_HIGHLIGHT_NEGATIVE,
	TABLE_ROW_HIGHLIGHT_CRITICAL,
	TABLE_ROW_HIGHLIGHT_POSITIVE,
	TABLE_ROW_HIGHLIGHT_INFORMATION,
} from "./generated/i18n/i18n-defaults.js";

const STATUS_TEXTS: Record<`${RowStatus}`, I18nText> = {
	Negative: TABLE_ROW_HIGHLIGHT_NEGATIVE,
	Critical: TABLE_ROW_HIGHLIGHT_CRITICAL,
	Positive: TABLE_ROW_HIGHLIGHT_POSITIVE,
	Information: TABLE_ROW_HIGHLIGHT_INFORMATION,
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row-status` component defines the status indicator of a `ui5-table-row`.
 * It is placed in the `status` slot of the `ui5-table-row` and renders a colored bar based on its `value`.
 *
 * **Note:** For the status to be rendered, the `ui5-table-header-row` must contain a `ui5-table-header-row-status` in its `status` slot.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRowStatus.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.30.0
 * @public
 */
@customElement({
	tag: "ui5-table-row-status",
	renderer: jsxRenderer,
	styles: TableRowStatusCss,
	template: TableRowStatusTemplate,
})
class TableRowStatus extends UI5Element {
	/**
	 * Defines the semantic status of the row.
	 *
	 * A colored indicator is rendered at the start of the row to signal its status.
	 * Semantic values (`Positive`, `Critical`, `Negative`, `Information`) also provide a built-in screen-reader announcement.
	 * If no value is set, no indicator or announcement is rendered.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	value?: `${RowStatus}`;

	/**
	 * Defines the text alternative announced by assistive technologies for the status indicator.
	 *
	 * If set, it overrides the default announcement derived from `value`.
	 * In the extended design, this text is also shown as a tooltip over the entire status cell.
	 * Use it to provide a more specific description of the row's status (for example, "Out of stock" instead of "Error").
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the icon of the status indicator, rendered only in the extended design.
	 * Defaults to an icon derived from the `value`.
	 *
	 * @default undefined
	 * @private
	 */
	@property()
	icon?: string;

	/**
	 * Defines the rendering design, set by the table from the `ui5-table-header-row-status`.
	 *
	 * @default "Simple"
	 * @private
	 */
	@property()
	_design: `${RowStatusDesign}` = "Simple";

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get _accessibleText() {
		return (this.value !== undefined)
			? this.text ?? TableRowStatus.i18nBundle.getText(STATUS_TEXTS[this.value])
			: undefined;
	}
}

TableRowStatus.define();

export default TableRowStatus;
