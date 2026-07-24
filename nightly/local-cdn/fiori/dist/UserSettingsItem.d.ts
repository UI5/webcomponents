import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { TabContainerTabSelectEventDetail } from "@ui5/webcomponents/dist/TabContainer.js";
import type UserSettingsView from "./UserSettingsView.js";
type UserSettingsItemViewSelectEventDetail = {
    view: UserSettingsView;
};
type UserSettingsItemBackClickEventDetail = {
    view: UserSettingsView;
};
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-item` represents an item in the `ui5-user-settings-dialog`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsItem.js";`
 *
 * You can disable the <code>UserSettingsItem</code> by setting the <code>enabled</code> property to <code>false</code>,
 * or use the <code>UserSettingsItem</code> in read-only mode by setting the <code>editable</code> property to false.
 *
 * <b>Note:</b> Disabled and read-only states shouldn't be used together.
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.8.0
 */
declare class UserSettingsItem extends UI5Element {
    eventDetails: {
        "_collapse": void;
        "selection-change": UserSettingsItemViewSelectEventDetail;
        "back-click": UserSettingsItemBackClickEventDetail;
    };
    /**
     * Defines the text of the user settings item.
     *
     * @public
     * @default ""
     */
    text: string;
    /**
     * Defines the tooltip of the component.
     *
     * A tooltip attribute should be provided to represent the meaning or function when the component is collapsed and only the icon is visible.
     * @default ""
     * @public
     */
    tooltip: string;
    /**
     * Defines the headerText of the item.
     *
     * @public
     * @default ""
     */
    headerText?: string;
    /**
     * Shows item tab.
     *
     * @public
     * @default false
     */
    selected: boolean;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is completely noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Indicates whether a loading indicator should be shown.
     * @default false
     * @public
     */
    loading: boolean;
    /**
     * Indicates why the control is in loading state.
     * @default undefined
     * @public
     */
    loadingReason?: string;
    /**
     * Defines the icon of the component.
     *
     * @default "globe"
     * @public
     */
    icon: string;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     */
    accessibleName?: string;
    /**
     * Defines the page views of the user settings item.
     *
     * If there are no tab views, the first page view will be shown unless there is selected one. If there is selected page
     * view it will be shown no matter if there are tab views.
     *
     * The page views are displayed by default if there is no selected tab view.
     *
     * @public
     */
    pages: DefaultSlot<UserSettingsView>;
    /**
     * Defines the tab views of the user settings item.
     *
     * @public
     */
    tabs: Slot<UserSettingsView>;
    /**
     * Indicates whether any of the element siblings have icon.
     */
    _siblingsWithIcon: boolean;
    /**
     * @private
     */
    _individualSlot?: string;
    get _hasSelectedPageView(): boolean;
    get _selectedPageView(): UserSettingsView;
    get ariaLabelledByText(): string;
    get _tooltip(): string;
    get _icon(): string;
    _handleBackButtonClick(): void;
    _handleTabSelect(e: CustomEvent<TabContainerTabSelectEventDetail>): void;
    get _shouldShowBackButton(): boolean;
    captureRef(this: UserSettingsView, ref: HTMLElement & {
        associatedSettingView?: UserSettingsView;
    } | null): void;
}
export default UserSettingsItem;
export type { UserSettingsItemViewSelectEventDetail, UserSettingsItemBackClickEventDetail, };
