var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-row-status` component configures the status column of a `ui5-table`.
 * Placed in the `status` slot of the `ui5-table-header-row`, its presence reserves the status
 * column so that the `ui5-table-row-status` of the data rows can be rendered.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderRowStatus.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.30.0
 * @public
 */
let TableHeaderRowStatus = class TableHeaderRowStatus extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the rendering design of all row status indicators of the table.
         *
         * @default "Simple"
         * @private
         */
        this.design = "Simple";
    }
    /**
     * Returns the width of the status column for the current design.
     *
     * @private
     */
    get _width() {
        return this.design === "Extended"
            ? "var(--_ui5_table_status_cell_extended_width)"
            : "var(--_ui5_table_status_cell_width)";
    }
};
__decorate([
    property()
], TableHeaderRowStatus.prototype, "design", void 0);
TableHeaderRowStatus = __decorate([
    customElement({
        tag: "ui5-table-header-row-status",
    })
], TableHeaderRowStatus);
TableHeaderRowStatus.define();
export default TableHeaderRowStatus;
//# sourceMappingURL=TableHeaderRowStatus.js.map