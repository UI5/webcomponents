import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";
import type MultiComboBoxItem from "./MultiComboBoxItem.js";
import type ListItemGroupHeader from "./ListItemGroupHeader.js";
import ComboBoxItemGroup from "./ComboBoxItemGroup.js";
/**
 * @class
 * The `ui5-mcb-item-group` is type of suggestion item,
 * that can be used to split the `ui5-multi-combobox` suggestions into groups.
 * @constructor
 * @extends ComboBoxItemGroup
 * @public
 * @implements {IMultiComboBoxItem}
 * @since 2.0.0
 */
declare class MultiComboBoxItemGroup extends ComboBoxItemGroup implements IMultiComboBoxItem {
    eventDetails: ComboBoxItemGroup["eventDetails"];
    /**
     * Defines the items of the <code>ui5-mcb-item-group</code>.
     * @public
     */
    items: DefaultSlot<MultiComboBoxItem>;
    /**
     * Used to avoid tag name checks
     * @protected
     */
    get isGroupItem(): boolean;
    get selected(): boolean;
    get stableDomRef(): string;
    getFocusDomRef(): ListItemGroupHeader;
}
export default MultiComboBoxItemGroup;
export declare const isInstanceOfMultiComboBoxItemGroup: (object: any) => object is MultiComboBoxItemGroup;
