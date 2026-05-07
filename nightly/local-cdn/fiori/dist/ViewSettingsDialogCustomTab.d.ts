import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-view-settings-dialog-custom-tab` component allows defining custom tabs for the `ui5-view-settings-dialog`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/ViewSettingsDialogCustomTab.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.22.0
 * @public
 * @abstract
 * @slot {Node[]} default - Defines the custom tab content.
 */
declare class ViewSettingsDialogCustomTab extends UI5Element {
    /**
     * Defines the title of the custom tab.
     *
     * **Note:** It is displayed in the dialog header when this tab is selected.
     * @default ""
     * @public
     */
    title: string;
    /**
     * Defines the tooltip of the custom tab button.
     *
     * **Note:** It is shown on the segmented button item.
     * @default ""
     * @public
     */
    tooltip: string;
    /**
     * Defines the icon of the custom tab.
     *
     * **Note:** If not provided, the tab should not be rendered.
     * @default ""
     * @public
     */
    icon: string;
    /**
     * Defines the custom tab content.
     * @public
     */
    content: DefaultSlot<Node>;
}
export default ViewSettingsDialogCustomTab;
