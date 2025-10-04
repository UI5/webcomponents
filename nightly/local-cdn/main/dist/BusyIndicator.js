var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BusyIndicator_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isTabNext } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop, } from "@ui5/webcomponents-base/dist/Device.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import BusyIndicatorTextPlacement from "./types/BusyIndicatorTextPlacement.js";
// Template
import BusyIndicatorTemplate from "./BusyIndicatorTemplate.js";
import { BUSY_INDICATOR_TITLE } from "./generated/i18n/i18n-defaults.js";
// Styles
import busyIndicatorCss from "./generated/themes/BusyIndicator.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-busy-indicator` signals that some operation is going on and that the
 * user must wait. It does not block the current UI screen so other operations could be triggered in parallel.
 * It displays 3 dots and each dot expands and shrinks at a different rate, resulting in a cascading flow of animation.
 *
 * ### Usage
 * For the `ui5-busy-indicator` you can define the size, the text and whether it is shown or hidden.
 * In order to hide it, use the "active" property.
 *
 * In order to show busy state over an HTML element, simply nest the HTML element in a `ui5-busy-indicator` instance.
 *
 * **Note:** Since `ui5-busy-indicator` has `display: inline-block;` by default and no width of its own,
 * whenever you need to wrap a block-level element, you should set `display: block` to the busy indicator as well.
 *
 * #### When to use:
 *
 * - The user needs to be able to cancel the operation.
 * - Only part of the application or a particular component is affected.
 *
 * #### When not to use:
 *
 * - The operation takes less than one second.
 * - You need to block the screen and prevent the user from starting another activity.
 * - Do not show multiple busy indicators at once.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/BusyIndicator.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Determines the content over which the component will appear.
 * @since 0.12.0
 */
let BusyIndicator = BusyIndicator_1 = class BusyIndicator extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the size of the component.
         * @default "M"
         * @public
         */
        this.size = "M";
        /**
         * Defines if the busy indicator is visible on the screen. By default it is not.
         * @default false
         * @public
         */
        this.active = false;
        /**
         * Defines the delay in milliseconds, after which the busy indicator will be visible on the screen.
         * @default 1000
         * @public
         */
        this.delay = 1000;
        /**
         * Defines the placement of the text.
         *
         * @default "Bottom"
         * @public
         */
        this.textPlacement = "Bottom";
        /**
         * Defines if the component is currently in busy state.
         * @private
         */
        this._isBusy = false;
        this._keydownHandler = this._handleKeydown.bind(this);
        this._preventEventHandler = this._preventEvent.bind(this);
    }
    onEnterDOM() {
        this.addEventListener("keydown", this._keydownHandler, {
            capture: true,
        });
        this.addEventListener("keyup", this._preventEventHandler, {
            capture: true,
        });
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    onExitDOM() {
        if (this._busyTimeoutId) {
            clearTimeout(this._busyTimeoutId);
            delete this._busyTimeoutId;
        }
        this.removeEventListener("keydown", this._keydownHandler, true);
        this.removeEventListener("keyup", this._preventEventHandler, true);
    }
    get ariaTitle() {
        return BusyIndicator_1.i18nBundle.getText(BUSY_INDICATOR_TITLE);
    }
    get labelId() {
        return this.text ? `${this._id}-label` : undefined;
    }
    get textPosition() {
        return {
            top: this.text && this.textPlacement === BusyIndicatorTextPlacement.Top,
            bottom: this.text && this.textPlacement === BusyIndicatorTextPlacement.Bottom,
        };
    }
    get hasContent() {
        return willShowContent(Array.from(this.children));
    }
    onBeforeRendering() {
        if (this.active) {
            if (!this._isBusy && !this._busyTimeoutId) {
                this._busyTimeoutId = setTimeout(() => {
                    delete this._busyTimeoutId;
                    this._isBusy = true;
                }, Math.max(0, this.delay));
            }
        }
        else {
            if (this._busyTimeoutId) {
                clearTimeout(this._busyTimeoutId);
                delete this._busyTimeoutId;
            }
            this._isBusy = false;
        }
    }
    _handleKeydown(e) {
        if (!this._isBusy) {
            return;
        }
        e.stopImmediatePropagation();
        // move the focus to the last element in this DOM and let TAB continue to the next focusable element
        if (isTabNext(e)) {
            this.focusForward = true;
            this.shadowRoot.querySelector("[data-ui5-focus-redirect]").focus();
            this.focusForward = false;
        }
    }
    _preventEvent(e) {
        if (this._isBusy) {
            e.stopImmediatePropagation();
        }
    }
    /**
     * Moves the focus to busy area when coming with SHIFT + TAB
     */
    _redirectFocus(e) {
        if (this.focusForward) {
            return;
        }
        e.preventDefault();
        this.shadowRoot.querySelector(".ui5-busy-indicator-busy-area").focus();
    }
};
__decorate([
    property()
], BusyIndicator.prototype, "text", void 0);
__decorate([
    property()
], BusyIndicator.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], BusyIndicator.prototype, "active", void 0);
__decorate([
    property({ type: Number })
], BusyIndicator.prototype, "delay", void 0);
__decorate([
    property()
], BusyIndicator.prototype, "textPlacement", void 0);
__decorate([
    property({ type: Boolean })
], BusyIndicator.prototype, "_isBusy", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], BusyIndicator, "i18nBundle", void 0);
BusyIndicator = BusyIndicator_1 = __decorate([
    customElement({
        tag: "ui5-busy-indicator",
        languageAware: true,
        styles: busyIndicatorCss,
        renderer: jsxRenderer,
        template: BusyIndicatorTemplate,
    })
], BusyIndicator);
BusyIndicator.define();
export default BusyIndicator;
//# sourceMappingURL=BusyIndicator.js.map