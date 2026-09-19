import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";
import type { ToolbarArrowNavState } from "./IToolbarArrowNavProvider.js";
type ToolbarItemEventDetail = {
    targetRef: HTMLElement;
};
declare class ToolbarItemBase extends UI5Element {
    eventDetails: {
        "close-overflow": void;
    };
    /**
    * Property used to define the access of the item to the overflow Popover. If "NeverOverflow" option is set,
    * the item never goes in the Popover, if "AlwaysOverflow" - it never comes out of it.
    * @public
    * @default "Default"
    */
    overflowPriority: `${ToolbarItemOverflowBehavior}`;
    /**
     * Co-overflow tag. Items in the same `ui5-toolbar` whose `overflowGroup` is the same
     * non-empty string overflow as one atomic unit: either all visible in the bar, or all
     * in the overflow popover, never split. The empty string (the default) means "no group" —
     * the item participates in overflow independently.
     *
     * The tag is a free-form, case-sensitive string label (e.g. `"filters"`, `"search"`). It is
     * layout-only and carries no ARIA, keyboard, or visual-cluster semantics. Items in a
     * non-empty group must have `overflowPriority = "Default"`; `AlwaysOverflow` and
     * `NeverOverflow` are forbidden inside a group — setting one of those on a grouped item
     * emits a one-shot `console.warn` and the item's priority is treated as `Default` for
     * the layout pass. Spacers (`ui5-toolbar-spacer`) do not participate in grouping; setting
     * a non-empty `overflowGroup` on a spacer emits a one-shot `console.warn` and the spacer's
     * existing overflow behavior is unchanged.
     *
     * The visible bar always preserves slot order — ungrouped items between group members
     * keep their slot positions and the toolbar never reorders DOM children. In the popover
     * group members appear adjacent in slot order.
     *
     * @public
     * @default undefined
     * @since 2.27.0
     */
    overflowGroup?: string;
    /**
     * Defines if the toolbar overflow popup should close upon interaction with the item.
     * It will close by default.
     * @default false
     * @public
     */
    preventOverflowClosing: boolean;
    _getNavigationTargets(): HTMLElement[];
    /**
     * Focus entry point when toolbar navigates into this item.
     * Override in complex items (e.g., Breadcrumbs) to handle direction-aware entry.
     * @private
     */
    focusForToolbarNavigation(isForward: boolean): void;
    getArrowNavState(): ToolbarArrowNavState | undefined;
    _isOverflowed: boolean;
    _overflowGroupPriorityWarned: boolean;
    _overflowGroupSpacerWarned: boolean;
    get isOverflowed(): boolean;
    /**
     * Defines if the toolbar item is overflowed.
     * @default false
     * @protected
     * @since 2.11.0
     */
    set isOverflowed(value: boolean);
    _maxWidth: number;
    _isRendering: boolean;
    onAfterRendering(): void;
    /**
     * Emits one-time developer warnings for invalid `overflowGroup` configurations.
     * Called once per render from `onAfterRendering` so getters stay pure.
     * Each warning fires at most once per element lifetime via one-shot guards.
     */
    validateOverflowGroupConstraints(): void;
    /**
    * Defines if the width of the item should be ignored in calculating the whole width of the toolbar
    * @protected
    */
    get ignoreSpace(): boolean;
    /**
     * Returns if the item is flexible. An item that is returning true for this property will make
     * the toolbar expand to fill the 100% width of its container.
     * @protected
     */
    get hasFlexibleWidth(): boolean;
    /**
     * Returns if the item is interactive.
     * This value is used to determinate if the toolbar should have its accessibility role and attributes set.
     * At least two interactive items are needed for the toolbar to have the role="toolbar" attribute set.
     * @protected
     */
    get isInteractive(): boolean;
    get isToolbarNavigatable(): boolean;
    get hasOverflow(): boolean;
    /**
     * Returns if the item is separator.
     * @protected
     */
    get isSeparator(): boolean;
    /**
     * Returns if the item is a spacer.
     * A spacer item is an item that takes space in the toolbar, but does not render any content.
     * @protected
     * @since 2.21.0
     */
    get isSpacer(): boolean;
    /**
     * Returns the `overflowPriority` actually used by the toolbar's distribution
     * algorithm. Items in a non-empty `overflowGroup` must have `Default` priority;
     * when a developer puts `AlwaysOverflow` or `NeverOverflow` on a
     * grouped non-spacer item, the priority is treated as `"Default"` for layout.
     * Spacers are exempt from this rule and keep their declared priority.
     *
     * @protected
     */
    get effectiveOverflowPriority(): `${ToolbarItemOverflowBehavior}`;
    /**
     * Returns the `overflowGroup` actually used by the toolbar's distribution
     * algorithm. Spacers cannot participate in grouping; a spacer
     * with a non-empty `overflowGroup` returns `""` so the spacer is treated
     * as ungrouped by the algorithm.
     *
     * @protected
     */
    get effectiveOverflowGroup(): string | undefined;
    get stableDomRef(): string;
    get classes(): {
        root: {
            "ui5-tb-popover-item": boolean;
            "ui5-tb-item": boolean;
        };
    };
    get styles(): {};
}
export type { ToolbarItemEventDetail, };
export default ToolbarItemBase;
