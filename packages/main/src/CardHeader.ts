import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import CardHeaderTemplate from "./CardHeaderTemplate.js";

import {
	AVATAR_TOOLTIP,
	ARIA_ROLEDESCRIPTION_CARD_HEADER,
	ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import cardHeaderCss from "./generated/themes/CardHeader.css.js";

/**
 * @class
 * ### Overview
 *
 * The `ui5-card-header` is a component, meant to be used as a header of the `ui5-card` component.
 * It displays valuable information, that can be defined with several properties, such as: `titleText`, `subtitleText`, `additionalText`
 * and two slots: `avatar` and `action`.
 *
 * ### Keyboard handling
 * In case you enable `interactive` property, you can press the `ui5-card-header` by Space and Enter keys.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CardHeader";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 * @csspart root - Used to style the root DOM element of the CardHeader
 * @csspart title - Used to style the title of the CardHeader
 * @csspart subtitle - Used to style the subtitle of the CardHeader
 * @csspart additional-text - Used to style the additional text of the CardHeader
 */
@customElement({
	tag: "ui5-card-header",
	languageAware: true,
	renderer: jsxRenderer,
	template: CardHeaderTemplate,
	styles: cardHeaderCss,
})
/**
 * Fired when the component is activated by mouse/tap or by using the Enter or Space key.
 *
 * **Note:** The event would be fired only if the `interactive` property is set to true.
 * @public
 */
@event("click", {
	bubbles: true,
})
class CardHeader extends UI5Element {
	eventDetails!: {
		click: void
	}
	/**
	 * Defines the title text.
	 * @default undefined
	 * @public
	*/
	@property()
	titleText?: string;

	/**
	 * Defines the subtitle text.
	 * @default undefined
	 * @public
	*/
	@property()
	subtitleText?: string;

	/**
	 * Defines the additional text.
	 * @default undefined
	 * @public
	*/
	@property()
	additionalText?: string;

	/**
	 * Defines if the component would be interactive,
	 * e.g gets hover effect and `click` event is fired, when pressed.
	 * @default false
	 * @public
	*/
	@property({ type: Boolean })
	interactive = false;

	/**
	 * Define the `aria-level` attribute of the component
	 *
	 * **Note: ** If the interactive property is set, `aria-level` attribute is not rendered at all.
	 * @private
	 * @default 3
	*/
	@property({ type: Number })
	_ariaLevel = 3;

	@property({ type: Boolean, noAttribute: true })
	_headerActive = false;

	/**
	 * Defines an avatar image, displayed in the left most part of the header.
	 * @public
	*/
	@slot()
	avatar!: Slot<HTMLElement[]>;

	/**
	 * Defines an action, displayed in the right most part of the header.
	 * @public
	*/
	@slot()
	action!: Slot<HTMLElement[]>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	get _root() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-card-header")!;
	}

	get ariaRoleDescription() {
		return this.interactive ? CardHeader.i18nBundle.getText(ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER) : CardHeader.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD_HEADER);
	}

	get ariaRoleFocusableElement() {
		return this.interactive ? "button" : "group";
	}

	get ariaCardAvatarLabel() {
		return CardHeader.i18nBundle.getText(AVATAR_TOOLTIP);
	}

	get ariaLabelledBy() {
		const labels = [];

		if (this.titleText) {
			labels.push(`${this._id}-title`);
		}

		if (this.subtitleText) {
			labels.push(`${this._id}-subtitle`);
		}

		if (this.additionalText) {
			labels.push(`${this._id}-additionalText`);
		}

		if (this.hasAvatar) {
			labels.push(`${this._id}-avatar`);
		}

		return labels.length !== 0 ? labels.join(" ") : undefined;
	}

	get hasAvatar() {
		return !!this.avatar.length;
	}

	get hasAction() {
		return !!this.action.length;
	}

	_actionsFocusin() {
		this._root.classList.add("ui5-card-header-hide-focus");
	}

	_actionsFocusout() {
		this._root.classList.remove("ui5-card-header-hide-focus");
	}

	_click(e: MouseEvent) {
		// prevents the native browser "click" event from firing
		e.stopImmediatePropagation();

		if (this.interactive && this._root.contains(e.target as HTMLElement)) {
			this.fireDecoratorEvent("click");
		}
	}

	_keydown(e: KeyboardEvent) {
		if (!this.interactive || !this._root.contains(e.target as HTMLElement)) {
			return;
		}

		const enter = isEnter(e);
		const space = isSpace(e);

		this._headerActive = enter || space;

		if (enter) {
			this.fireDecoratorEvent("click");
			return;
		}

		if (space) {
			e.preventDefault();
		}
	}

	_keyup(e: KeyboardEvent) {
		if (!this.interactive || !this._root.contains(e.target as HTMLElement)) {
			return;
		}

		const space = isSpace(e);

		this._headerActive = false;

		if (space) {
			this.fireDecoratorEvent("click");
		}
	}
}

CardHeader.define();

export default CardHeader;
