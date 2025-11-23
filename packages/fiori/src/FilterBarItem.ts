import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, slot } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type Label from "@ui5/webcomponents/dist/Label.js";

// Template
import FilterBarItemTemplate from "./FilterBarItemTemplate.js";

// Styles
import FilterBarItemCss from "./generated/themes/FilterBarItem.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-filterbar-item` component represents a single filter item within the `ui5-filterbar`.
 * It is used to define individual filter criteria that can be applied to data.
 *
 * ### Usage
 *
 * The `ui5-filterbar-item` is used as a child element of `ui5-filterbar` to provide filtering options.
 * Each filter bar item represents a specific filter criterion.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/FilterBarItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
@customElement({
	tag: "ui5-filterbar-item",
	renderer: jsxRenderer,
	styles: FilterBarItemCss,
	template: FilterBarItemTemplate,
})
class FilterBarItem extends UI5Element {
	/**
	 * Defines the label of the filter item.
	 *
	 * @public
	 */
	@slot()
	label!: Array<Label>;

	/**
	 * Defines the control element for the filter item.
	 * This can be any UI5 Web Component such as Input, Select, DatePicker, etc. or any HTML input element.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	control!: Array<HTMLElement>;
}

FilterBarItem.define();

export default FilterBarItem;
