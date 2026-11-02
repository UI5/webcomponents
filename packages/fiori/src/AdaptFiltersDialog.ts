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
import "@ui5/webcomponents/dist/ComboBox.js";
import "@ui5/webcomponents/dist/ComboBoxItem.js";
import "@ui5/webcomponents/dist/ToolbarSpacer.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemCustom.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/hide.js";
import "@ui5/webcomponents-icons/dist/show.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/grid.js";

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
	ADAPT_FILTERS_DIALOG_ADD_FILTER_PLACEHOLDER,
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

type AdaptFiltersDialogSaveEventDetail = {
	selectedFilters: Array<FilterBarItem>;
	visibilityMap: Record<string, boolean>;
}

type AdaptFiltersDialogCancelEventDetail = {
	selectedFilters: Array<FilterBarItem>;
	escPressed: boolean;
}

type AdaptFiltersDialogFilterEventDetail = {
	selectedFilters: Array<FilterBarItem>;
	visibilityMap: Record<string, boolean>;
}

type AdaptFiltersDialogSelectionChangeEventDetail = {
	filter: FilterBarItem;
	visible: boolean;
}

type AdaptFiltersDialogFilterRemoveEventDetail = {
	filter: FilterBarItem;
}

type AdaptFiltersDialogFilterAddEventDetail = {
	filterKey: string;
}

type AdaptFiltersDialogReorderEventDetail = {
	keys: Array<string>;
}

type AdaptFiltersDialogCloseEventDetail = {
	closeTrigger: "okButtonPressed" | "filterButtonPressed" | "cancelButtonPressed" | "escPressed";
}

type AdaptFiltersDialogSearchEventDetail = {
	value: string;
}

// Minimal structural shapes of the filter controls the dialog introspects.
// Controls are matched by capability (duck-typed) rather than tag name so the
// logic works regardless of which concrete web component is slotted.
type ControlWithValue = { value: string };
type ControlWithChecked = { checked: boolean };
type ControlWithTokens = { tokens: Array<{ text: string }> };
type ControlWithSelectedOption = { selectedOption?: { textContent: string | null, effectiveDisplayText?: string } };

const hasValue = (control: HTMLElement): control is HTMLElement & ControlWithValue => "value" in control;
const hasChecked = (control: HTMLElement): control is HTMLElement & ControlWithChecked => "checked" in control;
const hasTokens = (control: HTMLElement): control is HTMLElement & ControlWithTokens => Array.isArray((control as Partial<ControlWithTokens>).tokens);
const hasSelectedOption = (control: HTMLElement): control is HTMLElement & ControlWithSelectedOption => "selectedOption" in control;

// Captured state of a filter control at dialog-open time, used to roll back on Cancel/Reset.
type ControlSnapshot = {
	children: Array<Node>;
	value?: string;
	checked?: boolean;
};

/**
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
 * @since 2.17.0
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
@event("filters-dialog-save")

/**
 * Fired when the user cancels the dialog.
 *
 * @param {Array<FilterBarItem>} selectedFilters - Current filter items
 * @param {boolean} escPressed - Whether the dialog was cancelled via the Escape key
 * @public
 */
@event("filters-dialog-cancel")

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
@event("filters-dialog-selection-change")

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

/**
 * Fired when filters are reordered via drag and drop.
 *
 * @param {Array<string>} keys - The new order of filter keys
 * @public
 */
@event("reorder")

/**
 * Fired when the dialog is about to open.
 *
 * @public
 */
@event("filters-dialog-open")

/**
 * Fired after the dialog is fully open.
 *
 * @public
 */
@event("after-filters-dialog-open")

/**
 * Fired when the dialog is closed.
 *
 * @param {string} closeTrigger - What triggered the close
 * @public
 */
@event("filters-dialog-close")

/**
 * Fired when the user types in the dialog's search field.
 *
 * @param {string} value - The current search value
 * @public
 */
@event("filters-dialog-search")

/**
 * Fired when the user clicks the "Reset" button.
 *
 * @public
 */
@event("reset")

