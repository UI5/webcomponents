import type { IComboBoxItem } from "./ComboBox.js";
import ListItemBase from "./ListItemBase.js";
/**
 * @class
 * The `ui5-cb-item` represents the item for a `ui5-combobox`.
 * @constructor
 * @extends ListItemBase
 * @implements {IComboBoxItem}
 * @public
 */
declare class ComboBoxItem extends ListItemBase implements IComboBoxItem {
    eventDetails: ListItemBase["eventDetails"];
    /**
     * Defines the text of the component.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the additional text of the component.
     * @default undefined
     * @since 1.0.0-rc.11
     * @public
     */
    additionalText?: string;
    /**
     * Indicates whether the item is filtered
     * @private
     */
    _isVisible: boolean;
    /**
     * Indicates whether the item is focssed
     * @protected
     */
    focused: boolean;
    /**
     * Indicates whether the item is selected
     * @protected
     */
    selected: boolean;
    /**
     * Defines the markup text that will be displayed as suggestion.
     * Used for highlighting the matching parts of the text.
     *
     * @since 2.4.0
     * @private
     */
    markupText: string;
}
export default ComboBoxItem;
