import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type SideNavigation from "./SideNavigation.js";
type SideNavigationItemClickEventDetail = {
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
};
/**
 * @class
 * Base class for the items that are accepted by the `ui5-side-navigation` component.
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.19.0
 */
declare class SideNavigationItemBase extends UI5Element implements ITabbable {
    eventDetails: {
        click: SideNavigationItemClickEventDetail;
    };
    /**
     * Defines the text of the item.
     *
     * @public
     * @default undefined
     */
    text?: string;
    /**
     * Defines whether the component is disabled.
     * A disabled component can't be pressed or
     * focused, and it is not in the tab chain.
     *
     * @default false
     * @public
     * @since 1.19.0
     */
    disabled: boolean;
    /**
     * Defines the tooltip of the component.
     *
     * A tooltip attribute should be provided, in order to represent meaning/function,
     * when the component is collapsed ("icon only" design is visualized) or the item text is truncated.
     *
     * @default undefined
     * @public
     * @since 2.0.0
     */
    tooltip?: string;
    forcedTabIndex: string;
    sideNavCollapsed: boolean;
    inPopover: boolean;
    _sideNavigation: SideNavigation;
    /**
     * Defines if the item's group is disabled.
     * @private
     * @default false
     * @since 2.10.0
     */
    _groupDisabled: boolean;
    onEnterDOM(): void;
    get _tooltip(): string | undefined;
    get hasSubItems(): boolean;
    get effectiveDisabled(): boolean;
    get classesArray(): string[];
    get _classes(): string;
    get effectiveTabIndex(): number | undefined;
    get sideNavigation(): SideNavigation;
    set sideNavigation(sideNavigation: SideNavigation);
    get isFixedItem(): boolean;
    get isSideNavigationItemBase(): boolean;
    /**
     * @private
     */
    applyInitialFocusInPopover(): void;
}
export default SideNavigationItemBase;
export type { SideNavigationItemClickEventDetail, };
export declare const isInstanceOfSideNavigationItemBase: (object: any) => object is SideNavigationItemBase;
