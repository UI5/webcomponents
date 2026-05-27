import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-filter-item-option` component defines individual filter values within a `ui5-filter-item`.
 * It represents a single selectable option that users can choose to filter data.
 *
 * ### Usage
 *
 * The `ui5-filter-item-option` is used as a child component within `ui5-filter-item` in the context
 * of `ui5-view-settings-dialog`. Each option represents a specific value that can be used for filtering
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/FilterItemOption.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
@customElement("ui5-filter-item-option")
class FilterItemOption extends UI5Element {
	/**
	 * Defines the text of the filter option.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines if the filter option is selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;
}

FilterItemOption.define();

export default FilterItemOption;
