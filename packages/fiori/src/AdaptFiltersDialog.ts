import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type Dialog from "@ui5/webcomponents/dist/Dialog.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";

import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/TabContainer.js";
import "@ui5/webcomponents/dist/Tab.js";
import "@ui5/webcomponents/dist/Toolbar.js";
import "@ui5/webcomponents/dist/ToolbarButton.js";
import "@ui5/webcomponents/dist/ToolbarSpacer.js";
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemCustom.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/hide.js";
import "@ui5/webcomponents-icons/dist/show.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/overflow.js";

import type FilterBarItem from "./FilterBarItem.js";

import {
	ADAPT_FILTERS_DIALOG_TITLE,
	ADAPT_FILTERS_DIALOG_LIST_TAB,
	ADAPT_FILTERS_DIALOG_GROUPS_TAB,
	ADAPT_FILTERS_DIALOG_FILTER_VALUES_VISIBILITY,
	ADAPT_FILTERS_DIALOG_SEARCH_PLACEHOLDER,
	ADAPT_FILTERS_DIALOG_EDIT_BUTTON,
	ADAPT_FILTERS_DIALOG_SORT_BUTTON,
	ADAPT_FILTERS_DIALOG_ADD_FILTER,
	ADAPT_FILTERS_DIALOG_OK_BUTTON,
	ADAPT_FILTERS_DIALOG_FILTER_BUTTON,
	ADAPT_FILTERS_DIALOG_CANCEL_BUTTON,
	ADAPT_FILTERS_DIALOG_RESET_BUTTON,
	ADAPT_FILTERS_DIALOG_UNGROUPED,
	ADAPT_FILTERS_DIALOG_VISIBILITY_TOOLTIP,
	ADAPT_FILTERS_DIALOG_REORDER_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";

// Template
import AdaptFiltersDialogTemplate from "./AdaptFiltersDialogTemplate.js";

// Styles
import AdaptFiltersDialogCss from "./generated/themes/AdaptFiltersDialog.css.js";

type AdaptFiltersDialogConfirmEventDetail = {
	selectedFilters: Array<FilterBarItem>;
	visibilityMap: Record<string, boolean>;
}

type AdaptFiltersDialogCancelEventDetail = {
	selectedFilters: Array<FilterBarItem>;
}

type AdaptFiltersDialogFilterEventDetail = {
	selectedFilters: Array<FilterBarItem>;
	visibilityMap: Record<string, boolean>;
}

type AdaptFiltersDialogFilterVisibilityChangeEventDetail = {
	filter: FilterBarItem;
	visible: boolean;
}

type AdaptFiltersDialogFilterRemoveEventDetail = {
	filter: FilterBarItem;
}

type AdaptFiltersDialogFilterAddEventDetail = {
	filterKey: string;
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-adapt-filters-dialog` component provides an advanced dialog for managing
 * filter visibility and organization in FilterBar. It supports two view modes:
 * - List view: Flat list of all filters
 * - Groups view: Filters organized by categories
 *
 * ### Usage
 *
 * The dialog contains `ui5-filterbar-item` elements and provides features like:
 * - Filter visibility toggling
 * - Grouping by categories
 * - Value display
 * - Search functionality
 * - Add/remove filters
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/AdaptFiltersDialog.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.6.0
 */
@customElement({
	tag: "ui5-adapt-filters-dialog",
	renderer: jsxRenderer,
	styles: AdaptFiltersDialogCss,
	template: AdaptFiltersDialogTemplate,
})

/**
 * Fired when the user confirms the dialog by clicking the "OK" button.
 *
 * @param {Array<FilterBarItem>} selectedFilters - Visible filter items
 * @param {Record<string, boolean>} visibilityMap - Filter visibility states by key
 * @public
 */
@event("confirm")

/**
 * Fired when the user cancels the dialog.
 *
 * @param {Array<FilterBarItem>} selectedFilters - Current filter items
 * @public
 */
@event("cancel")

/**
 * Fired when the user clicks the "Filter" button (apply without closing).
 *
 * @param {Array<FilterBarItem>} selectedFilters - Visible filter items
 * @param {Record<string, boolean>} visibilityMap - Filter visibility states by key
 * @public
 */
@event("filter")

/**
 * Fired when a filter's visibility is toggled.
 *
 * @param {FilterBarItem} filter - The filter item
 * @param {boolean} visible - New visibility state
 * @public
 */
@event("filter-visibility-change")

/**
 * Fired when a filter is removed.
 *
 * @param {FilterBarItem} filter - The removed filter item
 * @public
 */
@event("filter-remove")

/**
 * Fired when a new filter is added.
 *
 * @param {string} filterKey - The key of the added filter
 * @public
 */
@event("filter-add")

class AdaptFiltersDialog extends UI5Element {
	eventDetails!: {
		"confirm": AdaptFiltersDialogConfirmEventDetail;
		"cancel": AdaptFiltersDialogCancelEventDetail;
		"filter": AdaptFiltersDialogFilterEventDetail;
		"filter-visibility-change": AdaptFiltersDialogFilterVisibilityChangeEventDetail;
		"filter-remove": AdaptFiltersDialogFilterRemoveEventDetail;
		"filter-add": AdaptFiltersDialogFilterAddEventDetail;
	};

	/**
	 * Defines if the dialog is opened.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines the current view mode.
	 * @default "list"
	 * @public
	 */
	@property()
	viewMode: "list" | "groups" = "list";

	/**
	 * Defines the filter items that can be adapted.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true, individualSlots: true })
	items!: Array<FilterBarItem>;

	/**
	 * Defines the available filters that can be added.
	 * Filters already in items will be automatically excluded.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true })
	availableFilters!: Array<FilterBarItem>;

	/**
	 * Search value for filtering the list
	 * @private
	 */
	@property()
	_searchValue = "";

	/**
	 * Visibility state per filter key
	 * @private
	 */
	@property({ noAttribute: true })
	_visibility: Record<string, boolean> = {};

	/**
	 * Expanded state per group name
	 * @private
	 */
	@property({ noAttribute: true })
	_expandedGroups: Record<string, boolean> = {};

	/**
	 * Reference to the internal dialog
	 * @private
	 */
	@query("[ui5-dialog]")
	_dialog?: Dialog;

	@i18n("@ui5/webcomponents-fiori")
	public static readonly i18nBundle: I18nBundle;

	// ===== LIFECYCLE =====

	onBeforeRendering() {
		// Mark items as used in AdaptFiltersDialog and initialize visibility map
		this.items.forEach(item => {
			item._adapt_filters_item = true;
			const key = this._getFilterKey(item);
			this._visibility[key] ??= item.visible ?? true;
		});

		// Mark available filters as used in AdaptFiltersDialog
		this.availableFilters?.forEach(item => {
			item._adapt_filters_item = true;
		});

		// Initialize all groups as expanded by default
		const groups = this._getGroupNames();
		groups.forEach(group => {
			this._expandedGroups[group] ??= true;
		});
	}

	// ===== GETTERS =====

	/**
	 * Get filter key (with fallback)
	 */
	_getFilterKey(item: FilterBarItem): string {
		return item.effectiveKey;
	}

	/**
	 * Get the slot name for an item in the list view.
	 * If we're in groups view, the list slots are disabled.
	 */
	_getListSlotName(item: FilterBarItem): string {
		const slotName = item._individualSlot || "";
		if (this.viewMode === "groups") {
			return `_disabled_list_${slotName}`;
		}
		return slotName;
	}

	/**
	 * Get the slot name for an item in the groups view.
	 * If we're in list view, the groups slots are disabled.
	 */
	_getGroupsSlotName(item: FilterBarItem): string {
		const slotName = item._individualSlot || "";
		if (this.viewMode === "list") {
			return `_disabled_groups_${slotName}`;
		}
		return slotName;
	}

	/**
	 * Get filter text
	 */
	_getFilterText(item: FilterBarItem): string {
		return item.effectiveText;
	}

	/**
	 * Get filter value display
	 */
	_getFilterValueDisplay(item: FilterBarItem): string {
		// If additionalText is set, use it
		if (item.additionalText) {
			return item.additionalText;
		}

		// Otherwise, extract from control
		const control = item.control?.[0];
		return this._extractValuesFromControl(control);
	}

	/**
	 * Extract values from various control types
	 * Uses duck-typing for scoping-safety instead of hard-coded tag name checks
	 * @private
	 */
	_extractValuesFromControl(control?: HTMLElement): string {
		if (!control) {
			return "";
		}

		const controlAny = control as any;

		// MultiInput/MultiComboBox - check for tokens array
		if ('tokens' in controlAny && Array.isArray(controlAny.tokens)) {
			const tokens = controlAny.tokens;
			if (tokens.length === 0) {
				return "";
			}
			return tokens.map((t: any) => `=${String(t.text)} ×`).join(" ");
		}

		// Select - check for selectedOption
		if ('selectedOption' in controlAny && controlAny.selectedOption) {
			const selected = controlAny.selectedOption;
			// Use textContent or effectiveDisplayText since 'text' is a slot that returns Node array
			const selectedText = selected?.textContent || selected?.effectiveDisplayText || "";
			return selectedText ? `=${selectedText} ×` : "";
		}

		// Input, DatePicker, DateRangePicker - check for value property
		if ('value' in controlAny) {
			const value = controlAny.value;
			if (!value) {
				return "";
			}

			// DateRangePicker typically has range format (no prefix/suffix)
			if ('dateValue' in controlAny || 'startDateValue' in controlAny) {
				return String(value);
			}

			// Regular input/date picker - add prefix and suffix
			return `=${value} ×`;
		}

		return "";
	}

	/**
	 * Check if filter is visible
	 */
	_isVisible(item: FilterBarItem): boolean {
		const key = this._getFilterKey(item);
		return this._visibility[key] ?? item.visible ?? true;
	}

	/**
	 * Check if filter is required
	 */
	_isRequired(item: FilterBarItem): boolean {
		return item.required || false;
	}

	/**
	 * Check if filter has any values
	 * @private
	 */
	_hasFilterValues(item: FilterBarItem): boolean {
		const valueDisplay = this._getFilterValueDisplay(item);
		return valueDisplay.trim().length > 0;
	}

	/**
	 * Check if visibility toggle should be disabled
	 * Required filters without values cannot have visibility toggled
	 * @private
	 */
	_isVisibilityToggleDisabled(item: FilterBarItem): boolean {
		return this._isRequired(item) && !this._hasFilterValues(item);
	}

	/**
	 * Get filtered items based on search
	 */
	get _filteredItems(): Array<FilterBarItem> {
		if (!this._searchValue) {
			return this.items;
		}

		const searchLower = this._searchValue.toLowerCase();
		return this.items.filter(item => {
			const text = this._getFilterText(item).toLowerCase();
			const groupName = (item.groupName || "").toLowerCase();
			return text.includes(searchLower) || groupName.includes(searchLower);
		});
	}

	/**
	 * Get unique group names from items, ordered by groupOrder and "Basic" first
	 */
	_getGroupNames(): string[] {
		const groupMap = new Map<string, number>();

		this.items.forEach(item => {
			if (item.groupName && !groupMap.has(item.groupName)) {
				groupMap.set(item.groupName, item.groupOrder ?? 999);
			}
		});

		// Sort by: 1) "Basic" first, 2) groupOrder, 3) name
		return Array.from(groupMap.entries())
			.sort((a, b) => {
				// "Basic" always first (case-insensitive)
				const aIsBasic = a[0].toLowerCase() === 'basic';
				const bIsBasic = b[0].toLowerCase() === 'basic';

				if (aIsBasic && !bIsBasic) return -1;
				if (!aIsBasic && bIsBasic) return 1;

				// Then by groupOrder
				if (a[1] !== b[1]) return a[1] - b[1];

				// Finally by name
				return a[0].localeCompare(b[0]);
			})
			.map(entry => entry[0]);
	}

	/**
	 * Get grouped filters for Groups view
	 */
	get _groupedFilters(): Map<string, Array<FilterBarItem>> {
		const grouped = new Map<string, Array<FilterBarItem>>();
		const ungrouped: Array<FilterBarItem> = [];

		this._filteredItems.forEach(item => {
			const groupName = item.groupName;
			if (groupName) {
				if (!grouped.has(groupName)) {
					grouped.set(groupName, []);
				}
				grouped.get(groupName)!.push(item);
			} else {
				ungrouped.push(item);
			}
		});

		// Sort filters within each group alphabetically
		grouped.forEach((items, groupName) => {
			items.sort((a, b) =>
				this._getFilterText(a).localeCompare(this._getFilterText(b))
			);
		});

		// Sort ungrouped filters alphabetically
		ungrouped.sort((a, b) =>
			this._getFilterText(a).localeCompare(this._getFilterText(b))
		);

		// Rebuild map in correct group order
		const orderedMap = new Map<string, Array<FilterBarItem>>();
		const groupNames = this._getGroupNames();

		groupNames.forEach(name => {
			if (grouped.has(name)) {
				orderedMap.set(name, grouped.get(name)!);
			}
		});

		// Add ungrouped items at the end if any
		if (ungrouped.length > 0) {
			orderedMap.set(this._ungroupedText, ungrouped);
		}

		return orderedMap;
	}

	/**
	 * Get available filters (not already added)
	 */
	get _availableFiltersToAdd(): Array<FilterBarItem> {
		if (!this.availableFilters || this.availableFilters.length === 0) {
			return [];
		}

		const addedKeys = new Set(this.items.map(item => this._getFilterKey(item)));
		return this.availableFilters
			.filter(filter => {
				const key = this._getFilterKey(filter);
				return !addedKeys.has(key);
			})
			.sort((a, b) =>
				this._getFilterText(a).localeCompare(this._getFilterText(b))
			);
	}

	/**
	 * Check if group is expanded
	 */
	_isGroupExpanded(groupName: string): boolean {
		return this._expandedGroups[groupName] ?? true;
	}

	// ===== EVENT HANDLERS =====

	/**
	 * Handle tab selection change from TabContainer
	 */
	_handleTabSelect(e: CustomEvent) {
		const tab = e.detail.tab;
		const tabText = tab.text;

		// Determine which view mode based on tab text
		if (tabText === this._listTabText) {
			this.viewMode = "list";
		} else if (tabText === this._groupsTabText) {
			this.viewMode = "groups";
		}
	}

	/**
	 * Handle search input
	 */
	_handleSearch(e: CustomEvent) {
		const input = e.target as any;
		this._searchValue = input.value || "";
	}

	/**
	 * Handle visibility toggle
	 */
	_handleVisibilityToggle(item: FilterBarItem) {
		// Don't allow toggling if disabled (required filter without values)
		if (this._isVisibilityToggleDisabled(item)) {
			return;
		}

		const key = this._getFilterKey(item);
		const newVisibility = !this._visibility[key];
		this._visibility = { ...this._visibility, [key]: newVisibility };

		this.fireDecoratorEvent("filter-visibility-change", {
			filter: item,
			visible: newVisibility,
		});
	}

	/**
	 * Handle copy filter
	 */
	_handleCopy(item: FilterBarItem) {
		// Copy filter configuration to clipboard
		const config = {
			text: this._getFilterText(item),
			groupName: item.groupName,
			visible: this._isVisible(item),
			required: item.required,
			values: this._getFilterValueDisplay(item),
		};

		try {
			navigator.clipboard.writeText(JSON.stringify(config, null, 2));
		} catch {
			// Silently fail if clipboard is not available or permission denied
		}
	}

	/**
	 * Handle remove filter
	 */
	_handleRemove(item: FilterBarItem) {
		if (this._isRequired(item)) {
			return;
		}

		this.fireDecoratorEvent("filter-remove", { filter: item });
	}

	/**
	 * Handle add filter
	 */
	_handleAddFilter(e: CustomEvent) {
		const select = e.target as any;
		const filterKey = select.value;

		if (filterKey) {
			this.fireDecoratorEvent("filter-add", { filterKey });
			select.value = ""; // Reset
		}
	}

	/**
	 * Handle group expand/collapse
	 */
	_toggleGroup(groupName: string) {
		this._expandedGroups = {
			...this._expandedGroups,
			[groupName]: !this._expandedGroups[groupName],
		};
	}

	/**
	 * Handle keyboard events on group headers for accessibility
	 * Supports Enter and Space keys to toggle group expansion
	 * @private
	 */
	_handleGroupHeaderKeyDown(e: KeyboardEvent, groupName: string) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			this._toggleGroup(groupName);
		}
	}

	/**
	 * Handle OK button
	 */
	_handleOK() {
		const selectedFilters = this.items.filter(item => this._isVisible(item));
		this.fireDecoratorEvent("confirm", {
			selectedFilters,
			visibilityMap: { ...this._visibility },
		});
		this.close();
	}

	/**
	 * Handle Filter button (apply without closing)
	 */
	_handleFilter() {
		const selectedFilters = this.items.filter(item => this._isVisible(item));
		this.fireDecoratorEvent("filter", {
			selectedFilters,
			visibilityMap: { ...this._visibility },
		});
	}

	/**
	 * Handle Cancel button
	 */
	_handleCancel() {
		const selectedFilters = this.items.filter(item => this._isVisible(item));
		this.fireDecoratorEvent("cancel", { selectedFilters });
		this.close();
	}

	/**
	 * Handle Reset button
	 */
	_handleReset() {
		// Reset all filters to visible
		const newVisibility: Record<string, boolean> = {};
		this.items.forEach(item => {
			const key = this._getFilterKey(item);
			newVisibility[key] = true;
		});
		this._visibility = newVisibility;
	}

	/**
	 * Handle Edit button (List view)
	 */
	_handleEdit() {
		// Future: Open edit mode for bulk editing
		// Not yet implemented
	}

	/**
	 * Handle Sort button (List view)
	 */
	_handleSort() {
		// Future: Open sort dialog
		// Not yet implemented
	}

	// ===== PUBLIC API =====

	/**
	 * Opens the dialog.
	 * @public
	 */
	show() {
		this.open = true;
	}

	/**
	 * Closes the dialog.
	 * @public
	 */
	close() {
		this.open = false;
	}

	// ===== i18n TEXTS =====

	get _dialogTitle() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_TITLE);
	}

	get _listTabText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_LIST_TAB);
	}

	get _groupsTabText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_GROUPS_TAB);
	}

	get _filterValuesVisibilityText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_FILTER_VALUES_VISIBILITY);
	}

	get _searchPlaceholder() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_SEARCH_PLACEHOLDER);
	}

	get _editText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_EDIT_BUTTON);
	}

	get _sortText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_SORT_BUTTON);
	}

	get _addFilterText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_ADD_FILTER);
	}

	get _okButtonText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_OK_BUTTON);
	}

	get _filterButtonText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_FILTER_BUTTON);
	}

	get _cancelButtonText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_CANCEL_BUTTON);
	}

	get _resetText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_RESET_BUTTON);
	}

	get _ungroupedText() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_UNGROUPED);
	}

	get _visibilityTooltip() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_VISIBILITY_TOOLTIP);
	}

	get _reorderTooltip() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_REORDER_TOOLTIP);
	}
}

AdaptFiltersDialog.define();

export default AdaptFiltersDialog;
export type {
	AdaptFiltersDialogConfirmEventDetail,
	AdaptFiltersDialogCancelEventDetail,
	AdaptFiltersDialogFilterEventDetail,
	AdaptFiltersDialogFilterVisibilityChangeEventDetail,
	AdaptFiltersDialogFilterRemoveEventDetail,
	AdaptFiltersDialogFilterAddEventDetail,
};
