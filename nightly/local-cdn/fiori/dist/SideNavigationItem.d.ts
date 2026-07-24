import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type SideNavigationItemBase from "./SideNavigationItemBase.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import type SideNavigationSubItem from "./SideNavigationSubItem.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import "@ui5/webcomponents/dist/Tag.js";
/**
 * @class
 *
 * ### Overview
 *
 * Represents a navigation action. It can provide sub items.
 * The `ui5-side-navigation-item` is used within `ui5-side-navigation` or `ui5-side-navigation-group` only.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";`
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @abstract
 * @public
 * @since 1.0.0-rc.8
 */
declare class SideNavigationItem extends SideNavigationSelectableItemBase {
    /**
     * Defines if the item is expanded
     *
     * @public
     * @default false
     */
    expanded: boolean;
    /**
     * Defines if the item should be collapsible or not.
     * It is true, for example, for the items inside the Popover of the Side Navigation
     * @private
     * @default false
     * @since 1.10.0
     */
    _fixed: boolean;
    /**
     * Defines nested items by passing `ui5-side-navigation-sub-item` to the default slot.
     *
     * @public
     */
    items: DefaultSlot<SideNavigationSubItem>;
    /**
     * Defines the tag to be displayed.
     *
     * **Note:** Tags are visible when the <code>NavigationList</code> is in expanded mode,
     * and hidden when collapsed, but they are visible in the overflow of the collapsed mode.
     *
     * **Note:** Only one `ui5-tag` is allowed. The tag should use `design="Set2"`, `hide-state-icon`,
     * and `colorScheme` values 5-10 to avoid confusion with semantic colors (1-4).
     *
     * **Note:** It is recommended to limit tag width to 64px (4rem). If tag text exceeds this,
     * use shortened forms or abbreviations (e.g., "Experimental" → "Exp").
     *
     * **Important:** The <code>ui5-tag</code> must never be interactive (i.e., <code>active</code> must not be set to <code>true</code>),
     * as this would lead to nesting of interactive elements, which is not allowed.
     *
     * @public
     * @since 2.23.0
     */
    tag: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    get overflowItems(): Array<SideNavigationItem>;
    get hasSubItems(): boolean;
    get effectiveDisabled(): boolean;
    get selectableItems(): Array<SideNavigationSelectableItemBase>;
    get focusableItems(): Array<SideNavigationItemBase>;
    get allItems(): Array<SideNavigationItemBase>;
    get effectiveTabIndex(): number | undefined;
    get _ariaHasPopup(): import("@ui5/webcomponents-base/dist/types.js").AriaHasPopup | undefined;
    get _ariaChecked(): boolean | undefined;
    get _groupId(): string | undefined;
    get _expanded(): boolean | undefined;
    get _describedBy(): string | undefined;
    get _selectableItemDescriptionId(): string;
    get _selectableItemDescriptionText(): string | undefined;
    get hasTag(): boolean;
    get _textId(): string;
    get classesArray(): string[];
    get _selected(): boolean;
    get _arrowTooltip(): string;
    get _ariaLabel(): string | undefined;
    applyInitialFocusInPopover(): void;
    _onToggleClick(e: CustomEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onfocusin(e: FocusEvent): void;
    _onclick(e: MouseEvent): void;
    _onfocusout(): void;
    _onmouseenter(): void;
    _onmouseleave(): void;
    _toggle(): void;
    get isSideNavigationItem(): boolean;
}
export default SideNavigationItem;
export declare const isInstanceOfSideNavigationItem: (object: any) => object is SideNavigationItem;
