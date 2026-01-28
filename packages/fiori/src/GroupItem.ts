import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-group-item` component defines the grouping criteria for data in `ui5-view-settings-dialog`.
 * It represents a single group option that users can select to organize data into logical groups.
 *
 * ### Usage
 *
 * The `ui5-group-item` is used within the `ui5-view-settings-dialog` to provide grouping options.
 * Each group item represents a column or field by which data can be grouped.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/GroupItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 2.15.0
 * @public
 */
@customElement("ui5-group-item")
class GroupItem extends UI5Element {
	/**
	 * Defines the text of the group item.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines if the group item is selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;
}

GroupItem.define();

export default GroupItem;
