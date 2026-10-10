/**
 *
 * @param {String} color Color in one of the following formats: RGBA or HEX
 */
type ColorHSL = {
    h: number;
    s: number;
    l: number;
};
type ColorRGB = {
    r: number;
    b: number;
    g: number;
};
declare const getRGBColor: (color: string) => ColorRGB;
declare const getAlpha: (color: string) => number;
/**
 * Return an object with the properties for each of the main colors(red, green, blue)
 * @param {String} color Receives a color in the following format: "rgb(0, 0, 0)
 */
declare const RGBStringToRGBObject: (color: string) => ColorRGB;
declare const HSLToRGB: (color: ColorHSL) => ColorRGB;
declare const HEXToRGB: (hex: string) => ColorRGB;
/**
 * Returns the hex value of the color as string
 * @param {Object} color Receives an object with the properties for each of the main colors(r, g, b)
 */
declare const RGBtoHEX: (color: ColorRGB) => string;
declare const RGBToHSL: (color: ColorRGB) => ColorHSL;
export { getRGBColor, getAlpha, HSLToRGB, HEXToRGB, RGBToHSL, RGBStringToRGBObject, RGBtoHEX, };
export type { ColorHSL, ColorRGB, };
