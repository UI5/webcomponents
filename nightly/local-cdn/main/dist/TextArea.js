var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TextArea_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts, getEffectiveAriaDescriptionText, } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isEscape } from "@ui5/webcomponents-base/dist/Keys.js";
import TextAreaTemplate from "./TextAreaTemplate.js";
import { VALUE_STATE_SUCCESS, VALUE_STATE_INFORMATION, VALUE_STATE_ERROR, VALUE_STATE_WARNING, VALUE_STATE_TYPE_SUCCESS, VALUE_STATE_TYPE_INFORMATION, VALUE_STATE_TYPE_ERROR, VALUE_STATE_TYPE_WARNING, TEXTAREA_CHARACTERS_LEFT, TEXTAREA_CHARACTERS_EXCEEDED, FORM_TEXTFIELD_REQUIRED, TEXTAREA_EXCEEDS_MAXLENGTH, } from "./generated/i18n/i18n-defaults.js";
// Styles
import textareaStyles from "./generated/themes/TextArea.css.js";
import valueStateMessageStyles from "./generated/themes/ValueStateMessage.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-textarea` component is used to enter multiple rows of text.
 *
 * When empty, it can hold a placeholder similar to a `ui5-input`.
 * You can define the rows of the `ui5-textarea` and also determine specific behavior when handling long texts.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TextArea.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart textarea - Used to style the native textarea
 */
