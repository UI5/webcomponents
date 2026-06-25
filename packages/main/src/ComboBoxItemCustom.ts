import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type { IComboBoxItem } from "./ComboBox.js";
import ListItemBase from "./ListItemBase.js";
import ComboBoxItemCustomTemplate from "./ComboBoxItemCustomTemplate.js";
import styles from "./generated/themes/ComboBoxItemCustom.css.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

type ComboBoxItemCustomClickEventDetail = {
	item?: ComboBoxItemCustom,
	originalEvent: Event,
}

/**
 * @class
 * The `ui5-cb-item-custom` is a combobox item component
 * that allows placing custom content inside a combobox item.
 * The `text` property is used for filtering and auto-complete.
 * For highlighting functionality, see `@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js`.
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
/**
 * Fired when the component is activated either with a mouse/tap or by using the Enter or Space key.
 *
 * **Note:** The event will not be fired if the `disabled` property is set to `true`.
 *
 * @since 2.24.0
 * @public
 * @param {Event} originalEvent The original event from the user interaction.
 */
@event("click", {
	bubbles: true,
})
class ComboBoxItemCustom extends ListItemBase implements IComboBoxItem {
	eventDetails!: {
		"click": ComboBoxItemCustomClickEventDetail,
		"request-tabindex-change": FocusEvent,
		"_press": ListItemBase["eventDetails"]["_press"],
		"_focused": FocusEvent,
		"forward-after": void,
		"forward-before": void,
	};

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
	 * Used for programmatic selection via the `selectedValue` property.
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
export type { ComboBoxItemCustomClickEventDetail };
