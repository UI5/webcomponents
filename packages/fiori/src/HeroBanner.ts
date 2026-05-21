import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

import type HeroBannerLayout from "./types/HeroBannerLayout.js";

// Template
import HeroBannerTemplate from "./HeroBannerTemplate.js";

// Styles
import HeroBannerCss from "./generated/themes/HeroBanner.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-hero-banner` is the main visual element that unifies all product homepages.
 * It is a flexible card designed to accommodate various elements depending on product needs.
 * The hero banner is a mandatory out-of-the-box element for product landing pages.
 *
 * ### Structure
 *
 * The HeroBanner consists of the following building blocks:
 *
 * - **Banner Canvas** - the visual base with a background color, optional background image and shadow.
 * - **Date** (optional) - contextual text at the top, typically showing the current date.
 * - **Salutation** (mandatory) - the main greeting header below the date, e.g. "Hello, John".
 * - **Free Blocks** (optional) - customizable content areas that can contain KPI cards, search components, text, buttons, etc.
 *
 * The hero banner scrolls away below the shell navigation when the user scrolls down the page. It is not sticky.
 *
 * ### Usage
 *
 * Use the `ui5-hero-banner` at the top of a product homepage to provide a personalized greeting
 * and quick access to key information or actions.
 *
 * The hero banner itself is non-interactive. However, interactive elements such as buttons, cards,
 * or search fields can be placed inside the free content slots and will follow their own
 * interactive states.
 *
 * ### Responsive Behavior
 *
 * The hero banner adapts to different screen sizes:
 * - On small screens (≤599px), split layouts (`HalfWidth`, `TwoThirds`) collapse to a single stacked column.
 * - On screens ≤1024px, the salutation text is truncated to a maximum of 3 lines.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/HeroBanner.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.12.0
 * @csspart canvas - Used to style the banner canvas container
 * @csspart content - Used to style the content area of the banner
 * @csspart header - Used to style the header area (salutation, date, header actions)
 * @csspart startContent - Used to style the start (default) content block
 * @csspart endContent - Used to style the end content block
 */
@customElement({
	tag: "ui5-hero-banner",
	renderer: jsxRenderer,
	styles: HeroBannerCss,
	template: HeroBannerTemplate,
})
class HeroBanner extends UI5Element {
	/**
	 * Defines the salutation text displayed in the hero banner.
	 *
	 * This is the main greeting header, typically a personalized message
	 * such as "Hello, John".
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	salutationText?: string;

	/**
	 * Defines the date or secondary text displayed above the salutation.
	 *
	 * Can be used to show the current date, a status message,
	 * or any other relevant contextual information.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	dateText?: string;

	/**
	 * Defines the layout of the free content blocks inside the hero banner.
	 *
	 * Available options are:
	 * - `FullWidth` - Content spans the full width below the salutation.
	 * - `HalfWidth` - Content is split 50/50 side by side.
	 * - `TwoThirds` - First block takes 2/3 width, second takes 1/3.
	 *
	 * @default "FullWidth"
	 * @public
	 */
	@property()
	layout: `${HeroBannerLayout}` = "FullWidth";

	/**
	 * Defines the URL of the background image for the hero banner canvas.
	 *
	 * When set, the image is displayed as a cover background on the hero banner.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	backgroundImage?: string;

	/**
	 * Defines the first (default) free content block of the hero banner.
	 *
	 * This is the default slot — content placed directly inside `<ui5-hero-banner>`
	 * without a slot attribute lands here.
	 * Can contain KPI cards, search components, text, buttons, and more.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	startContent!: DefaultSlot<HTMLElement>;

	/**
	 * Defines the second free content block of the hero banner.
	 *
	 * Used alongside `startContent` in split layouts (`HalfWidth`, `TwoThirds`).
	 * Can contain cards, buttons, and other interactive elements.
	 *
	 * @public
	 */
	@slot()
	endContent!: Slot<HTMLElement>;

	/**
	 * Defines action buttons displayed to the right of the salutation and date area.
	 *
	 * Can contain buttons, links, or other interactive elements that provide
	 * quick access to relevant actions directly from the hero banner header.
	 *
	 * @public
	 */
	@slot()
	headerActions!: Slot<HTMLElement>;

	get _backgroundImageStyle(): Record<string, string> | undefined {
		if (this.backgroundImage) {
			// Sanitize: strip characters that can break out of CSS url('...')
			const sanitized = this.backgroundImage.replace(/['"()\\]/g, "");
			return { "--_ui5_banner_user_image": `url('${sanitized}')` };
		}
		return undefined;
	}

	get _hasStartContent() {
		return this.startContent.length > 0;
	}

	get _hasEndContent() {
		return this.endContent.length > 0;
	}

	get _hasHeaderActions() {
		return this.headerActions.length > 0;
	}
}

HeroBanner.define();

export default HeroBanner;