class AdaptFiltersDialog extends UI5Element {
	eventDetails!: {
		"filters-dialog-save": AdaptFiltersDialogSaveEventDetail;
		"filters-dialog-cancel": AdaptFiltersDialogCancelEventDetail;
		"filter": AdaptFiltersDialogFilterEventDetail;
		"filters-dialog-selection-change": AdaptFiltersDialogSelectionChangeEventDetail;
		"filter-remove": AdaptFiltersDialogFilterRemoveEventDetail;
		"filter-add": AdaptFiltersDialogFilterAddEventDetail;
		"reorder": AdaptFiltersDialogReorderEventDetail;
		"filters-dialog-open": void;
		"after-filters-dialog-open": void;
		"filters-dialog-close": AdaptFiltersDialogCloseEventDetail;
		"filters-dialog-search": AdaptFiltersDialogSearchEventDetail;
		"reset": void;
	};

	/**
	 * Associates this dialog with a FilterBar by its DOM id.
	 *
	 * When set, the dialog syncs control values and visibility with the FilterBar's items
	 * (matched by `filter-key`) on open and on OK/Filter. The dialog still requires its own
	 * copy of the filter items in its default slot — the link does not source them.
	 * @public
	 */
	@property()
	filterBar = "";

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
	@slot({
		type: HTMLElement, "default": true, invalidateOnChildChange: true, individualSlots: true,
	})
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

	@property({ noAttribute: true })
	_sortMode = false;

	@property({ noAttribute: true })
	_editMode = false;

	@property({ noAttribute: true })
	_removedItems: Array<FilterBarItem> = [];

	/**
	 * Keys of filters that have been removed and committed (via OK/Filter).
	 * Persists across open/close so removed filters stay out of the standard list
	 * and remain offered in the Add Filter list until re-added.
	 * @private
	 */
	@property({ noAttribute: true })
	_removedKeys: Array<string> = [];

	/**
	 * Snapshot of `_removedKeys` captured when the dialog opens, used to roll back
	 * on Cancel/Reset.
	 * @private
	 */
	@property({ noAttribute: true })
	_openRemovedKeysSnapshot: Array<string> = [];

	@property({ noAttribute: true })
	_openVisibilitySnapshot: Record<string, boolean> = {};

	@property({ noAttribute: true })
	_itemOrder: Array<string> = [];

	@property({ noAttribute: true })
	_openItemOrderSnapshot: Array<string> = [];

	_openControlSnapshot: Map<string, ControlSnapshot> = new Map();

	_warnedLinkMissingKey = false;

	/**
	 * Reference to the internal dialog
	 * @private
	 */
	@query("[ui5-dialog]")
	_dialog?: Dialog;

	@i18n("@ui5/webcomponents-fiori")
	public static readonly i18nBundle: I18nBundle;

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

	onBeforeRendering() {
		this._effectiveItems.forEach(item => {
			item._adaptFiltersItem = true;
			const key = this._getFilterKey(item);
			this._visibility[key] ??= !item.hidden;
			// Disable pointer events on items in sort mode so drag works
			item.style.pointerEvents = this._sortMode ? "none" : "";
		});

		this.availableFilters?.forEach(item => {
			item._adaptFiltersItem = true;
		});

		const groups = this._getGroupNames();
		groups.forEach(group => {
			this._expandedGroups[group] ??= true;
		});
	}

	/**
	 * Returns the items the dialog operates on — the dialog's own default-slot items.
	 *
	 * **Note:** The `filterBar` property links the dialog to a FilterBar for control-value
	 * and visibility sync (see `show()` / `_syncControlsToFilterBar()`); it does NOT source
	 * the item set. Items must be provided in this dialog's own default slot.
	 */
	get _effectiveItems(): Array<FilterBarItem> {
		return this.items;
	}

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
	 * Whether the item's control currently holds a value. Matches controls by
	 * capability (tokens, selected option, or a value) rather than tag name.
	 * @private
	 */
	_controlHasValue(item: FilterBarItem): boolean {
		const control = item.control?.[0];
		if (!control) {
			return false;
		}
		if (hasTokens(control)) {
			return control.tokens.length > 0;
		}
		if (hasSelectedOption(control)) {
			return !!control.selectedOption?.textContent || !!control.selectedOption?.effectiveDisplayText;
		}
		if (hasValue(control)) {
			return !!control.value;
		}
		return false;
	}

