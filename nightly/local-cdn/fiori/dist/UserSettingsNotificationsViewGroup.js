var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import ListItemGroup from "@ui5/webcomponents/dist/ListItemGroup.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import UserSettingsNotificationsViewGroupCss from "./generated/themes/UserSettingsNotificationsViewGroup.css.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-notifications-view-group` groups `ui5-user-settings-notifications-view-item`
 * elements inside a `ui5-user-settings-notifications-view`. Its header renders as a plain bold
 * section title with a separator line below, per the notifications design spec.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsNotificationsViewGroup.js";`
 *
 * @constructor
 * @extends ListItemGroup
 * @public
 * @since 2.27.0
 */
let UserSettingsNotificationsViewGroup = class UserSettingsNotificationsViewGroup extends ListItemGroup {
    get isUserSettingsNotificationsViewGroup() {
        return true;
    }
};
__decorate([
    slot({
        "default": true,
        invalidateOnChildChange: true,
        type: HTMLElement,
    })
], UserSettingsNotificationsViewGroup.prototype, "items", void 0);
UserSettingsNotificationsViewGroup = __decorate([
    customElement({
        tag: "ui5-user-settings-notifications-view-group",
        styles: [ListItemGroup.styles, UserSettingsNotificationsViewGroupCss],
    })
], UserSettingsNotificationsViewGroup);
UserSettingsNotificationsViewGroup.define();
export const isInstanceOfUserSettingsNotificationsViewGroup = createInstanceChecker("isUserSettingsNotificationsViewGroup");
export default UserSettingsNotificationsViewGroup;
//# sourceMappingURL=UserSettingsNotificationsViewGroup.js.map