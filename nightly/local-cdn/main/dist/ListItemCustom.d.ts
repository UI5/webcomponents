import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ClassMap, AccessibilityInfo } from "@ui5/webcomponents-base/dist/types.js";
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
    static i18nBundle: I18nBundle;
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
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    get _accessibleNameRef(): string;
    _onfocusin(e: FocusEvent): void;
    _onfocusout(e: FocusEvent): void;
    /**
     * Checks if this element is currently being dragged
     * @returns True if this element is being dragged
     * @private
     */
    _isDragging(): boolean;
    private _updateInvisibleTextContent;
    private _clearInvisibleTextContent;
    /**
     * Gets delete button nodes to process for accessibility
     * @returns Array of nodes to process
     * @private
     */
    private _getDeleteButtonNodes;
    get classes(): ClassMap;
    get accessibilityInfo(): AccessibilityInfo;
}
export default ListItemCustom;
