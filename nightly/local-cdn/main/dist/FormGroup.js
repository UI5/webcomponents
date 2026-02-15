var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FormGroup_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { FORM_GROUP_ACCESSIBLE_NAME } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 *
 * The FormGroup (ui5-form-group) represents a group inside the Form (ui5-form) component
 * and it consists of FormItem (ui5-form-item) components.
 *
 * The layout of the FormGroup is mostly defined and controlled by the overarching Form (ui5-form) component.
 * Still, one can influence the layout via the FormGroup's `columnSpan` property,
 * that defines how many columns the group should expand to.
 *
 * ### Usage
 *
 * Тhe FormGroup (ui5-form-group) allows to split a Form into groups,
 * e.g to group FormItems that logically belong together.
 *
 * ### ES6 Module Import
 *
 * - import @ui5/webcomponents/dist/FormGroup.js";
 *
 * @public
 * @implements {IFormItem}
 * @since 2.0.0
 * @extends UI5Element
 */
let FormGroup = FormGroup_1 = class FormGroup extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the compoennt heading level,
         * set by the `headerText`.
         * @default "H3"
         * @public
         * @since 2.10.0
        */
        this.headerLevel = "H3";
        /**
         * @private
         */
        this.colsS = 1;
        this.colsM = 1;
        this.colsL = 1;
        this.colsXl = 1;
        this.itemSpacing = "Normal";
    }
    onBeforeRendering() {
        this.processFormItems();
    }
    processFormItems() {
        this.items.forEach((item) => {
            item.itemSpacing = this.itemSpacing;
        });
    }
    getEffectiveAccessibleName(index) {
        if (this.accessibleName || this.accessibleNameRef) {
            return getEffectiveAriaLabelText(this);
        }
        if (this.headerText) {
            return undefined;
        }
        return FormGroup_1.i18nBundle.getText(FORM_GROUP_ACCESSIBLE_NAME, index + 1);
    }
    get effectiveAccessibleNameRef() {
        if (this.accessibleName || this.accessibleNameRef) {
            return undefined;
        }
        return this.headerText ? `${this._id}-group-header-text` : undefined;
    }
    get isGroup() {
        return true;
    }
};
__decorate([
    property()
], FormGroup.prototype, "headerText", void 0);
__decorate([
    property()
], FormGroup.prototype, "headerLevel", void 0);
__decorate([
    property({ type: Number })
], FormGroup.prototype, "columnSpan", void 0);
__decorate([
    property()
], FormGroup.prototype, "accessibleName", void 0);
__decorate([
    property()
], FormGroup.prototype, "accessibleNameRef", void 0);
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
    })
], FormGroup.prototype, "items", void 0);
__decorate([
    property({ type: Number })
], FormGroup.prototype, "colsS", void 0);
__decorate([
    property({ type: Number })
], FormGroup.prototype, "colsM", void 0);
__decorate([
    property({ type: Number })
], FormGroup.prototype, "colsL", void 0);
__decorate([
    property({ type: Number })
], FormGroup.prototype, "colsXl", void 0);
__decorate([
    property()
], FormGroup.prototype, "itemSpacing", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], FormGroup, "i18nBundle", void 0);
FormGroup = FormGroup_1 = __decorate([
    customElement({
        tag: "ui5-form-group",
        fastNavigation: true,
    })
], FormGroup);
FormGroup.define();
export default FormGroup;
//# sourceMappingURL=FormGroup.js.map