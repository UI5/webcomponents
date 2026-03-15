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
import SliderHandleTemplate from "./SliderHandleTemplate.js";
import styles from "./generated/themes/SliderHandle.css.js";
/**
 * @class
 * The <code>ui5-slider-handle</code> component represents the handle of the <code>ui5-slider</code> component.
 *
 * @constructor
 * @extends UI5Element
 * @since 2.19.0
 * @private
 */
let SliderHandle = class SliderHandle extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the value of the slider handle.
         * <br><br>
         * <b>Note:</b> The value should be between the <code>min</code> and <code>max</code> properties of the parent <code>ui5-slider</code>.
         * @since 2.19.0
         * @public
         */
        this.value = 0;
        /**
         * Defines the minimum value of the slider handle.
         * <br><br>
         * <b>Note:</b> The value should be less than the <code>max</code> property of the parent <code>ui5-slider</code>.
         * @since 2.19.0
         * @public
         */
        this.min = 0;
        /**
         * Defines the maximum value of the slider handle.
         * <br><br>
         * <b>Note:</b> The value should be greater than the <code>min</code> property of the parent <code>ui5-slider</code>.
         * @since 2.19.0
         * @public
         */
        this.max = 100;
        /**
         * Defines whether the slider handle is disabled.
         * <br><br>
         * <b>Note:</b> A disabled slider handle cannot be interacted with.
         * @since 2.19.0
         * @public
         */
        this.disabled = false;
        /**
         * Defines whether the slider handle is active.
         * <br><br>
         * <b>Note:</b> An active slider handle is currently being interacted with.
         * @since 2.19.0
         * @public
         */
        this.active = false;
        /**
         * Defines the orientation of the slider handle.
         *
         * @private
         */
        this.orientation = "Horizontal";
    }
    getFocusDomRef() {
        return this;
    }
};
__decorate([
    property({ type: Number })
], SliderHandle.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], SliderHandle.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], SliderHandle.prototype, "max", void 0);
__decorate([
    property({ type: Boolean })
], SliderHandle.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], SliderHandle.prototype, "active", void 0);
__decorate([
    property()
], SliderHandle.prototype, "orientation", void 0);
SliderHandle = __decorate([
    customElement({
        tag: "ui5-slider-handle",
        renderer: jsxRenderer,
        template: SliderHandleTemplate,
        styles,
    })
], SliderHandle);
SliderHandle.define();
export default SliderHandle;
//# sourceMappingURL=SliderHandle.js.map