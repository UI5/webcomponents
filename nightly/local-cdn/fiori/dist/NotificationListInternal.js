var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import List from "@ui5/webcomponents/dist/List.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";
import { isDown, isUp, isLeft, isRight, isHome, isEnd, } from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
/**
 * @class
 *
 * Internal `ui5-li-notification-list-list` component,
 * that is used to support keyboard navigation of the notification list internal list.
 *
 * @private
 */
let NotificationListInternal = class NotificationListInternal extends List {
    constructor() {
        super();
        this._allNavigationItems = [];
        this._itemNavigation._navigationMode = NavigationMode.Auto;
    }
    getEnabledItems() {
        const items = new Array();
        const allNavigationItems = new Array();
        this.getItems().forEach(item => {
            items.push(item);
            allNavigationItems.push(item);
            if (item instanceof NotificationListGroupItem && !item.collapsed && !item.loading) {
                item.items.forEach(subItem => {
                    items.push(subItem);
                    allNavigationItems.push(subItem);
                });
                const growingButton = item.getGrowingButton();
                if (growingButton) {
                    allNavigationItems.push(growingButton);
                }
            }
        });
        const growingButton = this.getGrowingButton();
        if (growingButton) {
            allNavigationItems.push(growingButton);
        }
        this._allNavigationItems = allNavigationItems;
        return items;
    }
    _onkeydown(e) {
        if (isEnd(e)) {
            this._handleEndKey(e);
            e.preventDefault();
            return;
        }
        if (isHome(e)) {
            this._handleHomeKey(e);
            e.preventDefault();
            return;
        }
        this._focusSameItemOnNextRow(e);
    }
    _handleHomeKey(e) {
        e.stopImmediatePropagation();
        const target = e.target;
        const activeElement = getActiveElement();
        if ((!this._isGrowingButton(activeElement) && target?.hasAttribute("ui5-li-notification-group"))
            || target?.hasAttribute("ui5-menu-item")) {
            return;
        }
        const currentFocusedItem = this.getEnabledItems()[this._itemNavigation._currentIndex];
        if (!currentFocusedItem) {
            return;
        }
        const currentFocusedIndex = this._allNavigationItems.indexOf(currentFocusedItem);
        let nextFocusedIndex = 0;
        for (let i = currentFocusedIndex - 1; i >= 0; i--) {
            const item = this._allNavigationItems[i];
            if (item.hasAttribute("ui5-li-notification-group")) {
                nextFocusedIndex = i + 1;
                break;
            }
        }
        this._allNavigationItems[nextFocusedIndex].focus();
    }
    _handleEndKey(e) {
        e.stopImmediatePropagation();
        const target = e.target;
        if (target?.hasAttribute("ui5-menu-item")) {
            return;
        }
        const currentFocusedItem = this.getEnabledItems()[this._itemNavigation._currentIndex];
        if (!currentFocusedItem) {
            return;
        }
        const currentFocusedIndex = this._allNavigationItems.indexOf(currentFocusedItem);
        let nextFocusedIndex = this._allNavigationItems.length - 1;
        for (let i = currentFocusedIndex + 1; i < this._allNavigationItems.length; i++) {
            const item = this._allNavigationItems[i];
            if (item.hasAttribute("ui5-li-notification-group")) {
                nextFocusedIndex = i - 1;
                break;
            }
            if (this._isGrowingButton(item)) {
                nextFocusedIndex = i === currentFocusedIndex + 1 ? i : i - 1;
                break;
            }
        }
        this._allNavigationItems[nextFocusedIndex].focus();
    }
    _focusSameItemOnNextRow(e) {
        if (!isUp(e) && !isDown(e) && !isLeft(e) && !isRight(e)) {
            return;
        }
        const target = e.target;
        const shadowTarget = target.shadowRoot.activeElement;
        const activeElement = getActiveElement();
        const isGrowingBtn = this._isGrowingButton(activeElement);
        if (!target || target.hasAttribute("ui5-menu-item")) {
            return;
        }
        const isFocusWithin = target.matches(":focus-within");
        if (!isFocusWithin) {
            return;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        const currentItem = isGrowingBtn ? activeElement : this.getEnabledItems()[this._itemNavigation._currentIndex];
        const index = this._allNavigationItems.indexOf(currentItem) + ((isUp(e) || isLeft(e)) ? -1 : 1);
        const nextItem = this._allNavigationItems[index];
        if (!nextItem) {
            return;
        }
        if (this._isGrowingButton(nextItem) || shadowTarget.classList.contains("ui5-nli-focusable")) {
            nextItem.focus();
            return;
        }
        const nextListItem = nextItem;
        if (nextListItem.loading || (isLeft(e) || isRight(e))) {
            nextItem.focus();
            return;
        }
        const sameItemOnNextRow = nextListItem.getHeaderDomRef().querySelector(`.${shadowTarget.className}`);
        if (sameItemOnNextRow && sameItemOnNextRow.offsetParent) {
            sameItemOnNextRow.focus();
        }
        else {
            nextItem.focus();
        }
    }
    _isGrowingButton(item) {
        return item?.classList.contains("ui5-growing-button-inner");
    }
};
NotificationListInternal = __decorate([
    customElement("ui5-notification-list-internal")
], NotificationListInternal);
NotificationListInternal.define();
export default NotificationListInternal;
//# sourceMappingURL=NotificationListInternal.js.map