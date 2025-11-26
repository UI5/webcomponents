import UI5Element, { customElement, property, slot, jsxRenderer, i18n, willShowContent, CustomElementsScopeUtils } from "@ui5/webcomponents-base";
import type { I18nBundle } from "@ui5/webcomponents-base";
import type TextEmptyIndicatorMode from "./types/TextEmptyIndicatorMode.js";
// Template
import TextTemplate2 from "./TextTemplate.js";

import { EMPTY_INDICATOR_SYMBOL, EMPTY_INDICATOR_ACCESSIBLE_TEXT } from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/Text.css.js";

const { getScopedVarName } = CustomElementsScopeUtils;

/**
 * @class
 *
 * <h3>Overview</h3>
 *
 * The `ui5-text` component displays text that can be used in any content area of an application.
 *
 * <h3>Usage</h3>
 *
 * - Use the `ui5-text` if you want to display text inside a form, table, or any other content area.
 * - Do not use the `ui5-text` if you need to reference input type of components (use ui5-label).
 *
 * <h3>Responsive behavior</h3>
 *
 * The `ui5-text` component is fully adaptive to all screen sizes.
 * By default, the text will wrap when the space is not enough.
 * In addition, the component supports truncation via the <code>max-lines</code> property,
 * by defining the number of lines the text should wrap before start truncating.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Text";</code>
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
	text!: Array<Node>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onBeforeRendering() {
		this.style.setProperty(getScopedVarName("--_ui5_text_max_lines"), `${this.maxLines}`);
	}

	get hasText() {
		return willShowContent(this.text);
	}

	get _renderEmptyIndicator() {
		return !this.hasText && this.emptyIndicatorMode === "On";
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
