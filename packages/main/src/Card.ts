import UI5Element, { type DefaultSlot, type Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import CardTemplate from "./CardTemplate.js";

import {
	ARIA_ROLEDESCRIPTION_CARD,
	ARIA_LABEL_CARD_CONTENT,
} from "./generated/i18n/i18n-defaults.js";
import type CardHeader from "./CardHeader.js";

// Styles
import cardCss from "./generated/themes/Card.css.js";

/**
 * @class
 * ### Overview
 *
 * The `ui5-card` is a component that represents information in the form of a
 * tile with separate header and content areas.
 * The content area of a `ui5-card` can be arbitrary HTML content.
 * The header can be used through slot `header`. For which there is a `ui5-card-header` component to achieve the card look and feel.
 *
 * Note: We recommend the usage of `ui5-card-header` for the header slot, so advantage can be taken for keyboard handling, styling and accessibility.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Card.js";`
 *
 * `import "@ui5/webcomponents/dist/CardHeader.js";` (for `ui5-card-header`)
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart root - Used to style the root DOM element of the card component
 * @csspart content - Used to style the content of the card
 */
@customElement({
	tag: "ui5-card",
	languageAware: true,
	renderer: jsxRenderer,
	template: CardTemplate,
	styles: cardCss,
})
class Card extends UI5Element {
	/**
	 * Defines the accessible name of the component, which is used as the name of the card region and should be unique per card.
	 *
	 * **Note:** `accessibleName` should be always set, unless `accessibleNameRef` is set.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.16
	*/
	@property()
	accessibleName?: string;

	/**
	 * Defines the IDs of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.16
	*/
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the content of the component.
	 * @public
	*/
	@slot({ type: HTMLElement, "default": true })
	content!: DefaultSlot<Array<HTMLElement>>;

	/**
	 * Defines the header of the component.
	 *
	 * **Note:** Use `ui5-card-header` for the intended design.
	 * @since 1.0.0-rc.15
	 * @public
	*/
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	header!: Slot<Array<CardHeader>>;

	/**
	 * Defines if a loading indicator would be displayed over the card.
	 * @default false
	 * @public
	 * @since 2.1.0
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will show up for this card.
	 * @default 1000
	 * @public
	 * @since 2.1.0
	 */
	@property({ type: Number })
	loadingDelay = 1000;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get _hasHeader() {
		return !!this.header.length;
	}

	get _getAriaLabel() {
		const effectiveAriaLabelText = getEffectiveAriaLabelText(this),
			effectiveAriaLabel = effectiveAriaLabelText ? ` ${effectiveAriaLabelText}` : "";
		return Card.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD) + effectiveAriaLabel;
	}

	get _ariaCardContentLabel() {
		return Card.i18nBundle.getText(ARIA_LABEL_CARD_CONTENT);
	}
}

Card.define();

export default Card;
