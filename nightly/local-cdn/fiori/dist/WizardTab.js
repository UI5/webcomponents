var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter, isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import WizardTabTemplate from "./WizardTabTemplate.js";
import WizardTabCss from "./generated/themes/WizardTab.css.js";
/**
 * @class
 *
 * ### Overview
 * Private component, used internally by the `ui5-wizard`
 * to represent a "step" in the navigation header of the `ui5-wizard`.
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/WizardTab.js";` (imported with <ui5-wizard>)
 * @constructor
 * @extends UI5Element
 * @private
 */
let WizardTab = class WizardTab extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines if the step is `disabled` - the step is not responding to user interaction.
         * @default false
         * @private
         */
        this.disabled = false;
        /**
         * Defines if the step is `selected`.
         * @default false
         * @private
         */
        this.selected = false;
        /**
         * Defines if the step's separator is hidden or not.
         * @default false
         * @private
         */
        this.hideSeparator = false;
        /**
         * Defines if the step's separator is active or not.
         * @default false
         * @private
         */
        this.activeSeparator = false;
        /**
         * Defines if the step's separator is dashed or not.
         * @default false
         * @private
         */
        this.branchingSeparator = false;
    }
    _onclick() {
        if (!this.disabled) {
            this.fireDecoratorEvent("selection-change-requested");
        }
    }
    _onkeyup(e) {
        if (this.disabled) {
            return;
        }
        if ((isSpace(e) || isEnter(e)) && !isSpaceShift(e)) {
            e.preventDefault();
            this.fireDecoratorEvent("selection-change-requested");
        }
    }
    get effectiveTabIndex() {
        if (this.disabled) {
            return;
        }
        if (this.selected || this.forcedTabIndex === "0") {
            return 0;
        }
        return -1;
    }
    _onfocusin() {
        this.fireDecoratorEvent("focused");
    }
    get hasTexts() {
        return this.titleText || this.subtitleText;
    }
    get accInfo() {
        return {
            "ariaSetsize": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaSetsize,
            "ariaPosinset": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaPosinset,
            "ariaLabel": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaLabel,
            "ariaCurrent": this.selected ? "true" : undefined,
        };
    }
};
__decorate([
    property()
], WizardTab.prototype, "icon", void 0);
__decorate([
    property()
], WizardTab.prototype, "titleText", void 0);
__decorate([
    property()
], WizardTab.prototype, "subtitleText", void 0);
__decorate([
    property()
], WizardTab.prototype, "number", void 0);
__decorate([
    property({ type: Boolean })
], WizardTab.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], WizardTab.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], WizardTab.prototype, "hideSeparator", void 0);
__decorate([
    property({ type: Boolean })
], WizardTab.prototype, "activeSeparator", void 0);
__decorate([
    property({ type: Boolean })
], WizardTab.prototype, "branchingSeparator", void 0);
__decorate([
    property()
], WizardTab.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Object })
], WizardTab.prototype, "_wizardTabAccInfo", void 0);
WizardTab = __decorate([
    customElement({
        tag: "ui5-wizard-tab",
        renderer: jsxRenderer,
        styles: WizardTabCss,
        template: WizardTabTemplate,
    })
    /**
     * Fired when focus on a step.
     * @private
     */
    ,
    event("focused", {
        bubbles: true,
    })
    /**
     * Fired when clicking on none disabled step.
     * @private
     */
    ,
    event("selection-change-requested", {
        bubbles: true,
    })
], WizardTab);
WizardTab.define();
export default WizardTab;
//# sourceMappingURL=WizardTab.js.map