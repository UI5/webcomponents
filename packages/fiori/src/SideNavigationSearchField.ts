import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SearchField from "./SearchField.js";
import SearchFieldTemplate from "./SearchFieldTemplate.js";
import SideNavigationSearchFieldCss from "./generated/themes/SideNavigationSearchField.css.js";
import { SIDE_NAVIGATION_SEARCH_FIELD_PLACEHOLDER } from "./generated/i18n/i18n-defaults.js";

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
	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	get _effectivePlaceholder(): string | undefined {
		return this.placeholder || SideNavigationSearchField.i18nBundle.getText(SIDE_NAVIGATION_SEARCH_FIELD_PLACEHOLDER);
	}
}

SideNavigationSearchField.define();

export default SideNavigationSearchField;
