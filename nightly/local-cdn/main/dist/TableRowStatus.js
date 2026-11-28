var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TableRowStatus_1;
import { customElement, property, i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableRowStatusTemplate from "./TableRowStatusTemplate.js";
import TableRowStatusCss from "./generated/themes/TableRowStatus.css.js";
import { TABLE_ROW_HIGHLIGHT_NEGATIVE, TABLE_ROW_HIGHLIGHT_CRITICAL, TABLE_ROW_HIGHLIGHT_POSITIVE, TABLE_ROW_HIGHLIGHT_INFORMATION, } from "./generated/i18n/i18n-defaults.js";
const STATUS_TEXTS = {
    Negative: TABLE_ROW_HIGHLIGHT_NEGATIVE,
    Critical: TABLE_ROW_HIGHLIGHT_CRITICAL,
    Positive: TABLE_ROW_HIGHLIGHT_POSITIVE,
    Information: TABLE_ROW_HIGHLIGHT_INFORMATION,
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row-status` component defines the status indicator of a `ui5-table-row`.
 * It is placed in the `status` slot of the `ui5-table-row` and renders a colored bar based on its `value`.
 *
 * **Note:** For the status to be rendered, the `ui5-table-header-row` must contain a `ui5-table-header-row-status` in its `status` slot.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRowStatus.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.30.0
 * @public
 */
let TableRowStatus = TableRowStatus_1 = class TableRowStatus extends UI5Element {
    constructor() {
        super(...arguments);
        this._design = "Simple";
    }
    get _accessibleText() {
        if (this.value) {
            return this.text ?? TableRowStatus_1.i18nBundle.getText(STATUS_TEXTS[this.value]);
        }
        if (this.colorScheme) {
            return this.text;
        }
        return undefined;
    }
};
__decorate([
    property()
], TableRowStatus.prototype, "value", void 0);
__decorate([
    property()
], TableRowStatus.prototype, "text", void 0);
__decorate([
    property()
], TableRowStatus.prototype, "colorScheme", void 0);
__decorate([
    property()
], TableRowStatus.prototype, "icon", void 0);
__decorate([
    property()
], TableRowStatus.prototype, "_design", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], TableRowStatus, "i18nBundle", void 0);
TableRowStatus = TableRowStatus_1 = __decorate([
    customElement({
        tag: "ui5-table-row-status",
        renderer: jsxRenderer,
        styles: TableRowStatusCss,
        template: TableRowStatusTemplate,
    })
], TableRowStatus);
TableRowStatus.define();
export default TableRowStatus;
//# sourceMappingURL=TableRowStatus.js.map