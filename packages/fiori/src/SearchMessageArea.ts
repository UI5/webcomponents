import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SearchMessageAreaTemplate from "./SearchMessageAreaTemplate.js";
import SearchMessageAreaStyles from "./generated/themes/SearchMessageArea.css.js";

/**
 * @class
 * `import "@ui5/webcomponents-fiori/dist/SearchMessageArea.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.9.0
 * @experimental
 */
@customElement({
	tag: "ui5-search-message-area",
	languageAware: true,
	styles: SearchMessageAreaStyles,
	renderer: jsxRenderer,
	template: SearchMessageAreaTemplate,
})

class SearchMessageArea extends UI5Element {
	/**
	 * Defines the text to be displayed.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the description text to be displayed.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	description?: string;
}

SearchMessageArea.define();

export default SearchMessageArea;
