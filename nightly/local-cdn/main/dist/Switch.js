var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Switch_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter, isShift, isEscape, isSpaceShift, } from "@ui5/webcomponents-base/dist/Keys.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/less.js";
import SwitchDesign from "./types/SwitchDesign.js";
import { FORM_CHECKABLE_REQUIRED } from "./generated/i18n/i18n-defaults.js";
// Template
import SwitchTemplate from "./SwitchTemplate.js";
// Styles
import switchCss from "./generated/themes/Switch.css.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-switch` component is used for changing between binary states.
 *
 * The component can display texts, that will be switched, based on the component state, via the `textOn` and `textOff` properties,
 * but texts longer than 3 letters will be cutted off.
 *
 * However, users are able to customize the width of `ui5-switch` with pure CSS (`<ui5-switch style="width: 200px">`), and set widths, depending on the texts they would use.
 *
 * Note: the component would not automatically stretch to fit the whole text width.
 *
 * ### Keyboard Handling
 * The state can be changed by pressing the Space and Enter keys.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Switch";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 * @csspart slider - Used to style the track, where the handle is being slid
 * @csspart text-on - Used to style the `textOn` property text
 * @csspart text-off - Used to style the `textOff` property text
 * @csspart handle - Used to style the handle of the switch
 */
let Switch = Switch_1 = class Switch extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the component design.
         *
         * **Note:** If `Graphical` type is set,
         * positive and negative icons will replace the `textOn` and `textOff`.
         * @public
         * @default "Textual"
         */
        this.design = "Textual";
        /**
         * Defines if the component is checked.
         *
         * **Note:** The property can be changed with user interaction,
         * either by cliking the component, or by pressing the `Enter` or `Space` key.
         * @default false
         * @formEvents change
         * @formProperty
         * @public
         */
        this.checked = false;
        /**
         * Defines whether the component is disabled.
         *
         * **Note:** A disabled component is noninteractive.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines whether the component is required.
         * @default false
         * @public
         * @since 1.16.0
         */
        this.required = false;
        /**
         * Defines the form value of the component.
         * @default ""
         * @since 2.12.0
         * @public
         */
        this.value = "";
        this._cancelAction = false;
        this._isSpacePressed = false;
    }
    get formValidityMessage() {
        return Switch_1.i18nBundle.getText(FORM_CHECKABLE_REQUIRED);
    }
    get formValidity() {
        return { valueMissing: this.required && !this.checked };
    }
    async formElementAnchor() {
        return this.getFocusDomRefAsync();
    }
    get formFormattedValue() {
        if (this.checked) {
            return this.value || "on";
        }
        return null;
    }
    get sapNextIcon() {
        return this.checked ? "accept" : "less";
    }
    _onclick() {
        this.toggle();
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this._isSpacePressed = true;
        }
        else if (isShift(e) || isEscape(e)) {
            this._cancelAction = true;
        }
        if (isEnter(e)) {
            this._onclick();
        }
    }
    _onkeyup(e) {
        const isSpaceKey = isSpace(e);
        const isCancelKey = isShift(e) || isEscape(e);
        if (isSpaceKey || isSpaceShift(e)) {
            if (this._cancelAction) {
                this._cancelAction = false;
                this._isSpacePressed = false;
                e.preventDefault();
                return;
            }
            this._isSpacePressed = false;
        }
        else if (isCancelKey && !this._isSpacePressed) {
            this._cancelAction = false;
        }
        if (isSpaceKey) {
            this._onclick();
        }
    }
    toggle() {
        if (!this.disabled) {
            this.checked = !this.checked;
            const changePrevented = !this.fireDecoratorEvent("change");
            // Angular two way data binding;
            const valueChangePrevented = !this.fireDecoratorEvent("value-changed");
            if (changePrevented || valueChangePrevented) {
                this.checked = !this.checked;
            }
        }
    }
    get graphical() {
        return this.design === SwitchDesign.Graphical;
    }
    get hasNoLabel() {
        return !(this.graphical || this.textOn || this.textOff);
    }
    get _textOn() {
        return this.graphical ? "" : this.textOn;
    }
    get _textOff() {
        return this.graphical ? "" : this.textOff;
    }
    get effectiveTabIndex() {
        return this.disabled ? undefined : 0;
    }
    get effectiveAriaDisabled() {
        return this.disabled ? "true" : undefined;
    }
    get accessibilityOnText() {
        return this._textOn;
    }
    get accessibilityOffText() {
        return this._textOff;
    }
    get hiddenText() {
        return this.checked ? this.accessibilityOnText : this.accessibilityOffText;
    }
    get ariaLabelText() {
        return [getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this), this.hiddenText].join(" ").trim();
    }
};
__decorate([
    property()
], Switch.prototype, "design", void 0);
__decorate([
    property({ type: Boolean })
], Switch.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], Switch.prototype, "disabled", void 0);
__decorate([
    property()
], Switch.prototype, "textOn", void 0);
__decorate([
    property()
], Switch.prototype, "textOff", void 0);
__decorate([
    property()
], Switch.prototype, "accessibleName", void 0);
__decorate([
    property()
], Switch.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], Switch.prototype, "tooltip", void 0);
__decorate([
    property({ type: Boolean })
], Switch.prototype, "required", void 0);
__decorate([
    property()
], Switch.prototype, "name", void 0);
__decorate([
    property()
], Switch.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Switch.prototype, "_cancelAction", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Switch.prototype, "_isSpacePressed", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Switch, "i18nBundle", void 0);
Switch = Switch_1 = __decorate([
    customElement({
        tag: "ui5-switch",
        formAssociated: true,
        languageAware: true,
        styles: switchCss,
        renderer: jsxRenderer,
        template: SwitchTemplate,
    })
    /**
     * Fired when the component checked state changes.
     * @public
     */
    ,
    event("change", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired to make Angular two way data binding work properly.
     * @private
     */
    ,
    event("value-changed", {
        bubbles: true,
        cancelable: true,
    })
], Switch);
Switch.define();
export default Switch;
//# sourceMappingURL=Switch.js.map