	/**
	 * Check if filter is visible
	 */
	_isVisible(item: FilterBarItem): boolean {
		const key = this._getFilterKey(item);
		return this._visibility[key] ?? !item.hidden;
	}

	/**
	 * Check if filter is required
	 */
	_isRequired(item: FilterBarItem): boolean {
		return item.required || false;
	}

	/**
	 * Check if a filter is "active" (explicitly marked active or holds a value).
	 * @private
	 */
	_isActive(item: FilterBarItem): boolean {
		return item.active || this._controlHasValue(item);
	}

	/**
	 * Check if visibility toggle should be disabled
	 * Required filters without values cannot have visibility toggled
	 * @private
	 */
	_isVisibilityToggleDisabled(item: FilterBarItem): boolean {
		return this._isRequired(item) && !this._controlHasValue(item);
	}

	/**
	 * Active (non-removed) items, filtered by the search term and sorted by the
	 * current key order (items not in the order go to the end).
	 */
	get _filteredItems(): Array<FilterBarItem> {
		const search = this._searchValue.toLowerCase();
		const matchesSearch = (item: FilterBarItem) => {
			if (!search) {
				return true;
			}
			const text = this._getFilterText(item).toLowerCase();
			const groupName = (item.groupName || "").toLowerCase();
			return text.includes(search) || groupName.includes(search);
		};

		const orderIndex = (item: FilterBarItem) => {
			const index = this._itemOrder.indexOf(this._getFilterKey(item));
			return index === -1 ? Infinity : index;
		};

		return this._effectiveItems
			.filter(item => !this._isRemoved(item) && matchesSearch(item))
			.sort((a, b) => orderIndex(a) - orderIndex(b));
	}

	/**
	 * Whether the item belongs to no explicit group (shown under the "ungrouped" bucket).
	 * @private
	 */
	_isUngrouped(item: FilterBarItem): boolean {
		return !item.groupName || item.groupName === "default";
	}

	/**
	 * Unique explicit group names, ordered: "Basic" first, then by `groupOrder`, then by name.
	 * @private
	 */
	_getGroupNames(): Array<string> {
		const orderByGroup = new Map<string, number>();
		this._effectiveItems.forEach(item => {
			if (!this._isUngrouped(item) && !orderByGroup.has(item.groupName)) {
				orderByGroup.set(item.groupName, item.groupOrder ?? 999);
			}
		});

		const isBasic = (name: string) => name.toLowerCase() === "basic";

		return [...orderByGroup.keys()].sort((a, b) => {
			if (isBasic(a) !== isBasic(b)) {
				return isBasic(a) ? -1 : 1;
			}
			const orderDiff = orderByGroup.get(a)! - orderByGroup.get(b)!;
			return orderDiff !== 0 ? orderDiff : a.localeCompare(b);
		});
	}

	/**
	 * Filtered items arranged into groups for the Groups view, each group sorted
	 * alphabetically, in group order, with ungrouped items appended last.
	 * @private
	 */
	get _groupedFilters(): Map<string, Array<FilterBarItem>> {
		const byText = (a: FilterBarItem, b: FilterBarItem) => this._getFilterText(a).localeCompare(this._getFilterText(b));

		const itemsByGroup = new Map<string, Array<FilterBarItem>>();
		const ungrouped: Array<FilterBarItem> = [];
		this._filteredItems.forEach(item => {
			if (this._isUngrouped(item)) {
				ungrouped.push(item);
				return;
			}
			const group = itemsByGroup.get(item.groupName) ?? [];
			group.push(item);
			itemsByGroup.set(item.groupName, group);
		});

		const result = new Map<string, Array<FilterBarItem>>();
		this._getGroupNames().forEach(name => {
			const group = itemsByGroup.get(name);
			if (group) {
				result.set(name, group.sort(byText));
			}
		});
		if (ungrouped.length > 0) {
			result.set(this._ungroupedText, ungrouped.sort(byText));
		}
		return result;
	}

