import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TimelineSortOrder from "./types/TimelineSortOrder.js";
import type TimelineFilterOption from "./TimelineFilterOption.js";
import "@ui5/webcomponents-icons/dist/sort-descending.js";
import "@ui5/webcomponents-icons/dist/add-filter.js";
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
 * @since 2.22.0
 */
declare class TimelineHeaderBar extends UI5Element {
    eventDetails: {
        "search": TimelineHeaderBarSearchEventDetail;
        "filter": TimelineHeaderBarFilterEventDetail;
        "sort": TimelineHeaderBarSortEventDetail;
    };
    /**
     * Shows the search input field.
     * @default false
     * @public
     */
    showSearch: boolean;
    /**
     * Shows the filter button.
     * @default false
     * @public
     */
    showFilter: boolean;
    /**
     * Shows the sort button.
     * @default false
     * @public
     */
    showSort: boolean;
    /**
     * The current filter category label.
     * @default ""
     * @public
     */
    filterBy: string;
    /**
     * The current search value.
     * @default ""
     * @public
     */
    searchValue: string;
    /**
     * The current sort order.
     * @default "Ascending"
     * @public
     */
    sortOrder: `${TimelineSortOrder}`;
    /**
     * Controls the filter dialog visibility.
     * @private
     */
    _filterDialogOpen: boolean;
    /**
     * Filter options to display in the filter dialog.
     * @public
     */
    filterOptions: Slot<TimelineFilterOption>;
    static i18nBundle: I18nBundle;
    get _headerBarAccessibleName(): string;
    get _searchPlaceholder(): string;
    get _searchAccessibleName(): string;
    get _filterAccessibleName(): string;
    get _sortAccessibleName(): string;
    get _sortTooltip(): string;
    get _sortIcon(): string;
    get _filterIcon(): string;
    get _filterDialogTitle(): string;
    get _filterDialogOkText(): string;
    get _filterDialogCancelText(): string;
    _onSearchInput(e: CustomEvent): void;
    _onFilterClick(): void;
    _onFilterDialogConfirm(): void;
    _onFilterDialogCancel(): void;
    _onFilterDialogClose(): void;
    _onSortClick(): void;
}
export default TimelineHeaderBar;
export type { TimelineHeaderBarSearchEventDetail, TimelineHeaderBarFilterEventDetail, TimelineHeaderBarSortEventDetail, };
