import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ClassMap, AccessibilityAttributes, AriaRole, UI5CustomEvent } from "@ui5/webcomponents-base";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import type ShellBarItem from "./ShellBarItem.js";
import type { ShellBarItemAccessibilityAttributes } from "./ShellBarItem.js";
import type ShellBarBranding from "./ShellBarBranding.js";
type ShellBarLogoAccessibilityAttributes = {
    role?: Extract<AriaRole, "button" | "link">;
    name?: string;
};
type ShellBarProfileAccessibilityAttributes = Pick<AccessibilityAttributes, "name" | "expanded" | "hasPopup">;
type ShellBarAreaAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "expanded">;
type ShellBarBrandingAccessibilityAttributes = Pick<AccessibilityAttributes, "name">;
type ShellBarAccessibilityAttributes = {
    logo?: ShellBarLogoAccessibilityAttributes;
    notifications?: ShellBarAreaAccessibilityAttributes;
    profile?: ShellBarProfileAccessibilityAttributes;
    product?: ShellBarAreaAccessibilityAttributes;
    search?: ShellBarAreaAccessibilityAttributes;
    overflow?: ShellBarAreaAccessibilityAttributes;
    branding?: ShellBarBrandingAccessibilityAttributes;
};
type ShellBarNotificationsClickEventDetail = {
    targetRef: HTMLElement;
};
type ShellBarProfileClickEventDetail = {
    targetRef: HTMLElement;
};
type ShellBarProductSwitchClickEventDetail = {
    targetRef: HTMLElement;
};
type ShellBarLogoClickEventDetail = {
    targetRef: HTMLElement;
};
type ShellBarMenuItemClickEventDetail = {
    item: HTMLElement;
};
type ShellBarContentItemVisibilityChangeEventDetail = {
    items: Array<HTMLElement>;
};
type ShellBarSearchButtonEventDetail = {
    targetRef: HTMLElement;
    searchFieldVisible: boolean;
};
type ShellBarSearchFieldToggleEventDetail = {
    expanded: boolean;
};
type ShellBarSearchFieldClearEventDetail = {
    targetRef: HTMLElement;
};
interface IShellBarSearchField extends HTMLElement {
    focused: boolean;
    value: string;
    collapsed?: boolean;
    open?: boolean;
}
interface IShellBarHidableItem {
    classes: string;
    id: string;
    show: boolean;
}
interface IShelBarItemInfo extends IShellBarHidableItem {
    icon?: string;
    text?: string;
    count?: string;
    custom?: boolean;
    title?: string;
    stableDomRef?: string;
    refItemid?: string;
    press: (e: UI5CustomEvent<Button, "click">) => void;
    order?: number;
    profile?: boolean;
    tooltip?: string;
    accessibilityAttributes?: ShellBarItemAccessibilityAttributes;
    accessibleName?: string;
}
interface IShellBarContentItem extends IShellBarHidableItem {
    hideOrder: number;
}
/**
 * @class
 * ### Overview
 *
 * The `ui5-shellbar` is meant to serve as an application header
 * and includes numerous built-in features, such as: logo, profile image/icon, title, search field, notifications and so on.
 *
 * ### Stable DOM Refs
 *
 * You can use the following stable DOM refs for the `ui5-shellbar`:
 *
 * - logo
 * - notifications
 * - overflow
 * - profile
 * - product-switch
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBar.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-shellbar`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 */
declare class ShellBar extends UI5Element {
    eventDetails: {
        "notifications-click": ShellBarNotificationsClickEventDetail;
        "profile-click": ShellBarProfileClickEventDetail;
        "product-switch-click": ShellBarProductSwitchClickEventDetail;
        "logo-click": ShellBarLogoClickEventDetail;
        "menu-item-click": ShellBarMenuItemClickEventDetail;
        "search-button-click": ShellBarSearchButtonEventDetail;
        "search-field-toggle": ShellBarSearchFieldToggleEventDetail;
        "search-field-clear": ShellBarSearchFieldClearEventDetail;
        "content-item-visibility-change": ShellBarContentItemVisibilityChangeEventDetail;
    };
    /**
     * Defines the visibility state of the search button.
     *
     * **Note:** The `hideSearchButton` property is in an experimental state and is a subject to change.
     * @default false
     * @public
     */
    hideSearchButton: boolean;
    /**
     * Disables the automatic search field expansion/collapse when the available space is not enough.
     *
     * **Note:** The `disableSearchCollapse` property is in an experimental state and is a subject to change.
     * @default false
     * @public
     */
    disableSearchCollapse: boolean;
    /**
     * Defines the `primaryTitle`.
     *
     * **Note:** The `primaryTitle` would be hidden on S screen size (less than approx. 700px).
     * @default undefined
     * @public
     */
    primaryTitle?: string;
    /**
     * Defines the `secondaryTitle`.
     *
     * **Note:** The `secondaryTitle` would be hidden on S and M screen sizes (less than approx. 1300px).
     * @default undefined
     * @public
     */
    secondaryTitle?: string;
    /**
     * Defines the `notificationsCount`,
     * displayed in the notification icon top-right corner.
     * @default undefined
     * @public
     */
    notificationsCount?: string;
    /**
     * Defines, if the notification icon would be displayed.
     * @default false
     * @public
     */
    showNotifications: boolean;
    /**
     * Defines, if the product switch icon would be displayed.
     * @default false
     * @public
     */
    showProductSwitch: boolean;
    /**
     * Defines, if the Search Field would be displayed when there is a valid `searchField` slot.
     *
     * **Note:** By default the Search Field is not displayed.
     * @default false
     * @public
     */
    showSearchField: boolean;
    /**
     * Defines additional accessibility attributes on different areas of the component.
     *
     * The accessibilityAttributes object has the following fields,
     * where each field is an object supporting one or more accessibility attributes:
     *
     * - **logo** - `logo.role` and `logo.name`.
     * - **notifications** - `notifications.expanded` and `notifications.hasPopup`.
     * - **profile** - `profile.expanded`, `profile.hasPopup` and `profile.name`.
     * - **product** - `product.expanded` and `product.hasPopup`.
     * - **search** - `search.hasPopup`.
     * - **overflow** - `overflow.expanded` and `overflow.hasPopup`.
     * - **branding** - `branding.name`.
     *
     * The accessibility attributes support the following values:
     *
     * - **role**: Defines the accessible ARIA role of the logo area.
     * Accepts the following string values: `button` or `link`.
     *
     * - **expanded**: Indicates whether the button, or another grouping element it controls,
     * is currently expanded or collapsed.
     * Accepts the following string values: `true` or `false`.
     *
     * - **hasPopup**: Indicates the availability and type of interactive popup element,
     * such as menu or dialog, that can be triggered by the button.
     *
     * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
     * - **name**: Defines the accessible ARIA name of the area.
     * Accepts any string.
     *
     * @default {}
     * @public
     * @since 1.10.0
     */
    accessibilityAttributes: ShellBarAccessibilityAttributes;
    /**
     * @private
     */
    breakpointSize: string;
    /**
     * @private
     */
    withLogo: boolean;
    _itemsInfo: Array<IShelBarItemInfo>;
    _contentInfo: Array<IShellBarContentItem>;
    _menuPopoverExpanded: boolean;
    _overflowPopoverExpanded: boolean;
    showFullWidthSearch: boolean;
    _cachedHiddenContent: Array<HTMLElement>;
    /**
     * Defines the assistant slot.
     *
     * @since 2.0.0
     * @public
     */
    assistant: Slot<IButton>;
    /**
     * Defines the branding slot.
     * The `ui5-shellbar-branding` component is intended to be placed inside this slot.
     * Content placed here takes precedence over the `primaryTitle` property and the `logo` content slot.
     *
     * **Note:** The `branding` slot is in an experimental state and is a subject to change.
     *
     * @since 2.12.0
     * @public
     */
    branding: Slot<ShellBarBranding>;
    /**
     * Defines the `ui5-shellbar` additional items.
     *
     * **Note:**
     * You can use the `<ui5-shellbar-item></ui5-shellbar-item>`.
     * @public
     */
    items: DefaultSlot<ShellBarItem>;
    /**
     * You can pass `ui5-avatar` to set the profile image/icon.
     * If no profile slot is set - profile will be excluded from actions.
     *
     * **Note:** We recommend not using the `size` attribute of `ui5-avatar` because
     * it should have specific size by design in the context of `ui5-shellbar` profile.
     * @since 1.0.0-rc.6
     * @public
     */
    profile: Slot<HTMLElement>;
    /**
     * Defines the logo of the `ui5-shellbar`.
     * For example, you can use `ui5-avatar` or `img` elements as logo.
     * @since 1.0.0-rc.8
     * @public
     */
    logo: Slot<HTMLElement>;
    /**
     * Defines the items displayed in menu after a click on a start button.
     *
     * **Note:** You can use the  `<ui5-li></ui5-li>` and its ancestors.
     * @since 0.10
     * @public
     */
    menuItems: Slot<ListItemBase>;
    /**
     * Defines the `ui5-input`, that will be used as a search field.
     * @public
     */
    searchField: Slot<IShellBarSearchField>;
    /**
     * Defines a `ui5-button` in the bar that will be placed in the beginning.
     * We encourage this slot to be used for a menu button.
     * It gets overstyled to match ShellBar's styling.
     * @public
     */
    startButton: Slot<IButton>;
    /**
     * The container is positioned in the center of the `ui5-shellbar` and occupies one-third of the total length of the `ui5-shellbar`.
     *
     * **Note:** If set, the `searchField` slot is not rendered.
     * @private
     */
    midContent: Slot<HTMLElement>;
    /**
     * Define the items displayed in the content area.
     *
     * Use the `data-hide-order` attribute with numeric value to specify the order of the items to be hidden when the space is not enough.
     * Lower values will be hidden first.
     *
     * **Note:** The `content` slot is in an experimental state and is a subject to change.
     *
     * @public
     * @since 2.7.0
     */
    content: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    overflowPopover?: Popover | null;
    menuPopover?: Popover | null;
    _isInitialRendering: boolean;
    _defaultItemPressPrevented: boolean;
    contentItemsObserver: MutationObserver;
    _hiddenIcons: Array<IShelBarItemInfo>;
    _handleResize: ResizeObserverCallback;
    _overflowNotifications: string | null;
    _lastOffsetWidth: number;
    _observableContent: Array<HTMLElement>;
    _autoRestoreSearchField: boolean;
    _onSearchOpenBound: (e: Event) => void;
    _onSearchCloseBound: (e: Event) => void;
    _onSearchBound: (e: Event) => void;
    _headerPress: () => void;
    static get FIORI_3_BREAKPOINTS(): number[];
    static get FIORI_3_BREAKPOINTS_MAP(): Record<string, string>;
    constructor();
    _onSearchOpen(e: Event): void;
    _onSearchClose(e: Event): void;
    _onSearch(e: Event): void;
    _updateSearchFieldState(): void;
    _onKeyDown(e: KeyboardEvent): void;
    private _allowChildNavigation;
    private _allowInputNavigation;
    _focusNextItem(items: HTMLElement[], currentIndex: number): void;
    _focusPreviousItem(items: HTMLElement[], currentIndex: number): void;
    _isVisible(element: HTMLElement): boolean;
    _getRightChildItems(): HTMLElement[];
    _menuItemPress(e: CustomEvent<ListItemClickEventDetail>): void;
    _logoPress(): void;
    _menuPopoverBeforeOpen(): void;
    _menuPopoverAfterClose(): void;
    _overflowPopoverBeforeOpen(): void;
    _overflowPopoverAfterClose(): void;
    _logoKeyup(e: KeyboardEvent): void;
    _logoKeydown(e: KeyboardEvent): void;
    _calculateCSSREMValue(styleSet: CSSStyleDeclaration, propertyName: string): number;
    domCalculatedValues(cssVar: string): number;
    onBeforeRendering(): void;
    /**
     * Use this method to change the state of the search filed according to internal logic.
     * An event is fired to notify the change.
     */
    setSearchState(expanded: boolean): Promise<void>;
    onAfterRendering(): void;
    onInitialRendering(): Promise<void>;
    /**
     * Closes the overflow area.
     * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
     * @public
     */
    closeOverflow(): void;
    _handleBarBreakpoints(): void;
    _hideItems(items: IShellBarHidableItem[]): IShellBarHidableItem[];
    _resetItemsVisibility(items: Array<HTMLElement>): void;
    _handleActionsOverflow(): {
        itemsInfo: IShelBarItemInfo[];
        contentInfo: IShellBarContentItem[];
    };
    _overflowActions(): void;
    _toggleActionPopover(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _attachSearchFieldListeners(searchField: HTMLElement | null): void;
    _detachSearchFieldListeners(searchField: HTMLElement | null): void;
    _handleSearchIconPress(): void;
    _handleActionListClick(): Promise<void>;
    _handleCustomActionPress(e: UI5CustomEvent<Button, "click">): void;
    _handleOverflowPress(): void;
    _handleNotificationsPress(e: UI5CustomEvent<Button, "click">): void;
    _handleProfilePress(): void;
    _handleCancelButtonPress(): void;
    _handleProductSwitchPress(e: UI5CustomEvent<Button, "click">): void;
    _clearSearchFieldValue(): void;
    /**
     * Returns the `logo` DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get logoDomRef(): HTMLElement | null;
    /**
     * Returns the `notifications` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get notificationsDomRef(): HTMLElement | null;
    /**
     * Returns the `overflow` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get overflowDomRef(): HTMLElement | null;
    /**
     * Returns the `profile` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get profileDomRef(): HTMLElement | null;
    /**
     * Returns the `product-switch` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get productSwitchDomRef(): HTMLElement | null;
    /**
     * Returns the `search` icon DOM ref.
     * @returns The search icon DOM ref
     * @public
     * @since 2.10.0
     */
    getSearchButtonDomRef(): Promise<HTMLElement | null>;
    _getContentInfo(): Array<IShellBarContentItem>;
    /**
     * Returns all items that will be placed in the right of the bar as icons / dom elements.
     */
    _getItemsInfo(): Array<IShelBarItemInfo>;
    _updateItemsInfo(newItemsInfo: Array<IShelBarItemInfo>): void;
    _updateContentInfo(newContentInfo: Array<IShellBarContentItem>): void;
    _fireContentItemVisibilityChangeEvent(): void;
    _updateOverflowNotifications(): void;
    _observeContentItems(): void;
    _getOverflowPopover(): Popover;
    _getMenuPopover(): Popover;
    isIconHidden(name: string): boolean;
    get hasMatchingContent(): boolean;
    get contentItemsSorted(): HTMLElement[];
    get contentItemsWrappersSorted(): HTMLElement[];
    get autoSearchField(): boolean;
    get startContentInfoSorted(): IShellBarContentItem[];
    get endContentInfoSorted(): IShellBarContentItem[];
    get showStartSeparator(): boolean;
    get showEndSeparator(): boolean;
    shouldIncludeSeparator(itemInfo: IShellBarContentItem | undefined, contentInfo: IShellBarContentItem[]): boolean;
    get classes(): ClassMap;
    get styles(): {
        searchField: {};
    };
    get customItemsInfo(): IShelBarItemInfo[];
    get hasLogo(): boolean;
    get showLogoInMenuButton(): boolean;
    get showTitleInMenuButton(): boolean | "" | undefined;
    get showMenuButton(): string | boolean;
    get hasAssistant(): boolean;
    get hasBranding(): boolean;
    get hasSearchField(): boolean;
    get hasMidContent(): boolean;
    get hasProfile(): boolean;
    get hasMenuItems(): boolean;
    get imageBtnText(): string;
    get _shellbarText(): string;
    get _logoText(): string;
    get _notificationsText(): string;
    get _cancelBtnText(): string;
    get _logoAreaText(): string;
    get _contentItemsText(): string | undefined;
    get _searchFieldDescription(): string;
    get _contentItemsRole(): "group" | undefined;
    get _enableContentAreaAccessibility(): boolean;
    get contentItems(): HTMLElement[];
    get startContent(): HTMLElement[];
    get endContent(): HTMLElement[];
    get _rightChildRole(): "toolbar" | undefined;
    get _searchFieldText(): string;
    get _searchBtnOpen(): string;
    get _productSwitchBtnText(): string;
    get _profileText(): string;
    get _productsText(): string;
    get _searchText(): string;
    get _overflowText(): string;
    get _brandingText(): string | undefined;
    get hasContentItems(): boolean;
    get hidableDomElements(): HTMLElement[];
    get contentItemsHidden(): HTMLElement[];
    get overflowWrapper(): HTMLElement | null;
    get overflowInner(): HTMLElement | null;
    get overflowed(): boolean;
    get accInfo(): {
        notifications: {
            title: string;
            accessibilityAttributes: {
                expanded: boolean | "true" | "false" | undefined;
                hasPopup: import("@ui5/webcomponents-base").AriaHasPopup | undefined;
            };
        };
        profile: {
            title: string;
            accessibilityAttributes: {
                hasPopup: import("@ui5/webcomponents-base").AriaHasPopup | undefined;
                expanded: boolean | "true" | "false" | undefined;
            };
        };
        products: {
            title: string;
            accessibilityAttributes: {
                hasPopup: import("@ui5/webcomponents-base").AriaHasPopup | undefined;
                expanded: boolean | "true" | "false" | undefined;
            };
        };
        search: {
            title: string;
            accessibilityAttributes: {
                hasPopup: import("@ui5/webcomponents-base").AriaHasPopup | undefined;
            };
        };
        overflow: {
            title: string;
            accessibilityAttributes: {
                hasPopup: import("@ui5/webcomponents-base").AriaHasPopup;
                expanded: boolean | "true" | "false";
            };
        };
        branding: {
            title: string | undefined;
            accessibilityAttributes: {
                name: string | undefined;
            };
        };
    };
    get accLogoRole(): "link" | "button";
    get isSBreakPoint(): boolean;
    get hasSelfCollapsibleSearch(): boolean;
    get search(): IShellBarSearchField | null;
}
interface IShellBarSelfCollapsibleSearch extends UI5Element {
    collapsed: boolean;
    open: boolean;
}
export default ShellBar;
export type { ShellBarContentItemVisibilityChangeEventDetail, ShellBarNotificationsClickEventDetail, ShellBarProfileClickEventDetail, ShellBarProductSwitchClickEventDetail, ShellBarLogoClickEventDetail, ShellBarMenuItemClickEventDetail, ShellBarAccessibilityAttributes, ShellBarSearchButtonEventDetail, ShellBarSearchFieldToggleEventDetail, ShellBarSearchFieldClearEventDetail, IShellBarSelfCollapsibleSearch, IShellBarSearchField, };
