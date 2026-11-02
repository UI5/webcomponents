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
	FILTERBAR_RESET_BUTTON,
	FILTERBAR_SEARCH_PLACEHOLDER,
} from "./generated/i18n/i18n-defaults.js";

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
 * Fired when the filter-configuration ("Filters") button is pressed, to toggle the
 * AdaptFiltersDialog or the filter area.
 *
 * @public
 */
@event("toggle-filters")

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

/**
 * Fired when the "Reset" button is pressed.
 *
 * @public
 */
@event("reset")

/**
 * Fired when the basic search input value changes.
 *
 * @param {string} value - The current search input value
 * @public
 */
@event("search")

class FilterBar extends UI5Element {
	eventDetails!: {
		"go": void;
		"toggle-filters": void;
		"restore": void;
		"clear": void;
		"reset": void;
		"search": { value: string };
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
	 * Defines whether the "Go" button is shown.
	 *
	 * @default true
	 * @public
	 */
	@property({ type: Boolean })
	showGoOnFB = true;

	/**
	 * Defines whether the filter-configuration ("Filters") button is hidden.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideFilterConfiguration = false;

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
	 * Defines whether the "Reset" button is shown.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showResetButton = false;

	/**
	 * Defines whether the toolbar (action buttons) is hidden. When hidden, filters are always visible.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideToolbar = false;

	/**
	 * Defines whether the toggle-filters button is hidden.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideToggleFiltersButton = false;

	/**
	 * Defines whether the filter area is collapsed.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	filterBarCollapsed = false;

	/**
	 * Defines whether reordering of filters is enabled.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	enableReordering = false;

	/**
	 * Defines the width of each filter item container.
	 *
	 * @default "13.125rem"
	 * @public
	 */
	@property()
	filterContainerWidth = "13.125rem";

	/**
	 * Overrides the active-filters count shown in the Filters button badge.
	 * A negative value (the default) means the count is derived from the items
	 * visible in the FilterBar; any value `>= 0` is used verbatim.
	 *
	 * @default -1
	 * @public
	 */
	@property({ type: Number })
	activeFiltersCount = -1;

	/**
	 * Defines the header content shown above the filter items.
	 *
	 * @public
	 */
	@slot()
	header!: Array<HTMLElement>;

	/**
	 * Defines the search field rendered as the first item.
	 * When populated, it is rendered instead of the internal basic search input.
	 *
	 * @public
	 */
	@slot()
	search!: Array<HTMLElement>;

	/**
	 * Defines the filter items displayed in the filter bar.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement, "default": true, individualSlots: true, invalidateOnChildChange: true,
	})
	items!: Array<FilterBarItem>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	onEnterDOM() {
		this.addEventListener("token-delete", this._handleTokenDelete as EventListener);
	}

	onExitDOM() {
		this.removeEventListener("token-delete", this._handleTokenDelete as EventListener);
	}

	_handleTokenDelete = (e: CustomEvent) => {
		const tokens: Array<Element> = e.detail?.tokens || [];
		tokens.forEach(token => token.parentNode?.removeChild(token));
	};

	/**
	 * Programmatically fires the "go" event (same as pressing the Go button).
	 * @public
	 */
	go() {
		this.fireDecoratorEvent("go");
	}

	/**
	 * Handles the "Go" button press.
	 * @private
	 */
	_handleGoPress() {
		this.fireDecoratorEvent("go");
	}

	/**
	 * Handles the basic search input event and fires the "search" event.
	 * @private
	 */
	_handleSearch(e: CustomEvent) {
		const input = e.target as any;
		this.fireDecoratorEvent("search", { value: input.value || "" });
	}

	get _activeFilterCount(): number {
		if (this.activeFiltersCount >= 0) {
			return this.activeFiltersCount;
		}
		return this.items.filter(item => !item.hidden && !item.hiddenInFilterBar).length;
	}

	/**
	 * Handles the filter-configuration ("Filters") button press.
	 * @private
	 */
	_handleToggleFilters() {
		this.fireDecoratorEvent("toggle-filters");
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

	/**
	 * Handles the "Reset" button press.
	 * @private
	 */
	_handleResetPress() {
		this.fireDecoratorEvent("reset");
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

	get _resetButtonText() {
		return FilterBar.i18nBundle.getText(FILTERBAR_RESET_BUTTON);
	}

	get _searchPlaceholder() {
		return FilterBar.i18nBundle.getText(FILTERBAR_SEARCH_PLACEHOLDER);
	}
}

FilterBar.define();

export default FilterBar;
