import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-sort-item` component defines the sorting criteria for data in `ui5-view-settings-dialog`.
 * It represents a single sort option that users can select to organize data in ascending or descending order.
 *
 * ### Usage
 *
 * The `ui5-sort-item` is used within the `ui5-view-settings-dialog` to provide sorting options.
 * Each sort item represents a column or field by which data can be sorted.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SortItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
@customElement("ui5-sort-item")
class SortItem extends UI5Element {
	/**
	 * Defines the text of the sort item.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines if the sort item is selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;
}

SortItem.define();

export default SortItem;