	/**
	 * Filters offered in the Add Filter combobox: removed items (staged or committed)
	 * plus the app-provided `availableFilters` pool, excluding anything active in the
	 * list, de-duplicated by key and sorted by label.
	 * @private
	 */
	get _availableFiltersToAdd(): Array<FilterBarItem> {
		const activeKeys = new Set(
			this._effectiveItems
				.filter(item => !this._isRemoved(item))
				.map(item => this._getFilterKey(item)),
		);

		const removed = this._effectiveItems.filter(item => this._isRemoved(item));
		const pooled = this.availableFilters || [];

		const addable = [...removed, ...pooled].filter(item => !activeKeys.has(this._getFilterKey(item)));

		const byKey = new Map(addable.map(item => [this._getFilterKey(item), item]));
		return [...byKey.values()].sort((a, b) => this._getFilterText(a).localeCompare(this._getFilterText(b)));
	}

	/**
	 * Whether an item is staged for or committed to removal.
	 * @private
	 */
	_isRemoved(item: FilterBarItem): boolean {
		return this._isRemovedKey(this._getFilterKey(item));
	}

	/**
	 * Check if group is expanded
	 */
	_isGroupExpanded(groupName: string): boolean {
		return this._expandedGroups[groupName] ?? true;
	}

	/**
	 * Handle tab selection change from TabContainer
	 */
	_handleTabSelect(e: CustomEvent) {
		this.viewMode = e.detail.tabIndex === 0 ? "list" : "groups";
		this._sortMode = false;
	}

	/**
	 * Handle search input
	 */
	_handleSearch(e: CustomEvent) {
		const input = e.target as any;
		this._searchValue = input.value || "";
		this.fireDecoratorEvent("filters-dialog-search", { value: this._searchValue });
	}

	/**
	 * Handle visibility toggle
	 */
	_handleVisibilityToggle(item: FilterBarItem) {
		if (this._isVisibilityToggleDisabled(item)) {
			return;
		}

		const key = this._getFilterKey(item);
		const newVisibility = !this._visibility[key];
		this._visibility = { ...this._visibility, [key]: newVisibility };

		this.fireDecoratorEvent("filters-dialog-selection-change", {
			filter: item,
			visible: newVisibility,
		});
	}

	/**
	 * Handle remove filter — deferred until OK/Filter confirm
	 */
	_handleRemove(item: FilterBarItem) {
		if (this._isRequired(item)) {
			return;
		}
		// Track as pending removal; committed on OK/Filter
		this._removedItems = [...this._removedItems, item];
	}

	/**
	 * Handle add filter from ComboBox selectionChange
	 */
	_handleAddFilter(e: CustomEvent) {
		const selectedItem = e.detail?.item as HTMLElement | undefined;
		const filterKey = selectedItem?.getAttribute("data-key");
		if (!filterKey) { return; }

		this._restoreFilter(filterKey);
		this.fireDecoratorEvent("filter-add", { filterKey });

		const comboBox = e.target as HTMLInputElement;
		comboBox.value = "";
	}

