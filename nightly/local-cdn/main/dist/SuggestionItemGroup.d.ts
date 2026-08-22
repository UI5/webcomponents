import type SuggestionListItem from "./SuggestionListItem.js";
import ListItemGroup from "./ListItemGroup.js";
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
declare class SuggestionItemGroup extends ListItemGroup {
    /**
     * Defines the items of the <code>ui5-suggestion-item-group</code>.
     * @public
     */
    items: DefaultSlot<SuggestionListItem>;
}
export default SuggestionItemGroup;
