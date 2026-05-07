var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CheckBox_1;
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { VALUE_STATE_ERROR, VALUE_STATE_WARNING, VALUE_STATE_SUCCESS, FORM_CHECKABLE_REQUIRED, CHECKBOX_CHECKED, CHECKBOX_NOT_CHECKED, CHECKBOX_ARIA_TYPE, } from "./generated/i18n/i18n-defaults.js";
// Styles
import checkboxCss from "./generated/themes/CheckBox.css.js";
// Template
import CheckBoxTemplate from "./CheckBoxTemplate.js";
let isGlobalHandlerAttached = false;
let activeCb;
/**
 * @class
 *
 * ### Overview
 *
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 *
 * The `ui5-checkbox` component consists of a box and a label that describes its purpose.
 * If it's checked, an indicator is displayed inside the box.
 * To check/uncheck the `ui5-checkbox`, the user has to click or tap the square
 * box or its label.
 *
 * The `ui5-checkbox` component only has 2 states - checked and unchecked.
 * Clicking or tapping toggles the `ui5-checkbox` between checked and unchecked state.
 *
 * ### Usage
 *
 * You can define the checkbox text with via the `text` property. If the text exceeds the available width, it is truncated by default.
 * In case you prefer text to truncate, set the `wrappingType` property to "None".
 * The touchable area for toggling the `ui5-checkbox` ends where the text ends.
 *
 * You can disable the `ui5-checkbox` by setting the `disabled` property to
 * `true`,
 * or use the `ui5-checkbox` in read-only mode by setting the `readonly`
 * property to `true`.
 *
 * ### Keyboard Handling
 *
 * The user can use the following keyboard shortcuts to toggle the checked state of the `ui5-checkbox`.
 *
 * - [Space],[Enter] - Toggles between different states: checked, not checked.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CheckBox.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart root - Used to style the outermost wrapper of the `ui5-checkbox`
 * @csspart label - Used to style the label of the `ui5-checkbox`
 * @csspart icon - Used to style the icon of the `ui5-checkbox`
 */
