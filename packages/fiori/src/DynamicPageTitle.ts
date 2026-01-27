import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import type Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import type { ToolbarMinWidthChangeEventDetail } from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarItemOverflowBehavior from "@ui5/webcomponents/dist/types/ToolbarItemOverflowBehavior.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import type Title from "@ui5/webcomponents/dist/Title.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

// Template
import DynamicPageTitleTemplate from "./DynamicPageTitleTemplate.js";

// Styles
import DynamicPageTitleCss from "./generated/themes/DynamicPageTitle.css.js";

// Texts
import {
	DYNAMIC_PAGE_ARIA_DESCR_TOGGLE_HEADER,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * Title of the `DynamicPage`.
 *
 * The `DynamicPageTitle` component is part of the `DynamicPage`
 * family and is used to serve as title of the `DynamicPage`.
 *
 * ### Usage
 *
 * The `DynamicPageTitle` can hold any component and displays the most important
 * information regarding the object that will always remain visible while scrolling.
 *
 * **Note:** The `actions` slot accepts any UI5 web component, but it's
 * recommended to use `ui5-toolbar`.
 *
 * The user can switch between the expanded/collapsed states of the
 * `DynamicPage` by clicking on the `DynamicPageTitle`
 * or by using the expand/collapse visual indicators, positioned at the bottom of the
 * `DynamicPageTitle` and the `DynamicPageHeader` inside `ui5-dynamic-page-header-actions`.
 *
 * ### Responsive Behavior
 *
 * The responsive behavior of the `DynamicPageTitle` depends on the behavior of the
 * content that is displayed.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-dynamic-page-title",
	fastNavigation: true,
	renderer: jsxRenderer,
	styles: DynamicPageTitleCss,
	template: DynamicPageTitleTemplate,
})

/**
 * Event is fired when the title is toggled.
 * @private
 */
@event("toggle-title", {
	bubbles: true,
})

class DynamicPageTitle extends UI5Element {
	eventDetails!: {
		"toggle-title": void;
	}
	/**
	 * Defines if the title is snapped.
	 *
	 * @protected
	 * @default false
	 */
	@property({ type: Boolean })
	snapped = false;

	/**
	 * Defines if the mobileNavigationActions are shown.
	 *
	 * @private
	 */
	@property({ type: Boolean })
	mobileNavigationActions = false;

	/**
	 * Indicates if the elements is on focus
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * Defines the minimum width of the content area.
	 * @private
	 */
	@property({ type: Number })
	minContentWidth?: number;

	/**
	 * Defines the minimum width of the actions area.
	 * @private
	 */
	@property({ type: Number })
	minActionsWidth?: number;

	/**
	 * Indicates whether the title has snapped on mobile devices.
	 * @private
	 */
	@property({ type: Boolean })
	hasSnappedTitleOnMobile = false;

	/**
	 * Defines the content of the Heading of the Dynamic Page.
	 *
	 * The font size of the title within the `heading` slot can be adjusted to the recommended values using the following CSS variables:
	 *
	 * **Expanded:** `var(--sapObjectHeader_Title_FontSize)`
	 *
	 * **Collapsed:** `var(--sapObjectHeader_Title_SnappedFontSize)`
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	heading!: Slot<HTMLElement[]>;

	/**
	 * Defines the heading that is shown only when the header is snapped.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	snappedHeading!: Slot<HTMLElement[]>;

	/**
	 * Defines the content of the snapped title on mobile devices.
	 *
	 * This slot is displayed only when the `DynamicPageTitle` is in the snapped state on mobile devices.
	 * It should be used to provide a simplified, single-line title that takes up less space on smaller screens.
	 *
	 * **Note:**
	 * - The content set in this slot **overrides** all other content set in the `DynamicPageTitle` slots when displayed.
	 * - The slot is intended for a single `ui5-title` component.
	 *
	 * @public
	 * @since 2.3.0
	 */
	@slot({ type: HTMLElement })
	snappedTitleOnMobile!: Slot<Array<Title>>;

	/**
	 * Defines the bar with actions in the Dynamic page title.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	actionsBar!: Slot<HTMLElement[]>;

	/**
	 * Defines the bar with navigation actions in the Dynamic page title.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	navigationBar!: Slot<Array<Toolbar>>;

	/**
	 * Defines the content of the Dynamic page title.
	 *
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement })
	content!: DefaultSlot<HTMLElement[]>;

	/**
	 * Defines the content of the title that is shown only when the header is not snapped.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	subheading!: Slot<HTMLElement[]>;

	/**
	 * Defines the content of the title that is shown only when the header is snapped.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	snappedSubheading!: Slot<HTMLElement[]>;

	/**
	 * Defines the content of the breadcrumbs inside Dynamic Page Title.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	breadcrumbs!: Slot<HTMLElement[]>;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	interactive = false;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	_handleResize: ResizeObserverCallback;

	constructor() {
		super();
		this._handleResize = this.handleResize.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	onBeforeRendering() {
		this.prepareLayoutActions();
	}

	get hasContent() {
		return !!this.content.length;
	}

	get headingSlotName() {
		if (!this.snapped) {
			return "heading";
		}
		return "snappedHeading";
	}

	get subheadingSlotName() {
		return !this.snapped ? "subheading" : "snappedSubheading";
	}

	get _tabIndex() {
		return this.interactive ? 0 : undefined;
	}

	get _headerExpanded() {
		return !this.snapped;
	}

	get _role() {
		return this.interactive ? "button" : undefined;
	}

	get _ariaDescribedBy() {
		return this.interactive ? `${this._id}-toggle-description` : undefined;
	}

	get _ariaDescribedbyText() {
		return this.interactive ? DynamicPageTitle.i18nBundle.getText(DYNAMIC_PAGE_ARIA_DESCR_TOGGLE_HEADER) : undefined;
	}

	get _ariaLabelledBy() {
		if (!this.interactive) {
			return undefined;
		}

		const hasAnyHeading = this[this.headingSlotName].length;
		if (hasAnyHeading) {
			return `${this._id}-heading`;
		}
	}

	get _needsSeparator(): boolean {
		return (this.navigationBar.length > 0 && this.actionsBar.length > 0);
	}

	get forAriaExpanded() {
		return this.interactive ? this._headerExpanded : undefined;
	}

	prepareLayoutActions() {
		const navigationBar = this.querySelector<Toolbar>("[ui5-toolbar][slot='navigationBar']"),
			isWideScreen = this.offsetWidth >= 1280;

		if (!navigationBar) {
			return;
		}

		navigationBar.items.forEach(action => {
			action.overflowPriority = isWideScreen
				? ToolbarItemOverflowBehavior.NeverOverflow
				: ToolbarItemOverflowBehavior.Default;
		});
	}

	handleResize() {
		this.mobileNavigationActions = this.offsetWidth < 1280;
	}

	onMinContentWidthChange(e: CustomEvent<ToolbarMinWidthChangeEventDetail>) {
		const slotName = (<HTMLElement>e.target)?.assignedSlot?.name;
		if (!slotName || slotName === "content") {
			this.minContentWidth = e.detail.minWidth;
		} else if (slotName === "actionsBar") {
			this.minActionsWidth = e.detail.minWidth;
		}
	}

	onTitleClick() {
		this.fireDecoratorEvent("toggle-title");
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e) || isSpace(e)) {
			e.preventDefault();
			this.fireDecoratorEvent("toggle-title");
		}
	}
}

DynamicPageTitle.define();

export default DynamicPageTitle;
