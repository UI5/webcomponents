import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type MenuItem from "./MenuItem.js";
import MenuItemGroupCheckMode from "./types/MenuItemGroupCheckMode.js";
import type { IMenuItem } from "./Menu.js";
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
declare class MenuItemGroup extends UI5Element implements IMenuItem {
    /**
     * Defines the component's check mode.
     * @default "None"
     * @public
     */
    checkMode: `${MenuItemGroupCheckMode}`;
    /**
     * Defines the items of this component.
     * **Note:** The slot can hold any combination of components of type `ui5-menu-item` or `ui5-menu-separator` or both.
     * @public
     */
    items: DefaultSlot<IMenuItem>;
    static i18nBundle: I18nBundle;
    get ariaLabelText(): string | undefined;
    get isGroup(): boolean;
    get _menuItems(): MenuItem[];
    onBeforeRendering(): void;
    /**
     * Sets <code>_checkMode</code> property of all menu items in the group.
     * @private
     */
    _updateItemsCheckMode(): void;
    /**
     * Sets <code>checked</code> property of all items in the group to <code>false</code>.
     * @private
     */
    _clearCheckedItems(): void;
    /**
     * Ensures that only one item can remain checked at any given time. If multiple items are marked as checked,
     * the last checked item will take precedence.
     * @private
     */
    _ensureSingleItemIsChecked(): void;
    /**
     * Handles the checking of an item in the group and unchecks other items if the item check mode is Single.
     * @private
     */
    _handleItemCheck(e: CustomEvent): void;
}
export default MenuItemGroup;
export declare const isInstanceOfMenuItemGroup: (object: any) => object is MenuItemGroup;
