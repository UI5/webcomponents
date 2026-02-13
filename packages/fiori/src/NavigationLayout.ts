import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import NavigationLayoutMode from "./types/NavigationLayoutMode.js";
import type SideNavigation from "./SideNavigation.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

// Template
import NavigationLayoutTemplate from "./NavigationLayoutTemplate.js";

// Styles
import NavigationLayoutCss from "./generated/themes/NavigationLayout.css.js";
import type { SideNavigationItemClickEventDetail } from "./SideNavigationItemBase.js";

const SCREEN_WIDTH_BREAKPOINT = 600;

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
 * On larger screens with a width of 600px or more, excluding mobile phone devices, the side navigation is visible
 * by default and can be expanded or collapsed using the `mode` property.
 * On mobile phone devices and screens with a width of 599px or less, the side navigation is hidden by
 * default and can be displayed using the `mode` property.
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
@event("item-click", {
	bubbles: true,
	cancelable: true,
})
class NavigationLayout extends UI5Element {
	eventDetails!: {
		"item-click": SideNavigationItemClickEventDetail
	}
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
	sideCollapsed : boolean = this._isSmallScreen();

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

	private _itemClickHandler = this._handleItemClick.bind(this);
	private _sideNavigationItemClicked = false;

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
	header!: Slot<HTMLElement>;

	/**
	 * Defines the side content.
	 * @public
	 */
	@slot()
	sideContent!: Slot<SideNavigation>;

	/**
	 * Defines the content.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: DefaultSlot<HTMLElement>;

	onBeforeRendering() {
		if (!this._sideNavigationItemClicked) {
			this.calcSideCollapsed();
		}

		const sideNavigation = this.sideContent[0];
		this.hasSideNavigation = !!sideNavigation;

		if (sideNavigation && !this._sideNavigationItemClicked) {
			sideNavigation.collapsed = this.isSideCollapsed();
		}
	}

	onAfterRendering() {
		this._sideNavigationItemClicked = false;
		this._attachSideNavigationListeners();
	}

	onExitDOM() {
		this._detachSideNavigationListeners();
	}

	private _attachSideNavigationListeners() {
		const sideNavigation = this.sideContent[0];
		if (sideNavigation) {
			sideNavigation.addEventListener("item-click", this._itemClickHandler);
		}
	}

	private _detachSideNavigationListeners() {
		const sideNavigation = this.sideContent[0];
		if (sideNavigation) {
			sideNavigation.removeEventListener("item-click", this._itemClickHandler);
		}
	}

	private _handleItemClick() {
		if (this._isSmallScreen()) {
			this._sideNavigationItemClicked = true;
			this._collapseSideNavigation();
		}
	}

	private _isSmallScreen(): boolean {
		return isPhone() || window.innerWidth < SCREEN_WIDTH_BREAKPOINT;
	}

	private _collapseSideNavigation() {
		const sideNavigation = this.sideContent[0];
		if (sideNavigation) {
			sideNavigation.collapsed = true;
			this.sideCollapsed = true;
			this.mode = NavigationLayoutMode.Collapsed;
		}
	}

	calcSideCollapsed() {
		if (this.mode === NavigationLayoutMode.Auto) {
			this.sideCollapsed = this._isSmallScreen();
		} else {
			this.sideCollapsed = this.mode === NavigationLayoutMode.Collapsed;
		}
	}
}

NavigationLayout.define();

export default NavigationLayout;
