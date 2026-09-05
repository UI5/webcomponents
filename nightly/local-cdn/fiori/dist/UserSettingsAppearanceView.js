var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UserSettingsView from "./UserSettingsView.js";
import UserSettingsAppearanceViewTemplate from "./UserSettingsAppearanceViewTemplate.js";
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
import { isInstanceOfUserSettingsAppearanceViewItem } from "./UserSettingsAppearanceViewItem.js";
import { isInstanceOfUserSettingsAppearanceViewGroup } from "./UserSettingsAppearanceViewGroup.js";
import { customElement, slotStrict as slot, eventStrict as event, } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
let UserSettingsAppearanceView = 
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-appearance-view` represents a view displayed in the `ui5-user-settings-item`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceView.js";`
 *
 * @constructor
 * @extends UserSettingsView
 * @public
 * @since 2.17.0
 */
class UserSettingsAppearanceView extends UserSettingsView {
    constructor() {
        super(...arguments);
        this._handleItemClick = (e) => {
            const listItem = e.detail.item;
            if (isInstanceOfUserSettingsAppearanceViewItem(listItem)) {
                const eventPrevented = !this.fireDecoratorEvent("selection-change", {
                    item: listItem,
                });
                if (!eventPrevented) {
                    this._getAllItems().forEach(viewItem => {
                        viewItem.selected = false;
                    });
                    listItem.selected = true;
                }
            }
        };
    }
    _getAllItems() {
        const allItems = [];
        this.items.forEach(item => {
            if (isInstanceOfUserSettingsAppearanceViewGroup(item)) {
                const groupItems = Array.from(item.children).filter(isInstanceOfUserSettingsAppearanceViewItem);
                allItems.push(...groupItems);
            }
            else if (isInstanceOfUserSettingsAppearanceViewItem(item)) {
                allItems.push(item);
            }
        });
        return allItems;
    }
};
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
        invalidateOnChildChange: true,
    })
], UserSettingsAppearanceView.prototype, "items", void 0);
__decorate([
    slot({
        type: HTMLElement,
    })
], UserSettingsAppearanceView.prototype, "additionalContent", void 0);
UserSettingsAppearanceView = __decorate([
    customElement({
        tag: "ui5-user-settings-appearance-view",
        renderer: jsxRenderer,
        template: UserSettingsAppearanceViewTemplate,
        styles: [UserSettingViewCss],
    })
    /**
     * Fired when an item is selected.
     * @param {UserSettingsAppearanceViewItem} item The selected `user settings appearance view item`.
     * @public
     */
    ,
    event("selection-change", {
        cancelable: true,
    })
    /**
     * @class
     * ### Overview
     *
     * The `ui5-user-settings-appearance-view` represents a view displayed in the `ui5-user-settings-item`.
     *
     * ### ES6 Module Import
     * `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceView.js";`
     *
     * @constructor
     * @extends UserSettingsView
     * @public
     * @since 2.17.0
     */
], UserSettingsAppearanceView);
UserSettingsAppearanceView.define();
export default UserSettingsAppearanceView;
//# sourceMappingURL=UserSettingsAppearanceView.js.map