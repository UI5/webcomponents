import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ViewSettingsCustomTabTemplate from "./ViewSettingsCustomTabTemplate.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-view-settings-custom-tab` component allows defining custom tabs for the `ui5-view-settings-dialog`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/ViewSettingsCustomTab.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.21.0
 * @public
 * @abstract
 * @slot {Node[]} default - Defines the custom tab content.
 */
@customElement({
	tag: "ui5-view-settings-custom-tab",
	renderer: jsxRenderer,
	template: ViewSettingsCustomTabTemplate,
})
class ViewSettingsCustomTab extends UI5Element {
	/**
	 * Defines the title of the custom tab.
	 *
	 * **Note:** It is displayed in the dialog header when this tab is selected.
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	title = "";

	/**
	 * Defines the tooltip of the custom tab button.
	 *
	 * **Note:** It is shown on the segmented button item.
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	tooltip = "";

	/**
	 * Defines the icon of the custom tab.
	 *
	 * **Note:** If not provided, the segmented button item is rendered with text.
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether the custom tab is selected initially.
	 *
	 * **Note:** If multiple custom tabs are marked as selected, the first one is used.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines the custom tab content.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	content!: DefaultSlot<Node>;

	_individualSlot?: string;
}

ViewSettingsCustomTab.define();

export default ViewSettingsCustomTab;
