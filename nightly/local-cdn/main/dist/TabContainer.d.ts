import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot, AccessibilityAttributes } from "@ui5/webcomponents-base";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type Button from "./Button.js";
import type DropIndicator from "./DropIndicator.js";
import type Tab from "./Tab.js";
import type { TabInStrip, TabInOverflow } from "./Tab.js";
import type { TabSeparatorInStrip } from "./TabSeparator.js";
import type { ListItemClickEventDetail, ListMoveEventDetail } from "./List.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import TabContainerTabsPlacement from "./types/TabContainerTabsPlacement.js";
import type BackgroundDesign from "./types/BackgroundDesign.js";
import TabLayout from "./types/TabLayout.js";
import OverflowMode from "./types/OverflowMode.js";
import type { IButton } from "./Button.js";
type TabContainerPopoverOwner = "start-overflow" | "end-overflow" | TabInStrip;
type TabContainerStripInfo = {
    getElementInStrip: () => HTMLElement | undefined;
    isInline?: boolean;
    mixedMode?: boolean;
    posinset?: number;
    setsize?: number;
    isTopLevelTab?: boolean;
};
type TabContainerOverflowInfo = {
    getElementInOverflow: () => HTMLElement | undefined;
    style: Record<string, any>;
};
type TabContainerTabSelectEventDetail = {
    tab: Tab;
    tabIndex: number;
};
type TabContainerMoveEventDetail = {
    source: {
        element: HTMLElement;
    };
    destination: {
        element: HTMLElement;
        placement: `${MovePlacement}`;
    };
};
/**
 * Interface for components that may be slotted inside `ui5-tabcontainer` as items
 *
 * **Note:** Use directly `ui5-tab` or `ui5-tab-seprator`. Implementing the interface does not guarantee that the class can work as a tab.
 * @public
 */
interface ITab extends UI5Element {
    isSeparator: boolean;
    receiveStripInfo: (arg0: TabContainerStripInfo) => void;
    receiveOverflowInfo: (arg0: TabContainerOverflowInfo) => void;
    getDomRefInStrip: () => HTMLElement | undefined;
    items?: Array<ITab>;
}
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-tabcontainer` represents a collection of tabs with associated content.
 * Navigation through the tabs changes the content display of the currently active content area.
 * A tab can be labeled with text only, or icons with text.
 *
 * ### Structure
 *
 * The `ui5-tabcontainer` can hold two types of entities:
 *
 * - `ui5-tab` - contains all the information on an item (text and icon)
 * - `ui5-tab-separator` - used to separate tabs with a line
 *
 * ### Hierarchies
 * Multiple sub tabs could be placed underneath one main tab. Nesting allows deeper hierarchies with indentations
 * to indicate the level of each nested tab. When a tab has both sub tabs and own content its click area is split
 * to allow the user to display the content or alternatively to expand / collapse the list of sub tabs.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TabContainer.js";`
 *
 * `import "@ui5/webcomponents/dist/Tab.js";` (for `ui5-tab`)
 *
 * `import "@ui5/webcomponents/dist/TabSeparator.js";` (for `ui5-tab-separator`)
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart content - Used to style the content of the component
 * @csspart tabstrip - Used to style the tabstrip of the component
 */
