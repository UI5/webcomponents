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
 * The `ui5-shellbar-spacer` is an element, used for visual separation between the two content parts of the `ui5-shellbar`.
 * **Note:** The `ui5-shellbar-spacer` component is in an experimental state and is a subject to change.
 * @constructor
 * @extends UI5Element
 * @since 2.7.0
 * @abstract
 * @public
 */
let ShellBarSpacer = class ShellBarSpacer extends UI5Element {
    constructor() {
        super(...arguments);
        this.visible = false;
    }
};
__decorate([
    property({ type: Boolean })
], ShellBarSpacer.prototype, "visible", void 0);
ShellBarSpacer = __decorate([
    customElement({
        tag: "ui5-shellbar-spacer",
    })
], ShellBarSpacer);
ShellBarSpacer.define();
export default ShellBarSpacer;
//# sourceMappingURL=ShellBarSpacer.js.map