let TextArea = TextArea_1 = class TextArea extends UI5Element {
    get formValidityMessage() {
        if (this.formValidity.valueMissing) {
            return TextArea_1.i18nBundle.getText(FORM_TEXTFIELD_REQUIRED);
        }
        if (this.formValidity.tooLong) {
            return TextArea_1.i18nBundle.getText(TEXTAREA_EXCEEDS_MAXLENGTH, this.value.length - (this.maxlength ?? 0));
        }
    }
    get formValidity() {
        return {
            valueMissing: this.required && !this.value,
            tooLong: this.showExceededText && (this.value.length > (this.maxlength ?? 0)),
        };
    }
    async formElementAnchor() {
        return this.getFocusDomRefAsync();
    }
    get formFormattedValue() {
        return this.value;
    }
    constructor() {
        super();
        /**
         * Defines the value of the component.
         * @formEvents change input
         * @formProperty
         * @default ""
         * @public
         */
        this.value = "";
        /**
         * Indicates whether the user can interact with the component or not.
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
         * Defines whether the component is required.
         * @default false
         * @public
         * @since 1.0.0-rc.3
         */
        this.required = false;
        /**
         * Defines the value state of the component.
         *
         * **Note:** If `maxlength` property is set,
         * the component turns into "Critical" state once the characters exceeds the limit.
         * In this case, only the "Negative" state is considered and can be applied.
         * @default "None"
         * @since 1.0.0-rc.7
         * @public
         */
        this.valueState = "None";
        /**
         * Defines the number of visible text rows for the component.
         *
         * **Notes:**
         *
         * - If the `growing` property is enabled, this property defines the minimum rows to be displayed
         * in the textarea.
         * - The CSS `height` property wins over the `rows` property, if both are set.
         * @default 0
         * @public
         */
        this.rows = 0;
        /**
         * Determines whether the characters exceeding the maximum allowed character count are visible
         * in the component.
         *
         * If set to `false`, the user is not allowed to enter more characters than what is set in the
         * `maxlength` property.
         * If set to `true` the characters exceeding the `maxlength` value are selected on
         * paste and the counter below the component displays their number.
         * @default false
         * @public
         */
        this.showExceededText = false;
        /**
         * Enables the component to automatically grow and shrink dynamically with its content.
         * @default false
         * @public
         */
        this.growing = false;
        /**
         * Defines the maximum number of rows that the component can grow.
         * @default 0
         * @public
         */
        this.growingMaxRows = 0;
        /**
         * @private
         */
        this.focused = false;
        /**
         * @private
         */
        this.exceeding = false;
        /**
         * @private
         */
        this._mirrorText = [];
        this._firstRendering = true;
        this._openValueStateMsgPopover = false;
        this._fnOnResize = this._onResize.bind(this);
        this.previousValue = "";
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._fnOnResize);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._fnOnResize);
    }
    onBeforeRendering() {
        if (!this.value) {
            // fallback to default value
            this.value = "";
        }
        this._exceededTextProps = this._calcExceededText();
        this._mirrorText = this._tokenizeText(this.value);
        this.exceeding = !!this._exceededTextProps.leftCharactersCount && this._exceededTextProps.leftCharactersCount < 0;
        this._setCSSParams();
    }
    onAfterRendering() {
        const nativeTextArea = this.getInputDomRef();
        if (this.rows === 1) {
            nativeTextArea.setAttribute("rows", "1");
        }
        else {
            nativeTextArea.removeAttribute("rows");
        }
        this.toggleValueStateMessage(this.openValueStateMsgPopover);
        this._firstRendering = false;
    }
    getInputDomRef() {
        return this.getDomRef().querySelector("textarea");
    }
    _onkeydown(e) {
        this._keyDown = true;
        if (isEscape(e)) {
            const nativeTextArea = this.getInputDomRef();
            const prevented = !this.fireDecoratorEvent("input", {
                escapePressed: true,
            });
            if (!prevented) {
                this.value = this.previousValue;
                nativeTextArea.value = this.value;
            }
        }
    }
    _onkeyup() {
        this._keyDown = false;
    }
    _onfocusin() {
        this.focused = true;
        this._openValueStateMsgPopover = true;
        this.previousValue = this.getInputDomRef().value;
    }
    _onfocusout(e) {
        const eTarget = e.relatedTarget;
        const focusedOutToValueStateMessage = eTarget && this.contains(eTarget);
        this.focused = false;
        if (!focusedOutToValueStateMessage) {
            this._openValueStateMsgPopover = false;
        }
    }
    _onchange() {
        this.fireDecoratorEvent("change");
    }
    _onselect() {
        this.fireDecoratorEvent("select");
    }
    _onscroll() {
        this.fireDecoratorEvent("scroll");
    }
    _oninput(e) {
        const nativeTextArea = this.getInputDomRef();
        if (e.target === nativeTextArea) {
            // stop the native event, as the semantic "input" would be fired.
            e.stopImmediatePropagation();
        }
        this.value = nativeTextArea.value;
        const valueLength = this.value.length;
        if (e.inputType === "insertFromPaste" && this.maxlength && valueLength > this.maxlength) {
            nativeTextArea.setSelectionRange(this.maxlength, valueLength);
        }
        this.fireDecoratorEvent("input");
        // Angular two way data binding
        this.fireDecoratorEvent("value-changed");
    }
    _onResize() {
        if (this.displayValueStateMessagePopover) {
            this._width = this.offsetWidth;
        }
    }
    _setCSSParams() {
        this.style.setProperty("--_textarea_rows", this.rows ? String(this.rows) : "2");
        this.style.setProperty("--_textarea_growing_max_rows", String(this.growingMaxRows));
    }
    toggleValueStateMessage(toggle) {
        if (toggle) {
            this.openPopover();
        }
        else {
            this.closePopover();
        }
    }
    openPopover() {
        this.valueStatePopover = this._getPopover();
        if (this.valueStatePopover) {
            this.valueStatePopover.opener = this.shadowRoot.querySelector(".ui5-textarea-root .ui5-textarea-wrapper");
            this.valueStatePopover.open = true;
        }
    }
    closePopover() {
        this.valueStatePopover = this._getPopover();
        if (this.valueStatePopover) {
            this.valueStatePopover.open = false;
        }
    }
    _getPopover() {
        return this.shadowRoot.querySelector("[ui5-popover]");
    }
    _tokenizeText(value) {
        const tokenizedText = value.replace(/</gm, "<")
            .replace(/>/gm, ">")
            .split("\n");
        return this._mapTokenizedTextToObject(tokenizedText);
    }
    _mapTokenizedTextToObject(tokenizedText) {
        return tokenizedText.map((token, index) => {
            return {
                text: token,
                last: index === (tokenizedText.length - 1),
            };
        });
    }
    _calcExceededText() {
        let calcedMaxLength, exceededText, leftCharactersCount;
        if (this.showExceededText) {
            const maxLength = this.maxlength;
            if (maxLength !== null && maxLength !== undefined) {
                leftCharactersCount = maxLength - this.value.length;
                if (leftCharactersCount >= 0) {
                    exceededText = TextArea_1.i18nBundle.getText(TEXTAREA_CHARACTERS_LEFT, leftCharactersCount);
                }
                else {
                    exceededText = TextArea_1.i18nBundle.getText(TEXTAREA_CHARACTERS_EXCEEDED, Math.abs(leftCharactersCount));
                }
            }
        }
        else {
            calcedMaxLength = this.maxlength;
        }
        return {
            exceededText, leftCharactersCount, calcedMaxLength,
        };
    }
    get classes() {
        return {
            root: {
                "ui5-textarea-root": true,
            },
            valueStateMsg: {
                "ui5-valuestatemessage-header": true,
                "ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
                "ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
                "ui5-valuestatemessage--information": this.valueState === ValueState.Information,
            },
        };
    }
    get tabIndex() {
        return this.disabled ? -1 : 0;
    }
    get ariaLabelText() {
        const effectiveAriaLabelText = getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this);
        if (this.showExceededText) {
            if (effectiveAriaLabelText) {
                return effectiveAriaLabelText.concat(" ", this._exceededTextProps.exceededText);
            }
            return this._exceededTextProps.exceededText;
        }
        return effectiveAriaLabelText;
    }
    get ariaDescriptionText() {
        return getEffectiveAriaDescriptionText(this);
    }
    get ariaDescriptionTextId() {
        return this.ariaDescriptionText ? "accessibleDescription" : "";
    }
    get ariaDescribedBy() {
        const ids = [
            this.hasValueState ? `${this._id}-valueStateDesc` : "",
            this.ariaDescriptionTextId,
        ].filter(Boolean).join(" ");
        return ids || undefined;
    }
    get ariaValueStateHiddenText() {
        if (!this.hasValueState) {
            return;
        }
        if (this.valueState === ValueState.None) {
            return;
        }
        if (this.hasCustomValueState) {
            return `${this.valueStateTypeMappings[this.valueState]}`.concat(" ", this.valueStateMessage.map(el => el.textContent).join(" "));
        }
        return `${this.valueStateTypeMappings[this.valueState]} ${this.valueStateDefaultText}`;
    }
    get valueStateDefaultText() {
        if (this.valueState !== ValueState.None) {
            return this.valueStateTextMappings[this.valueState];
        }
        return "";
    }
    get _ariaInvalid() {
        return this.valueState === ValueState.Negative ? "true" : undefined;
    }
    get openValueStateMsgPopover() {
        return !this._firstRendering && this._openValueStateMsgPopover && this.displayValueStateMessagePopover;
    }
    get displayValueStateMessagePopover() {
        return !this.readonly && (this.hasCustomValueState || this.hasValueState);
    }
    get hasCustomValueState() {
        return !!this.valueStateMessage.length && this.hasValueState;
    }
    get hasValueState() {
        return this.valueState === ValueState.Negative || this.valueState === ValueState.Critical || this.valueState === ValueState.Information;
    }
    get valueStateTextMappings() {
        return {
            "Positive": TextArea_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            "Information": TextArea_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
            "Negative": TextArea_1.i18nBundle.getText(VALUE_STATE_ERROR),
            "Critical": TextArea_1.i18nBundle.getText(VALUE_STATE_WARNING),
        };
    }
    get valueStateTypeMappings() {
        return {
            "Positive": TextArea_1.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
            "Information": TextArea_1.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
            "Negative": TextArea_1.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
            "Critical": TextArea_1.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
        };
    }
};
__decorate([
    property()
], TextArea.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], TextArea.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], TextArea.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], TextArea.prototype, "required", void 0);
__decorate([
    property()
], TextArea.prototype, "placeholder", void 0);
__decorate([
    property()
], TextArea.prototype, "valueState", void 0);
__decorate([
    property({ type: Number })
], TextArea.prototype, "rows", void 0);
__decorate([
    property({ type: Number })
], TextArea.prototype, "maxlength", void 0);
__decorate([
    property({ type: Boolean })
], TextArea.prototype, "showExceededText", void 0);
__decorate([
    property({ type: Boolean })
], TextArea.prototype, "growing", void 0);
__decorate([
    property({ type: Number })
], TextArea.prototype, "growingMaxRows", void 0);
__decorate([
    property()
], TextArea.prototype, "name", void 0);
__decorate([
    property()
], TextArea.prototype, "accessibleName", void 0);
__decorate([
    property()
], TextArea.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], TextArea.prototype, "accessibleDescription", void 0);
__decorate([
    property()
], TextArea.prototype, "accessibleDescriptionRef", void 0);
__decorate([
    property({ type: Boolean })
], TextArea.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean })
], TextArea.prototype, "exceeding", void 0);
__decorate([
    property({ type: Array })
], TextArea.prototype, "_mirrorText", void 0);
__decorate([
    property({ noAttribute: true })
], TextArea.prototype, "_maxHeight", void 0);
__decorate([
    property({ type: Number })
], TextArea.prototype, "_width", void 0);
__decorate([
    slot()
], TextArea.prototype, "valueStateMessage", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], TextArea, "i18nBundle", void 0);
TextArea = TextArea_1 = __decorate([
    customElement({
        tag: "ui5-textarea",
        formAssociated: true,
        languageAware: true,
        styles: [
            textareaStyles,
            valueStateMessageStyles,
        ],
        renderer: jsxRenderer,
        template: TextAreaTemplate,
    })
    /**
     * Fired when the text has changed and the focus leaves the component.
     * @public
     */
    ,
    event("change", {
        bubbles: true,
    })
    /**
     * Fired to make Angular two way data binding work properly.
     * @private
     */
    ,
    event("value-changed", {
        bubbles: true,
    })
    /**
     * Fired when the value of the component changes at each keystroke or when
     * something is pasted.
     * @since 1.0.0-rc.5
     * @param {boolean} escapePressed Indicates whether the Escape key was pressed, which triggers a revert to the previous value
     * @public
     */
    ,
    event("input", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired when some text has been selected.
     *
     * @since 1.23.0
     * @public
     */
    ,
    event("select", {
        bubbles: true,
    })
    /**
     * Fired when textarea is scrolled.
     *
     * @since 1.23.0
     * @public
     */
    ,
    event("scroll", {
        bubbles: true,
    })
], TextArea);
TextArea.define();
export default TextArea;
export { TextArea as BaseTextArea };
//# sourceMappingURL=TextArea.js.map