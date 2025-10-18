var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TableRowActionNavigation_1;
import { customElement, property, i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import TableRowActionBase from "./TableRowActionBase.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import { TABLE_NAVIGATION } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row-action-navigation` component defines a navigation action for table rows.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRowActionNavigation.js";`
 *
 * @constructor
 * @extends TableRowActionBase
 * @since 2.7.0
 * @public
 */
let TableRowActionNavigation = TableRowActionNavigation_1 = class TableRowActionNavigation extends TableRowActionBase {
    constructor() {
        super(...arguments);
        /**
         * Defines the interactive state of the navigation action.
         *
         * @default false
         * @public
         */
        this.interactive = false;
    }
    isFixedAction() {
        return true;
    }
    getRenderInfo() {
        return {
            text: this._i18nNavigation,
            icon: "navigation-right-arrow",
            interactive: this.interactive,
        };
    }
    get _i18nNavigation() {
        return TableRowActionNavigation_1.i18nBundle.getText(TABLE_NAVIGATION);
    }
};
__decorate([
    property({ type: Boolean })
], TableRowActionNavigation.prototype, "interactive", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], TableRowActionNavigation, "i18nBundle", void 0);
TableRowActionNavigation = TableRowActionNavigation_1 = __decorate([
    customElement({ tag: "ui5-table-row-action-navigation" })
], TableRowActionNavigation);
TableRowActionNavigation.define();
export default TableRowActionNavigation;
//# sourceMappingURL=TableRowActionNavigation.js.map