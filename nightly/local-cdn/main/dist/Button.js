var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Button_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter, isEscape, isShift, isSpaceShift, } from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { getIconAccessibleName } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { isDesktop, isSafari, } from "@ui5/webcomponents-base/dist/Device.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import { submitForm, resetForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import { getEnableDefaultTooltips } from "@ui5/webcomponents-base/dist/config/Tooltips.js";
import toLowercaseEnumValue from "@ui5/webcomponents-base/dist/util/toLowercaseEnumValue.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import ButtonBadgeDesign from "./types/ButtonBadgeDesign.js";
import ButtonAccessibleRole from "./types/ButtonAccessibleRole.js";
import ButtonTemplate from "./ButtonTemplate.js";
import { BUTTON_ARIA_TYPE_ACCEPT, BUTTON_ARIA_TYPE_REJECT, BUTTON_ARIA_TYPE_EMPHASIZED, BUTTON_ARIA_TYPE_ATTENTION, BUTTON_BADGE_ONE_ITEM, BUTTON_BADGE_MANY_ITEMS, BUTTON_ROLE_DESCRIPTION, LINK_ROLE_DESCRIPTION, } from "./generated/i18n/i18n-defaults.js";
// Styles
import buttonCss from "./generated/themes/Button.css.js";
let isGlobalHandlerAttached = false;
let activeButton = null;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-button` component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the `ui5-button`, or by pressing
 * certain keyboard keys, such as Enter.
 *
 * ### Usage
 *
 * For the `ui5-button` UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 *
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 *
 * You can set the `ui5-button` as enabled or disabled. An enabled
 * `ui5-button` can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-button` appears inactive and cannot be pressed.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Button.js";`
 * @csspart button - Used to style the native button element
 * @csspart icon - Used to style the icon in the native button element
 * @csspart endIcon - Used to style the end icon in the native button element
 * @constructor
 * @extends UI5Element
 * @implements { IButton }
 * @public
 */
