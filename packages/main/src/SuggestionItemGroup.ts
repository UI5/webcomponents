import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type SuggestionListItem from "./SuggestionListItem.js";
import ListItemGroup from "./ListItemGroup.js";
import ListBoxItemGroupTemplate from "./ListBoxItemGroupTemplate.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 * The `ui5-suggestion-item-group` is type of suggestion item,
 * that can be used to split the `ui5-input` suggestions into groups.
 * @constructor
 * @extends ListItemGroup
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-suggestion-item-group",
	template: ListBoxItemGroupTemplate,
})
class SuggestionItemGroup extends ListItemGroup {
	/**
	 * Defines the items of the <code>ui5-suggestion-item-group</code>.
	 * @public
	 */
	@slot({
		"default": true,
		invalidateOnChildChange: true,
		type: HTMLElement,
	})
	items!: DefaultSlot<SuggestionListItem>;
}

SuggestionItemGroup.define();

export default SuggestionItemGroup;
