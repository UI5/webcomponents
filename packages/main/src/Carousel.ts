import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import {
	isLeft,
	isRight,
	isDown,
	isUp,
	isF7,
	isHome,
	isEnd,
	isPageDown,
	isPageUp,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import type { ScrollEnablementEventListenerParam } from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import {
	CAROUSEL_OF_TEXT,
	CAROUSEL_DOT_TEXT,
	CAROUSEL_PREVIOUS_ARROW_TEXT,
	CAROUSEL_NEXT_ARROW_TEXT,
	CAROUSEL_ARIA_ROLE_DESCRIPTION,
	CAROUSEL_ARIA_LIST_LABEL,
} from "./generated/i18n/i18n-defaults.js";
import CarouselArrowsPlacement from "./types/CarouselArrowsPlacement.js";
import CarouselPageIndicatorType from "./types/CarouselPageIndicatorType.js";
import type BackgroundDesign from "./types/BackgroundDesign.js";
import type BorderDesign from "./types/BorderDesign.js";
import CarouselTemplate from "./CarouselTemplate.js";
import type Icon from "./Icon.js";
import { getFirstFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import clamp from "@ui5/webcomponents-base/dist/util/clamp.js";

// Styles
import CarouselCss from "./generated/themes/Carousel.css.js";

type CarouselNavigateEventDetail = {
	selectedIndex: number;
}

type ChangePageOptions = {
	fireEvent?: boolean;
	moveFocus?: boolean;
}

type ItemsInfo = {
	id: string,
	item: HTMLElement & { _individualSlot?: string },
	tabIndex: number,
	posinset: number,
	setsize: number,
	visible: boolean,
	_individualSlot?: string,
}

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
@customElement({
	tag: "ui5-carousel",
	languageAware: true,
	fastNavigation: true,
	renderer: jsxRenderer,
	styles: CarouselCss,
	template: CarouselTemplate,
})
/**
 * Fired whenever the page changes due to user interaction,
 * when the user clicks on the navigation arrows or while resizing,
 * based on the `items-per-page` property.
 * @param {Integer} selectedIndex the current selected index
 * @public
 * @since 1.0.0-rc.7
 */
@event("navigate", {
	bubbles: true,
})

class Carousel extends UI5Element {
	eventDetails!: {
		navigate: CarouselNavigateEventDetail;
	}
	/**
	 * Defines the accessible name of the component.
	 * @default undefined
	 * @public
	 * @since 1.24
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the IDs of the elements that label the input.
	 * @default undefined
	 * @public
	 * @since 1.24
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines whether the carousel should loop, i.e show the first page after the last page is reached and vice versa.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	cyclic = false;

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
	@property()
	itemsPerPage = "S1 M1 L1 XL1";

	/**
	 * Defines the visibility of the navigation arrows.
	 * If set to true the navigation arrows will be hidden.
	 *
	 * @since 1.0.0-rc.15
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideNavigationArrows = false;

	/**
	 * Defines the visibility of the page indicator.
	 * If set to true the page indicator will be hidden.
	 * @since 1.0.0-rc.15
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hidePageIndicator = false;

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
	@property()
	pageIndicatorType: `${CarouselPageIndicatorType}` = "Default";

	/**
	 * Defines the carousel's background design.
	 * @since 1.14
	 * @default "Translucent"
	 * @public
	 */
	@property()
	backgroundDesign: `${BackgroundDesign}` = "Translucent";

	/**
	 * Defines the page indicator background design.
	 * @since 1.14
	 * @default "Solid"
	 * @public
	 */
	@property()
	pageIndicatorBackgroundDesign: `${BackgroundDesign}` = "Solid";

	/**
	 * Defines the page indicator border design.
	 * @since 1.14
	 * @default "Solid"
	 * @public
	 */
	@property()
	pageIndicatorBorderDesign: `${BorderDesign}` = "Solid";

	/**
	 * Defines the index of the initially selected item.
	 * @default 0
	 * @private
	 */
	@property({ type: Number, noAttribute: true })
	_focusedItemIndex = 0;

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
	@property()
	arrowsPlacement: `${CarouselArrowsPlacement}` = "Content";

	/**
	 * Defines the carousel width in pixels.
	 * @private
	 */
	@property({ type: Number })
	_width?: number;

	/**
	 * Defines the carousel item width in pixels.
	 * @private
	 */
	@property({ type: Number })
	_itemWidth?: number;

	/**
	 * If set to true navigation arrows are shown.
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean, noAttribute: true })
	_visibleNavigationArrows = false;

	/**
	 * Internal trigger flag that forces component re-rendering when content items change.
	 * @private
	 * @since 2.16.0
	 */
	@property({ type: Number, noAttribute: true })
	_visibleItemsCount = 0;

	/**
	 * Defines the current page index, which determines the first visible item in the viewport.
	 * @private
	 * @since 2.16.0-r.c1
	 */
	@property({ type: Number, noAttribute: true })
	_currentPageIndex: number = 0;

	_scrollEnablement: ScrollEnablement;
	_onResizeBound: ResizeObserverCallback;
	_resizing: boolean;
	_lastFocusedElements: Array<HTMLElement>;
	_orderOfLastFocusedItems: Array<number>;
	_lastInnerFocusedElement?: HTMLElement;
	_pageStep: number = 10;
	_visibleItemsIndexes: Array<number>;
	_contentItemsObserver: MutationObserver;
	_observableContent: Array<HTMLElement> = [];

	/**
	 * Defines the content of the component.
	 *
	 * **Note:** Items with the `hidden` attribute will be automatically excluded from carousel navigation and page calculations.
	 * They will not be displayed or accessible via keyboard navigation. See [sample](./#carousel-with-hidden-items).
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, individualSlots: true })
	content!: DefaultSlot<HTMLElement>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	static get pageTypeLimit() {
		return 9;
	}

	constructor() {
		super();

		this._contentItemsObserver = new MutationObserver(() => {
			const visibleItemsCount = this._visibleItems.length;

			if (this._visibleItemsCount === visibleItemsCount) {
				return;
			}

			this._visibleItemsCount = visibleItemsCount;

			this._currentPageIndex = clamp(this._currentPageIndex, 0, Math.max(0, this.items.length - this.effectiveItemsPerPage));
			this._focusedItemIndex = clamp(this._focusedItemIndex, this._currentPageIndex, this.items.length - 1);
			this._changePageIndex(this._currentPageIndex, { fireEvent: false });
		});

		this._scrollEnablement = new ScrollEnablement(this);
		this._scrollEnablement.attachEvent("touchend", e => {
			this._updateScrolling(e);
		});
		this._onResizeBound = this._onResize.bind(this);
		this._resizing = false; // indicates if the carousel is in process of resizing

		this._lastFocusedElements = [];
		this._orderOfLastFocusedItems = [];
		this._visibleItemsIndexes = [];
	}

	onBeforeRendering() {
		this._observeContentItems();

		if (this.arrowsPlacement === CarouselArrowsPlacement.Navigation || !isDesktop()) {
			this._visibleNavigationArrows = true;
		}

		this.validateSelectedIndex();
	}

	onAfterRendering() {
		this._scrollEnablement.scrollContainer = this.getDomRef()!;
		this._resizing = false; // not invalidating
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._onResizeBound);
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	onExitDOM() {
		this._contentItemsObserver.disconnect();
		this._observableContent = [];
		ResizeHandler.deregister(this, this._onResizeBound);
	}

	validateSelectedIndex() {
		if (!this.isIndexInRange(this._focusedItemIndex)) {
			this._focusedItemIndex = 0;
		}
	}

	_onResize() {
		const previousItemsPerPage = this.effectiveItemsPerPage;

		// Set the resizing flag to suppress animation while resizing
		this._resizing = true;

		// Change transitively effectiveItemsPerPage by modifying _width
		this._width = this.offsetWidth;
		this._itemWidth = Math.floor(this._width / this.effectiveItemsPerPage);
		this._updateVisibleItems(this._currentPageIndex);

		// Items per page did not change or the current,
		// therefore page index does not need to be re-adjusted
		if (this.effectiveItemsPerPage === previousItemsPerPage) {
			return;
		}

		this._focusedItemIndex = clamp(this._focusedItemIndex, this._currentPageIndex, this.items.length - this.effectiveItemsPerPage);
	}

	_updateScrolling(e: ScrollEnablementEventListenerParam) {
		if (!e) {
			return;
		}

		if (e.isLeft) {
			this.navigateLeft();
		} else if (e.isRight) {
			this.navigateRight();
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (isF7(e)) {
			this._handleF7Key(e);
			return;
		}
		if (isHome(e)) {
			this._handleHome(e);
		}
		if (isEnd(e)) {
			this._handleEnd(e);
		}
		if (isPageUp(e)) {
			this._handlePageUp(e);
		}
		if (isPageDown(e)) {
			this._handlePageDown(e);
		}

		if (isLeft(e) || isUp(e)) {
			e.preventDefault();
			this.navigateLeft();
		} else if (isRight(e) || isDown(e)) {
			e.preventDefault();
			this.navigateRight();
		}
	}

	_onfocusin(e: FocusEvent) {
		const target = e.target as HTMLElement;

		if (target === this.getDomRef()) {
			return;
		}

		let itemIndex = -1;
		for (let i = 0; i < this._visibleItems.length; i++) {
			if (this._visibleItems[i].isEqualNode(target?.querySelector("slot")?.assignedNodes()[0] as HTMLElement)) {
				itemIndex = i;
				break;
			}
		}

		if (itemIndex === -1) {
			return;
		}

		this._focusedItemIndex = itemIndex;
		// Save reference of the last focused element for each item
		this._lastFocusedElements[itemIndex] = target;

		const sortedItemIndex = this._orderOfLastFocusedItems.indexOf(itemIndex);
		if (sortedItemIndex === -1) {
			this._orderOfLastFocusedItems.unshift(itemIndex);
		} else {
			this._orderOfLastFocusedItems.splice(0, 0, this._orderOfLastFocusedItems.splice(sortedItemIndex, 1)[0]);
		}
	}

	_onmouseout() {
		if (this.arrowsPlacement === CarouselArrowsPlacement.Content) {
			this._visibleNavigationArrows = false;
		}
	}

	_onmouseover() {
		if (this.arrowsPlacement === CarouselArrowsPlacement.Content) {
			this._visibleNavigationArrows = true;
		}
	}

	_ontouchstart(e: TouchEvent) {
		const target = e.target as HTMLElement;
		if (target.hasAttribute("data-ui5-arrow-forward") || target.hasAttribute("data-ui5-arrow-back")) {
			e.preventDefault();
		}
	}

	_onmousedown(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.hasAttribute("data-ui5-arrow-forward") || target.hasAttribute("data-ui5-arrow-back")) {
			e.preventDefault();
		}
	}

	async _handleF7Key(e: KeyboardEvent) {
		const lastFocusedElement = this._lastFocusedElements[this._getLastFocusedItemIndex];
		if (!this._lastInnerFocusedElement) {
			const firstFocusable = await getFirstFocusableElement(this.items[this._focusedItemIndex].item);
			firstFocusable?.focus();
			this._lastInnerFocusedElement = firstFocusable || undefined;
		} else if (this.carouselItemDomRef(this._focusedItemIndex)[0] === lastFocusedElement && lastFocusedElement !== e.target) {
			lastFocusedElement.focus();
			this._lastInnerFocusedElement = e.target as HTMLElement;
		} else if (this._lastInnerFocusedElement) {
			this._lastInnerFocusedElement.focus();
		}
	}

	_observeContentItems() {
		if (this.hasMatchingContent) {
			return;
		}

		this.content.forEach(item => {
			if (!this._observableContent.includes(item)) {
				this._contentItemsObserver.observe(item, {
					characterData: false,
					childList: false,
					subtree: false,
					attributes: true,
					attributeFilter: ["hidden"],
				});
			}
		});
		this._observableContent = this.content;
	}

	get hasMatchingContent() {
		if (this._observableContent.length !== this.content.length) {
			return false;
		}

		const observableContentSet = new WeakSet(this._observableContent);
		return this.content.every(item => observableContentSet.has(item));
	}

	async _handleHome(e: KeyboardEvent) {
		e.preventDefault();
		this._changePageIndex(0, { moveFocus: true });
		await renderFinished();
		this.focusItem();
	}

	async _handleEnd(e: KeyboardEvent) {
		e.preventDefault();
		this._changePageIndex(this.items.length - 1, { moveFocus: true });
		await renderFinished();
		this.focusItem();
	}

	async _handlePageUp(e: KeyboardEvent) {
		e.preventDefault();
		this._changePageIndex(this._currentPageIndex + this._pageStep, { moveFocus: true });
		await renderFinished();
		this.focusItem();
	}

	async _handlePageDown(e: KeyboardEvent) {
		e.preventDefault();
		this._changePageIndex(this._currentPageIndex - this._pageStep, { moveFocus: true });
		await renderFinished();
		this.focusItem();
	}

	get _backgroundDesign() {
		return this.backgroundDesign.toLowerCase();
	}

	get _getLastFocusedItemIndex() {
		for (let i = 0; i < this._orderOfLastFocusedItems.length; i++) {
			const itemIndex = this._orderOfLastFocusedItems[i];

			if (this.isItemInViewport(itemIndex)) {
				return itemIndex;
			}
		}

		return this._focusedItemIndex;
	}

	async navigateLeft() {
		let newFocusedItemIndex = this._focusedItemIndex - 1;
		if (this.cyclic && newFocusedItemIndex < 0) {
			newFocusedItemIndex = this.items.length - 1;
		}

		this._changeFocusIndex(newFocusedItemIndex);
		await renderFinished();
		this.focusItem();
	}

	async navigateRight() {
		let newFocusedItemIndex = this._focusedItemIndex + 1;
		if (this.cyclic && newFocusedItemIndex > this.items.length - 1) {
			newFocusedItemIndex = 0;
		}

		this._changeFocusIndex(newFocusedItemIndex);
		await renderFinished();
		this.focusItem();
	}

	async navigateArrowRight() {
		let newCurrentPageIndex = this._currentPageIndex + 1;
		if (this.cyclic && newCurrentPageIndex > this.items.length - this.effectiveItemsPerPage) {
			newCurrentPageIndex = 0;
		}

		this._changePageIndex(newCurrentPageIndex);
		await renderFinished();
		this.focusItem();
	}

	async navigateArrowLeft() {
		let newCurrentPageIndex = this._currentPageIndex - 1;
		if (this.cyclic && newCurrentPageIndex < 0) {
			newCurrentPageIndex = this.items.length - 1;
		}

		this._changePageIndex(newCurrentPageIndex);
		await renderFinished();
		this.focusItem();
	}

	focusItem() {
		this.carouselItemDomRef(this._focusedItemIndex)[0].focus({ preventScroll: true });
	}

	_navButtonClick(e: UI5CustomEvent<Icon, "click">) {
		const target = e.target as Icon;

		if (target.hasAttribute("data-ui5-arrow-forward")) {
			this.navigateArrowRight();
		} else {
			this.navigateArrowLeft();
		}
	}

	/**
	 * Changes the currently displayed page.
	 * @param itemIndex The index of the target item
	 * @since 1.0.0-rc.15
	 * @public
	 */
	navigateTo(itemIndex: number): void {
		this._changePageIndex(itemIndex, { fireEvent: false });
	}

	_changePageIndex(itemIndex: number, options: ChangePageOptions = {}): void {
		const { fireEvent = true, moveFocus = false } = options;
		const newPageIndex = clamp(itemIndex, 0, this.items.length - this.effectiveItemsPerPage);

		if (moveFocus || (this._focusedItemIndex < newPageIndex || this._focusedItemIndex > newPageIndex + this.effectiveItemsPerPage - 1)) {
			this._focusedItemIndex = clamp(itemIndex, 0, this.items.length - 1);
		}

		if (this._currentPageIndex === newPageIndex) {
			return;
		}

		this._currentPageIndex = newPageIndex;
		this._updateVisibleItems(newPageIndex);

		if (fireEvent) {
			this.fireDecoratorEvent("navigate", { selectedIndex: newPageIndex });
		}
	}

	_changeFocusIndex(itemIndex: number) {
		itemIndex = clamp(itemIndex, 0, this.items.length - 1);
		let newPageIndex = this._currentPageIndex;

		if (itemIndex < this._currentPageIndex) {
			newPageIndex = itemIndex;
		} else if (itemIndex > this._currentPageIndex + this.effectiveItemsPerPage - 1) {
			newPageIndex = itemIndex - this.effectiveItemsPerPage + 1;
		}

		if (this._currentPageIndex !== newPageIndex) {
			this._currentPageIndex = newPageIndex;
			this._updateVisibleItems(newPageIndex);

			this.fireDecoratorEvent("navigate", { selectedIndex: newPageIndex });
		}

		this._focusedItemIndex = itemIndex;
	}

	/**
	 * The indices of the currently visible items of the component.
	 * @public
	 * @since 1.0.0-rc.15
	 * @default []
	 */
	get visibleItemsIndices() : Array<number> {
		return this._visibleItemsIndexes;
	}

	/**
	 * Assuming that all items have the same width
	 * @private
	 */
	get items(): Array<ItemsInfo> {
		return this._visibleItems.map((item, idx) => {
			return {
				id: `${this._id}-carousel-item-${idx + 1}`,
				item,
				tabIndex: this.isItemInViewport(this._focusedItemIndex) ? 0 : -1,
				posinset: idx + 1,
				setsize: this._visibleItems.length,
				visible: this.isItemInViewport(idx),
			};
		});
	}
	get effectiveItemsPerPage(): number {
		const itemsPerPageArray = this.itemsPerPage.split(" ");
		let itemsPerPageSizeS = 1,
			itemsPerPageSizeM = 1,
			itemsPerPageSizeL = 1,
			itemsPerPageSizeXL = 1;

		itemsPerPageArray.forEach(element => {
			if (element.startsWith("S")) {
				itemsPerPageSizeS = Number(element.slice(1)) || 1;
			} else if (element.startsWith("M")) {
				itemsPerPageSizeM = Number(element.slice(1)) || 1;
			} else if (element.startsWith("L")) {
				itemsPerPageSizeL = Number(element.slice(1)) || 1;
			} else if (element.startsWith("XL")) {
				itemsPerPageSizeXL = Number(element.slice(2)) || 1;
			}
		});

		if (!this._width) {
			return itemsPerPageSizeL;
		}

		if (this._width < 600) {
			return itemsPerPageSizeS;
		}

		if (this._width >= 600 && this._width < 1024) {
			return itemsPerPageSizeM;
		}

		if (this._width >= 1024 && this._width < 1440) {
			return itemsPerPageSizeL;
		}

		return itemsPerPageSizeXL;
	}

	isItemInViewport(index: number): boolean {
		return this._visibleItemsIndexes.includes(index);
	}

	_updateVisibleItems(index: number) {
		let newItemIndex = index;
		const effectiveItemsPerPage = this.effectiveItemsPerPage;
		const items = this.items;

		if (!items.length) {
			return;
		}

		if (newItemIndex > items.length - effectiveItemsPerPage) {
			newItemIndex = items.length	 - effectiveItemsPerPage;
		}
		const lastItemIndex = newItemIndex + effectiveItemsPerPage;

		this._visibleItemsIndexes = [];

		for (let i = newItemIndex; i < lastItemIndex; i++) {
			this._visibleItemsIndexes.push(i);
		}
	}

	isIndexInRange(index: number): boolean {
		return index >= 0 && index <= this.items.length - 1;
	}

	/**
	 * @private
	 */
	get renderNavigation() {
		if (!this.hasManyPages) {
			return false;
		}

		if (this.arrowsPlacement === CarouselArrowsPlacement.Navigation && !this.hideNavigationArrows) {
			return true;
		}

		if (this.hidePageIndicator) {
			return false;
		}

		return true;
	}

	get hasManyPages() {
		return this.pagesCount > 1;
	}

	get classes() {
		return {
			viewport: {
				"ui5-carousel-viewport": true,
				"ui5-carousel-viewport--single": this.pagesCount === 1,
			},
			content: {
				"ui5-carousel-content": true,
				"ui5-carousel-content-no-animation": this.suppressAnimation,
				"ui5-carousel-content-has-navigation": this.renderNavigation,
				"ui5-carousel-content-has-navigation-and-buttons": this.renderNavigation && this.arrowsPlacement === CarouselArrowsPlacement.Navigation && !this.hideNavigationArrows,
			},
			navigation: {
				"ui5-carousel-navigation-wrapper": true,
				"ui5-carousel-navigation-with-buttons": this.renderNavigation && this.arrowsPlacement === CarouselArrowsPlacement.Navigation && !this.hideNavigationArrows,
				[`ui5-carousel-navigation-wrapper-bg-${this.pageIndicatorBackgroundDesign.toLowerCase()}`]: true,
				[`ui5-carousel-navigation-wrapper-border-${this.pageIndicatorBorderDesign.toLowerCase()}`]: true,
			},
		};
	}

	get pagesCount() {
		const items = this._visibleItems.length;
		return items > this.effectiveItemsPerPage ? items - this.effectiveItemsPerPage + 1 : 1;
	}

	get isPageTypeDots() {
		if (this.pageIndicatorType === CarouselPageIndicatorType.Numeric) {
			return false;
		}

		return this.pagesCount < Carousel.pageTypeLimit;
	}

	get dots() {
		const dots = [];
		const pages = this.pagesCount;

		for (let index = 0; index < pages; index++) {
			dots.push({
				active: index === this._currentPageIndex,
				ariaLabel: Carousel.i18nBundle.getText(CAROUSEL_DOT_TEXT, index + 1, pages),
			});
		}

		return dots;
	}

	get showArrows() {
		const displayArrows = this._visibleNavigationArrows && this.hasManyPages;
		return {
			content: !this.hideNavigationArrows && displayArrows && this.arrowsPlacement === CarouselArrowsPlacement.Content,
			navigation: !this.hideNavigationArrows && displayArrows && this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
		};
	}

	get hasPrev() {
		return this.cyclic || (this._focusedItemIndex - 1 >= 0 && this._currentPageIndex !== 0);
	}

	get hasNext() {
		return this.cyclic || (this._focusedItemIndex + 1 <= this._visibleItems.length - 1 && this._currentPageIndex < this.pagesCount - 1);
	}

	get suppressAnimation() {
		return this._resizing || getAnimationMode() === AnimationMode.None;
	}

	get _isRTL() {
		return this.effectiveDir === "rtl";
	}

	get selectedIndexToShow() {
		return this._isRTL ? this.items.length - (this.items.length - this._focusedItemIndex) + 1 : this._focusedItemIndex + 1;
	}

	get ofText() {
		return Carousel.i18nBundle.getText(CAROUSEL_OF_TEXT);
	}

	get ariaLabelTxt() {
		return getEffectiveAriaLabelText(this);
	}

	get nextPageText() {
		return Carousel.i18nBundle.getText(CAROUSEL_NEXT_ARROW_TEXT);
	}

	get previousPageText() {
		return Carousel.i18nBundle.getText(CAROUSEL_PREVIOUS_ARROW_TEXT);
	}

	get _roleDescription() {
		return Carousel.i18nBundle.getText(CAROUSEL_ARIA_ROLE_DESCRIPTION);
	}

	get _ariaListLabel() {
		return Carousel.i18nBundle.getText(CAROUSEL_ARIA_LIST_LABEL);
	}

	/**
 	 * Returns only visible (non-hidden) content items.
	 * Items with the 'hidden' attribute are automatically excluded from carousel navigation.
	 * @default []
	 * @private
	 */
	get _visibleItems(): Array<HTMLElement> {
		return this.content.filter(x => !x.hasAttribute("hidden"));
	}

	carouselItemDomRef(idx: number) : Array<HTMLElement> {
		const items = this.getDomRef()?.querySelectorAll(".ui5-carousel-item") || [];
		return Array.from(items).filter((item, index) => {
			return index === idx;
		}) as Array<HTMLElement>;
	}
}

Carousel.define();

export default Carousel;
export type {
	CarouselNavigateEventDetail,
};
