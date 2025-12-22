import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { AriaRole } from "@ui5/webcomponents-base/dist/types.js";
import type { IconData, UnsafeIconData } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { getIconData, getIconDataSync } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import IconTemplate from "./IconTemplate.js";
import type IconDesign from "./types/IconDesign.js";
import IconMode from "./types/IconMode.js";

import { ICON_ARIA_TYPE_IMAGE, ICON_ARIA_TYPE_INTERACTIVE } from "./generated/i18n/i18n-defaults.js";

// Styles
import iconCss from "./generated/themes/Icon.css.js";

/**
 * Interface for components that represent an icon, usable in numerous higher-order components
 * @public
 */
interface IIcon extends HTMLElement { }

const ICON_NOT_FOUND = "ICON_NOT_FOUND";

/**
 * @class
 * ### Overview
 *
 * The `ui5-icon` component represents an SVG icon.
 * There are two main scenarios how the `ui5-icon` component is used:
 * as a purely decorative element,
 * or as an interactive element that can be focused and clicked.
 *
 * ### Usage
 *
 * 1. **Get familiar with the icons collections.**
 *
 * Before displaying an icon, you need to explore the icons collections to find and import the desired icon.
 *
 * Currently there are 3 icons collection, available as 3 npm packages:
 *
 * - [@ui5/webcomponents-icons](https://www.npmjs.com/package/@ui5/webcomponents-icons) represents the "SAP-icons" collection and includes the following
 * [icons](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons).
 * - [@ui5/webcomponents-icons-tnt](https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt) represents the "tnt" collection and includes the following
 * [icons](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT).
 * - [@ui5/webcomponents-icons-business-suite](https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite) represents the "business-suite" collection and includes the following
 * [icons](https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols).
 *
 * 2. **After exploring the icons collections, add one or more of the packages as dependencies to your project.**
 *
 * `npm i @ui5/webcomponents-icons`
 * `npm i @ui5/webcomponents-icons-tnt`
 * `npm i @ui5/webcomponents-icons-business-suite`
 *
 * 3. **Then, import the desired icon**.
 *
 * `import "@ui5/\{package_name\}/dist/\{icon_name\}.js";`
 *
 * **For Example**:
 *
 * For the standard "SAP-icons" icon collection, import an icon from the `@ui5/webcomponents-icons` package:
 *
 * `import "@ui5/webcomponents-icons/dist/employee.js";`
 *
 * For the "tnt" (SAP Fiori Tools) icon collection, import an icon from the `@ui5/webcomponents-icons-tnt` package:
 *
 * `import "@ui5/webcomponents-icons-tnt/dist/antenna.js";`
 *
 * For the "business-suite" (SAP Business Suite) icon collection, import an icon from the `@ui5/webcomponents-icons-business-suite` package:
 *
 * `import "@ui5/webcomponents-icons-business-suite/dist/ab-testing.js";`
 *
 * 4. **Display the icon using the `ui5-icon` web component.**
 * Set the icon collection ("SAP-icons", "tnt" or "business-suite" - "SAP-icons" is the default icon collection and can be skipped)
 * and the icon name to the `name` property.
 *
 * `<ui5-icon name="employee"></ui5-icon>`
 * `<ui5-icon name="tnt/antenna"></ui5-icon>`
 * `<ui5-icon name="business-suite/ab-testing"></ui5-icon>`
 *
 * ### Keyboard Handling
 *
 * - [Space] / [Enter] or [Return] - Fires the `click` event if the `mode` property is set to `Interactive`.
 * - [Shift] - If [Space] / [Enter] or [Return] is pressed, pressing [Shift] releases the ui5-icon without triggering the click event.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Icon.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-icon`.
 * @constructor
 * @extends UI5Element
 * @implements {IIcon}
 * @public
 */
@customElement({
	tag: "ui5-icon",
	languageAware: true,
	themeAware: true,
	renderer: jsxRender,
	template: IconTemplate,
	styles: iconCss,
})
/**
 * Fired on mouseup, `SPACE` and `ENTER`.
 * - on mouse click, the icon fires native `click` event
 * - on `SPACE` and `ENTER`, the icon fires custom `click` event
 * @public
 * @since 2.11.0
 */
@event("click", {
	bubbles: true,
})
class Icon extends UI5Element implements IIcon {
	eventDetails!: {
		click: void
	}

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	/**
	 * Defines the component semantic design.
	 * @default "Default"
	 * @public
	 * @since 1.9.2
	 */
	@property()
	design: `${IconDesign}` = "Default";

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
	 * Defines whether the component should have a tooltip.
	 *
	 * **Note:** The tooltip text should be provided via the `accessible-name` property.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showTooltip = false;

	/**
	 * Defines the mode of the component.
	 * @default "Decorative"
	 * @public
	 * @since 2.0.0
	 */
	@property()
	mode: `${IconMode}` = "Decorative";

	/**
	 * @private
	 */
	@property({ type: Array })
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

	_onkeydown(e: KeyboardEvent) {
		if (this.mode !== IconMode.Interactive) {
			return;
		}

		if (isEnter(e)) {
			this.fireDecoratorEvent("click");
		}

		if (isSpace(e)) {
			e.preventDefault(); // prevent scrolling
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (this.mode === IconMode.Interactive && isSpace(e)) {
			this.fireDecoratorEvent("click");
		}
	}

	/**
	* Enforce "ltr" direction, based on the icons collection metadata.
	*/
	get _dir() {
		return this.ltr ? "ltr" : undefined;
	}

	get effectiveAriaHidden() {
		return this.mode === IconMode.Decorative ? "true" : undefined;
	}

	get _tabIndex() {
		return this.mode === IconMode.Interactive ? 0 : undefined;
	}

	get effectiveAccessibleRole() {
		switch (this.mode) {
		case IconMode.Interactive:
			return "button";
		case IconMode.Decorative:
			return "presentation";
		default:
			return "img";
		}
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

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

	get hasIconTooltip() {
		return this.showTooltip && this.effectiveAccessibleName;
	}

	_getAriaTypeDescription() {
		switch (this.mode) {
		case IconMode.Interactive:
			return Icon.i18nBundle.getText(ICON_ARIA_TYPE_INTERACTIVE);
		case IconMode.Image:
			return Icon.i18nBundle.getText(ICON_ARIA_TYPE_IMAGE);
		default:
			return "";
		}
	}

	get accessibilityInfo() {
		if (this.mode === IconMode.Decorative) {
			return {};
		}

		return {
			role: this.effectiveAccessibleRole as AriaRole,
			type: this._getAriaTypeDescription(),
			description: this.effectiveAccessibleName,
		};
	}
}

Icon.define();

export default Icon;
export type {
	IIcon,
};
