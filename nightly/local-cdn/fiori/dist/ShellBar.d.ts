import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import type { IShellBarSearchController } from "./shellbar/IShellBarSearchController.js";
import ShellBarLegacy from "./shellbar/ShellBarLegacy.js";
import ShellBarOverflow from "./shellbar/ShellBarOverflow.js";
import ShellBarAccessibility from "./shellbar/ShellBarAccessibility.js";
import ShellBarItemNavigation from "./shellbar/ShellBarItemNavigation.js";
import ShellBarItem from "./ShellBarItem.js";
import type ShellBarBranding from "./ShellBarBranding.js";
import type { ShellBarAccessibilityInfo, ShellBarAccessibilityAttributes, ShellBarAreaAccessibilityAttributes, ShellBarLogoAccessibilityAttributes, ShellBarProfileAccessibilityAttributes } from "./shellbar/ShellBarAccessibility.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
type ShellBarBreakpoint = "S" | "M" | "L" | "XL" | "XXL";
declare const ShellBarActions: {
    Search: string;
    Profile: string;
    Overflow: string;
    Assistant: string;
    ProductSwitch: string;
    Notifications: string;
};
declare const ShellBarActionsSelectors: {
    Search: string;
    Profile: string;
    Overflow: string;
    Assistant: string;
    ProductSwitch: string;
    Notifications: string;
};
type ShellBarActionId = typeof ShellBarActions[keyof typeof ShellBarActions];
type ShellBarActionItem = {
    id: ShellBarActionId;
    icon?: string;
    count?: string;
    enabled: boolean;
    selector: string;
    isProtected: boolean;
    stableDomRef?: string;
};
interface IShellBarSearchField extends HTMLElement {
    focused: boolean;
    value: string;
    collapsed?: boolean;
    open?: boolean;
}
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
     * Defines a `ui5-button` in the bar that will be placed in the beginning.
     * We encourage this slot to be used for a menu button.
     * It gets overstyled to match ShellBar's styling.
     * @public
     */
    startButton: Slot<IButton>;
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
    /**
     * Defines the `ui5-input`, that will be used as a search field.
     * @public
     */
    searchField: Slot<IShellBarSearchField>;
    /**
     * Defines the assistant slot.
     *
     * @since 2.0.0
     * @public
     */
    assistant: Slot<IButton>;
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
     * Actions computed from controllers.
     * @private
     */
    actions: ShellBarActionItem[];
    /**
     * Show overflow button when items are hidden.
     * @private
     */
    showOverflowButton: boolean;
    /**
     * Open state of the overflow popover.
     * @private
     */
    overflowPopoverOpen: boolean;
    /**
     * IDs of items currently hidden due to overflow.
     * Used to trigger rerender for conditional rendering.
     * @private
     */
    hiddenItemsIds: string[];
    /**
     * Show full-screen search overlay.
     * @private
     */
    showFullWidthSearch: boolean;
    /**
     * Spacer element.
     * @private
     */
    spacer?: HTMLElement;
    /**
     * Outer container of the overflow container.
     * @private
     */
    overflowOuter?: HTMLElement;
    /**
     * Inner container of the overflow container.
     * @private
     */
    overflowInner?: HTMLElement;
    static i18nBundle: I18nBundle;
    private readonly RESIZE_THROTTLE_RATE;
    private handleResizeBound;
    private readonly breakpoints;
    private readonly breakpointMap;
    itemNavigation: ShellBarItemNavigation;
    overflow: ShellBarOverflow;
    accessibility: ShellBarAccessibility;
    private _searchAdaptor;
    private _searchAdaptorLegacy;
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
     * Open state of the menu popover (legacy).
     * @private
     */
    menuPopoverOpen: boolean;
    /**
     * The container is positioned in the center of the `ui5-shellbar` and occupies one-third of the total length of the `ui5-shellbar`.
     *
     * **Note:** If set, the `searchField` slot is not rendered.
     * @private
     */
    midContent: Slot<HTMLElement>;
    legacyAdaptor?: ShellBarLegacy;
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    private buildActions;
    getAction(actionId: ShellBarActionId): ShellBarActionItem | undefined;
    getActionOverflowText(actionId: ShellBarActionId): string;
    get isSBreakPoint(): boolean;
    private updateBreakpoint;
    private updateOverflow;
    private handleUpdateOverflowResult;
    private handleContentVisibilityChanged;
    private handleResize;
    isHidden(itemId: string): boolean;
    handleOverflowClick(): void;
    onPopoverClose(): void;
    /**
     * Closes the overflow popover.
     * @public
     */
    closeOverflow(): void;
    handleOverflowItemClick(e: MouseEvent): void;
    get overflowItems(): readonly import("./shellbar/ShellBarOverflow.js").ShellBarOverflowItem[];
    /**
     * Returns badge text for overflow button.
     * Shows count if only one item with count is overflowed, otherwise shows attention dot.
     */
    get overflowBadge(): string | undefined;
    get search(): IShellBarSearchField | null;
    get isSelfCollapsibleSearch(): boolean;
    private getSearchDeps;
    get searchAdaptor(): IShellBarSearchController;
    handleSearchButtonClick(): boolean;
    setSearchState(expanded: boolean): Promise<void>;
    handleCancelButtonClick(): void;
    private initLegacyController;
    get hasLegacyFeatures(): boolean;
    _onKeyDown(e: KeyboardEvent): void;
    get startContent(): HTMLElement[];
    get endContent(): HTMLElement[];
    get separatorConfig(): {
        showStartSeparator: boolean;
        showEndSeparator: boolean;
    };
    splitContent(content: readonly HTMLElement[]): {
        start: HTMLElement[];
        end: HTMLElement[];
    };
    sortContent(content: readonly HTMLElement[]): HTMLElement[];
    getPackedSeparatorInfo(item: HTMLElement, isStartGroup: boolean): {
        shouldPack: boolean;
    };
    sortItems(items: readonly ShellBarItem[]): ShellBarItem[];
    get actionsAccessibilityInfo(): ShellBarAccessibilityInfo;
    get actionsRole(): "toolbar" | undefined;
    get contentRole(): "group" | undefined;
    get enabledFeatures(): {
        search: boolean;
        profile: boolean;
        content: boolean;
        branding: boolean;
        overflow: boolean;
        assistant: boolean;
        startButton: boolean;
        notifications: boolean;
        productSwitch: boolean;
    };
    get texts(): {
        search: string;
        profile: string;
        shellbar: string;
        products: string;
        overflow: string;
        assistant: string;
        notifications: string;
        notificationsNoCount: string;
        contentItems: string | undefined;
    };
    get popoverHorizontalAlign(): "Start" | "End";
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
     * Returns the search button DOM reference.
     * @public
     */
    getSearchButtonDomRef(): Promise<HTMLElement | null>;
    private _fireClickEvent;
    handleNotificationsClick(): boolean;
    handleProfileClick(): boolean;
    handleProductSwitchClick(): boolean;
    getCSSVariable(cssVar: string): string;
}
export default ShellBar;
export { ShellBarActions, ShellBarActionsSelectors, };
export type { ShellBarProfileClickEventDetail, ShellBarSearchButtonEventDetail, ShellBarSearchFieldClearEventDetail, ShellBarSearchFieldToggleEventDetail, ShellBarProductSwitchClickEventDetail, ShellBarNotificationsClickEventDetail, ShellBarContentItemVisibilityChangeEventDetail, ShellBarActionId, ShellBarActionItem, IShellBarSearchField, ShellBarBreakpoint, ShellBarAccessibilityInfo, ShellBarAccessibilityAttributes, ShellBarAreaAccessibilityAttributes, ShellBarProfileAccessibilityAttributes, ShellBarLogoClickEventDetail, ShellBarMenuItemClickEventDetail, ShellBarLogoAccessibilityAttributes, };
