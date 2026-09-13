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
declare class TableRowAction extends TableRowActionBase {
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
    icon: string;
    /**
     * Defines the text of the row action.
     *
     * **Note:** For row actions to work properly, this property is mandatory.
     *
     * @default ""
     * @public
     */
    text: string;
    getRenderInfo(): {
        text: string;
        icon: string;
        interactive: boolean;
    };
}
export default TableRowAction;
