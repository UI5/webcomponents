import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SearchField from "./SearchField.js";
import SearchFieldTemplate from "./SearchFieldTemplate.js";
import SideNavigationSearchFieldCss from "./generated/themes/SideNavigationSearchField.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-side-navigation-search-field` is a search field, used to filter the items of a `ui5-side-navigation`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSearchField.js";`
 *
 * @constructor
 * @extends SearchField
 * @private
 */
@customElement({
	tag: "ui5-side-navigation-search-field",
	languageAware: true,
	renderer: jsxRenderer,
	template: SearchFieldTemplate,
	styles: [
		SearchField.styles,
		SideNavigationSearchFieldCss,
	],
})
class SideNavigationSearchField extends SearchField {
}

SideNavigationSearchField.define();

export default SideNavigationSearchField;
