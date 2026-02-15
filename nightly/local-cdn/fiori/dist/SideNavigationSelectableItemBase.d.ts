import SideNavigationItemBase from "./SideNavigationItemBase.js";
import type SideNavigationItemDesign from "./types/SideNavigationItemDesign.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import type { SideNavigationItemClickEventDetail } from "./SideNavigationItemBase.js";
type SideNavigationItemAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup">;
/**
 * Fired when the component is activated either with a click/tap or by using the [Enter] or [Space] keys.
 *
 * @public
 * @param {boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
 * @param {boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
 * @param {boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
 * @param {boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
 */
declare class SideNavigationSelectableItemBase extends SideNavigationItemBase {
    eventDetails: SideNavigationItemBase["eventDetails"] & {
        "click": SideNavigationItemClickEventDetail;
    };
    /**
     * Defines if the item's parent is disabled.
     * @private
     * @default false
     * @since 2.10.0
     */
    _parentDisabled: boolean;
    /**
     * Defines the icon of the item.
     *
     * **Note:** Icons on second-level (child) navigation items are not recommended according to the design specification.
     *
     * The SAP-icons font provides numerous options.
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @public
     * @default undefined
     */
    icon?: string;
    /**
     * Defines whether the item is selected.
     *
     * **Note:** Items that have a set `href` and `target` set to `_blank` should not be selectable.
     *
     * @public
     * @default false
     */
    selected: boolean;
    /**
     * Defines the link target URI. Supports standard hyperlink behavior.
     * If a JavaScript action should be triggered,
     * this should not be set, but instead an event handler
     * for the `click` event should be registered.
     *
     * @public
     * @default undefined
     * @since 1.19.0
     */
    href?: string;
    /**
     * Defines the component target.
     *
     * Possible values:
     *
     * - `_self`
     * - `_top`
     * - `_blank`
     * - `_parent`
     * - `framename`
     *
     * **Note:** Items that have a defined `href` and `target`
     * attribute set to `_blank` should not be selectable.
     *
     * @public
     * @default undefined
     * @since 1.19.0
     */
    target?: string;
    /**
     * Item design.
     *
     * **Note:** Items with "Action" design must not have sub-items.
     *
     * @public
     * @default "Default"
     * @since 2.7.0
     */
    design: `${SideNavigationItemDesign}`;
    /**
     * Indicates whether the navigation item is selectable. By default, all items are selectable unless specifically marked as unselectable.
     *
     * When a parent item is marked as unselectable, selecting it will only expand or collapse its sub-items.
     * To improve user experience do not mix unselectable parent items with selectable parent items in a single side navigation.
     *
     *
     * **Guidelines**:
     * - Items with an assigned `href` and a target of `_blank` should be marked as unselectable.
     * - Items that trigger actions (with design "Action") should be marked as unselectable.
     *
     * @public
     * @default false
     * @since 2.7.0
     */
    unselectable: boolean;
    /**
     * Defines the additional accessibility attributes that will be applied to the component.
     * The following fields are supported:
     *
     * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
     * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
     *
     * **Note:** Do not use it on parent items, as it will be overridden if the item is in the overflow menu.
     *
     * @public
     * @default {}
     * @since 2.7.0
     */
    accessibilityAttributes: SideNavigationItemAccessibilityAttributes;
    /**
     * @private
     * @default false
     */
    isOverflow: boolean;
    /**
     * Reference to the original side navigation item that opened the popover.
     *
     * @private
     */
    associatedItem?: SideNavigationItemBase;
    get ariaRole(): "menuitem" | "menuitemradio" | "treeitem";
    get isSelectable(): boolean;
    get _href(): string | undefined;
    get _target(): string | undefined;
    get isExternalLink(): boolean | "" | undefined;
    get _selected(): boolean;
    get _effectiveTag(): "a" | "div";
    get effectiveDisabled(): boolean;
    get _ariaHasPopup(): import("@ui5/webcomponents-base/dist/types.js").AriaHasPopup | undefined;
    get classesArray(): string[];
    get _classes(): string;
    get _ariaCurrent(): "page" | undefined;
    get _ariaSelected(): boolean | undefined;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onclick(e: MouseEvent): void;
    _onfocusin(e: FocusEvent): void;
    _activate(e: KeyboardEvent | MouseEvent): void;
    get isSideNavigationSelectableItemBase(): boolean;
}
export default SideNavigationSelectableItemBase;
export declare const isInstanceOfSideNavigationSelectableItemBase: (object: any) => object is SideNavigationSelectableItemBase;
export type { SideNavigationItemAccessibilityAttributes, };
