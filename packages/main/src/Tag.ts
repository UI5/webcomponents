import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import {
	isDesktop,
} from "@ui5/webcomponents-base/dist/Device.js";
import type { IIcon } from "./Icon.js";
import "@ui5/webcomponents-icons/dist/sys-help-2.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/information.js";
import type WrappingType from "./types/WrappingType.js";
import TagDesign from "./types/TagDesign.js";
import type TagSize from "./types/TagSize.js";
// Template
import TagTemplate from "./TagTemplate.js";

import {
	TAG_DESCRIPTION_TAG,
	TAG_ROLE_DESCRIPTION,
	TAG_ERROR,
	TAG_WARNING,
	TAG_SUCCESS,
	TAG_INFORMATION,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import tagCss from "./generated/themes/Tag.css.js";

/**
 * @class
 * ### Overview
 *
 * The `ui5-tag` is a component which serves
 * the purpose to attract the user attention to some piece
 * of information (state, quantity, condition, etc.).
 * It can contain icon and text information, and its design can be chosen from specific design types.
 *
 * ### Usage Guidelines
 *
 * - If the text is longer than the width of the component, it can wrap, or it can show ellipsis, depending on the `wrappingType` property.
  * - Colors can be semantic or not semantic.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Tag.js";`
 * @csspart root - Used to style the root element.
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
@customElement({
	tag: "ui5-tag",
	languageAware: true,
	renderer: jsxRenderer,
	template: TagTemplate,
	styles: tagCss,
})

/**
 * Fired when the user clicks on an interactive tag.
 *
 * **Note:** The event will be fired if the `interactive` property is `true`
 * @public
 * @since 1.22.0
 */
@event("click", {
	bubbles: true,
})
class Tag extends UI5Element {
	eventDetails!: {
		click: void;
	}
	/**
	 * Defines the design type of the component.
	 * @default "Neutral"
	 * @public
	 * @since 1.22.0
	 */
	@property()
	design: `${TagDesign}` = "Neutral"

	/**
	 * Defines the color scheme of the component.
	 * There are 10 predefined schemes.
	 * To use one you can set a number from `"1"` to `"10"`. The `colorScheme` `"1"` will be set by default.
	 * @default "1"
	 * @public
	 */
	@property()
	colorScheme = "1";

	/**
	 * Defines if the default state icon is shown.
	 * @default false
	 * @public
	 * @since 1.22.0
	 */
	@property({ type: Boolean })
	hideStateIcon = false;

	/**
	 * Defines if the component is interactive (focusable and pressable).
	 *
	 * @default false
	 * @public
	 * @since 1.22.0
	 */
	@property({ type: Boolean })
	interactive = false;

	/**
	 * Defines how the text of a component will be displayed when there is not enough space.
	 *
	 * **Note:** For option "Normal" the text will wrap and the
	 * words will not be broken based on hyphenation.
	 * @default "Normal"
	 * @public
	 * @since 1.22.0
	 */
	@property()
	wrappingType: `${WrappingType}` = "Normal";

	/**
	 * Defines predefined size of the component.
	 * @default "S"
	 * @public
	 * @since 2.0.0
	 */
	@property()
	size: `${TagSize}` = "S";

	/**
	 * Defines if the tag has an icon.
	 * @private
	 */
	@property({ type: Boolean })
	_hasIcon = false;

	/**
	 * Defines if the tag has only an icon (and no text).
	 * @private
	 */
	@property({ type: Boolean })
	_iconOnly = false;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: DefaultSlot<Node[]>;

	/**
	 * Defines the icon to be displayed in the component.
	 * @public
	 */
	@slot()
	icon!: Slot<IIcon[]>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	onBeforeRendering() {
		this._hasIcon = this.hasIcon || !!this._semanticIconName;
		this._iconOnly = this.iconOnly;
	}

	get _roleDescription() {
		return Tag.i18nBundle.getText(TAG_ROLE_DESCRIPTION);
	}

	get _valueState() {
		switch (this.design) {
		case TagDesign.Positive:
			return Tag.i18nBundle.getText(TAG_SUCCESS);
		case TagDesign.Negative:
			return Tag.i18nBundle.getText(TAG_ERROR);
		case TagDesign.Critical:
			return Tag.i18nBundle.getText(TAG_WARNING);
		case TagDesign.Information:
			return Tag.i18nBundle.getText(TAG_INFORMATION);
		}

		return undefined;
	}

	get hasText() {
		return willShowContent(this.text);
	}

	get hasIcon() {
		return !!this.icon.length;
	}

	get iconOnly() {
		return this.hasIcon && !this.hasText;
	}

	get _title() {
		return this.title || undefined;
	}

	get tagDescription() {
		if (this.interactive) {
			return undefined;
		}

		const valueState = this._valueState;
		let description = Tag.i18nBundle.getText(TAG_DESCRIPTION_TAG);

		if (valueState) {
			description = `${description} ${valueState}`;
		}

		return description;
	}

	get _semanticIconName() {
		if (this.hideStateIcon || this.hasIcon) {
			return null;
		}

		switch (this.design) {
		case TagDesign.Neutral:
			return "sys-help-2";
		case TagDesign.Positive:
			return "sys-enter-2";
		case TagDesign.Negative:
			return "error";
		case TagDesign.Critical:
			return "alert";
		case TagDesign.Information:
			return "information";
		default:
			return null;
		}
	}

	_onclick(e: Event) {
		e.stopPropagation();
		this.fireDecoratorEvent("click");
	}
}

Tag.define();

export default Tag;
