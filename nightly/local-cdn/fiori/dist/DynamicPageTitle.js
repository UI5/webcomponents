var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DynamicPageTitle_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import ToolbarItemOverflowBehavior from "@ui5/webcomponents/dist/types/ToolbarItemOverflowBehavior.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
// Template
import DynamicPageTitleTemplate from "./DynamicPageTitleTemplate.js";
// Styles
import DynamicPageTitleCss from "./generated/themes/DynamicPageTitle.css.js";
// Texts
import { DYNAMIC_PAGE_ARIA_DESCR_TOGGLE_HEADER, } from "./generated/i18n/i18n-defaults.js";
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
let DynamicPageTitle = DynamicPageTitle_1 = class DynamicPageTitle extends UI5Element {
    constructor() {
        super();
        /**
         * Defines if the title is snapped.
         *
         * @protected
         * @default false
         */
        this.snapped = false;
        /**
         * Defines if the mobileNavigationActions are shown.
         *
         * @private
         */
        this.mobileNavigationActions = false;
        /**
         * Indicates if the elements is on focus
         * @private
         */
        this.focused = false;
        /**
         * Indicates whether the title has snapped on mobile devices.
         * @private
         */
        this.hasSnappedTitleOnMobile = false;
        /**
         * @private
         */
        this.interactive = false;
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
        return this.interactive ? DynamicPageTitle_1.i18nBundle.getText(DYNAMIC_PAGE_ARIA_DESCR_TOGGLE_HEADER) : undefined;
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
    get _needsSeparator() {
        return (this.navigationBar.length > 0 && this.actionsBar.length > 0);
    }
    get forAriaExpanded() {
        return this.interactive ? this._headerExpanded : undefined;
    }
    prepareLayoutActions() {
        const navigationBar = this.querySelector("[ui5-toolbar][slot='navigationBar']"), isWideScreen = this.offsetWidth >= 1280;
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
    onMinContentWidthChange(e) {
        const slotName = e.target?.assignedSlot?.name;
        if (!slotName || slotName === "content") {
            this.minContentWidth = e.detail.minWidth;
        }
        else if (slotName === "actionsBar") {
            this.minActionsWidth = e.detail.minWidth;
        }
    }
    onTitleClick() {
        this.fireDecoratorEvent("toggle-title");
    }
    _onkeydown(e) {
        if (isEnter(e) || isSpace(e)) {
            e.preventDefault();
            this.fireDecoratorEvent("toggle-title");
        }
    }
};
__decorate([
    property({ type: Boolean })
], DynamicPageTitle.prototype, "snapped", void 0);
__decorate([
    property({ type: Boolean })
], DynamicPageTitle.prototype, "mobileNavigationActions", void 0);
__decorate([
    property({ type: Boolean })
], DynamicPageTitle.prototype, "focused", void 0);
__decorate([
    property({ type: Number })
], DynamicPageTitle.prototype, "minContentWidth", void 0);
__decorate([
    property({ type: Number })
], DynamicPageTitle.prototype, "minActionsWidth", void 0);
__decorate([
    property({ type: Boolean })
], DynamicPageTitle.prototype, "hasSnappedTitleOnMobile", void 0);
__decorate([
    slot({ type: HTMLElement })
], DynamicPageTitle.prototype, "heading", void 0);
__decorate([
    slot({ type: HTMLElement })
], DynamicPageTitle.prototype, "snappedHeading", void 0);
__decorate([
    slot({ type: HTMLElement })
], DynamicPageTitle.prototype, "snappedTitleOnMobile", void 0);
__decorate([
    slot({ type: HTMLElement })
], DynamicPageTitle.prototype, "actionsBar", void 0);
__decorate([
    slot({ type: HTMLElement })
], DynamicPageTitle.prototype, "navigationBar", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement })
], DynamicPageTitle.prototype, "content", void 0);
__decorate([
    slot({ type: HTMLElement })
], DynamicPageTitle.prototype, "subheading", void 0);
__decorate([
    slot({ type: HTMLElement })
], DynamicPageTitle.prototype, "snappedSubheading", void 0);
__decorate([
    slot({ type: HTMLElement })
], DynamicPageTitle.prototype, "breadcrumbs", void 0);
__decorate([
    property({ type: Boolean })
], DynamicPageTitle.prototype, "interactive", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], DynamicPageTitle, "i18nBundle", void 0);
DynamicPageTitle = DynamicPageTitle_1 = __decorate([
    customElement({
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
    ,
    event("toggle-title", {
        bubbles: true,
    })
], DynamicPageTitle);
DynamicPageTitle.define();
export default DynamicPageTitle;
//# sourceMappingURL=DynamicPageTitle.js.map