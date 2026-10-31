var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TableCell_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import TableCellTemplate from "./TableCellTemplate.js";
// Styles
import tableCellStyles from "./generated/themes/TableCell.css.js";
// Texts
import { ARIA_LABEL_EMPTY_CELL, } from "./generated/i18n/i18n-defaults.js";
import { patchScopingSuffix } from "./utils/CompatCustomElementsScope.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-cell` component defines the structure of the data in a single `ui5-table` cell.
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart cell - Used to style the native `td` element
 * @deprecated Deprecated as of version 2.12.0, use `@ui5/webcomponents/dist/TableCell.js` instead.
 */
let TableCell = TableCell_1 = class TableCell extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * @private
         */
        this.lastInRow = false;
        /**
         * @private
         */
        this.popined = false;
        /**
         * @private
         */
        this._popinedInline = false;
    }
    get cellContent() {
        return this.getSlottedNodes("content");
    }
    get ariaLabelEmptyCellText() {
        return TableCell_1.i18nBundle.getText(ARIA_LABEL_EMPTY_CELL);
    }
};
__decorate([
    property({ type: Boolean })
], TableCell.prototype, "lastInRow", void 0);
__decorate([
    property({ type: Boolean })
], TableCell.prototype, "popined", void 0);
__decorate([
    property({ type: Boolean })
], TableCell.prototype, "_popinedInline", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], TableCell.prototype, "content", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], TableCell, "i18nBundle", void 0);
TableCell = TableCell_1 = __decorate([
    customElement({
        tag: "ui5-table-cell",
        renderer: jsxRenderer,
        template: TableCellTemplate,
        styles: tableCellStyles,
    })
], TableCell);
patchScopingSuffix(TableCell);
TableCell.define();
export default TableCell;
//# sourceMappingURL=TableCell.js.map