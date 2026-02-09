import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";

import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";

// Template
import DynamicPageTemplate from "./DynamicPageTemplate.js";

// Styles
import DynamicPageCss from "./generated/themes/DynamicPage.css.js";

import DynamicPageHeader from "./DynamicPageHeader.js";
import DynamicPageTitle from "./DynamicPageTitle.js";
import type DynamicPageHeaderActions from "./DynamicPageHeaderActions.js";

// Texts
import {
	DYNAMIC_PAGE_ARIA_LABEL_EXPANDED_HEADER,
	DYNAMIC_PAGE_ARIA_LABEL_SNAPPED_HEADER,
} from "./generated/i18n/i18n-defaults.js";

import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

const SCROLL_DEBOUNCE_RATE = 5; // ms
const SCROLL_THRESHOLD = 10; // px
/**
 * @class
 *
 * ### Overview
 *
 * A layout component, representing a web page, consisting of a title, header with dynamic behavior, a content area, and an optional floating footer.
 *
 * The component consist of several components:
 *
 * - `DynamicPageTitle` - a component, holding the title of the page, the navigation actions and the content. The displayed content changes based on the current mode of the `DynamicPageHeader`.
 * - `DynamicPageHeader` - a generic container, which can contain a single layout component and any other HTML elements. The header works in two modes - expanded and snapped and its behavior can be adjusted with the help of different properties.
 * - `Content area` - a generic container, which can have a single UI5 layout.
 * - `Footer` - positioned at the bottom with a small offset and used for additional actions, the footer floats above the content.
 *
 * ### Usage
 *
 * Use the `DynamicPage` if you need to have a title, that is always visible
 * and a header, that has configurable Expanding/Snapping functionality.
 * If you don't need the Expanding/Snapping functionality it is better to use the
 * `ui5-page` as a lighter component.
 *
 * The app can add to the `default` slot of the ui5-dynamic-page either content that is designed to fit its container (e.g. has 100% height),
 * or content with own height that may overflow its container. In the second case the `DynamicPage` will show a scrollbar that allows the user
 * scroll through the content.
 *
 * ## Notes:
 *
 * - Snapping of the `DynamicPageTitle` is not supported in the following case:
 *  - When the `DynamicPage` has a scroll bar, the component usually scrolls to the snapping point - the point, where the `DynamicPageHeader` is scrolled out completely. However, when there is a scroll bar, but not enough content to reach the snapping point, the snapping is not possible using scrolling.
 *
 * ### Responsive Behavior
 *
 * Dynamic page web component implements the responsive paddings design.
 *
 * ### Keyboard Handling
 *
 *
 * ### Basic Navigation
 *
 * - [SPACE, ENTER, RETURN] - If focus is on a button inside DynamicPageTitle its action is being triggered, once activated.
 * If focus is on the snap header button (arrow button), or on the header itself, once activated, it triggers the associated action (such as snap/expand the header).
 * If focus is on pin button (the button with pin icon on the bottom of the header), once activated, it triggers the associated action (pinning of the header).
 *
 * ### Fast Navigation
 * - This component provides a build in fast navigation group which can be used via `F6 / Shift + F6` or ` Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up`.
 * In order to use this functionality, you need to import the following module:
 *
 * - `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/DynamicPage.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 * @csspart content - Used to style the content of the component
 * @csspart fit-content - Used to style the fit content container of the component.
 * @csspart footer - Used to style the footer of the component
 */
@customElement({
	tag: "ui5-dynamic-page",
	renderer: jsxRenderer,
	styles: DynamicPageCss,
	template: DynamicPageTemplate,
})

/**
 * Fired when the pin header button is toggled.
 *
 * @public
 */
@event("pin-button-toggle", {
	bubbles: true,
})

/**
 * Fired when the expand/collapse area of the title is toggled.
 *
 * @public
 */
@event("title-toggle", {
	bubbles: true,
})

class DynamicPage extends UI5Element {
	eventDetails!: {
		"pin-button-toggle": void;
		"title-toggle": void;
	}
	/**
	 * Defines if the pin button is hidden.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hidePinButton = false;

	/**
	 * Defines if the header is pinned.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	headerPinned = false;

	/**
	 * Defines if the footer is shown.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showFooter = false;

	/**
	 * Defines the content of the Dynamic Page.
	 *
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement })
	content!: DefaultSlot<HTMLElement>;

	/**
	 * Defines the title HTML Element.
	 *
	 * @public
	 */
	@slot({ type: DynamicPageTitle })
	titleArea!: Slot<DynamicPageTitle>;

