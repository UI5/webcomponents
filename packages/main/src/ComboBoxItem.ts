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
	 * Defines the value of the `ui5-combobox-item`.
	 * Used for selection. Check ComboBox' selectedValue property for more information.
	 * @default undefined
	 * @public
	 * @since 2.19.0
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
