import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import type { ScrollEnablementEventListenerParam } from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import CarouselArrowsPlacement from "./types/CarouselArrowsPlacement.js";
import CarouselPageIndicatorType from "./types/CarouselPageIndicatorType.js";
import type BackgroundDesign from "./types/BackgroundDesign.js";
import type BorderDesign from "./types/BorderDesign.js";
import type Icon from "./Icon.js";
type CarouselNavigateEventDetail = {
    selectedIndex: number;
};
type ItemsInfo = {
    id: string;
    item: HTMLElement & {
        _individualSlot?: string;
    };
    tabIndex: number;
    posinset: number;
    setsize: number;
    visible: boolean;
    _individualSlot?: string;
};
/**
 * @class
 *
 * ### Overview
 * The Carousel allows the user to browse through a set of items.
 * The component is mostly used for showing a gallery of images, but can hold any other HTML element.
 *
 * There are several ways to perform navigation:
 *
 * - on desktop - the user can navigate using the navigation arrows or with keyboard shortcuts.
 * - on touch devices - the user can navigate using the navigation arrows (always visible) or can use swipe gestures.
 *
 * ### Usage
 *
 * #### When to use:
 *
 * - The items you want to display are very different from each other.
 * - You want to display the items one after the other.
 *
 * #### When not to use:
 *
 * - The items you want to display need to be visible at the same time.
 * - The items you want to display are uniform and very similar.
 *
 * ### Hidden Items
 *
 * Carousel items can be conditionally hidden by adding the `hidden` attribute to any child element.
 * Hidden items are automatically excluded from carousel navigation and will not be displayed or counted in pagination.
 * This allows for dynamic showing or hiding of carousel items without affecting the overall carousel behavior.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * When the `ui5-carousel` is focused the user can navigate between the items
 * with the following keyboard shortcuts:
 *
 * - [Up] or [Down] - Navigates to previous and next item
 * - [Left] or [Right] - Navigates to previous and next item
 *
 * ### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 *
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Carousel.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @public
 * @csspart content - Used to style the content of the component
 */
