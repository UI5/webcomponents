import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, slot, property, i18n,
} from "@ui5/webcomponents-base/dist/decorators.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	FILTERBAR_GO_BUTTON,
	FILTERBAR_FILTERS_BUTTON,
	FILTERBAR_RESTORE_BUTTON,
	FILTERBAR_CLEAR_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

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

/**
 * Fired when the "Go" button is pressed.
 *
 * @public
 */
@event("go")

/**
 * Fired when the "Filters" button is pressed.
 *
 * @public
 */
@event("filters-press")

/**
 * Fired when the "Restore" button is pressed.
 *
 * @public
 */
@event("restore")

/**
 * Fired when the "Clear" button is pressed.
 *
 * @public
 */
@event("clear")

class FilterBar extends UI5Element {
	eventDetails!: {
		"go": void;
		"filters-press": void;
		"restore": void;
		"clear": void;
	};

	/**
	 * Defines, if the basic search field is shown.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showBasicSearch = false;

	/**
	 * Defines whether the "Go" button is hidden.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideGoOnFB = false;

	/**
	 * Defines whether the "Filters" button is hidden.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideFiltersOnFB = false;

	/**
	 * Defines whether the "Restore" button is shown.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showRestoreOnFB = false;

	/**
	 * Defines whether the "Clear" button is shown.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showClearOnFB = false;

	/**
	 * Defines the filter items displayed in the filter bar.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, individualSlots: true })
	items!: Array<FilterBarItem>;

	_handleResizeBound: ResizeObserverCallback;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	constructor() {
		super();
		this._handleResizeBound = this._handleResize.bind(this);
	}

	/**
	 * Handles the "Go" button press.
	 * @private
	 */
	_handleGoPress() {
		this.fireDecoratorEvent("go");
	}

	/**
	 * Handles the "Filters" button press.
	 * @private
	 */
	_handleFiltersPress() {
		this.fireDecoratorEvent("filters-press");
	}

	/**
	 * Handles the "Restore" button press.
	 * @private
	 */
	_handleRestorePress() {
		this.fireDecoratorEvent("restore");
	}

	/**
	 * Handles the "Clear" button press.
	 * @private
	 */
	_handleClearPress() {
		this.fireDecoratorEvent("clear");
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
		buttonsContainer.setAttribute("style", sButtonStyle);

		if (firstItemDim.y === lastItemDim.y) {
			filterbar.classList.add("ui5-filterbar-layout-one-line");
		} else {
			filterbar.classList.remove("ui5-filterbar-layout-one-line");
		}
	}

	get _goButtonText() {
		return FilterBar.i18nBundle.getText(FILTERBAR_GO_BUTTON);
	}

	get _filtersButtonText() {
		return FilterBar.i18nBundle.getText(FILTERBAR_FILTERS_BUTTON);
	}

	get _restoreButtonText() {
		return FilterBar.i18nBundle.getText(FILTERBAR_RESTORE_BUTTON);
	}

	get _clearButtonText() {
		return FilterBar.i18nBundle.getText(FILTERBAR_CLEAR_BUTTON);
	}
}

FilterBar.define();

export default FilterBar;