	/**
	 * Brings a filter back into the active list: undoes any staged/committed removal,
	 * moves it out of the availableFilters pool, and gives it a spot in the order.
	 * @private
	 */
	_restoreFilter(filterKey: string) {
		this._removedItems = this._removedItems.filter(item => this._getFilterKey(item) !== filterKey);
		this._removedKeys = this._removedKeys.filter(key => key !== filterKey);

		const pooled = this.availableFilters?.find(item => this._getFilterKey(item) === filterKey);
		pooled?.removeAttribute("slot");

		if (!this._itemOrder.includes(filterKey)) {
			this._itemOrder = [...this._itemOrder, filterKey];
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

	_handleDialogBeforeClose(e: CustomEvent) {
		// Intercept Escape/external close — treat as cancel to restore snapshot
		const escapeKey = (e.detail)?.escPressed;
		if (escapeKey) {
			e.preventDefault();
			this._handleCancel(true);
		}
	}

	_handleDialogOpen() {
		this.fireDecoratorEvent("after-filters-dialog-open");
	}

	/**
	 * Finds a linked FilterBar item by key, comparing properties instead of a CSS
	 * selector so keys with special characters match safely.
	 * @private
	 */
	_findFilterBarItemByKey(fb: HTMLElement, key: string): FilterBarItem | undefined {
		const items = [...fb.querySelectorAll<FilterBarItem>(":scope > ui5-filterbar-item")];
		return items.find(item => this._getFilterKey(item) === key);
	}

	/**
	 * Copies the live state (value, checked, and slotted children such as tokens)
	 * from one control to another, replacing the target's slotted children.
	 * @private
	 */
	_copyControlState(source: HTMLElement, target: HTMLElement) {
		if (hasValue(source) && hasValue(target)) {
			target.value = source.value;
		}
		if (hasChecked(source) && hasChecked(target)) {
			target.checked = source.checked;
		}

		const slottedChildren = (control: HTMLElement) => [...control.children].filter(child => child.hasAttribute("slot"));
		slottedChildren(target).forEach(child => child.remove());
		slottedChildren(source).forEach(child => this._appendWithBaseSlot(target, child.cloneNode(true) as Element));
	}

	_syncControlsToFilterBar() {
		const filterBar = this.filterBar ? document.getElementById(this.filterBar) : null;
		if (!filterBar) {
			return;
		}
		this.items.forEach(item => {
			const dialogItem = this._findFilterBarItemByKey(filterBar, this._getFilterKey(item));
			const dialogControl = item.control?.[0];
			const filterBarControl = dialogItem?.control?.[0];
			if (dialogControl && filterBarControl) {
				this._copyControlState(dialogControl, filterBarControl);
			}
		});
	}

	/**
	 * Builds the save/filter payload. Removed filters are excluded from `selectedFilters`
	 * and forced to `false` in `visibilityMap` so applying the map can't resurrect them.
	 * @private
	 */
	_buildResultPayload(): { selectedFilters: Array<FilterBarItem>, visibilityMap: Record<string, boolean> } {
		const selectedFilters = this._effectiveItems.filter(item => this._isVisible(item) && !this._isRemoved(item));

		const visibilityMap = { ...this._visibility };
		this._removedItems.forEach(item => {
			visibilityMap[this._getFilterKey(item)] = false;
		});
		this._removedKeys.forEach(key => {
			visibilityMap[key] = false;
		});

		return { selectedFilters, visibilityMap };
	}

	_handleOK() {
		this._syncControlsToFilterBar();
		this._removedItems.forEach(item => {
			this.fireDecoratorEvent("filter-remove", { filter: item });
		});
		this.fireDecoratorEvent("filters-dialog-save", this._buildResultPayload());
		this._commitRemovedKeys();
		this._close("okButtonPressed");
	}

	_handleFilter() {
		this._syncControlsToFilterBar();
		this._removedItems.forEach(item => {
			this.fireDecoratorEvent("filter-remove", { filter: item });
		});
		this.fireDecoratorEvent("filter", this._buildResultPayload());
		this._commitRemovedKeys();
		this._close("filterButtonPressed");
	}

	/**
	 * Commits staged removals into `_removedKeys` so they persist across open/close
	 * (kept in the list exclusion and the Add Filter pool).
	 * @private
	 */
	_commitRemovedKeys() {
		const keys = this._removedItems.map(item => this._getFilterKey(item));
		const merged = [...this._removedKeys];
		keys.forEach(key => {
			if (!merged.includes(key)) {
				merged.push(key);
			}
		});
		this._removedKeys = merged;
	}

	_handleCancel(escPressed = false) {
		this._visibility = { ...this._openVisibilitySnapshot };
		this._itemOrder = [...this._openItemOrderSnapshot];
		this._removedKeys = [...this._openRemovedKeysSnapshot];
		this._removedItems = [];
		this._sortMode = false;
		this._restoreControlsFromSnapshot();
		const selectedFilters = this._effectiveItems.filter(item => this._isVisible(item));
		this.fireDecoratorEvent("filters-dialog-cancel", { selectedFilters, escPressed });
		this._close(escPressed ? "escPressed" : "cancelButtonPressed");
	}

	_restoreControlsFromSnapshot() {
		this.items.forEach(item => {
			const snapshot = this._openControlSnapshot.get(this._getFilterKey(item));
			const control = item.control?.[0];
			if (!snapshot || !control) {
				return;
			}
			// Replace every child (slotted and slotless, e.g. ui5-select options) to
			// avoid leaving or duplicating the slotless ones.
			[...control.children].forEach(child => child.remove());
			snapshot.children.forEach(child => this._appendWithBaseSlot(control, child.cloneNode(true) as Element));

			if (snapshot.value !== undefined && hasValue(control)) {
				control.value = snapshot.value;
			}
			if (snapshot.checked !== undefined && hasChecked(control)) {
				control.checked = snapshot.checked;
			}
		});
	}

	/**
	 * Appends a child to a control, normalizing any individual-slot name
	 * (e.g. `tokens-1`) back to its base (`tokens`) so the framework reassigns indices.
	 * @private
	 */
	_appendWithBaseSlot(target: HTMLElement, child: Element) {
		const slotAttr = child.getAttribute("slot");
		if (slotAttr) {
			child.setAttribute("slot", slotAttr.replace(/-\d+$/, ""));
		}
		target.appendChild(child);
	}

	/**
	 * Handle Reset button
	 */
	_handleReset() {
		this._visibility = { ...this._openVisibilitySnapshot };
		this._itemOrder = [...this._openItemOrderSnapshot];
		this._removedKeys = [...this._openRemovedKeysSnapshot];
		this._removedItems = [];
		// Restore the open-time interaction state: edit on, sort off
		this._sortMode = false;
		this._editMode = true;
		this._restoreControlsFromSnapshot();
		this.fireDecoratorEvent("reset");
	}

	_handleEdit() {
		this._editMode = !this._editMode;
		if (this._editMode) { this._sortMode = false; }
	}

	_handleSort() {
		this._sortMode = !this._sortMode;
		if (this._sortMode) { this._editMode = false; }
	}

	/**
	 * Handle list item move (drag and drop reorder)
	 */
	_handleMoveOver(e: CustomEvent) {
		const { destination } = e.detail;
		if (!destination) { return; }
		if (destination.placement === "Before" || destination.placement === "After") {
			e.preventDefault();
		}
	}

	_handleMove(e: CustomEvent) {
		const { source, destination } = e.detail;
		if (!destination) { return; }

		const sourceKey = source.element.getAttribute("data-key") as string;
		const destinationKey = destination.element.getAttribute("data-key") as string;
		const placeAfter = destination.placement === "After";

		this._itemOrder = this._moveKey(this._itemOrder, sourceKey, destinationKey, placeAfter);

		const keys = this._itemOrder.filter(key => !this._isRemovedKey(key));
		this.fireDecoratorEvent("reorder", { keys });
	}

	/**
	 * Returns `order` with `sourceKey` moved next to `destinationKey` (after it when
	 * `placeAfter`, otherwise before it). If the destination is not in the order,
	 * the source is moved to the end.
	 * @private
	 */
	_moveKey(order: Array<string>, sourceKey: string, destinationKey: string, placeAfter: boolean): Array<string> {
		const result = [...order];
		const sourceIndex = result.indexOf(sourceKey);
		if (sourceIndex === -1) {
			return result;
		}
		result.splice(sourceIndex, 1);

		const destinationIndex = result.indexOf(destinationKey);
		if (destinationIndex === -1) {
			result.push(sourceKey);
		} else {
			result.splice(placeAfter ? destinationIndex + 1 : destinationIndex, 0, sourceKey);
		}
		return result;
	}

	/**
	 * Whether a key is staged for or committed to removal.
	 * @private
	 */
	_isRemovedKey(key: string): boolean {
		return this._removedKeys.includes(key)
			|| this._removedItems.some(item => this._getFilterKey(item) === key);
	}

	/**
	 * Opens the dialog.
	 * @public
	 */
	show(keyOrder?: Array<string>) {
		this.fireDecoratorEvent("filters-dialog-open");

		this._sortMode = false;
		this._editMode = true;
		this._searchValue = "";
		this._removedItems = [];

		const filterBar = this.filterBar ? document.getElementById(this.filterBar) : null;
		this._warnIfLinkedWithoutKeys(filterBar);

		this._itemOrder = keyOrder?.length ? [...keyOrder] : this.items.map(item => this._getFilterKey(item));
		this._visibility = this._collectVisibility(filterBar);
		this._syncControlsFromFilterBar(filterBar);
		this._openControlSnapshot = this._snapshotControls();

		this._openItemOrderSnapshot = [...this._itemOrder];
		this._openVisibilitySnapshot = { ...this._visibility };
		this._openRemovedKeysSnapshot = [...this._removedKeys];

		this.open = true;
	}

	/**
	 * Warns once when linked to a FilterBar but some items lack a `filterKey`,
	 * since those items cannot be matched for value/visibility sync.
	 * @private
	 */
	_warnIfLinkedWithoutKeys(filterBar: HTMLElement | null) {
		if (filterBar && !this._warnedLinkMissingKey && this.items.some(item => !item.filterKey)) {
			this._warnedLinkMissingKey = true;
			console.warn(`AdaptFiltersDialog :: linked to a FilterBar via "filter-bar", but one or more items have no "filter-key". Sync is skipped for those items.`); // eslint-disable-line
		}
	}

	/**
	 * Visibility per item key, scoped to the current items so stale keys don't
	 * accumulate. When linked, the FilterBar's state wins.
	 * @private
	 */
	_collectVisibility(filterBar: HTMLElement | null): Record<string, boolean> {
		const visibility: Record<string, boolean> = {};
		this.items.forEach(item => {
			visibility[this._getFilterKey(item)] = !item.hidden;
		});
		filterBar?.querySelectorAll<FilterBarItem>(":scope > ui5-filterbar-item").forEach(filterBarItem => {
			const key = this._getFilterKey(filterBarItem);
			if (key in visibility) {
				visibility[key] = !filterBarItem.hidden;
			}
		});
		return visibility;
	}

	/**
	 * Copies control values from the linked FilterBar into the matching dialog items.
	 * @private
	 */
	_syncControlsFromFilterBar(filterBar: HTMLElement | null) {
		if (!filterBar) {
			return;
		}
		this.items.forEach(item => {
			const dialogControl = item.control?.[0];
			const filterBarControl = this._findFilterBarItemByKey(filterBar, this._getFilterKey(item))?.control?.[0];
			if (dialogControl && filterBarControl) {
				this._copyControlState(filterBarControl, dialogControl);
			}
		});
	}

	/**
	 * Captures each dialog control's current state so Cancel/Reset can restore it.
	 * @private
	 */
	_snapshotControls(): Map<string, ControlSnapshot> {
		const snapshots = new Map<string, ControlSnapshot>();
		this.items.forEach(item => {
			const control = item.control?.[0];
			if (!control) {
				return;
			}
			const snapshot: ControlSnapshot = {
				children: [...control.children].map(child => child.cloneNode(true)),
			};
			if (hasValue(control)) {
				snapshot.value = control.value;
			}
			if (hasChecked(control)) {
				snapshot.checked = control.checked;
			}
			snapshots.set(this._getFilterKey(item), snapshot);
		});
		return snapshots;
	}

	/**
	 * Closes the dialog.
	 * @public
	 */
	close() {
		this._close("cancelButtonPressed");
	}

	/**
	 * Internal close that also fires the close event with the trigger reason.
	 * @private
	 */
	_close(closeTrigger: "okButtonPressed" | "filterButtonPressed" | "cancelButtonPressed" | "escPressed") {
		this.open = false;
		this._removedItems = [];
		this.fireDecoratorEvent("filters-dialog-close", { closeTrigger });
	}

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

	get _addFilterPlaceholder() {
		return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_ADD_FILTER_PLACEHOLDER);
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
	AdaptFiltersDialogSaveEventDetail,
	AdaptFiltersDialogCancelEventDetail,
	AdaptFiltersDialogFilterEventDetail,
	AdaptFiltersDialogSelectionChangeEventDetail,
	AdaptFiltersDialogFilterRemoveEventDetail,
	AdaptFiltersDialogFilterAddEventDetail,
	AdaptFiltersDialogReorderEventDetail,
	AdaptFiltersDialogCloseEventDetail,
	AdaptFiltersDialogSearchEventDetail,
};
