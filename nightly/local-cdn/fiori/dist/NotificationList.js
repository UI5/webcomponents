var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationList_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
// Template
import NotificationListTemplate from "./NotificationListTemplate.js";
// Styles
import NotificationListCss from "./generated/themes/NotificationList.css.js";
// Texts
import { NOTIFICATION_LIST_ACCESSIBLE_NAME, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 * ### Overview
 * The `ui5-notification-list` web component represents
 * a container for `ui5-li-notification-group` and `ui5-li-notification`.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * The `ui5-notification-list` provides advanced keyboard handling.
 * When a list is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Up] or [Left] - Navigates up the items
 * - [Down] or [Right] - Navigates down the items
 * - [Home] - Navigates to first item
 * - [End] - Navigates to the last item
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NotificationList.js";``
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
let NotificationList = NotificationList_1 = class NotificationList extends UI5Element {
    get _accessibleName() {
        return NotificationList_1.i18nFioriBundle.getText(NOTIFICATION_LIST_ACCESSIBLE_NAME);
    }
    getEnabledItems() {
        return this.innerList?.getEnabledItems() || [];
    }
    get innerList() {
        return this.shadowRoot?.querySelector("[ui5-notification-list-internal]");
    }
    _onItemClick(e) {
        const item = e.detail.item;
        if (!this.fireDecoratorEvent("item-click", { item })) {
            e.preventDefault();
        }
    }
    _onItemClose(e) {
        const item = e.detail.item;
        if (!this.fireDecoratorEvent("item-close", { item })) {
            e.preventDefault();
        }
    }
    _onItemToggle(e) {
        const item = e.detail.item;
        if (!this.fireDecoratorEvent("item-toggle", { item })) {
            e.preventDefault();
        }
    }
    _onLoadMore() {
        this.fireDecoratorEvent("load-more");
    }
};
__decorate([
    slot({ type: HTMLElement, "default": true })
], NotificationList.prototype, "items", void 0);
__decorate([
    property()
], NotificationList.prototype, "noDataText", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], NotificationList, "i18nFioriBundle", void 0);
NotificationList = NotificationList_1 = __decorate([
    customElement({
        tag: "ui5-notification-list",
        renderer: jsxRenderer,
        languageAware: true,
        styles: [NotificationListCss],
        template: NotificationListTemplate,
    })
    /**
     * Fired when an item is clicked.
     * @param {HTMLElement} item The clicked item.
     * @public
     */
    ,
    event("item-click", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired when the `Close` button of any item is clicked.
     * @param {HTMLElement} item the item about to be closed.
     * @public
     */
    ,
    event("item-close", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired when an item is toggled.
     *
     * @param {HTMLElement} item the toggled item.
     * @public
     */
    ,
    event("item-toggle", {
        bubbles: true,
        cancelable: true,
    })
], NotificationList);
NotificationList.define();
export default NotificationList;
//# sourceMappingURL=NotificationList.js.map