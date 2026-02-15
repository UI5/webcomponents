var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MenuItem_1;
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isLeft, isRight, isEnter, isSpace, isEnterShift, isSpaceShift, isShift, isTabNext, isTabPrevious, isDown, isUp, } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import MenuItemGroupCheckMode from "./types/MenuItemGroupCheckMode.js";
import ListItem from "./ListItem.js";
import { isInstanceOfMenuSeparator } from "./MenuSeparator.js";
import { isInstanceOfMenuItemGroup } from "./MenuItemGroup.js";
import MenuItemTemplate from "./MenuItemTemplate.js";
import { MENU_BACK_BUTTON_ARIA_LABEL, MENU_CANCEL_BUTTON_TEXT, MENU_POPOVER_ACCESSIBLE_NAME, } from "./generated/i18n/i18n-defaults.js";
// Styles
import menuItemCss from "./generated/themes/MenuItem.css.js";
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
let MenuItem = MenuItem_1 = class MenuItem extends ListItem {
    constructor() {
        super();
        /**
         * Defines whether menu item is in disabled state.
         *
         * **Note:** A disabled menu item is noninteractive.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding menu popover.
         *
         * **Note:** If set to `true` a busy indicator component will be displayed into the related one to the current menu item sub-menu popover.
         * @default false
         * @public
         * @since 1.13.0
         */
        this.loading = false;
        /**
         * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding menu popover.
         * @default 1000
         * @public
         * @since 1.13.0
         */
        this.loadingDelay = 1000;
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
        this.checked = false;
        /**
         * Indicates whether any of the element siblings have icon.
         */
        this._siblingsWithIcon = false;
        /**
         * Defines the component's check mode.
         * @default "None"
         * @private
         */
        this._checkMode = "None";
        this._shiftPressed = false;
        this._openedByMouse = false;
        this._itemNavigation = new ItemNavigation(this, {
            navigationMode: NavigationMode.Horizontal,
            behavior: ItemNavigationBehavior.Static,
            getItemsCallback: () => this._navigableItems,
        });
    }
    get _list() {
        return this.shadowRoot && this.shadowRoot.querySelector("[ui5-list]");
    }
    get _navigableItems() {
        return [...this.endContent].filter(item => {
            return item.hasAttribute("ui5-button")
                || item.hasAttribute("ui5-link")
                || (item.hasAttribute("ui5-icon") && item.getAttribute("mode") === "Interactive");
        });
    }
    get _isCheckable() {
        return this._checkMode !== MenuItemGroupCheckMode.None;
    }
    _navigateToEndContent(shouldNavigateToPreviousItem) {
        const navigatableItems = this._navigableItems;
        const item = shouldNavigateToPreviousItem
            ? navigatableItems[navigatableItems.length - 1]
            : navigatableItems[0];
        if (item) {
            this._itemNavigation.setCurrentItem(item);
            this._itemNavigation._focusCurrentItem();
        }
    }
    get isRtl() {
        return this.effectiveDir === "rtl";
    }
    get hasSubmenu() {
        return !!(this.items.length || this.loading) && !this.disabled;
    }
    get hasEndContent() {
        return !!(this.endContent.length);
    }
    get hasIcon() {
        return !!this.icon;
    }
    get isSubMenuOpen() {
        return this._popover?.open;
    }
    get menuHeaderTextPhone() {
        return this.text;
    }
    get isPhone() {
        return isPhone();
    }
    get labelBack() {
        return MenuItem_1.i18nBundle.getText(MENU_BACK_BUTTON_ARIA_LABEL);
    }
    get labelCancel() {
        return MenuItem_1.i18nBundle.getText(MENU_CANCEL_BUTTON_TEXT);
    }
    get accessibleNameText() {
        return MenuItem_1.i18nBundle.getText(MENU_POPOVER_ACCESSIBLE_NAME);
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        const siblingsWithIcon = this._allMenuItems.some(menuItem => !!menuItem.icon);
        this._setupItemNavigation();
        this._allMenuItems.forEach(item => {
            item._siblingsWithIcon = siblingsWithIcon;
        });
    }
    async focus(focusOptions) {
        await renderFinished();
        if (this.hasSubmenu && this.isSubMenuOpen) {
            const menuItems = this._allMenuItems;
            return menuItems[0] && menuItems[0].focus(focusOptions);
        }
        return super.focus(focusOptions);
    }
    get _focusable() {
        return true;
    }
    get _role() {
        switch (this._checkMode) {
            case MenuItemGroupCheckMode.Single:
                return "menuitemradio";
            case MenuItemGroupCheckMode.Multiple:
                return "menuitemcheckbox";
            default:
                return "menuitem";
        }
    }
    get _accInfo() {
        const accInfoSettings = {
            role: this.accessibilityAttributes.role || this._role,
            ariaHaspopup: this.hasSubmenu ? "menu" : undefined,
            ariaKeyShortcuts: this.accessibilityAttributes.ariaKeyShortcuts,
            ariaExpanded: this.hasSubmenu ? this.isSubMenuOpen : undefined,
            ariaHidden: !!this.additionalText && !!this.accessibilityAttributes.ariaKeyShortcuts ? true : undefined,
            ariaChecked: this._markChecked ? true : undefined,
        };
        return { ...super._accInfo, ...accInfoSettings };
    }
    get _popover() {
        return this.shadowRoot && this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    get _markChecked() {
        return !this.hasSubmenu && this.checked && this._checkMode !== MenuItemGroupCheckMode.None;
    }
    /** Returns menu item groups */
    get _menuItemGroups() {
        return this.items.filter(isInstanceOfMenuItemGroup);
    }
    /** Returns menu items */
    get _menuItems() {
        return this.items.filter(isInstanceOfMenuItem);
    }
    /** Returns all menu items (including those in groups */
    get _allMenuItems() {
        const items = [];
        const slottedItems = this.getSlottedNodes("items");
        slottedItems.forEach(item => {
            if (isInstanceOfMenuItemGroup(item)) {
                items.push(...item._menuItems);
            }
            else if (!isInstanceOfMenuSeparator(item)) {
                items.push(item);
            }
        });
        return items;
    }
    /** Returns menu items included in the ItemNavigation */
    get _navigatableMenuItems() {
        const items = [];
        const slottedItems = this.getSlottedNodes("items");
        slottedItems.forEach(item => {
            if (isInstanceOfMenuItemGroup(item)) {
                const groupItems = item.getSlottedNodes("items");
                items.push(...groupItems);
            }
            else if (!isInstanceOfMenuSeparator(item)) {
                items.push(item);
            }
        });
        return items;
    }
    _setupItemNavigation() {
        if (this._list) {
            this._list._itemNavigation._getItems = () => this._navigatableMenuItems;
        }
    }
    _closeOtherSubMenus(item) {
        const menuItems = this._allMenuItems;
        if (!menuItems.includes(item)) {
            return;
        }
        menuItems.forEach(menuItem => {
            if (menuItem !== item) {
                menuItem._close();
            }
        });
    }
    _itemMouseOver(e) {
        if (!isDesktop()) {
            return;
        }
        const item = e.target;
        if (!isInstanceOfMenuItem(item)) {
            return;
        }
        item.getFocusDomRef()?.focus();
        this._closeOtherSubMenus(item);
    }
    _isSpace(e) {
        this._shiftPressed = this._isCheckable && isSpaceShift(e);
        return isSpace(e) || isSpaceShift(e);
    }
    _isEnter(e) {
        this._shiftPressed = this._isCheckable && isEnterShift(e);
        return isEnter(e) || isEnterShift(e);
    }
    _onclick(e) {
        this._shiftPressed = this._isCheckable && e.shiftKey;
        super._onclick(e);
    }
    _itemKeyDown(e) {
        const item = e.target;
        const itemInMenuItems = this._allMenuItems.includes(item);
        const isTabNextPrevious = isTabNext(e) || isTabPrevious(e);
        const shouldCloseMenu = this.isRtl ? isRight(e) : isLeft(e);
        if (itemInMenuItems && (isTabNextPrevious || shouldCloseMenu)) {
            this._close();
            this.focus();
            e.stopPropagation();
        }
    }
    _itemKeyUp(e) {
        if (isShift(e)) {
            this._shiftPressed = false;
        }
    }
    _endContentKeyDown(e) {
        const shouldNavigateOutOfEndContent = isUp(e) || isDown(e);
        if (shouldNavigateOutOfEndContent) {
            this.fireDecoratorEvent("exit-end-content", { shouldNavigateToNextItem: isDown(e) });
        }
    }
    _navigateOutOfEndContent(e) {
        const item = e.target;
        const shouldNavigateToNextItem = e.detail.shouldNavigateToNextItem;
        const menuItems = this._allMenuItems;
        const itemIndex = menuItems.indexOf(item);
        if (itemIndex > -1) {
            const nextItem = shouldNavigateToNextItem ? menuItems[itemIndex + 1] : menuItems[itemIndex - 1];
            const itemToFocus = nextItem || menuItems[itemIndex];
            itemToFocus?.focus();
            e.stopPropagation();
        }
    }
    _closeAll() {
        if (this._popover) {
            this._popover.open = false;
        }
        this.selected = false;
        this.fireDecoratorEvent("close-menu");
    }
    _close() {
        if (this._popover) {
            this._popover.open = false;
            this._allMenuItems.forEach(item => item._close());
        }
        this.selected = false;
    }
    _beforePopoverOpen(e) {
        const prevented = !this.fireDecoratorEvent("before-open", {});
        if (prevented) {
            e.preventDefault();
        }
    }
    _afterPopoverOpen() {
        if (!this._openedByMouse) {
            this._allMenuItems[0]?.focus();
        }
        this.fireDecoratorEvent("open");
    }
    _beforePopoverClose(e) {
        const prevented = !this.fireDecoratorEvent("before-close", { escPressed: e.detail.escPressed });
        if (prevented) {
            e.preventDefault();
            return;
        }
        this.selected = false;
        if (e.detail.escPressed) {
            this.focus();
            if (isPhone()) {
                this.fireDecoratorEvent("close-menu");
            }
        }
    }
    _afterPopoverClose() {
        this._openedByMouse = false;
        this.fireDecoratorEvent("close");
    }
    get isMenuItem() {
        return true;
    }
    _updateCheckedState() {
        if (this._checkMode === MenuItemGroupCheckMode.None) {
            return;
        }
        const newState = !this.checked;
        this.checked = newState;
        this.fireDecoratorEvent("check");
    }
};
__decorate([
    property()
], MenuItem.prototype, "text", void 0);
__decorate([
    property()
], MenuItem.prototype, "additionalText", void 0);
__decorate([
    property()
], MenuItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], MenuItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MenuItem.prototype, "loading", void 0);
__decorate([
    property({ type: Number })
], MenuItem.prototype, "loadingDelay", void 0);
__decorate([
    property()
], MenuItem.prototype, "accessibleName", void 0);
__decorate([
    property()
], MenuItem.prototype, "tooltip", void 0);
__decorate([
    property({ type: Boolean })
], MenuItem.prototype, "checked", void 0);
__decorate([
    property({ type: Object })
], MenuItem.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MenuItem.prototype, "_siblingsWithIcon", void 0);
__decorate([
    property()
], MenuItem.prototype, "_checkMode", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], MenuItem.prototype, "items", void 0);
__decorate([
    slot()
], MenuItem.prototype, "endContent", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], MenuItem, "i18nBundle", void 0);
MenuItem = MenuItem_1 = __decorate([
    customElement({
        tag: "ui5-menu-item",
        renderer: jsxRenderer,
        template: MenuItemTemplate,
        styles: [ListItem.styles, menuItemCss],
    })
    /**
     * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening.
     *
     * **Note:** Since 1.14.0 the event is also fired before a sub-menu opens.
     * @public
     * @since 1.10.0
     * @param { HTMLElement } item The menu item that triggers opening of the sub-menu or undefined when fired upon root menu opening.
     */
    ,
    event("before-open", {
        cancelable: true,
    })
    /**
     * Fired after the menu is opened.
     * @public
     */
    ,
    event("open")
    /**
     * Fired when the menu is being closed.
     * @private
     */
    ,
    event("close-menu", {
        bubbles: true,
    })
    /**
     * Fired when navigating out of end-content.
     * @private
     */
    ,
    event("exit-end-content", {
        bubbles: true,
    })
    /**
     * Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing.
     * @public
     * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
     * @since 1.10.0
     */
    ,
    event("before-close", {
        cancelable: true,
    })
    /**
     * Fired after the menu is closed.
     * @public
     * @since 1.10.0
     */
    ,
    event("close")
    /**
     * Fired when an item is checked or unchecked.
     * @public
     * @since 2.12.0
     */
    ,
    event("check", {
        bubbles: true,
    })
], MenuItem);
MenuItem.define();
export default MenuItem;
export const isInstanceOfMenuItem = createInstanceChecker("isMenuItem");
//# sourceMappingURL=MenuItem.js.map