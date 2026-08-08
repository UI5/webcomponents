var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UserSettingViewCss from "./generated/themes/UserSettingsView.css.js";
import UserSettingsAppearanceViewItemTemplate from "./UserSettingsAppearanceViewItemTemplate.js";
import UserSettingsAppearanceViewItemCss from "./generated/themes/UserSettingsAppearanceViewItem.css.js";
import { customElement, property, } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
// Import default icon used by appearance view items
import "@ui5/webcomponents-icons/dist/product.js";
let UserSettingsAppearanceViewItem = 
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-appearance-view-item` represents a theme/appearance option item
 * within the `ui5-user-settings-appearance-view`.
 *
 * It displays a theme with an avatar icon, text label, and can be selected.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewItem.js";`
 *
 * @constructor
 * @extends ListItemCustom
 * @public
 * @since 2.17.0
 */
class UserSettingsAppearanceViewItem extends ListItemCustom {
    constructor() {
        super(...arguments);
        /**
         * Defines the unique identifier of the item.
         * @default ""
         * @public
         */
        this.itemKey = "";
        /**
         * Defines the text label displayed for the appearance item.
         * @default ""
         * @public
         */
        this.text = "";
        /**
         * Defines the icon of the appearance item.
         * @default "product"
         * @public
         */
        this.icon = "product";
        /**
         * Defines the color scheme of the avatar.
         * @default "Accent7"
         * @public
         */
        this.colorScheme = "Accent7";
    }
    get isUserSettingsAppearanceViewItem() {
        return true;
    }
};
__decorate([
    property()
], UserSettingsAppearanceViewItem.prototype, "itemKey", void 0);
__decorate([
    property()
], UserSettingsAppearanceViewItem.prototype, "text", void 0);
__decorate([
    property()
], UserSettingsAppearanceViewItem.prototype, "icon", void 0);
__decorate([
    property()
], UserSettingsAppearanceViewItem.prototype, "colorScheme", void 0);
UserSettingsAppearanceViewItem = __decorate([
    customElement({
        tag: "ui5-user-settings-appearance-view-item",
        renderer: jsxRenderer,
        template: UserSettingsAppearanceViewItemTemplate,
        styles: [ListItemCustom.styles, UserSettingViewCss, UserSettingsAppearanceViewItemCss],
    })
    /**
     * @class
     * ### Overview
     *
     * The `ui5-user-settings-appearance-view-item` represents a theme/appearance option item
     * within the `ui5-user-settings-appearance-view`.
     *
     * It displays a theme with an avatar icon, text label, and can be selected.
     *
     * ### ES6 Module Import
     * `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewItem.js";`
     *
     * @constructor
     * @extends ListItemCustom
     * @public
     * @since 2.17.0
     */
], UserSettingsAppearanceViewItem);
UserSettingsAppearanceViewItem.define();
export const isInstanceOfUserSettingsAppearanceViewItem = createInstanceChecker("isUserSettingsAppearanceViewItem");
export default UserSettingsAppearanceViewItem;
//# sourceMappingURL=UserSettingsAppearanceViewItem.js.map