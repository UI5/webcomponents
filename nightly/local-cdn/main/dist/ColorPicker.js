var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ColorPicker_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { getRGBColor, getAlpha, } from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
import "@ui5/webcomponents-icons/dist/expand.js";
import ColorValue from "./colorpicker-utils/ColorValue.js";
import ColorPickerTemplate from "./ColorPickerTemplate.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import { COLORPICKER_LABEL, COLORPICKER_SLIDER_GROUP, COLORPICKER_ALPHA_SLIDER, COLORPICKER_HUE_SLIDER, COLORPICKER_HEX, COLORPICKER_RED, COLORPICKER_GREEN, COLORPICKER_BLUE, COLORPICKER_ALPHA, COLORPICKER_SATURATION, COLORPICKER_LIGHT, COLORPICKER_HUE, COLORPICKER_TOGGLE_MODE_TOOLTIP, COLORPICKER_PERCENTAGE, COLORPICKER_COLOR_MODE_CHANGED, } from "./generated/i18n/i18n-defaults.js";
// Styles
import ColorPickerCss from "./generated/themes/ColorPicker.css.js";
const PICKER_POINTER_WIDTH = 6.5;
/**
 * @class
 *
 * ### Overview
 * The `ui5-color-picker` allows users to choose any color and provides different input options for selecting colors.
 *
 * ### Usage
 *
 * #### When to use
 * Use the color picker if:
 *
 * -  users need to select any color freely.
 *
 * #### When not to use
 *
 * -  Users need to select one color from a predefined set of colors. Use the ColorPalette component instead.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ColorPicker.js";`
 * @constructor
 * @since 1.0.0-rc.12
 * @extends UI5Element
 * @public
 */
