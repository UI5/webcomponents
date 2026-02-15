var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Breadcrumbs_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { locationOpen } from "@ui5/webcomponents-base/dist/Location.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isSpace, isShow, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import BreadcrumbsDesign from "./types/BreadcrumbsDesign.js";
import "./BreadcrumbsItem.js";
import { BREADCRUMB_ITEM_POS, BREADCRUMBS_ARIA_LABEL, BREADCRUMBS_OVERFLOW_ARIA_LABEL, BREADCRUMBS_CANCEL_BUTTON, FORM_SELECTABLE_AVALIABLE_VALUES, } from "./generated/i18n/i18n-defaults.js";
// Templates
import BreadcrumbsTemplate from "./BreadcrumbsTemplate.js";
// Styles
import breadcrumbsCss from "./generated/themes/Breadcrumbs.css.js";
import breadcrumbsPopoverCss from "./generated/themes/BreadcrumbsPopover.css.js";
/**
 * @class
 *
 * ### Overview
 * Enables users to navigate between items by providing a list of links to previous steps in the user's navigation path.
 * It helps the user to be aware of their location within the application and allows faster navigation.
 *
 * The last three steps can be accessed as links directly, while the remaining links prior to them are available
 * in a drop-down menu.
 *
 * You can choose the type of separator to be used from a number of predefined options.
 *
 * ### Keyboard Handling
 * The `ui5-breadcrumbs` provides advanced keyboard handling.
 *
 * - [F4], [Alt] + [Up], [Alt] + [Down], [Space], or [Enter] - If the dropdown arrow is focused - opens/closes the drop-down.
 * - [Space],[Enter] - Activates the focused item and triggers the `item-click` event.
 * - [Escape] - Closes the drop-down.
 * - [Left] - If the drop-down is closed - navigates one item to the left.
 * - [Right] - If the drop-down is closed - navigates one item to the right.
 * - [Up] - If the drop-down is open - moves focus to the next item.
 * - [Down] - If the drop-down is open - moves focus to the previous item.
 * - [Home] - Navigates to the first item.
 * - [End] - Navigates to the last item.
 * @constructor
 * @extends UI5Element
 * @implements {IOverflowToolbarItem}
 * @public
 * @since 1.0.0-rc.15
 */
