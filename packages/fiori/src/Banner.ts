import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

import type BannerLayout from "./types/BannerLayout.js";

// Template
import BannerTemplate from "./BannerTemplate.js";

// Styles
import BannerCss from "./generated/themes/Banner.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-banner` is the main visual element that unifies all product homepages.
 * It is a flexible card designed to accommodate various elements depending on product needs.
 * The banner is a mandatory out-of-the-box element for product landing pages.
 *
 * ### Structure
 *
 * The Banner consists of the following building blocks:
 *
 * - **Banner Canvas** - the visual base with a background color, optional background image and shadow.
 * - **Date** (optional) - contextual text at the top, typically showing the current date.
 * - **Salutation** (mandatory) - the main greeting header below the date, e.g. "Hello, John".
 * - **Free Blocks** (optional) - customizable content areas that can contain KPI cards, search components, text, buttons, etc.
 *
 * The banner scrolls away below the shell navigation when the user scrolls down the page. It is not sticky.
 *
 * ### Usage
 *
 * Use the `ui5-banner` at the top of a product homepage to provide a personalized greeting
 * and quick access to key information or actions.
 *
 * The banner itself is non-interactive. However, interactive elements such as buttons, cards,
 * or search fields can be placed inside the free content slots and will follow their own
 * interactive states.
 *
 * ### Responsive Behavior
 *
 * The banner adapts to different screen sizes with responsive horizontal padding:
 * - **XS/S** (up to 599px): 1.5rem padding
 * - **M/L** (600px - 1439px): 2rem horizontal padding
 * - **XL/MAX** (1440px - 2559px): 3rem horizontal padding
 * - **4K** (2560px+): 4rem horizontal padding
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/Banner.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.12.0
 * @csspart canvas - Used to style the banner canvas container
 * @csspart content - Used to style the content area of the banner
 */
@customElement({
	tag: "ui5-banner",
	renderer: jsxRenderer,
	styles: BannerCss,
	template: BannerTemplate,
})
class Banner extends UI5Element {
	/**
	 * Defines the salutation text displayed in the banner.
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
	 * Defines the layout of the free content blocks inside the banner.
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
	layout: `${BannerLayout}` = "FullWidth";

	/**
	 * Defines the URL of the background image for the banner canvas.
	 *
	 * When set, the image is displayed as a cover background on the banner.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	backgroundImage?: string;

	/**
	 * Defines the first (default) free content block of the banner.
	 *
	 * This is the default slot — content placed directly inside `<ui5-banner>`
	 * without a slot attribute lands here.
	 * Can contain KPI cards, search components, text, buttons, and more.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	startContent!: DefaultSlot<HTMLElement>;

	/**
	 * Defines the second free content block of the banner.
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
	 * quick access to relevant actions directly from the banner header.
	 *
	 * @public
	 */
	@slot()
	headerActions!: Slot<HTMLElement>;

	get _backgroundImageStyle(): Record<string, string> | undefined {
		if (this.backgroundImage) {
			return { "--_ui5_banner_user_image": `url('${this.backgroundImage}')` };
		}
		return undefined;
	}

	get _hasContent() {
		return this.startContent.length > 0 || this.endContent.length > 0;
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

Banner.define();

export default Banner;
