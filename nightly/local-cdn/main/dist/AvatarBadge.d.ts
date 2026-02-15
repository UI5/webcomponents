import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-avatar-badge` component is used to display a badge on top of `ui5-avatar` component.
 * The badge can display an icon and supports different states for visual affordance.
 *
 * ### Usage
 *
 * The badge should be used as a child element of `ui5-avatar` in the `badge` slot.
 *
 * ```html
 * <ui5-avatar>
 *   <ui5-avatar-badge icon="edit" slot="badge"></ui5-avatar-badge>
 * </ui5-avatar>
 * ```
 *
 * ### Keyboard Handling
 *
 * The badge does not receive keyboard focus.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/AvatarBadge.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.19.0
 * @public
 */
declare class AvatarBadge extends UI5Element {
    /**
     * Defines the icon name to be displayed inside the badge.
     *
     * **Note:** You should import the desired icon first, then use its name as "icon".
     *
     * `import "@ui5/webcomponents-icons/dist/{icon_name}.js"`
     *
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines the state of the badge, which determines its styling.
     *
     * Available options:
     * - `None` (default) - Standard appearance
     * - `Positive` - Green, used for success/approved states
     * - `Critical` - Orange, used for warning states
     * - `Negative` - Red, used for error/rejected states
     * - `Information` - Blue, used for informational states
     *
     * @default "None"
     * @public
     */
    state: `${ValueState}`;
    /**
     * @private
     */
    invalid: boolean;
    onBeforeRendering(): void;
}
export default AvatarBadge;
