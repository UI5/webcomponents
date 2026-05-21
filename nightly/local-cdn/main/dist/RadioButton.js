var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RadioButton_1;
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { isSpace, isEnter, isDown, isLeft, isUp, isRight, } from "@ui5/webcomponents-base/dist/Keys.js";
import RadioButtonGroup from "./RadioButtonGroup.js";
// Template
import RadioButtonTemplate from "./RadioButtonTemplate.js";
// i18n
import { VALUE_STATE_ERROR, VALUE_STATE_WARNING, VALUE_STATE_SUCCESS, VALUE_STATE_INFORMATION, FORM_SELECTABLE_REQUIRED2, } from "./generated/i18n/i18n-defaults.js";
// Styles
import radioButtonCss from "./generated/themes/RadioButton.css.js";
let isGlobalHandlerAttached = false;
let activeRadio;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-radio-button` component enables users to select a single option from a set of options.
 * When a `ui5-radio-button` is selected by the user, the
 * `change` event is fired.
 * When a `ui5-radio-button` that is within a group is selected, the one
 * that was previously selected gets automatically deselected. You can group radio buttons by using the `name` property.
 *
 * **Note:** If `ui5-radio-button` is not part of a group, it can be selected once, but can not be deselected back.
 *
 * ### Keyboard Handling
 *
 * Once the `ui5-radio-button` is on focus, it might be selected by pressing the Space and Enter keys.
 *
 * The Arrow Down/Arrow Up and Arrow Left/Arrow Right keys can be used to change selection between next/previous radio buttons in one group,
 * while TAB and SHIFT + TAB can be used to enter or leave the radio button group.
 *
 * **Note:** On entering radio button group, the focus goes to the currently selected radio button.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/RadioButton";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart outer-ring - Used to style the outer ring of the `ui5-radio-button`.
 * @csspart inner-ring - Used to style the inner ring of the `ui5-radio-button`.
 */
let RadioButton = RadioButton_1 = class RadioButton extends UI5Element {
    get formValidityMessage() {
        return RadioButton_1.i18nBundle.getText(FORM_SELECTABLE_REQUIRED2);
    }
    get formValidity() {
        return { valueMissing: this._groupRequired && !this._groupChecked };
    }
    async formElementAnchor() {
        return this.getFocusDomRefAsync();
    }
    get formFormattedValue() {
        return this.checked ? (this.value || "on") : null;
    }
    constructor() {
        super();
        /**
         * Defines whether the component is disabled.
         *
         * **Note:** A disabled component is completely noninteractive.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines whether the component is read-only.
         *
         * **Note:** A read-only component isn't editable or selectable.
         * However, because it's focusable, it still provides visual feedback upon user interaction.
         * @default false
         * @public
         */
        this.readonly = false;
        /**
         * Defines whether the component is required.
         * @default false
         * @public
         * @since 1.9.0
         */
        this.required = false;
        /**
         * Defines whether the component is checked or not.
         *
         * **Note:** The property value can be changed with user interaction,
         * either by clicking/tapping on the component,
         * or by using the Space or Enter key.
         *
         * **Note:** Only enabled radio buttons can be checked.
         * Read-only radio buttons are not selectable, and therefore are always unchecked.
         * @default false
         * @formEvents change
         * @formProperty
         * @public
         * @since 1.0.0-rc.15
         */
        this.checked = false;
        /**
         * Defines the value state of the component.
         * @default "None"
         * @public
         */
        this.valueState = "None";
        /**
         * Defines the form value of the component.
         * When a form with a radio button group is submitted, the group's value
         * will be the value of the currently selected radio button.
         * @default ""
         * @public
         */
        this.value = "";
        /**
         * Defines whether the component text wraps when there is not enough space.
         *
         * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
         * @default "Normal"
         * @public
         */
        this.wrappingType = "Normal";
        /**
         * Defines the active state (pressed or not) of the component.
         * @default false
         * @private
         */
        this.active = false;
        /**
         * Defines if the component is selected in specific group
         * @default false
         * @private
         */
        this._groupChecked = false;
        this._groupRequired = false;
        this._name = "";
        this._checked = false;
        this._deactivate = () => {
            if (activeRadio) {
                activeRadio.active = false;
            }
        };
        if (!isGlobalHandlerAttached) {
            document.addEventListener("mouseup", this._deactivate);
            isGlobalHandlerAttached = true;
        }
    }
    onAfterRendering() {
        this.syncGroup();
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    onExitDOM() {
        this.syncGroup(true);
    }
    syncGroup(forceRemove) {
        const oldGroup = this._name;
        const currentGroup = this.name;
        const oldChecked = this._checked;
        const currentChecked = this.checked;
        if (forceRemove) {
            RadioButtonGroup.removeFromGroup(this, oldGroup);
        }
        if (currentGroup !== oldGroup) {
            if (oldGroup) {
                // remove the control from the previous group
                RadioButtonGroup.removeFromGroup(this, oldGroup);
            }
            if (currentGroup) {
                // add the control to the existing group
                RadioButtonGroup.addToGroup(this, currentGroup);
            }
        }
        else if (currentGroup && this.isConnected) {
            RadioButtonGroup.enforceSingleSelection(this, currentGroup);
        }
        if (this.name && currentChecked !== oldChecked) {
            RadioButtonGroup.updateTabOrder(this.name);
        }
        this._name = this.name || "";
        this._checked = this.checked;
    }
    _onclick() {
        return this.toggle();
    }
    _handleDown(e) {
        const currentGroup = this.name;
        if (!currentGroup) {
            return;
        }
        e.preventDefault();
        RadioButtonGroup.selectNextItem(this, currentGroup);
    }
    _handleUp(e) {
        const currentGroup = this.name;
        if (!currentGroup) {
            return;
        }
        e.preventDefault();
        RadioButtonGroup.selectPreviousItem(this, currentGroup);
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            this.active = true;
            return e.preventDefault();
        }
        if (isEnter(e)) {
            this.active = true;
            return this.toggle();
        }
        const isRTL = this.effectiveDir === "rtl";
        if (isDown(e) || (!isRTL && isRight(e)) || (isRTL && isLeft(e))) {
            this._handleDown(e);
        }
        if (isUp(e) || (!isRTL && isLeft(e)) || (isRTL && isRight(e))) {
            this._handleUp(e);
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this.toggle();
        }
        this.active = false;
    }
    _onmousedown() {
        this.active = true;
        activeRadio = this; // eslint-disable-line
    }
    _onmouseup() {
        this.active = false;
    }
    _onfocusout() {
        this.active = false;
    }
    toggle() {
        if (!this.canToggle()) {
            return this;
        }
        if (!this.name) {
            this.checked = !this.checked;
            this.fireDecoratorEvent("change");
            return this;
        }
        RadioButtonGroup.selectItem(this, this.name);
        return this;
    }
    canToggle() {
        return !(this.disabled || this.readonly || this.checked);
    }
    get effectiveAriaDisabled() {
        return (this.disabled || this.readonly) ? true : undefined;
    }
    get ariaLabelText() {
        return [getEffectiveAriaLabelText(this), this.text].filter(Boolean).join(" ");
    }
    get effectiveAriaDescribedBy() {
        return this.hasValueState ? `${this._id}-descr` : undefined;
    }
    get hasValueState() {
        return this.valueState !== ValueState.None;
    }
    get valueStateText() {
        switch (this.valueState) {
            case ValueState.Negative:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_ERROR);
            case ValueState.Critical:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_WARNING);
            case ValueState.Positive:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_SUCCESS);
            case ValueState.Information:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_INFORMATION);
            default:
                return "";
        }
    }
    get effectiveTabIndex() {
        const tabindex = this.getAttribute("tabindex");
        if (this.disabled) {
            return -1;
        }
        if (this.name) {
            return this._tabIndex;
        }
        return tabindex ? parseInt(tabindex) : 0;
    }
};
__decorate([
    property({ type: Boolean })
], RadioButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], RadioButton.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], RadioButton.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], RadioButton.prototype, "checked", void 0);
__decorate([
    property()
], RadioButton.prototype, "text", void 0);
__decorate([
    property()
], RadioButton.prototype, "valueState", void 0);
__decorate([
    property()
], RadioButton.prototype, "name", void 0);
__decorate([
    property()
], RadioButton.prototype, "value", void 0);
__decorate([
    property()
], RadioButton.prototype, "wrappingType", void 0);
__decorate([
    property()
], RadioButton.prototype, "accessibleName", void 0);
__decorate([
    property()
], RadioButton.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Number })
], RadioButton.prototype, "_tabIndex", void 0);
__decorate([
    property({ type: Boolean })
], RadioButton.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], RadioButton.prototype, "_groupChecked", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], RadioButton.prototype, "_groupRequired", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], RadioButton, "i18nBundle", void 0);
RadioButton = RadioButton_1 = __decorate([
    customElement({
        tag: "ui5-radio-button",
        languageAware: true,
        formAssociated: true,
        renderer: jsxRenderer,
        template: RadioButtonTemplate,
        styles: radioButtonCss,
    })
    /**
     * Fired when the component checked state changes.
     * @public
     * @since 1.0.0-rc.15
     */
    ,
    event("change", {
        bubbles: true,
    })
], RadioButton);
RadioButton.define();
export default RadioButton;
//# sourceMappingURL=RadioButton.js.map