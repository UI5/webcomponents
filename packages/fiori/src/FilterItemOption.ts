import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * For the `ui5-filter-item-option`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents-fiori/dist/FilterItemOption.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
@customElement("ui5-filter-item-option")
class FilterItemOption extends UI5Element {
	/**
	 * Defines the text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines if the component is selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;
}

FilterItemOption.define();

export default FilterItemOption;
