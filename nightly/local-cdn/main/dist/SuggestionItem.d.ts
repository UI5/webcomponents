import type { IInputSuggestionItemSelectable } from "./Input.js";
import ListItemBase from "./ListItemBase.js";
/**
 * @class
 * The `ui5-suggestion-item` represents the suggestion item of the `ui5-input`.
 * @constructor
 * @extends ListItemBase
 * @abstract
 * @implements { IInputSuggestionItemSelectable }
 * @public
 */
declare class SuggestionItem extends ListItemBase implements IInputSuggestionItemSelectable {
    eventDetails: ListItemBase["eventDetails"];
    /**
     * Defines the text of the component.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the `additionalText`, displayed in the end of the item.
     * @default undefined
     * @since 1.0.0-rc.15
     * @public
     */
    additionalText?: string;
    /**
     * Defines the markup text that will be displayed as suggestion.
     * Used for highlighting the matching parts of the text.
     *
     * @since 2.0.0
     * @private
     */
    markupText: string;
    onEnterDOM(): void;
    get _effectiveTabIndex(): number;
}
export default SuggestionItem;
