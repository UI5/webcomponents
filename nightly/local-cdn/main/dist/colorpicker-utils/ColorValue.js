import { HSLToRGB, HEXToRGB, RGBToHSL, RGBtoHEX, } from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ColorValue` class represents the `value` used in `ui5-color-picker`
 *
 * A color can be represented using RGB, HSL or HEX values. A color also has an alpha value.
 * @private
 */
class ColorValue {
    constructor() {
        this._rgb = { r: 255, g: 255, b: 255 };
        this._hsl = RGBToHSL(this._rgb);
        this._hex = RGBtoHEX(this._rgb);
        this._alpha = 1;
        this._valid = true;
    }
    get RGB() {
        return this._rgb;
    }
    get HSL() {
        return this._hsl;
    }
    get H() {
        return this._hsl.h;
    }
    get S() {
        return this._hsl.s;
    }
    get L() {
        return this._hsl.l;
    }
    get R() {
        return this._rgb.r;
    }
    get G() {
        return this._rgb.g;
    }
    get B() {
        return this._rgb.b;
    }
    get Alpha() {
        return this._alpha;
    }
    get HEX() {
        return this._hex;
    }
    set RGB(color) {
        this.validateRGBColor(color);
        this._updateRGB(color);
    }
    set HSL(color) {
        this.validateHSLColor(color);
        this._updateHSL(color);
    }
    set HEX(value) {
        this._hex = value;
        this.validateHEX(value);
        if (this._valid) {
            this._rgb = HEXToRGB(value);
            this._hsl = RGBToHSL(this._rgb);
        }
    }
    set H(value) {
        const normalizedValue = this.normalizeHValue(value);
        this._valid = true;
        this._updateHSL({ h: normalizedValue, s: this.S, l: this.L });
    }
    set S(value) {
        const normalizedValue = this.normalizeSLValue(value);
        this._valid = true;
        this._updateHSL({ h: this.H, s: normalizedValue, l: this.L });
    }
    set L(value) {
        const normalizedValue = this.normalizeSLValue(value);
        this._valid = true;
        this._updateHSL({ h: this.H, s: this.S, l: normalizedValue });
    }
    set R(value) {
        const normalizedValue = this.normalizeRGBValue(value);
        this._valid = true;
        this._updateRGB({ r: normalizedValue, g: this.G, b: this.B });
    }
    set G(value) {
        const normalizedValue = this.normalizeRGBValue(value);
        this._valid = true;
        this._updateRGB({ r: this.R, g: normalizedValue, b: this.B });
    }
    set B(value) {
        const normalizedValue = this.normalizeRGBValue(value);
        this._valid = true;
        this._updateRGB({ r: this.R, g: this.G, b: normalizedValue });
    }
    set Alpha(value) {
        this._alpha = value;
    }
    isColorValueValid() {
        return this._valid;
    }
    validateRGBValue(value) {
        this._valid = this._isValidRGBValue(value);
    }
    normalizeRGBValue(value) {
        if (this._isValidRGBValue(value)) {
            return value;
        }
        return value < 0 ? 0 : 255;
    }
    validateRGBColor(color) {
        this._valid = this._isValidRGBValue(color.r) && this._isValidRGBValue(color.g) && this._isValidRGBValue(color.b);
    }
    validateHSLColor(color) {
        this._valid = this._isValidHValue(color.h) && this._isValidSLValue(color.s) && this._isValidSLValue(color.l);
    }
    validateHValue(value) {
        this._valid = this._isValidHValue(value);
    }
    normalizeHValue(value) {
        if (this._isValidHValue(value)) {
            return value;
        }
        return value < 0 ? 0 : 360;
    }
    validateSLValue(value) {
        this._valid = this._isValidSLValue(value);
    }
    normalizeSLValue(value) {
        if (this._isValidSLValue(value)) {
            return value;
        }
        return value < 0 ? 0 : 100;
    }
    validateHEX(value) {
        const hexRegex = new RegExp("^[<0-9 abcdef]+$");
        this._valid = value.length === 6 && hexRegex.test(value);
    }
    _isValidRGBValue(value) {
        return value >= 0 && value <= 255;
    }
    _isValidHValue(value) {
        return value >= 0 && value <= 360;
    }
    _isValidSLValue(value) {
        return value >= 0 && value <= 100;
    }
    _updateRGB(value) {
        this._rgb = value;
        if (this._valid) {
            this._hsl = RGBToHSL(value);
            this._hex = RGBtoHEX(value);
        }
    }
    _updateHSL(value) {
        this._hsl = value;
        if (this._valid) {
            this._rgb = HSLToRGB(value);
            this._hex = RGBtoHEX(this._rgb);
        }
    }
    toRGBString() {
        return `rgba(${this._rgb.r}, ${this._rgb.g}, ${this._rgb.b}, ${this._alpha})`;
    }
}
export default ColorValue;
//# sourceMappingURL=ColorValue.js.map