var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IllustratedMessage_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { attachThemeLoaded, detachThemeLoaded } from "@ui5/webcomponents-base/dist/Theming.js";
import { getIllustrationDataSync, getIllustrationData } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import IllustrationMessageDesign from "./types/IllustrationMessageDesign.js";
import IllustrationMessageType from "./types/IllustrationMessageType.js";
import "./illustrations/BeforeSearch.js";
// Styles
import IllustratedMessageCss from "./generated/themes/IllustratedMessage.css.js";
// Template
import IllustratedMessageTemplate from "./IllustratedMessageTemplate.js";
const getEffectiveIllustrationName = (name) => {
    if (name.startsWith("Tnt")) {
        return name.replace("Tnt", "tnt/");
    }
    if (name.includes("/")) {
        return name;
    }
    return `fiori/${name}`;
};
/**
 * @class
 *
 * ### Overview
 * An IllustratedMessage is a recommended combination of a solution-oriented message, an engaging
 * illustration, and conversational tone to better communicate an empty or a success state than just show
 * a message alone.
 *
 * Each illustration has default internationalised title and subtitle texts. Also they can be managed with
 * `titleText` and `subtitleText` properties.
 *
 * To display the desired illustration, use the `name` property, where you can find the list of all available illustrations.
 *
 * **Note:** By default the “BeforeSearch” illustration is loaded. To use other illustrations, make sure you import them in addition, for example:
 *
 * `import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js"`
 *
 * **Note:** Illustrations starting with the “Tnt” prefix are part of another illustration set. For example to use the “TntSuccess” illustration, add the following import::
 *
 * `import "@ui5/webcomponents-fiori/dist/illustrations/tnt/Success.js"`
 *
 * ### Structure
 * The IllustratedMessage consists of the following elements, which are displayed below each other in the following order:
 *
 * - Illustration
 * - Title
 * - Subtitle
 * - Actions
 *
 * ### Usage
 * `ui5-illustrated-message` is meant to be used inside container component, for example a `ui5-card`,
 * a `ui5-dialog` or a `ui5-page`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";`
 * @csspart subtitle - Used to style the subtitle wrapper of the `ui5-illustrated-message`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 */
