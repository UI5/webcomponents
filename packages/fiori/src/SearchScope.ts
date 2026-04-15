import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ISearchScope } from "./SearchField.js";

/**
 * @class
 * The `ui5-search-scope` represents the options for the scope in `ui5-search`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @implements {ISearchScope}
 * @public
 * @since 2.9.0
 * @experimental
 */
@customElement("ui5-search-scope")
class SearchScope extends UI5Element implements ISearchScope {
	/**
	 * Defines the text of the component.
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines the value of the `ui5-search-scope`.
	 * Used for selection in Search scopes.
	 * @default undefined
	 * @public
	 */
	@property()
	value?: string;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

SearchScope.define();

export default SearchScope;