declare class Carousel extends UI5Element {
    eventDetails: {
        navigate: CarouselNavigateEventDetail;
    };
    /**
     * Defines the accessible name of the component.
     * @default undefined
     * @public
     * @since 1.24
     */
    accessibleName?: string;
    /**
     * Defines the IDs of the elements that label the input.
     * @default undefined
     * @public
     * @since 1.24
     */
    accessibleNameRef?: string;
    /**
     * Defines whether the carousel should loop, i.e show the first page after the last page is reached and vice versa.
     * @default false
     * @public
     */
    cyclic: boolean;
    /**
     * Defines the number of items per page depending on the carousel width.
     *
     * - 'S' for screens smaller than 600 pixels.
     * - 'M' for screens greater than or equal to 600 pixels and smaller than 1024 pixels.
     * - 'L' for screens greater than or equal to 1024 pixels and smaller than 1440 pixels.
     * - 'XL' for screens greater than or equal to 1440 pixels.
     *
     * One item per page is shown by default.
     * @default "S1 M1 L1 XL1"
     * @public
     */
    itemsPerPage: string;
    /**
     * Defines the visibility of the navigation arrows.
     * If set to true the navigation arrows will be hidden.
     *
     * @since 1.0.0-rc.15
     * @default false
     * @public
     */
    hideNavigationArrows: boolean;
    /**
     * Defines the visibility of the page indicator.
     * If set to true the page indicator will be hidden.
     * @since 1.0.0-rc.15
     * @default false
     * @public
     */
    hidePageIndicator: boolean;
    /**
     * Defines the style of the page indicator.
     * Available options are:
     *
     * - `Default` - The page indicator will be visualized as dots if there are fewer than 9 pages. If there are more pages, the page indicator will switch to displaying the current page and the total number of pages. (e.g. X of Y)
     * - `Numeric` - The page indicator will display the current page and the total number of pages. (e.g. X of Y)
     * @since 1.10
     * @default "Default"
     * @public
     */
    pageIndicatorType: `${CarouselPageIndicatorType}`;
    /**
     * Defines the carousel's background design.
     * @since 1.14
     * @default "Translucent"
     * @public
     */
    backgroundDesign: `${BackgroundDesign}`;
    /**
     * Defines the page indicator background design.
     * @since 1.14
     * @default "Solid"
     * @public
     */
    pageIndicatorBackgroundDesign: `${BackgroundDesign}`;
    /**
     * Defines the page indicator border design.
     * @since 1.14
     * @default "Solid"
     * @public
     */
    pageIndicatorBorderDesign: `${BorderDesign}`;
    /**
     * Defines the index of the initially selected item.
     * @default 0
     * @private
     */
    _focusedItemIndex: number;
    /**
     * Defines the position of arrows.
     *
     * Available options are:
     *
     * - `Content` - the arrows are placed on the sides of the current page.
     * - `Navigation` - the arrows are placed on the sides of the page indicator.
     * @default "Content"
     * @public
     */
    arrowsPlacement: `${CarouselArrowsPlacement}`;
    /**
     * Defines the carousel width in pixels.
     * @private
     */
    _width?: number;
    /**
     * Defines the carousel item width in pixels.
     * @private
     */
    _itemWidth?: number;
    /**
     * If set to true navigation arrows are shown.
     * @private
     * @since 1.0.0-rc.15
     */
    _visibleNavigationArrows: boolean;
    /**
     * Internal trigger flag that forces component re-rendering when content items change.
     * @private
     * @since 2.16.0
     */
    _visibleItemsCount: number;
    /**
     * Defines the current slide index, which contains the visible item in the viewport.
     * @private
     * @since 2.16.0-r.c1
     */
    _currentSlideIndex: number;
    _scrollEnablement: ScrollEnablement;
    _onResizeBound: ResizeObserverCallback;
    _resizing: boolean;
    _lastFocusedElements: Array<HTMLElement>;
    _orderOfLastFocusedPages: Array<number>;
    _lastInnerFocusedElement?: HTMLElement;
    _pageStep: number;
    _visibleItemsIndexes: Array<number>;
    _itemIndicator: number;
    _contentItemsObserver: MutationObserver;
    _observableContent: Array<HTMLElement>;
    /**
     * Defines the content of the component.
     *
     * **Note:** Items with the `hidden` attribute will be automatically excluded from carousel navigation and page calculations.
     * They will not be displayed or accessible via keyboard navigation. See [sample](./#carousel-with-hidden-items).
     * @public
     */
    content: DefaultSlot<HTMLElement>;
    static i18nBundle: I18nBundle;
    static get pageTypeLimit(): number;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    validateSelectedIndex(): void;
    _onResize(): void;
    _updateScrolling(e: ScrollEnablementEventListenerParam): void;
    _onkeydown(e: KeyboardEvent): void;
    _onfocusin(e: FocusEvent): void;
    _onmouseout(): void;
    _onmouseover(): void;
    _ontouchstart(e: TouchEvent): void;
    _onmousedown(e: MouseEvent): void;
    _handleF7Key(e: KeyboardEvent): Promise<void>;
    _observeContentItems(): void;
    get hasMatchingContent(): boolean;
    _handleHome(e: KeyboardEvent): Promise<void>;
    _handleEnd(e: KeyboardEvent): Promise<void>;
    _handlePageUp(e: KeyboardEvent): Promise<void>;
    _handlePageDown(e: KeyboardEvent): Promise<void>;
    get _backgroundDesign(): string;
    get _getLastFocusedActivePageIndex(): number;
    navigateLeft(): Promise<void>;
    navigateRight(): Promise<void>;
    navigateArrowRight(): void;
    navigateArrowLeft(): void;
    _calculateItemSlideIndex(currentSlideIndex: number, itemStep: number): number;
    _moveToItem(slideIndex: number): void;
    focusItem(): void;
    _navButtonClick(e: UI5CustomEvent<Icon, "click">): void;
    /**
     * Changes the currently displayed page.
     * @param itemIndex The index of the target item
     * @since 1.0.0-rc.15
     * @public
     */
    navigateTo(itemIndex: number): void;
    skipToItem(focusIndex: number, offset: number): void;
    /**
     * The indices of the currently visible items of the component.
     * @public
     * @since 1.0.0-rc.15
     * @default []
     */
    get visibleItemsIndices(): Array<number>;
    /**
     * Assuming that all items have the same width
     * @private
     */
    get items(): Array<ItemsInfo>;
    get effectiveItemsPerPage(): number;
    isItemInViewport(index: number): boolean;
    _updateVisibleItems(index: number): void;
    isIndexInRange(index: number): boolean;
    /**
     * @private
     */
    get renderNavigation(): boolean;
    get hasManyPages(): boolean;
    get classes(): {
        viewport: {
            "ui5-carousel-viewport": boolean;
            "ui5-carousel-viewport--single": boolean;
        };
        content: {
            "ui5-carousel-content": boolean;
            "ui5-carousel-content-no-animation": boolean;
            "ui5-carousel-content-has-navigation": boolean;
            "ui5-carousel-content-has-navigation-and-buttons": boolean;
        };
        navigation: {
            [x: string]: boolean;
            "ui5-carousel-navigation-wrapper": boolean;
            "ui5-carousel-navigation-with-buttons": boolean;
        };
    };
    get pagesCount(): number;
    get isPageTypeDots(): boolean;
    get dots(): {
        active: boolean;
        ariaLabel: string;
    }[];
    get showArrows(): {
        content: boolean;
        navigation: boolean;
    };
    get hasPrev(): boolean;
    get hasNext(): boolean;
    get suppressAnimation(): boolean;
    get _isRTL(): boolean;
    get selectedIndexToShow(): number;
    get ofText(): string;
    get ariaLabelTxt(): string | undefined;
    get nextPageText(): string;
    get previousPageText(): string;
    get _roleDescription(): string;
    get _ariaListLabel(): string;
    /**
     * Returns only visible (non-hidden) content items.
     * Items with the 'hidden' attribute are automatically excluded from carousel navigation.
     * @private
     * @returns {Array<HTMLElement>}
     */
    get _visibleItems(): HTMLElement[];
    carouselItemDomRef(idx: number): Array<HTMLElement>;
}
export default Carousel;
export type { CarouselNavigateEventDetail, };
