import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type { IInputSuggestionItemSelectable } from "./Input.js";
import ListItemBase from "./ListItemBase.js";

// Template
import SuggestionItemCustomTemplate from "./SuggestionItemCustomTemplate.js";

// styles
import styles from "./generated/themes/SuggestionItemCustom.css.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 * The `ui5-suggestion-item-custom` is type of suggestion item,
 * that can be used to place suggestion items with custom content in the input.
 * The text property is considered only for autocomplete.
 * In case the user needs highlighting functionality, check "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js"
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @implements { IInputSuggestionItemSelectable }
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-suggestion-item-custom",
	template: SuggestionItemCustomTemplate,
	styles: [
		ListItemBase.styles,
		styles,
	],
})
class SuggestionItemCustom extends ListItemBase implements IInputSuggestionItemSelectable {
	eventDetails!: ListItemBase["eventDetails"];

	/**
	 * Defines the text of the `ui5-suggestion-item-custom`.
	 * **Note:** The text property is considered only for autocomplete.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the content of the component.
	 *
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	content!: DefaultSlot<Node[]>;

	get _effectiveTabIndex() {
		return -1;
	}
}

SuggestionItemCustom.define();

export default SuggestionItemCustom;
