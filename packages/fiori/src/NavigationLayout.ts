import UI5Element, { customElement, property, slot, jsxRenderer, Device } from "@ui5/webcomponents-base";

import type NavigationLayoutMode from "./types/NavigationLayoutMode.js";
import type SideNavigation from "./SideNavigation.js";

// Template
import NavigationLayoutTemplate from "./NavigationLayoutTemplate.js";

// Styles
import NavigationLayoutCss from "./generated/themes/NavigationLayout.css.js";

const {
	isPhone,
	isTablet,
	isCombi,
} = Device;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-navigation-layout` is a container component that can be used to
 * create a layout with a header, a side navigation and a content area.
 *
 * ### Usage
 *
 * Use the `ui5-navigation-layout` to create whole screen of an application with vertical navigation.
 *
 * ### Responsive Behavior
 *
 * On desktop and tablet devices, the side navigation is visible
 * by default and can be expanded or collapsed using the `mode` property.
 * On phone devices, the side navigation is hidden by default and can
 * be displayed using the `mode` property.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NavigationLayout.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.4.0
 * @public
 */
@customElement({
	tag: "ui5-navigation-layout",
	languageAware: true,
	renderer: jsxRenderer,
	styles: [
		NavigationLayoutCss,
	],
	template: NavigationLayoutTemplate,
})
class NavigationLayout extends UI5Element {
	_defaultSideCollapsed = isPhone() || (isTablet() && !isCombi());

	/**
	 * Specifies the navigation layout mode.
	 * @default "Auto"
	 * @public
	 */
	@property()
	mode: `${NavigationLayoutMode}` = "Auto";

	/**
	 * @private
	 */
	@property({ type: Boolean })
	sideCollapsed : boolean = this._defaultSideCollapsed;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	hasSideNavigation = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	isPhone = isPhone();

	/**
	 * @private
	 */
	@property({ type: Boolean })
	isTablet = isTablet() && !isCombi();

	/**
	 * Gets whether the side navigation is collapsed.
	 * @public
	 */
	isSideCollapsed() : boolean {
		this.calcSideCollapsed();
		return this.sideCollapsed;
	}

	/**
	 * Defines the header.
	 * @public
	 */
	@slot()
	header!: Array<HTMLElement>;

	/**
	 * Defines the side content.
	 * @public
	 */
	@slot()
	sideContent!: Array<SideNavigation>;

	/**
	 * Defines the content.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	onBeforeRendering() {
		this.calcSideCollapsed();

		if (isPhone()) {
			return;
		}

		const sideNavigation = this.sideContent[0];
		this.hasSideNavigation = !!sideNavigation;

		if (sideNavigation) {
			sideNavigation.collapsed = this.isSideCollapsed();
		}
	}

	calcSideCollapsed() {
		if (this.mode === "Auto") {
			this.sideCollapsed = this._defaultSideCollapsed;
		} else {
			this.sideCollapsed = this.mode === "Collapsed";
		}
	}
}

NavigationLayout.define();

export default NavigationLayout;
