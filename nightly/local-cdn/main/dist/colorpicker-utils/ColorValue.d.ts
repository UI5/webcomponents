import type { ColorHSL, ColorRGB } from "@ui5/webcomponents-base/dist/util/ColorConversion.js";
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
declare class ColorValue {
    _rgb: ColorRGB;
    _hsl: ColorHSL;
    _alpha: number;
    _hex: string;
    _valid: boolean;
    constructor();
    get RGB(): ColorRGB;
    get HSL(): ColorHSL;
    get H(): number;
    get S(): number;
    get L(): number;
    get R(): number;
    get G(): number;
    get B(): number;
    get Alpha(): number;
    get HEX(): string;
    set RGB(color: ColorRGB);
    set HSL(color: ColorHSL);
    set HEX(value: string);
    set H(value: number);
    set S(value: number);
    set L(value: number);
    set R(value: number);
    set G(value: number);
    set B(value: number);
    set Alpha(value: number);
    isColorValueValid(): boolean;
    validateRGBValue(value: number): void;
    normalizeRGBValue(value: number): number;
    validateRGBColor(color: ColorRGB): void;
    validateHSLColor(color: ColorHSL): void;
    validateHValue(value: number): void;
    normalizeHValue(value: number): number;
    validateSLValue(value: number): void;
    normalizeSLValue(value: number): number;
    validateHEX(value: string): void;
    _isValidRGBValue(value: number): boolean;
    _isValidHValue(value: number): boolean;
    _isValidSLValue(value: number): boolean;
    _updateRGB(value: ColorRGB): void;
    _updateHSL(value: ColorHSL): void;
    toRGBString(): string;
}
export default ColorValue;
