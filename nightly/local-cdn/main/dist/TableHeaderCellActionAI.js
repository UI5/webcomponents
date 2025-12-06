var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TableHeaderCellActionAI_1;
import { customElement, i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import TableHeaderCellActionBase from "./TableHeaderCellActionBase.js";
import { TABLE_GENERATED_BY_AI } from "./generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents-icons/dist/ai.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-cell-action-ai` component defines a dedicated AI action for the table column.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderCellActionAI.js";`
 *
 * @constructor
 * @extends TableHeaderCellActionBase
 * @since 2.8.0
 * @public
 */
let TableHeaderCellActionAI = TableHeaderCellActionAI_1 = class TableHeaderCellActionAI extends TableHeaderCellActionBase {
    onAfterRendering() {
        super.onAfterRendering();
        this.toggleAttribute("_popin", !this.parentElement?.hasAttribute("ui5-table-header-cell"));
    }
    getRenderInfo() {
        return {
            icon: "ai",
            tooltip: TableHeaderCellActionAI_1.i18nBundle.getText(TABLE_GENERATED_BY_AI),
        };
    }
};
__decorate([
    i18n("@ui5/webcomponents")
], TableHeaderCellActionAI, "i18nBundle", void 0);
TableHeaderCellActionAI = TableHeaderCellActionAI_1 = __decorate([
    customElement({ tag: "ui5-table-header-cell-action-ai" })
], TableHeaderCellActionAI);
TableHeaderCellActionAI.define();
export default TableHeaderCellActionAI;
//# sourceMappingURL=TableHeaderCellActionAI.js.map