var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PromptInput_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import { PROMPT_INPUT_CHARACTERS_LEFT, PROMPT_INPUT_CHARACTERS_EXCEEDED, } from "./generated/i18n/i18n-defaults.js";
import PromptInputTemplate from "./PromptInputTemplate.js";
// Styles
import PromptInputCss from "./generated/themes/PromptInput.css.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-ai-prompt-input` component allows the user to write custom instructions in natural language, so that AI is guided to generate content tailored to user needs.
 *
 * **Note:** The web component is in an experimental state
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/PromptInput.js"`
 * @class
 * @constructor
 * @public
 * @extends UI5Element
 * @experimental The **@ui5/webcomponents-ai** package is under development and considered experimental - components' APIs are subject to change.
 * Furthermore, the package supports **Horizon** themes only.
 */
let PromptInput = PromptInput_1 = class PromptInput extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the value of the component.
         *
         * @default ""
         * @since 2.0.0
         * @public
         */
        this.value = "";
        /**
         * Defines whether the clear icon of the input will be shown.
         * @default false
         * @public
         * @since 2.0.0
         */
        this.showClearIcon = false;
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
         * @since 2.0.0
         */
        this.showExceededText = false;
        /**
         * Defines whether the component is in disabled state.
         *
         * **Note:** A disabled component is completely noninteractive.
         * @default false
         * @public
         * @since 2.0.0
         */
        this.disabled = false;
        /**
         * Defines whether the component is read-only.
         *
         * **Note:** A read-only component is not editable,
         * but still provides visual feedback upon user interaction.
         * @default false
         * @public
         * @since 2.0.0
         */
        this.readonly = false;
        /**
         * Defines the value state of the component.
         * @default "None"
         * @since 2.0.0
         * @public
         */
        this.valueState = "None";
        /**
         * Defines whether the component should show suggestions, if such are present.
         *
         * @default false
         * @public
         */
        this.showSuggestions = false;
    }
    _onkeydown(e) {
        if (isEnter(e)) {
            this.fireDecoratorEvent("submit");
        }
    }
    _onInnerInput(e) {
        this.value = e.currentTarget.value;
        this.fireDecoratorEvent("input");
    }
    _onInnerChange() {
        this.fireDecoratorEvent("change");
    }
    _onButtonClick() {
        this.fireDecoratorEvent("submit");
    }
    _onTypeAhead(e) {
        this.value = e.currentTarget.value;
    }
    get _exceededText() {
        if (this.showExceededText) {
            let leftCharactersCount;
            const maxLength = this.maxlength;
            if (maxLength !== undefined) {
                leftCharactersCount = maxLength - this.value.length;
                if (leftCharactersCount >= 0) {
                    return PromptInput_1.i18nBundle.getText(PROMPT_INPUT_CHARACTERS_LEFT, leftCharactersCount);
                }
                return PromptInput_1.i18nBundle.getText(PROMPT_INPUT_CHARACTERS_EXCEEDED, Math.abs(leftCharactersCount));
            }
        }
    }
    get _maxLenght() {
        return this.maxlength || undefined;
    }
    get _submitButtonDisabled() {
        return (this.value.length <= 0) || this.disabled || this.readonly;
    }
};
__decorate([
    property()
], PromptInput.prototype, "value", void 0);
__decorate([
    property()
], PromptInput.prototype, "placeholder", void 0);
__decorate([
    property()
], PromptInput.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], PromptInput.prototype, "showClearIcon", void 0);
__decorate([
    property({ type: Boolean })
], PromptInput.prototype, "showExceededText", void 0);
__decorate([
    property({ type: Boolean })
], PromptInput.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], PromptInput.prototype, "readonly", void 0);
__decorate([
    property({ type: Number })
], PromptInput.prototype, "maxlength", void 0);
__decorate([
    property()
], PromptInput.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], PromptInput.prototype, "showSuggestions", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], PromptInput.prototype, "suggestionItems", void 0);
__decorate([
    slot({
        type: HTMLElement,
        invalidateOnChildChange: true,
    })
], PromptInput.prototype, "valueStateMessage", void 0);
__decorate([
    i18n("@ui5/webcomponents-ai")
], PromptInput, "i18nBundle", void 0);
PromptInput = PromptInput_1 = __decorate([
    customElement({
        tag: "ui5-ai-prompt-input",
        renderer: jsxRenderer,
        styles: PromptInputCss,
        template: PromptInputTemplate,
    })
    /**
     * Fired when the input operation has finished by pressing Enter
     * or AI button is clicked.
     *
     * @since 2.0.0
     * @public
     */
    ,
    event("submit", {
        bubbles: true,
    })
    /**
     * Fired when the value of the component changes at each keystroke,
     * and when a suggestion item has been selected.
     *
     * @since 2.0.0
     * @public
     */
    ,
    event("input", {
        bubbles: true,
    })
    /**
     * Fired when the input operation has finished by pressing Enter
     * or on focusout.
     *
     * @since 2.0.0
     * @public
     */
    ,
    event("change", {
        bubbles: true,
    })
], PromptInput);
PromptInput.define();
export default PromptInput;
//# sourceMappingURL=PromptInput.js.map