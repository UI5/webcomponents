var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
/**
 * @class
 *
 * ### Overview
 *
 * A component that represents a logical step as part of the `ui5-wizard`.
 * It is meant to aggregate arbitrary HTML elements that form the content of a single step.
 *
 * ### Structure
 *
 * - Each wizard step has arbitrary content.
 * - Each wizard step might have texts - defined by the `titleText` and `subtitleText` properties.
 * - Each wizard step might have an icon - defined by the `icon` property.
 * - Each wizard step might display a number in place of the `icon`, when it's missing.
 *
 * ### Usage
 * The `ui5-wizard-step` component should be used only as slot of the `ui5-wizard` component
 * and should not be used standalone.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.10
 * @public
 * @slot {Node[]} default - Defines the step content.
 */
let WizardStep = class WizardStep extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines if the step is `disabled`. When disabled the step is displayed,
         * but the user can't select the step by clicking or navigate to it with scrolling.
         *
         * **Note:** Step can't be `selected` and `disabled` at the same time.
         * In this case the `selected` property would take precedence.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines the step's `selected` state - the step that is currently active.
         *
         * **Note:** Step can't be `selected` and `disabled` at the same time.
         * In this case the `selected` property would take precedence.
         * @default false
         * @public
         */
        this.selected = false;
        /**
         * When `branching` is enabled a dashed line would be displayed after the step,
         * meant to indicate that the next step is not yet known and depends on user choice in the current step.
         *
         * **Note:** It is recommended to use `branching` on the last known step
         * and later add new steps when it becomes clear how the wizard flow should continue.
         * @default false
         * @public
         */
        this.branching = false;
    }
};
__decorate([
    property()
], WizardStep.prototype, "titleText", void 0);
__decorate([
    property()
], WizardStep.prototype, "subtitleText", void 0);
__decorate([
    property()
], WizardStep.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], WizardStep.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], WizardStep.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], WizardStep.prototype, "branching", void 0);
WizardStep = __decorate([
    customElement("ui5-wizard-step")
], WizardStep);
WizardStep.define();
export default WizardStep;
//# sourceMappingURL=WizardStep.js.map