let ColorPicker = ColorPicker_1 = class ColorPicker extends UI5Element {
    async formElementAnchor() {
        return this.getFocusDomRefAsync();
    }
    get formFormattedValue() {
        return this.value;
    }
    constructor() {
        super();
        /**
         * Defines the currently selected color of the component.
         *
         * **Note**: use HEX, RGB, RGBA, HSV formats or a CSS color name when modifying this property.
         * @default "rgba(255,255,255,1)"
         * @public
         */
        this.value = "rgba(255,255,255,1)";
        /**
         * When set to `true`, the alpha slider and inputs for RGB values will not be displayed.
         * @default false
         * @public
         * @since 2.5.0
         */
        this.simplified = false;
        /**
         * @private
         */
        this._alpha = 1;
        /**
         * @private
         */
        this._hue = 0;
        /**
         * @private
         */
        this._isSelectedColorChanged = false;
        /**
         * @private
         */
        this._isHueValueChanged = false;
        /**
         * @private
         */
        this._wrongHEX = false;
        /**
         * @private
         */
        this._displayHSL = false;
        this._colorValue = new ColorValue();
        // Bottom Right corner
        this._selectedCoordinates = {
            x: 256 - PICKER_POINTER_WIDTH,
            y: 256 - PICKER_POINTER_WIDTH,
        };
        // Default main color is red
        this._mainValue = {
            r: 255,
            g: 0,
            b: 0,
        };
        this.selectedHue = 0;
        this.mouseDown = false;
        this.mouseIn = false;
    }
    onBeforeRendering() {
        const valueAsRGB = getRGBColor(this.value);
        if (!this._isColorValueEqual(valueAsRGB)) {
            this._colorValue.RGB = valueAsRGB;
        }
        const alpha = getAlpha(this.value);
        if (alpha !== this._colorValue.Alpha) {
            this._colorValue.Alpha = alpha;
            this._alpha = this._colorValue.Alpha;
        }
        const tempColor = this._colorValue.toRGBString();
        this._updateColorGrid();
        this.style.setProperty("--ui5_Color_Picker_Progress_Container_Color", tempColor);
    }
    _handleMouseDown(e) {
        this.mouseDown = true;
        this.mouseIn = true;
        this._changeSelectedColor(e.offsetX, e.offsetY);
    }
    _handleMouseUp() {
        this.mouseDown = false;
    }
    _handleMouseOut(e) {
        if (!this.mouseIn || !this.mouseDown) {
            return;
        }
        const target = e.target;
        const offsetHeight = target.offsetHeight;
        const offsetWidth = target.offsetWidth;
        const isLeft = e.offsetX <= 0;
        const isUp = e.offsetY <= 0;
        const isDown = e.offsetY >= target.offsetHeight;
        const isRight = e.offsetX >= target.offsetWidth;
        let x, y;
        if (isLeft) {
            x = 0;
        }
        else if (isRight) {
            // Note: - e.offsetWidth has been changed to e.target.offsetWidth as offsetWidth does not exist on the event object
            x = offsetWidth;
        }
        else {
            x = e.offsetX;
        }
        if (isUp) {
            y = 0;
        }
        else if (isDown) {
            // Note: - e.offsetWidth has been changed to e.target.offsetWidth as offsetWidth does not exist on the event object
            y = offsetHeight;
        }
        else {
            y = e.offsetY;
        }
        this._changeSelectedColor(x, y);
        this.mouseIn = false;
        this.mouseDown = false;
    }
    _handleMouseMove(e) {
        if (!this.mouseDown || !this.mouseIn) {
            return;
        }
        this._changeSelectedColor(e.offsetX, e.offsetY);
    }
    _handleAlphaInput(e) {
        const aphaInputValue = String(e.currentTarget.value);
        this._alphaTemp = aphaInputValue;
        this._alpha = parseFloat(aphaInputValue);
        if (Number.isNaN(this._alpha)) {
            this._alpha = 1;
        }
        this._colorValue.Alpha = this._alpha;
        this._isHueValueChanged = true;
        const color = this._colorValue.toRGBString();
        this._setValue(color);
    }
    _handleHueInput(e) {
        this.selectedHue = e.target.value;
        this._hue = this.selectedHue;
        this._setMainColor(this._hue);
        // Idication that changes to the hue value triggered as a result of user pressing over the hue slider.
        this._isHueValueChanged = true;
        this._colorValue.H = this._hue;
        const color = this._colorValue.toRGBString();
        this._setValue(color);
    }
    _handleHEXChange(e) {
        const input = e.target;
        let inputValueLowerCase = input.value.toLowerCase();
        if (inputValueLowerCase.startsWith("#")) {
            inputValueLowerCase = inputValueLowerCase.slice(1);
        }
        // Shorthand Syntax
        if (inputValueLowerCase.length === 3) {
            inputValueLowerCase = `${inputValueLowerCase[0]}${inputValueLowerCase[0]}${inputValueLowerCase[1]}${inputValueLowerCase[1]}${inputValueLowerCase[2]}${inputValueLowerCase[2]}`;
        }
        this._colorValue.HEX = inputValueLowerCase;
        const isValidColor = this._colorValue.isColorValueValid();
        if (isValidColor && input.value !== inputValueLowerCase) {
            this._wrongHEX = false;
            input.value = inputValueLowerCase;
        }
        if (!isValidColor) {
            this._wrongHEX = true;
        }
        else {
            this._wrongHEX = false;
            const color = this._colorValue.toRGBString();
            this._setValue(color);
        }
    }
    _togglePickerMode() {
        this._displayHSL = !this._displayHSL;
        // Announce a message to screen readers
        announce(this.colorFieldsAnnouncementText, InvisibleMessageMode.Polite);
    }
    _handleColorInputChange(e) {
        const target = e.target;
        const targetValue = parseInt(target.value) || 0;
        let normalizedValue = targetValue;
        switch (target.id) {
            case "red":
                this._colorValue.R = targetValue;
                normalizedValue = this._colorValue.R;
                break;
            case "green":
                this._colorValue.G = targetValue;
                normalizedValue = this._colorValue.G;
                break;
            case "blue":
                this._colorValue.B = targetValue;
                normalizedValue = this._colorValue.B;
                break;
            case "hue":
                this._colorValue.H = targetValue;
                normalizedValue = this._colorValue.H;
                break;
            case "saturation":
                this._colorValue.S = targetValue;
                normalizedValue = this._colorValue.S;
                break;
            case "light":
                this._colorValue.L = targetValue;
                normalizedValue = this._colorValue.L;
                break;
        }
        target.value = String(normalizedValue);
        const color = this._colorValue.toRGBString();
        this._setValue(color);
        this._updateColorGrid();
    }
    _setMainColor(hueValue) {
        const hueValueMod = hueValue * 4.251;
        if (hueValueMod <= 255) {
            this._mainValue = {
                r: 255,
                g: hueValueMod,
                b: 0,
            };
        }
        else if (hueValueMod <= 510) {
            this._mainValue = {
                r: 255 - (hueValueMod - 255),
                g: 255,
                b: 0,
            };
        }
        else if (hueValueMod <= 765) {
            this._mainValue = {
                r: 0,
                g: 255,
                b: hueValueMod - 510,
            };
        }
        else if (hueValueMod <= 1020) {
            this._mainValue = {
                r: 0,
                g: 765 - (hueValueMod - 255),
                b: 255,
            };
        }
        else if (hueValueMod <= 1275) {
            this._mainValue = {
                r: hueValueMod - 1020,
                g: 0,
                b: 255,
            };
        }
        else {
            this._mainValue = {
                r: 255,
                g: 0,
                b: 1275 - (hueValueMod - 255),
            };
        }
    }
    _handleAlphaChange() {
        // parse the input value if valid or fallback to default
        this._alpha = this._alphaTemp ? parseFloat(this._alphaTemp) : 1;
        if (Number.isNaN(this._alpha)) {
            this._alpha = 1;
        }
        // reset input value so _alpha is rendered
        this._alphaTemp = undefined;
        // normalize range
        this._alpha = this._alpha < 0 ? 0 : this._alpha;
        this._alpha = this._alpha > 1 ? 1 : this._alpha;
        this._colorValue.Alpha = this._alpha;
    }
    _changeSelectedColor(x, y) {
        this._selectedCoordinates = {
            x: x - PICKER_POINTER_WIDTH, // Center the coordinates, because of the width of the circle
            y: y - PICKER_POINTER_WIDTH, // Center the coordinates, because of the height of the circle
        };
        // Idication that changes to the color settings are triggered as a result of user pressing over the main color section.
        this._isSelectedColorChanged = true;
        const tempColor = this._calculateColorFromCoordinates(x, y);
        if (tempColor) {
            this._colorValue.HSL = tempColor;
            const color = this._colorValue.toRGBString();
            this._setValue(color);
        }
    }
    _onkeydown(e) {
        if (isEnter(e)) {
            this._handleHEXChange(e);
        }
    }
    _calculateColorFromCoordinates(x, y) {
        // By using the selected coordinates(x = Lightness, y = Saturation) and hue(selected from the hue slider)
        // and HSL format, the color will be parsed to RGB
        // 0 ≤ H < 360
        // 4.251 because with 4.25 we get out of the colors range.
        const h = this._hue;
        let s = +(1 - (y / 256)).toFixed(2);
        let l = +(x / 256).toFixed(2);
        if (Number.isNaN(s) || Number.isNaN(l)) {
            // The event is finished out of the main color section
            return;
        }
        // Normalize values to be between 0 and 1 in case of rounding issues
        s = Math.max(0, Math.min(1, s));
        l = Math.max(0, Math.min(1, l));
        return {
            h: Math.round(h),
            s: Math.round(s * 100),
            l: Math.round(l * 100),
        };
    }
    _setValue(color) {
        this.value = color;
        this._wrongHEX = !this._colorValue.isColorValueValid();
        this.fireDecoratorEvent("change");
    }
    _updateColorGrid() {
        const hslColours = this._colorValue.HSL;
        this._selectedCoordinates = {
            x: ((hslColours.l * 2.56)) - PICKER_POINTER_WIDTH, // Center the coordinates, because of the width of the circle
            y: (256 - (hslColours.s * 2.56)) - PICKER_POINTER_WIDTH, // Center the coordinates, because of the height of the circle
        };
        if (this._isSelectedColorChanged) { // We shouldn't update the hue value when user presses over the main color section.
            this._isSelectedColorChanged = false;
        }
        else if (this._isHueValueChanged) { // We shouldn't recalculate the hue value when user changes the hue slider.
            this._isHueValueChanged = false;
            this._hue = this.selectedHue ? this.selectedHue : this._hue;
        }
        else {
            this._hue = hslColours.h;
        }
        this._setMainColor(this._hue);
    }
    _isColorValueEqual(value) {
        return this._colorValue.R === value.r
            && this._colorValue.G === value.g
            && this._colorValue.B === value.b;
    }
    get colorPickerLabel() {
        const effectiveLabel = getEffectiveAriaLabelText(this);
        return effectiveLabel
            ? `${ColorPicker_1.i18nBundle.getText(COLORPICKER_LABEL)} ${effectiveLabel}`
            : ColorPicker_1.i18nBundle.getText(COLORPICKER_LABEL);
    }
    get sliderGroupLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_SLIDER_GROUP);
    }
    get hueSliderLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_HUE_SLIDER);
    }
    get alphaSliderLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_ALPHA_SLIDER);
    }
    get hexInputLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_HEX);
    }
    get redInputLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_RED);
    }
    get greenInputLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_GREEN);
    }
    get blueInputLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_BLUE);
    }
    get hueInputLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_HUE);
    }
    get saturationInputLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_SATURATION);
    }
    get lightInputLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_LIGHT);
    }
    get alphaInputLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_ALPHA);
    }
    get percentageLabel() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_PERCENTAGE);
    }
    get colorFieldsAnnouncementText() {
        const mode = this._displayHSL ? "HSL" : "RGB";
        let text = "";
        if (mode === "RGB") {
            text = `${this.redInputLabel} ${this._colorValue.R}, `
                + `${this.greenInputLabel} ${this._colorValue.G}, `
                + `${this.blueInputLabel} ${this._colorValue.B}, `
                + `${this.alphaInputLabel} ${this._colorValue.Alpha}`;
        }
        else {
            text = `${this.hueInputLabel} ${this._colorValue.H}, `
                + `${this.saturationInputLabel} ${this._colorValue.S} ${this.percentageLabel}, `
                + `${this.lightInputLabel} ${this._colorValue.L} ${this.percentageLabel}, `
                + `${this.alphaInputLabel} ${this._colorValue.Alpha}`;
        }
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_COLOR_MODE_CHANGED, mode, text);
    }
    get toggleModeTooltip() {
        return ColorPicker_1.i18nBundle.getText(COLORPICKER_TOGGLE_MODE_TOOLTIP);
    }
    get inputsDisabled() {
        return this._wrongHEX ? true : undefined;
    }
    get hexInputErrorState() {
        return this._wrongHEX ? "Negative" : "None";
    }
    get rgbInputs() {
        const redInput = {
            id: "red",
            value: this._colorValue.R,
            label: "R",
            accessibleName: this.redInputLabel,
        };
        const greenInput = {
            id: "green",
            value: this._colorValue.G,
            label: "G",
            accessibleName: this.greenInputLabel,
        };
        const blueInput = {
            id: "blue",
            value: this._colorValue.B,
            label: "B",
            accessibleName: this.blueInputLabel,
        };
        return [redInput, greenInput, blueInput];
    }
    get hslInputs() {
        const hueInput = {
            id: "hue",
            value: this._colorValue.H,
            label: "H",
            accessibleName: this.hueInputLabel,
        };
        const saturationInput = {
            id: "saturation",
            value: this._colorValue.S,
            label: "S",
            accessibleName: this.saturationInputLabel,
            showPercentSymbol: true,
        };
        const lightInput = {
            id: "light",
            value: this._colorValue.L,
            label: "L",
            accessibleName: this.lightInputLabel,
            showPercentSymbol: true,
        };
        return [hueInput, saturationInput, lightInput];
    }
    get HEX() {
        return this._colorValue.HEX;
    }
    get colorChannelInputs() {
        return this._displayHSL ? this.hslInputs : this.rgbInputs;
    }
    get _isDefaultPickerMode() {
        return !this.simplified;
    }
};
__decorate([
    property()
], ColorPicker.prototype, "value", void 0);
__decorate([
    property()
], ColorPicker.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], ColorPicker.prototype, "simplified", void 0);
__decorate([
    property()
], ColorPicker.prototype, "accessibleName", void 0);
__decorate([
    property()
], ColorPicker.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Object })
], ColorPicker.prototype, "_mainValue", void 0);
__decorate([
    property({ type: Object })
], ColorPicker.prototype, "_colorValue", void 0);
__decorate([
    property({ type: Object })
], ColorPicker.prototype, "_selectedCoordinates", void 0);
__decorate([
    property({ type: Number })
], ColorPicker.prototype, "_alpha", void 0);
__decorate([
    property()
], ColorPicker.prototype, "_alphaTemp", void 0);
__decorate([
    property({ type: Number })
], ColorPicker.prototype, "_hue", void 0);
__decorate([
    property({ type: Boolean })
], ColorPicker.prototype, "_isSelectedColorChanged", void 0);
__decorate([
    property({ type: Boolean })
], ColorPicker.prototype, "_isHueValueChanged", void 0);
__decorate([
    property({ type: Boolean })
], ColorPicker.prototype, "_wrongHEX", void 0);
__decorate([
    property({ type: Boolean })
], ColorPicker.prototype, "_displayHSL", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], ColorPicker, "i18nBundle", void 0);
ColorPicker = ColorPicker_1 = __decorate([
    customElement({
        tag: "ui5-color-picker",
        renderer: jsxRenderer,
        formAssociated: true,
        styles: ColorPickerCss,
        template: ColorPickerTemplate,
        shadowRootOptions: { delegatesFocus: true },
    })
    /**
     * Fired when the the selected color is changed
     * @public
     */
    ,
    event("change", {
        bubbles: true,
    })
], ColorPicker);
ColorPicker.define();
export default ColorPicker;
//# sourceMappingURL=ColorPicker.js.map