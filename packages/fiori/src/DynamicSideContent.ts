import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SideContentPosition from "./types/SideContentPosition.js";
import SideContentVisibility from "./types/SideContentVisibility.js";
import SideContentFallDown from "./types/SideContentFallDown.js";
import DynamicSideContentTemplate from "./DynamicSideContentTemplate.js";
import type {
	AccessibilityAttributes,
} from "@ui5/webcomponents-base";

// Styles
import DynamicSideContentCss from "./generated/themes/DynamicSideContent.css.js";

// Texts
import {
	DSC_MAIN_ARIA_LABEL,
	DSC_SIDE_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Breakpoint-related constants
const S_M_BREAKPOINT = 720,	// Breakpoint between S and M screen sizes
	M_L_BREAKPOINT = 1024, // Breakpoint between M and L screen sizes
	L_XL_BREAKPOINT = 1440, // Breakpoint between L and XL screen sizes
	MINIMUM_WIDTH_BREAKPOINT = 960; // Minimum width of the control where main and side contents are side by side

type DynamicSideContentLayoutChangeEventDetail = {
	currentBreakpoint: string,
	previousBreakpoint: string | undefined,
	mainContentVisible: boolean,
	sideContentVisible: boolean,
}

type DynamicSideContentAriaAccessibilityAttributes = Pick<AccessibilityAttributes, "ariaLabel">;
type DynamicSideContentAccessibilityAttributes = {
	mainContent?: DynamicSideContentAriaAccessibilityAttributes,
	sideContent?: DynamicSideContentAriaAccessibilityAttributes,
}

/**
 * @class
 *
 * ### Overview
 *
 * The DynamicSideContent (`ui5-dynamic-side-content`) is a layout component that allows additional content
 * to be displayed in a way that flexibly adapts to different screen sizes. The side
 * content appears in a container next to or directly below the main content
 * (it doesn't overlay). When the side content is triggered, the main content becomes
 * narrower (if appearing side-by-side). The side content contains a separate scrollbar
 * when appearing next to the main content.
 *
 * ### Usage
 *
 * *When to use?*
 *
 * Use this component if you want to display relevant information that is not critical
 * for users to complete a task. Users should have access to all the key functions and
 * critical information in the app even if they do not see the side content. This is
 * important because on smaller screen sizes it may be difficult to display the side
 * content in a way that is easily accessible for the user.
 *
 * *When not to use?*
 *
 * Don't use it if you want to display navigation or critical information that prevents
 * users from completing a task when they have no access to the side content.
 *
 * ### Responsive Behavior
 *
 * Screen width \> 1440px
 *
 * - Main vs. side content ratio is 75 vs. 25 percent (with a minimum of 320px
 * each).
 * - If the application defines a trigger, the side content can be hidden.
 *
 * Screen width \<\= 1440px and \> 1024px
 *
 * - Main vs. side content ratio is 66.666 vs. 33.333 percent (with a minimum of
 * 320px each). If the side content width falls below 320 px, it automatically slides
 * under the main content, unless the app development team specifies that it should
 * disappear.
 *
 * Screen width \<\= 1024px and \> 720px
 *
 * - The side content ratio is fixed to 340px, and the main content takes the rest
 * of the width. Only if the `sideContentFallDown` is set to `OnMinimumWidth`
 * and screen width is \<\= 960px and \> 720px the side content falls below the main content.
 *
 * Screen width \<\= 720px (for example on a mobile device)
 *
 * - In this case, the side content automatically disappears from the screen (unless
 * specified to stay under the content by setting of `sideContentVisibility`
 * property to `AlwaysShow`) and can be triggered from a pre-set trigger
 * (specified within the app). When the side content is triggered, it replaces the main
 * content. We recommend that you always place the trigger for the side content in the
 * same location, such as in the app footer.
 *
 * A special case allows switching the comparison mode between the main and side content.
 * In this case, the screen is split into 50:50 percent for main vs. side content. The
 * responsive behavior of the equal split is the same as in the standard view - the
 * side content disappears on screen widths of less than 720 px and can only be
 * viewed by triggering it.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/DynamicSideContent.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.1.0
 * @slot {Array<HTMLElement>} default - Defines the main content.
 */
@customElement({
	tag: "ui5-dynamic-side-content",
	renderer: jsxRenderer,
	styles: [DynamicSideContentCss],
	template: DynamicSideContentTemplate,
})
/**
 * Fires when the current breakpoint has been changed.
 * @param {string} currentBreakpoint the current breakpoint.
 * @param {string | undefined} previousBreakpoint the breakpoint that was active before change to current breakpoint.
 * @param {boolean} mainContentVisible visibility of the main content.
 * @param {boolean} sideContentVisible visibility of the side content.
 * @public
 */
@event("layout-change", {
	bubbles: true,
})
class DynamicSideContent extends UI5Element {
	eventDetails!: {
		"layout-change": DynamicSideContentLayoutChangeEventDetail
	}
	/**
	 * Defines the visibility of the main content.
	 * @default false
	 * @public
	 *
	 */
	@property({ type: Boolean })
	hideMainContent = false;

	/**
	 * Defines the visibility of the side content.
	 * @default false
	 * @public
	 *
	 */
	@property({ type: Boolean })
	hideSideContent = false;

	/**
	 * Defines whether the side content is positioned before the main content (left side
	 * in LTR mode), or after the the main content (right side in LTR mode).

	 * @default "End"
	 * @public
	 *
	 */
	@property()
	sideContentPosition: `${SideContentPosition}` = "End";

	/**
	 * Defines on which breakpoints the side content is visible.
 	 * @default "ShowAboveS"
	 * @public
	 *
	 */
	@property()
	sideContentVisibility: `${SideContentVisibility}` = "ShowAboveS";

	/**
	 * Defines on which breakpoints the side content falls down below the main content.
	 * @default "OnMinimumWidth"
	 * @public
	 *
	 */
	@property()
	sideContentFallDown: `${SideContentFallDown}` = "OnMinimumWidth";

	/**
	 * Defines whether the component is in equal split mode. In this mode, the side and
	 * the main content take 50:50 percent of the container on all screen sizes
	 * except for phone, where the main and side contents are switching visibility
	 * using the toggle method.
	 * @default false
	 * @public
	 *
	 */
	@property({ type: Boolean })
	equalSplit = false;

	/**
	* Defines additional accessibility attributes on different areas of the component.
	*
	* The accessibilityAttributes object has the following fields:
	*
	*  - **mainContent**: `mainContent.ariaLabel` defines the aria-label of the main content area. Accepts any string.
	*  - **sideContent**: `sideContent.ariaLabel` defines the aria-label of the side content area. Accepts any string.
	*
	* @default {}
	* @public
	* @since 2.6.0
	*/
	@property({ type: Object })
	accessibilityAttributes: DynamicSideContentAccessibilityAttributes = {};

	/**
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_toggled = false;

	/**
	 * @private
	 */
	@property({ noAttribute: true })
	_currentBreakpoint?: string;

	/**
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isSideContentBelowMainContent = false;

	/**
	 * Defines the side content.
	 * @public
	 */
	@slot()
	sideContent!: Array<HTMLElement>;

	@query(".ui5-dsc-main")
	_mainContent!: HTMLElement;

	@query(".ui5-dsc-side")
	_sideContent!: HTMLElement;

	_resizeObserver?: ResizeObserver;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	onEnterDOM() {
		this._resizeObserver = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const width = entry.contentRect.width;
				let breakpoint: string;
				if (width <= S_M_BREAKPOINT) {
					breakpoint = "S";
				} else if (width <= M_L_BREAKPOINT) {
					breakpoint = "M";
				} else if (width <= L_XL_BREAKPOINT) {
					breakpoint = "L";
				} else {
					breakpoint = "XL";
				}

				this._isSideContentBelowMainContent = this.isSideContentBelowMainContent;

				if (breakpoint !== this._currentBreakpoint) {
					this.fireDecoratorEvent("layout-change", {
						currentBreakpoint: breakpoint,
						previousBreakpoint: this._currentBreakpoint,
						mainContentVisible: this._getMainContentVisibility(),
						sideContentVisible: this._getSideContentVisibility(),
					});
					this._currentBreakpoint = breakpoint;
				}
			});
		});
		this._resizeObserver.observe(this);
	}

	onExitDOM() {
		this._resizeObserver?.disconnect();
	}

	/**
	 * Toggles visibility of main and side contents on S screen size (mobile device).
	 * @public
	 */
	toggleContents(): void {
		if (this._isToggleEnabled) {
			this._toggled = !this._toggled;
		}
	}

	/**
	 * Gets main content visibility by checking CSS display property
	 * @private
	 */
	_getMainContentVisibility(): boolean {
		if (!this._mainContent) {
			return false;
		}

		const computedStyle = getComputedStyle(this._mainContent);
		return computedStyle.display !== "none";
	}

	/**
	 * Gets side content visibility by checking CSS display property
	 * @private
	 */
	_getSideContentVisibility(): boolean {
		if (!this._sideContent) {
			return false;
		}

		const computedStyle = getComputedStyle(this._sideContent);
		return computedStyle.display !== "none";
	}

	get classes() {
		return {
			main: {
				"ui5-dsc-main": true,
			},
			side: {
				"ui5-dsc-side": true,
			},
			root: {
				"ui5-dsc-root": true,
				"ui5-dsc-toggled": this._toggled,
			},
		};
	}

	get isSideContentBelowMainContent() {
		if (this.sideContentVisibility === SideContentVisibility.NeverShow) {
			return false;
		}

		// Cases when side content falls below main content
		const fallOnMinimumWidth = this.sideContentFallDown === SideContentFallDown.OnMinimumWidth && this._currentBreakpoint === this.sizeM && this.containerWidth <= MINIMUM_WIDTH_BREAKPOINT;
		const fallBelowM = this.sideContentFallDown === SideContentFallDown.BelowM && (this._currentBreakpoint === this.sizeM || this._currentBreakpoint === this.sizeS);
		const fallBelowL = this.sideContentFallDown === SideContentFallDown.BelowL && (this._currentBreakpoint === this.sizeM || this._currentBreakpoint === this.sizeS);
		const fallBelowXL = this.sideContentFallDown === SideContentFallDown.BelowXL
			&& (this._currentBreakpoint === this.sizeL || this._currentBreakpoint === this.sizeM || this._currentBreakpoint === this.sizeS)
			&& this._currentBreakpoint !== this.sizeXL;
		const fallWhenAlwaysShow = this.sideContentVisibility === SideContentVisibility.AlwaysShow && (
			this._currentBreakpoint === this.sizeS
			|| (this._currentBreakpoint === this.sizeM && this.containerWidth <= MINIMUM_WIDTH_BREAKPOINT)
		);

		return fallOnMinimumWidth || fallBelowM || fallBelowL || fallBelowXL || fallWhenAlwaysShow;
	}

	get styles() {
		this._isSideContentBelowMainContent = this.isSideContentBelowMainContent;

		return {
			root: {
				"flex-wrap": "nowrap",
			},
			main: {
				"height": this._isSideContentBelowMainContent ? "auto" : "100%",
			},
			side: {
				"height": this._isSideContentBelowMainContent ? "auto" : "100%",
			},
		};
	}

	get accInfo(): DynamicSideContentAccessibilityAttributes {
		return {
			mainContent: {
				ariaLabel: this.accessibilityAttributes.mainContent?.ariaLabel || DynamicSideContent.i18nBundle.getText(DSC_MAIN_ARIA_LABEL),
			},
			sideContent: {
				ariaLabel: this.accessibilityAttributes.sideContent?.ariaLabel || DynamicSideContent.i18nBundle.getText(DSC_SIDE_ARIA_LABEL),
			},
		};
	}

	get sizeS() {
		return "S";
	}

	get sizeM() {
		return "M";
	}

	get sizeL() {
		return "L";
	}

	get sizeXL() {
		return "XL";
	}

	get containerWidth() {
		return this.clientWidth;
	}

	get breakpoint(): string {
		const width = this.containerWidth;

		if (width <= S_M_BREAKPOINT) {
			return this.sizeS;
		}
		if (width <= M_L_BREAKPOINT) {
			return this.sizeM;
		}
		if (width <= L_XL_BREAKPOINT) {
			return this.sizeL;
		}
		return this.sizeXL;
	}

	get _isSideContentFirst() {
		return this.sideContentPosition === SideContentPosition.Start;
	}

	/**
	 * Returns true when the toggleContents functionality should be enabled.
	 * Toggle is available when side content would normally be hidden in the current breakpoint
	 * but can be shown via the toggle mechanism.
	 * @private
	 */
	get _isToggleEnabled(): boolean {
		// Never allow toggle when NeverShow is set or content is explicitly hidden
		if (this.sideContentVisibility === SideContentVisibility.NeverShow
			|| this.hideMainContent
			|| this.hideSideContent) {
			return false;
		}

		const currentBreakpoint = this.breakpoint;

		// S breakpoint: toggle available unless AlwaysShow
		if (currentBreakpoint === this.sizeS) {
			return this.sideContentVisibility !== SideContentVisibility.AlwaysShow;
		}

		// For other breakpoints, check if side content would be hidden based on visibility setting
		const breakpointHierarchy = {
			[this.sizeM]: [SideContentVisibility.ShowAboveM, SideContentVisibility.ShowAboveL],
			[this.sizeL]: [SideContentVisibility.ShowAboveL],
		};

		const hiddenVisibilities = breakpointHierarchy[currentBreakpoint];
		return hiddenVisibilities?.includes(this.sideContentVisibility as SideContentVisibility) ?? false;
	}
}

DynamicSideContent.define();

export default DynamicSideContent;
export type {
	DynamicSideContentLayoutChangeEventDetail,
	DynamicSideContentAccessibilityAttributes,
};
