var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MenuItemGroup_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isInstanceOfMenuItem } from "./MenuItem.js";
import MenuItemGroupTemplate from "./MenuItemGroupTemplate.js";
import MenuItemGroupCheckMode from "./types/MenuItemGroupCheckMode.js";
import { MENU_ITEM_GROUP_NONE_ACCESSIBLE_NAME, MENU_ITEM_GROUP_SINGLE_ACCESSIBLE_NAME, MENU_ITEM_GROUP_MULTI_ACCESSIBLE_NAME, } from "./generated/i18n/i18n-defaults.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-menu-item-group` component represents a group of items designed for use inside a `ui5-menu`.
 * Items belonging to the same group should be wrapped by a `ui5-menu-item-group`.
 * Each group can have an `checkMode` property, which defines the check mode for the items within the group.
 * The possible values for `checkMode` are:
 * - 'None' (default) - no items can be checked
 * - 'Single' - Only one item can be checked at a time
 * - 'Multiple' - Multiple items can be checked simultaneously
 *
 * **Note:** If the `checkMode` property is set to 'Single', only one item can remain checked at any given time.
 * If multiple items are marked as checked, the last checked item will take precedence.
 *
 * ### Usage
 *
 * `ui5-menu-item-group` represents a collection of `ui5-menu-item` components that can have the same check mode.
 * The items are addeed to the group's `items` slot.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItemGroup.js";`
 * @constructor
 * @extends UI5Element
 * @implements {IMenuItem}
 * @since 2.12.0
 * @public
 */
let MenuItemGroup = MenuItemGroup_1 = class MenuItemGroup extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the component's check mode.
         * @default "None"
         * @public
         */
        this.checkMode = "None";
    }
    get ariaLabelText() {
        switch (this.checkMode) {
            case MenuItemGroupCheckMode.None:
                return MenuItemGroup_1.i18nBundle.getText(MENU_ITEM_GROUP_NONE_ACCESSIBLE_NAME);
            case MenuItemGroupCheckMode.Single:
                return MenuItemGroup_1.i18nBundle.getText(MENU_ITEM_GROUP_SINGLE_ACCESSIBLE_NAME);
            case MenuItemGroupCheckMode.Multiple:
                return MenuItemGroup_1.i18nBundle.getText(MENU_ITEM_GROUP_MULTI_ACCESSIBLE_NAME);
            default:
                return undefined;
        }
    }
    get isGroup() {
        return true;
    }
    get _menuItems() {
        return this.items.filter(isInstanceOfMenuItem);
    }
    onBeforeRendering() {
        this._updateItemsCheckMode();
        if (this.checkMode === MenuItemGroupCheckMode.Single) {
            this._ensureSingleItemIsChecked();
        }
    }
    /**
     * Sets <code>_checkMode</code> property of all menu items in the group.
     * @private
     */
    _updateItemsCheckMode() {
        this._menuItems.forEach((item) => {
            item._checkMode = this.checkMode;
        });
    }
    /**
     * Sets <code>checked</code> property of all items in the group to <code>false</code>.
     * @private
     */
    _clearCheckedItems() {
        this._menuItems.forEach((item) => { item.checked = false; });
    }
    /**
     * Ensures that only one item can remain checked at any given time. If multiple items are marked as checked,
     * the last checked item will take precedence.
     * @private
     */
    _ensureSingleItemIsChecked() {
        const lastCheckedItem = this._menuItems.findLast((item) => item.checked);
        this._clearCheckedItems();
        if (lastCheckedItem) {
            lastCheckedItem.checked = true;
        }
    }
    /**
     * Handles the checking of an item in the group and unchecks other items if the item check mode is Single.
     * @private
     */
    _handleItemCheck(e) {
        const clickedItem = e.target;
        const isChecked = clickedItem.checked;
        if (this.checkMode === MenuItemGroupCheckMode.Single) {
            this._clearCheckedItems();
            clickedItem.checked = isChecked;
        }
    }
};
__decorate([
    property()
], MenuItemGroup.prototype, "checkMode", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], MenuItemGroup.prototype, "items", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], MenuItemGroup, "i18nBundle", void 0);
MenuItemGroup = MenuItemGroup_1 = __decorate([
    customElement({
        tag: "ui5-menu-item-group",
        renderer: jsxRenderer,
        template: MenuItemGroupTemplate,
    })
], MenuItemGroup);
MenuItemGroup.define();
export default MenuItemGroup;
export const isInstanceOfMenuItemGroup = createInstanceChecker("isGroup");
//# sourceMappingURL=MenuItemGroup.js.map