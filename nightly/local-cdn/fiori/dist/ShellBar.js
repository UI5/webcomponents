var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ShellBar_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScopeUtils.js";
import arraysAreEqual from "@ui5/webcomponents-base/dist/util/arraysAreEqual.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import throttle from "@ui5/webcomponents-base/dist/util/throttle.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import bellIcon from "@ui5/webcomponents-icons/dist/bell.js";
import gridIcon from "@ui5/webcomponents-icons/dist/grid.js";
import daIcon from "@ui5/webcomponents-icons/dist/da.js";
import overflowIcon from "@ui5/webcomponents-icons/dist/overflow.js";
import ShellBarTemplate from "./ShellBarTemplate.js";
import shellBarStyles from "./generated/themes/ShellBar.css.js";
import ShellBarPopoverCss from "./generated/themes/ShellBarPopover.css.js";
import shellBarLegacyStyles from "./generated/themes/ShellBarLegacy.css.js";
import ShellBarLegacy from "./shellbar/ShellBarLegacy.js";
import ShellBarSearch from "./shellbar/ShellBarSearch.js";
import ShellBarSearchLegacy from "./shellbar/ShellBarSearchLegacy.js";
import ShellBarOverflow from "./shellbar/ShellBarOverflow.js";
import ShellBarAccessibility from "./shellbar/ShellBarAccessibility.js";
import ShellBarItemNavigation from "./shellbar/ShellBarItemNavigation.js";
import ShellBarItem from "./ShellBarItem.js";
import ShellBarSpacer from "./ShellBarSpacer.js";
import { SHELLBAR_LABEL, SHELLBAR_NOTIFICATIONS, SHELLBAR_NOTIFICATIONS_NO_COUNT, SHELLBAR_PROFILE, SHELLBAR_PRODUCTS, SHELLBAR_SEARCH, SHELLBAR_ASSISTANT, SHELLBAR_OVERFLOW, SHELLBAR_ADDITIONAL_CONTEXT, } from "./generated/i18n/i18n-defaults.js";
// actions always visible in lean mode, order is important
const PREDEFINED_PLACE_ITEMS = ["feedback", "sys-help"];
const ShellBarActions = {
    Search: "search",
    Profile: "profile",
    Overflow: "overflow",
    Assistant: "assistant",
    ProductSwitch: "products",
    Notifications: "notifications",
};
const ShellBarActionsSelectors = {
    Search: ".ui5-shellbar-search-toggle",
    Profile: ".ui5-shellbar-image-button",
    Overflow: ".ui5-shellbar-overflow-button",
    Assistant: ".ui5-shellbar-assistant-button",
    ProductSwitch: ".ui5-shellbar-button-product-switch",
    Notifications: ".ui5-shellbar-bell-button",
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
let ShellBar = ShellBar_1 = class ShellBar extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines, if the notification icon would be displayed.
         * @default false
         * @public
         */
        this.showNotifications = false;
        /**
         * Defines, if the product switch icon would be displayed.
         * @default false
         * @public
         */
        this.showProductSwitch = false;
        /**
         * Defines, if the Search Field would be displayed when there is a valid `searchField` slot.
         *
         * **Note:** By default the Search Field is not displayed.
         * @default false
         * @public
         */
        this.showSearchField = false;
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
        this.accessibilityAttributes = {};
        /**
         * @private
         */
        this.breakpointSize = "S";
        /**
         * Actions computed from controllers.
         * @private
         */
        this.actions = [];
        /**
         * Show overflow button when items are hidden.
         * @private
         */
        this.showOverflowButton = false;
        /**
         * Open state of the overflow popover.
         * @private
         */
        this.overflowPopoverOpen = false;
        /**
         * IDs of items currently hidden due to overflow.
         * Used to trigger rerender for conditional rendering.
         * @private
         */
        this.hiddenItemsIds = [];
        /**
         * Show full-screen search overlay.
         * @private
         */
        this.showFullWidthSearch = false;
        this.RESIZE_THROTTLE_RATE = 100; // ms
        this.handleResizeBound = throttle(this.handleResize.bind(this), this.RESIZE_THROTTLE_RATE);
        this.breakpoints = [599, 1023, 1439, 1919, 10000];
        this.breakpointMap = {
            599: "S",
            1023: "M",
            1439: "L",
            1919: "XL",
            10000: "XXL",
        };
        this.itemNavigation = new ShellBarItemNavigation({
            getDomRef: () => this.getDomRef() || null,
        });
        this.overflow = new ShellBarOverflow();
        this.accessibility = new ShellBarAccessibility();
        this._searchAdaptor = new ShellBarSearch(this.getSearchDeps());
        this._searchAdaptorLegacy = new ShellBarSearchLegacy({
            ...this.getSearchDeps(),
            getDisableSearchCollapse: () => this.disableSearchCollapse,
        });
        /* =================== Legacy Members =================== */
        /**
         * Defines the visibility state of the search button.
         *
         * **Note:** The `hideSearchButton` property is in an experimental state and is a subject to change.
         * @default false
         * @public
         */
        this.hideSearchButton = false;
        /**
         * Disables the automatic search field expansion/collapse when the available space is not enough.
         *
         * **Note:** The `disableSearchCollapse` property is in an experimental state and is a subject to change.
         * @default false
         * @public
         */
        this.disableSearchCollapse = false;
        /**
         * Open state of the menu popover (legacy).
         * @private
         */
        this.menuPopoverOpen = false;
    }
    /* =================== Lifecycle Methods =================== */
    onEnterDOM() {
        ResizeHandler.register(this, this.handleResizeBound);
        this.searchAdaptor?.subscribe();
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this.handleResizeBound);
        this.searchAdaptor?.unsubscribe();
    }
    onBeforeRendering() {
        if (!this.legacyAdaptor) {
            this.initLegacyController();
        }
        // Sync branding breakpoint state
        this.branding.forEach(brandingEl => {
            brandingEl._isSBreakPoint = this.isSBreakPoint;
        });
        this.buildActions();
        this.searchAdaptor?.syncShowSearchFieldState();
        // subscribe to search adaptor for cases when search is added dynamically
        this.searchAdaptor?.unsubscribe();
        this.searchAdaptor?.subscribe();
    }
    onAfterRendering() {
        this.updateBreakpoint();
        this.updateOverflow();
    }
    /* =================== Actions Management =================== */
    buildActions() {
        this.actions = [
            {
                id: ShellBarActions.Search,
                icon: searchIcon,
                enabled: this.enabledFeatures.search,
                selector: ShellBarActionsSelectors.Search,
                isProtected: false,
                stableDomRef: "toggle-search",
            },
            {
                id: ShellBarActions.Assistant,
                icon: daIcon,
                enabled: this.enabledFeatures.assistant,
                selector: ShellBarActionsSelectors.Assistant,
                isProtected: false,
            },
            {
                id: ShellBarActions.Notifications,
                icon: bellIcon,
                count: this.notificationsCount,
                enabled: this.enabledFeatures.notifications,
                selector: ShellBarActionsSelectors.Notifications,
                isProtected: false,
                stableDomRef: "notifications",
            },
            {
                id: ShellBarActions.Overflow,
                icon: overflowIcon,
                enabled: this.enabledFeatures.overflow,
                selector: ShellBarActionsSelectors.Overflow,
                isProtected: true,
                stableDomRef: "overflow",
            },
            {
                id: ShellBarActions.Profile,
                enabled: this.enabledFeatures.profile,
                selector: ShellBarActionsSelectors.Profile,
                isProtected: true,
                stableDomRef: "profile",
            },
            {
                id: ShellBarActions.ProductSwitch,
                icon: gridIcon,
                enabled: this.enabledFeatures.productSwitch,
                selector: ShellBarActionsSelectors.ProductSwitch,
                isProtected: true,
                stableDomRef: "product-switch",
            },
        ].filter(action => action.enabled);
    }
    getAction(actionId) {
        return this.actions.find(action => action.id === actionId);
    }
    getActionOverflowText(actionId) {
        const texts = {
            [ShellBarActions.Search]: this.texts.search,
            [ShellBarActions.Profile]: this.texts.profile,
            [ShellBarActions.Overflow]: this.texts.overflow,
            [ShellBarActions.Assistant]: this.texts.assistant,
            [ShellBarActions.ProductSwitch]: this.texts.products,
            [ShellBarActions.Notifications]: this.texts.notificationsNoCount,
        };
        return texts[actionId] || actionId;
    }
    /* =================== Breakpoint Management =================== */
    get isSBreakPoint() {
        return this.breakpointSize === "S";
    }
    updateBreakpoint() {
        const width = this.getBoundingClientRect().width;
        const bp = this.breakpoints.find(b => width <= b) || 10000;
        const breakpoint = this.breakpointMap[bp];
        if (this.breakpointSize !== breakpoint) {
            this.breakpointSize = breakpoint;
        }
    }
    /* =================== Overflow Management =================== */
    updateOverflow() {
        if (!this.overflow) {
            return;
        }
        const result = this.overflow.updateOverflow({
            actions: this.actions,
            content: this.sortContent(this.content),
            customItems: this.sortItems(this.items),
            hiddenItemsIds: this.hiddenItemsIds,
            showSearchField: this.enabledFeatures.search && this.showSearchField,
            overflowOuter: this.overflowOuter,
            overflowInner: this.overflowInner,
            setVisible: (selector, visible) => {
                const element = this.shadowRoot.querySelector(selector);
                if (element) {
                    element.classList[visible ? "remove" : "add"]("ui5-shellbar-hidden");
                }
            },
        });
        this.handleUpdateOverflowResult(result);
        return result.hiddenItemsIds;
    }
    handleUpdateOverflowResult(result) {
        const { hiddenItemsIds, showOverflowButton } = result;
        // Update items overflow state
        this.items.forEach(item => {
            item.inOverflow = hiddenItemsIds.includes(item._id);
            if (item.inOverflow) {
                // clear the hidden class to ensure the item is visible in the overflow popover
                item.classList.remove("ui5-shellbar-hidden");
            }
        });
        if (!arraysAreEqual(this.hiddenItemsIds, hiddenItemsIds)) {
            this.handleContentVisibilityChanged(this.hiddenItemsIds, hiddenItemsIds);
            this.hiddenItemsIds = hiddenItemsIds;
            this.showOverflowButton = showOverflowButton;
        }
        this.showFullWidthSearch = this.searchAdaptor?.shouldShowFullScreen() || false;
    }
    handleContentVisibilityChanged(oldHiddenItemsIds, newHiddenItemsIds) {
        const filterContentIds = (ids) => ids.filter(id => this.content.some(item => item._individualSlot === id));
        const oldHiddenContentIds = filterContentIds(oldHiddenItemsIds);
        const newHiddenContentIds = filterContentIds(newHiddenItemsIds);
        if (!arraysAreEqual(oldHiddenContentIds, newHiddenContentIds)) {
            this.fireDecoratorEvent("content-item-visibility-change", {
                items: newHiddenContentIds.map(id => this.content.find(item => item._individualSlot === id)),
            });
        }
    }
    handleResize() {
        this.overflowPopoverOpen = false;
        this.updateBreakpoint();
        const hiddenItemsIds = this.updateOverflow() ?? [];
        const spacerWidth = this.spacer?.getBoundingClientRect().width || 0;
        this.searchAdaptor?.autoManageSearchState(hiddenItemsIds.length, spacerWidth);
    }
    isHidden(itemId) {
        return this.hiddenItemsIds.includes(itemId);
    }
    handleOverflowClick() {
        this.overflowPopoverOpen = !this.overflowPopoverOpen;
    }
    onPopoverClose() {
        this.overflowPopoverOpen = false;
    }
    /**
     * Closes the overflow popover.
     * @public
     */
    closeOverflow() {
        this.overflowPopoverOpen = false;
    }
    handleOverflowItemClick(e) {
        const target = e.target;
        const actionId = target.getAttribute("data-action-id");
        let prevented = e.defaultPrevented; // for custom actions
        if (actionId === ShellBarActions.Notifications) {
            prevented = this.handleNotificationsClick();
        }
        else if (actionId === ShellBarActions.Search) {
            prevented = this.handleSearchButtonClick();
        }
        if (!prevented) {
            this.overflowPopoverOpen = false;
        }
    }
    get overflowItems() {
        return this.overflow.getOverflowItems({
            actions: this.actions,
            customItems: this.sortItems(this.items),
            hiddenItemsIds: this.hiddenItemsIds,
        });
    }
    /**
     * Returns badge text for overflow button.
     * Shows count if only one item with count is overflowed, otherwise shows attention dot.
     */
    get overflowBadge() {
        const itemsWithCount = this.overflowItems.filter(item => item.data.count);
        if (itemsWithCount.length === 1) {
            return itemsWithCount[0].data.count;
        }
        if (itemsWithCount.length > 1) {
            return " "; // Attention dot
        }
        return undefined;
    }
    /* =================== Search Management =================== */
    get search() {
        return this.searchField.length ? this.searchField[0] : null;
    }
    get isSelfCollapsibleSearch() {
        const searchField = this.search;
        if (searchField) {
            return "collapsed" in searchField && "open" in searchField;
        }
        return false;
    }
    getSearchDeps() {
        return {
            getSearchField: () => this.search,
            getSearchState: () => this.enabledFeatures.search && this.showSearchField,
            getCSSVariable: (cssVar) => this.getCSSVariable(cssVar),
            setSearchState: (expanded) => this.setSearchState(expanded),
            getOverflowed: () => this.overflow.isOverflowing(this.overflowOuter, this.overflowInner),
        };
    }
    get searchAdaptor() {
        if (this.isSelfCollapsibleSearch) {
            return this._searchAdaptor;
        }
        return this._searchAdaptorLegacy;
    }
    handleSearchButtonClick() {
        const searchButton = this.shadowRoot.querySelector(".ui5-shellbar-search-button");
        const defaultPrevented = !this.fireDecoratorEvent("search-button-click", {
            targetRef: searchButton,
            searchFieldVisible: this.showSearchField,
        });
        if (defaultPrevented) {
            return defaultPrevented;
        }
        this.setSearchState(!this.showSearchField);
        if (!this.showSearchField) {
            return defaultPrevented;
        }
        const input = this.searchField[0];
        if (input) {
            input.focused = true;
            setTimeout(() => {
                input.focus();
            }, 100);
        }
        return defaultPrevented;
    }
    async setSearchState(expanded) {
        if (expanded === this.showSearchField) {
            return;
        }
        this.showSearchField = expanded;
        await renderFinished();
        this.fireDecoratorEvent("search-field-toggle", { expanded });
    }
    handleCancelButtonClick() {
        const cancelBtn = this.shadowRoot.querySelector(".ui5-shellbar-cancel-button");
        if (!cancelBtn) {
            return;
        }
        const clearDefaultPrevented = !this.fireDecoratorEvent("search-field-clear", {
            targetRef: cancelBtn,
        });
        this.showFullWidthSearch = false;
        this.setSearchState(false);
        if (!clearDefaultPrevented && this.search) {
            this.search.value = "";
        }
    }
    /* =================== Legacy Features Management =================== */
    initLegacyController() {
        if (this.hasLegacyFeatures) {
            this.legacyAdaptor = new ShellBarLegacy({
                component: this,
                getShadowRoot: () => this.shadowRoot,
            });
        }
    }
    get hasLegacyFeatures() {
        return this.logo.length > 0
            || !!this.primaryTitle
            || !!this.secondaryTitle
            || this.menuItems.length > 0;
    }
    /* =================== Keyboard Navigation =================== */
    _onKeyDown(e) {
        this.itemNavigation.handleKeyDown(e);
    }
    /* =================== Content Management =================== */
    get startContent() {
        return this.splitContent(this.content).start;
    }
    get endContent() {
        return this.splitContent(this.content).end;
    }
    get separatorConfig() {
        if (this.isSBreakPoint) {
            return {
                showStartSeparator: false,
                showEndSeparator: false,
            };
        }
        const { start, end } = this.splitContent(this.content);
        return {
            showStartSeparator: start.some(item => !this.hiddenItemsIds.includes(item._individualSlot)),
            showEndSeparator: end.some(item => !this.hiddenItemsIds.includes(item._individualSlot)),
        };
    }
    splitContent(content) {
        const spacerIndex = content.findIndex(child => child.hasAttribute("ui5-shellbar-spacer"));
        if (spacerIndex === -1) {
            return { start: [...content], end: [] };
        }
        return {
            start: content.slice(0, spacerIndex),
            end: content.slice(spacerIndex + 1),
        };
    }
    sortContent(content) {
        // reverse so items on the right are hidden first
        // then sort by hide order to apply custom preferences
        return content.toReversed().toSorted((a, b) => {
            const aOrder = parseInt(a.getAttribute("data-hide-order") || "0");
            const bOrder = parseInt(b.getAttribute("data-hide-order") || "0");
            return aOrder - bOrder;
        });
    }
    /*
     * Determines whether a separator should be packed with an item.
     * Separators are packed with the last item that is hidden to account for
     * the space they occupy when next overflow calculation occurs.
     */
    getPackedSeparatorInfo(item, isStartGroup) {
        const group = isStartGroup ? this.startContent : this.endContent;
        const sorted = this.sortContent(group);
        const isHidden = this.hiddenItemsIds.includes(item._individualSlot);
        const isLastItem = sorted.at(-1) === item;
        return { shouldPack: isHidden && isLastItem };
    }
    /* =================== Items Management =================== */
    sortItems(items) {
        return items.toSorted((a, b) => {
            const aIndex = PREDEFINED_PLACE_ITEMS.indexOf(a.icon || "");
            const bIndex = PREDEFINED_PLACE_ITEMS.indexOf(b.icon || "");
            return aIndex - bIndex;
        });
    }
    /* =================== Accessibility =================== */
    get actionsAccessibilityInfo() {
        return this.accessibility.getActionsAccessibilityAttributes(this.texts, {
            overflowPopoverOpen: this.overflowPopoverOpen,
            accessibilityAttributes: this.accessibilityAttributes,
        });
    }
    get actionsRole() {
        const visibleCount = this.actions.filter(a => !this.hiddenItemsIds.includes(a.id)).length;
        return this.accessibility.getActionsRole(visibleCount);
    }
    get contentRole() {
        const visibleItemsCount = this.content.filter(item => !this.hiddenItemsIds.includes(item._individualSlot)).length;
        return this.accessibility.getContentRole(visibleItemsCount);
    }
    /* =================== Common Members =================== */
    get enabledFeatures() {
        return {
            search: this.searchField.length > 0,
            profile: this.profile.length > 0,
            content: this.content.length > 0,
            branding: this.branding.length > 0,
            overflow: this.showOverflowButton,
            assistant: this.assistant.length > 0,
            startButton: this.startButton.length > 0,
            notifications: this.showNotifications,
            productSwitch: this.showProductSwitch,
        };
    }
    get texts() {
        return {
            search: ShellBar_1.i18nBundle.getText(SHELLBAR_SEARCH),
            profile: ShellBar_1.i18nBundle.getText(SHELLBAR_PROFILE),
            shellbar: ShellBar_1.i18nBundle.getText(SHELLBAR_LABEL),
            products: ShellBar_1.i18nBundle.getText(SHELLBAR_PRODUCTS),
            overflow: ShellBar_1.i18nBundle.getText(SHELLBAR_OVERFLOW),
            assistant: ShellBar_1.i18nBundle.getText(SHELLBAR_ASSISTANT),
            notifications: ShellBar_1.i18nBundle.getText(SHELLBAR_NOTIFICATIONS, this.notificationsCount || 0),
            notificationsNoCount: ShellBar_1.i18nBundle.getText(SHELLBAR_NOTIFICATIONS_NO_COUNT),
            contentItems: this.content.length > 1 ? ShellBar_1.i18nBundle.getText(SHELLBAR_ADDITIONAL_CONTEXT) : undefined,
        };
    }
    get popoverHorizontalAlign() {
        return this.effectiveDir === "rtl" ? "Start" : "End";
    }
    /**
     * Returns the `logo` DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get logoDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="logo"]`);
    }
    /**
     * Returns the `notifications` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get notificationsDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="notifications"]`);
    }
    /**
     * Returns the `overflow` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get overflowDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="overflow"]`);
    }
    /**
     * Returns the `profile` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get profileDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="profile"]`);
    }
    /**
     * Returns the `product-switch` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get productSwitchDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="product-switch"]`);
    }
    /**
     * Returns the search button DOM reference.
     * @public
     */
    async getSearchButtonDomRef() {
        await renderFinished();
        return this.shadowRoot.querySelector(`*[data-ui5-stable="toggle-search"]`);
    }
    _fireClickEvent(eventName, domRef) {
        return domRef ? !this.fireDecoratorEvent(eventName, { targetRef: domRef }) : false;
    }
    handleNotificationsClick() {
        return this._fireClickEvent("notifications-click", this.notificationsDomRef);
    }
    handleProfileClick() {
        return this._fireClickEvent("profile-click", this.profileDomRef);
    }
    handleProductSwitchClick() {
        return this._fireClickEvent("product-switch-click", this.productSwitchDomRef);
    }
    getCSSVariable(cssVar) {
        const styleSet = getComputedStyle(this.getDomRef());
        return styleSet.getPropertyValue(getScopedVarName(cssVar));
    }
};
__decorate([
    slot()
], ShellBar.prototype, "startButton", void 0);
__decorate([
    slot()
], ShellBar.prototype, "branding", void 0);
__decorate([
    slot({ type: HTMLElement, individualSlots: true })
], ShellBar.prototype, "content", void 0);
__decorate([
    slot({ type: HTMLElement })
], ShellBar.prototype, "searchField", void 0);
__decorate([
    slot()
], ShellBar.prototype, "assistant", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true, individualSlots: true })
], ShellBar.prototype, "items", void 0);
__decorate([
    slot()
], ShellBar.prototype, "profile", void 0);
__decorate([
    property()
], ShellBar.prototype, "notificationsCount", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "showNotifications", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "showProductSwitch", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "showSearchField", void 0);
__decorate([
    property({ type: Object })
], ShellBar.prototype, "accessibilityAttributes", void 0);
__decorate([
    property()
], ShellBar.prototype, "breakpointSize", void 0);
__decorate([
    property({ type: Object })
], ShellBar.prototype, "actions", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "showOverflowButton", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "overflowPopoverOpen", void 0);
__decorate([
    property({ type: Object })
], ShellBar.prototype, "hiddenItemsIds", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "showFullWidthSearch", void 0);
__decorate([
    query(".ui5-shellbar-spacer")
], ShellBar.prototype, "spacer", void 0);
__decorate([
    query(".ui5-shellbar-overflow-container")
], ShellBar.prototype, "overflowOuter", void 0);
__decorate([
    query(".ui5-shellbar-overflow-container-inner")
], ShellBar.prototype, "overflowInner", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "hideSearchButton", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "disableSearchCollapse", void 0);
__decorate([
    property()
], ShellBar.prototype, "primaryTitle", void 0);
__decorate([
    property()
], ShellBar.prototype, "secondaryTitle", void 0);
__decorate([
    slot()
], ShellBar.prototype, "logo", void 0);
__decorate([
    slot()
], ShellBar.prototype, "menuItems", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "menuPopoverOpen", void 0);
__decorate([
    slot()
], ShellBar.prototype, "midContent", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], ShellBar, "i18nBundle", void 0);
ShellBar = ShellBar_1 = __decorate([
    customElement({
        tag: "ui5-shellbar",
        styles: [shellBarStyles, shellBarLegacyStyles, ShellBarPopoverCss],
        renderer: jsxRenderer,
        template: ShellBarTemplate,
        fastNavigation: true,
        languageAware: true,
        dependencies: [
            Icon,
            List,
            Button,
            ButtonBadge,
            Popover,
            ShellBarSpacer,
            ShellBarItem,
            ListItemStandard,
            // legacy dependencies
            Menu,
        ],
    })
    /**
     *
     * Fired, when the notification icon is activated.
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @public
     */
    ,
    event("notifications-click", {
        cancelable: true,
        bubbles: true,
    })
    /**
     * Fired, when the profile slot is present.
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @public
     */
    ,
    event("profile-click", {
        bubbles: true,
    })
    /**
     * Fired, when the product switch icon is activated.
     *
     * **Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @public
     */
    ,
    event("product-switch-click", {
        cancelable: true,
        bubbles: true,
    })
    /**
     * Fired, when the logo is activated.
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @since 0.10
     * @public
     */
    ,
    event("logo-click", {
        bubbles: true,
    })
    /**
     * Fired, when a menu item is activated
     *
     * **Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.
     * @param {HTMLElement} item DOM ref of the activated list item
     * @since 0.10
     * @public
     */
    ,
    event("menu-item-click", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired, when the search button is activated.
     *
     * **Note:** You can prevent expanding/collapsing of the search field by calling `event.preventDefault()`.
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @param {Boolean} searchFieldVisible whether the search field is visible
     * @public
     */
    ,
    event("search-button-click", {
        cancelable: true,
        bubbles: true,
    })
    /**
     * Fired, when the search field is expanded or collapsed.
     * @since 2.10.0
     * @param {Boolean} expanded whether the search field is expanded
     * @public
     */
    ,
    event("search-field-toggle", {
        bubbles: true,
    })
    /**
     * Fired, when the search cancel button is activated.
     *
     * **Note:** You can prevent the default behavior (clearing the search field value) by calling `event.preventDefault()`. The search will still be closed.
     * **Note:** The `search-field-clear` event is in an experimental state and is a subject to change.
     * @param {HTMLElement} targetRef dom ref of the cancel button element
     * @since 2.14.0
     * @public
     */
    ,
    event("search-field-clear", {
        cancelable: true,
        bubbles: true,
    })
    /**
     * Fired, when an item from the content slot is hidden or shown.
     * **Note:** The `content-item-visibility-change` event is in an experimental state and is a subject to change.
     *
     * @param {Array<HTMLElement>} array of all the items that are hidden
     * @public
     * @since 2.7.0
     */
    ,
    event("content-item-visibility-change", {
        bubbles: true,
    })
], ShellBar);
ShellBar.define();
export default ShellBar;
export { ShellBarActions, ShellBarActionsSelectors, };
//# sourceMappingURL=ShellBar.js.map