import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type Dialog from "@ui5/webcomponents/dist/Dialog.js";
import type List from "@ui5/webcomponents/dist/List.js";
import type { ListItemClickEventDetail, ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import ViewSettingsDialogMode from "./types/ViewSettingsDialogMode.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/group-2.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import type SortItem from "./SortItem.js";
import type FilterItem from "./FilterItem.js";
import type GroupItem from "./GroupItem.js";
type VSDFilter = Record<string, Array<string>>;
type VSDFilters = Array<VSDFilter>;
type VSDSettings = {
    sortOrder: string;
    sortBy: string;
    filters: VSDFilters;
    groupOrder: string;
    groupBy: string;
};
type ViewSettingsDialogConfirmEventDetail = VSDSettings & {
    sortByItem: SortItem;
    sortDescending: boolean;
    groupByItem: GroupItem;
    groupDescending: boolean;
};
type ViewSettingsDialogCancelEventDetail = VSDSettings & {
    sortByItem: SortItem;
    sortDescending: boolean;
    groupByItem: GroupItem;
    groupDescending: boolean;
};
type VSDItem = {
    text?: string;
    selected: boolean;
};
type VSDInternalSettings = {
    sortOrder: Array<VSDItem>;
    sortBy: Array<VSDItem & {
        index: number;
    }>;
    filters: Array<VSDItem & {
        filterOptions: Array<VSDItem>;
    }>;
    groupOrder: Array<VSDItem>;
    groupBy: Array<VSDItem & {
        index: number;
    }>;
};
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
 * @csspart header - Used to style the header.
 */
declare class ViewSettingsDialog extends UI5Element {
    eventDetails: {
        "confirm": ViewSettingsDialogConfirmEventDetail;
        "cancel": ViewSettingsDialogCancelEventDetail;
        "before-open": void;
        "open": void;
        "close": void;
    };
    /**
     * Defines the initial sort order.
     * @default false
     * @public
     */
    sortDescending: boolean;
    /**
     * Defines the initial group order.
     * @default false
     * @since 2.13.0
     * @public
     */
    groupDescending: boolean;
    /**
     * Indicates if the dialog is open.
     * @public
     * @default false
     * @since 2.0.0
     */
    open: boolean;
    /**
     * Keeps recently focused list in order to focus it on next dialog open.
     * @private
     */
    _recentlyFocused?: List;
    /**
     * Stores current settings of the dialog.
     * @private
     */
    _currentSettings: VSDInternalSettings;
    /**
     * Stores settings of the dialog before the initial open.
     * @private
     */
    _initialSettings: VSDInternalSettings;
    /**
     * Stores settings of the dialog after confirmation.
     * @private
     */
    _confirmedSettings: VSDInternalSettings;
    /**
     * Defnies the current mode of the component.
     * @since 1.0.0-rc.16
     * @private
     */
    _currentMode: `${ViewSettingsDialogMode}`;
    /**
     * When in Filter By mode, defines whether we need to show the list of keys, or the list with values.
     * @since 1.0.0-rc.16
     * @private
     */
    _filterStepTwo: boolean;
    /**
     * Defines the list of items against which the user could sort data.
     *
     * **Note:** If you want to use this slot, you need to import used item: `import "@ui5/webcomponents-fiori/dist/SortItem.js";`
     * @public
     */
    sortItems: Slot<SortItem>;
    /**
     * Defines the `filterItems` list.
     *
     * **Note:** If you want to use this slot, you need to import used item: `import "@ui5/webcomponents-fiori/dist/FilterItem.js";`
     * @public
     */
    filterItems: Slot<FilterItem>;
    /**
     * Defines the list of items against which the user could group data.
     *
     * **Note:** If you want to use this slot, you need to import used item: `import "@ui5/webcomponents-fiori/dist/GroupItem.js";`
     * @public
     */
    groupItems: Slot<GroupItem>;
    _list: List;
    _dialog?: Dialog;
    _sortOrder?: List;
    _sortBy?: List;
    _groupOrder?: List;
    _groupBy?: List;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    onInvalidation(changeInfo: ChangeInfo): void;
    _setAdditionalTexts(): void;
    get _selectedFilter(): (VSDItem & {
        filterOptions: Array<VSDItem>;
    }) | undefined;
    _selectedFiltersLabel(item: FilterItem): string;
    get shouldBuildSort(): boolean;
    get shouldBuildFilter(): boolean;
    get shouldBuildGroup(): boolean;
    get hasPagination(): boolean;
    get _filterByTitle(): string;
    get _dialogTitle(): string;
    get _okButtonLabel(): string;
    get _cancelButtonLabel(): string;
    get _resetButtonLabel(): string;
    get _ascendingLabel(): string;
    get _descendingLabel(): string;
    get _sortOrderLabel(): string;
    get _groupOrderLabel(): string;
    get _filterByLabel(): string;
    get _sortByLabel(): string;
    get _groupByLabel(): string;
    get _sortButtonTooltip(): string;
    get _filterButtonTooltip(): string;
    get _groupButtonTooltip(): string;
    get _resetButtonAction(): string;
    get _isPhone(): boolean;
    get _sortAscending(): boolean;
    get _title(): string;
    /**
     * Determines disabled state of the `Reset` button.
     */
    get _disableResetButton(): boolean | undefined;
    get _settingsAreInitial(): boolean;
    get _filteresAreInitial(): boolean;
    /**
     * Returns the current settings (current state of all lists).
     */
    get _settings(): VSDInternalSettings;
    get initSortByItems(): {
        text: string | undefined;
        selected: boolean;
        index: number;
    }[];
    get initGroupByItems(): {
        text: string | undefined;
        selected: boolean;
        index: number;
    }[];
    get initSortOrderItems(): {
        text: string;
        selected: boolean;
    }[];
    get initGroupOrderItems(): {
        text: string;
        selected: boolean;
    }[];
    get expandContent(): boolean;
    get isModeSort(): boolean;
    get isModeFilter(): boolean;
    get isModeGroup(): boolean;
    get showBackButton(): boolean;
    /**
     * Shows the dialog.
     */
    beforeDialogOpen(): void;
    afterDialogOpen(): void;
    afterDialogClose(): void;
    _handleModeChange(e: CustomEvent): void;
    _handleFilterValueItemClick(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    /**
     * Sets the selected property of the clicked item.
     * @private
     */
    _setSelectedProp(itemText: string): void;
    _navigateToFilters(): void;
    _changeCurrentFilter(e: CustomEvent<ListItemClickEventDetail>): void;
    /**
     * Sets focus on recently used control within the dialog.
     */
    _focusRecentlyUsedControl(): void;
    /**
     * Stores current settings as confirmed and fires `confirm` event.
     */
    _confirmSettings(): void;
    /**
     * Sets current settings to recently confirmed ones and fires `cancel` event.
     */
    _cancelSettings(): void;
    get eventsParams(): {
        sortOrder: string;
        sortDescending: boolean;
        sortBy: string;
        sortByItem: SortItem;
        groupOrder: string;
        groupDescending: boolean;
        groupBy: string;
        groupByItem: GroupItem;
        filters: VSDFilters;
        filterItems: FilterItem[];
    };
    get selectedFilters(): VSDFilters;
    /**
     * If the dialog is closed by [Escape] key, do the same as if the `Cancel` button is pressed.
     * @param evt
     */
    _restoreConfirmedOnEscape(evt: CustomEvent): void;
    /**
     * Resets the control settings to their initial state.
     */
    _resetSettings(): void;
    /**
     * Sets current settings to ones passed as `settings` argument.
     * @param settings
     */
    _restoreSettings(settings: VSDInternalSettings): void;
    /**
     * Stores `Sort Order` list as recently used control and its selected item in current state.
     */
    _onSortOrderChange(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    /**
     * Stores `Sort By` list as recently used control and its selected item in current state.
     */
    _onSortByChange(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    /**
     * Stores `Group Order` list as recently used control and its selected item in current state.
     */
    _onGroupOrderChange(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    /**
     * Stores `Group By` list as recently used control and its selected item in current state.
     */
    _onGroupByChange(e: CustomEvent<ListSelectionChangeEventDetail>): void;
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
    setConfirmedSettings(settings: VSDSettings): void;
}
export default ViewSettingsDialog;
export type { ViewSettingsDialogConfirmEventDetail, ViewSettingsDialogCancelEventDetail, VSDSettings, };
