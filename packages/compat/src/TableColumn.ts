import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableColumnTemplate from "./TableColumnTemplate.js";
import type TableColumnPopinDisplay from "./types/TableColumnPopinDisplay.js";

// Styles
import tableColumnStyles from "./generated/themes/TableColumn.css.js";
import { patchScopingSuffix } from "./utils/CompatCustomElementsScope.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-column` component allows to define column specific properties that are applied
 * when rendering the `ui5-table` component.
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Node[]} default - Defines the content of the column header
 * @csspart column - Used to style the native `th` element
 * @deprecated Deprecated as of version 2.12.0, use `@ui5/webcomponents/dist/Table.js` instead.
 */
@customElement({
	tag: "ui5-table-column",
	styles: tableColumnStyles,
	renderer: jsxRenderer,
	template: TableColumnTemplate,
})
class TableColumn extends UI5Element {
	/**
	 * Defines the minimum table width required to display this column. By default it is always displayed.
	 *
	 * The responsive behavior of the `ui5-table` is determined by this property. As an example, by setting
	 * `minWidth` property to `400` sets the minimum width to 400 pixels, and	shows this column on tablet (and desktop) but hides it on mobile.
	 *
	 * For further responsive design options, see `demandPopin` property.
	 * @default Infinity
	 * @public
	 */
	@property({ type: Number })
	minWidth: number = Infinity;

	/**
	 * The text for the column when it pops in.
	 * @default undefined
	 * @public
	 */
	@property()
	popinText?: string;

	/**
	 * According to your `minWidth` settings, the component can be hidden
	 * in different screen sizes.
	 *
	 * Setting this property to `true`, shows this column as pop-in instead of hiding it.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	demandPopin = false;

	/**
	 * Defines how the popin row is displayed.
	 *
	 * **The available values are:**
	 *
	 * - `Block`
	 * - `Inline`
	 * @default "Block"
	 * @public
	 */
	@property()
	popinDisplay: `${TableColumnPopinDisplay}` = "Block";

	/**
	 * @private
	 */
	@property({ type: Boolean })
	first = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	last = false;
}

patchScopingSuffix(TableColumn);

TableColumn.define();

export default TableColumn;
