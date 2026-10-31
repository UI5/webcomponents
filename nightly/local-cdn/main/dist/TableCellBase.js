var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, slotStrict as slot, property, i18n, } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableCellBaseStyles from "./generated/themes/TableCellBase.css.js";
/**
 * @class
 * A class to serve as a foundation for the `TableCell` and `TableHeaderCell` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
let TableCellBase = class TableCellBase extends UI5Element {
    constructor() {
        super(...arguments);
        this._popin = false;
        this._popinHidden = false;
        this.ariaRole = "gridcell";
    }
    onEnterDOM() {
        !this.role && this.setAttribute("role", this.ariaRole);
        this.toggleAttribute("ui5-table-cell-base", true);
    }
    getFocusDomRef() {
        return this;
    }
    isTableCellBase() {
        return true;
    }
};
__decorate([
    slot({ type: Node, "default": true })
], TableCellBase.prototype, "content", void 0);
__decorate([
    property()
], TableCellBase.prototype, "horizontalAlign", void 0);
__decorate([
    property({ type: Boolean })
], TableCellBase.prototype, "_popin", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TableCellBase.prototype, "_popinHidden", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], TableCellBase, "i18nBundle", void 0);
TableCellBase = __decorate([
    customElement({
        renderer: jsxRenderer,
        styles: TableCellBaseStyles,
    })
], TableCellBase);
export default TableCellBase;
//# sourceMappingURL=TableCellBase.js.map