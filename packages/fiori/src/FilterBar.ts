import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, slot,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type FilterBarItem from "./FilterBarItem.js";

// Template
import FilterBarTemplate from "./FilterBarTemplate.js";

// Styles
import FilterBarCss from "./generated/themes/FilterBar.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-filterbar` component is a container that holds filter items.
 * It provides a unified way to display and manage filters for data visualization components.
 *
 * ### Usage
 *
 * The `ui5-filterbar` is typically placed at the top of a page or table to allow users
 * to filter the displayed data. It contains `ui5-filterbar-item` elements that define
 * the available filter criteria.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/FilterBar.js";`
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-filterbar",
	renderer: jsxRenderer,
	styles: FilterBarCss,
	template: FilterBarTemplate,
})
class FilterBar extends UI5Element {
	/**
	 * Defines the filter items displayed in the filter bar.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: Array<FilterBarItem>;
}

FilterBar.define();

export default FilterBar;
