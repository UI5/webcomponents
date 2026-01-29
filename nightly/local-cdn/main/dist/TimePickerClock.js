var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
// Template
import TimePickerClockTemplate from "./TimePickerClockTemplate.js";
// Styles
import TimePickerClockCss from "./generated/themes/TimePickerClock.css.js";
const CLOCK_NUMBER_CLASS = "ui5-tp-clock-number";
const CLOCK_NUMBER_SELECTED_CLASS = "ui5-tp-clock-selected";
const CLOCK_NUMBER_HOVERED_CLASS = "ui5-tp-clock-hovered";
const CLOCK_MIDDOT_CLASS = "ui5-tp-clock-mid-dot";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-time-picker-clock` allows selecting of hours,minutes or seconds (depending on property set).
 * The component supports interactions with mouse, touch and mouse wheel.
 * The step for displaying or selecting of items can be configured.
 *
 * `ui5-time-picker-clock` is used as part of `ui5-time-selection-clocks` component, which
 * is used in `ui5-time-picker` component respectively.
 *
 * ### Usage
 *
 * `ui5-time-picker-clock` can display hours, minutes or seconds
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TimePickerClock.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.15.0
 * @private
 */
let TimePickerClock = class TimePickerClock extends UI5Element {
    constructor() {
        super();
        /**
         * Determines whether the component is displayed as disabled.
         * @default false
         */
        this.disabled = false;
        /**
         * Determines whether the component is active (visible).
         * @default false
         */
        this.active = false;
        /**
         * Minimum item value for the circle of the clock.
         * @default -1
         */
        this.itemMin = -1;
        /**
         * Maximum item value for the circle of the clock.
         * @default -1
         */
        this.itemMax = -1;
        /**
         * If set to `true`, a surrounding circle with markers (dots) will be hidden.
         * (for example, on the 'Minutes' clock-dial, markers represent minutes).
         * @default false
         */
        this.hideFractions = false;
        /**
         * If provided, this will replace the last item displayed. Usually, the last item ('12', '24' or '60') is replaced with '0'.
         * @default -1
         */
        this.lastItemReplacement = -1;
        /**
         * Prepend with zero flag. If `true`, values less than 10 will be prepend with 0.
         * @default false
         */
        this.prependZero = false;
        /**
         * The currently selected value of the clock.
         * @default -1
         */
        this.selectedValue = -1;
        /**
         * The step for displaying of one unit of items.
         * 1 means 1/60 of the circle.
         * The default display step is 5 which means minutes and seconds are displayed as "0", "5", "10", etc.
         * For hours the display step must be set to 1.
         * @default 5
         */
        this.displayStep = 5;
        /**
         * The step for selection of items.
         * 1 means 1 unit:
         * - if the clock displays hours - 1 unit = 1 hour
         * - if the clock displays minutes/seconds - 1 unit = 1 minute/second
         * @default 1
         */
        this.valueStep = 1;
        /**
         * Defines the currently available Time Picker Clock items depending on Clock setup.
         */
        this._items = [];
        /**
         * Defines the currently selected Time Picker Clock item.
         */
        this._selectedItem = {};
        /**
         * Defines the currently hovered Time Picker Clock item.
         */
        this._hoveredItem = {};
        /**
         * Keeps variables used in interaction calculations.
         */
        this._dimensionParameters = {
            radius: 0,
            centerX: 0,
            centerY: 0,
            dotHeight: 0,
            numberHeight: 0,
            activeRadiusMax: 0,
            activeRadiusMin: 0,
            offsetX: 0,
            offsetY: 0,
        };
        /**
         * Mousedown or Touchstart event flag.
         * @default false
         */
        this._mouseOrTouchDown = false;
        /**
         * Cancel Mouseout flag.
         * @default false
         */
        this._cancelTouchOut = false;
        /**
         * Calculated selected value of the clock during interactions.
         * @default -1
         */
        this._selectedValue = -1;
        /**
         * Selected value of the clock during interactions.
         * @default -1
         */
        this._movSelectedValue = -1;
        /**
         * Hovered value of the clock during interactions.
         * @default -1
         */
        this._hoveredValue = -1;
        /**
         * Previously hovered value of the clock during interactions.
         * @default -1
         */
        this._prevHoveredValue = -1;
        /**
         * Animation skip flag. If set to `true`, the component will not have transition animation when displayed.
         * @default false
         */
        this._skipAnimation = false;
        this._fnOnMouseOutUp = () => {
            this._mouseOrTouchDown = false;
        };
    }
    onEnterDOM() {
        document.addEventListener("mouseup", this._fnOnMouseOutUp, false);
    }
    onExitDOM() {
        document.removeEventListener("mouseup", this._fnOnMouseOutUp, false);
    }
    onBeforeRendering() {
        this._prepareClockItems();
        this._selectedItem = this._updateSelectedOrHoveredItem(this._fixReplacementValue(this.selectedValue), CLOCK_NUMBER_SELECTED_CLASS);
        this._hoveredItem = this._updateSelectedOrHoveredItem(this._fixReplacementValue(this._hoveredValue), CLOCK_NUMBER_HOVERED_CLASS);
    }
    get _itemsCount() {
        return this.itemMax - this.itemMin + 1;
    }
    get _angleStep() {
        return this.hideFractions ? 360 / this._itemsCount : 6;
    }
    /**
     * Returns the real value of the passed clock item, if the replacement must be done, returns the replaced value.
     * @param value The value of the clock item
     * @returns The real/replaced value
     */
    _fixReplacementValue(value) {
        let realValue = value;
        if (realValue === 0) {
            realValue = this.itemMax;
        }
        if (realValue === this.itemMax && this.lastItemReplacement !== -1) {
            realValue = this.lastItemReplacement;
        }
        return realValue;
    }
    /**
     * Returns internally selected or hovered value object constructed for rendering purposes.
     * @param value currently selected or hovered value.
     * @returns Selected or hovered value object
     */
    _updateSelectedOrHoveredItem(value, cssClass) {
        if (value === -1) {
            return {
                showMarker: false,
            };
        }
        const selectedOrHoveredItem = (value >= this.itemMin && value <= this.itemMax) || value === this.lastItemReplacement;
        const stepAngle = 360 / (this.itemMax - this.itemMin + 1);
        let currentAngle = selectedOrHoveredItem ? value * stepAngle : undefined;
        if (currentAngle !== undefined) {
            currentAngle %= 360;
        }
        return {
            "angle": currentAngle,
            "item": selectedOrHoveredItem ? value.toString() : "",
            "showMarker": selectedOrHoveredItem,
            "itemClasses": `${CLOCK_NUMBER_CLASS} ${selectedOrHoveredItem ? cssClass : ""}`,
        };
    }
    /**
     * Prepares clock items objects according to current clock settings. Item objects are used for rendering purposes.
     */
    _prepareClockItems() {
        const values = [];
        const angleStep = this._angleStep;
        const visualItemsCount = 360 / angleStep;
        const multiplier = visualItemsCount / this._itemsCount;
        let item;
        let i;
        this._items = [];
        for (i = this.itemMin; i <= this.itemMax; i++) {
            values.push({
                "item": i.toString(),
            });
        }
        if (this.lastItemReplacement !== -1) {
            values[values.length - 1].item = this.lastItemReplacement.toString();
        }
        for (i = 1; i <= visualItemsCount; i++) {
            item = i % (this.displayStep * multiplier) !== 0 ? {} : values[i / multiplier - 1];
            item.angle = i * angleStep;
            this._items.push(item);
        }
    }
    /**
     * Returns the DOM Reference of the clock cover element
     * @returns the DOM Reference
     */
    _getClockCoverContainerDomRef() {
        const domRef = this.getDomRef();
        return domRef && domRef.querySelector(".ui5-tp-clock-cover");
    }
    /**
     * Calculates the outer height of a HTML element.
     * @param element The element which outer height to be calculated
     * @returns Outer height of the passed HTML element
     */
    _outerHeight(element) {
        if (!element) {
            return 0;
        }
        const style = window.getComputedStyle(element);
        return element.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
    }
    /**
     * Returns the Id of the DOM element of the clock item that display specific value.
     * @param value The value of the clock item
     * @returns Id of the clock item element
     */
    _hoveredId(value) {
        if (value === this.itemMax && this.lastItemReplacement !== -1) {
            value = this.lastItemReplacement;
        }
        return `#${this._id}-${value.toString()}`;
    }
    /**
     * Returns provided value as string. Padding with additional zero is applied if necessary.
     * @param value The value that should be returned as string
     * @returns The value as string
     */
    _getStringValue(value) {
        return this.prependZero ? value.toString().padStart(2, "0") : value.toString();
    }
    /**
     * Calculates dimension variables necessary for determining of item selection.
     * @returns Dimensions object
     */
    _calculateDimensions() {
        const cover = this.getDomRef();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (!cover) {
            return;
        }
        const domRef = this.getDomRef();
        const dotElement = domRef.querySelector(`.${CLOCK_MIDDOT_CLASS}`);
        const numberElement = domRef.querySelector(`.${CLOCK_NUMBER_CLASS}`);
        const radius = Math.round(cover.offsetHeight / 2);
        const dotHeight = this._outerHeight(dotElement);
        const numberHeight = this._outerHeight(numberElement);
        const offset = cover.getBoundingClientRect();
        this._dimensionParameters = {
            "radius": radius,
            "centerX": radius,
            "centerY": radius,
            "dotHeight": dotHeight,
            "numberHeight": numberHeight,
            "activeRadiusMax": radius,
            "activeRadiusMin": radius - numberHeight * 1.5 - 1,
            "offsetX": offset.left + scrollLeft,
            "offsetY": offset.top + scrollTop,
        };
    }
    /**
     * Calculates selected and hovered values based on click/touch position.
     * @param x X position of click/touch returned by the event
     * @param y Y position of click/touch returned by the event
     */
    _calculatePosition(x, y) {
        const dX = x - this._dimensionParameters.offsetX + 1 - this._dimensionParameters.radius;
        const dY = y - this._dimensionParameters.offsetY + 1 - this._dimensionParameters.radius;
        const mod = dX >= 0 ? 0 : 180;
        const angle = ((Math.atan(dY / dX) * 180) / Math.PI) + 90 + mod;
        const angleStep = (360 / this.itemMax) * this.valueStep;
        const radius = Math.sqrt(dX * dX + dY * dY);
        const isInActiveZone = radius <= this._dimensionParameters.activeRadiusMax && radius > this._dimensionParameters.activeRadiusMin;
        let finalAngle = Math.round((angle === 0 ? 360 : angle) / angleStep) * angleStep;
        if (finalAngle === 0) {
            finalAngle = 360;
        }
        // selected item calculations
        this._selectedValue = isInActiveZone ? (finalAngle / angleStep) * this.valueStep : -1;
        // hover simulation calculations
        this._hoveredValue = isInActiveZone ? this._selectedValue : -1;
        if (this._selectedValue === this.itemMax && this.lastItemReplacement !== -1) {
            this._selectedValue = this.lastItemReplacement;
        }
    }
    /**
     * Mousewheel handler. Increases/decreases value of the clock.
     * @param increase whether to increase or decrease the value
     */
    _modifyValue(increase) {
        let selectedValue = this.selectedValue;
        const replacementValue = this.lastItemReplacement;
        let step = this.valueStep;
        let newValue;
        // fix step in order to change value to the nearest possible if step is > 1
        if (selectedValue % step !== 0) {
            newValue = increase ? Math.ceil(selectedValue / step) * step : Math.floor(selectedValue / step) * step;
            step = Math.abs(selectedValue - newValue);
        }
        if (selectedValue === replacementValue) {
            selectedValue = this.itemMax;
        }
        if (increase) {
            selectedValue += step;
            if (selectedValue > this.itemMax) {
                selectedValue -= this.itemMax;
            }
        }
        else {
            selectedValue -= step;
            if (selectedValue < this.itemMin) {
                selectedValue = this.itemMax;
            }
        }
        this._setSelectedValue(selectedValue);
    }
    /**
     * Sets new selected value, fires change event and updates selected value object used for rendering purposes.
     * @param value a value to be set
     * @param bFinalChange whether the change is final or not
     */
    _setSelectedValue(value, bFinalChange = false) {
        const realValue = this._fixReplacementValue(value);
        this.selectedValue = realValue;
        this.fireDecoratorEvent("change", {
            value: realValue,
            stringValue: this._getStringValue(realValue),
            finalChange: bFinalChange,
        });
        this._selectedItem = this._updateSelectedOrHoveredItem(realValue, CLOCK_NUMBER_SELECTED_CLASS);
    }
    /**
     * TouchStart/MouseDown event handler.
     * @param evt Event object
     */
    _onTouchStart(evt) {
        this._cancelTouchOut = false;
        if (this.disabled || this._mouseOrTouchDown) {
            return;
        }
        const x = evt.type === "touchstart" ? evt.touches[0].pageX : evt.pageX;
        const y = evt.type === "touchstart" ? evt.touches[0].pageY : evt.pageY;
        this._movSelectedValue = this.selectedValue;
        this._calculateDimensions();
        this._calculatePosition(x, y);
        this._mouseOrTouchDown = true;
    }
    /**
     * TouchMove/MouseMove event handler.
     * @param evt Event object
     */
    _onTouchMove(evt) {
        evt.preventDefault();
        if (this._mouseOrTouchDown) {
            const x = evt.type === "touchmove" ? evt.touches[0].pageX : evt.pageX;
            const y = evt.type === "touchmove" ? evt.touches[0].pageY : evt.pageY;
            this._calculatePosition(x, y);
            if (!this.disabled && this._selectedValue !== -1 && this._selectedValue !== this._movSelectedValue) {
                this._setSelectedValue(this._selectedValue);
                this._movSelectedValue = 0 + this._selectedValue;
            }
        }
        else if (evt.type === "mousemove") {
            if (!this._dimensionParameters.radius) {
                this._calculateDimensions();
            }
            this._calculatePosition(evt.pageX, evt.pageY);
        }
    }
    /**
     * TouchEnd/MouseUp event handler.
     * @param evt Event object
     */
    _onTouchEnd(evt) {
        if (!this._mouseOrTouchDown) {
            return;
        }
        this._mouseOrTouchDown = false;
        evt.preventDefault();
        if (this.disabled || this._selectedValue === -1) {
            return;
        }
        if (!this._cancelTouchOut) {
            this._setSelectedValue(this._selectedValue, true);
        }
    }
    /**
     * Mouse Wheel event handler.
     * @param evt Event object
     */
    _onMouseWheel(evt) {
        const increase = evt.detail ? (evt.detail > 0) : (evt.deltaY > 0 || evt.deltaX > 0);
        evt.preventDefault();
        if (!this._mouseOrTouchDown) {
            this._modifyValue(increase);
        }
    }
    /**
     * MouseOut event handler.
     */
    _onMouseOut() {
        this._hoveredValue = -1;
        this._prevHoveredValue = -1;
    }
    noop() {
        return false;
    }
};
__decorate([
    property({ type: Boolean })
], TimePickerClock.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], TimePickerClock.prototype, "active", void 0);
__decorate([
    property({ type: Number })
], TimePickerClock.prototype, "itemMin", void 0);
__decorate([
    property({ type: Number })
], TimePickerClock.prototype, "itemMax", void 0);
__decorate([
    property()
], TimePickerClock.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], TimePickerClock.prototype, "hideFractions", void 0);
__decorate([
    property({ type: Number })
], TimePickerClock.prototype, "lastItemReplacement", void 0);
__decorate([
    property({ type: Boolean })
], TimePickerClock.prototype, "prependZero", void 0);
__decorate([
    property({ type: Number })
], TimePickerClock.prototype, "selectedValue", void 0);
__decorate([
    property({ type: Number })
], TimePickerClock.prototype, "displayStep", void 0);
__decorate([
    property({ type: Number })
], TimePickerClock.prototype, "valueStep", void 0);
__decorate([
    property({ type: Array })
], TimePickerClock.prototype, "_items", void 0);
__decorate([
    property({ type: Object })
], TimePickerClock.prototype, "_selectedItem", void 0);
__decorate([
    property({ type: Object })
], TimePickerClock.prototype, "_hoveredItem", void 0);
__decorate([
    property({ type: Object })
], TimePickerClock.prototype, "_dimensionParameters", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TimePickerClock.prototype, "_mouseOrTouchDown", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TimePickerClock.prototype, "_cancelTouchOut", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], TimePickerClock.prototype, "_selectedValue", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], TimePickerClock.prototype, "_movSelectedValue", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], TimePickerClock.prototype, "_hoveredValue", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], TimePickerClock.prototype, "_prevHoveredValue", void 0);
__decorate([
    property({ type: Boolean })
], TimePickerClock.prototype, "_skipAnimation", void 0);
__decorate([
    query(".ui5-tp-clock-number")
], TimePickerClock.prototype, "_firstNumberElement", void 0);
__decorate([
    query(".ui5-tp-clock")
], TimePickerClock.prototype, "_clockWrapper", void 0);
TimePickerClock = __decorate([
    customElement({
        tag: "ui5-time-picker-clock",
        renderer: jsxRenderer,
        styles: TimePickerClockCss,
        template: TimePickerClockTemplate,
    })
    /**
     * Fired when a value of clock is changed.
     * @param { integer } value The new `value` of the clock.
     * @param { string } stringValue The new `value` of the clock, as string, zero-prepended when necessary.
     * @param { boolean } finalChange `true` when a value is selected and confirmed, `false` when a value is only selected but not confirmed.
     */
    ,
    event("change", {
        bubbles: true,
    })
], TimePickerClock);
TimePickerClock.define();
export default TimePickerClock;
//# sourceMappingURL=TimePickerClock.js.map