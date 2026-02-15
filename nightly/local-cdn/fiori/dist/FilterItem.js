var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-filter-item` component defines the filtering criteria for data in `ui5-view-settings-dialog`.
 * It represents a single filter category that contains multiple filter options that users can select.
 *
 * ### Usage
 *
 * The `ui5-filter-item` is used within the `ui5-view-settings-dialog` to provide filtering options.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/FilterItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
let FilterItem = class FilterItem extends UI5Element {
};
__decorate([
    property()
], FilterItem.prototype, "text", void 0);
__decorate([
    property()
], FilterItem.prototype, "additionalText", void 0);
__decorate([
    slot()
], FilterItem.prototype, "values", void 0);
FilterItem = __decorate([
    customElement("ui5-filter-item")
], FilterItem);
FilterItem.define();
export default FilterItem;
//# sourceMappingURL=FilterItem.js.map