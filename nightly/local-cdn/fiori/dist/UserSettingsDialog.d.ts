import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { InputEventDetail } from "@ui5/webcomponents/dist/Input.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
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
     * Defines the current media query size.
     * @private
     */
    _mediaRange?: any;
    onBeforeRendering(): void;
    _handleItemClick(e: CustomEvent<ListItemClickEventDetail>): void;
    _handleDialogAfterOpen(): void;
    _handleDialogBeforeClose(e: CustomEvent<PopupBeforeCloseEventDetail>): void;
    _handleDialogAfterClose(): void;
    get accessibleNameText(): string;
    get ariaRoleDescList(): string;
    get closeButtonText(): string;
    get noSearchResultsText(): string;
    get _selectedItemSlotName(): string | undefined;
    get _showSettingWithNavigation(): boolean;
    _handleCloseButtonClick(): void;
    _handleCollapseClick(): void;
    _handleInput(e: CustomEvent<InputEventDetail>): void;
    captureRef(ref: HTMLElement & {
        associatedSettingItem?: UI5Element;
    } | null): void;
}
export default UserSettingsDialog;
export type { UserSettingsItemSelectEventDetail, UserSettingsBeforeCloseEventDetail, };
