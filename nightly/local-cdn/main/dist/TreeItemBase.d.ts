import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "./ListItem.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type TreeItemBaseEventDetail = {
    item: TreeItemBase;
};
type TreeItemBaseToggleEventDetail = TreeItemBaseEventDetail;
type TreeItemBaseStepInEventDetail = TreeItemBaseEventDetail;
type TreeItemBaseStepOutEventDetail = TreeItemBaseEventDetail;
/**
 * A class to serve as a foundation
 * for the `TreeItem` and `TreeItemCustom` classes.
 * @abstract
 * @constructor
 * @extends ListItem
 * @public
 */
declare class TreeItemBase extends ListItem {
    eventDetails: ListItem["eventDetails"] & {
        toggle: TreeItemBaseToggleEventDetail;
        "step-in": TreeItemBaseStepInEventDetail;
        "step-out": TreeItemBaseStepOutEventDetail;
    };
    /**
     * Defines the indentation of the tree list item. Use level 1 for tree list items, representing top-level tree nodes.
     * @protected
     * @default 1
     */
    level: number;
    /**
     * If set, an icon will be displayed before the text of the tree list item.
     * @public
     * @default undefined
     */
    icon?: string;
    /**
     * Defines whether the tree list item should display an expand/collapse button.
     * @default false
     * @protected
     */
    showToggleButton: boolean;
    /**
     * Defines whether the tree list item will show a collapse or expand icon inside its toggle button.
     * @default false
     * @public
     */
    expanded: boolean;
    /**
     * Defines whether the item is movable.
     * @default false
     * @public
     * @since 2.0.0
     */
    movable: boolean;
    /**
    * Defines whether the selection of a tree node is displayed as partially selected.
    *
    * **Note:** The indeterminate state can be set only programmatically and can’t be achieved by user
    * interaction, meaning that the resulting visual state depends on the values of the `indeterminate`
    * and `selected` properties:
    *
    * -  If a tree node has both `selected` and `indeterminate` set to `true`, it is displayed as partially selected.
    * -  If a tree node has `selected` set to `true` and `indeterminate` set to `false`, it is displayed as selected.
    * -  If a tree node has `selected` set to `false`, it is displayed as not selected regardless of the value of the `indeterminate` property.
    *
    * **Note:** This property takes effect only when the `ui5-tree` is in `Multiple` mode.
    * @default false
    * @public
    * @since 1.1.0
    */
    indeterminate: boolean;
    /**
     * Defines whether the tree node has children, even if currently no other tree nodes are slotted inside.
     *
     * **Note:** This property is useful for showing big tree structures where not all nodes are initially loaded due to performance reasons.
     * Set this to `true` for nodes you intend to load lazily, when the user clicks the expand button.
     * It is not necessary to set this property otherwise. If a tree item has children, the expand button will be displayed anyway.
     * @default false
     * @public
     */
    hasChildren: boolean;
    /**
     * Defines the state of the `additionalText`.
     *
     * Available options are: `"None"` (by default), `"Positive"`, `"Critical"`, `"Information"` and `"Negative"`.
     * @default "None"
     * @public
     * @since 1.0.0-rc.15
     */
    additionalTextState: `${ValueState}`;
    /**
     * Defines the accessible name of the component.
     * @default undefined
     * @public
     * @since 1.8.0
     */
    accessibleName?: string;
    /**
     * @private
     * @since 1.0.0-rc.11
     */
    forcedSetsize: number;
    /**
     * @private
     * @since 1.0.0-rc.11
     */
    forcedPosinset: number;
    /**
     * Defines if the item should be collapsible or not.
     * @private
     * @default false
     * @since 1.10.0
     */
    _fixed: boolean;
    /**
     * @private
     */
    _hasImage: boolean;
    /**
     * Defines the items of the component.
     *
     * **Note:** Use `ui5-tree-item` or `ui5-tree-item-custom`
     * @public
     */
    items: DefaultSlot<TreeItemBase>;
    /**
     * **Note:** While the slot allows option for setting custom avatar, to match the
     * design guidelines, please use the `ui5-avatar` with size XS.
     *
     * **Note:** If bigger `ui5-avatar` needs to be used, then the size of the
     * `ui5-tree-item` should be customized in order to fit.
     * @since 2.10.0
     * @public
     */
    image: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    get classes(): ClassMap;
    get styles(): {
        preContent: {
            "padding-inline-start": string;
        };
    };
    get requiresToggleButton(): boolean;
    get effectiveLevel(): number;
    get hasParent(): boolean;
    get hasImage(): boolean;
    get _toggleIconName(): "navigation-right-arrow" | "navigation-down-arrow";
    get _ariaLabel(): string;
    get _accInfo(): {
        role: "treeitem";
        ariaExpanded: boolean | undefined;
        ariaLevel: number;
        posinset: number;
        setsize: number;
        ariaSelectedText: string | undefined;
        listItemAriaLabel: string | undefined;
        ariaOwns: string | undefined;
        ariaHaspopup: import("@ui5/webcomponents-base/dist/types.js").AriaHasPopup | undefined;
        ariaLabel: string;
        ariaLabelRadioButton: string;
        ariaSelected?: boolean;
        ariaChecked?: boolean;
        tooltip?: string;
        ariaKeyShortcuts?: string;
    };
    /**
     * Used to duck-type TreeItem elements without using instanceof
     * @default true
     * @protected
     */
    get isTreeItem(): boolean;
    /**
     * Call this method to manually switch the `expanded` state of a tree item.
     * @public
     */
    toggle(): void;
    _toggleClick(e: MouseEvent | KeyboardEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    get iconAccessibleName(): string;
}
export default TreeItemBase;
export type { TreeItemBaseToggleEventDetail, TreeItemBaseStepInEventDetail, TreeItemBaseStepOutEventDetail, };
