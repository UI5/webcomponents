import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, slot,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
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
	@slot({ type: HTMLElement, "default": true, individualSlots: true })
	items!: Array<FilterBarItem>;

	_handleResizeBound: ResizeObserverCallback;

	constructor() {
		super();
		this._handleResizeBound = this._handleResize.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this.getDomRef()!, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.getDomRef()!, this._handleResizeBound);
	}

	_handleResize() {
		const itemsGap = 16,
			filterbar = this.getDomRef()!,
			buttonsContainer = filterbar.querySelector(".ui5-filterbar-buttons") as HTMLElement,
			basicSearch = filterbar.querySelector(".ui5-filterbar-basic-search"),
			filterItems = filterbar.querySelectorAll(".ui5-filterbar-item"),
			firstItem = filterItems.length > 0 ? filterItems[0] : basicSearch,
			lastItem = filterItems.length > 0
				? filterItems[filterItems.length - 1]
				: basicSearch;


		if (!firstItem || !lastItem || !buttonsContainer || filterbar?.offsetHeight === 0) {
			return;
		}

		const filterbarDim = filterbar.getBoundingClientRect(),
			buttonsContainerDim = buttonsContainer.getBoundingClientRect(),
			firstItemDim = firstItem.getBoundingClientRect(),
			lastItemDim = lastItem.getBoundingClientRect();
		let sButtonStyle = "";
		if (buttonsContainerDim.x - itemsGap >= lastItemDim.x + lastItemDim.width) {
			sButtonStyle = `margin-top: -${lastItemDim.height}px`;
		}
		const iLeftPadding = parseInt(getComputedStyle(filterbar).paddingLeft);
		const iRightPadding = parseInt(getComputedStyle(filterbar).paddingRight);

		if (filterbarDim.left + iLeftPadding === firstItemDim.left && filterbarDim.right - iRightPadding === firstItemDim.right) {
			sButtonStyle = "";
		}
		buttonsContainer.style = sButtonStyle;

		if (firstItemDim.y === lastItemDim.y) {
			filterbar.classList.add("ui5-filterbar-layout-one-line");
		} else {
			filterbar.classList.remove("ui5-filterbar-layout-one-line");
		}
	}
}

FilterBar.define();

export default FilterBar;
