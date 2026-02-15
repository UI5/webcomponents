var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Menu_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { isLeft, isRight, isEnter, isTabNext, isTabPrevious, } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone, isDesktop, } from "@ui5/webcomponents-base/dist/Device.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
// The import below should be kept, as MenuItem is part of the Menu component.
import { isInstanceOfMenuItem } from "./MenuItem.js";
import { isInstanceOfMenuItemGroup } from "./MenuItemGroup.js";
import { isInstanceOfMenuSeparator } from "./MenuSeparator.js";
import menuTemplate from "./MenuTemplate.js";
import { MENU_CANCEL_BUTTON_TEXT, MENU_POPOVER_ACCESSIBLE_NAME, } from "./generated/i18n/i18n-defaults.js";
// Styles
import menuCss from "./generated/themes/Menu.css.js";
const MENU_OPEN_DELAY = 300;
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu` component represents a hierarchical menu structure.
 *
 * ### Structure
 *
 * The `ui5-menu` can hold two types of entities:
 *
 * - `ui5-menu-item` components
 * - `ui5-menu-separator` - used to separate menu items with a line
 *
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Keyboard Handling
 *
 * The `ui5-menu` provides advanced keyboard handling.
 * The user can use the following keyboard shortcuts in order to navigate trough the tree:
 *
 * - `Arrow Up` / `Arrow Down` - Navigates up and down the menu items that are currently visible.
 * - `Arrow Right`, `Space` or `Enter` - Opens a sub-menu if there are menu items nested
 * in the currently clicked menu item.
 * - `Arrow Left` or `Escape` - Closes the currently opened sub-menu.
 *
 * when there is `endContent` :
 * - `Arrow Left` or `ArrowRight` - Navigate between the menu item actions and the menu item itself
 * - `Arrow Up` / `Arrow Down` - Navigates up and down the currently visible menu items
 *
 * **Note:** If the text direction is set to Right-to-left (RTL), `Arrow Right` and `Arrow Left` functionality is swapped.
 *
 * Application developers are responsible for ensuring that interactive elements placed in the `endContent` slot
 * have the correct accessibility behaviour, including their enabled or disabled states.
 * The menu does not manage these aspects when the menu item state changes.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Menu.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.3.0
 * @public
 */
let Menu = Menu_1 = class Menu extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Indicates if the menu is open.
         * @public
         * @default false
         * @since 1.10.0
         */
        this.open = false;
        /**
         * Determines on which side the component is placed at.
         * @default "Bottom"
         * @public
         * @since 2.16.0
         */
        this.placement = "Bottom";
        /**
         * Determines the horizontal alignment of the menu relative to its opener control.
         * @default "Start"
         * @public
         */
        this.horizontalAlign = "Start";
        /**
         * Defines if a loading indicator would be displayed inside the corresponding ui5-menu popover.
         * @default false
         * @public
         * @since 1.13.0
         */
        this.loading = false;
        /**
         * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
         * @default 1000
         * @public
         * @since 1.13.0
         */
        this.loadingDelay = 1000;
    }
    get isRtl() {
        return this.effectiveDir === "rtl";
    }
    get labelCancel() {
        return Menu_1.i18nBundle.getText(MENU_CANCEL_BUTTON_TEXT);
    }
    get isPhone() {
        return isPhone();
    }
    get _popover() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    get _list() {
        return this.shadowRoot.querySelector("[ui5-list]");
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
    get accessibleNameText() {
        return Menu_1.i18nBundle.getText(MENU_POPOVER_ACCESSIBLE_NAME);
    }
    onBeforeRendering() {
        const siblingsWithIcon = this._allMenuItems.some(menuItem => !!menuItem.icon);
        this._setupItemNavigation();
        this._allMenuItems.forEach(item => {
            item._siblingsWithIcon = siblingsWithIcon;
        });
    }
    getFocusDomRef() {
        return this._list?.getFocusDomRef();
    }
    _setupItemNavigation() {
        if (this._list) {
            this._list._itemNavigation._getItems = () => this._navigatableMenuItems;
        }
    }
    _close() {
        this.open = false;
    }
    _openItemSubMenu(item, openedByMouse = false) {
        clearTimeout(this._timeout);
        if (!item._popover || item._popover.open) {
            return;
        }
        this.fireDecoratorEvent("before-open", {
            item,
        });
        item._popover.opener = item;
        item._popover.open = true;
        item.selected = true;
        item._openedByMouse = openedByMouse;
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
        // Opens submenu with 300ms delay
        this._startOpenTimeout(item);
    }
    async focus(focusOptions) {
        await renderFinished();
        const firstMenuItem = this._allMenuItems[0];
        if (firstMenuItem) {
            return firstMenuItem.focus(focusOptions);
        }
        return super.focus(focusOptions);
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
    _startOpenTimeout(item) {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => {
            this._closeOtherSubMenus(item);
            this._openItemSubMenu(item, true);
        }, MENU_OPEN_DELAY);
    }
    _itemClick(e) {
        const item = e.detail.item;
        if (!item._popover) {
            const prevented = !this.fireDecoratorEvent("item-click", {
                "item": item,
                "text": item.text || "",
            });
            if (!prevented) {
                item._updateCheckedState();
                this._popover && !item._shiftPressed && item.fireDecoratorEvent("close-menu");
            }
        }
        else {
            this._openItemSubMenu(item);
        }
    }
    _itemKeyDown(e) {
        const isTabNextPrevious = isTabNext(e) || isTabPrevious(e);
        const item = e.target;
        if (!isInstanceOfMenuItem(item)) {
            return;
        }
        const isEndContentNavigation = isRight(e) || isLeft(e);
        const shouldOpenMenu = this.isRtl ? isLeft(e) : isRight(e);
        if (isEnter(e) || isTabNextPrevious) {
            e.preventDefault();
        }
        if (isEndContentNavigation) {
            item._navigateToEndContent(isLeft(e));
        }
        if (shouldOpenMenu) {
            this._openItemSubMenu(item, false);
        }
        else if (isTabNextPrevious) {
            this._close();
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
    _beforePopoverOpen(e) {
        const prevented = !this.fireDecoratorEvent("before-open", {});
        if (prevented) {
            this.open = false;
            e.preventDefault();
        }
    }
    _afterPopoverOpen() {
        this._allMenuItems[0]?.focus();
        this.fireDecoratorEvent("open");
    }
    _beforePopoverClose(e) {
        const prevented = !this.fireDecoratorEvent("before-close", { escPressed: e.detail.escPressed });
        if (prevented) {
            this.open = true;
            e.preventDefault();
        }
    }
    _afterPopoverClose() {
        this.open = false;
        this.fireDecoratorEvent("close");
    }
};
__decorate([
    property()
], Menu.prototype, "headerText", void 0);
__decorate([
    property({ type: Boolean })
], Menu.prototype, "open", void 0);
__decorate([
    property()
], Menu.prototype, "placement", void 0);
__decorate([
    property()
], Menu.prototype, "horizontalAlign", void 0);
__decorate([
    property({ type: Boolean })
], Menu.prototype, "loading", void 0);
__decorate([
    property({ type: Number })
], Menu.prototype, "loadingDelay", void 0);
__decorate([
    property({ converter: DOMReferenceConverter })
], Menu.prototype, "opener", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], Menu.prototype, "items", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Menu, "i18nBundle", void 0);
Menu = Menu_1 = __decorate([
    customElement({
        tag: "ui5-menu",
        renderer: jsxRenderer,
        styles: menuCss,
        template: menuTemplate,
    })
    /**
     * Fired when an item is being clicked.
     *
     * **Note:** Since 1.17.0 the event is preventable, allowing the menu to remain open after an item is pressed.
     * @param { HTMLElement } item The currently clicked menu item.
     * @param { string } text The text of the currently clicked menu item.
     * @public
     */
    ,
    event("item-click", {
        cancelable: true,
    })
    /**
     * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening.
     *
     * **Note:** Since 1.14.0 the event is also fired before a sub-menu opens.
     * @public
     * @since 1.10.0
     * @param { HTMLElement } item The `ui5-menu-item` that triggers opening of the sub-menu or undefined when fired upon root menu opening.
     */
    ,
    event("before-open", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired after the menu is opened.
     * @public
     * @since 1.10.0
     */
    ,
    event("open", {
        bubbles: true,
    })
    /**
     * Fired when the menu is being closed.
     * @private
     */
    ,
    event("close-menu", {
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
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired after the menu is closed.
     * @public
     * @since 1.10.0
     */
    ,
    event("close")
], Menu);
Menu.define();
export default Menu;
//# sourceMappingURL=Menu.js.map