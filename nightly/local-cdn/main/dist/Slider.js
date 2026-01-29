var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Slider_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isEscape, isF2 } from "@ui5/webcomponents-base/dist/Keys.js";
import SliderBase from "./SliderBase.js";
// Template
import SliderTemplate from "./SliderTemplate.js";
// Texts
import { SLIDER_ARIA_DESCRIPTION, SLIDER_TOOLTIP_INPUT_DESCRIPTION, SLIDER_TOOLTIP_INPUT_LABEL, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 * The Slider component represents a numerical range and a handle (grip).
 * The purpose of the component is to enable visual selection of a value in
 * a continuous numerical range by moving an adjustable handle.
 *
 * ### Structure
 * The most important properties of the Slider are:
 *
 * - min - The minimum value of the slider range.
 * - max - The maximum value of the slider range.
 * - value - The current value of the slider range.
 * - step - Determines the increments in which the slider will move.
 * - showTooltip - Determines if a tooltip should be displayed above the handle.
 * - showTickmarks - Displays a visual divider between the step values.
 * - labelInterval - Labels some or all of the tickmarks with their values.
 *
 * ### Usage
 * The most common use case is to select values on a continuous numerical scale (e.g. temperature, volume, etc. ).
 *
 * ### Responsive Behavior
 * The `ui5-slider` component adjusts to the size of its parent container by recalculating and
 * resizing the width of the control. You can move the slider handle in several different ways:
 *
 * - Drag and drop the handle to the desired value.
 * - Click/tap on the range bar to move the handle to that location.
 *
 * ### Keyboard Handling
 *
 * - `Left or Down Arrow` - Moves the handle one step to the left, effectively decreasing the component's value by `step` amount;
 * - `Right or Up Arrow` - Moves the handle one step to the right, effectively increasing the component's value by `step` amount;
 * - `Left or Down Arrow + Ctrl/Cmd` - Moves the handle to the left with step equal to 1/10th of the entire range, effectively decreasing the component's value by 1/10th of the range;
 * - `Right or Up Arrow + Ctrl/Cmd` - Moves the handle to the right with step equal to 1/10th of the entire range, effectively increasing the component's value by 1/10th of the range;
 * - `Plus` - Same as `Right or Up Arrow`;
 * - `Minus` - Same as `Left or Down Arrow`;
 * - `Home` - Moves the handle to the beginning of the range;
 * - `End` - Moves the handle to the end of the range;
 * - `Page Up` - Same as `Right or Up + Ctrl/Cmd`;
 * - `Page Down` - Same as `Left or Down + Ctrl/Cmd`;
 * - `Escape` - Resets the value property after interaction, to the position prior the component's focusing;
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Slider.js";`
 * @constructor
 * @extends SliderBase
 * @since 1.0.0-rc.11
 * @public
 * @csspart progress-container - Used to style the progress container, the horizontal bar that visually represents the range between the minimum and maximum values, of the `ui5-slider`.
 * @csspart progress-bar - Used to style the progress bar, which shows the progress of the `ui5-slider`.
 * @csspart handle - Used to style the handle of the `ui5-slider`.
 */
let Slider = Slider_1 = class Slider extends SliderBase {
    get formFormattedValue() {
        return this.value.toString();
    }
    constructor() {
        super();
        /**
         * Current value of the slider
         * @default 0
         * @formEvents change input
         * @formProperty
         * @public
         */
        this.value = 0;
        this.tooltipValueState = "None";
        this.tooltipValue = "";
        this._progressPercentage = 0;
        this._handlePositionFromStart = 0;
        this._stateStorage.value = undefined;
        this._lastValidInputValue = this.min.toString();
    }
    /**
     *
     * Check if the previously saved state is outdated. That would mean
     * either it is the initial rendering or that a property has been changed
     * programmatically - because the previous state is always updated in
     * the interaction handlers.
     *
     * Normalize current properties, update the previously stored state.
     * Update the visual UI representation of the Slider.
     *
     */
    onBeforeRendering() {
        if (!this.isCurrentStateOutdated()) {
            return;
        }
        this.notResized = true;
        this.syncUIAndState();
        this._updateHandleAndProgress(this.value);
    }
    onAfterRendering() {
        super.onAfterRendering();
        this.tooltip?.repositionTooltip();
    }
    syncUIAndState() {
        // Validate step and update the stored state for the step property.
        if (this.isPropertyUpdated("step")) {
            this._validateStep(this.step);
            this.storePropertyState("step");
        }
        // Recalculate the tickmarks and labels and update the stored state.
        if (this.isPropertyUpdated("min", "max", "value")) {
            this.storePropertyState("min", "max");
            // Here the value props are changed programmatically (not by user interaction)
            // and it won't be "stepified" (rounded to the nearest step). 'Clip' them within
            // min and max bounderies and update the previous state reference.
            this.value = SliderBase.clipValue(this.value, this._effectiveMin, this._effectiveMax);
            this.updateStateStorageAndFireInputEvent("value");
            this.storePropertyState("value");
        }
        // Labels must be updated if any of the min/max/step/labelInterval props are changed
        if (this.labelInterval && this.showTickmarks) {
            this._createLabels();
        }
        // Update the stored state for the labelInterval, if changed
        if (this.isPropertyUpdated("labelInterval")) {
            this.storePropertyState("labelInterval");
        }
    }
    /**
     * Called when the user starts interacting with the slider
     * @private
     */
    _onmousedown(e) {
        // If step is 0 no interaction is available because there is no constant
        // (equal for all user environments) quantitative representation of the value
        if (this.disabled || this.step === 0 || e.target.hasAttribute("ui5-slider-tooltip")) {
            return;
        }
        const newValue = this.handleDownBase(e);
        this._valueOnInteractionStart = this.value;
        // Set initial value if one is not set previously on focus in.
        // It will be restored if ESC key is pressed.
        if (this._valueInitial === undefined) {
            this._valueInitial = this.value;
        }
        // Do not yet update the Slider if press is over a handle. It will be updated if the user drags the mouse.
        const ctor = this.constructor;
        if (!this._isHandlePressed(ctor.getPageXValueFromEvent(e))) {
            this._updateHandleAndProgress(newValue);
            this.value = newValue;
            this.updateStateStorageAndFireInputEvent("value");
        }
    }
    _onfocusin() {
        // Set initial value if one is not set previously on focus in.
        // It will be restored if ESC key is pressed.
        if (this._valueInitial === undefined) {
            this._valueInitial = this.value;
        }
        if (this.showTooltip) {
            this._tooltipsOpen = true;
        }
    }
    _onfocusout(e) {
        // Prevent focusout when the focus is getting set within the slider internal
        // element (on the handle), before the Slider' customElement itself is finished focusing
        if (this._isFocusing()) {
            this._preventFocusOut();
            return;
        }
        // Reset focus state and the stored Slider's initial
        // value that was saved when it was first focused in
        this._valueInitial = undefined;
        if (this.showTooltip && !e.relatedTarget?.hasAttribute("ui5-slider-tooltip")) {
            this._tooltipsOpen = false;
        }
    }
    _onTooltipChange(e) {
        const value = parseFloat(e.detail.value);
        const isInvalid = value < this._effectiveMin || value > this._effectiveMax;
        if (isInvalid) {
            this.tooltipValueState = "Negative";
            this.tooltipValue = `${value}`;
            return;
        }
        this.value = value;
        this.fireDecoratorEvent("change");
    }
    _onTooltipFocusChange() {
        const value = parseFloat(this.tooltipValue);
        const isInvalid = value < this._effectiveMin || value > this._effectiveMax;
        if (isInvalid) {
            this.tooltipValueState = "None";
            this.tooltipValue = this.value.toString();
        }
    }
    _onTooltipKeydown(e) {
        if (isF2(e)) {
            e.preventDefault();
            this._sliderHandle.focus();
        }
    }
    _onTooltipOpen() {
        const ctor = this.constructor;
        const stepPrecision = ctor._getDecimalPrecisionOfNumber(this._effectiveStep);
        this.tooltipValue = this.value.toFixed(stepPrecision);
    }
    _onTooltipInput(e) {
        this.tooltipValue = e.detail.value;
    }
    /**
     * Called when the user moves the slider
     * @private
     */
    _handleMove(e) {
        e.preventDefault();
        // If step is 0 no interaction is available because there is no constant
        // (equal for all user environments) quantitative representation of the value
        if (this.disabled || this._effectiveStep === 0) {
            return;
        }
        const ctor = this.constructor;
        const newValue = ctor.getValueFromInteraction(e, this._effectiveStep, this._effectiveMin, this._effectiveMax, this.getBoundingClientRect(), this.directionStart);
        this._updateHandleAndProgress(newValue);
        this.value = newValue;
        this.tooltipValue = newValue.toString();
        this.updateStateStorageAndFireInputEvent("value");
    }
    /** Called when the user finish interacting with the slider
     * @private
     */
    _handleUp() {
        if (this._valueOnInteractionStart !== this.value) {
            this.fireDecoratorEvent("change");
        }
        this.handleUpBase();
        this._valueOnInteractionStart = undefined;
    }
    _onkeyup(e) {
        const isActionKey = SliderBase._isActionKey(e);
        this._onKeyupBase();
        if (isActionKey && this._valueOnInteractionStart !== this.value) {
            this.fireDecoratorEvent("change");
        }
        this._valueOnInteractionStart = this.value;
    }
    /** Determines if the press is over the handle
     * @private
     */
    _isHandlePressed(clientX) {
        const sliderHandleDomRect = this._sliderHandle.getBoundingClientRect();
        return clientX >= sliderHandleDomRect.left && clientX <= sliderHandleDomRect.right;
    }
    /** Updates the UI representation of the progress bar and handle position
     * @private
     */
    _updateHandleAndProgress(newValue) {
        const max = this._effectiveMax;
        const min = this._effectiveMin;
        // The progress (completed) percentage of the slider.
        this._progressPercentage = (newValue - min) / (max - min);
        // How many pixels from the left end of the slider will be the placed the affected  by the user action handle
        this._handlePositionFromStart = this._progressPercentage * 100;
    }
    _handleActionKeyPress(e) {
        const min = this._effectiveMin;
        const max = this._effectiveMax;
        const currentValue = this.value;
        const ctor = this.constructor;
        const newValue = isEscape(e) ? this._valueInitial : ctor.clipValue(this._handleActionKeyPressBase(e, "value") + currentValue, min, max);
        if (newValue !== currentValue) {
            this._updateHandleAndProgress(newValue);
            this.value = newValue;
            this.tooltipValue = this.value.toString();
            this.updateStateStorageAndFireInputEvent("value");
        }
    }
    _onTooltopForwardFocus(e) {
        const tooltip = e.target;
        tooltip.followRef?.focus();
    }
    get inputValue() {
        return this.value.toString();
    }
    get tooltip() {
        return this.getDomRef()?.querySelector("[ui5-slider-tooltip]");
    }
    get styles() {
        return {
            progress: {
                "width": `${this._handlePositionFromStart}%`,
                "border": this._handlePositionFromStart === 0 ? "none" : "",
            },
            handle: {
                [this.directionStart]: `${this._handlePositionFromStart}%`,
            },
        };
    }
    get _sliderHandle() {
        return this.shadowRoot.querySelector(".ui5-slider-handle");
    }
    get _ariaDisabled() {
        return this.disabled || undefined;
    }
    get _ariaLabelledByText() {
        return Slider_1.i18nBundle.getText(SLIDER_ARIA_DESCRIPTION);
    }
    get _ariaDescribedByInputText() {
        return Slider_1.i18nBundle.getText(SLIDER_TOOLTIP_INPUT_DESCRIPTION);
    }
    get _ariaLabelledByInputText() {
        return Slider_1.i18nBundle.getText(SLIDER_TOOLTIP_INPUT_LABEL);
    }
    get tickmarksObject() {
        const count = this._tickmarksCount;
        const arr = [];
        if (this._hiddenTickmarks) {
            return [true, false];
        }
        for (let i = 0; i <= count; i++) {
            arr.push(this._effectiveMin + (i * this.step) <= this.value);
        }
        return arr;
    }
};
__decorate([
    property({ type: Number })
], Slider.prototype, "value", void 0);
__decorate([
    property()
], Slider.prototype, "tooltipValueState", void 0);
__decorate([
    property()
], Slider.prototype, "tooltipValue", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Slider, "i18nBundle", void 0);
Slider = Slider_1 = __decorate([
    customElement({
        tag: "ui5-slider",
        languageAware: true,
        formAssociated: true,
        template: SliderTemplate,
    })
], Slider);
Slider.define();
export default Slider;
//# sourceMappingURL=Slider.js.map