var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SliderTooltip_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, i18n, property } from "@ui5/webcomponents-base/dist/decorators.js";
import SliderTooltipTemplate from "./SliderTooltipTemplate.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SliderTooltipCss from "./generated/themes/SliderTooltip.css.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { SLIDER_TOOLTIP_INPUT_LABEL, } from "./generated/i18n/i18n-defaults.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
/**
 * @class
 *
 * ### Overview
 * @constructor
 * @extends UI5Element
 * @private
 */
let SliderTooltip = SliderTooltip_1 = class SliderTooltip extends UI5Element {
    constructor() {
        super();
        this.value = "";
        this.open = false;
        this.min = 0;
        this.max = 100;
        this.editable = false;
        this.valueState = "None";
        this._open = false;
        this._repositionTooltipBound = this.repositionTooltip.bind(this);
    }
    onBeforeRendering() {
        if (this.open !== this._open) {
            this.fireDecoratorEvent("open");
        }
        this._open = this.open;
    }
    onAfterRendering() {
        if (!this.hasAttribute("popover")) {
            this.setAttribute("popover", "manual");
        }
        // Workaround to skip DOM state
        if (this.inputRef && this.inputRef.value !== this.value) {
            this.inputRef.value = this.value;
        }
        if (this.isConnected) {
            if (this.open) {
                this.showPopover();
                this.repositionTooltip();
                this.attachGlobalScrollHandler();
            }
            else {
                this.hidePopover();
                this.detachGlobalScrollHandler();
            }
        }
    }
    repositionTooltip() {
        const followRefRect = this.followRef?.getBoundingClientRect();
        if (!followRefRect) {
            return;
        }
        this.style.top = `${followRefRect.top}px`;
        // center the tooltip's mid and opener's mid
        const tooltipWidth = this.offsetWidth;
        const followRefWidth = followRefRect.width;
        const tooltipMidX = tooltipWidth / 2;
        const followRefMidX = followRefWidth / 2;
        this.style.left = `${followRefRect.left + followRefMidX - tooltipMidX}px`;
        // enable RTL support
        this.style.right = "auto";
    }
    attachGlobalScrollHandler() {
        document.addEventListener("scroll", this._repositionTooltipBound, { capture: true });
    }
    detachGlobalScrollHandler() {
        document.removeEventListener("scroll", this._repositionTooltipBound, { capture: true });
    }
    _onInputFocusin() {
        requestAnimationFrame(() => {
            this.hidePopover();
            this.showPopover();
        });
    }
    _onInputKeydown(e) {
        if (isEnter(e)) {
            this.fireDecoratorEvent("change", { value: e.target.value });
        }
    }
    _onInputInput() {
        this.fireDecoratorEvent("input", { value: this.inputRef?.value });
    }
    _onInputFocusOut(e) {
        const relatedTarget = e.relatedTarget;
        if (!this.parentElement?.contains(relatedTarget)) {
            this.hidePopover();
        }
        this.fireDecoratorEvent("change", { value: e.target.value });
        this.fireDecoratorEvent("focus-change");
    }
    get _ariaLabelledByInputText() {
        return SliderTooltip_1.i18nBundle.getText(SLIDER_TOOLTIP_INPUT_LABEL);
    }
    get inputRef() {
        return this.shadowRoot?.querySelector("[ui5-input]");
    }
};
__decorate([
    property()
], SliderTooltip.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], SliderTooltip.prototype, "open", void 0);
__decorate([
    property({ type: Number })
], SliderTooltip.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], SliderTooltip.prototype, "max", void 0);
__decorate([
    property({ type: Boolean })
], SliderTooltip.prototype, "editable", void 0);
__decorate([
    property()
], SliderTooltip.prototype, "valueState", void 0);
__decorate([
    property({ type: Object })
], SliderTooltip.prototype, "followRef", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], SliderTooltip, "i18nBundle", void 0);
SliderTooltip = SliderTooltip_1 = __decorate([
    customElement({
        tag: "ui5-slider-tooltip",
        renderer: jsxRenderer,
        template: SliderTooltipTemplate,
        styles: SliderTooltipCss,
    })
    /**
     * Fired when the value is confirmed by user interaction (Enter key or focusout)
     */
    ,
    event("change")
    /**
     * Fired when the value is changed by user interaction
     */
    ,
    event("input")
    /**
     * Fired when the tooltip is opened or closed
     */
    ,
    event("open")
    /**
     * Fired when the tooltip focus changes
     */
    ,
    event("focus-change")
], SliderTooltip);
SliderTooltip.define();
export default SliderTooltip;
//# sourceMappingURL=SliderTooltip.js.map