let IllustratedMessage = IllustratedMessage_1 = class IllustratedMessage extends UI5Element {
    constructor() {
        super();
        /**
        * Defines the illustration name that will be displayed in the component.
        *
        * Example:
        *
        * `name='BeforeSearch'`, `name='UnableToUpload'`, etc..
        *
        * **Note:** To use the TNT illustrations,
        * you need to set the `tnt` or `Tnt` prefix in front of the icon's name.
        *
        * Example:
        *
        * `name='tnt/Avatar'` or `name='TntAvatar'`.
        *
        * **Note:** By default the `BeforeSearch` illustration is loaded.
        * When using an illustration type, other than the default, it should be loaded in addition:
        *
        * `import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";`
        *
        * For TNT illustrations:
        *
        * `import "@ui5/webcomponents-fiori/dist/illustrations/tnt/SessionExpired.js";`
        * @default "BeforeSearch"
        * @public
        */
        this.name = "BeforeSearch";
        /**
        * Determines which illustration breakpoint variant is used.
        *
        * As `IllustratedMessage` adapts itself around the `Illustration`, the other
        * elements of the component are displayed differently on the different breakpoints/illustration designs.
        * @default "Auto"
        * @public
        * @since 2.0.0
        */
        this.design = "Auto";
        /**
        * Defines whether the illustration is decorative.
        *
        * When set to `true`, the attributes `role="presentation"` and `aria-hidden="true"` are applied to the SVG element.
        * @default false
        * @public
        * @since 2.10.0
        */
        this.decorative = false;
        this._handleResize = this.handleResize.bind(this);
        this._handleThemeLoaded = () => {
            // Cached content-height are theme-dependent, so clear them when the theme changes.
            // This hook is needed because `onInvalidation` does not fire when the theme changes
            this._contentHeightForMedia = {};
        };
        // this will store the height of the inner content of the IllustratedMessage (illustration + title + subtitle + actions) for a given media (e.g. "Spot")
        this._contentHeightForMedia = {};
    }
    static get BREAKPOINTS() {
        return {
            DIALOG: 681,
            SPOT: 360,
            DOT: 260,
            BASE: 160,
        };
    }
    static get MEDIA() {
        return {
            BASE: "base",
            DOT: "dot",
            SPOT: "spot",
            DIALOG: "dialog",
            SCENE: "scene",
        };
    }
    async onBeforeRendering() {
        // Gets the current illustration name given in the "name" attribute
        let effectiveName = getEffectiveIllustrationName(this.name);
        let illustrationData = getIllustrationDataSync(effectiveName);
        if (this.hasAttribute("name") && !this.isValidIllustration(effectiveName)) {
            effectiveName = getEffectiveIllustrationName(IllustrationMessageType.BeforeSearch);
            // eslint-disable-next-line
            console.warn(`The illustration "${effectiveName}" does not exist. The default illustration "${IllustrationMessageType.BeforeSearch}" is loaded instead.`);
        }
        if (illustrationData === undefined) {
            illustrationData = await getIllustrationData(effectiveName);
        }
        // Check if illustration uses templates (safe variant)
        if (illustrationData && "dotTemplate" in illustrationData && illustrationData.dotTemplate) {
            this.dotTemplate = executeTemplate(illustrationData.dotTemplate, this);
        }
        if (illustrationData && "spotTemplate" in illustrationData && illustrationData.spotTemplate) {
            this.spotTemplate = executeTemplate(illustrationData.spotTemplate, this);
        }
        if (illustrationData && "dialogTemplate" in illustrationData && illustrationData.dialogTemplate) {
            this.dialogTemplate = executeTemplate(illustrationData.dialogTemplate, this);
        }
        if (illustrationData && "sceneTemplate" in illustrationData && illustrationData.sceneTemplate) {
            this.sceneTemplate = executeTemplate(illustrationData.sceneTemplate, this);
        }
        // Check if illustration uses SVG strings (unsafe variant)
        if (illustrationData && "dotSvg" in illustrationData) {
            this.dotSvg = illustrationData.dotSvg;
        }
        if (illustrationData && "spotSvg" in illustrationData) {
            this.spotSvg = illustrationData.spotSvg;
        }
        if (illustrationData && "dialogSvg" in illustrationData) {
            this.dialogSvg = illustrationData.dialogSvg;
        }
        if (illustrationData && "sceneSvg" in illustrationData) {
            this.sceneSvg = illustrationData.sceneSvg;
        }
        this.illustrationTitle = IllustratedMessage_1.i18nBundle.getText(illustrationData.title);
        this.illustrationSubtitle = IllustratedMessage_1.i18nBundle.getText(illustrationData.subtitle);
        if (this.design !== IllustrationMessageDesign.Auto) {
            this._handleCustomSize();
        }
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResize);
        attachThemeLoaded(this._handleThemeLoaded);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResize);
        detachThemeLoaded(this._handleThemeLoaded);
    }
    onInvalidation(changeInfo) {
        if ((changeInfo.type === "property" && ["name", "titleText", "subtitleText"].includes(changeInfo.name))
            || (changeInfo.type === "slot" && ["title", "subtitle", "default"].includes(changeInfo.name))) {
            this._contentHeightForMedia = {};
        }
    }
    handleResize() {
        if (this.design === IllustrationMessageDesign.Auto) {
            this._checkHeightConstraints();
            this._applyMedia();
        }
    }
    /**
     * Checks if the current height of the component is enough to display the illustration, title, subtitle and actions.
     * If not, the minimum required height for the current media is stored in the `_contentHeightForMedia` object.
     * @private
     */
    _checkHeightConstraints() {
        // The `scrollHeight > clientHeight` guard is load-bearing: the cache must be populated ONLY
        // when the content genuinely overflows the container. When the host container has
        // `height: auto`, its clientHeight equals the content height and there is by definition no
        // real constraint — recording that height would falsely poison `_contentHeightForMedia` and
        // cause spurious downgrades on the next render (e.g. after a width shrink-and-grow).
        if (this.media && this.scrollHeight > this.clientHeight) { // needs vertical responsiveness
            const innerEl = this.shadowRoot.querySelector(".ui5-illustrated-message-inner");
            const innerElHeight = innerEl ? innerEl.scrollHeight : 0;
            innerElHeight && (this._contentHeightForMedia[this.media] = innerElHeight);
        }
    }
    _applyMedia() {
        const width = this.offsetWidth;
        let media = "", mediaIndex = -1;
        if (width <= IllustratedMessage_1.BREAKPOINTS.BASE) {
            media = IllustratedMessage_1.MEDIA.BASE;
        }
        else if (width <= IllustratedMessage_1.BREAKPOINTS.DOT) {
            media = IllustratedMessage_1.MEDIA.DOT;
        }
        else if (width <= IllustratedMessage_1.BREAKPOINTS.SPOT) {
            media = IllustratedMessage_1.MEDIA.SPOT;
        }
        else if (width <= IllustratedMessage_1.BREAKPOINTS.DIALOG) {
            media = IllustratedMessage_1.MEDIA.DIALOG;
        }
        else {
            media = IllustratedMessage_1.MEDIA.SCENE;
        }
        mediaIndex = Object.values(IllustratedMessage_1.MEDIA).indexOf(media);
        while (mediaIndex > 0 && this._mediaExceedsContainerHeight(media)) {
            mediaIndex--;
            media = Object.values(IllustratedMessage_1.MEDIA)[mediaIndex];
        }
        this.media = media;
    }
    _mediaExceedsContainerHeight(media) {
        return !!this._contentHeightForMedia[media] && this.clientHeight < this._contentHeightForMedia[media];
    }
    _setSVGAccAttrs() {
        const svg = this.shadowRoot.querySelector(".ui5-illustrated-message-illustration svg");
        if (!svg) {
            return;
        }
        if (this.decorative) {
            svg.setAttribute("role", "presentation");
            svg.setAttribute("aria-hidden", "true");
            svg.removeAttribute("aria-label");
        }
        else {
            svg.removeAttribute("role");
            svg.removeAttribute("aria-hidden");
            // Set aria-label only when not decorative and text exists
            if (this.ariaLabelText) {
                svg.setAttribute("aria-label", this.ariaLabelText);
            }
            else {
                svg.removeAttribute("aria-label");
            }
        }
    }
    onAfterRendering() {
        this._setSVGAccAttrs();
        if (this.design !== IllustrationMessageDesign.Auto) {
            return;
        }
        const heightMeasurementNeeded = this.media && !(this.media in this._contentHeightForMedia);
        const mightOverflow = this.scrollHeight > this.clientHeight;
        if (heightMeasurementNeeded || mightOverflow) {
            this._checkHeightConstraints();
            this._applyMedia();
        }
    }
    /**
     * Modifies the IM styles in accordance to the `size` property's value.
     * Note: The resize handler has no effect when size is different than "Auto".
     * @private
     * @since 1.5.0
     */
    _handleCustomSize() {
        switch (this.design) {
            case IllustrationMessageDesign.Base:
                this.media = IllustratedMessage_1.MEDIA.BASE;
                return;
            case IllustrationMessageDesign.Dot:
                this.media = IllustratedMessage_1.MEDIA.DOT;
                return;
            case IllustrationMessageDesign.Spot:
                this.media = IllustratedMessage_1.MEDIA.SPOT;
                return;
            case IllustrationMessageDesign.Dialog:
                this.media = IllustratedMessage_1.MEDIA.DIALOG;
                return;
            case IllustrationMessageDesign.ExtraSmall:
                this.media = IllustratedMessage_1.MEDIA.DOT;
                return;
            case IllustrationMessageDesign.Small:
                this.media = IllustratedMessage_1.MEDIA.SPOT;
                return;
            case IllustrationMessageDesign.Medium:
                this.media = IllustratedMessage_1.MEDIA.DIALOG;
                return;
            default:
                this.media = IllustratedMessage_1.MEDIA.SCENE;
        }
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get effectiveIllustration() {
        switch (this.media) {
            case IllustratedMessage_1.MEDIA.DOT:
                return this.dotTemplate || this.dotSvg;
            case IllustratedMessage_1.MEDIA.SPOT:
                return this.spotTemplate || this.spotSvg;
            case IllustratedMessage_1.MEDIA.DIALOG:
                return this.dialogTemplate || this.dialogSvg;
            case IllustratedMessage_1.MEDIA.SCENE:
                return this.sceneTemplate || this.sceneSvg;
            default:
                return "";
        }
    }
    get hasFormattedSubtitle() {
        return !!this.subtitle.length;
    }
    get hasFormattedTitle() {
        return !!this.title.length;
    }
    get effectiveTitleText() {
        return this.titleText ? this.titleText : this.illustrationTitle;
    }
    get effectiveSubitleText() {
        return this.subtitleText ? this.subtitleText : this.illustrationSubtitle;
    }
    get hasTitle() {
        return !!(this.hasFormattedTitle || this.titleText || this.illustrationTitle);
    }
    get hasSubtitle() {
        return !!(this.hasFormattedSubtitle || this.subtitleText || this.illustrationSubtitle);
    }
    get hasActions() {
        return !!this.actions.length && this.media !== IllustratedMessage_1.MEDIA.BASE;
    }
    isValidIllustration(currentIllustration) {
        currentIllustration = currentIllustration.startsWith("tnt/") ? currentIllustration.replace("tnt/", "Tnt") : currentIllustration.replace("fiori/", "");
        return currentIllustration in IllustrationMessageType;
    }
};
__decorate([
    property()
], IllustratedMessage.prototype, "name", void 0);
__decorate([
    property()
], IllustratedMessage.prototype, "design", void 0);
__decorate([
    property()
], IllustratedMessage.prototype, "subtitleText", void 0);
__decorate([
    property()
], IllustratedMessage.prototype, "titleText", void 0);
__decorate([
    property()
], IllustratedMessage.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "dotSvg", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "spotSvg", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "sceneSvg", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "dialogSvg", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "dotTemplate", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "spotTemplate", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "sceneTemplate", void 0);
__decorate([
    property({ noAttribute: true })
], IllustratedMessage.prototype, "dialogTemplate", void 0);
__decorate([
    property()
], IllustratedMessage.prototype, "media", void 0);
__decorate([
    property({ type: Boolean })
], IllustratedMessage.prototype, "decorative", void 0);
__decorate([
    slot({ type: HTMLElement })
], IllustratedMessage.prototype, "title", void 0);
__decorate([
    slot({ type: HTMLElement })
], IllustratedMessage.prototype, "subtitle", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], IllustratedMessage.prototype, "actions", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], IllustratedMessage, "i18nBundle", void 0);
IllustratedMessage = IllustratedMessage_1 = __decorate([
    customElement({
        tag: "ui5-illustrated-message",
        languageAware: true,
        themeAware: true,
        renderer: jsxRenderer,
        styles: IllustratedMessageCss,
        template: IllustratedMessageTemplate,
    })
], IllustratedMessage);
IllustratedMessage.define();
export default IllustratedMessage;
//# sourceMappingURL=IllustratedMessage.js.map