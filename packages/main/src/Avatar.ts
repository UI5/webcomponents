import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { AccessibilityAttributes, AriaRole } from "@ui5/webcomponents-base/dist/types.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import type { IAvatarGroupItem } from "./AvatarGroup.js";
// Template
import AvatarTemplate from "./AvatarTemplate.js";

import {
	AVATAR_TOOLTIP,
	AVATAR_TYPE_BUTTON,
	AVATAR_TYPE_IMAGE,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import AvatarCss from "./generated/themes/Avatar.css.js";

import type Icon from "./Icon.js";
import AvatarSize from "./types/AvatarSize.js";
import type AvatarShape from "./types/AvatarShape.js";
import type AvatarColorScheme from "./types/AvatarColorScheme.js";

// Icon
import "@ui5/webcomponents-icons/dist/employee.js";

type AvatarAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup">;

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
@customElement({
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
@event("click", {
	bubbles: true,
})
class Avatar extends UI5Element implements ITabbable, IAvatarGroupItem {
	eventDetails!: {
		click: void,
	}
	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines if the avatar is interactive (focusable and pressable).
	 *
	 * **Note:** This property won't have effect if the `disabled`
	 * property is set to `true`.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	interactive = false;

	/**
	 * Defines the name of the UI5 Icon, that will be displayed.
	 *
	 * **Note:** If `image` slot is provided, the property will be ignored.
	 *
	 * **Note:** You should import the desired icon first, then use its name as "icon".
	 *
	 * `import "@ui5/webcomponents-icons/dist/{icon_name}.js"`
	 *
	 * `<ui5-avatar icon="employee">`
	 *
	 * **Note:** If no icon or an empty one is provided, by default the "employee" icon should be displayed.
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

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
	@property()
	fallbackIcon = "employee";

	/**
	 * Defines the displayed initials.
	 *
	 * Up to three Latin letters can be displayed as initials.
	 * @default undefined
	 * @public
	 */
	@property()
	initials?: string;

	/**
	 * Defines the shape of the component.
	 * @default "Circle"
	 * @public
	 */
	@property()
	shape: `${AvatarShape}` = "Circle";

	/**
	 * Defines predefined size of the component.
	 * @default "S"
	 * @public
	 */
	@property()
	size: `${AvatarSize}` = "S";

	/**
	 * Defines the background color of the desired image.
	 * If `colorScheme` is set to `Auto`, the avatar will be displayed with the `Accent6` color.
	 *
	 * @default "Auto"
	 * @public
	 */
	@property()
	colorScheme: `${AvatarColorScheme}` = "Auto";

	/**
	 * @private
	 */
	@property()
	_colorScheme: `${AvatarColorScheme}` = "Auto";

	/**
	 * Defines the text alternative of the component.
	 * If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.7
	 */
	@property()
	accessibleName?: string;

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
	@property({ type: Object })
	accessibilityAttributes: AvatarAccessibilityAttributes = {};

	@property({ noAttribute: true })
	forcedTabIndex?: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_hasImage = false;

	/**
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_imageLoadError = false;

	/**
	 * Receives the desired `<img>` tag
	 *
	 * **Note:** If you experience flickering of the provided image, you can hide the component until it is defined with the following CSS:<br/>
	 * `ui5-avatar:not(:defined) {`<br/>
	 * &nbsp;&nbsp;&nbsp;&nbsp;`visibility: hidden;`<br/>
	 * `}`
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@slot({ type: HTMLElement, "default": true })
	image!: DefaultSlot<Array<HTMLElement>>;

	/**
	 * Defines the optional badge that will be used for visual affordance.
	 *
	 * **Note:** While the slot allows for custom badges, to achieve
	 * the Fiori design, you can use the `ui5-tag` with `ui5-icon`
	 * in the corresponding `icon` slot, without text nodes.
	 * @public
	 * @since 1.7.0
	 */
	@slot()
	badge!: Slot<Array<HTMLElement>>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_handleResizeBound: ResizeObserverCallback;
	_onImageLoadBound: (e: Event) => void;
	_onImageErrorBound: (e: Event) => void;

	constructor() {
		super();

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
	get effectiveSize(): AvatarSize {
		// we read the attribute, because the "size" property will always have a default value
		return this.getAttribute("size") as AvatarSize || AvatarSize.S;
	}

	/**
	 * Returns the effective background color.
	 * @default "Auto"
	 * @private
	 */
	get effectiveBackgroundColor(): AvatarColorScheme {
		// we read the attribute, because the "background-color" property will always have a default value
		return this.getAttribute("color-scheme") as AvatarColorScheme || this._colorScheme;
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
		const validInitials = /^[a-zA-Zà-üÀ-Ü]{1,3}$/,
			areInitialsValid = this.initials && validInitials.test(this.initials);

		if (areInitialsValid) {
			return this.initials;
		}

		return null;
	}

	get accessibleNameText() {
		if (this.accessibleName) {
			return this.accessibleName;
		}

		const defaultLabel = Avatar.i18nBundle.getText(AVATAR_TOOLTIP);

		return this.initials ? `${defaultLabel} ${this.initials}`.trim() : defaultLabel;
	}

	get hasImage() {
		return !!this.image.length && !this._imageLoadError;
	}

	get imageEl(): HTMLImageElement | null {
		return this.image?.[0] instanceof HTMLImageElement ? this.image[0] : null;
	}

	get initialsContainer(): HTMLObjectElement | null {
		return this.getDomRef()!.querySelector(".ui5-avatar-initials");
	}

	get fallBackIconDomRef(): Icon | null {
		return this.getDomRef()!.querySelector(".ui5-avatar-icon-fallback");
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

		this.initialsContainer && ResizeHandler.register(this.initialsContainer,
			this._handleResizeBound);
	}

	onExitDOM() {
		this.initialsContainer && ResizeHandler.deregister(this.initialsContainer,
			this._handleResizeBound);

		this._detachImageEventHandlers();
	}

	handleResize() {
		if (this.initials && !this.icon) {
			this._checkInitials();
		}
	}

	_checkInitials() {
		const avatar = this.getDomRef()!;
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

	_onclick(e: MouseEvent) {
		e.stopPropagation();
		this._fireClick();
	}

	_onkeydown(e: KeyboardEvent) {
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

	_onkeyup(e: KeyboardEvent) {
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
		} else if (imgEl.complete && imgEl.naturalWidth > 0) {
			this._imageLoadError = false; // Already loaded
		} else {
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

	_onImageLoad(e: Event) {
		if (e.target !== this.imageEl) {
			(e.target as HTMLImageElement)?.removeEventListener("load", this._onImageLoadBound);
			return;
		}
		this._imageLoadError = false;
	}

	_onImageError(e: Event) {
		if (e.target !== this.imageEl) {
			(e.target as HTMLImageElement)?.removeEventListener("error", this._onImageErrorBound);
			return;
		}
		this._imageLoadError = true;
	}

	get accessibilityInfo() {
		return {
			role: this._role as AriaRole,
			type: this.interactive ? Avatar.i18nBundle.getText(AVATAR_TYPE_BUTTON) : Avatar.i18nBundle.getText(AVATAR_TYPE_IMAGE),
			description: this.accessibleNameText,
			disabled: this.disabled,
		};
	}
}

Avatar.define();

export default Avatar;
export type {
	AvatarAccessibilityAttributes,
};
