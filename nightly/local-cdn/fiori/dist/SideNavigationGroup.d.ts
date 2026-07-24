import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import type SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import type SideNavigationItem from "./SideNavigationItem.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * Represents a group of navigation actions within `ui5-side-navigation`.
 * The `ui5-side-navigation-group` can only be used inside a `ui5-side-navigation`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";`
 *
 * @constructor
 * @extends SideNavigationItemBase
 * @public
 * @abstract
 * @since 1.24.0
 */
declare class SideNavigationGroup extends SideNavigationItemBase {
    /**
     * Defines if the item is expanded
     *
     * @public
     * @default false
     */
    expanded: boolean;
    belowGroup: boolean;
    /**
     * Defines nested items by passing `ui5-side-navigation-item` to the default slot.
     *
     * @public
     */
    items: DefaultSlot<SideNavigationItem>;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    get overflowItems(): Array<HTMLElement>;
    get selectableItems(): Array<SideNavigationSelectableItemBase>;
    get focusableItems(): Array<SideNavigationItemBase>;
    get allItems(): Array<SideNavigationItemBase>;
    get _groupId(): string | undefined;
    get _expanded(): boolean | undefined;
    get belowGroupClassName(): "" | "ui5-sn-item-group-below-group";
    get _arrowTooltip(): string;
    _onkeydown(e: KeyboardEvent): void;
    _onclick(): void;
    _onfocusin(e: FocusEvent): void;
    _toggle(): void;
    get isSideNavigationGroup(): boolean;
}
export declare const isInstanceOfSideNavigationGroup: (object: any) => object is SideNavigationGroup;
export default SideNavigationGroup;
