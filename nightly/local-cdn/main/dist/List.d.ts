import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import DragAndDropHandler from "./delegate/DragAndDropHandler.js";
import type { MoveEventDetail } from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListSelectionMode from "./types/ListSelectionMode.js";
import ListGrowingMode from "./types/ListGrowingMode.js";
import ListAccessibleRole from "./types/ListAccessibleRole.js";
import type ListItemBase from "./ListItemBase.js";
import type ListItem from "./ListItem.js";
import type { ListItemBasePressEventDetail } from "./ListItemBase.js";
import type DropIndicator from "./DropIndicator.js";
import type { SelectionRequestEventDetail } from "./ListItem.js";
import ListSeparator from "./types/ListSeparator.js";
import type ListItemGroup from "./ListItemGroup.js";
type ListItemFocusEventDetail = {
    item: ListItemBase;
};
type ListSelectionChangeEventDetail = {
    selectedItems: Array<ListItemBase>;
    previouslySelectedItems: Array<ListItemBase>;
    selectionComponentPressed: boolean;
    targetItem: ListItemBase;
    key?: string;
};
type ListItemDeleteEventDetail = {
    item: ListItemBase;
};
type ListItemCloseEventDetail = {
    item: ListItemBase;
};
type ListItemToggleEventDetail = {
    item: ListItemBase;
};
type ListItemClickEventDetail = {
    item: ListItemBase;
};
type ListMoveEventDetail = MoveEventDetail;
type ListAccessibilityAttributes = {
    growingButton?: {
        name?: string;
        description?: string;
    };
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-list` component allows displaying a list of items, advanced keyboard
 * handling support for navigating between items, and predefined modes to improve the development efficiency.
 *
 * The `ui5-list` is a container for the available list items:
 *
 * - `ui5-li`
 * - `ui5-li-custom`
 * - `ui5-li-group`
 *
 * To benefit from the built-in selection mechanism, you can use the available
 * selection modes, such as
 * `Single`, `Multiple` and `Delete`.
 *
 * Additionally, the `ui5-list` provides header, footer, and customization for the list item separators.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The `ui5-list` provides advanced keyboard handling.
 * When a list is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Up] or [Down] - Navigates up and down the items
 * - [Home] - Navigates to first item
 * - [End] - Navigates to the last item
 *
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete),
 * when the `selectionMode` property is in use:
 *
 * - [Space] - Select an item (if `type` is 'Active') when `selectionMode` is selection
 * - [Delete] - Delete an item if `selectionMode` property is `Delete`
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/List.js";`
 *
 * `import "@ui5/webcomponents/dist/ListItemStandard.js";` (for `ui5-li`)
 *
 * `import "@ui5/webcomponents/dist/ListItemCustom.js";` (for `ui5-li-custom`)
 *
 * `import "@ui5/webcomponents/dist/ListItemGroup.js";` (for `ui5-li-group`)
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart growing-button - Used to style the button, that is used for growing of the component
 * @csspart growing-button-inner - Used to style the button inner element
 */
declare class List extends UI5Element {
    eventDetails: {
        "item-click": ListItemClickEventDetail;
        "item-close": ListItemCloseEventDetail;
        "item-toggle": ListItemToggleEventDetail;
        "item-delete": ListItemDeleteEventDetail;
        "selection-change": ListSelectionChangeEventDetail;
        "load-more": void;
        "item-focused": ListItemFocusEventDetail;
        "move-over": ListMoveEventDetail;
        "move": ListMoveEventDetail;
    };
    /**
     * Defines the component header text.
     *
     * **Note:** If `header` is set this property is ignored.
     * @default undefined
     * @public
     */
    headerText?: string;
    /**
     * Defines the footer text.
     * @default undefined
     * @public
     */
    footerText?: string;
    /**
     * Determines whether the component is indented.
     * @default false
     * @public
     */
    indent: boolean;
    /**
     * Defines the selection mode of the component.
     * @default "None"
     * @public
     */
    selectionMode: `${ListSelectionMode}`;
    /**
     * Defines the text that is displayed when the component contains no items.
     * @default undefined
     * @public
     */
    noDataText?: string;
    /**
     * Defines the item separator style that is used.
     * @default "All"
     * @public
     */
    separators: `${ListSeparator}`;
    /**
     * Defines whether the component will have growing capability either by pressing a `More` button,
     * or via user scroll. In both cases `load-more` event is fired.
     *
     * **Restrictions:** `growing="Scroll"` is not supported for Internet Explorer,
     * on IE the component will fallback to `growing="Button"`.
     * @default "None"
     * @since 1.0.0-rc.13
     * @public
     */
    growing: `${ListGrowingMode}`;
    /**
     * Defines the text that will be displayed inside the growing button.
     *
     * **Note:** If not specified a built-in text will be displayed.
     *
     * **Note:** This property takes effect if the `growing` property is set to the `Button`.
     * @default undefined
     * @since 1.24
     * @public
     */
    growingButtonText?: string;
    /**
     * Defines if the component would display a loading indicator over the list.
     * @default false
     * @public
     * @since 1.0.0-rc.6
     */
    loading: boolean;
    /**
     * Defines the delay in milliseconds, after which the loading indicator will show up for this component.
     * @default 1000
     * @public
     */
    loadingDelay: number;
    /**
     * Indicates whether the List header is sticky or not.
     * If stickyHeader is set to true, then whenever you scroll the content or
     * the application, the header of the list will be always visible.
     * @default false
     * @public
     * @since 2.19.0
     */
    stickyHeader: boolean;
    /**
     * Defines the accessible name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
    * Defines additional accessibility attributes on different areas of the component.
    *
    * The accessibilityAttributes object has the following field:
    *
    *  - **growingButton**: `growingButton.name`, `growingButton.description`.
    *
    * The accessibility attributes support the following values:
    *
    * - **name**: Defines the accessible ARIA name of the growing button.
    * Accepts any string.
    *
    * - **description**: Defines the accessible ARIA description of the growing button.
    * Accepts any string.
    *
    * **Note:** The `accessibilityAttributes` property is in an experimental state and is a subject to change.
    * @default {}
    * @public
    * @since 2.13.0
    */
    accessibilityAttributes: ListAccessibilityAttributes;
    /**
     * Defines the IDs of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef?: string;
    /**
     * Defines the accessible description of the component.
     * @default undefined
     * @public
     * @since 2.5.0
     */
    accessibleDescription?: string;
    /**
     * Defines the IDs of the elements that describe the component.
     * @default undefined
     * @public
     * @since 2.5.0
     */
    accessibleDescriptionRef?: string;
    /**
     * Constantly updated value of texts collected from the associated labels
     * @private
     */
    _associatedDescriptionRefTexts?: string;
    /**
     * Constantly updated value of texts collected from the associated labels
     * @private
     */
    _associatedLabelsRefTexts?: string;
    /**
     * Defines the accessible role of the component.
     * @public
     * @default "List"
     * @since 1.0.0-rc.15
     */
    accessibleRole: `${ListAccessibleRole}`;
    /**
     * Defines if the entire list is in view port.
     * @private
     */
    _inViewport: boolean;
    /**
     * Defines the active state of the `More` button.
     * @private
     */
    _loadMoreActive: boolean;
    /**
     * Defines the current media query size.
     * @default "S"
     * @private
     */
    mediaRange: string;
    /**
     * Defines the items of the component.
     *
     * **Note:** Use `ui5-li`, `ui5-li-custom`, and `ui5-li-group` for the intended design.
     * @public
     */
    items: DefaultSlot<ListItemBase | ListItemGroup>;
    /**
     * Defines the component header.
     *
     * **Note:** When `header` is set, the
     * `headerText` property is ignored.
     * @public
     */
    header: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    _previouslyFocusedItem: ListItemBase | null;
    _forwardingFocus: boolean;
    _selectionRequested?: boolean;
    _groupCount: number;
    _groupItemCount: number;
    _endIntersectionObserver?: IntersectionObserver | null;
    _startIntersectionObserver?: IntersectionObserver | null;
    _itemNavigation: ItemNavigation;
    _beforeElement?: HTMLElement | null;
    _afterElement?: HTMLElement | null;
    _startMarkerOutOfView: boolean;
    _lastFocusedElementIndex?: number;
    handleResizeCallback: ResizeObserverCallback;
    onItemFocusedBound: (e: CustomEvent) => void;
    onForwardAfterBound: (e: CustomEvent) => void;
    onForwardBeforeBound: (e: CustomEvent) => void;
    onItemTabIndexChangeBound: (e: CustomEvent) => void;
    _dragAndDropHandler: DragAndDropHandler;
    constructor();
    /**
     * Returns an array containing the list item instances without the groups in a flat structure.
     * @default []
     * @since 2.0.0
     * @public
     */
    get listItems(): ListItemBase[];
    _updateAssociatedLabelsTexts(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    attachGroupHeaderEvents(): void;
    detachGroupHeaderEvents(): void;
    getFocusDomRef(): HTMLElement | undefined;
    get shouldRenderH1(): string | false | undefined;
    get headerID(): string;
    get modeLabelID(): string;
    get listEndDOM(): Element | null;
    get listStartDOM(): Element | null;
    get dropIndicatorDOM(): DropIndicator | null;
    get hasData(): boolean;
    get showBusyIndicatorOverlay(): boolean;
    get showNoDataText(): string | false | undefined;
    get isDelete(): boolean;
    get isSingleSelect(): boolean;
    get isMultiple(): boolean;
    get ariaLabelledBy(): string | undefined;
    get ariaLabelTxt(): string | undefined;
    get ariaDescriptionText(): string;
    get growingButtonAriaLabel(): string | undefined;
    get growingButtonAriaLabelledBy(): string | undefined;
    get growingButtonAriaDescribedBy(): string | undefined;
    hasGrowingComponent(): boolean;
    _getDescriptionForGroups(): string;
    get ariaLabelModeText(): string;
    get grows(): boolean;
    get growsOnScroll(): boolean;
    get growsWithButton(): boolean;
    get _growingButtonText(): string;
    get listAccessibleRole(): "menu" | "list" | "listbox" | "tree";
    get classes(): ClassMap;
    prepareListItems(): void;
    observeListEnd(): Promise<void>;
    unobserveListEnd(): void;
    observeListStart(): Promise<void>;
    unobserveListStart(): void;
    onEndIntersection(entries: Array<IntersectionObserverEntry>): void;
    onStartIntersection(entries: Array<IntersectionObserverEntry>): void;
    onSelectionRequested(e: CustomEvent<SelectionRequestEventDetail>): void;
    handleSingle(item: ListItemBase): boolean;
    handleSingleStart(item: ListItemBase): boolean;
    handleSingleEnd(item: ListItemBase): boolean;
    handleSingleAuto(item: ListItemBase): boolean;
    handleMultiple(item: ListItemBase, selected: boolean): boolean;
    handleDelete(item: ListItemBase): boolean;
    deselectSelectedItems(): void;
    getSelectedItems(): Array<ListItemBase>;
    getEnabledItems(): Array<ListItemBase>;
    getItems(): Array<ListItemBase>;
    getItemsForProcessing(): Array<ListItemBase>;
    _revertSelection(previouslySelectedItems: Array<ListItemBase>): void;
    _onkeydown(e: KeyboardEvent): void;
    _handleF7(e: KeyboardEvent): void;
    _getClosestListItem(element: HTMLElement): ListItem | null;
    _moveItem(item: ListItemBase, e: KeyboardEvent): void;
    _onLoadMoreKeydown(e: KeyboardEvent): void;
    _onLoadMoreKeyup(e: KeyboardEvent): void;
    _onLoadMoreMousedown(): void;
    _onLoadMoreMouseup(): void;
    _onLoadMoreClick(): void;
    _handleLodeMoreUp(e: KeyboardEvent): void;
    checkListInViewport(): void;
    loadMore(): void;
    _handleResize(): void;
    _handleTabNext(e: KeyboardEvent): void;
    _handleHome(): void;
    _handleEnd(): void;
    _handleDown(e: KeyboardEvent): void;
    _navigateToAdjacentItem(listItem: ListItem, offset: -1 | 1): boolean;
    _onfocusin(e: FocusEvent): void;
    _ondragenter(e: DragEvent): void;
    _ondragleave(e: DragEvent): void;
    _ondragover(e: DragEvent): void;
    _ondrop(e: DragEvent): void;
    isForwardElement(element: HTMLElement): boolean;
    isForwardAfterElement(element: HTMLElement): boolean;
    onItemTabIndexChange(e: CustomEvent): void;
    onItemFocused(e: CustomEvent): void;
    onItemPress(e: CustomEvent<ListItemBasePressEventDetail>): void;
    onItemClose(e: CustomEvent<ListItemCloseEventDetail>): void;
    onItemToggle(e: CustomEvent<ListItemToggleEventDetail>): void;
    onForwardBefore(e: CustomEvent): void;
    onForwardAfter(e: CustomEvent): void;
    focusBeforeElement(): void;
    focusAfterElement(): void;
    focusGrowingButton(): void;
    _shouldFocusGrowingButton(): boolean;
    getGrowingButton(): HTMLElement;
    /**
     * Focuses the first list item and sets its tabindex to "0" via the ItemNavigation
     * @protected
     */
    focusFirstItem(): void;
    focusPreviouslyFocusedItem(): void;
    focusFirstSelectedItem(): void;
    /**
     * Focuses a list item and sets its tabindex to "0" via the ItemNavigation
     * @protected
     * @param item
     */
    focusItem(item: ListItemBase): void;
    onFocusRequested(e: CustomEvent): void;
    setForwardingFocus(forwardingFocus: boolean): void;
    getForwardingFocus(): boolean;
    setPreviouslyFocusedItem(item: ListItemBase): void;
    getPreviouslyFocusedItem(): ListItemBase | null;
    getFirstItem(filter: (item: ListItemBase) => boolean): ListItemBase | null;
    getAfterElement(): HTMLElement;
    getBeforeElement(): HTMLElement;
    getEndIntersectionObserver(): IntersectionObserver;
    getStartIntersectionObserver(): IntersectionObserver;
}
export default List;
export type { ListItemClickEventDetail, ListItemFocusEventDetail, ListItemDeleteEventDetail, ListItemCloseEventDetail, ListItemToggleEventDetail, ListSelectionChangeEventDetail, ListMoveEventDetail, ListAccessibilityAttributes, };
