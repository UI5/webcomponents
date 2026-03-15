import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { AriaRole } from "@ui5/webcomponents-base/dist/types.js";
import ListItemBase from "./ListItemBase.js";
import type { ExpandableTextTemplateParams } from "./types/ExpandableTextTemplateParams.js";
import ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";
import type WrappingType from "./types/WrappingType.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
type ExpandableTextTemplate = (this: ListItemGroupHeader, params: ExpandableTextTemplateParams) => JSX.Element;
/**
 * @class
 * The `ui5-li-group-header` is a special list item, used only to separate other list items into logical groups.
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @constructor
 * @extends ListItemBase
 * @private
 */
declare class ListItemGroupHeader extends ListItemBase {
    eventDetails: ListItemBase["eventDetails"];
    /**
     * Defines the text alternative of the component.
     *
     * **Note:** If not provided a default text alternative will be set, if present.
     * @default undefined
     * @public
     */
    accessibleName?: string;
    accessibleRole: `${ListItemAccessibleRole}`;
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
     * @since 2.15.0
     */
    wrappingType: `${WrappingType}`;
    /**
     * Defines the current media query size.
     * @default "S"
     * @private
     */
    mediaRange: string;
    /**
     * The expandableText template.
     * @private
     */
    expandableTextTemplate?: ExpandableTextTemplate;
    subItems: Slot<HTMLElement>;
    static i18nBundle: I18nBundle;
    get effectiveAccRole(): AriaRole;
    get groupItem(): boolean;
    get _pressable(): boolean;
    get groupHeaderText(): string;
    get defaultSlotText(): string;
    get ariaLabelText(): string;
    get hasSubItems(): boolean;
    onBeforeRendering(): void;
    /**
     * Determines the maximum characters to display based on the current media range.
     * - Size S: 100 characters
     * - Size M and larger: 300 characters
     * @private
     */
    get _maxCharacters(): number;
    /**
     * Returns the content text, either from text property or from the default slot
     * @private
     */
    get _textContent(): string;
    static ExpandableTextTemplate?: ExpandableTextTemplate;
}
export default ListItemGroupHeader;
