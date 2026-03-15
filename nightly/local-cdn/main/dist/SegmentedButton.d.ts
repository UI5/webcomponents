import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "./SegmentedButtonItem.js";
import type SegmentedButtonItem from "./SegmentedButtonItem.js";
import SegmentedButtonSelectionMode from "./types/SegmentedButtonSelectionMode.js";
/**
 * Interface for components that may be slotted inside `ui5-segmented-button` as items
 * @public
 */
interface ISegmentedButtonItem extends UI5Element, ITabbable {
    disabled: boolean;
    selected: boolean;
}
type SegmentedButtonSelectionChangeEventDetail = {
    selectedItems: Array<ISegmentedButtonItem>;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-segmented-button` shows a group of items. When the user clicks or taps
 * one of the items, it stays in a pressed state. It automatically resizes the items
 * to fit proportionally within the component. When no width is set, the component uses the available width.
 *
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButton.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @public
 */
declare class SegmentedButton extends UI5Element {
    eventDetails: {
        "selection-change": SegmentedButtonSelectionChangeEventDetail;
    };
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.3
     */
    accessibleName?: string;
    /**
     * Defines the IDs of the HTML Elements that label the component.
     * @default undefined
     * @public
     * @since 2.15.0
     */
    accessibleNameRef?: string;
    /**
     * Defines the accessible description of the component.
     * @default undefined
     * @public
     * @since 2.15.0
     */
    accessibleDescription?: string;
    /**
     * Defines the IDs of the HTML Elements that describe the component.
     * @default undefined
     * @public
     * @since 2.15.0
     */
    accessibleDescriptionRef?: string;
    /**
     * Defines the component selection mode.
     * @default "Single"
     * @public
     * @since 1.14.0
     */
    selectionMode: `${SegmentedButtonSelectionMode}`;
    /**
     * Determines whether the segmented button items should be sized to fit their content.
     *
     * If set to `true`, each item will be sized to fit its content, with any extra space distributed after the last item.
     * If set to `false` (the default), all items will be equally sized to fill the available space.
     *
     * @default false
     * @public
     * @since 2.16.0
    */
    itemsFitContent: boolean;
    /**
     * Defines the items of `ui5-segmented-button`.
     *
     * **Note:** Multiple items are allowed.
     *
     * **Note:** Use the `ui5-segmented-button-item` for the intended design.
     * @public
     */
    items: DefaultSlot<ISegmentedButtonItem>;
    static i18nBundle: I18nBundle;
    _itemNavigation: ItemNavigation;
    hasPreviouslyFocusedItem: boolean;
    _selectedItem?: ISegmentedButtonItem;
    _cancelAction: boolean;
    _isSpacePressed: boolean;
    constructor();
    onBeforeRendering(): void;
    normalizeSelection(): void;
    getFocusDomRef(): HTMLElement | undefined;
    _selectItem(e: MouseEvent | KeyboardEvent): this | undefined;
    _applySingleSelection(item: ISegmentedButtonItem): void;
    _onclick(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onmousedown(e: MouseEvent): void;
    _onfocusin(e: FocusEvent): void;
    /**
     * Returns an array of the currently selected items.
     * @since 1.14.0
     * @public
     * @default []
     */
    get selectedItems(): Array<ISegmentedButtonItem>;
    get navigatableItems(): SegmentedButtonItem[];
    get ariaLabelText(): string | undefined;
    get ariaDescriptionText(): string;
    get ariaRoleDescription(): string;
}
export default SegmentedButton;
export type { SegmentedButtonSelectionChangeEventDetail, ISegmentedButtonItem, };
