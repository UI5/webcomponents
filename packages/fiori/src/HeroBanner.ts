import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

import type HeroBannerColumnsRatio from "./types/HeroBannerColumnsRatio.js";
import type HeroBannerActionsPlacement from "./types/HeroBannerActionsPlacement.js";
import type HeroBannerHeaderBlockPlacement from "./types/HeroBannerHeaderBlockPlacement.js";

// Template
import HeroBannerTemplate from "./HeroBannerTemplate.js";

// Styles
import HeroBannerCss from "./generated/themes/HeroBanner.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-hero-banner` is a flexible, full-width banner designed for placement at the top of a page.
 * It provides a personalized greeting and quick access to key information or actions.
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
 * The banner is not sticky — it scrolls away with the page content when the user scrolls down.
 *
 * ### Usage
 *
 * Place the `ui5-hero-banner` at the top of a page to welcome the user and surface relevant
 * information or shortcuts at a glance.
 *
 * The hero banner itself is non-interactive. However, interactive elements such as buttons, cards,
 * or search fields can be placed inside the free content slots and will follow their own
 * interactive states.
 *
 * ### Responsive Behavior
 *
 * The hero banner adapts to different screen sizes:
 * - On smaller screens, split layouts (Equal, FirstWider) collapse to a single stacked column.
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
	 * Defines the ratio between the two content columns inside the hero banner.
	 *
	 * Takes effect only when `endContent` is provided. When no `endContent` is present, the content spans the full width (single column).
	 *
	 * - **Equal** - Two equal columns. Both content blocks share the available width equally.
	 *   On smaller screens, both slots stack vertically.
	 * - **FirstWider** - Two unequal columns. The start content takes two-thirds of the width, the end content one-third.
	 *   On smaller screens, both slots stack vertically.
	 *
	 * @default "FirstWider"
	 * @public
	 */
	@property()
	columnsRatio: `${HeroBannerColumnsRatio}` = "FirstWider";

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
	 * Used alongside `startContent` when `columnsRatio` is set (`Equal`, `FirstWider`).
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
	 * - **TopEnd** (default) - Actions are displayed to the right of the header text, at the top of the header row.
	 * - **BottomStart** - Actions are displayed below the header text, left-aligned, regardless of `columnsRatio` or slot usage.
	 *
	 * @default "TopEnd"
	 * @public
	 */
	@property()
	actionsPlacement: `${HeroBannerActionsPlacement}` = "TopEnd";

	/**
	 * Defines the vertical placement of the header block within the content area.
	 *
	 * - **Top** (default) - Header block is placed at the top of the content area.
	 * - **Bottom** - Header block is pushed to the bottom of column 1. Only takes effect when `columnsRatio`
	 *   is `Equal` or `FirstWider` and only `endContent` is provided (no default slot content).
	 *   When `actionsPlacement` is also `BottomStart`, the `endContent` slot spans the full height.
	 *
	 * @default "Top"
	 * @public
	 */
	@property()
	headerBlockPlacement: `${HeroBannerHeaderBlockPlacement}` = "Top";

	get _hasStartContent() {
		return this.startContent.length > 0;
	}

	get _hasEndContent() {
		return this.endContent.length > 0;
	}

	get _hasActions() {
		return this.actions.length > 0;
	}

	// headerBlockPlacement="Bottom" only takes effect in split grid layouts with only endContent
	get _headerAtBottom() {
		return this.headerBlockPlacement === "Bottom"
			&& !!this.columnsRatio
			&& !this._hasStartContent
			&& this._hasEndContent;
	}

	// TopEnd actions must be a standalone grid item when the header is at the bottom,
	// so they stay at the top of col 1 independently of the header position
	get _actionsAsGridItem() {
		return this._hasActions
			&& this.actionsPlacement !== "BottomStart"
			&& this._headerAtBottom;
	}
}

HeroBanner.define();

export default HeroBanner;
