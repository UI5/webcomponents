import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-settings-view` represents a view displayed in the `ui5-user-settings-item`.
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.8.0
 */
declare class UserSettingsView extends UI5Element {
    /**
     * Defines the title text of the user settings view.
     *
     * @public
     * @default undefined
     */
    text?: string;
    /**
     * Defines whether the view is selected. There can be just one selected view at a time.
     *
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Indicates whether the view is secondary. It is relevant only if the view is used in `pages` slot of `ui5-user-settings-item`
     * and controls the visibility of the back button.
     * @default false
     * @public
     */
    secondary: boolean;
    /**
     * Defines the content of the view.
     *
     * @public
     */
    content: DefaultSlot<HTMLElement>;
}
export default UserSettingsView;
