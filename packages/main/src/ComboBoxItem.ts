import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { IComboBoxItem } from "./ComboBox.js";
import ListItemBase from "./ListItemBase.js";

import ComboBoxItemTemplate from "./ComboBoxItemTemplate.js";
import ComboboxItemCss from "./generated/themes/ComboBoxItem.css.js";

/**
 * @class
 * The `ui5-cb-item` represents the item for a `ui5-combobox`.
 * @constructor
 * @extends ListItemBase
 * @implements {IComboBoxItem}
 * @public
 */
@customElement({
	tag: "ui5-cb-item",
	template: ComboBoxItemTemplate,
	styles: [ListItemBase.styles, ComboboxItemCss],
})
class ComboBoxItem extends ListItemBase implements IComboBoxItem {
	eventDetails!: ListItemBase["eventDetails"];
	/**
	 * Defines the text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the additional text of the component.
	 * @default undefined
	 * @since 1.0.0-rc.11
	 * @public
	 */
	@property()
	additionalText?: string;

	/**
	 * Indicates whether the item is filtered
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isVisible = false;

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
	@property()
	value?: string;

	/**
	 * Indicates whether the item is focssed
	 * @protected
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * Indicates whether the item is selected
	 * @protected
	 * @deprecated use value property of the item and selectedValue property of the ComboBox instead
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines the markup text that will be displayed as suggestion.
	 * Used for highlighting the matching parts of the text.
	 *
	 * @since 2.4.0
	 * @private
	 */
	@property()
	markupText = "";
}

ComboBoxItem.define();

export default ComboBoxItem;
