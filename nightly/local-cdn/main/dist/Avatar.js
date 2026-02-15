var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Avatar_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
// Template
import AvatarTemplate from "./AvatarTemplate.js";
import { AVATAR_TOOLTIP, AVATAR_TYPE_BUTTON, AVATAR_TYPE_IMAGE, } from "./generated/i18n/i18n-defaults.js";
// Styles
import AvatarCss from "./generated/themes/Avatar.css.js";
import AvatarSize from "./types/AvatarSize.js";
// Icon
import "@ui5/webcomponents-icons/dist/employee.js";
/**
 * @class
 * ### Overview
 *
 * An image-like component that has different display options for representing images and icons
 * in different shapes and sizes, depending on the use case.
 *
 * The shape can be circular or square. There are several predefined sizes, as well as an option to
 * set a custom size.
 *
 * ### Keyboard Handling
 *
 * - [Space] / [Enter] or [Return] - Fires the `click` event if the `interactive` property is set to true.
 * - [Shift] - If [Space] is pressed, pressing [Shift] releases the component without triggering the click event.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Avatar.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @implements {IAvatarGroupItem}
 * @public
 */
let Avatar = Avatar_1 = class Avatar extends UI5Element {
    constructor() {
        super();
        /**
         * Defines whether the component is disabled.
         * A disabled component can't be pressed or
         * focused, and it is not in the tab chain.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines if the avatar is interactive (focusable and pressable).
         *
         * **Note:** This property won't have effect if the `disabled`
         * property is set to `true`.
         * @default false
         * @public
         */
        this.interactive = false;
        /**
         * Defines the name of the fallback icon, which should be displayed in the following cases:
         *
         * 	- If the initials are not valid (more than 3 letters, unsupported languages or empty initials).
         * 	- If there are three initials and they do not fit in the shape (e.g. WWW for some of the sizes).
         * 	- If the image src is wrong.
         *
         * **Note:** If not set, a default fallback icon "employee" is displayed.
         *
         * **Note:** You should import the desired icon first, then use its name as "fallback-icon".
         *
         * `import "@ui5/webcomponents-icons/dist/{icon_name}.js"`
         *
         * `<ui5-avatar fallback-icon="alert">`
         *
         * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
         * @default "employee"
         * @public
         */
        this.fallbackIcon = "employee";
        /**
         * Defines the shape of the component.
         * @default "Circle"
         * @public
         */
        this.shape = "Circle";
        /**
         * Defines predefined size of the component.
         * @default "S"
         * @public
         */
        this.size = "S";
        /**
         * Defines the background color of the desired image.
         * If `colorScheme` is set to `Auto`, the avatar will be displayed with the `Accent6` color.
         *
         * @default "Auto"
         * @public
         */
        this.colorScheme = "Auto";
        /**
         * @private
         */
        this._colorScheme = "Auto";
        /**
         * Defines the additional accessibility attributes that will be applied to the component.
         * The following field is supported:
         *
         * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
         * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
         *
         * @public
         * @since 2.0.0
         * @default {}
         */
        this.accessibilityAttributes = {};
        /**
         * @private
         */
        this._hasImage = false;
        /**
         * @private
         */
        this._imageLoadError = false;
        this._handleResizeBound = this.handleResize.bind(this);
        this._onImageLoadBound = this._onImageLoad.bind(this);
        this._onImageErrorBound = this._onImageError.bind(this);
    }
    onBeforeRendering() {
        this._attachImageEventHandlers();
        this._hasImage = this.hasImage;
    }
    get tabindex() {
        if (this.forcedTabIndex) {
            return parseInt(this.forcedTabIndex);
        }
        return this._interactive ? 0 : undefined;
    }
    /**
     * Returns the effective avatar size.
     * @default "S"
     * @private
     */
    get effectiveSize() {
        // we read the attribute, because the "size" property will always have a default value
        return this.getAttribute("size") || AvatarSize.S;
    }
    /**
     * Returns the effective background color.
     * @default "Auto"
     * @private
     */
    get effectiveBackgroundColor() {
        // we read the attribute, because the "background-color" property will always have a default value
        return this.getAttribute("color-scheme") || this._colorScheme;
    }
    get _role() {
        return this._interactive ? "button" : "img";
    }
    get _ariaHasPopup() {
        return this._getAriaHasPopup();
    }
    get _interactive() {
        return this.interactive && !this.disabled;
    }
    get validInitials() {
        // initials should consist of only 1,2 or 3 latin letters
        const validInitials = /^[a-zA-Zà-üÀ-Ü]{1,3}$/, areInitialsValid = this.initials && validInitials.test(this.initials);
        if (areInitialsValid) {
            return this.initials;
        }
        return null;
    }
    get accessibleNameText() {
        if (this.accessibleName) {
            return this.accessibleName;
        }
        const defaultLabel = Avatar_1.i18nBundle.getText(AVATAR_TOOLTIP);
        return this.initials ? `${defaultLabel} ${this.initials}`.trim() : defaultLabel;
    }
    get hasImage() {
        return !!this.image.length && !this._imageLoadError;
    }
    get imageEl() {
        return this.image?.[0] instanceof HTMLImageElement ? this.image[0] : null;
    }
    get initialsContainer() {
        return this.getDomRef().querySelector(".ui5-avatar-initials");
    }
    get fallBackIconDomRef() {
        return this.getDomRef().querySelector(".ui5-avatar-icon-fallback");
    }
    async onAfterRendering() {
        await renderFinished();
        if (this.initials && !this.icon) {
            this._checkInitials();
        }
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
        this.initialsContainer && ResizeHandler.register(this.initialsContainer, this._handleResizeBound);
    }
    onExitDOM() {
        this.initialsContainer && ResizeHandler.deregister(this.initialsContainer, this._handleResizeBound);
        this._detachImageEventHandlers();
    }
    handleResize() {
        if (this.initials && !this.icon) {
            this._checkInitials();
        }
    }
    _checkInitials() {
        const avatar = this.getDomRef();
        const avatarInitials = avatar.querySelector(".ui5-avatar-initials");
        const validInitials = this.validInitials && avatarInitials && avatarInitials.scrollWidth <= avatar.scrollWidth;
        if (validInitials) {
            this.showInitials();
            return;
        }
        this.showFallbackIcon();
    }
    showFallbackIcon() {
        this.initialsContainer?.classList.add("ui5-avatar-initials-hidden");
        this.fallBackIconDomRef?.classList.remove("ui5-avatar-fallback-icon-hidden");
    }
    showInitials() {
        this.initialsContainer?.classList.remove("ui5-avatar-initials-hidden");
        this.fallBackIconDomRef?.classList.add("ui5-avatar-fallback-icon-hidden");
    }
    _onclick(e) {
        e.stopPropagation();
        this._fireClick();
    }
    _onkeydown(e) {
        if (!this._interactive) {
            return;
        }
        if (isEnter(e)) {
            this._fireClick();
        }
        if (isSpace(e)) {
            e.preventDefault(); // prevent scrolling
        }
    }
    _onkeyup(e) {
        if (this._interactive && !e.shiftKey && isSpace(e)) {
            this._fireClick();
        }
    }
    _fireClick() {
        this.fireDecoratorEvent("click");
    }
    _getAriaHasPopup() {
        const ariaHaspopup = this.accessibilityAttributes.hasPopup;
        if (!this._interactive || !ariaHaspopup) {
            return;
        }
        return ariaHaspopup;
    }
    _attachImageEventHandlers() {
        const imgEl = this.imageEl;
        if (!imgEl) {
            this._imageLoadError = false;
            return;
        }
        // Remove previous handlers to avoid duplicates
        imgEl.removeEventListener("load", this._onImageLoadBound);
        imgEl.removeEventListener("error", this._onImageErrorBound);
        // Attach new handlers
        imgEl.addEventListener("load", this._onImageLoadBound);
        imgEl.addEventListener("error", this._onImageErrorBound);
        // Check existing image state
        this._checkExistingImageState();
    }
    _checkExistingImageState() {
        const imgEl = this.imageEl;
        if (!imgEl) {
            this._imageLoadError = false;
            return;
        }
        if (imgEl.complete && imgEl.naturalWidth === 0) {
            this._imageLoadError = true; // Already broken
        }
        else if (imgEl.complete && imgEl.naturalWidth > 0) {
            this._imageLoadError = false; // Already loaded
        }
        else {
            this._imageLoadError = false; // Pending load
        }
    }
    _detachImageEventHandlers() {
        const imgEl = this.imageEl;
        if (!imgEl) {
            return;
        }
        imgEl.removeEventListener("load", this._onImageLoadBound);
        imgEl.removeEventListener("error", this._onImageErrorBound);
    }
    _onImageLoad(e) {
        if (e.target !== this.imageEl) {
            e.target?.removeEventListener("load", this._onImageLoadBound);
            return;
        }
        this._imageLoadError = false;
    }
    _onImageError(e) {
        if (e.target !== this.imageEl) {
            e.target?.removeEventListener("error", this._onImageErrorBound);
            return;
        }
        this._imageLoadError = true;
    }
    get accessibilityInfo() {
        return {
            role: this._role,
            type: this.interactive ? Avatar_1.i18nBundle.getText(AVATAR_TYPE_BUTTON) : Avatar_1.i18nBundle.getText(AVATAR_TYPE_IMAGE),
            description: this.accessibleNameText,
            disabled: this.disabled,
        };
    }
};
__decorate([
    property({ type: Boolean })
], Avatar.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], Avatar.prototype, "interactive", void 0);
__decorate([
    property()
], Avatar.prototype, "icon", void 0);
__decorate([
    property()
], Avatar.prototype, "fallbackIcon", void 0);
__decorate([
    property()
], Avatar.prototype, "initials", void 0);
__decorate([
    property()
], Avatar.prototype, "shape", void 0);
__decorate([
    property()
], Avatar.prototype, "size", void 0);
__decorate([
    property()
], Avatar.prototype, "colorScheme", void 0);
__decorate([
    property()
], Avatar.prototype, "_colorScheme", void 0);
__decorate([
    property()
], Avatar.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Object })
], Avatar.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ noAttribute: true })
], Avatar.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Boolean })
], Avatar.prototype, "_hasImage", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Avatar.prototype, "_imageLoadError", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Avatar.prototype, "image", void 0);
__decorate([
    slot()
], Avatar.prototype, "badge", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Avatar, "i18nBundle", void 0);
Avatar = Avatar_1 = __decorate([
    customElement({
        tag: "ui5-avatar",
        languageAware: true,
        renderer: jsxRenderer,
        styles: AvatarCss,
        template: AvatarTemplate,
    })
    /**
     * Fired on mouseup, space and enter if avatar is interactive
     *
     * **Note:** The event will not be fired if the `disabled`
     * property is set to `true`.
     * @public
     * @since 2.11.0
     */
    ,
    event("click", {
        bubbles: true,
    })
], Avatar);
Avatar.define();
export default Avatar;
//# sourceMappingURL=Avatar.js.map