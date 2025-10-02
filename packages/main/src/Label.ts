import UI5Element, { customElement, property, i18n, jsxRenderer } from "@ui5/webcomponents-base";
import type { I18nBundle } from "@ui5/webcomponents-base";
import type WrappingType from "./types/WrappingType.js";
import { LABEL_COLON } from "./generated/i18n/i18n-defaults.js";

// Template
import LabelTemplate from "./LabelTemplate.js";

// Styles
import labelCss from "./generated/themes/Label.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-label` is a component used to represent a label for elements like input, textarea, select.
 * The `for` property of the `ui5-label` must be the same as the id attribute of the related input element.
 * Screen readers read out the label, when the user focuses the labelled control.
 *
 * The `ui5-label` appearance can be influenced by properties,
 * such as `required` and `wrappingType`.
 * The appearance of the Label can be configured in a limited way by using the design property.
 * For a broader choice of designs, you can use custom styles.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Label";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
@customElement({
	tag: "ui5-label",
	renderer: jsxRenderer,
	template: LabelTemplate,
	styles: labelCss,
	languageAware: true,
})
class Label extends UI5Element {
	/**
	 * Defines the labeled input by providing its ID.
	 *
	 * **Note:** Can be used with both `ui5-input` and native input.
	 * @default undefined
	 * @public
	 */
	@property()
	for?: string;

	/**
	 * Defines whether colon is added to the component text.
	 *
	 * **Note:** Usually used in forms.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showColon = false;

	/**
	 * Defines whether an asterisk character is added to the component text.
	 *
	 * **Note:** Usually indicates that user input (bound with the `for` property) is required.
	 * In that case the `required` property of
	 * the corresponding input should also be set.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Defines how the text of a component will be displayed when there is not enough space.
	 *
	 * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
	 * @default "Normal"
	 * @public
	 */
	@property()
	wrappingType: `${WrappingType}` = "Normal";

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_onclick() {
		if (!this.for) {
			return;
		}

		const elementToFocus = (this.getRootNode() as HTMLElement).querySelector(`[id="${this.for}"]`) as HTMLElement;
		if (elementToFocus) {
			elementToFocus.focus();
		}
	}

	get _colonSymbol() {
		return Label.i18nBundle.getText(LABEL_COLON);
	}
}

Label.define();

export default Label;
