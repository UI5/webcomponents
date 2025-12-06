var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-sort-item` component defines the sorting criteria for data in `ui5-view-settings-dialog`.
 * It represents a single sort option that users can select to organize data in ascending or descending order.
 *
 * ### Usage
 *
 * The `ui5-sort-item` is used within the `ui5-view-settings-dialog` to provide sorting options.
 * Each sort item represents a column or field by which data can be sorted.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SortItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
let SortItem = class SortItem extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines if the sort item is selected.
         * @default false
         * @public
         */
        this.selected = false;
    }
};
__decorate([
    property()
], SortItem.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], SortItem.prototype, "selected", void 0);
SortItem = __decorate([
    customElement("ui5-sort-item")
], SortItem);
SortItem.define();
export default SortItem;
//# sourceMappingURL=SortItem.js.map