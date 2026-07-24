var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-special-date` component defines a special calendar date to be used inside `ui5-calendar`,
 * which is visually distinguished from the rest of the dates.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.23.0
 */
let SpecialCalendarDate = class SpecialCalendarDate extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * The date formatted according to the `formatPattern` property
         * of the `ui5-calendar` that hosts the component.
         * @default ""
         * @public
         */
        this.value = "";
        /**
         * Defines the type of the special date.
         * @default "None"
         * @public
         */
        this.type = "None";
        /**
         * Defines a tooltip text for the special date.
         * @default ""
         * @private
         */
        this._tooltip = "";
    }
};
__decorate([
    property()
], SpecialCalendarDate.prototype, "value", void 0);
__decorate([
    property()
], SpecialCalendarDate.prototype, "type", void 0);
__decorate([
    property()
], SpecialCalendarDate.prototype, "_tooltip", void 0);
SpecialCalendarDate = __decorate([
    customElement("ui5-special-date")
], SpecialCalendarDate);
SpecialCalendarDate.define();
export default SpecialCalendarDate;
//# sourceMappingURL=SpecialCalendarDate.js.map