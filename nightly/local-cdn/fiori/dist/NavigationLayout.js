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
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import NavigationLayoutMode from "./types/NavigationLayoutMode.js";
// Template
import NavigationLayoutTemplate from "./NavigationLayoutTemplate.js";
// Styles
import NavigationLayoutCss from "./generated/themes/NavigationLayout.css.js";
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
let NavigationLayout = class NavigationLayout extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Specifies the navigation layout mode.
         * @default "Auto"
         * @public
         */
        this.mode = "Auto";
        /**
         * @private
         */
        this.sideCollapsed = isPhone() || window.innerWidth < SCREEN_WIDTH_BREAKPOINT;
        /**
         * @private
         */
        this.hasSideNavigation = false;
        /**
         * @private
         */
        this.isPhone = isPhone();
    }
    /**
     * Gets whether the side navigation is collapsed.
     * @public
     */
    isSideCollapsed() {
        this.calcSideCollapsed();
        return this.sideCollapsed;
    }
    onBeforeRendering() {
        this.calcSideCollapsed();
        const sideNavigation = this.sideContent[0];
        this.hasSideNavigation = !!sideNavigation;
        if (sideNavigation) {
            sideNavigation.collapsed = this.isSideCollapsed();
        }
    }
    calcSideCollapsed() {
        if (this.mode === NavigationLayoutMode.Auto) {
            this.sideCollapsed = isPhone() || window.innerWidth < SCREEN_WIDTH_BREAKPOINT;
        }
        else {
            this.sideCollapsed = this.mode === NavigationLayoutMode.Collapsed;
        }
    }
};
__decorate([
    property()
], NavigationLayout.prototype, "mode", void 0);
__decorate([
    property({ type: Boolean })
], NavigationLayout.prototype, "sideCollapsed", void 0);
__decorate([
    property({ type: Boolean })
], NavigationLayout.prototype, "hasSideNavigation", void 0);
__decorate([
    property({ type: Boolean })
], NavigationLayout.prototype, "isPhone", void 0);
__decorate([
    slot()
], NavigationLayout.prototype, "header", void 0);
__decorate([
    slot()
], NavigationLayout.prototype, "sideContent", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], NavigationLayout.prototype, "content", void 0);
NavigationLayout = __decorate([
    customElement({
        tag: "ui5-navigation-layout",
        languageAware: true,
        renderer: jsxRenderer,
        styles: [
            NavigationLayoutCss,
        ],
        template: NavigationLayoutTemplate,
    })
], NavigationLayout);
NavigationLayout.define();
export default NavigationLayout;
//# sourceMappingURL=NavigationLayout.js.map