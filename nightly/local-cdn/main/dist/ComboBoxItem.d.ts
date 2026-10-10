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
     * Defines the value of the `ui5-cb-item`.
     *
     * Use this property to associate a unique identifier or machine-readable value with the item,
     * separate from the display text. This enables:
     * - Selecting items programmatically via `selectedValue` on the ComboBox
     * - Submitting machine-readable values in forms
     * - Distinguishing between items with identical display text
     *
     * **When to use:**
     * - **Recommended:** Use the `value` property on items together with `selectedValue` on the ComboBox when you need unique identifiers
     * - Omit `value` if the display text (`text` property) is sufficient for your use case
     *
     * **Example:**
     * ```html
     * <ui5-combobox selected-value="DE">
     *   <ui5-cb-item text="Germany" value="DE"></ui5-cb-item>
     *   <ui5-cb-item text="France" value="FR"></ui5-cb-item>
     * </ui5-combobox>
     * ```
     *
     * @default undefined
     * @public
     * @since 2.20.0
     */
    value?: string;
    /**
     * Indicates whether the item is focssed
     * @protected
     */
    focused: boolean;
    /**
     * Indicates whether the item is selected
     * @protected
     * @deprecated use value property of the item and selectedValue property of the ComboBox instead
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
