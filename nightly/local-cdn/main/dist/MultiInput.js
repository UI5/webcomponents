var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MultiInput_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isShow, isBackSpace, isLeft, isRight, isRightCtrl, isHome, isEnd, isDown, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { MULTIINPUT_ROLEDESCRIPTION_TEXT, MULTIINPUT_VALUE_HELP_LABEL, MULTIINPUT_VALUE_HELP } from "./generated/i18n/i18n-defaults.js";
import Input from "./Input.js";
import MultiInputTemplate from "./MultiInputTemplate.js";
import styles from "./generated/themes/MultiInput.css.js";
import { getTokensCountText } from "./Tokenizer.js";
/**
 * @class
 * ### Overview
 * A `ui5-multi-input` field allows the user to enter multiple values, which are displayed as `ui5-token`.
 *
 * User can choose interaction for creating tokens.
 * Fiori Guidelines say that user should create tokens when:
 *
 * - Type a value in the input and press enter or focus out the input field (`change` event is fired)
 * - Move between suggestion items (`selection-change` event is fired)
 * - Clicking on a suggestion item (`selection-change` event is fired if the clicked item is different than the current value. Also `change` event is fired )
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MultiInput.js";`
 * @constructor
 * @extends Input
 * @since 1.0.0-rc.9
 * @public
 */
