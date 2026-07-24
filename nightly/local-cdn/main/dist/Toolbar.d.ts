import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ChangeInfo, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ToolbarAlign from "./types/ToolbarAlign.js";
import type ToolbarDesign from "./types/ToolbarDesign.js";
import ToolbarItemBase from "./ToolbarItemBase.js";
import type Button from "./Button.js";
import type Popover from "./Popover.js";
type ToolbarMinWidthChangeEventDetail = {
    minWidth: number;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toolbar` component is used to create a horizontal layout with items.
 * The items can be overflowing in a popover, when the space is not enough to show all of them.
 *
 * ### Keyboard Handling
 * The `ui5-toolbar` provides advanced keyboard handling.
 *
 * - [Left]/[Right] - navigate among toolbar items
 * - [Home]/[End] - move to first/last toolbar item
 * - [Tab] / [Shift]+[Tab] - exit the toolbar
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Toolbar.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.17.0
 */
declare class Toolbar extends UI5Element {
    eventDetails: {
        "_min-content-width-change": ToolbarMinWidthChangeEventDetail;
    };
    static i18nBundle: I18nBundle;
    /**
     * Indicated the direction in which the Toolbar items will be aligned.
     * @public
     * @default "End"
     */
    alignContent: `${ToolbarAlign}`;
    /**
     * Calculated width of the whole toolbar.
     * @private
     * @default undefined
     */
    width?: number;
    /**
     * Calculated width of the toolbar content.
     * @private
     * @default undefined
     */
    contentWidth?: number;
    /**
     * Notifies the toolbar if it should show the items in a reverse way if Toolbar Popover needs to be placed on "Top" position.
     * @private
     */
    reverseOverflow: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     *
     * **Note:** It is strongly recommended to always set this property or `accessibleNameRef`
     * when the toolbar has `role="toolbar"` (i.e. when it contains more than one interactive item).
     * Without an accessible name, screen readers will announce the toolbar without any context,
     * making it harder for keyboard-only and AT users to understand its purpose.
     * @default undefined
     * @public
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the input.
     *
     * **Note:** When the toolbar has `role="toolbar"`, at least one of `accessibleName` or
     * `accessibleNameRef` should be provided to satisfy WCAG 2.1 success criterion 4.1.2.
     * @default undefined
     * @public
     */
    accessibleNameRef?: string;
    /**
     * Defines the accessible ARIA name of the overflow button of the component.
     *
     * **Note:** When not set, the built-in translation for "Additional Options" is used.
     * @default undefined
     * @public
     * @since 2.22.0
     */
    overflowButtonAccessibleName?: string;
    /**
     * Defines the toolbar design.
     * @public
     * @default "Solid"
     * @since 2.0.0
     */
    design: `${ToolbarDesign}`;
    popoverOpen: boolean;
    /**
     * Defines the items of the component.
     *
     * **Note:** Currently only `ui5-toolbar-button`, `ui5-toolbar-select`, `ui5-toolbar-separator` and `ui5-toolbar-spacer` are allowed here.
     * @public
     */
    items: DefaultSlot<ToolbarItemBase>;
    _onResize: ResizeObserverCallback;
    _onCloseOverflow: EventListener;
    _onFocusIn: (e: FocusEvent) => void;
    _onKeyDown: (e: KeyboardEvent) => void;
    itemsToOverflow: Array<ToolbarItemBase>;
    itemsWidth: number;
    minContentWidth: number;
    _lastFocusedItem?: ToolbarItemBase | HTMLElement;
    ITEMS_WIDTH_MAP: Map<string, number>;
    static get styles(): string[];
    constructor();
    /**
     * Read-only members
     */
    get overflowButtonSize(): number;
    get padding(): number;
    get alwaysOverflowItems(): ToolbarItemBase[];
    get movableItems(): ToolbarItemBase[];
    get overflowItems(): ToolbarItemBase[];
    get standardItems(): ToolbarItemBase[];
    get hideOverflowButton(): boolean;
    get interactiveItems(): ToolbarItemBase[];
    /**
     * Accessibility
     */
    get hasAriaSemantics(): boolean;
    get accessibleRole(): "toolbar" | undefined;
    get ariaLabelText(): string | undefined;
    get accInfo(): {
        root: {
            role: "toolbar" | undefined;
            accessibleName: string | undefined;
        };
        overflowButton: {
            accessibleName: string;
            tooltip: string;
            accessibilityAttributes: {
                expanded: boolean;
                hasPopup: "menu";
            };
        };
        popover: {
            accessibleName: string;
        };
    };
    /**
     * Toolbar Overflow Popover
     */
    get overflowButtonDOM(): Button | null;
    get hasFlexibleSpacers(): boolean;
    /**
     * Lifecycle methods
     */
    onEnterDOM(): void;
    onExitDOM(): void;
    onInvalidation(changeInfo: ChangeInfo): void;
    onBeforeRendering(): void;
    onAfterRendering(): Promise<void>;
    /**
     * Drops the tracked re-entry item once it leaves the navigation chain
     * (moved to overflow or removed), so Tab re-entry and arrow/Home/End
     * navigation don't silently restart from the first item.
     */
    _reconcileLastFocusedItem(): void;
    addItemsAdditionalProperties(item: ToolbarItemBase): void;
    /**
     * Returns if the overflow popup is open.
     * @public
     */
    isOverflowOpen(): boolean;
    openOverflow(): void;
    closeOverflow(): void;
    toggleOverflow(): void;
    getOverflowPopover(): Popover;
    /**
     * Layout management
     */
    processOverflowLayout(): void;
    storeItemsWidth(): void;
    distributeItems(overflowSpace?: number): void;
    distributeItemsThatAlwaysOverflow(): void;
    setSeperatorsVisibilityInOverflow(): void;
    shouldShowSeparatorInOverflow(separatorIdx: number, overflowItems: Array<ToolbarItemBase>): boolean;
    /**
     * Adds AlwaysOverflow items to overflow to ensure they are never rendered outside overflow (and visual flash is prevented)
     */
    prePopulateAlwaysOverflowItems(): void;
    /**
     * Event Handlers
     */
    onOverflowPopoverClosed(): void;
    onOverflowPopoverOpened(): void;
    onResize(): void;
    /**
     * Private members
     */
    attachListeners(): void;
    detachListeners(): void;
    onToolbarItemChange(): void;
    getItemWidth(item: ToolbarItemBase): number;
    getCachedItemWidth(id: string): number | undefined;
    /**
     * Keyboard Navigation
     */
    _isFocusInsideOverflow(path: Array<EventTarget>): boolean;
    _onfocusin(e: FocusEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _findItemByPath(path: Array<EventTarget>): ToolbarItemBase | undefined;
    _findOverflowButtonByPath(path: Array<EventTarget>): HTMLElement | undefined;
    _isNodeInsideElement(node: Node, element: HTMLElement): boolean;
    _findCurrentTargetByActiveElement(): ToolbarItemBase | HTMLElement | undefined;
    _getNavigationChain(): (HTMLElement | ToolbarItemBase)[];
    _getNavigableItems(): ToolbarItemBase[];
    _setCurrentItem(item: ToolbarItemBase | HTMLElement): void;
    _moveToNext(): void;
    _moveToPrev(): void;
    _moveToFirst(): void;
    _moveToLast(): void;
    _moveToItem(indexCalc: (currentIndex: number, items: Array<ToolbarItemBase | HTMLElement>) => number, isForward: boolean): void;
    _focusNavigationItem(item: ToolbarItemBase | HTMLElement, isForward: boolean): void;
}
export default Toolbar;
export type { ToolbarMinWidthChangeEventDetail, };
