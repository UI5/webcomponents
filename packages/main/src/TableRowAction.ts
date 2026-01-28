import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TableRowActionBase from "./TableRowActionBase.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row-action` component defines an action for table rows.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRowAction.js";`
 *
 * @constructor
 * @extends TableRowActionBase
 * @since 2.7.0
 * @public
 */
@customElement({ tag: "ui5-table-row-action" })

class TableRowAction extends TableRowActionBase {
	/**
	 * Defines the icon of the row action.
	 *
	 * **Note:** For row actions to work properly, this property is mandatory.
	 *
	 * **Note:** SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 *
	 * @default ""
	 * @public
	 */
	@property()
	icon = "";

	/**
	 * Defines the text of the row action.
	 *
	 * **Note:** For row actions to work properly, this property is mandatory.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	getRenderInfo() {
		return {
			text: this.text,
			icon: this.icon,
			interactive: true,
		};
	}
}

TableRowAction.define();

export default TableRowAction;
