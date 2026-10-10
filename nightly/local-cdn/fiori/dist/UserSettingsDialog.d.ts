import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { InputEventDetail } from "@ui5/webcomponents/dist/Input.js";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { PopupBeforeCloseEventDetail } from "@ui5/webcomponents/dist/Popup.js";
import type UserSettingsItem from "./UserSettingsItem.js";
type UserSettingsItemSelectEventDetail = {
    item: UserSettingsItem;
};
type UserSettingsBeforeCloseEventDetail = PopupBeforeCloseEventDetail;
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-dialog` is an SAP Fiori-specific web component used in the `ui5-user-menu`.
 * It allows the user to easily view information and settings for an account.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsDialog.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.8.0
 */
declare class UserSettingsDialog extends UI5Element {
    eventDetails: {
        "selection-change": UserSettingsItemSelectEventDetail;
        "open": void;
        "before-close": UserSettingsBeforeCloseEventDetail;
        "close": void;
        "save": void;
        "cancel": void;
    };
    /**
     * Defines, if the User Settings Dialog is opened.
     *
     * @default false
     * @public
     */
    open: boolean;
    /**
     * Defines the headerText of the item.
     *
     * @public
     * @default undefined
     */
    headerText?: string;
    /**
     * Defines if the Search Field would be displayed.
     *
     * **Note:** By default the Search Field is not displayed.
     * @default false
     * @public
     */
    showSearchField: boolean;
    /**
     * Defines whether the dialog offers Save and Cancel actions in its footer.
     *
     * When true, the footer renders a Save (Emphasized) and a Cancel button
     * instead of the default Close button. Save and Cancel each fire a
     * corresponding event; the application is responsible for closing the
     * dialog (typically after persisting or discarding the changes).
     *
     * @default false
     * @public
     */
    saveMode: boolean;
    /**
     * Defines the user settings items.
     *
     * **Note:**  If no setting item is set as `selected`, the first one will be selected.
     * @public
     */
    items: DefaultSlot<UserSettingsItem>;
    /**
     * Defines the fixed user settings items.
     *
     * @public
     */
    fixedItems: Slot<UserSettingsItem>;
    static i18nBundle: I18nBundle;
    /**
     * @private
     */
    _searchValue: string;
    /**
     * @private
     */
    _collapsed: boolean;
    /**
     * @private
     */
    _selectedSetting?: UserSettingsItem;
    /**
     * @private
     */
    _filteredItems: Array<UserSettingsItem>;
    /**
     * @private
     */
    _filteredFixedItems: Array<UserSettingsItem>;
    /**
     * @private
     */
    _showNoSearchResult: boolean;
    /**
     * Indicates that the user changed the search value and the search
     * results should be announced on the next rendering.
     * @private
     */
    _announceSearchResults: boolean;
    /**
     * Defines the current media query size.
     * @private
     */
    _mediaRange?: any;
    onEnterDOM(): void;
    onBeforeRendering(): void;
    /**
     * Handles selection of a side-navigation item. The inner `ui5-list` runs in
     * `selectionMode="Single"`, so it already owns the `selected` state on the
     * `ui5-li` items and provides the accessibility layers (aria-selected, the
     * hidden "Selected"/"Not Selected" text and the polite announcement) for free.
     *
     * Here we only mirror the selection back onto the `UserSettingsItem` model
     * (which drives `_selectedSetting` and the content slot) and re-fire the public
     * `selection-change`. If the application cancels it, we revert the list selection.
     */
    _handleSelectionChange(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    /**
     * Handles activation of a side-navigation item. In navigation (single-column)
     * mode the content replaces the list, so this drives the drill-in behavior and
     * moves the focus to the content. It runs on every activation - including
     * re-activating the already-selected item, which fires no `selection-change`.
     */
    _handleItemClick(): Promise<void>;
    _handleDialogAfterOpen(): void;
    _handleDialogBeforeClose(e: CustomEvent<PopupBeforeCloseEventDetail>): void;
    _handleDialogAfterClose(): void;
    get accessibleNameText(): string;
    get ariaRoleDescList(): string;
    get closeButtonText(): string;
    get saveButtonText(): string;
    get cancelButtonText(): string;
    get noSearchResultsText(): string;
    get _searchResultsText(): string;
    get _selectedItemSlotName(): string | undefined;
    get _showSettingWithNavigation(): boolean;
    _handleCloseButtonClick(): void;
    _handleSaveButtonClick(): void;
    _handleCancelButtonClick(): void;
    _handleCollapseClick(): Promise<void>;
    _handleInput(e: CustomEvent<InputEventDetail>): void;
    captureRef(ref: HTMLElement & {
        associatedSettingItem?: UI5Element;
    } | null): void;
}
export default UserSettingsDialog;
export type { UserSettingsItemSelectEventDetail, UserSettingsBeforeCloseEventDetail, };
