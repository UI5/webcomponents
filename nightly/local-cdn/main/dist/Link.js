var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Link_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import toLowercaseEnumValue from "@ui5/webcomponents-base/dist/util/toLowercaseEnumValue.js";
import { getLocationHostname, getLocationPort, getLocationProtocol } from "@ui5/webcomponents-base/dist/Location.js";
import LinkDesign from "./types/LinkDesign.js";
// Template
import LinkTemplate from "./LinkTemplate.js";
import { LINK_SUBTLE, LINK_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";
// Styles
import linkCss from "./generated/themes/Link.css.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-link` is a hyperlink component that is used to navigate to other
 * apps and web pages, or to trigger actions.
 * It is a clickable text element, visualized in such a way that it stands out
 * from the standard text.
 * On hover, it changes its style to an underlined text to provide additional feedback to the user.
 *
 * ### Usage
 *
 * You can set the `ui5-link` to be enabled or disabled.
 *
 * To create a visual hierarchy in large lists of links, you can set the less important links as
 * `Subtle` or the more important ones as `Emphasized`,
 * by using the `design` property.
 *
 * If the `href` property is set, the link behaves as the HTML
 * anchor tag (`<a></a>`) and opens the specified URL in the given target frame (`target` property).
 * To specify where the linked content is opened, you can use the `target` property.
 *
 * ### Responsive behavior
 *
 * If there is not enough space, the text of the `ui5-link` becomes truncated.
 * If the `wrappingType` property is set to `"Normal"`, the text is displayed
 * on several lines instead of being truncated.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Link";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart icon - Used to style the provided icon within the link
 * @csspart endIcon - Used to style the provided endIcon within the link
 * @slot {Array<Node>} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
let Link = Link_1 = class Link extends UI5Element {
    constructor() {
        super();
        /**
         * Defines whether the component is disabled.
         *
         * **Note:** When disabled, the click event cannot be triggered by the user.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines the component design.
         *
         * **Note:** Avaialble options are `Default`, `Subtle`, and `Emphasized`.
         * @default "Default"
         * @public
         */
        this.design = "Default";
        /**
         * Defines the target area size of the link:
         * - **InteractiveAreaSize.Normal**: The default target area size.
         * - **InteractiveAreaSize.Large**: The target area size is enlarged to 24px in height.
         *
         * **Note:**The property is designed to make links easier to activate and helps meet the WCAG 2.2 Target Size requirement. It is applicable only for the SAP Horizon themes.
         * **Note:**To improve <code>ui5-link</code>'s reliability and usability, it is recommended to use the <code>InteractiveAreaSize.Large</code> value in scenarios where the <code>ui5-link</code> component is placed inside another interactive component, such as a list item or a table cell.
         * Setting the <code>interactiveAreaSize</code> property to <code>InteractiveAreaSize.Large</code> increases the <code>ui5-link</code>'s invisible touch area. As a result, the user's intended one-time selection command is more likely to activate the desired <code>ui5-link</code>, with minimal chance of unintentionally activating the underlying component.
         *
         * @public
         * @since 2.8.0
         * @default "Normal"
         */
        this.interactiveAreaSize = "Normal";
        /**
         * Defines how the text of a component will be displayed when there is not enough space.
         *
         * **Note:** By default the text will wrap. If "None" is set - the text will truncate.
         * @default "Normal"
         * @public
         */
        this.wrappingType = "Normal";
        /**
         * Defines the ARIA role of the component.
         *
         * **Note:** Use the <code>LinkAccessibleRole.Button</code> role in cases when navigation is not expected to occur and the href property is not defined.
         * @default "Link"
         * @public
         * @since 1.9.0
         */
        this.accessibleRole = "Link";
        /**
         * Defines the additional accessibility attributes that will be applied to the component.
         * The following fields are supported:
         *
         * - **expanded**: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed.
         * Accepts the following string values: `true` or `false`.
         *
         * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
         * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
         *
         * @public
         * @since 1.1.0
         * @default {}
         */
        this.accessibilityAttributes = {};
        this._dummyAnchor = document.createElement("a");
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    onBeforeRendering() {
        const needsNoReferrer = this.target !== "_self"
            && this.href
            && this._isCrossOrigin(this.href);
        this._rel = needsNoReferrer ? "noreferrer noopener" : undefined;
    }
    _isCrossOrigin(href) {
        this._dummyAnchor.href = href;
        return !(this._dummyAnchor.hostname === getLocationHostname()
            && this._dummyAnchor.port === getLocationPort()
            && this._dummyAnchor.protocol === getLocationProtocol());
    }
    get effectiveTabIndex() {
        if (this.forcedTabIndex) {
            return Number.parseInt(this.forcedTabIndex);
        }
        return this.disabled ? -1 : 0;
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get hasLinkType() {
        return this.design !== LinkDesign.Default;
    }
    static typeTextMappings() {
        return {
            "Subtle": LINK_SUBTLE,
            "Emphasized": LINK_EMPHASIZED,
        };
    }
    get linkTypeText() {
        return Link_1.i18nBundle.getText(Link_1.typeTextMappings()[this.design]);
    }
    get parsedRef() {
        return (this.href && this.href.length > 0) ? this.href : undefined;
    }
    get effectiveAccRole() {
        return toLowercaseEnumValue(this.accessibleRole);
    }
    get ariaDescriptionText() {
        return this.accessibleDescription === "" ? undefined : this.accessibleDescription;
    }
    get _hasPopup() {
        return this.accessibilityAttributes.hasPopup;
    }
    _onclick(e) {
        const { altKey, ctrlKey, metaKey, shiftKey, } = e;
        e.stopImmediatePropagation();
        const executeEvent = this.fireDecoratorEvent("click", {
            altKey,
            ctrlKey,
            metaKey,
            shiftKey,
        });
        if (!executeEvent) {
            e.preventDefault();
        }
    }
    _onkeydown(e) {
        if (isEnter(e) && !this.href) {
            this._onclick(e);
            e.preventDefault();
        }
        else if (isSpace(e)) {
            e.preventDefault();
        }
    }
    _onkeyup(e) {
        if (!isSpace(e)) {
            return;
        }
        this._onclick(e);
        if (this.href && !e.defaultPrevented) {
            const customEvent = new MouseEvent("click");
            customEvent.stopImmediatePropagation();
            this.getDomRef().dispatchEvent(customEvent);
        }
    }
};
__decorate([
    property({ type: Boolean })
], Link.prototype, "disabled", void 0);
__decorate([
    property()
], Link.prototype, "tooltip", void 0);
__decorate([
    property()
], Link.prototype, "href", void 0);
__decorate([
    property()
], Link.prototype, "target", void 0);
__decorate([
    property()
], Link.prototype, "design", void 0);
__decorate([
    property()
], Link.prototype, "interactiveAreaSize", void 0);
__decorate([
    property()
], Link.prototype, "wrappingType", void 0);
__decorate([
    property()
], Link.prototype, "accessibleName", void 0);
__decorate([
    property()
], Link.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], Link.prototype, "accessibleRole", void 0);
__decorate([
    property({ type: Object })
], Link.prototype, "accessibilityAttributes", void 0);
__decorate([
    property()
], Link.prototype, "accessibleDescription", void 0);
__decorate([
    property()
], Link.prototype, "icon", void 0);
__decorate([
    property()
], Link.prototype, "endIcon", void 0);
__decorate([
    property({ noAttribute: true })
], Link.prototype, "_rel", void 0);
__decorate([
    property({ noAttribute: true })
], Link.prototype, "forcedTabIndex", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Link, "i18nBundle", void 0);
Link = Link_1 = __decorate([
    customElement({
        tag: "ui5-link",
        languageAware: true,
        renderer: jsxRenderer,
        template: LinkTemplate,
        styles: linkCss,
    })
    /**
     * Fired when the component is triggered either with a mouse/tap
     * or by using the Enter key.
     * @public
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
], Link);
Link.define();
export default Link;
//# sourceMappingURL=Link.js.map