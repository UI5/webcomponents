var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SliderBase_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isPhone, supportsTouch } from "@ui5/webcomponents-base/dist/Device.js";
import { isEscape, isHome, isEnd, isUp, isDown, isRight, isLeft, isUpCtrl, isDownCtrl, isRightCtrl, isLeftCtrl, isPlus, isMinus, isPageUp, isPageDown, isF2, } from "@ui5/webcomponents-base/dist/Keys.js";
// Styles
import sliderBaseStyles from "./generated/themes/SliderBase.css.js";
import { getAssociatedLabelForTexts } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
/**
 * Fired when the value changes and the user has finished interacting with the slider.
 * @public
 */
let SliderBase = SliderBase_1 = 
/**
 * @class
 *
 * ### Overview
 * @constructor
 * @extends UI5Element
 * @public
 */
class SliderBase extends UI5Element {
    async formElementAnchor() {
        return this.getFocusDomRefAsync();
    }
    constructor() {
        super();
        /**
         * Defines the minimum value of the slider.
         * @default 0
         * @public
         */
        this.min = 0;
        /**
         * Defines the maximum value of the slider.
         * @default 100
         * @public
         */
        this.max = 100;
        /**
         * Defines the size of the slider's selection intervals (e.g. min = 0, max = 10, step = 5 would result in possible selection of the values 0, 5, 10).
         *
         * **Note:** If set to 0 the slider handle movement is disabled. When negative number or value other than a number, the component fallbacks to its default value.
         * @default 1
         * @public
         */
        this.step = 1;
        /**
         * Displays a label with a value on every N-th step.
         *
         * **Note:** The step and tickmarks properties must be enabled.
         * Example - if the step value is set to 2 and the label interval is also specified to 2 - then every second
         * tickmark will be labelled, which means every 4th value number.
         * @default 0
         * @public
         */
        this.labelInterval = 0;
        /**
         * Enables tickmarks visualization for each step.
         *
         * **Note:** The step must be a positive number.
         * @default false
         * @public
         */
        this.showTickmarks = false;
        /**
         * Enables handle tooltip displaying the current value.
         * @default false
         * @public
         */
        this.showTooltip = false;
        /**
         *
         * Indicates whether input fields should be used as tooltips for the handles.
         *
         * **Note:** Setting this option to true will only work if showTooltip is set to true.
         * **Note:** In order for the component to comply with the accessibility standard, it is recommended to set the editableTooltip property to true.
         * @default false
         * @public
         */
        this.editableTooltip = false;
        /**
         * Defines whether the slider is in disabled state.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * @private
         */
        this.value = 0;
        /**
         * @private
         */
        this._tooltipsOpen = false;
        this._labelsOverlapping = false;
        this._hiddenTickmarks = false;
        this.notResized = false;
        this._isUserInteraction = false;
        this._isInnerElementFocusing = false;
        this._labelWidth = 0;
        this._resizeHandler = this._handleResize.bind(this);
        this._moveHandler = this._handleMove.bind(this);
        this._upHandler = this._handleUp.bind(this);
        this._windowMouseoutHandler = (e) => {
            if (e.relatedTarget === document.documentElement) {
                this.handleUpBase();
            }
        };
        this._stateStorage = {
            step: undefined,
            min: undefined,
            max: undefined,
            labelInterval: undefined,
        };
    }
    _handleMove(e) { } // eslint-disable-line
    _handleUp(e) { } // eslint-disable-line
    _onmousedown(e) { } // eslint-disable-line
    _handleActionKeyPress(e) { } // eslint-disable-line
    static get ACTION_KEYS() {
        return [
            isLeft,
            isRight,
            isUp,
            isDown,
            isLeftCtrl,
            isRightCtrl,
            isUpCtrl,
            isDownCtrl,
            isPlus,
            isMinus,
            isHome,
            isEnd,
            isPageUp,
            isPageDown,
            isEscape,
        ];
    }
    static get MIN_SPACE_BETWEEN_TICKMARKS() {
        return 8;
    }
    static get TOOLTIP_VISIBILITY() {
        return {
            VISIBLE: "visible",
            HIDDEN: "hidden",
        };
    }
    static get renderer() {
        return jsxRender;
    }
    static get styles() {
        return sliderBaseStyles;
    }
    get classes() {
        return {
            root: {
                "ui5-slider-root-phone": isPhone(),
            },
            labelContainer: {
                "ui5-slider-hidden-labels": this._labelsOverlapping,
            },
        };
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._resizeHandler);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._resizeHandler);
    }
    onAfterRendering() {
        // Only call if the resize is triggered by a state changes other than
        // the ones that occured on the previous resize and those caused by user interaction.
        if (this.notResized) {
            this._resizeHandler();
        }
    }
    /** Shows the tooltip(s) if the `showTooltip` property is set to true
     * @private
     */
    _onmouseover() {
        this._tooltipsOpen = this.showTooltip;
    }
    /**
     * Hides the tooltip(s) if the `showTooltip` property is set to true
     * @private
     */
    _onmouseout() {
        if (this.showTooltip && !this.shadowRoot.activeElement) {
            this._tooltipsOpen = false;
        }
    }
    _onkeydown(e) {
        const target = e.target;
        if (isF2(e) && target.classList.contains("ui5-slider-handle")) {
            target.parentNode.querySelector("[ui5-slider-tooltip]").focus();
        }
        if (this.disabled || this._effectiveStep === 0 || target.hasAttribute("ui5-slider-handle")) {
            return;
        }
        if (SliderBase_1._isActionKey(e) && target && !target.hasAttribute("ui5-slider-tooltip")) {
            e.preventDefault();
            this._isUserInteraction = true;
            this._handleActionKeyPress(e);
        }
    }
    _onKeyupBase() {
        if (this.disabled) {
            return;
        }
        this._isUserInteraction = false;
    }
    /**
     * Flags if an inner element is currently being focused
     * @private
     */
    _preserveFocus(isFocusing) {
        this._isInnerElementFocusing = isFocusing;
    }
    /**
     * Return if an inside element within the component is currently being focused
     * @private
     */
    _isFocusing() {
        return this._isInnerElementFocusing;
    }
    /**
     * Prevent focus out when inner element within the component is currently being in process of focusing in.
     * @private
     */
    _preventFocusOut() {
        this.focusInnerElement();
    }
    /**
     * Manages the focus between the component's inner elements
     * @protected
     */
    focusInnerElement() {
        this.focus();
    }
    /**
     * Handle the responsiveness of the Slider's UI elements when resizing
     * @private
     */
    _handleResize() {
        if (!this.showTickmarks) {
            return;
        }
        // Mark resizing to avoid unneccessary calls to that function after rendering
        this.notResized = false;
        // Convert the string represented calculation expression to a normal one
        // Check the distance  in pixels exist between every tickmark
        const spaceBetweenTickmarks = this._spaceBetweenTickmarks();
        // If the pixels between the tickmarks are less than 8 only the first and the last one should be visible
        // In such case the labels must correspond to the tickmarks, only the first and the last one should exist.
        if (spaceBetweenTickmarks < SliderBase_1.MIN_SPACE_BETWEEN_TICKMARKS) {
            this._hiddenTickmarks = true;
        }
        else {
            this._hiddenTickmarks = false;
        }
        if (this.labelInterval <= 0 || this._hiddenTickmarks) {
            this._labelsOverlapping = true;
            return;
        }
        // Check if there are any overlapping labels.
        // If so - only the first and the last one should be visible
        const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize); // calculate 1 rem in pixels
        const childWidthPx = 2 * remInPx; // as specified label must be 2 rems so calculate one child width in pixels
        const labelItemsParent = this.shadowRoot.querySelector(".ui5-slider-labels");
        const labelItemsSumWidth = this._labels.length * childWidthPx; // all labels width
        const labelItemsParentWidth = labelItemsParent.clientWidth; // label parent width
        this._labelsOverlapping = labelItemsParentWidth < labelItemsSumWidth;
    }
    /**
     * Called when the user starts interacting with the slider.
     * After a down event on the slider root, listen for move events on window, so the slider value
     * is updated even if the user drags the pointer outside the slider root.
     * @protected
     */
    handleDownBase(e) {
        const min = this._effectiveMin;
        const max = this._effectiveMax;
        const domRect = this.getBoundingClientRect();
        const directionStart = this.directionStart;
        const step = this._effectiveStep;
        const newValue = SliderBase_1.getValueFromInteraction(e, step, min, max, domRect, directionStart);
        // Mark start of a user interaction
        this._isUserInteraction = true;
        window.addEventListener("mouseup", this._upHandler);
        window.addEventListener("touchend", this._upHandler);
        window.addEventListener("mouseout", this._windowMouseoutHandler);
        // Only allow one type of move event to be listened to (the first one registered after the down event)
        if (supportsTouch() && e instanceof TouchEvent) {
            window.addEventListener("touchmove", this._moveHandler);
        }
        else {
            window.addEventListener("mousemove", this._moveHandler);
        }
        this._handleFocusOnMouseDown(e);
        return newValue;
    }
    /**
     * Forward the focus to an inner inner part within the component on press
     * @private
     */
    _handleFocusOnMouseDown(e) {
        const currentlyFocusedElement = this.shadowRoot.activeElement;
        const elementToBeFocused = e.target;
        if ((!currentlyFocusedElement || currentlyFocusedElement !== elementToBeFocused) && !elementToBeFocused.hasAttribute("ui5-input")) {
            this._preserveFocus(true);
            this.focusInnerElement();
        }
    }
    /**
     * Called when the user finish interacting with the slider
     * Fires an `change` event indicating a final value change, after user interaction is finished.
     * @protected
     */
    handleUpBase() {
        window.removeEventListener("mouseup", this._upHandler);
        window.removeEventListener("touchend", this._upHandler);
        window.removeEventListener("mouseout", this._windowMouseoutHandler);
        // Only one of the following was attached, but it's ok to remove both as there is no error
        window.removeEventListener("mousemove", this._moveHandler);
        window.removeEventListener("touchmove", this._moveHandler);
        this._isUserInteraction = false;
        this._preserveFocus(false);
    }
    /**
     * Updates state storage for the value-related property
     * Fires an `input` event indicating a value change via interaction that is not yet finished.
     * @protected
     */
    updateStateStorageAndFireInputEvent(valueType) {
        this.storePropertyState(valueType);
        if (this._isUserInteraction) {
            this.fireDecoratorEvent("input");
        }
    }
    /**
     * Goes through the key shortcuts available for the component and returns 'true' if the event is triggered by one.
     * @private
     */
    static _isActionKey(e) {
        return this.ACTION_KEYS.some(actionKey => actionKey(e));
    }
    /**
     * Locks the given value between min and max boundaries based on slider properties
     * @protected
     */
    static clipValue(value, min, max) {
        value = Math.min(Math.max(value, min), max);
        return value;
    }
    /**
     * Sets the slider value from an event
     * @protected
     */
    static getValueFromInteraction(e, stepSize, min, max, boundingClientRect, directionStart) {
        const pageX = this.getPageXValueFromEvent(e);
        const value = this.computedValueFromPageX(pageX, min, max, boundingClientRect, directionStart);
        const steppedValue = this.getSteppedValue(value, stepSize, min);
        return this.clipValue(steppedValue, min, max);
    }
    /**
     * "Stepify" the raw value - calculate the new value depending on the specified step property
     * @protected
     */
    static getSteppedValue(value, stepSize, min) {
        const stepModuloValue = Math.abs((value - min) % stepSize);
        if (stepSize === 0 || stepModuloValue === 0) {
            return value;
        }
        // Clip (snap) the new value to the nearest step
        value = (stepModuloValue * 2 >= stepSize) ? (value + stepSize) - stepModuloValue : value - stepModuloValue;
        // If the step value is not a round number get its precision
        const stepPrecision = SliderBase_1._getDecimalPrecisionOfNumber(stepSize);
        return Number(value.toFixed(stepPrecision));
    }
    /**
     * Gets pageX value from event on user interaction with the Slider
     * @protected
     */
    static getPageXValueFromEvent(e) {
        if (supportsTouch() && e instanceof TouchEvent) {
            if (e.targetTouches && e.targetTouches.length > 0) {
                return e.targetTouches[0].pageX;
            }
            return 0;
        }
        return e.pageX; // MouseEvent
    }
    /**
     * Computes the new value (in %) from the pageX position of the cursor.
     * Returns the value rounded to a precision of at most 2 digits after decimal point.
     * @protected
     */
    static computedValueFromPageX(pageX, min, max, boundingClientRect, directionStart) {
        // Determine pageX position relative to the Slider DOM
        const xRelativePosition = directionStart === "left" ? pageX - boundingClientRect[directionStart] : boundingClientRect[directionStart] - pageX;
        // Calculate the percentage complete (the "progress")
        const percentageComplete = xRelativePosition / boundingClientRect.width;
        // Fit (map) the complete percentage between the min/max value range
        return min + percentageComplete * (max - min);
    }
    /**
     * Calculates the precision (decimal places) of a number, returns 0 if integer
     * Handles scientific notation cases.
     * @private
     */
    static _getDecimalPrecisionOfNumber(value) {
        if (Number.isInteger(value)) {
            return 0;
        }
        const match = (String(value)).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match || match.length < 2) {
            return 0;
        }
        return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? Number(match[2]) : 0));
    }
    /**
     * In order to always keep the visual UI representation and the internal
     * state in sync, the component has a 'state storage' that is updated when the
     * current state is changed due to a user action.
     *
     * Check if the previously saved state is outdated. That would mean
     * a property has been changed programmatically because the previous state
     * is always updated in the interaction handlers.
     *
     * Will return true if any of the properties is not equal to its previously
     * stored value.
     * @protected
     */
    isCurrentStateOutdated() {
        return Object.entries(this._stateStorage).some(([propName, propValue]) => this[propName] !== propValue);
    }
    /**
     * Returns the last stored value of a property
     * @protected
     */
    getStoredPropertyState(prop) {
        return this._stateStorage[prop];
    }
    /**
     * Check if one or more properties have been updated compared to their last
     * saved values in the state storage.
     * @protected
     */
    isPropertyUpdated(...props) {
        return props.some(prop => this.getStoredPropertyState(prop) !== this[prop]);
    }
    /**
     * Updates the previously saved in the _stateStorage values of one or more properties.
     * @protected
     */
    storePropertyState(...props) {
        props.forEach(prop => {
            this._stateStorage[prop] = this[prop];
        });
    }
    /**
     * Returns the start side of a direction - left for LTR, right for RTL
     */
    get directionStart() {
        return this.effectiveDir === "rtl" ? "right" : "left";
    }
    /**
     * Calculates the labels amount, width and text and creates them
     * @private
     */
    _createLabels() {
        if (!this.labelInterval || !this.showTickmarks) {
            return;
        }
        const labelInterval = this.labelInterval;
        const step = this._effectiveStep;
        const newNumberOfLabels = (this._effectiveMax - this._effectiveMin) / (step * labelInterval);
        // If the required labels are already rendered
        if (newNumberOfLabels === this._oldNumberOfLabels && this._oldMin === this._effectiveMin && this._oldMax === this._effectiveMax) {
            return;
        }
        this._oldMin = this._effectiveMin;
        this._oldMax = this._effectiveMax;
        this._oldNumberOfLabels = newNumberOfLabels;
        this._labelWidth = 100 / newNumberOfLabels;
        this._labelValues = [];
        // If the step value is not a round number get its precision
        const stepPrecision = SliderBase_1._getDecimalPrecisionOfNumber(step);
        // numberOfLabels below can be float so that the "distance betweenlabels labels"
        // calculation to be precize (exactly the same as the distance between the tickmarks).
        // That's ok as the loop stop condition is set to an integer, so it will practically
        // "floor" the number of labels anyway.
        for (let i = 0; i <= newNumberOfLabels; i++) {
            // Format the label numbers with the same decimal precision as the value of the step property
            const labelItemNumber = ((i * step * labelInterval) + this._effectiveMin).toFixed(stepPrecision);
            this._labelValues.push(labelItemNumber);
        }
    }
    _handleActionKeyPressBase(e, affectedPropName) {
        const isUpAction = SliderBase_1._isIncreaseValueAction(e, this.directionStart);
        const isBigStep = SliderBase_1._isBigStepAction(e);
        const currentValue = this[affectedPropName];
        const min = this._effectiveMin;
        const max = this._effectiveMax;
        let step = this._effectiveStep;
        // If the action key corresponds to a long step and the slider has more than 10 normal steps,
        // make a jump of 1/10th of the Slider's length, otherwise just use the normal step property.
        step = isBigStep && ((max - min) / step > 10) ? (max - min) / 10 : step;
        if (isEnd(e)) {
            return max - currentValue;
        }
        if (isHome(e)) {
            return (currentValue - min) * -1;
        }
        return isUpAction ? step : step * -1;
    }
    static _isIncreaseValueAction(e, directionStart) {
        if (directionStart === "right") {
            return isUp(e) || isUpCtrl(e) || isLeft(e) || isLeftCtrl(e) || isPlus(e) || isPageUp(e);
        }
        return isUp(e) || isUpCtrl(e) || isRight(e) || isRightCtrl(e) || isPlus(e) || isPageUp(e);
    }
    static _isBigStepAction(e) {
        return isDownCtrl(e) || isUpCtrl(e) || isLeftCtrl(e) || isRightCtrl(e) || isPageUp(e) || isPageDown(e);
    }
    get _tickmarksCount() {
        return (this._effectiveMax - this._effectiveMin) / this._effectiveStep;
    }
    /**
     * Calculates space between tickmarks
     * @private
     */
    _spaceBetweenTickmarks() {
        return this.getBoundingClientRect().width / this._tickmarksCount;
    }
    /**
     * Notify in case of a invalid step value type
     * @private
     */
    _validateStep(step) {
        if (step === 0) {
            console.warn("The 'step' property must be a positive float number"); // eslint-disable-line
        }
        if (step < 0) {
            console.warn("The 'step' property must be a positive float number. The provided negative number has been converted to its positve equivalent"); // eslint-disable-line
        }
        if (Number.isNaN(step)) {
            console.warn("The 'step' property must be a positive float number. It has been set to its default value of 1"); // eslint-disable-line
        }
    }
    get _labels() {
        return this._labelValues || [];
    }
    /**
     * Normalizes a new `step` property value.
     * If tickmarks are enabled recreates them according to it.
     * @private
     */
    get _effectiveStep() {
        let step = this.step;
        if (step < 0) {
            step = Math.abs(step);
        }
        if (Number.isNaN(step)) {
            step = 1;
        }
        return step;
    }
    get _effectiveMin() {
        return Math.min(this.min, this.max);
    }
    get _effectiveMax() {
        return Math.max(this.min, this.max);
    }
    get _tabIndex() {
        return this.disabled ? -1 : 0;
    }
    get _ariaKeyshortcuts() {
        return this.editableTooltip ? "F2" : undefined;
    }
    get _ariaDescribedByHandleText() {
        return this.editableTooltip ? "ui5-slider-InputDesc" : undefined;
    }
    get _ariaLabel() {
        const associatedLabelText = getAssociatedLabelForTexts(this);
        const hasAccessibleName = !!this.accessibleName;
        let labelText = hasAccessibleName
            ? `${this.accessibleName} ${this._ariaLabelledByText}`
            : this._ariaLabelledByText;
        if (!hasAccessibleName && associatedLabelText) {
            labelText = `${associatedLabelText} ${labelText}`;
        }
        return labelText;
    }
    get _ariaDescribedByInputText() {
        return "";
    }
    get _ariaLabelledByInputText() {
        return "";
    }
};
__decorate([
    property({ type: Number })
], SliderBase.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], SliderBase.prototype, "max", void 0);
__decorate([
    property()
], SliderBase.prototype, "name", void 0);
__decorate([
    property({ type: Number })
], SliderBase.prototype, "step", void 0);
__decorate([
    property({ type: Number })
], SliderBase.prototype, "labelInterval", void 0);
__decorate([
    property({ type: Boolean })
], SliderBase.prototype, "showTickmarks", void 0);
__decorate([
    property({ type: Boolean })
], SliderBase.prototype, "showTooltip", void 0);
__decorate([
    property({ type: Boolean })
], SliderBase.prototype, "editableTooltip", void 0);
__decorate([
    property({ type: Boolean })
], SliderBase.prototype, "disabled", void 0);
__decorate([
    property()
], SliderBase.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Number })
], SliderBase.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], SliderBase.prototype, "_tooltipsOpen", void 0);
__decorate([
    property({ type: Boolean })
], SliderBase.prototype, "_labelsOverlapping", void 0);
__decorate([
    property({ type: Boolean })
], SliderBase.prototype, "_hiddenTickmarks", void 0);
SliderBase = SliderBase_1 = __decorate([
    event("change", {
        bubbles: true,
    })
    /**
     * Fired when the value changes due to user interaction that is not yet finished - during mouse/touch dragging.
     * @public
     */
    ,
    event("input", {
        bubbles: true,
    })
    /**
     * @class
     *
     * ### Overview
     * @constructor
     * @extends UI5Element
     * @public
     */
], SliderBase);
export default SliderBase;
//# sourceMappingURL=SliderBase.js.map