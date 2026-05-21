var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
// Template
import FormItemTemplate from "./FormItemTemplate.js";
// Styles
import FormItemCss from "./generated/themes/FormItem.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The FormItem (ui5-form-item) represents pair of a label and
 * one or more components (text or text fields), associated to it.
 *
 * ### Usage
 *
 * The FormItem is being used in FormGroup (ui5-form-group) or directly in Form (ui5-form).
 *
 * ### ES6 Module Import
 *
 * - import @ui5/webcomponents/dist/FormItem.js";
 *
 * @csspart layout - Used to style the parent element of the label and content parts.
 * @csspart label - Used to style the label part of the form item.
 * @csspart content - Used to style the content part of the form item.
 *
 * @constructor
 * @implements {IFormItem}
 * @public
 * @since 2.0.0
 * @extends UI5Element
 */
let FormItem = class FormItem extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * @private
         */
        this.itemSpacing = "Normal";
        /**
         * @private
         */
        this.accessibleMode = "Display";
    }
    get isGroup() {
        return false;
    }
};
__decorate([
    property({ type: Number })
], FormItem.prototype, "columnSpan", void 0);
__decorate([
    slot()
], FormItem.prototype, "labelContent", void 0);
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
        individualSlots: true,
    })
], FormItem.prototype, "content", void 0);
__decorate([
    property()
], FormItem.prototype, "itemSpacing", void 0);
__decorate([
    property()
], FormItem.prototype, "accessibleMode", void 0);
FormItem = __decorate([
    customElement({
        tag: "ui5-form-item",
        renderer: jsxRenderer,
        styles: FormItemCss,
        template: FormItemTemplate,
    })
], FormItem);
FormItem.define();
export default FormItem;
//# sourceMappingURL=FormItem.js.map