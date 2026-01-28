import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getIllustrationDataSync, getIllustrationData } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import IllustrationMessageDesign from "./types/IllustrationMessageDesign.js";
import IllustrationMessageType from "./types/IllustrationMessageType.js";
import "./illustrations/BeforeSearch.js";

// Styles
import IllustratedMessageCss from "./generated/themes/IllustratedMessage.css.js";

// Template
import IllustratedMessageTemplate from "./IllustratedMessageTemplate.js";

const getEffectiveIllustrationName = (name: string): string => {
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

@customElement({
	tag: "ui5-illustrated-message",
	languageAware: true,
	themeAware: true,
	renderer: jsxRenderer,
	styles: IllustratedMessageCss,
	template: IllustratedMessageTemplate,
})
class IllustratedMessage extends UI5Element {
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
	@property()
	name = "BeforeSearch";

	/**
	* Determines which illustration breakpoint variant is used.
	*
	* As `IllustratedMessage` adapts itself around the `Illustration`, the other
	* elements of the component are displayed differently on the different breakpoints/illustration designs.
	* @default "Auto"
	* @public
	* @since 2.0.0
	*/
	@property()
	design: `${IllustrationMessageDesign}` = "Auto";

	/**
	* Defines the subtitle of the component.
	*
	* **Note:** Using this property, the default subtitle text of illustration will be overwritten.
	*
	* **Note:** Using `subtitle` slot, the default of this property will be overwritten.
	* @default undefined
	* @public
	*/
	@property()
	subtitleText?: string;

	/**
	* Defines the title of the component.
	*
	* **Note:** Using this property, the default title text of illustration will be overwritten.
	* @default undefined
	* @public
	*/
	@property()
	titleText?: string;

	/**
	* Receives id(or many ids) of the elements that label the component.
	* @default undefined
	* @public
	* @since 1.7.0
	*/
	@property()
	accessibleNameRef?: string;

	/**
	* Illustration breakpoint variant for the <code>Dot</code> design.
	*
	* @private
	* @since 1.24.0
	*/
	@property({ noAttribute: true })
	dotSvg?: string;

	/**
	* Illustration breakpoint variant for the <code>Spot</code> design.
	*
	* @private
	* @since 1.9.0
	*/
	@property({ noAttribute: true })
	spotSvg?: string;

	/**
	* Illustration breakpoint variant for the `Scene` design.
	* @private
	* @since 1.9.0
	*/
	@property({ noAttribute: true })
	sceneSvg?: string;

	/**
	* Illustration breakpoint variant for the `Dialog` design.
	* @private
	* @since 1.9.0
	*/
	@property({ noAttribute: true })
	dialogSvg?: string;

	/**
	* Template function for the Dot design (safe variant).
	* @private
	* @since 2.16.0
	*/
	@property({ noAttribute: true })
	dotTemplate?: object;

	/**
	* Template function for the Spot design (safe variant).
	* @private
	* @since 2.16.0
	*/
	@property({ noAttribute: true })
	spotTemplate?: object;

	/**
	* Template function for the Scene design (safe variant).
	* @private
	* @since 2.16.0
	*/
	@property({ noAttribute: true })
	sceneTemplate?: object;

	/**
	* Template function for the Dialog design (safe variant).
	* @private
	* @since 2.16.0
	*/
	@property({ noAttribute: true })
	dialogTemplate?: object;

	/**
	* Determinates what is the current media of the component based on its width.
	* @private
	*/
	@property()
	media?: string;

	/**
 	* Defines whether the illustration is decorative.
	*
	* When set to `true`, the attributes `role="presentation"` and `aria-hidden="true"` are applied to the SVG element.
	* @default false
	* @public
 	* @since 2.10.0
	*/
	@property({ type: Boolean })
	decorative = false;

	/**
	* Defines the title of the component.
	*
	* **Note:** Using this slot, the default title text of illustration and the value of `title` property will be overwritten.
	* @public
	* @since 1.7.0
	*/
	@slot({ type: HTMLElement })
	title!: Slot<HTMLElement[]> & string;

	/**
	* Defines the subtitle of the component.
	*
	* **Note:** Using this slot, the default subtitle text of illustration and the value of `subtitleText` property will be overwritten.
	* @public
	* @since 1.0.0-rc.16
	*/
	@slot({ type: HTMLElement })
	subtitle!: Slot<HTMLElement[]>;

	/**
	* Defines the component actions.
	*
	* **Note:** Not displayed when the `design` property is set to `Base`.
	* @public
	*/
	@slot({ type: HTMLElement, "default": true })
	actions!: DefaultSlot<IButton[]>;

	illustrationTitle?: string;
	illustrationSubtitle?: string;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;
	_lastKnownOffsetWidthForMedia: Record<string, number>;
	_lastKnownOffsetHeightForMedia: Record<string, number>;
	_lastKnownMedia: string;
	_handleResize: ResizeObserverCallback;

	constructor() {
		super();

		this._handleResize = this.handleResize.bind(this);
		// this will store the last known offsetWidth of the IllustratedMessage DOM node for a given media (e.g. "Spot")
		this._lastKnownOffsetWidthForMedia = {};
		this._lastKnownOffsetHeightForMedia = {};
		// this will store the last known media, in order to detect if IllustratedMessage has been hidden by expand/collapse container
		this._lastKnownMedia = "base";
	}

	static get BREAKPOINTS() {
		return {
			DIALOG: 681,
			SPOT: 360,
			DOT: 260,
			BASE: 160,
		};
	}

	static get BREAKPOINTS_HEIGHT() {
		return {
			DIALOG: 415,
			SPOT: 284,
			DOT: 207,
			BASE: 61,
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
			console.warn(`The illustration "${effectiveName!}" does not exist. The default illustration "${IllustrationMessageType.BeforeSearch}" is loaded instead.`);
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

		this.illustrationTitle = IllustratedMessage.i18nBundle.getText(illustrationData!.title);
		this.illustrationSubtitle = IllustratedMessage.i18nBundle.getText(illustrationData!.subtitle);

		if (this.design !== IllustrationMessageDesign.Auto) {
			this._handleCustomSize();
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	handleResize() {
		if (this.design !== IllustrationMessageDesign.Auto) {
			this._adjustHeightToFitContainer();
			return;
		}

		this._applyMedia();
		window.requestAnimationFrame(this._adjustHeightToFitContainer.bind(this));
	}

	_applyMedia(heightChange?: boolean) {
		const currOffsetWidth = this.offsetWidth,
			currOffsetHeight = this.offsetHeight;

		const design = heightChange ? currOffsetHeight : currOffsetWidth,
			oBreakpounts = heightChange ? IllustratedMessage.BREAKPOINTS_HEIGHT : IllustratedMessage.BREAKPOINTS;
		let newMedia = "";

		if (design <= oBreakpounts.BASE) {
			newMedia = IllustratedMessage.MEDIA.BASE;
		} else if (design <= oBreakpounts.DOT) {
			newMedia = IllustratedMessage.MEDIA.DOT;
		} else if (design <= oBreakpounts.SPOT) {
			newMedia = IllustratedMessage.MEDIA.SPOT;
		} else if (design <= oBreakpounts.DIALOG) {
			newMedia = IllustratedMessage.MEDIA.DIALOG;
		} else {
			newMedia = IllustratedMessage.MEDIA.SCENE;
		}
		const lastKnownOffsetWidth = this._lastKnownOffsetWidthForMedia[newMedia],
			lastKnownOffsetHeight = this._lastKnownOffsetHeightForMedia[newMedia];
		 // prevents infinite resizing, when same width is detected for the same media,
		 // excluding the case in which, the control is placed inside expand/collapse container
		if (!(lastKnownOffsetWidth && currOffsetWidth === lastKnownOffsetWidth
			&& lastKnownOffsetHeight && currOffsetHeight === lastKnownOffsetHeight)
			|| this._lastKnownOffsetWidthForMedia[this._lastKnownMedia] === 0
			|| this._lastKnownOffsetHeightForMedia[this._lastKnownMedia] === 0) {
			this.media = newMedia;
			this._lastKnownOffsetWidthForMedia[newMedia] = currOffsetWidth;
			this._lastKnownOffsetHeightForMedia[newMedia] = currOffsetHeight;
			this._lastKnownMedia = newMedia;
		}
	}

	_setSVGAccAttrs() {
		const svg = this.shadowRoot!.querySelector(".ui5-illustrated-message-illustration svg");

		if (!svg) {
			return;
		}

		if (this.decorative) {
			svg.setAttribute("role", "presentation");
			svg.setAttribute("aria-hidden", "true");
			svg.removeAttribute("aria-label");
		} else {
			svg.removeAttribute("role");
			svg.removeAttribute("aria-hidden");

			// Set aria-label only when not decorative and text exists
			if (this.ariaLabelText) {
				svg.setAttribute("aria-label", this.ariaLabelText);
			} else {
				svg.removeAttribute("aria-label");
			}
		}
	}

	_adjustHeightToFitContainer() {
		const illustrationWrapper = <HTMLElement> this.shadowRoot!.querySelector(".ui5-illustrated-message-illustration"),
			illustration = illustrationWrapper.querySelector("svg");

		if (illustration) {
			illustrationWrapper.classList.toggle("ui5-illustrated-message-illustration-fit-content", false);
			if (this.getDomRef()!.scrollHeight > this.getDomRef()!.offsetHeight) {
				illustrationWrapper.classList.toggle("ui5-illustrated-message-illustration-fit-content", true);
				this._applyMedia(true /* height change */);
			}
		}
	}

	onAfterRendering() {
		this._setSVGAccAttrs();
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
			this.media = IllustratedMessage.MEDIA.BASE;
			return;
		case IllustrationMessageDesign.Dot:
			this.media = IllustratedMessage.MEDIA.DOT;
			return;
		case IllustrationMessageDesign.Spot:
			this.media = IllustratedMessage.MEDIA.SPOT;
			return;
		case IllustrationMessageDesign.Dialog:
			this.media = IllustratedMessage.MEDIA.DIALOG;
			return;
		case IllustrationMessageDesign.ExtraSmall:
			this.media = IllustratedMessage.MEDIA.DOT;
			return;
		case IllustrationMessageDesign.Small:
			this.media = IllustratedMessage.MEDIA.SPOT;
			return;
		case IllustrationMessageDesign.Medium:
			this.media = IllustratedMessage.MEDIA.DIALOG;
			return;
		default:
			this.media = IllustratedMessage.MEDIA.SCENE;
		}
	}

	get ariaLabelText(): string | undefined {
		return getEffectiveAriaLabelText(this);
	}

	get effectiveIllustration(): string | object | undefined {
		switch (this.media) {
		case IllustratedMessage.MEDIA.DOT:
			return this.dotTemplate || this.dotSvg;
		case IllustratedMessage.MEDIA.SPOT:
			return this.spotTemplate || this.spotSvg;
		case IllustratedMessage.MEDIA.DIALOG:
			return this.dialogTemplate || this.dialogSvg;
		case IllustratedMessage.MEDIA.SCENE:
			return this.sceneTemplate || this.sceneSvg;
		default:
			return "";
		}
	}

	get hasFormattedSubtitle(): boolean {
		return !!this.subtitle.length;
	}

	get hasFormattedTitle(): boolean {
		return !!this.title.length;
	}

	get effectiveTitleText(): string | undefined {
		return this.titleText ? this.titleText : this.illustrationTitle;
	}

	get effectiveSubitleText(): string | undefined {
		return this.subtitleText ? this.subtitleText : this.illustrationSubtitle;
	}

	get hasTitle(): boolean {
		return !!(this.hasFormattedTitle || this.titleText || this.illustrationTitle);
	}

	get hasSubtitle(): boolean {
		return !!(this.hasFormattedSubtitle || this.subtitleText || this.illustrationSubtitle);
	}

	get hasActions(): boolean {
		return !!this.actions.length && this.media !== IllustratedMessage.MEDIA.BASE;
	}

	isValidIllustration(currentIllustration: string): boolean {
		currentIllustration = currentIllustration.startsWith("tnt/") ? currentIllustration.replace("tnt/", "Tnt") : currentIllustration.replace("fiori/", "");

		return currentIllustration in IllustrationMessageType;
	}
}

IllustratedMessage.define();

export default IllustratedMessage;
