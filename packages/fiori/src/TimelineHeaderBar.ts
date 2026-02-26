import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import type Select from "@ui5/webcomponents/dist/Select.js";
import type TimelineSortOrder from "./types/TimelineSortOrder.js";
import type TimelineFilterOption from "./TimelineFilterOption.js";

// Import icons to register them
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/sort-ascending.js";
import "@ui5/webcomponents-icons/dist/sort-descending.js";

import TimelineHeaderBarTemplate from "./TimelineHeaderBarTemplate.js";
import TimelineHeaderBarCss from "./generated/themes/TimelineHeaderBar.css.js";

import {
	TIMELINE_HEADER_BAR_ACCESSIBLE_NAME,
	TIMELINE_SEARCH_PLACEHOLDER,
	TIMELINE_SEARCH_ACCESSIBLE_NAME,
	TIMELINE_FILTER_ACCESSIBLE_NAME,
	TIMELINE_SORT_ASCENDING_TOOLTIP,
	TIMELINE_SORT_DESCENDING_TOOLTIP,
	TIMELINE_SORT_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";

type TimelineHeaderBarSearchEventDetail = {
	value: string;
};

type TimelineHeaderBarFilterEventDetail = {
	filterBy: string;
	selectedOptions: string[];
};

type TimelineHeaderBarSortEventDetail = {
	sortOrder: string;
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-timeline-header-bar` component provides search, filter, and sort functionality
 * for the `ui5-timeline` component. It is designed to be slotted into the `header-bar` slot
 * of the Timeline.
 *
 * ### Usage
 *
 * The component fires events (`search`, `filter`, `sort`) that the application should handle
 * to filter/sort the timeline items. The Timeline component itself does not perform any
 * filtering or sorting - this is the responsibility of the application.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/TimelineHeaderBar.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.8.0
 */
@customElement({
	tag: "ui5-timeline-header-bar",
	languageAware: true,
	renderer: jsxRenderer,
	template: TimelineHeaderBarTemplate,
	styles: TimelineHeaderBarCss,
})

/**
 * Fired when the user performs a search.
 *
 * @param {string} value The search value entered by the user.
 * @public
 */
@event("search", {
	bubbles: true,
})

/**
 * Fired when the user changes filter selection.
 *
 * @param {string} filterBy The filter category.
 * @param {string[]} selectedOptions The selected filter option texts.
 * @public
 */
@event("filter", {
	bubbles: true,
})

/**
 * Fired when the user changes sort order.
 *
 * @param {string} sortOrder The sort order ("Ascending" or "Descending").
 * @public
 */
@event("sort", {
	bubbles: true,
})

class TimelineHeaderBar extends UI5Element {
	eventDetails!: {
		"search": TimelineHeaderBarSearchEventDetail,
		"filter": TimelineHeaderBarFilterEventDetail,
		"sort": TimelineHeaderBarSortEventDetail,
	};

	/**
	 * Shows the search input field.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSearch = false;

	/**
	 * Shows the filter dropdown.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showFilter = false;

	/**
	 * Shows the sort button.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSort = false;

	/**
	 * Shows the filter by date option.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showFilterByDate = false;

	/**
	 * The current filter category label.
	 * @default ""
	 * @public
	 */
	@property()
	filterBy = "";

	/**
	 * The current search value.
	 * @default ""
	 * @public
	 */
	@property()
	searchValue = "";

	/**
	 * The current sort order.
	 * @default "None"
	 * @public
	 */
	@property()
	sortOrder: `${TimelineSortOrder}` = "None";

	/**
	 * Filter options to display in the filter dropdown.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
	filterOptions!: Slot<TimelineFilterOption>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	get _headerBarAccessibleName() {
		return TimelineHeaderBar.i18nBundle.getText(TIMELINE_HEADER_BAR_ACCESSIBLE_NAME);
	}

	get _searchPlaceholder() {
		return TimelineHeaderBar.i18nBundle.getText(TIMELINE_SEARCH_PLACEHOLDER);
	}

	get _searchAccessibleName() {
		return TimelineHeaderBar.i18nBundle.getText(TIMELINE_SEARCH_ACCESSIBLE_NAME);
	}

	get _filterAccessibleName() {
		return TimelineHeaderBar.i18nBundle.getText(TIMELINE_FILTER_ACCESSIBLE_NAME);
	}

	get _sortAccessibleName() {
		return TimelineHeaderBar.i18nBundle.getText(TIMELINE_SORT_ACCESSIBLE_NAME);
	}

	get _sortTooltip() {
		if (this.sortOrder === "Ascending") {
			return TimelineHeaderBar.i18nBundle.getText(TIMELINE_SORT_DESCENDING_TOOLTIP);
		}
		return TimelineHeaderBar.i18nBundle.getText(TIMELINE_SORT_ASCENDING_TOOLTIP);
	}

	get _sortIcon() {
		if (this.sortOrder === "Ascending") {
			return "sort-ascending";
		}
		if (this.sortOrder === "Descending") {
			return "sort-descending";
		}
		return "sort";
	}

	_onSearchInput(e: CustomEvent) {
		const value = (e.target as Input).value;
		this.searchValue = value;
		this.fireDecoratorEvent("search", { value });
	}

	_onFilterChange(e: CustomEvent) {
		const select = e.target as Select;
		const selectedOption = select.selectedOption;
		const selectedText = selectedOption?.textContent?.trim() || "";

		// Update the selected state of filter options
		this.filterOptions.forEach(option => {
			option.selected = option.text === selectedText;
		});

		const selectedOptions = this.filterOptions
			.filter(option => option.selected)
			.map(option => option.text);

		this.fireDecoratorEvent("filter", {
			filterBy: this.filterBy,
			selectedOptions,
		});
	}

	_onSortClick() {
		// Toggle sort order: None -> Ascending -> Descending -> Ascending
		if (this.sortOrder === "None" || this.sortOrder === "Descending") {
			this.sortOrder = "Ascending";
		} else {
			this.sortOrder = "Descending";
		}

		this.fireDecoratorEvent("sort", {
			sortOrder: this.sortOrder,
		});
	}
}

TimelineHeaderBar.define();

export default TimelineHeaderBar;
export type {
	TimelineHeaderBarSearchEventDetail,
	TimelineHeaderBarFilterEventDetail,
	TimelineHeaderBarSortEventDetail,
};