	/**
	 * Defines the header HTML Element.
	 *
	 * @public
	 */
	@slot({ type: DynamicPageHeader })
	headerArea!: Slot<DynamicPageHeader>;

	/**
	 * Defines the footer HTML Element.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	footerArea!: Slot<HTMLElement>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	skipSnapOnScroll = false;
	showHeaderInStickArea = false;
	isToggled = false;

	@property({ type: Boolean })
	_headerSnapped = false;

	@query(".ui5-dynamic-page-scroll-container")
	scrollContainer?: HTMLElement;

	@query("[ui5-dynamic-page-header-actions]")
	headerActions?: DynamicPageHeaderActions;

	constructor() {
		super();
	}

	onBeforeRendering() {
		if (this.dynamicPageTitle) {
			this.dynamicPageTitle.snapped = this._headerSnapped;
			this.dynamicPageTitle.interactive = this.hasHeading;
			this.dynamicPageTitle.hasSnappedTitleOnMobile = !!this.hasSnappedTitleOnMobile;
			this.dynamicPageTitle.removeAttribute("hovered");
		}
		if (this.dynamicPageHeader) {
			this.dynamicPageHeader._snapped = this._headerSnapped;
		}
	}

	get endAreaHeight() {
		return this.showFooter ? this.footerWrapper?.getBoundingClientRect().height || 0 : 0;
	}

	get topAreaHeight() {
		const titleHeight = this.dynamicPageTitle?.getBoundingClientRect().height || 0;
		const headerHeight = this.dynamicPageHeader?.getBoundingClientRect().height || 0;
		return this._headerSnapped ? titleHeight : headerHeight + titleHeight;
	}

	get dynamicPageTitle(): DynamicPageTitle | null {
		return this.querySelector<DynamicPageTitle>("[ui5-dynamic-page-title]");
	}

	get dynamicPageHeader(): DynamicPageHeader | null {
		return this.querySelector<DynamicPageHeader>("[ui5-dynamic-page-header]");
	}

	get footerWrapper() {
		return this.shadowRoot?.querySelector(".ui5-dynamic-page-footer");
	}

	get actionsInTitle(): boolean {
		return this._headerSnapped || this.showHeaderInStickArea || this.headerPinned;
	}

	get headerInTitle(): boolean {
		return !this._headerSnapped && (this.showHeaderInStickArea || this.headerPinned);
	}

	get headerInContent(): boolean {
		return !this.showHeaderInStickArea && !this.headerInTitle && !this.hasSnappedTitleOnMobile;
	}

	get _headerLabel() {
		return this._headerSnapped
			? DynamicPage.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_SNAPPED_HEADER)
			: DynamicPage.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_EXPANDED_HEADER);
	}

	get _headerExpanded() {
		return !this._headerSnapped;
	}

	get headerTabIndex() {
		return (this._headerSnapped || this.showHeaderInStickArea) ? -1 : 0;
	}

	get headerAriaHidden() {
		return (this._headerSnapped || this.showHeaderInStickArea);
	}

	get hasHeading() {
		return this.headerArea.length > 0;
	}

	get headerSnapped(): boolean {
		return this._headerSnapped;
	}

	get hasSnappedTitleOnMobile() {
		return isPhone() && this.headerSnapped && this.dynamicPageTitle?.snappedTitleOnMobile.length;
	}

	get headerAriaLabel() {
		return this.hasHeading ? this._headerLabel : undefined;
	}

	/**
	 * Defines if the header is snapped.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	set headerSnapped(snapped: boolean) {
		if (snapped !== this._headerSnapped) {
			this._toggleHeader();
		}
	}

	snapOnScroll() {
		debounce(() => this.snapTitleByScroll(), SCROLL_DEBOUNCE_RATE);
	}

	snapTitleByScroll() {
		if (!this.dynamicPageTitle || !this.dynamicPageHeader || this.headerPinned) {
			return;
		}

		if (this.isToggled) {
			this.isToggled = false;
			return;
		}

		if (this.skipSnapOnScroll) {
			this.skipSnapOnScroll = false;
			return;
		}

		const scrollTop = this.scrollContainer!.scrollTop;
		const headerHeight = this.dynamicPageHeader.getBoundingClientRect().height;
		const lastHeaderSnapped = this._headerSnapped;

		if (this._headerSnapped && scrollTop > headerHeight) {
			this.showHeaderInStickArea = false;
		}

		const shouldSnap = !this._headerSnapped && scrollTop > headerHeight + SCROLL_THRESHOLD;
		const shouldExpand = this._headerSnapped && (scrollTop < headerHeight - SCROLL_THRESHOLD
			|| (!scrollTop && !headerHeight));

		if (shouldSnap) {
			this.showHeaderInStickArea = false;
			this._headerSnapped = true;

			//* snappedTitleOnMobile
			// If the header is snapped and the scroll is at the top, scroll down a bit
			// to avoid ending in an endless loop of snapping and unsnapping
			requestAnimationFrame(() => {
				if (this.scrollContainer!.scrollTop === 0) {
					this.scrollContainer!.scrollTop = SCROLL_THRESHOLD;
				}
			});
		} else if (shouldExpand) {
			this._headerSnapped = false;
		}

		// Fire event if snapped state changed
		if (lastHeaderSnapped !== this._headerSnapped) {
			this.fireDecoratorEvent("title-toggle");
		}
	}

	async onExpandClick() {
		this.isToggled = true;
		this._toggleHeader();
		this.fireDecoratorEvent("title-toggle");
		await renderFinished();
		this.headerActions?.focusExpandButton();

		if (this.hasSnappedTitleOnMobile) {
			this.dynamicPageTitle?.focus();
		}

		announce(this._headerLabel, InvisibleMessageMode.Polite);
	}

	async onPinClick() {
		this.headerPinned = !this.headerPinned;
		if (this.headerPinned) {
			this.showHeaderInStickArea = true;
		} else if (this.scrollContainer!.scrollTop === 0) {
			this.showHeaderInStickArea = false;
		}
		this.fireDecoratorEvent("pin-button-toggle");
		await renderFinished();
		this.headerActions?.focusPinButton();
	}

	async onToggleTitle() {
		if (!this.hasHeading) {
			return;
		}
		this.isToggled = true;
		this._toggleHeader();
		this.fireDecoratorEvent("title-toggle");
		await renderFinished();
		this.dynamicPageTitle!.focus();
	}

	async _toggleHeader() {
		const headerHeight = this.dynamicPageHeader?.getBoundingClientRect().height || 0;
		const currentScrollTop = this.scrollContainer!.scrollTop;

		if (!this._headerSnapped && this.headerPinned) {
			this.headerPinned = false;
			this.fireDecoratorEvent("pin-button-toggle");
		}

		if (currentScrollTop <= SCROLL_THRESHOLD) {
			this._headerSnapped = !this._headerSnapped;
			this.showHeaderInStickArea = this._headerSnapped;
			return;
		}

		if (currentScrollTop > SCROLL_THRESHOLD && currentScrollTop < headerHeight) {
			if (!this._headerSnapped) {
				this._headerSnapped = true;
				this.showHeaderInStickArea = true;
				this.scrollContainer!.scrollTop = 0;
			} else {
				this.showHeaderInStickArea = false;
				this._headerSnapped = false;
			}
			return;
		}

		if (this.scrollContainer!.scrollTop === SCROLL_THRESHOLD) {
			this.scrollContainer!.scrollTop = 0;
		}

		this.showHeaderInStickArea = !this.showHeaderInStickArea;
		this._headerSnapped = !this._headerSnapped;

		this.skipSnapOnScroll = true;

		await renderFinished();
		if (this._headerSnapped && this.scrollContainer!.scrollTop < SCROLL_THRESHOLD) {
			this.scrollContainer!.scrollTop = SCROLL_THRESHOLD;
		}
	}

	onExpandHoverIn() {
		this.dynamicPageTitle?.setAttribute("hovered", "");
	}

	onExpandHoverOut() {
		this.dynamicPageTitle?.removeAttribute("hovered");
	}

	onContentFocusIn(e: FocusEvent) {
		const target = e.target as HTMLElement;
		this.setScrollPadding({ start: this.topAreaHeight, end: this.endAreaHeight });
		// textareas and similar elements appear "in view" even when partially
		// hidden behind sticky header/footer.
		// manual scroll brings them fully into view.
		// another issue is that browsers do not reflect dynamic changes of scroll-padding
		requestAnimationFrame(() => {
			target.scrollIntoView({ behavior: "smooth", block: "nearest" });
		});
	}

	onContentFocusOut() {
		// Reset scroll padding when focus leaves content (e.g., moves to sticky header).
		// The sticky header is part of the scrollable area, so keeping padding causes unwanted scroll.
		this.setScrollPadding({ start: 0, end: 0 });
	}

	setScrollPadding(padding: { start: number, end: number }) {
		this.scrollContainer?.style.setProperty("scroll-padding-top", `${padding.start}px`);
		this.scrollContainer?.style.setProperty("scroll-padding-bottom", `${padding.end}px`);
	}
}

DynamicPage.define();

export default DynamicPage;
