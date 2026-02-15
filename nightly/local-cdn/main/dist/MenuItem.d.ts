import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { AccessibilityAttributes, AriaHasPopup, AriaRole } from "@ui5/webcomponents-base";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import MenuItemGroupCheckMode from "./types/MenuItemGroupCheckMode.js";
import type { ListItemAccessibilityAttributes } from "./ListItem.js";
import type List from "./List.js";
import ListItem from "./ListItem.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import type { IMenuItem } from "./Menu.js";
type MenuBeforeOpenEventDetail = {
    item?: MenuItem;
};
type MenuBeforeCloseEventDetail = {
    escPressed: boolean;
};
type MenuNavigateOutOfEndContentEventDetail = {
    shouldNavigateToNextItem: boolean;
};
type MenuItemAccessibilityAttributes = Pick<AccessibilityAttributes, "ariaKeyShortcuts" | "role"> & ListItemAccessibilityAttributes;
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu-item` is the item to use inside a `ui5-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Usage
 *
 * `ui5-menu-item` represents a node in a `ui5-menu`. The menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a list item in that list. Therefore, you should only use
 * `ui5-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItem.js";`
 * @constructor
 * @extends ListItem
 * @implements {IMenuItem}
 * @since 1.3.0
 * @public
 */
declare class MenuItem extends ListItem implements IMenuItem {
    eventDetails: ListItem["eventDetails"] & {
        "before-open": MenuBeforeOpenEventDetail;
        "open": void;
        "before-close": MenuBeforeCloseEventDetail;
        "close": void;
        "close-menu": void;
        "check": void;
        "exit-end-content": MenuNavigateOutOfEndContentEventDetail;
    };
    /**
     * Defines the text of the tree item.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the `additionalText`, displayed in the end of the menu item.
     *
     * **Note:** The additional text will not be displayed if there are items added in `items` slot or there are
     * components added to `endContent` slot.
     *
     * The priority of what will be displayed at the end of the menu item is as follows:
     * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
     * @default undefined
     * @public
     * @since 1.8.0
     */
    additionalText?: string;
    /**
     * Defines the icon to be displayed as graphical element within the component.
     * The SAP-icons font provides numerous options.
     *
     * **Example:**
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines whether menu item is in disabled state.
     *
     * **Note:** A disabled menu item is noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding menu popover.
     *
     * **Note:** If set to `true` a busy indicator component will be displayed into the related one to the current menu item sub-menu popover.
     * @default false
     * @public
     * @since 1.13.0
     */
    loading: boolean;
    /**
     * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding menu popover.
     * @default 1000
     * @public
     * @since 1.13.0
     */
    loadingDelay: number;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.7.0
     */
    accessibleName?: string;
    /**
     * Defines the text of the tooltip for the menu item.
     * @default undefined
     * @public
     * @since 1.23.0
     */
    tooltip?: string;
    /**
     * Defines whether menu item is in checked state.
     *
     * **Note:** checked state is only taken into account when menu item is added to menu item group
     * with `checkMode` other than `None`.
     *
     * **Note:** A checked menu item has a checkmark displayed at its end.
     * @default false
     * @public
     * @since 2.12.0
     */
    checked: boolean;
    /**
     * Defines the additional accessibility attributes that will be applied to the component.
     * The following fields are supported:
     *
     * - **ariaKeyShortcuts**: Indicated the availability of a keyboard shortcuts defined for the menu item.
     *
     * - **role**: Defines the role of the menu item. If not set, menu item will have default role="menuitem".
     * @public
     * @since 2.1.0
     * @default {}
     */
    accessibilityAttributes: MenuItemAccessibilityAttributes;
    /**
     * Indicates whether any of the element siblings have icon.
     */
    _siblingsWithIcon: boolean;
    /**
     * Defines the component's check mode.
     * @default "None"
     * @private
     */
    _checkMode: `${MenuItemGroupCheckMode}`;
    /**
     * Defines the items of this component.
     *
     * **Note:** The slot can hold menu item and menu separator items.
     *
     * If there are items added to this slot, an arrow will be displayed at the end
     * of the item in order to indicate that there are items added. In that case components added
     * to `endContent` slot or `additionalText` content will not be displayed.
     *
     * The priority of what will be displayed at the end of the menu item is as follows:
     * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
     * @public
     */
    items: DefaultSlot<IMenuItem>;
    /**
     * Defines the components that should be displayed at the end of the menu item.
     *
     * **Note:** It is highly recommended to slot only components of type `ui5-button`,`ui5-link`
     * or `ui5-icon` in order to preserve the intended design. If there are components added to this slot,
     * and there is text set in `additionalText`, it will not be displayed. If there are items added to `items` slot,
     * nether `additionalText` nor components added to this slot would be displayed.
     *
     * The priority of what will be displayed at the end of the menu item is as follows:
     * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
     *
     * Application developers are responsible for ensuring that interactive elements placed in the `endContent` slot
     * have the correct accessibility behaviour, including their enabled or disabled states.
     * The menu does not manage these aspects when the menu item state changes.
     * @public
     * @since 2.0.0
     */
    endContent: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    _itemNavigation: ItemNavigation;
    _shiftPressed: boolean;
    _openedByMouse: boolean;
    constructor();
    get _list(): List | null;
    get _navigableItems(): Array<HTMLElement>;
    get _isCheckable(): boolean;
    _navigateToEndContent(shouldNavigateToPreviousItem: boolean): void;
    get isRtl(): boolean;
    get hasSubmenu(): boolean;
    get hasEndContent(): boolean;
    get hasIcon(): boolean;
    get isSubMenuOpen(): boolean | undefined;
    get menuHeaderTextPhone(): string | undefined;
    get isPhone(): boolean;
    get labelBack(): string;
    get labelCancel(): string;
    get accessibleNameText(): string;
    onBeforeRendering(): void;
    focus(focusOptions?: FocusOptions): Promise<void>;
    get _focusable(): boolean;
    get _role(): "menuitem" | "menuitemcheckbox" | "menuitemradio";
    get _accInfo(): {
        role: AriaRole;
        ariaHaspopup?: `${AriaHasPopup}`;
        ariaKeyShortcuts?: string;
        ariaExpanded?: boolean;
        ariaHidden?: boolean;
        ariaChecked?: boolean;
        ariaLevel?: number;
        ariaLabel: string;
        ariaLabelRadioButton: string;
        ariaSelectedText?: string;
        posinset?: number;
        setsize?: number;
        ariaSelected?: boolean;
        listItemAriaLabel?: string;
        ariaOwns?: string;
        tooltip?: string;
    };
    get _popover(): ResponsivePopover | null;
    get _markChecked(): boolean;
    /** Returns menu item groups */
    get _menuItemGroups(): import("./MenuItemGroup.js").default[];
    /** Returns menu items */
    get _menuItems(): MenuItem[];
    /** Returns all menu items (including those in groups */
    get _allMenuItems(): MenuItem[];
    /** Returns menu items included in the ItemNavigation */
    get _navigatableMenuItems(): MenuItem[];
    _setupItemNavigation(): void;
    _closeOtherSubMenus(item: MenuItem): void;
    _itemMouseOver(e: MouseEvent): void;
    _isSpace(e: KeyboardEvent): boolean;
    _isEnter(e: KeyboardEvent): boolean;
    _onclick(e: MouseEvent): void;
    _itemKeyDown(e: KeyboardEvent): void;
    _itemKeyUp(e: KeyboardEvent): void;
    _endContentKeyDown(e: KeyboardEvent): void;
    _navigateOutOfEndContent(e: CustomEvent): void;
    _closeAll(): void;
    _close(): void;
    _beforePopoverOpen(e: CustomEvent): void;
    _afterPopoverOpen(): void;
    _beforePopoverClose(e: CustomEvent): void;
    _afterPopoverClose(): void;
    get isMenuItem(): boolean;
    _updateCheckedState(): void;
}
export default MenuItem;
export type { MenuBeforeCloseEventDetail, MenuBeforeOpenEventDetail, MenuItemAccessibilityAttributes, };
export declare const isInstanceOfMenuItem: (object: any) => object is MenuItem;
