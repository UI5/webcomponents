import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import ListItem from "./ListItem.js";
/**
 * @class
 *
 * A component to be used as custom list item within the `ui5-list`
 * the same way as the standard `ui5-li`.
 *
 * The component accepts arbitrary HTML content to allow full customization.
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 * @slot {Node[]} default - Defines the content of the component.
 * @constructor
 * @extends ListItem
 * @public
 */
declare class ListItemCustom extends ListItem {
    /**
     * Defines whether the item is movable.
     * @default false
     * @public
     * @since 2.0.0
     */
    movable: boolean;
    /**
     * Defines the text alternative of the component.
     *
     * **Note**: If not provided a default text alternative will be set, if present.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    _onkeydown(e: KeyboardEvent): Promise<void>;
    _onkeyup(e: KeyboardEvent): void;
    get classes(): ClassMap;
}
export default ListItemCustom;