let CheckBox = CheckBox_1 = class CheckBox extends UI5Element {
    get formValidityMessage() {
        return CheckBox_1.i18nBundle.getText(FORM_CHECKABLE_REQUIRED);
    }
    get formValidity() {
        return { valueMissing: this.required && !this.checked };
    }
    async formElementAnchor() {
        return this.getFocusDomRefAsync();
    }
    get formFormattedValue() {
        return this.checked ? this.value : null;
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
         * **Note:** A read-only component is not editable,
         * but still provides visual feedback upon user interaction.
         * @default false
         * @public
         */
        this.readonly = false;
        /**
         * Determines whether the `ui5-checkbox` is in display only state.
         *
         * When set to `true`, the `ui5-checkbox` is not interactive, not editable, not focusable
         * and not in the tab chain. This setting is used for forms in review mode.
         *
         * **Note:** When the property `disabled` is set to `true` this property has no effect.
         * @since 1.22.0
         * @public
         * @default false
         */
        this.displayOnly = false;
        /**
         * Defines whether the component is required.
         *
         * **Note:** We advise against using the text property of the checkbox when there is a
         * label associated with it to avoid having two required asterisks.
         * @default false
         * @public
         * @since 1.3.0
         */
        this.required = false;
        /**
        * Defines whether the component is displayed as partially checked.
        *
        * **Note:** The indeterminate state can be set only programmatically and can’t be achieved by user
        * interaction and the resulting visual state depends on the values of the `indeterminate`
        * and `checked` properties:
        *
        * -  If the component is checked and indeterminate, it will be displayed as partially checked
        * -  If the component is checked and it is not indeterminate, it will be displayed as checked
        * -  If the component is not checked, it will be displayed as not checked regardless value of the indeterminate attribute
        * @default false
        * @public
        * @since 1.0.0-rc.15
        */
        this.indeterminate = false;
        /**
         * Defines if the component is checked.
         *
         * **Note:** The property can be changed with user interaction,
         * either by cliking/tapping on the component, or by
         * pressing the Enter or Space key.
         * @default false
         * @formEvents change
         * @formProperty
         * @public
         */
        this.checked = false;
        /**
         * Defines the value state of the component.
         * @default "None"
         * @public
         */
        this.valueState = "None";
        /**
         * Defines whether the component text wraps when there is not enough space.
         *
         * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
         * **Note:** for option "None" the text will be truncated with an ellipsis.
         * @default "Normal"
         * @public
         */
        this.wrappingType = "Normal";
        /**
         * Defines the form value of the component that is submitted when the checkbox is checked.
         *
         * When a form containing `ui5-checkbox` elements is submitted, only the values of the
         * **checked** checkboxes are included in the form data sent to the server. Unchecked
         * checkboxes do not contribute any data to the form submission.
         *
         * This property is particularly useful for **checkbox groups**, where multiple checkboxes with the same `name` but different `value` properties can be used to represent a set of related options.
         *
         * @default "on"
         * @public
         */
        this.value = "on";
        /**
         * Defines the active state (pressed or not) of the component.
         * @private
         */
        this.active = false;
        this._deactivate = () => {
            if (activeCb) {
                activeCb.active = false;
            }
        };
        if (!isGlobalHandlerAttached) {
            document.addEventListener("mouseup", this._deactivate);
            isGlobalHandlerAttached = true;
        }
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    _onclick() {
        this.toggle();
    }
    _onmousedown() {
        if (this.readonly || this.disabled) {
            return;
        }
        this.active = true;
        activeCb = this; // eslint-disable-line
    }
    _onmouseup() {
        this.active = false;
    }
    _onfocusout() {
        this.active = false;
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (this.readonly || this.disabled) {
            return;
        }
        if (isEnter(e)) {
            this.toggle();
        }
        this.active = true;
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this.toggle();
        }
        this.active = false;
    }
    toggle() {
        if (this.canToggle()) {
            const lastState = {
                checked: this.checked,
                indeterminate: this.indeterminate,
            };
            if (this.indeterminate) {
                this.indeterminate = false;
                this.checked = true;
            }
            else {
                this.checked = !this.checked;
            }
            const changePrevented = !this.fireDecoratorEvent("change");
            // Angular two way data binding
            const valueChangePrevented = !this.fireDecoratorEvent("value-changed");
            if (changePrevented || valueChangePrevented) {
                this.checked = lastState.checked;
                this.indeterminate = lastState.indeterminate;
            }
        }
        return this;
    }
    canToggle() {
        return !(this.disabled || this.readonly || this.displayOnly);
    }
    valueStateTextMappings() {
        return {
            "Negative": CheckBox_1.i18nBundle.getText(VALUE_STATE_ERROR),
            "Critical": CheckBox_1.i18nBundle.getText(VALUE_STATE_WARNING),
            "Positive": CheckBox_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
        };
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this);
    }
    get classes() {
        return {
            main: {
                "ui5-checkbox--hoverable": !this.disabled && !this.readonly && isDesktop(),
            },
        };
    }
    get ariaReadonly() {
        return this.readonly || this.displayOnly ? "true" : undefined;
    }
    get effectiveAriaDisabled() {
        return this.disabled ? "true" : undefined;
    }
    get effectiveAriaChecked() {
        return this.indeterminate && this.checked ? "mixed" : this.checked;
    }
    get ariaLabelledBy() {
        if (!this.ariaLabelText) {
            return this.text ? `${this._id}-label` : undefined;
        }
        return undefined;
    }
    get ariaDescribedBy() {
        return this.hasValueState ? `${this._id}-descr` : undefined;
    }
    get hasValueState() {
        return this.valueState !== ValueState.None;
    }
    get valueStateText() {
        if (this.valueState !== ValueState.None && this.valueState !== ValueState.Information) {
            return this.valueStateTextMappings()[this.valueState];
        }
    }
    get effectiveTabIndex() {
        const tabindex = this.getAttribute("tabindex");
        if (this.tabbable) {
            return tabindex ? parseInt(tabindex) : 0;
        }
    }
    get tabbable() {
        return !this.disabled && !this.displayOnly;
    }
    get isCompletelyChecked() {
        return this.checked && !this.indeterminate;
    }
    get isDisplayOnly() {
        return this.displayOnly && !this.disabled;
    }
    get accessibilityInfo() {
        const checkboxState = this.checked ? CheckBox_1.i18nBundle.getText(CHECKBOX_CHECKED) : CheckBox_1.i18nBundle.getText(CHECKBOX_NOT_CHECKED);
        const description = [this.text || "", checkboxState].filter(Boolean).join(" ");
        return {
            role: this.accInfo.role,
            type: CheckBox_1.i18nBundle.getText(CHECKBOX_ARIA_TYPE),
            description,
            label: this.ariaLabelText,
            disabled: !!this.accInfo.ariaDisabled,
            readonly: !!this.accInfo.ariaReadonly,
            required: this.accInfo.ariaRequired,
        };
    }
    get accInfo() {
        return {
            "role": this._accInfo ? this._accInfo.role : "checkbox",
            "ariaChecked": this._accInfo ? this._accInfo.ariaChecked : this.effectiveAriaChecked,
            "ariaReadonly": this._accInfo ? this._accInfo.ariaReadonly : this.ariaReadonly,
            "ariaDisabled": this._accInfo ? this._accInfo.ariaDisabled : this.effectiveAriaDisabled,
            "ariaRequired": this._accInfo ? this._accInfo.ariaRequired : this.required,
            "tabindex": this._accInfo ? this._accInfo.tabindex : this.effectiveTabIndex,
        };
    }
};
__decorate([
    property()
], CheckBox.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], CheckBox.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "displayOnly", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "indeterminate", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "checked", void 0);
__decorate([
    property()
], CheckBox.prototype, "text", void 0);
__decorate([
    property()
], CheckBox.prototype, "valueState", void 0);
__decorate([
    property()
], CheckBox.prototype, "wrappingType", void 0);
__decorate([
    property()
], CheckBox.prototype, "name", void 0);
__decorate([
    property()
], CheckBox.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], CheckBox.prototype, "active", void 0);
__decorate([
    property({ type: Object })
], CheckBox.prototype, "_accInfo", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], CheckBox, "i18nBundle", void 0);
CheckBox = CheckBox_1 = __decorate([
    customElement({
        tag: "ui5-checkbox",
        languageAware: true,
        formAssociated: true,
        renderer: jsxRenderer,
        template: CheckBoxTemplate,
        styles: checkboxCss,
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
], CheckBox);
CheckBox.define();
export default CheckBox;
//# sourceMappingURL=CheckBox.js.map