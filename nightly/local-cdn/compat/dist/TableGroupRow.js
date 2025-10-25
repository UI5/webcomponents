var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TableGroupRow_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableGroupRowTemplate from "./TableGroupRowTemplate.js";
import TableMode from "./types/TableMode.js";
// Texts
import { TABLE_GROUP_ROW_ARIA_LABEL, } from "./generated/i18n/i18n-defaults.js";
// Styles
import tableGroupRowStyles from "./generated/themes/TableGroupRow.css.js";
import { patchScopingSuffix } from "./utils/CompatCustomElementsScope.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-group-row` component represents a group row in the `ui5-table`.
 * @constructor
 * @since 2.0.0
 * @implements {ITableRow}
 * @extends UI5Element
 * @public
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @csspart group-row - Used to style the native `tr` element
 * @deprecated Deprecated as of version 2.12.0, use `@ui5/webcomponents/dist/Table.js` instead.
 */
let TableGroupRow = TableGroupRow_1 = class TableGroupRow extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the mode of the row
         * @default "None"
         * @private
         */
        this.mode = "None";
        this.forcedBusy = false;
        // Properties, set and handled by the Table
        this.selected = false;
        this.tabbableElements = [];
        this._columnsInfoString = "";
    }
    get colSpan() {
        return this._colSpan;
    }
    get ariaLabelText() {
        return `${TableGroupRow_1.i18nBundle.getText(TABLE_GROUP_ROW_ARIA_LABEL)} ${this.textContent}. ${this.forcedAriaPosition}`;
    }
    visibleColCount() {
        let count = this._columnsInfo?.reduce((acc, column) => {
            return column.visible ? ++acc : acc;
        }, 0) || 0;
        if (this.mode === TableMode.MultiSelect) {
            count++;
        }
        return count;
    }
    onBeforeRendering() {
        if (!this._columnsInfo || this._columnsInfo.length === 0) {
            return;
        }
        this._colSpan = this.visibleColCount();
    }
    _onfocusin(e) {
        this.fireDecoratorEvent("_focused", e);
    }
};
__decorate([
    property()
], TableGroupRow.prototype, "mode", void 0);
__decorate([
    property({ type: Array })
], TableGroupRow.prototype, "_columnsInfo", void 0);
__decorate([
    property()
], TableGroupRow.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Boolean })
], TableGroupRow.prototype, "forcedBusy", void 0);
__decorate([
    property()
], TableGroupRow.prototype, "forcedAriaPosition", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], TableGroupRow, "i18nBundle", void 0);
TableGroupRow = TableGroupRow_1 = __decorate([
    customElement({
        tag: "ui5-table-group-row",
        styles: tableGroupRowStyles,
        renderer: jsxRenderer,
        template: TableGroupRowTemplate,
    }),
    event("_focused", {
        bubbles: true,
    })
], TableGroupRow);
patchScopingSuffix(TableGroupRow);
TableGroupRow.define();
export default TableGroupRow;
//# sourceMappingURL=TableGroupRow.js.map