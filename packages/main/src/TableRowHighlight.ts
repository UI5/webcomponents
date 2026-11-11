import { customElement, property, i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import TableRowHighlightTemplate from "./TableRowHighlightTemplate.js";
import TableRowHighlightCss from "./generated/themes/TableRowHighlight.css.js";
import type Highlight from "./types/Highlight.js";
import type HighlightDesign from "./types/HighlightDesign.js";
import {
	TABLE_ROW_HIGHLIGHT_NEGATIVE,
	TABLE_ROW_HIGHLIGHT_CRITICAL,
	TABLE_ROW_HIGHLIGHT_POSITIVE,
	TABLE_ROW_HIGHLIGHT_INFORMATION,
} from "./generated/i18n/i18n-defaults.js";

const HIGHLIGHT_TEXTS: Record<string, I18nText> = {
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
 * The `ui5-table-row-highlight` component defines the highlight indicator of a `ui5-table-row`.
 * It is placed in the `highlight` slot of the `ui5-table-row` and renders a colored bar based on its `type`.
 *
 * **Note:** For the highlight to be rendered, the `ui5-table-header-row` must contain a `ui5-table-header-row-highlight` in its `highlight` slot.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRowHighlight.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.30.0
 * @public
 */
@customElement({
	tag: "ui5-table-row-highlight",
	renderer: jsxRenderer,
	styles: TableRowHighlightCss,
	template: TableRowHighlightTemplate,
})
class TableRowHighlight extends UI5Element {
	/**
	 * Defines the highlight state of the row.
	 *
	 * A colored indicator is rendered at the start of the row to signal its status.
	 * Semantic values (`Positive`, `Critical`, `Negative`, `Information`) also provide a built-in screen-reader announcement.
	 *
	 * @default "None"
	 * @public
	 */
	@property()
	type: `${Highlight}` = "None";

	/**
	 * Defines the text alternative announced by assistive technologies for the highlight indicator.
	 *
	 * If set, it overrides the default announcement derived from the `type` value.
	 * In the extended design, this text is also shown as a tooltip over the entire highlight cell.
	 * Use it to provide a more specific description of the row's status (for example, "Out of stock" instead of "Error").
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the icon of the highlight indicator, rendered only in the extended design.
	 * Defaults to an icon derived from the `type`.
	 *
	 * @default undefined
	 * @private
	 */
	@property()
	icon?: string;

	/**
	 * Defines the rendering design, set by the table from the `ui5-table-header-row-highlight`.
	 *
	 * @default "Simple"
	 * @private
	 */
	@property()
	_design: `${HighlightDesign}` = "Simple";

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get _accessibleText() {
		return (this.type !== "None")
			? this.text ?? TableRowHighlight.i18nBundle.getText(HIGHLIGHT_TEXTS[this.type])
			: undefined;
	}
}

TableRowHighlight.define();

export default TableRowHighlight;
