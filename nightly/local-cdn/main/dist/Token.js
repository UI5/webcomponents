var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Token_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isBackSpace, isSpace, isDelete, isSpaceCtrl, } from "@ui5/webcomponents-base/dist/Keys.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { TOKEN_ARIA_DELETABLE, TOKEN_ARIA_LABEL, TOKEN_ARIA_REMOVE } from "./generated/i18n/i18n-defaults.js";
import TokenTemplate from "./TokenTemplate.js";
// Styles
import tokenStyles from "./generated/themes/Token.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * Tokens are small items of information (similar to tags) that mainly serve to visualize previously selected items.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Token.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.9
 * @implements {IToken}
 * @public
 */
let Token = Token_1 = class Token extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the component is selected or not.
         * @default false
         * @public
         */
        this.selected = false;
        /**
         * Defines whether the component is read-only.
         *
         * **Note:** A read-only component can not be deleted or selected,
         * but still provides visual feedback upon user interaction.
         * @default false
         * @private
         */
        this.readonly = false;
        /**
         * Set by the tokenizer when a token is in the "more" area (overflowing)
         * @default false
         * @private
         */
        this.overflows = false;
        this.singleToken = false;
        /**
         * Defines whether the component is focused or not.
         * @default false
         * @private
         */
        this.focused = false;
        /**
         * Defines whether the token is being deleted
         * This flag is used in the ui5-multi-combobox
         * @default false
         * @private
         */
        this.toBeDeleted = false;
        /**
         * Defines the tabIndex of the component.
         * @private
         */
        this.forcedTabIndex = "-1";
        // fireMyEvent(name: keyof this["_events"]) {
        // 	console.log(name);
        // }
    }
    _handleSelect() {
        if (!this.toBeDeleted) {
            this.selected = !this.selected;
            this.fireDecoratorEvent("select");
        }
    }
    _focusin() {
        this.focused = true;
    }
    _focusout() {
        this.focused = !this.focused;
    }
    _delete() {
        this.toBeDeleted = true;
        this.fireDecoratorEvent("delete");
    }
    _onmousedown(e) {
        const target = e.currentTarget;
        if (target === this.shadowRoot?.querySelector("[ui5-icon]")) {
            this.toBeDeleted = true;
        }
    }
    _keydown(e) {
        const isBackSpacePressed = isBackSpace(e);
        const isDeletePressed = isDelete(e);
        if (!this.readonly && (isBackSpacePressed || isDeletePressed)) {
            e.preventDefault();
            this.fireDecoratorEvent("delete", {
                backSpace: isBackSpacePressed,
                "delete": isDeletePressed,
            });
        }
        if (isSpace(e) || isSpaceCtrl(e)) {
            e.preventDefault();
            this._handleSelect();
        }
    }
    get tokenDeletableText() {
        return Token_1.i18nBundle.getText(TOKEN_ARIA_REMOVE);
    }
    get textDom() {
        return this.getDomRef()?.querySelector(".ui5-token--text");
    }
    get isTruncatable() {
        if (!this.textDom) {
            return false;
        }
        return Math.ceil(this.textDom.getBoundingClientRect().width) < Math.ceil(this.textDom.scrollWidth);
    }
    get ariaDescription() {
        let description = Token_1.i18nBundle.getText(TOKEN_ARIA_LABEL);
        if (!this.readonly) {
            description += ` ${Token_1.i18nBundle.getText(TOKEN_ARIA_DELETABLE)}`;
        }
        return description;
    }
};
__decorate([
    property()
], Token.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "overflows", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "singleToken", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean })
], Token.prototype, "toBeDeleted", void 0);
__decorate([
    property({ noAttribute: true })
], Token.prototype, "forcedTabIndex", void 0);
__decorate([
    slot()
], Token.prototype, "closeIcon", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Token, "i18nBundle", void 0);
Token = Token_1 = __decorate([
    customElement({
        tag: "ui5-token",
        languageAware: true,
        renderer: jsxRenderer,
        template: TokenTemplate,
        styles: tokenStyles,
    })
    /**
     * Fired when the the component is selected by user interaction with mouse or by clicking space.
     * @private
     */
    ,
    event("select", {
        bubbles: true,
    })
    /**
     * Fired when the backspace, delete or close icon of the token is pressed
     * @param {Boolean} backSpace Indicates whether token is deleted by backspace key.
     * @param {Boolean} delete Indicates whether token is deleted by delete key.
     * @private
     */
    ,
    event("delete", {
        bubbles: true,
    })
], Token);
Token.define();
export default Token;
//# sourceMappingURL=Token.js.map