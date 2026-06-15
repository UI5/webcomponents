import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type { IComboBoxItem } from "./ComboBox.js";
import ListItemBase from "./ListItemBase.js";
import ComboBoxItemCustomTemplate from "./ComboBoxItemCustomTemplate.js";
import styles from "./generated/themes/ComboBoxItemCustom.css.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 * The `ui5-cb-item-custom` is a combobox item component
 * that can be used to place custom content in the combobox item.
 * The text property is used for filtering and auto-complete.
 * In case the user needs highlighting functionality, check "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js"
 *
 * @constructor
 * @extends ListItemBase
 * @implements {IComboBoxItem}
 * @public
 * @since 2.24.0
 */
@customElement({
	tag: "ui5-cb-item-custom",
	template: ComboBoxItemCustomTemplate,
	styles: [
		ListItemBase.styles,
		styles,
	],
})
class ComboBoxItemCustom extends ListItemBase implements IComboBoxItem {
	eventDetails!: ListItemBase["eventDetails"];

	/**
	 * Defines the text of the component.
	 * Used for filtering, autocomplete, and mobile rendering.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the value of the component.
	 * Used for programmatic selection via selectedValue property.
	 * @default undefined
	 * @public
	 */
	@property()
	value?: string;

	/**
	 * Indicates whether the item is filtered.
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isVisible = false;

	/**
	 * Indicates whether the item is focused.
	 * @protected
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * Defines the content of the component.
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	content!: DefaultSlot<Node>;

	get _effectiveTabIndex() {
		return -1;
	}
}

ComboBoxItemCustom.define();

export default ComboBoxItemCustom;
