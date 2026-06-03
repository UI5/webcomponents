import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

import type HeroBannerLayout from "./types/HeroBannerLayout.js";
import type HeroBannerActionsPlacement from "./types/HeroBannerActionsPlacement.js";
import type HeroBannerHeaderTextBlockPlacement from "./types/HeroBannerHeaderTextBlockPlacement.js";

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
 * The hero banner is a mandatory out-of-the-box element for product home pages.
 *
 * ### Structure
 *
 * The HeroBanner consists of the following building blocks:
 *
 * - **Banner Canvas** - the visual base with a background color, optional background image and shadow.
 * - **Overline** (optional) - contextual text at the top, e.g. the current date or a status message.
 * - **Header** (optional) - the main greeting header below the overline, e.g. "Hello, John".
 * - **Free Slots** (optional) - customizable content areas that can contain KPI cards, search components, text, buttons, etc.
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
 * - On smaller screens, split layouts (TwoColumns, TwoColumnsStartExpanded) collapse to a single stacked column.
 * - The heading text wraps to multiple lines as needed.
 * - Buttons in the headerAction slot will wrap.
 * - On screens ≤1024px, the header text is wrapped to a maximum of 3 lines.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/HeroBanner.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.23.0
 * @experimental
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
	 * Defines the header text displayed in the hero banner.
	 *
	 * This is the main greeting header, typically a personalized message
	 * such as "Hello, John".
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	headerText?: string;

	/**
	 * Defines text displayed above the heading as an overline.
	 * Can be used to show the current date, a status message, or any other relevant contextual information.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	overlineText?: string;

	/**
	 * Defines the layout of the free content blocks inside the hero banner.
	 *
	 * The banner includes two optional content slots: default and endContent. These slots can be arranged in different ways using the layout property, which determines how they are displayed together.
	 *
	 * ### Available Layout Options
	 *
	 * - **OneColumn** - The default slot spans the full width below the heading.
	 *   The endContent slot, if used, appears at the bottom and also spans the full width.
	 * - **TwoColumns** - Two equal columns. Both content blocks share the available width equally.
	 *   The default slot occupies the left column, the endContent slot the right. On smaller screens, both slots stack vertically.
	 * - **TwoColumnsStartExpanded** - Two unequal columns. The start content takes twice the width of the end content.
	 *   The default slot takes two-thirds, the endContent slot one-third. On smaller screens, both slots stack vertically.
	 *
	 * @default "OneColumn"
	 * @public
	 */
	@property()
	layout: `${HeroBannerLayout}` = "OneColumn";

	/**
	 * Defines the first (default) free content block of the hero banner.
	 *
	 * This is the default slot — content placed directly inside `<ui5-hero-banner>`
	 * without a slot attribute lands here.
	 * Can contain KPI cards, search input fields, text, buttons, and more.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	startContent!: DefaultSlot<HTMLElement>;

	/**
	 * Defines the second free content block of the hero banner.
	 *
	 * Used alongside `startContent` in split layouts (`TwoColumns`, `TwoColumnsStartExpanded`).
	 * Can contain cards, buttons, and other interactive elements.
	 *
	 * @public
	 */
	@slot()
	endContent!: Slot<HTMLElement>;

	/**
	 * Defines action buttons displayed to the right of the header area.
	 * Typically used to display actions buttons in the top right corner.
	 *
	 * Can contain buttons, links, or other interactive elements that provide
	 * quick access to relevant actions directly from the hero banner header.
	 *
	 * @public
	 */
	@slot()
	actions!: Slot<HTMLElement>;

	/**
	 * Defines the placement of the actions slot within the hero banner header.
	 *
	 * - **TopEnd** (default) - Actions are displayed to the right of the header text, aligned to the top of the header row.
	 * - **BottomStart** - Actions are displayed below the header text, left-aligned. In this mode, the `endContent` slot spans the full height of the content area.
	 *
	 * @default "TopEnd"
	 * @public
	 */
	@property()
	actionsPlacement: `${HeroBannerActionsPlacement}` = "TopEnd";

	/**
	 * Defines the vertical placement of the header text block within the header area.
	 *
	 * - **Top** (default) - Header text block is placed at the top of the header area.
	 * - **Bottom** - Header text block is pushed to the bottom of the header area.
	 *
	 * @default "Top"
	 * @public
	 */
	@property()
	headerTextBlockPlacement: `${HeroBannerHeaderTextBlockPlacement}` = "Top";

	/**
	 * Defines the URL of the background image for the hero banner canvas.
	 * When set, the image is displayed as a cover background on the hero banner.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	backgroundImage?: string;

	get _hasStartContent() {
		return this.startContent.length > 0;
	}

	get _hasEndContent() {
		return this.endContent.length > 0;
	}

	get _hasActions() {
		return this.actions.length > 0;
	}

	get _backgroundImageStyle(): Record<string, string> | undefined {
		if (this.backgroundImage) {
			return { "--_ui5_banner_user_image": `url('${this.backgroundImage}')` };
		}
		return undefined;
	}
}

HeroBanner.define();

export default HeroBanner;