let Button = Button_1 = class Button extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the component design.
         * @default "Default"
         * @public
         */
        this.design = "Default";
        /**
         * Defines whether the component is disabled.
         * A disabled component can't be pressed or
         * focused, and it is not in the tab chain.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * When set to `true`, the component will
         * automatically submit the nearest HTML form element on `press`.
         *
         * **Note:** This property is only applicable within the context of an HTML Form element.`
         * @default false
         * @public
         * @deprecated Set the "type" property to "Submit" to achieve the same result. The "submits" property is ignored if "type" is set to any value other than "Button".
         */
        this.submits = false;
        /**
         * Defines the additional accessibility attributes that will be applied to the component.
         * The following fields are supported:
         *
         * - **expanded**: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed.
         * Accepts the following string values: `true` or `false`
         *
         * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
         * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
         *
         * - **ariaLabel**: Defines the accessible ARIA name of the component.
         * Accepts any string value.
         *
         *  - **ariaKeyShortcuts**: Defines keyboard shortcuts that activate or give focus to the button.
         *
         * - **controls**: Identifies the element (or elements) whose contents or presence are controlled by the button element.
         * Accepts a lowercase string value.
         *
         * @public
         * @since 1.2.0
         * @default {}
         */
        this.accessibilityAttributes = {};
        /**
         * Defines whether the button has special form-related functionality.
         *
         * **Note:** This property is only applicable within the context of an HTML Form element.
         * @default "Button"
         * @public
         * @since 1.15.0
         */
        this.type = "Button";
        /**
         * Describes the accessibility role of the button.
         *
         * **Note:** Use <code>ButtonAccessibleRole.Link</code> role only with a press handler, which performs a navigation. In all other scenarios the default button semantics are recommended.
         *
         * @default "Button"
         * @public
         * @since 1.23
         */
        this.accessibleRole = "Button";
        /**
         * Used to switch the active state (pressed or not) of the component.
         * @private
         */
        this.active = false;
        /**
         * Defines if a content has been added to the default slot
         * @private
         */
        this.iconOnly = false;
        /**
         * Indicates if the elements has a slotted icon
         * @private
         */
        this.hasIcon = false;
        /**
         * Indicates if the elements has a slotted end icon
         * @private
         */
        this.hasEndIcon = false;
        /**
         * Indicates if the element is focusable
         * @private
         */
        this.nonInteractive = false;
        /**
         * Defines whether the button shows a loading indicator.
         *
         * **Note:** If set to `true`, a busy indicator component will be displayed on the related button.
         * @default false
         * @public
         * @since 2.13.0
         */
        this.loading = false;
        /**
         * Specifies the delay in milliseconds before the loading indicator appears within the associated button.
         * @default 1000
         * @public
         * @since 2.13.0
         */
        this.loadingDelay = 1000;
        /**
         * @private
         */
        this._iconSettings = {};
        /**
         * Defines the tabIndex of the component.
         * @private
         */
        this.forcedTabIndex = "0";
        /**
         * @since 1.0.0-rc.13
         * @private
         */
        this._isTouch = false;
        this._cancelAction = false;
        this._isSpacePressed = false;
        this._clickHandlerAttached = false;
        this._deactivate = () => {
            if (activeButton) {
                activeButton._setActiveState(false);
            }
        };
        this._onclickBound = e => {
            if (e instanceof CustomEvent) {
                return;
            }
            this._onclick(e);
        };
        if (!this._clickHandlerAttached) {
            this.addEventListener("click", this._onclickBound);
            this._clickHandlerAttached = true;
        }
        if (!isGlobalHandlerAttached) {
            document.addEventListener("mouseup", this._deactivate);
            isGlobalHandlerAttached = true;
        }
    }
    _ontouchstart() {
        if (this.nonInteractive) {
            return;
        }
        this._setActiveState(true);
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
        if (!this._clickHandlerAttached) {
            this.addEventListener("click", this._onclickBound);
            this._clickHandlerAttached = true;
        }
    }
    onExitDOM() {
        if (this._clickHandlerAttached) {
            this.removeEventListener("click", this._onclickBound);
            this._clickHandlerAttached = false;
        }
        if (activeButton === this) {
            activeButton = null;
        }
    }
    async onBeforeRendering() {
        this._setBadgeOverlayStyle();
        this.hasIcon = !!this.icon;
        this.hasEndIcon = !!this.endIcon;
        this.iconOnly = this.isIconOnly;
        const defaultTooltip = await this.getDefaultTooltip();
        this.buttonTitle = this.iconOnly ? this.tooltip ?? defaultTooltip : this.tooltip;
    }
    _setBadgeOverlayStyle() {
        const needsOverflowVisible = this.badge.length && (this.badge[0].design === ButtonBadgeDesign.AttentionDot || this.badge[0].design === ButtonBadgeDesign.OverlayText);
        if (needsOverflowVisible) {
            this._internals.states.add("has-overlay-badge");
        }
        else {
            this._internals.states.delete("has-overlay-badge");
        }
    }
    _onclick(e) {
        e.stopImmediatePropagation();
        if (this.nonInteractive) {
            return;
        }
        if (this.loading) {
            e.preventDefault();
            return;
        }
        const { altKey, ctrlKey, metaKey, shiftKey, } = e;
        const prevented = !this.fireDecoratorEvent("click", {
            originalEvent: e,
            altKey,
            ctrlKey,
            metaKey,
            shiftKey,
        });
        if (prevented) {
            e.preventDefault();
            return;
        }
        if (this._isSubmit) {
            submitForm(this);
        }
        if (this._isReset) {
            resetForm(this);
        }
        if (isSafari()) {
            this.getDomRef()?.focus();
        }
    }
    _onmousedown() {
        if (this.nonInteractive) {
            return;
        }
        this._setActiveState(true);
        activeButton = this; // eslint-disable-line
    }
    _ontouchend(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (this.active) {
            this._setActiveState(false);
        }
        if (activeButton) {
            activeButton._setActiveState(false);
        }
    }
    _onkeydown(e) {
        if (isShift(e) || isEscape(e)) {
            this._cancelAction = true;
        }
        else if (isSpace(e)) {
            this._isSpacePressed = true;
        }
        if ((isSpace(e) || isEnter(e))) {
            this._setActiveState(true);
        }
        else if (this._cancelAction) {
            this._setActiveState(false);
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
        if ((isSpace(e) || isEnter(e))) {
            if (this.active) {
                this._setActiveState(false);
            }
        }
    }
    _onfocusout() {
        if (this.nonInteractive) {
            return;
        }
        this._isSpacePressed = false;
        this._cancelAction = false;
        if (this.active) {
            this._setActiveState(false);
        }
    }
    _setActiveState(active) {
        const eventPrevented = !this.fireDecoratorEvent("active-state-change");
        if (eventPrevented || this.loading) {
            return;
        }
        this.active = active;
    }
    get hasButtonType() {
        return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
    }
    get isIconOnly() {
        return !willShowContent(this.text);
    }
    static typeTextMappings() {
        return {
            "Positive": BUTTON_ARIA_TYPE_ACCEPT,
            "Negative": BUTTON_ARIA_TYPE_REJECT,
            "Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
            "Attention": BUTTON_ARIA_TYPE_ATTENTION,
        };
    }
    getDefaultTooltip() {
        if (!getEnableDefaultTooltips()) {
            return;
        }
        return getIconAccessibleName(this.icon);
    }
    get buttonTypeText() {
        return Button_1.i18nBundle.getText(Button_1.typeTextMappings()[this.design]);
    }
    get effectiveAccRole() {
        return toLowercaseEnumValue(this.accessibleRole);
    }
    get tabIndexValue() {
        if (this.disabled) {
            return;
        }
        const tabindex = this.getAttribute("tabindex");
        if (tabindex) {
            return Number.parseInt(tabindex);
        }
        return this.nonInteractive ? -1 : Number.parseInt(this.forcedTabIndex);
    }
    get ariaLabelText() {
        const effectiveAriaLabelText = getEffectiveAriaLabelText(this) || "";
        const textContent = this.textContent || "";
        const internalLabelText = this.effectiveBadgeDescriptionText || "";
        // Use either the effective aria label text (if accessibleName is provided) or the button's text content
        const mainLabelText = effectiveAriaLabelText || textContent;
        const labelParts = [mainLabelText, internalLabelText].filter(part => part);
        return labelParts.join(" ");
    }
    get ariaDescriptionText() {
        const accessibleDescription = this.accessibleDescription === "" ? undefined : this.accessibleDescription;
        const typeLabelText = this.hasButtonType ? this.buttonTypeText : "";
        const descriptionParts = [accessibleDescription, typeLabelText].filter(part => part);
        return descriptionParts.length > 0 ? descriptionParts.join(" ") : undefined;
    }
    get _computedAccessibilityAttributes() {
        return {
            expanded: this.accessibilityAttributes.expanded,
            hasPopup: this.accessibilityAttributes.hasPopup,
            controls: this.accessibilityAttributes.controls,
            ariaKeyShortcuts: this.accessibilityAttributes.ariaKeyShortcuts,
            ariaLabel: this.accessibilityAttributes.ariaLabel || this.ariaLabelText,
        };
    }
    get accessibilityInfo() {
        return {
            description: this.ariaDescriptionText,
            role: this.effectiveAccRole,
            disabled: this.disabled,
            children: this.text,
            type: this.effectiveAccRoleTranslation,
        };
    }
    get effectiveAccRoleTranslation() {
        if (this.accessibleRole === ButtonAccessibleRole.Button) {
            return Button_1.i18nBundle.getText(BUTTON_ROLE_DESCRIPTION);
        }
        if (this.accessibleRole === ButtonAccessibleRole.Link) {
            return Button_1.i18nBundle.getText(LINK_ROLE_DESCRIPTION);
        }
        return "";
    }
    get effectiveBadgeDescriptionText() {
        if (!this.shouldRenderBadge) {
            return "";
        }
        const badgeEffectiveText = this.badge[0].effectiveText;
        // Use distinct i18n keys for singular and plural badge values to ensure proper localization.
        // Some languages have different grammatical rules for singular and plural forms,
        // so separate keys (BUTTON_BADGE_ONE_ITEM and BUTTON_BADGE_MANY_ITEMS) are necessary.
        switch (badgeEffectiveText) {
            case "":
                return badgeEffectiveText;
            case "1":
                return Button_1.i18nBundle.getText(BUTTON_BADGE_ONE_ITEM, badgeEffectiveText);
            default:
                return Button_1.i18nBundle.getText(BUTTON_BADGE_MANY_ITEMS, badgeEffectiveText);
        }
    }
    get _isSubmit() {
        return this.type === ButtonType.Submit || this.submits;
    }
    get _isReset() {
        return this.type === ButtonType.Reset;
    }
    get shouldRenderBadge() {
        return !!this.badge.length && (!!this.badge[0].text.length || this.badge[0].design === ButtonBadgeDesign.AttentionDot);
    }
};
__decorate([
    property()
], Button.prototype, "design", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "disabled", void 0);
__decorate([
    property()
], Button.prototype, "icon", void 0);
__decorate([
    property()
], Button.prototype, "endIcon", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "submits", void 0);
__decorate([
    property()
], Button.prototype, "tooltip", void 0);
__decorate([
    property()
], Button.prototype, "accessibleName", void 0);
__decorate([
    property()
], Button.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Object })
], Button.prototype, "accessibilityAttributes", void 0);
__decorate([
    property()
], Button.prototype, "accessibleDescription", void 0);
__decorate([
    property()
], Button.prototype, "type", void 0);
__decorate([
    property()
], Button.prototype, "accessibleRole", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "active", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "iconOnly", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "hasIcon", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "hasEndIcon", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "nonInteractive", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "loading", void 0);
__decorate([
    property({ type: Number })
], Button.prototype, "loadingDelay", void 0);
__decorate([
    property({ noAttribute: true })
], Button.prototype, "buttonTitle", void 0);
__decorate([
    property({ type: Object })
], Button.prototype, "_iconSettings", void 0);
__decorate([
    property({ noAttribute: true })
], Button.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Boolean })
], Button.prototype, "_isTouch", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Button.prototype, "_cancelAction", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Button.prototype, "_isSpacePressed", void 0);
__decorate([
    slot({ type: Node, "default": true })
], Button.prototype, "text", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true })
], Button.prototype, "badge", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Button, "i18nBundle", void 0);
Button = Button_1 = __decorate([
    customElement({
        tag: "ui5-button",
        formAssociated: true,
        languageAware: true,
        renderer: jsxRenderer,
        template: ButtonTemplate,
        styles: buttonCss,
        shadowRootOptions: { delegatesFocus: true },
    })
    /**
     * Fired when the component is activated either with a mouse/tap or by using the Enter or Space key.
     *
     * **Note:** The event will not be fired if the `disabled` property is set to `true`.
     *
     * @since 2.10.0
     * @public
     * @param {Event} originalEvent Returns original event that comes from user's **click** interaction
     * @param {boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
     * @param {boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
     * @param {boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
     * @param {boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
     */
    ,
    event("click", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired whenever the active state of the component changes.
     * @private
     */
    ,
    event("active-state-change", {
        bubbles: true,
        cancelable: true,
    })
], Button);
Button.define();
export default Button;
//# sourceMappingURL=Button.js.map