declare class TabContainer extends UI5Element {
    eventDetails: {
        "tab-select": TabContainerTabSelectEventDetail;
        "move-over": TabContainerMoveEventDetail;
        "move": TabContainerMoveEventDetail;
    };
    /**
     * Defines whether the tab content is collapsed.
     * @default false
     * @public
     */
    collapsed: boolean;
    /**
     * Defines the alignment of the content and the `additionalText` of a tab.
     *
     * **Note:**
     * The content and the `additionalText` would be displayed vertically by default,
     * but when set to `Inline`, they would be displayed horizontally.
     * @default "Standard"
     * @public
     */
    tabLayout: `${TabLayout}`;
    /**
     * Defines the overflow mode of the header (the tab strip). If you have a large number of tabs, only the tabs that can fit on screen will be visible.
     * All other tabs that can 't fit on the screen are available in an overflow tab "More".
     *
     * **Note:**
     * Only one overflow at the end would be displayed by default,
     * but when set to `StartAndEnd`, there will be two overflows on both ends, and tab order will not change on tab selection.
     * @default "End"
     * @since 1.1.0
     * @public
     */
    overflowMode: `${OverflowMode}`;
    /**
     * Sets the background color of the Tab Container's header as `Solid`, `Transparent`, or `Translucent`.
     * @default "Solid"
     * @since 1.10.0
     * @public
     */
    headerBackgroundDesign: `${BackgroundDesign}`;
    /**
     * Sets the background color of the Tab Container's content as `Solid`, `Transparent`, or `Translucent`.
     * @default "Solid"
     * @since 1.10.0
     * @public
     */
    contentBackgroundDesign: `${BackgroundDesign}`;
    /**
     * Defines the placement of the tab strip relative to the actual tabs' content.
     *
     * **Note:** By default the tab strip is displayed above the tabs' content area and this is the recommended
     * layout for most scenarios. Set to `Bottom` only when the component is at the
     * bottom of the page and you want the tab strip to act as a menu.
     * @default "Top"
     * @since 1.0.0-rc.7
     * @private
     */
    tabsPlacement: `${TabContainerTabsPlacement}`;
    /**
     * Defines if automatic tab selection is deactivated.
     *
     * **Note:** By default, if none of the child tabs have the `selected` property set, the first tab will be automatically selected.
     * Setting this property to `true` allows preventing this behavior.
     * @default false
     * @public
     * @since 2.9.0
     */
    noAutoSelection: boolean;
    /**
     * Defines the current media query size.
     * @private
     */
    mediaRange?: string;
    _selectedTab?: Tab;
    _animationRunning: boolean;
    _contentCollapsed: boolean;
    _startOverflowText: string;
    _endOverflowText: string;
    _popoverItemsFlat: Array<ITab>;
    _width?: number;
    _dragging: boolean;
    /**
     * Defines the tabs.
     *
     * **Note:** Use `ui5-tab` and `ui5-tab-separator` for the intended design.
     * @public
     */
    items: DefaultSlot<ITab>;
    /**
     * Defines the button which will open the overflow menu. If nothing is provided to this slot,
     * the default button will be used.
     * @public
     * @since 1.0.0-rc.9
     */
    overflowButton: Slot<IButton>;
    /**
     * Defines the button which will open the start overflow menu if available. If nothing is provided to this slot,
     * the default button will be used.
     * @public
     * @since 1.1.0
     */
    startOverflowButton: Slot<IButton>;
    _itemNavigation: ItemNavigation;
    _itemsFlat: Array<ITab>;
    responsivePopover?: ResponsivePopover;
    _hasScheduledPopoverOpen: boolean;
    _handleResizeBound: () => void;
    static registerTabStyles(styles: string): void;
    static i18nBundle: I18nBundle;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    _handleResize(): void;
    _updateMediaRange(width: number): void;
    _sendStripPresentationInfos(items: Array<ITab>): void;
    _onHeaderFocusin(e: FocusEvent): void;
    _onDragStart(e: DragEvent): void;
    _onHeaderDragEnter(e: DragEvent): void;
    _onHeaderDragOver(e: DragEvent, isLongDragOver?: boolean): void;
    _onHeaderDrop(e: DragEvent): void;
    _moveHeaderItem(tab: Tab, e: KeyboardEvent): void;
    _onHeaderDragLeave(e: DragEvent): void;
    _onPopoverListMoveOver(e: CustomEvent<ListMoveEventDetail>): void;
    _onPopoverListMove(e: CustomEvent<ListMoveEventDetail>): void;
    _onPopoverListKeyDown(e: KeyboardEvent): void;
    _onTabStripClick(e: Event): Promise<void>;
    _onTabExpandButtonClick(e: Event): Promise<void>;
    _setPopoverInitialFocus(): void;
    _getSelectedTabInOverflow(): TabInOverflow;
    _getFirstFocusableItemInOverflow(): TabInOverflow;
    _findTabInOverflow(realTab: ITab): TabInOverflow | undefined;
    _onTabStripKeyDown(e: KeyboardEvent): void;
    _onTabStripKeyUp(e: KeyboardEvent): void;
    _onHeaderItemSelect(tab: HTMLElement): void;
    _onOverflowListItemClick(e: CustomEvent<ListItemClickEventDetail>): Promise<void>;
    /**
     * Returns all slotted tabs and their subTabs in a flattened array.
     * The order of tabs is depth-first.
     *
     * @public
     * @default []
     */
    get allItems(): Array<ITab>;
    _flatten(items: Array<ITab>): ITab[];
    _onItemSelect(selectedTabId: string): void;
    /**
     * Fires the `tab-select` event and changes the internal reference for the currently selected tab.
     * If the event is prevented, the current tab is not changed.
     * @private
     * @param selectedTab selected tab instance
     * @param selectedTabIndex selected tab index for an array containing all tabs and sub tabs. **Note:** Use the method `allTabs` to get this array.
     * @returns true if the tab selection is successful, false if it was prevented
     */
    selectTab(selectedTab: Tab, selectedTabIndex: number): boolean;
    slideContentDown(element: HTMLElement): Promise<void | Error>;
    slideContentUp(element: HTMLElement): Promise<void | Error>;
    _onOverflowClick(e: Event): Promise<void>;
    _sendOverflowPresentationInfos(items: Array<ITab>): void;
    _onOverflowKeyDown(e: KeyboardEvent): Promise<void>;
    _setItemsForStrip(): void;
    _getRootTab(tab: Tab | undefined): Tab | undefined;
    _updateEndOverflow(itemsDomRefs: Array<TabInStrip | TabSeparatorInStrip>): void;
    _updateStartAndEndOverflow(itemsDomRefs: Array<TabInStrip | TabSeparatorInStrip>, firstVisibleIndex?: number): void;
    _hasStartOverflow(containerWidth: number, itemsDomRefs: Array<TabInStrip | TabSeparatorInStrip>, selectedItemIndexAndWidth: {
        width: number;
        index: number;
    }): boolean;
    _hasEndOverflow(containerWidth: number, itemsDomRefs: Array<TabInStrip | TabSeparatorInStrip>, selectedItemIndexAndWidth: {
        width: number;
        index: number;
    }): boolean;
    _getItemWidth(itemDomRef: HTMLElement): number;
    _getSelectedItemIndexAndWidth(itemsDomRefs: Array<TabInStrip | TabSeparatorInStrip>, selectedTabDomRef: TabInStrip | undefined): {
        index: number;
        width: number;
    };
    _findFirstVisibleItem(itemsDomRefs: Array<TabInStrip | TabSeparatorInStrip>, containerWidth: number, selectedItemWidth: number, startIndex?: number): number;
    _findLastVisibleItem(itemsDomRefs: Array<TabInStrip | TabSeparatorInStrip>, containerWidth: number, selectedItemWidth: number, startIndex?: number): number;
    get isModeStartAndEnd(): boolean;
    _updateOverflowCounters(): void;
    _getFocusableRefs(): IButton[];
    _getHeader(): HTMLElement;
    _getTabs(): Array<Tab>;
    _getPopoverOwner(opener: HTMLElement): TabContainerPopoverOwner;
    _getPopoverItemsFor(targetOwner: TabContainerPopoverOwner): ITab[];
    _setPopoverItems(items: Array<ITab>): void;
    _togglePopover(opener: HTMLElement, setInitialFocus?: boolean): Promise<void>;
    _showPopoverAt(opener: HTMLElement, setInitialFocus?: boolean, preventInitialFocus?: boolean): Promise<void>;
    get hasItems(): boolean;
    _getTabStrip(): HTMLElement;
    _getStartOverflow(): HTMLElement;
    _getEndOverflow(): HTMLElement;
    _getStartOverflowBtnDOM(): Button | null;
    _getEndOverflowBtnDOM(): Button | null;
    _respPopover(): Promise<ResponsivePopover>;
    _closePopover(): void;
    get dropIndicatorDOM(): DropIndicator | null;
    _findSiblings(tab: Tab): Slot<ITab>;
    get mixedMode(): boolean;
    get textOnly(): boolean;
    get withAdditionalText(): boolean;
    get standardTabLayout(): boolean;
    get previousIconACCName(): string;
    get nextIconACCName(): string;
    get overflowMenuTitle(): string;
    get tabsAtTheBottom(): boolean;
    get overflowMenuIcon(): "slim-arrow-down" | "slim-arrow-up";
    get overflowButtonText(): string;
    get popoverCancelButtonText(): string;
    get accInvisibleText(): string;
    get overflowBtnAccessibilityAttributes(): Pick<AccessibilityAttributes, "hasPopup">;
    get tablistAriaDescribedById(): string | undefined;
}
export default TabContainer;
export type { TabContainerTabSelectEventDetail, TabContainerMoveEventDetail, TabContainerStripInfo, TabContainerOverflowInfo, ITab, };
