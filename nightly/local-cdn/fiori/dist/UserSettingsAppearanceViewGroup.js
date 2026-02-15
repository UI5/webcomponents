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
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-appearance-view-group` is a special list item group used to group appearance view items.
 *
 * This is the item to use inside a `ui5-user-settings-appearance-view`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewGroup.js";`
 *
 * @constructor
 * @extends ListItemGroup
 * @public
 * @since 2.17.0
 */
let UserSettingsAppearanceViewGroup = class UserSettingsAppearanceViewGroup extends ListItemGroup {
    get isUserSettingsAppearanceViewGroup() {
        return true;
    }
};
__decorate([
    slot({
        "default": true,
        invalidateOnChildChange: true,
        type: HTMLElement,
    })
], UserSettingsAppearanceViewGroup.prototype, "items", void 0);
UserSettingsAppearanceViewGroup = __decorate([
    customElement({
        tag: "ui5-user-settings-appearance-view-group",
    })
], UserSettingsAppearanceViewGroup);
UserSettingsAppearanceViewGroup.define();
export const isInstanceOfUserSettingsAppearanceViewGroup = createInstanceChecker("isUserSettingsAppearanceViewGroup");
export default UserSettingsAppearanceViewGroup;
//# sourceMappingURL=UserSettingsAppearanceViewGroup.js.map