import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type FilterItemOption from "./FilterItemOption.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-filter-item` component defines the filtering criteria for data in `ui5-view-settings-dialog`.
 * It represents a single filter category that contains multiple filter options that users can select.
 *
 * ### Usage
 *
 * The `ui5-filter-item` is used within the `ui5-view-settings-dialog` to provide filtering options.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/FilterItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
@customElement("ui5-filter-item")
class FilterItem extends UI5Element {
	/**
	 * Defines the text of the filter item.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the additional text of the filter item.
	 * This text is typically used to show the number of selected filter options within this category.
	 * @default undefined
	 * @public
	 */
	@property()
	additionalText?: string;

	/**
	 * Defines the filter options available for this filter category.
	 * @public
	 */
	@slot()
	values!: Array<FilterItemOption>;
}

FilterItem.define();

export default FilterItem;
