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
 * For the `ui5-sort-item`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents-fiori/dist/SortItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
@customElement("ui5-sort-item")
class SortItem extends UI5Element {
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

SortItem.define();

export default SortItem;
