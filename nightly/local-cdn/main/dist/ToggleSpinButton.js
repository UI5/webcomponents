var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import Button from "./Button.js";
import ToggleButton from "./ToggleButton.js";
// Template
import ToggleSpinButtonTemplate from "./ToggleSpinButtonTemplate.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-toggle-spin-button` is explicitly used in the new design of `ui5-time-picker`.
 * It extends `ui5-toggle-button` with some specific accessibility-related properties in order to
 * have spin button look and feel from accessibility point of view. This component should not be used separately.
 * @constructor
 * @extends ToggleButton
 * @since 1.15.0
 * @private
 */
let ToggleSpinButton = class ToggleSpinButton extends ToggleButton {
    constructor() {
        super(...arguments);
        /**
         * Defines the ARIA valuemin of the component.
         * @default -1
         */
        this.valueMin = -1;
        /**
         * Defines the ARIA valuemax of the component.
         * @default -1
         */
        this.valueMax = -1;
        /**
         * Defines the ARIA valuenow of the component.
         * @default -1
         */
        this.valueNow = -1;
    }
    ;
    /**
     * Override of the handler in order to prevent button toggle functionality
     */
    _onclick() { }
    /**
     * Override
     */
    get effectiveAccRole() {
        return "spinbutton";
    }
};
__decorate([
    property({ type: Number })
], ToggleSpinButton.prototype, "valueMin", void 0);
__decorate([
    property({ type: Number })
], ToggleSpinButton.prototype, "valueMax", void 0);
__decorate([
    property({ type: Number })
], ToggleSpinButton.prototype, "valueNow", void 0);
__decorate([
    property()
], ToggleSpinButton.prototype, "valueText", void 0);
ToggleSpinButton = __decorate([
    customElement({
        tag: "ui5-toggle-spin-button",
        renderer: jsxRenderer,
        styles: [Button.styles, ToggleButton.styles],
        template: ToggleSpinButtonTemplate,
    })
], ToggleSpinButton);
ToggleSpinButton.define();
export default ToggleSpinButton;
//# sourceMappingURL=ToggleSpinButton.js.map