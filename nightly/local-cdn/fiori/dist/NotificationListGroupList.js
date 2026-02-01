var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import List from "@ui5/webcomponents/dist/List.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
/**
 * @class
 *
 * Internal `ui5-li-notification-group-list` component,
 * that is used to support keyboard navigation of the notification group internal list.
 *
 * @private
 */
let NotificationListGroupList = class NotificationListGroupList extends List {
    getEnabledItems() {
        return [];
    }
    _handleTabNext() {
    }
    onForwardBefore() {
    }
    onForwardAfter() {
    }
    onItemTabIndexChange() {
    }
    onItemFocused() {
    }
    _onfocusin(e) {
        e.stopImmediatePropagation();
    }
    _onkeydown() {
    }
    focusItem(item) {
        item.focus();
    }
    _onLoadMoreKeydown(e) {
        if (isSpace(e)) {
            e.stopImmediatePropagation();
        }
        super._onLoadMoreKeydown(e);
    }
};
NotificationListGroupList = __decorate([
    customElement("ui5-notification-group-list")
], NotificationListGroupList);
NotificationListGroupList.define();
export default NotificationListGroupList;
//# sourceMappingURL=NotificationListGroupList.js.map