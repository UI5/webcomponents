import type { IInputSuggestionItemSelectable } from "./Input.js";
import ListItemBase from "./ListItemBase.js";
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
declare class SuggestionItemCustom extends ListItemBase implements IInputSuggestionItemSelectable {
    eventDetails: ListItemBase["eventDetails"];
    /**
     * Defines the text of the `ui5-suggestion-item-custom`.
     * **Note:** The text property is considered only for autocomplete.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the content of the component.
     *
     * @public
     */
    content: DefaultSlot<Node>;
    get _effectiveTabIndex(): number;
}
export default SuggestionItemCustom;
