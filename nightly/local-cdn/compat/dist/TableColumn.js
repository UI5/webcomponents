var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableColumnTemplate from "./TableColumnTemplate.js";
// Styles
import tableColumnStyles from "./generated/themes/TableColumn.css.js";
import { patchScopingSuffix } from "./utils/CompatCustomElementsScope.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-column` component allows to define column specific properties that are applied
 * when rendering the `ui5-table` component.
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Node[]} default - Defines the content of the column header
 * @csspart column - Used to style the native `th` element
 * @deprecated Deprecated as of version 2.12.0, use `@ui5/webcomponents/dist/Table.js` instead.
 */
let TableColumn = class TableColumn extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the minimum table width required to display this column. By default it is always displayed.
         *
         * The responsive behavior of the `ui5-table` is determined by this property. As an example, by setting
         * `minWidth` property to `400` sets the minimum width to 400 pixels, and	shows this column on tablet (and desktop) but hides it on mobile.
         *
         * For further responsive design options, see `demandPopin` property.
         * @default Infinity
         * @public
         */
        this.minWidth = Infinity;
        /**
         * According to your `minWidth` settings, the component can be hidden
         * in different screen sizes.
         *
         * Setting this property to `true`, shows this column as pop-in instead of hiding it.
         * @default false
         * @public
         */
        this.demandPopin = false;
        /**
         * Defines how the popin row is displayed.
         *
         * **The available values are:**
         *
         * - `Block`
         * - `Inline`
         * @default "Block"
         * @public
         */
        this.popinDisplay = "Block";
        /**
         * @private
         */
        this.first = false;
        /**
         * @private
         */
        this.last = false;
    }
};
__decorate([
    property({ type: Number })
], TableColumn.prototype, "minWidth", void 0);
__decorate([
    property()
], TableColumn.prototype, "popinText", void 0);
__decorate([
    property({ type: Boolean })
], TableColumn.prototype, "demandPopin", void 0);
__decorate([
    property()
], TableColumn.prototype, "popinDisplay", void 0);
__decorate([
    property({ type: Boolean })
], TableColumn.prototype, "first", void 0);
__decorate([
    property({ type: Boolean })
], TableColumn.prototype, "last", void 0);
TableColumn = __decorate([
    customElement({
        tag: "ui5-table-column",
        styles: tableColumnStyles,
        renderer: jsxRenderer,
        template: TableColumnTemplate,
    })
], TableColumn);
patchScopingSuffix(TableColumn);
TableColumn.define();
export default TableColumn;
//# sourceMappingURL=TableColumn.js.map