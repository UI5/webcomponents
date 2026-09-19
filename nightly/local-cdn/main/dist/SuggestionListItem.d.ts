import ListItemStandard from "./ListItemStandard.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 * The `ui5-li-suggestion-item` represents the suggestion item in the `ui5-input`
 * suggestion popover.
 * @constructor
 * @extends ListItemStandard
 * @csspart title - Used to style the title of the suggestion list item
 * @csspart description - Used to style the description of the suggestion list item
 * @csspart info - Used to style the info of the suggestion list item
 */
declare class SuggestionListItem extends ListItemStandard {
    /**
     * Defines a description that can contain HTML.
     * **Note:** If not specified, the `description` property will be used.
     * @since 1.0.0-rc.8
     * @public
     */
    richDescription: Slot<HTMLElement>;
    /**
     * Defines the title text of the suggestion item.
     * @public
     */
    titleText: DefaultSlot<Node>;
    onBeforeRendering(): void;
    get effectiveTitle(): string;
    get hasDescription(): string | true | undefined;
    get groupItem(): boolean;
}
export default SuggestionListItem;