let MultiInput = MultiInput_1 = class MultiInput extends Input {
    get formValidity() {
        const tokens = (this.tokens || []);
        return { valueMissing: this.required && !this.value && !tokens.length };
    }
    get formFormattedValue() {
        const tokens = (this.tokens || []);
        if (tokens.length && this.name) {
            const formData = new FormData();
            formData.append(this.name, this.value);
            for (let i = 0; i < tokens.length; i++) {
                formData.append(this.name, (tokens[i].text || ""));
            }
            return formData;
        }
        return this.value;
    }
    constructor() {
        super();
        /**
         * Determines whether a value help icon will be visualized in the end of the input.
         * Pressing the icon will fire `value-help-trigger` event.
         * @default false
         * @public
         */
        this.showValueHelpIcon = false;
        /**
         * Indicates whether the tokenizer has tokens
         * @default false
         * @private
         */
        this.tokenizerAvailable = false;
        // Prevent suggestions' opening.
        this._skipOpenSuggestions = false;
        this._valueHelpIconPressed = false;
    }
    valueHelpPress() {
        this.closeValueStatePopover();
        this.fireDecoratorEvent("value-help-trigger");
    }
    tokenDelete(e) {
        const deletedTokens = e.detail.tokens;
        const selectedTokens = this.tokens.filter(token => token.selected);
        const shouldFocusInput = this.tokens.length - 1 === 0 || this.tokens.length === selectedTokens.length;
        if (this._readonly) {
            return;
        }
        if (deletedTokens) {
            this.fireDecoratorEvent("token-delete", { tokens: deletedTokens });
            if (shouldFocusInput) {
                this.focus();
            }
        }
    }
    valueHelpMouseDown(e) {
        const target = e.target;
        this.closeValueStatePopover();
        this.tokenizer.open = false;
        this._valueHelpIconPressed = true;
        target.focus();
    }
    _tokenizerFocusOut(e) {
        if (!this.contains(e.relatedTarget) && !this.shadowRoot.contains(e.relatedTarget)) {
            this.tokenizer._tokens.forEach(token => { token.selected = false; });
        }
    }
    valueHelpMouseUp() {
        setTimeout(() => {
            this._valueHelpIconPressed = false;
        }, 0);
    }
    innerFocusIn() {
        this.tokenizer._scrollToEndOnExpand = true;
        this.tokenizer.expanded = true;
        this.focused = true;
        this.tokens.forEach(token => {
            token.selected = false;
        });
    }
    _showMoreItemsPress() {
        this.tokenizer._scrollToEndOnExpand = true;
    }
    _onkeydown(e) {
        !this._isComposing && super._onkeydown(e);
        const target = e.target;
        const isHomeInBeginning = isHome(e) && target.selectionStart === 0;
        if (isHomeInBeginning) {
            this._skipOpenSuggestions = true; // Prevent input focus when navigating through the tokens
            return this._focusFirstToken(e);
        }
        if (isEnter(e)) {
            e.preventDefault();
        }
        if (isLeft(e)) {
            this._skipOpenSuggestions = true;
            return this._handleLeft(e);
        }
        if (isBackSpace(e)) {
            this._skipOpenSuggestions = true;
            return this._handleBackspace(e);
        }
        this._skipOpenSuggestions = false;
        if (isShow(e)) {
            this.valueHelpPress();
        }
    }
    _onTokenizerKeydown(e) {
        const rightCtrl = isRightCtrl(e);
        if (isRight(e) || isDown(e) || isEnd(e) || rightCtrl) {
            e.preventDefault();
            const lastTokenIndex = this.tokens.length - 1;
            if (e.target === this.tokens[lastTokenIndex] && this.tokens[lastTokenIndex] === document.activeElement) {
                setTimeout(() => {
                    this.focus();
                }, 0);
            }
        }
    }
    _handleLeft(e) {
        const cursorPosition = this.getDomRef().querySelector(`input`).selectionStart;
        const tokens = this.tokens;
        const lastToken = tokens.length && tokens[tokens.length - 1];
        // selectionStart property applies only to inputs of types text, search, URL, tel, and password
        if (((cursorPosition === null && !this.value) || cursorPosition === 0) && lastToken) {
            e.preventDefault();
            lastToken.focus();
            this.tokenizer._itemNav.setCurrentItem(lastToken);
        }
    }
    _handleBackspace(e) {
        const cursorPosition = this.getDomRef().querySelector(`input`).selectionStart;
        const selectionEnd = this.getDomRef().querySelector(`input`).selectionEnd;
        const isValueSelected = cursorPosition === 0 && selectionEnd === this.value.length;
        const tokens = this.tokens;
        const lastToken = tokens.length && tokens[tokens.length - 1];
        // selectionStart property applies only to inputs of types text, search, URL, tel, and password
        if ((!this.value || (this.value && cursorPosition === 0 && !isValueSelected)) && lastToken) {
            e.preventDefault();
            lastToken.focus();
            this.tokenizer._itemNav.setCurrentItem(lastToken);
        }
    }
    _focusFirstToken(e) {
        const tokens = this.tokens;
        const firstToken = tokens.length && tokens[0];
        if (firstToken) {
            e.preventDefault();
            firstToken.focus();
            this.tokenizer._itemNav.setCurrentItem(firstToken);
        }
    }
    _onfocusout(e) {
        super._onfocusout(e);
        const relatedTarget = e.relatedTarget;
        const insideDOM = this.contains(relatedTarget);
        const insideShadowDom = this.shadowRoot.contains(relatedTarget);
        if (!insideDOM && !insideShadowDom) {
            this.tokenizer.expanded = false;
        }
        if (this.contains(relatedTarget) && relatedTarget.hasAttribute("ui5-token")) {
            this.focused = false;
        }
    }
    /**
     * @override
     */
    _onfocusin(e) {
        const inputDomRef = this.getInputDOMRef();
        if (e.target === inputDomRef) {
            super._onfocusin(e);
        }
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        this.style.setProperty(getScopedVarName("--_ui5-input-icons-count"), `${this.iconsCount}`);
        this.tokenizerAvailable = this.tokens && this.tokens.length > 0;
        if (this.tokenizer) {
            this.tokenizer.readonly = this.readonly;
        }
    }
    onAfterRendering() {
        super.onAfterRendering();
        this.tokenizer.preventInitialFocus = true;
    }
    get iconsCount() {
        return super.iconsCount + (this.showValueHelpIcon ? 1 : 0);
    }
    get tokenizer() {
        return this.shadowRoot.querySelector("[ui5-tokenizer]");
    }
    get tokenizerExpanded() {
        return this.tokenizer && this.tokenizer.expanded;
    }
    get _tokensCountText() {
        return getTokensCountText(this.tokens.length);
    }
    get _valueHelpText() {
        return MultiInput_1.i18nBundle.getText(MULTIINPUT_VALUE_HELP);
    }
    get _tokensCountTextId() {
        return `hiddenText-nMore`;
    }
    get _valueHelpTextId() {
        return this.showValueHelpIcon ? `hiddenText-value-help` : "";
    }
    /**
     * Returns the placeholder value when there are no tokens.
     * @protected
     */
    get _placeholder() {
        if (this.tokens.length) {
            return "";
        }
        return this.placeholder;
    }
    get accInfo() {
        const ariaDescribedBy = `${this._tokensCountTextId} ${this.suggestionsTextId} ${this.valueStateTextId} ${this._valueStateLinksShortcutsTextAccId} ${this._valueHelpTextId}`.trim();
        return {
            ...super.accInfo,
            "ariaRoledescription": this.ariaRoleDescription,
            "ariaDescribedBy": ariaDescribedBy,
        };
    }
    get valueHelpLabel() {
        return MultiInput_1.i18nBundle.getText(MULTIINPUT_VALUE_HELP_LABEL);
    }
    get ariaRoleDescription() {
        return MultiInput_1.i18nBundle.getText(MULTIINPUT_ROLEDESCRIPTION_TEXT);
    }
    get morePopoverOpener() {
        if (this.tokens.length === 1 && this.tokens[0].isTruncatable) {
            return this.tokens[0];
        }
        return this;
    }
    get shouldDisplayOnlyValueStateMessage() {
        return this.hasValueStateMessage && !this.readonly && !this.open && this.focused && !this.tokenizer.open;
    }
};
__decorate([
    property({ type: Boolean })
], MultiInput.prototype, "showValueHelpIcon", void 0);
__decorate([
    property({ type: Boolean })
], MultiInput.prototype, "tokenizerAvailable", void 0);
__decorate([
    property()
], MultiInput.prototype, "name", void 0);
__decorate([
    slot({ type: HTMLElement, individualSlots: true })
], MultiInput.prototype, "tokens", void 0);
MultiInput = MultiInput_1 = __decorate([
    customElement({
        tag: "ui5-multi-input",
        renderer: jsxRenderer,
        formAssociated: true,
        template: MultiInputTemplate,
        styles: [Input.styles, styles],
    })
    /**
     * Fired when the value help icon is pressed
     * and F4 or ALT/OPTION + ARROW_UP/ARROW_DOWN keyboard keys are used.
     * @public
     */
    ,
    event("value-help-trigger", {
        bubbles: true,
    })
    /**
     * Fired when tokens are being deleted.
     * @param {Array} tokens An array containing the deleted tokens.
     * @public
     */
    ,
    event("token-delete", {
        bubbles: true,
    })
], MultiInput);
MultiInput.define();
export default MultiInput;
//# sourceMappingURL=MultiInput.js.map