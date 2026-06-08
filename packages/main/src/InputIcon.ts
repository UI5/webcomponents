import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { IconData, UnsafeIconData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { getIconData, getIconDataSync } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import InputIconTemplate from "./InputIconTemplate.js";

// Styles
import inputIconCss from "./generated/themes/InputIcon.css.js";

const ICON_NOT_FOUND = "ICON_NOT_FOUND";

/**
 * @class
 *
 * ### Overview
 * The `ui5-input-icon` component represents an interactive icon that can be used in input fields.
 * It provides button-like behavior with hover, focus, and active states.
 *
 * ### Usage
 * The component is typically used to display action icons within input fields, such as
 * clear, search, or custom action buttons.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/InputIcon.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.6.0
 */
@customElement({
	tag: "ui5-input-icon",
	renderer: jsxRender,
	template: InputIconTemplate,
	styles: inputIconCss,
})
class InputIcon extends UI5Element {
	/**
	 * Defines the unique identifier (icon name) of the component.
	 *
	 * To browse all available icons, see the
	 * [SAP Icons](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html),
	 * [SAP Fiori Tools](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT) and
	 * [SAP Business Suite](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html)
	 *
	 * Example:
	 * `name='add'`, `name='delete'`, `name='employee'`.
	 *
	 * **Note:** To use the SAP Fiori Tools icons,
	 * you need to set the `tnt` prefix in front of the icon's name.
	 *
	 * Example:
	 * `name='tnt/antenna'`, `name='tnt/actor'`, `name='tnt/api'`.
	 *
	 * **Note:** To use the SAP Business Suite icons,
	 * you need to set the `business-suite` prefix in front of the icon's name.
	 *
	 * Example:
	 * `name='business-suite/3d'`, `name='business-suite/1x2-grid-layout'`, `name='business-suite/4x4-grid-layout'`.
	 * @default undefined
	 * @public
	 */
	@property()
	name?: string;

	/**
	 * Defines the text alternative of the component.
	 * If not provided a default text alternative will be set, if present.
	 *
	 * **Note:** Every icon should have a text alternative in order to
	 * calculate its accessible name.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the value state of the input component that contains this icon.
	 * Used internally for state-specific styling (focus colors, hover effects).
	 *
	 * Available options are:
	 * - `None`
	 * - `Negative`
	 * - `Critical`
	 * - `Positive`
	 * - `Information`
	 * @default "None"
	 * @public
	 * @since 2.6.0
	 */
	@property()
	valueState?: string = "None";

	/**
	 * @private
	 */
	@property({ type: Array, noAttribute: true })
	pathData: Array<string> = [];

	/**
	 * @private
	 */
	@property({ type: Object, noAttribute: true })
	accData?: I18nText;

	/**
	* @private
	*/
	@property({ type: Boolean })
	invalid = false;

	/**
	 * @private
	 */
	@property({ noAttribute: true })
	effectiveAccessibleName?: string;

	ltr?: boolean;
	packageName?: string;
	viewBox?: string;
	customTemplate?: object;
	customTemplateAsString?: string;

	async onBeforeRendering() {
		const name = this.name;
		if (!name) {
			return;
		}

		let iconData: typeof ICON_NOT_FOUND | IconData | UnsafeIconData | undefined = getIconDataSync(name);
		if (!iconData) {
			iconData = await getIconData(name);
		}

		if (!iconData) {
			this.invalid = true;
			/* eslint-disable-next-line */
			return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
		}

		if (iconData === ICON_NOT_FOUND) {
			this.invalid = true;
			/* eslint-disable-next-line */
			return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${name.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/AllIcons.js".`);
		}

		this.viewBox = iconData.viewBox || "0 0 512 512";

		if ("customTemplate" in iconData && iconData.customTemplate) {
			this.customTemplate = executeTemplate(iconData.customTemplate, this);
		}

		if ("customTemplateAsString" in iconData) {
			this.customTemplateAsString = iconData.customTemplateAsString;
		}

		// in case a new valid name is set, show the icon
		this.invalid = false;
		if ("pathData" in iconData && iconData.pathData) {
			this.pathData = Array.isArray(iconData.pathData) ? iconData.pathData : [iconData.pathData];
		}

		this.accData = iconData.accData;
		this.ltr = iconData.ltr;
		this.packageName = iconData.packageName;

		if (this.accessibleName) {
			this.effectiveAccessibleName = this.accessibleName;
		} else if (this.accData) {
			if (this.packageName) {
				const i18nBundle = await getI18nBundle(this.packageName);
				this.effectiveAccessibleName = i18nBundle.getText(this.accData) || undefined;
			} else {
				this.effectiveAccessibleName = this.accData?.defaultText || undefined;
			}
		} else {
			this.effectiveAccessibleName = undefined;
		}
	}

	/**
	* Enforce "ltr" direction, based on the icons collection metadata.
	*/
	get _dir() {
		return this.ltr ? "ltr" : undefined;
	}
}

InputIcon.define();

export default InputIcon;
