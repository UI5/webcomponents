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
 * ### Usage
 *
 * For the `ui5-filter-item`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents-fiori/dist/FilterItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
@customElement("ui5-filter-item")
class FilterItem extends UI5Element {
	/**
	 * Defines the text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the additional text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	additionalText?: string;

	/**
	 * Defines the `values` list.
	 * @public
	 */
	@slot()
	values!: Array<FilterItemOption>;
}

FilterItem.define();

export default FilterItem;
