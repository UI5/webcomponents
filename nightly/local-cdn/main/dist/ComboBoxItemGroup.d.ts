import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IComboBoxItem } from "./ComboBox.js";
import ListItemGroup from "./ListItemGroup.js";
import type ComboBoxItem from "./ComboBoxItem.js";
/**
 * @class
 * The `ui5-cb-group-item` is type of suggestion item,
 * that can be used to split the `ui5-combobox` suggestions into groups.
 * @constructor
 * @extends ListItemGroup
 * @abstract
 * @public
 * @implements {IComboBoxItem}
 * @since 1.0.0-rc.15
 */
declare class ComboBoxItemGroup extends ListItemGroup implements IComboBoxItem {
    eventDetails: ListItemGroup["eventDetails"];
    /**
     * Defines the items of the <code>ui5-cb-item-group</code>.
     * @public
     */
    items: DefaultSlot<ComboBoxItem>;
    get isGroupItem(): boolean;
    get _isVisible(): boolean;
}
export declare const isInstanceOfComboBoxItemGroup: (object: any) => object is ComboBoxItemGroup;
export default ComboBoxItemGroup;
