import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type NavigationMenu from "./NavigationMenu.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type SideNavigationItemBase from "./SideNavigationItemBase.js";
import type SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import type SideNavigationItem from "./SideNavigationItem.js";
import type SideNavigationSubItem from "./SideNavigationSubItem.js";
type SideNavigationPopoverContents = {
    item: SideNavigationItem;
    subItems: Array<SideNavigationSubItem>;
};
type SideNavigationSelectionChangeEventDetail = {
    item: SideNavigationItemBase;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `SideNavigation` is used as a standard menu in applications.
 * It consists of three containers: header (top-aligned), main navigation section (top-aligned) and the secondary section (bottom-aligned).
 *
 *  - The header is meant for displaying user related information - profile data, avatar, etc.
 *  - The main navigation section is related to the user’s current work context
 *  - The secondary section is mostly used to link additional information that may be of interest (legal information, developer communities, external help, contact information and so on).
 *
 * ### Usage
 *
 * Use the available `ui5-side-navigation-group`, `ui5-side-navigation-item`
 * and `ui5-side-navigation-sub-item` components to build your menu.
 * The items can consist of text only or an icon with text. The use or non-use of icons must be consistent for all items on one level.
 * You must not combine entries with and without icons on the same level. We strongly recommend that you do not use icons on the second level.
 *
 * The `ui5-side-navigation` component is designed to be used within a `ui5-navigation-layout` component to ensure an optimal user experience.
 *
 * Using it standalone may not match the intended design and functionality.
 * For example, the side navigation may not exhibit the correct behavior on smaller screens.
 * Additionally, the padding of the `ui5-shellbar` will not match the padding of the side navigation.
 *
 * ### Keyboard Handling
 *
 * ### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigation.js"`
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";` (for `ui5-side-navigation-group`)
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";` (for `ui5-side-navigation-item`)
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";` (for `ui5-side-navigation-sub-item`)
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.8
 * @public
 */
declare class SideNavigation extends UI5Element {
    eventDetails: {
        "selection-change": SideNavigationSelectionChangeEventDetail;
    };
    /**
     * Defines whether the `ui5-side-navigation` is expanded or collapsed.
     *
     * **Note:** On small screens (screen width of 599px or less) the collapsed mode is not supported, and in
     * expanded mode the side navigation will take the whole width of the screen.
     * The `ui5-side-navigation` component is intended to be used within a `ui5-navigation-layout`
     * component to ensure proper responsive behavior. If you choose not to use the
     * `ui5-navigation-layout`, you will need to implement the appropriate responsive patterns yourself,
     * particularly for smaller screens where the collapsed mode should not be used.
     *
     * @public
     * @default false
     */
    collapsed: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 2.9.0
     */
    accessibleName?: string;
    /**
     * Defines the main items of the component.
     *
     * @public
     */
    items: DefaultSlot<SideNavigationItemBase>;
    /**
     * Defines the fixed items at the bottom of the component.
     *
     * **Note:** In order to achieve the best user experience, it is recommended that you keep the fixed items "flat" (do not pass sub-items)
     *
     * @public
     */
    fixedItems: Slot<SideNavigationItemBase>;
    /**
     * Defines the header of the `ui5-side-navigation`.
     *
     * **Note:** The header is displayed when the component is expanded - the property `collapsed` is false;
     *
     * @public
     * @since 1.0.0-rc.11
     */
    header: Slot<HTMLElement>;
    /**
     * @private
     */
    _popoverContents: SideNavigationPopoverContents;
    inPopover: boolean;
    _menuPopoverItems: Array<SideNavigationItem>;
    _isOverflow: boolean;
    _flexibleItemNavigation: ItemNavigation;
    _fixedItemNavigation: ItemNavigation;
    static i18nBundle: I18nBundle;
    constructor();
    _handleResizeBound: () => void;
    onBeforeRendering(): void;
    initGroupsSettings(items: Array<SideNavigationItemBase>): void;
    _onAfterPopoverOpen(): void;
    _onBeforePopoverOpen(): void;
    _onBeforePopoverClose(): void;
    _onBeforeMenuOpen(): void;
    _onBeforeMenuClose(): void;
    _bn?: SideNavigationSelectableItemBase;
    _onMenuClose(): void;
    get accSideNavigationPopoverHiddenText(): string;
    get ariaRoleDescNavigationList(): string;
    get navigationMenuPrimaryHiddenText(): string;
    get navigationMenuFooterHiddenText(): string;
    get overflowAccessibleName(): string;
    handlePopupItemClick(e: KeyboardEvent | PointerEvent): void;
    getOverflowPopover(): NavigationMenu;
    getPicker(): ResponsivePopover;
    openPicker(opener: HTMLElement): void;
    openOverflowMenu(opener: HTMLElement): void;
    closePicker(): void;
    closeMenu(preventFocusRestore?: boolean): void;
    getPickerTree(): SideNavigation;
    get hasHeader(): boolean;
    get showHeader(): boolean;
    get hasFixedItems(): boolean;
    get _rootRole(): "none" | undefined;
    getEnabledFixedItems(): Array<ITabbable>;
    getEnabledFlexibleItems(): Array<ITabbable>;
    getEnabledItems(items: Array<SideNavigationItemBase>): Array<ITabbable>;
    focusItem(item: SideNavigationItemBase): void;
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    handleResize(): void;
    _updateOverflowItems(): null | undefined;
    _findFocusedItem(items: Array<SideNavigationItemBase>): SideNavigationItemBase | undefined;
    _getSelectableItems(items: Array<SideNavigationItemBase>): Array<SideNavigationSelectableItemBase>;
    _getFocusableItems(items: Array<SideNavigationItemBase>): Array<SideNavigationItemBase>;
    _getAllItems(items: Array<SideNavigationItemBase>): Array<SideNavigationItemBase>;
    _findSelectedItem(items: Array<SideNavigationItemBase>): SideNavigationSelectableItemBase | undefined;
    get overflowItems(): Array<HTMLElement>;
    _handleItemClick(e: KeyboardEvent | MouseEvent, item: SideNavigationSelectableItemBase): void;
    _handleOverflowClick(): void;
    _getOverflowItems(): Array<SideNavigationItem>;
    _selectItem(item: SideNavigationSelectableItemBase): void;
    get _overflowItem(): SideNavigationItem | null;
    get isOverflow(): boolean;
    captureRef(ref: HTMLElement & {
        associatedItem?: UI5Element;
    } | null): void;
}
export default SideNavigation;
export type { SideNavigationSelectionChangeEventDetail, };