let Breadcrumbs = Breadcrumbs_1 = class Breadcrumbs extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the visual appearance of the last BreadcrumbsItem.
         *
         * The Breadcrumbs supports two visual appearances for the last BreadcrumbsItem:
         * - "Standard" - displaying the last item as "current page" (bold and without separator)
         * - "NoCurrentPage" - displaying the last item as a regular BreadcrumbsItem, followed by separator
         * @default "Standard"
         * @public
        */
        this.design = "Standard";
        /**
         * Determines the visual style of the separator between the breadcrumb items.
         * @default "Slash"
         * @public
         */
        this.separators = "Slash";
        /**
         * Holds the number of items in the overflow.
         * @default 0
         * @private
         */
        this._overflowSize = 0;
        // maps items to their widths
        this._breadcrumbItemWidths = new WeakMap();
        // the width of the interactive element that opens the overflow
        this._dropdownArrowLinkWidth = 0;
        this._itemNavigation = new ItemNavigation(this, {
            navigationMode: NavigationMode.Auto,
            getItemsCallback: () => this._getFocusableItems(),
        });
        this._onResizeHandler = this._updateOverflow.bind(this);
        this._labelFocusAdaptor = {
            id: `${this._id}-labelWrapper`,
            getlabelWrapper: this.getCurrentLocationLabelWrapper.bind(this),
            set forcedTabIndex(value) {
                const wrapper = this.getlabelWrapper();
                wrapper && wrapper.setAttribute("tabindex", value);
            },
            get forcedTabIndex() {
                const wrapper = this.getlabelWrapper();
                return wrapper?.getAttribute("tabindex") || "";
            },
        };
    }
    onInvalidation(changeInfo) {
        if (changeInfo.reason === "childchange") {
            const itemIndex = this._getItems().indexOf(changeInfo.child), isInOverflow = itemIndex < this._overflowSize;
            if (isInOverflow) {
                // the content of an overflowing item has changed
                // => need to render the item outside the overflow to obtain its new width
                // => lower-down the `_overfowSize` to exclude that item from the overflow
                this._overflowSize = itemIndex;
            }
        }
    }
    _getItems() {
        return this.getSlottedNodes("items");
    }
    onBeforeRendering() {
        this._preprocessItems();
    }
    async onAfterRendering() {
        await renderFinished();
        this._cacheWidths();
        this._updateOverflow();
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._onResizeHandler);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._onResizeHandler);
    }
    _initItemNavigation() {
        if (!this._itemNavigation) {
            this._itemNavigation = new ItemNavigation(this, {
                navigationMode: NavigationMode.Auto,
                getItemsCallback: () => this._getFocusableItems(),
            });
        }
    }
    /**
     * Obtains the items for navigation via keyboard
     * @private
     */
    _getFocusableItems() {
        const items = this._links;
        if (!this._isOverflowEmpty) {
            items.unshift(this._dropdownArrowLink);
        }
        if (this._endsWithCurrentLocation && !this._endsWithCurrentLinkItem) {
            items.push(this._labelFocusAdaptor);
        }
        return items;
    }
    getFocusDomRef() {
        return this._itemNavigation._getCurrentItem();
    }
    /**
     * Returns the translatable accessible name for the popover
     * @private
     */
    get _accessibleNamePopover() {
        return Breadcrumbs_1.i18nBundle.getText(FORM_SELECTABLE_AVALIABLE_VALUES);
    }
    _onfocusin(e) {
        const target = e.target, labelWrapper = this.getCurrentLocationLabelWrapper(), currentItem = (target === labelWrapper) ? this._labelFocusAdaptor : target;
        this._itemNavigation.setCurrentItem(currentItem);
    }
    _onkeydown(e) {
        const isDropdownArrowFocused = this._isDropdownArrowFocused;
        if (isShow(e) && isDropdownArrowFocused && !this._isOverflowEmpty) {
            e.preventDefault();
            this._toggleRespPopover();
            return;
        }
        if (isSpace(e) && isDropdownArrowFocused && !this._isOverflowEmpty && !this._isPickerOpen) {
            e.preventDefault();
            return;
        }
        if ((isEnter(e) || isSpace(e)) && this._isCurrentLocationLabelFocused) {
            this._onLabelPress(e);
        }
    }
    _onkeyup(e) {
        if (this._isDropdownArrowFocused && isSpace(e) && !this._isOverflowEmpty && !this._isPickerOpen) {
            this._openRespPopover();
        }
    }
    /**
     * Caches the space required to render the content
     * @private
     */
    _cacheWidths() {
        const map = this._breadcrumbItemWidths, items = this._getItems(), label = this._currentLocationLabel;
        for (let i = this._overflowSize; i < items.length; i++) {
            const item = items[i], link = this.shadowRoot.querySelector(`#${item._id}-link-wrapper`);
            map.set(item, this._getElementWidth(link));
        }
        if (items.length && this._endsWithCurrentLocation && label) {
            const item = items[items.length - 1];
            map.set(item, this._getElementWidth(label));
        }
        if (!this._isOverflowEmpty) {
            const arrow = this.shadowRoot.querySelector(".ui5-breadcrumbs-dropdown-arrow-link-wrapper");
            this._dropdownArrowLinkWidth = this._getElementWidth(arrow);
        }
    }
    _updateOverflow() {
        const items = this._getItems(), availableWidth = this.shadowRoot.querySelector(".ui5-breadcrumbs-root").offsetWidth;
        let requiredWidth = this._getTotalContentWidth(), overflowSize = 0;
        if (requiredWidth > availableWidth) {
            // need to show the component that opens the overflow
            requiredWidth += this._dropdownArrowLinkWidth;
        }
        while ((requiredWidth >= availableWidth) && (overflowSize < this._maxAllowedOverflowSize)) {
            const itemToOverflow = items[overflowSize];
            let itemWidth = 0;
            if (this._isItemVisible(itemToOverflow)) {
                itemWidth = this._breadcrumbItemWidths.get(itemToOverflow) || 0;
            }
            // move the item to the overflow
            requiredWidth -= itemWidth;
            overflowSize++;
        }
        this._overflowSize = overflowSize;
        // if overflow was emptied while picker was open => close redundant popup
        if (this._isOverflowEmpty && this._isPickerOpen) {
            this.responsivePopover.open = false;
        }
        // if the last focused link has done into the overflow =>
        // ensure the first visible link is focusable
        const focusableItems = this._getFocusableItems();
        if (!focusableItems.some(x => x.forcedTabIndex === "0")) {
            this._itemNavigation.setCurrentItem(focusableItems[0]);
        }
    }
    _getElementWidth(element) {
        if (element) {
            return Math.ceil(element.getBoundingClientRect().width);
        }
        return 0;
    }
    _getTotalContentWidth() {
        const items = this._getItems(), widthsMap = this._breadcrumbItemWidths, totalLinksWidth = items.reduce((sum, link) => sum + widthsMap.get(link), 0);
        return totalLinksWidth;
    }
    _onLinkPress(e) {
        const link = e.target, items = this._getItems(), item = items.find(x => `${x._id}-link` === link.id), { altKey, ctrlKey, metaKey, shiftKey, } = e.detail;
        if (!this.fireDecoratorEvent("item-click", {
            item,
            altKey,
            ctrlKey,
            metaKey,
            shiftKey,
        })) {
            e.preventDefault();
        }
    }
    _onLabelPress(e) {
        const items = this._getItems(), item = items[items.length - 1], { altKey, ctrlKey, metaKey, shiftKey, } = e;
        this.fireDecoratorEvent("item-click", {
            item,
            altKey,
            ctrlKey,
            metaKey,
            shiftKey,
        });
    }
    _onOverflowListItemSelect(e) {
        const listItem = e.detail.selectedItems[0], items = this._getItems(), item = items.find(x => `${x._id}-li` === listItem.id);
        if (this.fireDecoratorEvent("item-click", { item })) {
            locationOpen(item.href, item.target || "_self", "noopener,noreferrer");
            this.responsivePopover.open = false;
        }
    }
    _respPopover() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    _toggleRespPopover() {
        this.responsivePopover = this._respPopover();
        if (this._isPickerOpen) {
            this._closeRespPopover();
        }
        else {
            this._openRespPopover();
        }
    }
    _closeRespPopover() {
        if (this.responsivePopover) {
            this.responsivePopover.open = false;
        }
    }
    _openRespPopover() {
        this.responsivePopover = this._respPopover();
        this.responsivePopover.opener = this._dropdownArrowLink;
        this.responsivePopover.open = true;
    }
    _isItemVisible(item) {
        return !item.hidden && this._hasVisibleContent(item);
    }
    _hasVisibleContent(item) {
        // the check is not complete but may be extended in the future if needed to cover
        // cases besides the standard (UX-recommended) ones
        return item.innerText || Array.from(item.children).some(child => !child.hidden);
    }
    _preprocessItems() {
        this.items.forEach(item => {
            item._getRealDomRef = () => this.getDomRef().querySelector(`[data-ui5-stable*=${item.stableDomRef}]`);
        });
    }
    _getItemPositionText(position, size) {
        return Breadcrumbs_1.i18nBundle.getText(BREADCRUMB_ITEM_POS, position, size);
    }
    _getItemAccessibleName(item, position, size) {
        const positionText = this._getItemPositionText(position, size);
        const itemsText = item.textContent || "";
        // innerText is needed as it is no longer read out when label is set
        let text = "";
        if (item.accessibleName) {
            text = `${itemsText.trim()} ${item.accessibleName} ${positionText}`;
        }
        else {
            text = `${itemsText.trim()} ${positionText}`;
        }
        return text;
    }
    getCurrentLocationLabelWrapper() {
        return this.shadowRoot.querySelector(".ui5-breadcrumbs-current-location > span");
    }
    get _visibleItems() {
        return this._getItems()
            .slice(this._overflowSize)
            .filter(i => this._isItemVisible(i));
    }
    get _endsWithCurrentLinkItem() {
        const items = this._getItems();
        return (items.length && items[items.length - 1].href);
    }
    get _endsWithCurrentLocation() {
        return this.design === BreadcrumbsDesign.Standard;
    }
    get _currentLocationText() {
        const items = this._getItems();
        if (this._endsWithCurrentLocation && items.length) {
            const item = items[items.length - 1];
            if (this._isItemVisible(item)) {
                return item.innerText;
            }
        }
        return "";
    }
    get _currentLocationLabel() {
        return this.shadowRoot.querySelector(".ui5-breadcrumbs-current-location [ui5-label]");
    }
    get _isDropdownArrowFocused() {
        return this._dropdownArrowLink.forcedTabIndex === "0";
    }
    get _isCurrentLocationLabelFocused() {
        const label = this.getCurrentLocationLabelWrapper();
        return label && label.tabIndex === 0;
    }
    /**
     * Returns the maximum allowed count of items in the overflow
     * with respect to the UX requirement to never overflow the last visible item
     */
    get _maxAllowedOverflowSize() {
        const items = this._getItems().filter(item => this._isItemVisible(item));
        // all items except tha last visible one are allowed to overflow by UX requirement
        return items.length - 1;
    }
    /**
     * Getter for the interactive element that opens the overflow
     * @private
     */
    get _dropdownArrowLink() {
        return this.shadowRoot.querySelector(".ui5-breadcrumbs-dropdown-arrow-link-wrapper [ui5-link]");
    }
    /**
     * Getter for the list of abstract breadcrumb items to be rendered as list-items inside the overflow
     */
    get _overflowItemsData() {
        return this._getItems()
            .slice(0, this._overflowSize)
            .filter(item => this._isItemVisible(item))
            .reverse();
    }
    /**
     * Returns all items that should be displayed in the popover on mobile devices
     * @private
     */
    get _mobilePopoverItems() {
        return this._getItems()
            .filter(item => this._isItemVisible(item))
            .reverse();
    }
    /**
     * Getter for the list of abstract breadcrumb items to be rendered as links outside the overflow
     */
    get _linksData() {
        const items = this._visibleItems;
        const itemsCount = items.length; // get size before removing of current location
        if (this._endsWithCurrentLocation && !this._endsWithCurrentLinkItem) {
            items.pop();
        }
        return items
            .map((item, index) => {
            item._accessibleNameText = this._getItemAccessibleName(item, index + 1, itemsCount);
            item._isCurrentPageItem = index === (itemsCount - 1) && this._endsWithCurrentLocation;
            item._needsSeparator = !item._isCurrentPageItem;
            return item;
        });
    }
    /**
     * Getter for accessible name of the current location. Includes the position of the current location and the size of the breadcrumbs
     */
    get _currentLocationAccName() {
        const items = this._visibleItems;
        const positionText = this._getItemPositionText(items.length, items.length);
        const lastItem = items[items.length - 1];
        if (!lastItem) {
            return positionText;
        }
        const lastItemText = lastItem.textContent || "";
        if (lastItem.accessibleName) {
            return `${lastItemText.trim()} ${lastItem.accessibleName} ${positionText}`;
        }
        return `${lastItemText.trim()} ${positionText}`;
    }
    /**
     * Getter for the list of links corresponding to the abstract breadcrumb items
     */
    get _links() {
        return Array.from(this.shadowRoot.querySelectorAll(".ui5-breadcrumbs-link-wrapper [ui5-link]"));
    }
    get _isOverflowEmpty() {
        return this._overflowItemsData.length === 0;
    }
    get linkAccessibilityAttributes() {
        return {
            hasPopup: this._isOverflowEmpty ? undefined : "listbox",
        };
    }
    get _isPickerOpen() {
        return !!this.responsivePopover && this.responsivePopover.open;
    }
    get _accessibleNameText() {
        return Breadcrumbs_1.i18nBundle.getText(BREADCRUMBS_ARIA_LABEL);
    }
    get _dropdownArrowAccessibleNameText() {
        return Breadcrumbs_1.i18nBundle.getText(BREADCRUMBS_OVERFLOW_ARIA_LABEL);
    }
    get _cancelButtonText() {
        return Breadcrumbs_1.i18nBundle.getText(BREADCRUMBS_CANCEL_BUTTON);
    }
    get hasOverflow() {
        return true;
    }
};
__decorate([
    property()
], Breadcrumbs.prototype, "design", void 0);
__decorate([
    property()
], Breadcrumbs.prototype, "separators", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], Breadcrumbs.prototype, "_overflowSize", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], Breadcrumbs.prototype, "items", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Breadcrumbs, "i18nBundle", void 0);
Breadcrumbs = Breadcrumbs_1 = __decorate([
    customElement({
        tag: "ui5-breadcrumbs",
        languageAware: true,
        renderer: jsxRenderer,
        template: BreadcrumbsTemplate,
        styles: [breadcrumbsCss, breadcrumbsPopoverCss],
    })
    /**
     * Fires when a `BreadcrumbsItem` is clicked.
     *
     * **Note:** You can prevent browser location change by calling `event.preventDefault()`.
     * @param {HTMLElement} item The clicked item.
     * @param {Boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
     * @param {Boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
     * @param {Boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
     * @param {Boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
     * @public
     */
    ,
    event("item-click", {
        bubbles: true,
        cancelable: true,
    })
], Breadcrumbs);
Breadcrumbs.define();
export default Breadcrumbs;
//# sourceMappingURL=Breadcrumbs.js.map