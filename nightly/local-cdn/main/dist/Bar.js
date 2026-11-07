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
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
// Template
import BarTemplate from "./BarTemplate.js";
// Styles
import BarCss from "./generated/themes/Bar.css.js";
/**
 * @class
 *
 * ### Overview
 * The Bar is a container which is primarily used to hold titles, buttons and input elements
 * and its design and functionality is the basis for page headers and footers.
 * The component consists of three areas to hold its content - startContent slot, default slot and endContent slot.
 * It has the capability to center content, such as a title, while having other components on the left and right side.
 *
 * ### Usage
 * With the use of the design property, you can set the style of the Bar to appear designed like a Header, Subheader, Footer and FloatingFooter.
 *
 * **Note:** Do not place a Bar inside another Bar or inside any bar-like component. Doing so may cause unpredictable behavior.
 *
 * **Note:** The Bar is a structural layout component for organizing page areas (header, footer, subheader) and not an action-oriented toolbar. To group action controls with full keyboard navigation support, use the Toolbar component instead.
 *
 * ### Responsive Behavior
 * The default slot will be centered in the available space between the startContent and the endContent areas,
 * therefore it might not always be centered in the entire bar.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Bar.js";`
 * @csspart bar - Used to style the wrapper of the content of the component
 * @csspart startContent - Used to style the wrapper of the start content of the component
 * @csspart midContent - Used to style the wrapper of the middle content of the component
 * @csspart endContent - Used to style the wrapper of the end content of the component
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0
 */
let Bar = class Bar extends UI5Element {
    get accInfo() {
        return {
            "label": this.ariaLabelText,
            "role": this.effectiveRole,
        };
    }
    get ariaLabelText() {
        if (this.accessibleName || this.accessibleNameRef) {
            return getEffectiveAriaLabelText(this);
        }
        return this.design;
    }
    constructor() {
        super();
        /**
         * Defines the component's design.
         * @default "Header"
         * @public
         */
        this.design = "Header";
        /**
         * Specifies the ARIA role applied to the component for accessibility purposes.
         *
         * **Note:** By default, no ARIA role is applied ("None"). The Bar derives its semantics
         * from the container it is placed in, such as a page header or footer.
         *
         * **Note:** The "Toolbar" value is deprecated. The Bar is a structural layout container and does not
         * support toolbar keyboard interactions (such as arrow-key navigation between components). When 3 or more
         * interactive elements are needed, use the `ui5-toolbar` component instead, which provides the correct
         * toolbar role and arrow-key navigation between components.
         *
         * @public
         * @default "None"
         * @since 2.10.0
         *
         */
        this.accessibleRole = "None";
        this._handleResizeBound = this.handleResize.bind(this);
    }
    handleResize() {
        const bar = this.getDomRef();
        const barWidth = bar.offsetWidth;
        const needShrinked = Array.from(bar.children).some(child => {
            return child.offsetWidth > barWidth / 3;
        });
        bar.classList.toggle("ui5-bar-root-shrinked", needShrinked);
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResizeBound);
        this.getDomRef().querySelectorAll(".ui5-bar-content-container").forEach(child => {
            ResizeHandler.register(child, this._handleResizeBound);
        }, this);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResizeBound);
        this.getDomRef().querySelectorAll(".ui5-bar-content-container").forEach(child => {
            ResizeHandler.deregister(child, this._handleResizeBound);
        }, this);
    }
    get effectiveRole() {
        return this.accessibleRole === "Toolbar" ? "toolbar" : undefined;
    }
};
__decorate([
    property()
], Bar.prototype, "design", void 0);
__decorate([
    property()
], Bar.prototype, "accessibleRole", void 0);
__decorate([
    property()
], Bar.prototype, "accessibleName", void 0);
__decorate([
    property()
], Bar.prototype, "accessibleNameRef", void 0);
__decorate([
    slot()
], Bar.prototype, "startContent", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Bar.prototype, "middleContent", void 0);
__decorate([
    slot()
], Bar.prototype, "endContent", void 0);
Bar = __decorate([
    customElement({
        tag: "ui5-bar",
        fastNavigation: true,
        renderer: jsxRenderer,
        styles: BarCss,
        template: BarTemplate,
    })
], Bar);
Bar.define();
export default Bar;
//# sourceMappingURL=Bar.js.map