var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let TableRowAction = class TableRowAction extends TableRowActionBase {
    constructor() {
        super(...arguments);
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
        this.icon = "";
        /**
         * Defines the text of the row action.
         *
         * **Note:** For row actions to work properly, this property is mandatory.
         *
         * @default ""
         * @public
         */
        this.text = "";
    }
    getRenderInfo() {
        return {
            text: this.text,
            icon: this.icon,
            interactive: true,
        };
    }
};
__decorate([
    property()
], TableRowAction.prototype, "icon", void 0);
__decorate([
    property()
], TableRowAction.prototype, "text", void 0);
TableRowAction = __decorate([
    customElement({ tag: "ui5-table-row-action" })
], TableRowAction);
TableRowAction.define();
export default TableRowAction;
//# sourceMappingURL=TableRowAction.js.map