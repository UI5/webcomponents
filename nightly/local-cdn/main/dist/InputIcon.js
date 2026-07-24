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
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import InputIconTemplate from "./InputIconTemplate.js";
import inputIconCss from "./generated/themes/InputIcon.css.js";
import "./Icon.js";
/**
 * @class
 * ### Overview
 * The `ui5-input-icon` component represents an interactive icon that can be placed inside an `ui5-input` component.
 * Unlike the standard `ui5-icon`, this component provides button-like behavior with hover, focus, and active states,
 * matching the visual style of the input's built-in clear icon.
 *
 * ### Usage
 * Use `ui5-input-icon` for interactive icons that users can click (e.g., search, voice input, camera).
 * For decorative icons, use the standard `ui5-icon` component instead.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/InputIcon.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.25.0
 */
let InputIcon = class InputIcon extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the tooltip is shown.
         *
         * **Note:** The tooltip text should be provided via the `accessible-name` property.
         *
         * @default false
         * @public
         */
        this.showTooltip = false;
        /**
         * Defines the value state of the icon.
         *
         * **Note:** This property should match the parent input's value state for consistent styling.
         *
         * @default "None"
         * @public
         */
        this.valueState = "None";
        /**
         * Defines whether the icon is disabled.
         *
         * **Note:** Disabled icons are not interactive and do not fire click events.
         *
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines whether the icon is readonly.
         *
         * **Note:** Readonly icons are not interactive and do not fire click events.
         *
         * @default false
         * @public
         */
        this.readonly = false;
        /**
         * @private
         */
        this._pressed = false;
        /**
         * @private
         */
        this._focused = false;
        /**
         * @private
         */
        this._parentDisabled = false;
    }
    _onclick(e) {
        if (this.disabled || this.readonly || this._parentDisabled) {
            e.stopImmediatePropagation();
            e.preventDefault();
            return;
        }
        e.stopImmediatePropagation();
        this.fireDecoratorEvent("click");
    }
    _onmousedown() {
        if (!this.disabled && !this.readonly && !this._parentDisabled) {
            this._pressed = true;
        }
    }
    _onmouseup() {
        this._pressed = false;
    }
    _onmouseleave() {
        this._pressed = false;
    }
    _onfocus() {
        this._focused = true;
    }
    _onblur() {
        this._focused = false;
        this._pressed = false;
    }
    _onkeydown(e) {
        if (this.disabled || this.readonly || this._parentDisabled) {
            return;
        }
        if (isEnter(e) || isSpace(e)) {
            this._pressed = true;
            e.preventDefault(); // Prevent scrolling on Space
        }
    }
    _onkeyup(e) {
        if (this.disabled || this.readonly || this._parentDisabled) {
            return;
        }
        if (isEnter(e) || isSpace(e)) {
            this._pressed = false;
            this.fireDecoratorEvent("click");
        }
    }
    get effectiveTabIndex() {
        return (this.disabled || this.readonly || this._parentDisabled) ? -1 : 0;
    }
    get effectiveAriaLabel() {
        return this.accessibleName || undefined;
    }
    get effectiveTitle() {
        return this.showTooltip && this.accessibleName ? this.accessibleName : undefined;
    }
};
__decorate([
    property()
], InputIcon.prototype, "name", void 0);
__decorate([
    property()
], InputIcon.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Boolean })
], InputIcon.prototype, "showTooltip", void 0);
__decorate([
    property()
], InputIcon.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], InputIcon.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], InputIcon.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], InputIcon.prototype, "_pressed", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], InputIcon.prototype, "_focused", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], InputIcon.prototype, "_parentDisabled", void 0);
InputIcon = __decorate([
    customElement({
        tag: "ui5-input-icon",
        renderer: jsxRenderer,
        template: InputIconTemplate,
        styles: inputIconCss,
        languageAware: false,
        themeAware: true,
    })
    /**
     * Fired when the `ui5-input-icon` is activated either with a click/tap or by using the Enter or Space key.
     * @public
     */
    ,
    event("click", {
        bubbles: true,
    })
], InputIcon);
InputIcon.define();
export default InputIcon;
//# sourceMappingURL=InputIcon.js.map