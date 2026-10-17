var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UserSettingsNotificationsViewItemTemplate from "./UserSettingsNotificationsViewItemTemplate.js";
import UserSettingsNotificationsViewItemCss from "./generated/themes/UserSettingsNotificationsViewItem.css.js";
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
import { customElement, property, slotStrict as slot, eventStrict as event, } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import { isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-notifications-view-item` represents a single notification setting
 * within the `ui5-user-settings-notifications-view`.
 *
 * It displays a title and an optional byline. By default a trailing switch reflects
 * the `checked` state. Applications can override the trailing control by providing content
 * in the `endContent` slot (e.g. a `ui5-select` for a value picker); the built-in switch and
 * its `switch-change` event are then suppressed. Items can additionally be flagged as
 * `navigable` to display a navigation arrow and behave as clickable list rows.
 *
 * **Note:** The default switch and the `endContent` slot are mutually exclusive.
 * When any content is provided in `endContent`, the trailing switch is not rendered
 * and no `switch-change` event is fired.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsNotificationsViewItem.js";`
 *
 * @constructor
 * @extends ListItemCustom
 * @public
 * @since 2.27.0
 */
let UserSettingsNotificationsViewItem = class UserSettingsNotificationsViewItem extends ListItemCustom {
    constructor() {
        super(...arguments);
        /**
         * Defines the unique identifier of the item.
         *
         * When the item is navigable, `itemKey` is also used to route to a matching sibling
         * `secondary` view by id.
         *
         * @default ""
         * @public
         */
        this.itemKey = "";
        /**
         * Defines the title text of the item.
         * @default ""
         * @public
         */
        this.text = "";
        /**
         * Defines the byline text of the item, rendered below the title.
         * @default ""
         * @public
         */
        this.bylineText = "";
        /**
         * Defines whether the trailing switch is on.
         *
         * Ignored when the `endContent` slot is used.
         *
         * @default false
         * @public
         */
        this.checked = false;
        /**
         * Defines whether the item is navigable. When true, a navigation arrow is rendered
         * and the whole row becomes clickable (fires the parent view's `item-click` event).
         * @default false
         * @public
         */
        this.navigable = false;
        this._handleSwitchChange = (e) => {
            const target = e.target;
            this.checked = target.checked;
            this.fireDecoratorEvent("switch-change", { item: this, checked: this.checked });
        };
        this._handleFormItemClick = (e) => {
            if (!this.navigable) {
                return;
            }
            if (e.target?.closest("[ui5-switch]")) {
                return;
            }
            this.fireDecoratorEvent("_form-item-click", { item: this });
        };
        this._handleEndClick = (e) => {
            e.stopPropagation();
        };
    }
    get isUserSettingsNotificationsViewItem() {
        return true;
    }
    get typeNavigation() {
        return this.navigable;
    }
    get _isHeaderItem() {
        return this._individualSlot?.startsWith("headerItems") ?? false;
    }
    shouldForwardTabAfter() {
        if (this._isHeaderItem) {
            const tabbable = getTabbableElements(this.getFocusDomRef());
            return tabbable.length === 0;
        }
        return super.shouldForwardTabAfter();
    }
    get _hasEndContent() {
        return this.endContent.length > 0;
    }
    get _accessibleSwitchName() {
        return this.bylineText ? `${this.text} ${this.bylineText}` : this.text;
    }
    _onkeyup(e) {
        // The switch only reacts to Space when it has focus itself (F2/arrow-key mode),
        // so toggling at row level must be done here.
        if (isSpace(e) && e.target === this.getFocusDomRef() && !this._hasEndContent) {
            this.checked = !this.checked;
            this.fireDecoratorEvent("switch-change", { item: this, checked: this.checked });
            return;
        }
        super._onkeyup(e);
    }
    get accessibilityInfo() {
        return {
            ...super.accessibilityInfo,
            description: this._accessibleSwitchName,
        };
    }
};
__decorate([
    property()
], UserSettingsNotificationsViewItem.prototype, "itemKey", void 0);
__decorate([
    property()
], UserSettingsNotificationsViewItem.prototype, "text", void 0);
__decorate([
    property()
], UserSettingsNotificationsViewItem.prototype, "bylineText", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsNotificationsViewItem.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], UserSettingsNotificationsViewItem.prototype, "navigable", void 0);
__decorate([
    slot({
        type: HTMLElement,
    })
], UserSettingsNotificationsViewItem.prototype, "endContent", void 0);
UserSettingsNotificationsViewItem = __decorate([
    customElement({
        tag: "ui5-user-settings-notifications-view-item",
        renderer: jsxRenderer,
        template: UserSettingsNotificationsViewItemTemplate,
        styles: [ListItemCustom.styles, UserSettingViewCss, UserSettingsNotificationsViewItemCss],
    })
    /**
     * Fired when the switch state changes.
     *
     * Not fired when the `endContent` slot is used to override the trailing control.
     *
     * @param {UserSettingsNotificationsViewItem} item The item whose switch was toggled.
     * @param {boolean} checked The new checked state of the switch.
     * @public
     */
    ,
    event("switch-change", {
        bubbles: true,
    }),
    event("_form-item-click", {
        bubbles: true,
    })
], UserSettingsNotificationsViewItem);
UserSettingsNotificationsViewItem.define();
export const isInstanceOfUserSettingsNotificationsViewItem = createInstanceChecker("isUserSettingsNotificationsViewItem");
export default UserSettingsNotificationsViewItem;
//# sourceMappingURL=UserSettingsNotificationsViewItem.js.map