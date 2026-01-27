import UI5Element, { type DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import TextEmptyIndicatorMode from "./types/TextEmptyIndicatorMode.js";
// Template
import TextTemplate2 from "./TextTemplate.js";

import {
	EMPTY_INDICATOR_SYMBOL,
	EMPTY_INDICATOR_ACCESSIBLE_TEXT,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/Text.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-text` component displays text that can be used in any content area of an application.
 *
 * ### Usage
 *
 * - Use the `ui5-text` if you want to display text inside a form, table, or any other content area.
 * - Do not use the `ui5-text` if you need to reference input type of components (use ui5-label).
 *
 * ### Responsive behavior
 *
 * The `ui5-text` component is fully adaptive to all screen sizes.
 * By default, the text will wrap when the space is not enough.
 * In addition, the component supports truncation via the `max-lines` property,
 * by defining the number of lines the text should wrap before start truncating.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Text";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-text",
	renderer: jsxRenderer,
	template: TextTemplate2,
	styles,
})
class Text extends UI5Element {
	/**
	 * Defines the number of lines the text should wrap before it truncates.
	 * @default Infinity
	 * @public
	 */
	@property({ type: Number })
	maxLines: number = Infinity;

	/**
	 * Specifies if an empty indicator should be displayed when there is no text.
	 * @default "Off"
	 * @since 2.2.0
	 * @public
	 */
	@property()
	emptyIndicatorMode: `${TextEmptyIndicatorMode}` = "Off";

	/**
	 * Defines the text of the component.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: DefaultSlot<Array<Node>>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onBeforeRendering() {
		this.style.setProperty(getScopedVarName("--_ui5_text_max_lines"), `${this.maxLines}`);
	}

	get hasText() {
		return willShowContent(this.text);
	}

	get _renderEmptyIndicator() {
		return !this.hasText && this.emptyIndicatorMode === TextEmptyIndicatorMode.On;
	}

	get _emptyIndicatorAriaLabel() {
		return Text.i18nBundle.getText(EMPTY_INDICATOR_ACCESSIBLE_TEXT);
	}

	get _emptyIndicatorSymbol() {
		return Text.i18nBundle.getText(EMPTY_INDICATOR_SYMBOL);
	}
}

Text.define();

export default Text;
