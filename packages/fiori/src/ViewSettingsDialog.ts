import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import ListItemGroup from "@ui5/webcomponents/dist/ListItemGroup.js";
import List from "@ui5/webcomponents/dist/List.js";
import type { ListItemClickEventDetail, ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import SegmentedButton from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItem from "@ui5/webcomponents/dist/SegmentedButtonItem.js";

import ViewSettingsDialogMode from "./types/ViewSettingsDialogMode.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import type SortItem from "./SortItem.js";
import type FilterItem from "./FilterItem.js";

import {
	VSD_DIALOG_TITLE_SORT,
	VSD_SUBMIT_BUTTON,
	VSD_CANCEL_BUTTON,
	VSD_RESET_BUTTON,
	VSD_SORT_ORDER,
	VSD_SORT_BY,
	VSD_ORDER_ASCENDING,
	VSD_ORDER_DESCENDING,
	VSD_FILTER_BY,
} from "./generated/i18n/i18n-defaults.js";

// Template
import ViewSettingsDialogTemplate from "./generated/templates/ViewSettingsDialogTemplate.lit.js";

// Styles
import viewSettingsDialogCSS from "./generated/themes/ViewSettingsDialog.css.js";

type VSDFilter = Record<string, Array<string>> // {"Filter 1": ["Filter 5", "Filter 6"]}
type VSDFilters = Array<VSDFilter> // [{"Filter 1": ["Filter 5", "Filter 6"]}, {"Filter 3": ["Filter 8"]}]

// The data, passed to the public method + part of the events' detail
type VSDSettings = {
	sortOrder: string,
	sortBy: string,
	filters: VSDFilters,
}

// Events' detail
type ViewSettingsDialogConfirmEventDetail = VSDSettings & {
	sortByItem: SortItem,
	sortDescending: boolean,
}

type ViewSettingsDialogCancelEventDetail = VSDSettings & {
	sortByItem: SortItem,
	sortDescending: boolean,
}

// Common properties for several VSDInternalSettings fields
type VSDItem = {text?: string, selected: boolean}

// Used for the private properties _initialSettings, _confirmedSettings and _currentSettings
type VSDInternalSettings = {
	sortOrder: Array<VSDItem>,
	sortBy: Array<VSDItem & {index: number}>,
	filters: Array<VSDItem & {filterOptions: Array<VSDItem>}>,
}

/**
 * @class
 * ### Overview
 * The `ui5-view-settings-dialog` component helps the user to sort data within a list or a table.
 * It consists of several lists like `Sort order` which is built-in and `Sort By` and `Filter By` lists,
 * for which you must be provide items(`ui5-sort-item` & `ui5-filter-item` respectively)
 * These options can be used to create sorters for a table.
 *
 * The `ui5-view-settings-dialog` interrupts the current application processing as it is the only focused UI element and
 * the main screen is dimmed/blocked.
 * The `ui5-view-settings-dialog` is modal, which means that user action is required before returning to the parent window is possible.
 *
 * ### Structure
 * A `ui5-view-settings-dialog` consists of a header, content, and a footer for action buttons.
 * The `ui5-view-settings-dialog` is usually displayed at the center of the screen.
 *
 * ### Responsive Behavior
 * `ui5-view-settings-dialog` stretches on full screen on phones.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.16
 * @public
 */
@customElement({
	tag: "ui5-view-settings-dialog",
	renderer: litRender,
	styles: viewSettingsDialogCSS,
	template: ViewSettingsDialogTemplate,
	dependencies: [
		Button,
		Title,
		Dialog,
		Label,
		List,
		ListItemStandard,
		ListItemGroup,
		SegmentedButton,
		SegmentedButtonItem,
	],
})

/**
 * Fired when confirmation button is activated.
 * @param {String} sortOrder The current sort order selected.
 * @param {String} sortBy The currently selected `ui5-sort-item` text attribute.
 * @param {HTMLElement} sortByItem The currently selected `ui5-sort-item`.
 * @param {Boolean} sortDescending The selected sort order (true = descending, false = ascending).
 * @param {Array} filters The selected filters items.
 * @public
 */
@event<ViewSettingsDialogConfirmEventDetail>("confirm", {
	detail: {
		/**
		 * @public
		 */
		sortOrder: { type: String },
		/**
		 * @public
		 */
		sortBy: { type: String },
		/**
		 * @public
		 */
		sortByItem: { type: HTMLElement },
		/**
		 * @public
		 */
		sortDescending: { type: Boolean },
		/**
		 * @public
		 */
		filters: { type: Array },
	},
	bubbles: true,
})

/**
 * Fired when cancel button is activated.
 * @param {String} sortOrder The current sort order selected.
 * @param {String} sortBy The currently selected `ui5-sort-item` text attribute.
 * @param {HTMLElement} sortByItem The currently selected `ui5-sort-item`.
 * @param {Boolean} sortDescending The selected sort order (true = descending, false = ascending).
 * @param {Array} filters The selected filters items.
 * @public
 */
@event<ViewSettingsDialogCancelEventDetail>("cancel", {
	detail: {
		/**
		 * @public
		 */
		sortOrder: { type: String },
		/**
		 * @public
		 */
		sortBy: { type: String },
		/**
		 * @public
		 */
		sortByItem: { type: HTMLElement },
		/**
		 * @public
		 */
		sortDescending: { type: Boolean },
		/**
		 * @public
		 */
		filters: { type: Array },
	},
	bubbles: true,
})

/**
 * Fired before the component is opened.
 * @public
 */
@event("before-open", {
	cancelable: true,
})
/**
 * Fired after the dialog is opened.
 * @since 2.0.0
 * @public
 */
@event("open", {
	bubbles: true,
})
/**
 * Fired after the dialog is closed.
 * @since 2.0.0
 * @public
 */
@event("close", {
	bubbles: true,
})
class ViewSettingsDialog extends UI5Element {
	/**
	 * Defines the initial sort order.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	sortDescending = false;

	/**
	 * Indicates if the dialog is open.
	 * @public
	 * @default false
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Keeps recently focused list in order to focus it on next dialog open.
	 * @private
	 */
	@property({ type: Object })
	_recentlyFocused?: List;

	/**
	 * Stores current settings of the dialog.
	 * @private
	 */
	@property({ type: Object })
	_currentSettings: VSDInternalSettings = {
		sortOrder: [],
		sortBy: [],
		filters: [],
	};

	/**
	 * Stores settings of the dialog before the initial open.
	 * @private
	 */
	@property({ type: Object })
	_initialSettings: VSDInternalSettings = this._currentSettings;

	/**
	 * Stores settings of the dialog after confirmation.
	 * @private
	 */
	@property({ type: Object })
	_confirmedSettings: VSDInternalSettings = this._currentSettings;

	/**
	 * Defnies the current mode of the component.
	 * @since 1.0.0-rc.16
	 * @private
	 */
	@property()
	_currentMode: `${ViewSettingsDialogMode}` = "Sort";

	/**
	 * When in Filter By mode, defines whether we need to show the list of keys, or the list with values.
	 * @since 1.0.0-rc.16
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_filterStepTwo = false;

	/**
	 * Defines the list of items against which the user could sort data.
	 *
	 * **Note:** If you want to use this slot, you need to import used item: `import "@ui5/webcomponents-fiori/dist/SortItem.js";`
	 * @public
	 */
	@slot()
	sortItems!: Array<SortItem>

	/**
	 * Defines the `filterItems` list.
	 *
	 * **Note:** If you want to use this slot, you need to import used item: `import "@ui5/webcomponents-fiori/dist/FilterItem.js";`
	 * @public
	 */
	@slot()
	filterItems!: Array<FilterItem>;

	_dialog?: Dialog;
	_sortOrder?: List;
	_sortBy?: List;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	onBeforeRendering() {
		if (this._currentSettings.filters && this._currentSettings.filters.length) {
			this._setAdditionalTexts();
		}

		if (!this.shouldBuildSort && this.shouldBuildFilter) {
			this._currentMode = ViewSettingsDialogMode.Filter;
		}
	}

	onInvalidation(changeInfo: ChangeInfo) {
		if (changeInfo.type === "slot") {
			this._confirmedSettings = this._settings;
		}
	}

	_setAdditionalTexts() {
		// Add the additional text to the filter options
		this.filterItems.forEach((filter, index) => {
			let selectedCount = 0;
			for (let i = 0; i < filter.values.length; i++) {
				if (this._currentSettings.filters[index].filterOptions[i].selected) {
					selectedCount++;
				}
			}

			filter.additionalText = !selectedCount ? "" : `${selectedCount}`;
		});
	}

	get _selectedFilter() {
		for (let i = 0; i < this._currentSettings.filters.length; i++) {
			if (this._currentSettings.filters[i].selected) {
				return this._currentSettings.filters[i];
			}
		}
	}

	get shouldBuildSort() {
		return !!this.sortItems.length;
	}

	get shouldBuildFilter() {
		return !!this.filterItems.length;
	}

	get hasPagination() {
		return this.shouldBuildSort && this.shouldBuildFilter;
	}

	get _filterByTitle() {
		const selectedFilterText = this._selectedFilter ? this._selectedFilter.text : "";
		return `${ViewSettingsDialog.i18nBundle.getText(VSD_FILTER_BY)}: ${selectedFilterText}`;
	}

	get _dialogTitle() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_DIALOG_TITLE_SORT);
	}

	get _okButtonLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_SUBMIT_BUTTON);
	}

	get _cancelButtonLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_CANCEL_BUTTON);
	}

	get _resetButtonLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_RESET_BUTTON);
	}

	get _ascendingLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_ORDER_ASCENDING);
	}

	get _descendingLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_ORDER_DESCENDING);
	}

	get _sortOrderLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_SORT_ORDER);
	}

	get _filterByLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_FILTER_BY);
	}

	get _sortByLabel() {
		return ViewSettingsDialog.i18nBundle.getText(VSD_SORT_BY);
	}

	get _isPhone() {
		return isPhone();
	}

	get _sortAscending() {
		return !this.sortDescending;
	}

	get _title() {
		return this.showBackButton
			? this._filterByTitle
			: this._dialogTitle;
	}

	/**
	 * Determines disabled state of the `Reset` button.
	 */
	get _disableResetButton() {
		return this._dialog && this._sortSetttingsAreInitial && this._filteresAreInitial;
	}

	get _sortSetttingsAreInitial() {
		let settingsAreInitial = true;
		["sortBy", "sortOrder"].forEach(sortList => {
			this._currentSettings[sortList as keyof VSDInternalSettings].forEach((item, index) => {
				if (item.selected !== this._initialSettings[sortList as keyof VSDInternalSettings][index].selected) {
					settingsAreInitial = false;
				}
			});
		});

		return settingsAreInitial;
	}

	get _filteresAreInitial() {
		let filtersAreInitial = true;
		this._currentSettings.filters.forEach((filter, index) => {
			for (let i = 0; i < filter.filterOptions.length; i++) {
				if (filter.filterOptions[i].selected !== this._initialSettings.filters[index].filterOptions[i].selected) {
					filtersAreInitial = false;
				}
			}
		});

		return filtersAreInitial;
	}

	/**
	 * Returns the current settings (current state of all lists).
	 */
	get _settings(): VSDInternalSettings {
		return {
			sortOrder: JSON.parse(JSON.stringify(this.initSortOrderItems)),
			sortBy: JSON.parse(JSON.stringify(this.initSortByItems)),
			filters: this.filterItems.map(item => {
				return {
					text: item.text || "",
					selected: false,
					filterOptions: item.values.map(optionValue => {
						return {
							text: optionValue.text || "",
							selected: optionValue.selected,
						};
					}),
				};
			}),
		};
	}

	get initSortByItems() {
		return this.sortItems.map((item, index) => {
			return {
				text: item.text,
				selected: item.selected,
				index,
			};
		});
	}

	get initSortOrderItems() {
		return [
			{
				text: this._ascendingLabel,
				selected: !this.sortDescending,
			},
			{
				text: this._descendingLabel,
				selected: this.sortDescending,
			},
		];
	}

	get expandContent() {
		return this._filterStepTwo || !this.hasPagination;
	}

	get isModeSort() {
		return this._currentMode === ViewSettingsDialogMode.Sort;
	}

	get isModeFilter() {
		return this._currentMode === ViewSettingsDialogMode.Filter;
	}

	get showBackButton() {
		return this.isModeFilter && this._filterStepTwo;
	}

	get _sortOrderListDomRef() {
		return this.shadowRoot!.querySelector<List>("[ui5-list][sort-order]")!;
	}

	get _sortByList() {
		return this.shadowRoot!.querySelector<List>("[ui5-list][sort-by]")!;
	}

	get _dialogDomRef() {
		return this.shadowRoot!.querySelector<Dialog>("[ui5-dialog]")!;
	}

	/**
	 * Shows the dialog.
	 */
	beforeDialogOpen(): void {
		if (!this._dialog) {
			this._sortOrder = this._sortOrderListDomRef;
			this._sortBy = this._sortByList;

			// Sorting
			this._initialSettings = this._settings;
			this._currentSettings = this._settings;
			this._confirmedSettings = this._settings;

			this._dialog = this._dialogDomRef;
		} else {
			this._restoreSettings(this._confirmedSettings);
		}

		this.fireDecoratorEvent("before-open", {});
	}

	afterDialogOpen(): void {
		this._dialog?.querySelector<List>("[ui5-list]")?.focusFirstItem();

		this._focusRecentlyUsedControl();

		this.fireDecoratorEvent("open");
	}

	afterDialogClose(): void {
		this.fireDecoratorEvent("close");
	}

	_handleModeChange(e: CustomEvent) { // use SegmentedButton event when done
		const mode: ViewSettingsDialogMode = e.detail.selectedItems[0].getAttribute("mode");
		this._currentMode = ViewSettingsDialogMode[mode];
	}

	_handleFilterValueItemClick(e: CustomEvent<ListSelectionChangeEventDetail>) {
		const itemText = e.detail.targetItem.innerText;

		// Update the component state
		this._currentSettings.filters = this._currentSettings.filters.map(filter => {
			if (filter.selected) {
				filter.filterOptions.forEach(option => {
					if (option.text === itemText) {
						option.selected = !option.selected;
					}
				});
			}
			return filter;
		});

		this._setSelectedProp(itemText);

		this._currentSettings = JSON.parse(JSON.stringify(this._currentSettings));
	}

	/**
	 * Sets the selected property of the clicked item.
	 * @param e
	 * @private
	 */
	_setSelectedProp(itemText: string) {
		this.filterItems.forEach(filterItem => {
			filterItem.values.forEach(option => {
				if (option.text === itemText) {
					option.selected = !option.selected;
				}
			});
		});
	}

	_navigateToFilters() {
		this._filterStepTwo = false;
	}

	_changeCurrentFilter(e: CustomEvent<ListItemClickEventDetail>) {
		this._filterStepTwo = true;
		this._currentSettings.filters = this._currentSettings.filters.map(filter => {
			filter.selected = filter.text === e.detail.item.innerText;
			return filter;
		});
	}

	/**
	 * Sets focus on recently used control within the dialog.
	 */
	_focusRecentlyUsedControl() {
		if (!this._recentlyFocused || !Object.keys(this._recentlyFocused).length) {
			return;
		}

		const recentlyFocusedSelectedItems = this._recentlyFocused.getSelectedItems();
		if (recentlyFocusedSelectedItems.length) {
			recentlyFocusedSelectedItems[0].focus();
		}
	}

	/**
	 * Stores current settings as confirmed and fires `confirm` event.
	 */
	_confirmSettings() {
		this.open = false;
		this._confirmedSettings = this._currentSettings;

		this.fireDecoratorEvent<ViewSettingsDialogConfirmEventDetail>("confirm", this.eventsParams);
	}

	/**
	 * Sets current settings to recently confirmed ones and fires `cancel` event.
	 */
	_cancelSettings() {
		this._restoreSettings(this._confirmedSettings);

		this.fireDecoratorEvent<ViewSettingsDialogCancelEventDetail>("cancel", this.eventsParams);
		this.open = false;
	}

	get eventsParams() {
		const _currentSortOrderSelected = this._currentSettings.sortOrder.filter(item => item.selected)[0],
			_currentSortBySelected = this._currentSettings.sortBy.filter(item => item.selected)[0],
			sortOrder = _currentSortOrderSelected && (_currentSortOrderSelected.text || ""),
			sortDescending = !this._currentSettings.sortOrder[0].selected,
			sortBy = _currentSortBySelected && (_currentSortBySelected.text || ""),
			sortByElementIndex = _currentSortBySelected && _currentSortBySelected.index,
			sortByItem = this.sortItems[sortByElementIndex],
			selectedFilterItems = this.filterItems.filter(filterItem => filterItem.values.some(item => item.selected));
		return {
			sortOrder,
			sortDescending,
			sortBy,
			sortByItem,
			filters: this.selectedFilters,
			filterItems: selectedFilterItems,
		};
	}

	get selectedFilters() {
		const result: VSDFilters = [];

		this._currentSettings.filters.forEach(filter => {
			const selectedOptions: Array<string> = [];

			filter.filterOptions.forEach(option => {
				if (option.selected) {
					selectedOptions.push(option.text || "");
				}
			});

			if (selectedOptions.length) {
				result.push({});
				result[result.length - 1][filter.text || ""] = selectedOptions;
			}
		});

		return result;
	}

	/**
	 * If the dialog is closed by [Escape] key, do the same as if the `Cancel` button is pressed.
	 * @param evt
	 */
	_restoreConfirmedOnEscape(evt: CustomEvent) { // Dialog#before-close
		if (evt.detail.escPressed) {
			this._cancelSettings();
			this._currentMode = ViewSettingsDialogMode.Sort;
			this._filterStepTwo = false;
		}
	}

	/**
	 * Resets the control settings to their initial state.
	 */
	 _resetSettings() {
		this._restoreSettings(this._initialSettings);
		this._recentlyFocused = this._sortOrder!;
		this._focusRecentlyUsedControl();
	}

	/**
	 * Sets current settings to ones passed as `settings` argument.
	 * @param settings
	 */
	_restoreSettings(settings: VSDInternalSettings) {
		this._currentSettings = JSON.parse(JSON.stringify(settings));
		this._currentMode = ViewSettingsDialogMode.Sort;
		this._filterStepTwo = false;
	}

	/**
	 * Stores `Sort Order` list as recently used control and its selected item in current state.
	 */
	_onSortOrderChange(e: CustomEvent<ListSelectionChangeEventDetail>) {
		this._recentlyFocused = this._sortOrder!;
		this._currentSettings.sortOrder = this.initSortOrderItems.map(item => {
			item.selected = item.text === e.detail.targetItem.innerText;
			return item;
		});

		// Invalidate
		this._currentSettings = JSON.parse(JSON.stringify(this._currentSettings));
	}

	/**
	 * Stores `Sort By` list as recently used control and its selected item in current state.
	 */
	 _onSortByChange(e: CustomEvent<ListSelectionChangeEventDetail>) {
		const selectedItemIndex = Number(e.detail.targetItem.getAttribute("data-ui5-external-action-item-index"));
		this._recentlyFocused = this._sortBy!;
		this._currentSettings.sortBy = this.initSortByItems.map((item, index) => {
			item.selected = index === selectedItemIndex;
			return item;
		});
		// Invalidate
		this._currentSettings = JSON.parse(JSON.stringify(this._currentSettings));
	}

	/**
	 * Sets a JavaScript object, as settings to the `ui5-view-settings-dialog`.
	 * This method can be used after the dialog is initially open, as the dialog needs
	 * to set its initial settings.
	 * The `ui5-view-settings-dialog` throws an event called "before-open",
	 * which can be used as a trigger point.
	 * The object should have the following format:
	 * @param settings - predefined settings.
	 * @public
	 */
	setConfirmedSettings(settings: VSDSettings): void {
		if (settings && this._dialog && !this._dialog.open) {
			const tempSettings: VSDInternalSettings = JSON.parse(JSON.stringify(this._confirmedSettings));
			if (settings.sortOrder) {
				for (let i = 0; i < tempSettings.sortOrder.length; i++) {
					if (tempSettings.sortOrder[i].text === settings.sortOrder) {
						tempSettings.sortOrder[i].selected = true;
					} else {
						tempSettings.sortOrder[i].selected = false;
					}
				}
			}

			if (settings.sortBy) {
				for (let i = 0; i < tempSettings.sortBy.length; i++) {
					if (tempSettings.sortBy[i].text === settings.sortBy) {
						tempSettings.sortBy[i].selected = true;
					} else {
						tempSettings.sortBy[i].selected = false;
					}
				}
			}

			if (settings.filters) {
				const inputFilters: VSDFilter = {};
				for (let i = 0; i < settings.filters.length; i++) {
					inputFilters[Object.keys(settings.filters[i])[0]] = settings.filters[i][Object.keys(settings.filters[i])[0]];
				}

				for (let i = 0; i < tempSettings.filters.length; i++) {
					for (let j = 0; j < tempSettings.filters[i].filterOptions.length; j++) {
						if (inputFilters[tempSettings.filters[i].text || ""] && inputFilters[tempSettings.filters[i].text || ""].indexOf(tempSettings.filters[i].filterOptions[j].text || "") > -1) {
							tempSettings.filters[i].filterOptions[j].selected = true;
						} else {
							tempSettings.filters[i].filterOptions[j].selected = false;
						}
					}
				}
			}

			this._confirmedSettings = JSON.parse(JSON.stringify(tempSettings));
		}
	}
}

ViewSettingsDialog.define();

export default ViewSettingsDialog;
export type {
	ViewSettingsDialogConfirmEventDetail,
	ViewSettingsDialogCancelEventDetail,
	VSDSettings,
};
