import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "./ListItem.js";
import type { IAccessibleListItem } from "./ListItem.js";
import type WrappingType from "./types/WrappingType.js";
import type { ExpandableTextTemplateParams } from "./types/ExpandableTextTemplateParams.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type ExpandableTextTemplate = (this: ListItemStandard, params: ExpandableTextTemplateParams) => JSX.Element;
/**
 * @class
 * The `ui5-li` represents the simplest type of item for a `ui5-list`.
 *
 * This is a list item,
 * providing the most common use cases such as `text`,
 * `image` and `icon`.

 * @csspart title - Used to style the title of the list item
 * @csspart description - Used to style the description of the list item
 * @csspart additional-text - Used to style the additionalText of the list item
 * @csspart icon - Used to style the icon of the list item
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 * @constructor
 * @extends ListItem
 * @public
 */
declare class ListItemStandard extends ListItem implements IAccessibleListItem {
    /**
     * Defines the text of the component.
     *
     * @default undefined
     * @public
     * @since 2.10.0
     */
    text?: string;
    /**
     * Defines the description displayed right under the item text, if such is present.
     * @default undefined
     * @public
     * @since 0.8.0
     */
    description?: string;
    /**
     * Defines the `icon` source URI.
     *
     * **Note:**
     * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
     * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines whether the `icon` should be displayed in the beginning of the list item or in the end.
     *
     * @default false
     * @public
     */
    iconEnd: boolean;
    /**
     * Defines the `additionalText`, displayed in the end of the list item.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    additionalText?: string;
    /**
     * Defines the state of the `additionalText`.
     *
     * Available options are: `"None"` (by default), `"Positive"`, `"Critical"`, `"Information"` and `"Negative"`.
     * @default "None"
     * @public
     * @since 1.0.0-rc.15
     */
    additionalTextState: `${ValueState}`;
    /**
     * Defines whether the item is movable.
     * @default false
     * @public
     * @since 2.0.0
     */
    movable: boolean;
    /**
     * Defines the text alternative of the component.
     * Note: If not provided a default text alternative will be set, if present.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
     * Defines if the text of the component should wrap when it's too long.
     * When set to "Normal", the content (title, description) will be wrapped
     * using the `ui5-expandable-text` component.<br/>
     *
     * The text can wrap up to 100 characters on small screens (size S) and
     * up to 300 characters on larger screens (size M and above). When text exceeds
     * these limits, it truncates with an ellipsis followed by a text expansion trigger.
     *
     * Available options are:
     * - `None` (default) - The text will truncate with an ellipsis.
     * - `Normal` - The text will wrap (without truncation).
     *
     * @default "None"
     * @public
     * @since 2.10.0
     */
    wrappingType: `${WrappingType}`;
    /**
     * Indicates if the list item has text content.
     * @private
     */
    hasTitle: boolean;
    _hasImage: boolean;
    /**
     * The expandableText template.
     * @private
     */
    expandableTextTemplate?: ExpandableTextTemplate;
    /**
     * Defines the custom formatted text of the component.
     *
     * **Note:** For optimal text wrapping and a consistent layout, it is strongly recommended to use the `text` property.
     *
     * Use the `default` slot only when custom formatting with HTML elements (e.g., `<b>`, `<i>`) is required.
     * Be aware that wrapping (via `wrappingType="Normal"`) may not function correctly with custom HTML content in the `default` slot.
     *
     * If both `text` and `default` slot are used, the `text` property takes precedence.
     * @public
     */
    content: DefaultSlot<Node>;
    /**
     * **Note:** While the slot allows option for setting custom avatar, to match the
     * design guidelines, please use the `ui5-avatar` with it's default size - S.
     *
     * **Note:** If bigger `ui5-avatar` needs to be used, then the size of the
     * `ui5-li` should be customized in order to fit.
     * @since 2.0.0
     * @public
     */
    image: Slot<HTMLElement>;
    onBeforeRendering(): void;
    /**
     * Returns the content text, either from text property or from the default slot
     * @private
     */
    get _textContent(): string;
    /**
     * Determines the maximum characters to display based on the current media range.
     * - Size S: 100 characters
     * - Size M and larger: 300 characters
     * @private
     */
    get _maxCharacters(): number;
    get displayIconBegin(): boolean;
    get displayIconEnd(): boolean;
    get hasImage(): boolean;
    static ExpandableTextTemplate?: ExpandableTextTemplate;
}
export default ListItemStandard;
