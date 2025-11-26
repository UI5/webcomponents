import UI5Element, { customElement, property } from "@ui5/webcomponents-base";
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
	 * Indicates whether the item is selected
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

SearchScope.define();

export default SearchScope;
