var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
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
let HeroBanner = class HeroBanner extends UI5Element {
    constructor() {
        super(...arguments);
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
        this.columnsRatio = "FirstWider";
        /**
         * Defines the placement of the actions slot within the hero banner header.
         *
         * - **TopEnd** (default) - Actions are displayed to the right of the header text, at the top of the header row.
         * - **BottomStart** - Actions are displayed below the header text, left-aligned, regardless of `columnsRatio` or slot usage.
         *
         * @default "TopEnd"
         * @public
         */
        this.actionsPlacement = "TopEnd";
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
        this.headerBlockPlacement = "Top";
    }
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
};
__decorate([
    property()
], HeroBanner.prototype, "headerText", void 0);
__decorate([
    property()
], HeroBanner.prototype, "overlineText", void 0);
__decorate([
    property()
], HeroBanner.prototype, "columnsRatio", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], HeroBanner.prototype, "startContent", void 0);
__decorate([
    slot()
], HeroBanner.prototype, "endContent", void 0);
__decorate([
    slot()
], HeroBanner.prototype, "actions", void 0);
__decorate([
    property()
], HeroBanner.prototype, "actionsPlacement", void 0);
__decorate([
    property()
], HeroBanner.prototype, "headerBlockPlacement", void 0);
HeroBanner = __decorate([
    customElement({
        tag: "ui5-hero-banner",
        renderer: jsxRenderer,
        styles: HeroBannerCss,
        template: HeroBannerTemplate,
    })
], HeroBanner);
HeroBanner.define();
export default HeroBanner;
//# sourceMappingURL=HeroBanner.js.map