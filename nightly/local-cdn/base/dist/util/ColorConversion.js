/**
 *
 * @param {String} color Color in one of the following formats: RGBA or HEX
 */
/**
 * Map of CSS colors to hex representation
 */
const CSSColors = new Map([
    ["aliceblue", "f0f8ff"],
    ["antiquewhite", "faebd7"],
    ["aqua", "00ffff"],
    ["aquamarine", "7fffd4"],
    ["azure", "f0ffff"],
    ["beige", "f5f5dc"],
    ["bisque", "ffe4c4"],
    ["black", "000000"],
    ["blanchedalmond", "ffebcd"],
    ["blue", "0000ff"],
    ["blueviolet", "8a2be2"],
    ["brown", "a52a2a"],
    ["burlywood", "deb887"],
    ["cadetblue", "5f9ea0"],
    ["chartreuse", "7fff00"],
    ["chocolate", "d2691e"],
    ["coral", "ff7f50"],
    ["cornflowerblue", "6495ed"],
    ["cornsilk", "fff8dc"],
    ["crimson", "dc143c"],
    ["cyan", "00ffff"],
    ["darkblue", "00008b"],
    ["darkcyan", "008b8b"],
    ["darkgoldenrod", "b8860b"],
    ["darkgray", "a9a9a9"],
    ["darkgrey", "a9a9a9"],
    ["darkgreen", "006400"],
    ["darkkhaki", "bdb76b"],
    ["darkmagenta", "8b008b"],
    ["darkolivegreen", "556b2f"],
    ["darkorange", "ff8c00"],
    ["darkorchid", "9932cc"],
    ["darkred", "8b0000"],
    ["darksalmon", "e9967a"],
    ["darkseagreen", "8fbc8f"],
    ["darkslateblue", "483d8b"],
    ["darkslategray", "2f4f4f"],
    ["darkslategrey", "2f4f4f"],
    ["darkturquoise", "00ced1"],
    ["darkviolet", "9400d3"],
    ["deeppink", "ff1493"],
    ["deepskyblue", "00bfff"],
    ["dimgray", "696969"],
    ["dimgrey", "696969"],
    ["dodgerblue", "1e90ff"],
    ["firebrick", "b22222"],
    ["floralwhite", "fffaf0"],
    ["forestgreen", "228b22"],
    ["fuchsia", "ff00ff"],
    ["gainsboro", "dcdcdc"],
    ["ghostwhite", "f8f8ff"],
    ["gold", "ffd700"],
    ["goldenrod", "daa520"],
    ["gray", "808080"],
    ["grey", "808080"],
    ["green", "008000"],
    ["greenyellow", "adff2f"],
    ["honeydew", "f0fff0"],
    ["hotpink", "ff69b4"],
    ["indianred", "cd5c5c"],
    ["indigo", "4b0082"],
    ["ivory", "fffff0"],
    ["khaki", "f0e68c"],
    ["lavender", "e6e6fa"],
    ["lavenderblush", "fff0f5"],
    ["lawngreen", "7cfc00"],
    ["lemonchiffon", "fffacd"],
    ["lightblue", "add8e6"],
    ["lightcoral", "f08080"],
    ["lightcyan", "e0ffff"],
    ["lightgoldenrodyellow", "fafad2"],
    ["lightgray", "d3d3d3"],
    ["lightgrey", "d3d3d3"],
    ["lightgreen", "90ee90"],
    ["lightpink", "ffb6c1"],
    ["lightsalmon", "ffa07a"],
    ["lightseagreen", "20b2aa"],
    ["lightskyblue", "87cefa"],
    ["lightslategray", "778899"],
    ["lightslategrey", "778899"],
    ["lightsteelblue", "b0c4de"],
    ["lightyellow", "ffffe0"],
    ["lime", "00ff00"],
    ["limegreen", "32cd32"],
    ["linen", "faf0e6"],
    ["magenta", "ff00ff"],
    ["maroon", "800000"],
    ["mediumaquamarine", "66cdaa"],
    ["mediumblue", "0000cd"],
    ["mediumorchid", "ba55d3"],
    ["mediumpurple", "9370db"],
    ["mediumseagreen", "3cb371"],
    ["mediumslateblue", "7b68ee"],
    ["mediumspringgreen", "00fa9a"],
    ["mediumturquoise", "48d1cc"],
    ["mediumvioletred", "c71585"],
    ["midnightblue", "191970"],
    ["mintcream", "f5fffa"],
    ["mistyrose", "ffe4e1"],
    ["moccasin", "ffe4b5"],
    ["navajowhite", "ffdead"],
    ["navy", "000080"],
    ["oldlace", "fdf5e6"],
    ["olive", "808000"],
    ["olivedrab", "6b8e23"],
    ["orange", "ffa500"],
    ["orangered", "ff4500"],
    ["orchid", "da70d6"],
    ["palegoldenrod", "eee8aa"],
    ["palegreen", "98fb98"],
    ["paleturquoise", "afeeee"],
    ["palevioletred", "db7093"],
    ["papayawhip", "ffefd5"],
    ["peachpuff", "ffdab9"],
    ["peru", "cd853f"],
    ["pink", "ffc0cb"],
    ["plum", "dda0dd"],
    ["powderblue", "b0e0e6"],
    ["purple", "800080"],
    ["red", "ff0000"],
    ["rosybrown", "bc8f8f"],
    ["royalblue", "4169e1"],
    ["saddlebrown", "8b4513"],
    ["salmon", "fa8072"],
    ["sandybrown", "f4a460"],
    ["seagreen", "2e8b57"],
    ["seashell", "fff5ee"],
    ["sienna", "a0522d"],
    ["silver", "c0c0c0"],
    ["skyblue", "87ceeb"],
    ["slateblue", "6a5acd"],
    ["slategray", "708090"],
    ["slategrey", "708090"],
    ["snow", "fffafa"],
    ["springgreen", "00ff7f"],
    ["steelblue", "4682b4"],
    ["tan", "d2b48c"],
    ["teal", "008080"],
    ["thistle", "d8bfd8"],
    ["tomato", "ff6347"],
    ["turquoise", "40e0d0"],
    ["violet", "ee82ee"],
    ["wheat", "f5deb3"],
    ["white", "ffffff"],
    ["whitesmoke", "f5f5f5"],
    ["yellow", "ffff00"],
    ["yellowgreen", "9acd32"],
    ["transparent", "00000000"],
]);
const getRGBColor = (color) => {
    if (color.startsWith("rgba")) {
        return RGBAToRGB(color);
    }
    if (color.startsWith("rgb")) {
        return RGBStringToRGBObject(color);
    }
    // HEX
    if (color.indexOf("#") === 0) {
        // Shorthand Syntax
        if (color.length === 4) {
            color = `${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
        }
        else {
            color = color.slice(1, color.length);
        }
    }
    // Css Color
    if (CSSColors.has(color)) {
        color = CSSColors.get(color);
    }
    return HEXToRGB(color);
};
const getAlpha = (color) => {
    let alpha = 1;
    if (color.startsWith("rgba") || color.startsWith("hsla")) {
        const parts = color.split(",");
        if (parts.length === 4) {
            alpha = parseFloat(parts[3].replace(")", "").trim());
        }
    }
    return alpha;
};
/**
 * Return an object with the properties for each of the main colors(red, green, blue)
 * @param {String} color Receives a color in the following format: "rgba(0, 0, 0, 1)
 */
const RGBAToRGB = (color) => {
    const openingBracketIndex = color.indexOf("("), commasIndexes = [];
    for (let i = 0; i < color.length; i++) {
        if (color[i] === ",") {
            commasIndexes.push(i);
        }
    }
    return {
        r: parseInt(color.slice(openingBracketIndex + 1, commasIndexes[0]).trim()),
        g: parseInt(color.slice(commasIndexes[0] + 1, commasIndexes[1]).trim()),
        b: parseInt(color.slice(commasIndexes[1] + 1, commasIndexes[2]).trim()),
    };
};
/**
 * Return an object with the properties for each of the main colors(red, green, blue)
 * @param {String} color Receives a color in the following format: "rgb(0, 0, 0)
 */
const RGBStringToRGBObject = (color) => {
    const openingBracketIndex = color.indexOf("("), closingBraketIndex = color.indexOf(")"), commasIndexes = [];
    for (let i = 0; i < color.length; i++) {
        if (color[i] === ",") {
            commasIndexes.push(i);
        }
    }
    return {
        r: parseInt(color.slice(openingBracketIndex + 1, commasIndexes[0]).trim()),
        g: parseInt(color.slice(commasIndexes[0] + 1, commasIndexes[1]).trim()),
        b: parseInt(color.slice(commasIndexes[1] + 1, closingBraketIndex).trim()),
    };
};
const HSLToRGB = (color) => {
    // Formula taken from https://www.rapidtables.com/convert/color/hsl-to-rgb.html
    let saturation = color.s, lightness = color.l, red, green, blue;
    if (saturation > 100) {
        saturation = 1;
    }
    else if (saturation < 0) {
        saturation = 0;
    }
    else {
        saturation /= 100;
    }
    if (lightness > 100) {
        lightness = 1;
    }
    else if (lightness < 0) {
        lightness = 0;
    }
    else {
        lightness /= 100;
    }
    const hue = ((color.h % 360) + 360) % 360, d = saturation * (1 - Math.abs(2 * lightness - 1)), m = 255 * (lightness - 0.5 * d), x = d * (1 - Math.abs(((hue / 60) % 2) - 1)), i = Math.floor(hue / 60), m255x = m + 255 * x, m255d = m + 255 * d;
    switch (i) {
        case 0:
            red = m255d;
            green = m255x;
            blue = m;
            break;
        case 1:
            red = m255x;
            green = m255d;
            blue = m;
            break;
        case 2:
            red = m;
            green = m255d;
            blue = m255x;
            break;
        case 3:
            red = m;
            green = m255x;
            blue = m255d;
            break;
        case 4:
            red = m255x;
            green = m;
            blue = m255d;
            break;
        case 5:
            red = m255d;
            green = m;
            blue = m255x;
            break;
        default:
            red = 0;
            green = 0;
            blue = 0;
            break;
    }
    return {
        r: Math.round(red),
        g: Math.round(green),
        b: Math.round(blue),
    };
};
const HEXToRGB = (hex) => {
    // Please make sure you pass a valid 6 digit hex color
    // In the implementation of this method we assume that the hex argument is a 6 digit valid hex color
    return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16),
    };
};
/**
 * Returns the hex value of the color as string
 * @param {Object} color Receives an object with the properties for each of the main colors(r, g, b)
 */
const RGBtoHEX = (color) => {
    const hexMap = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    let hexValue = "";
    let divisionNumber = color.r / 16;
    let remainder = color.r % 16;
    hexValue += String(hexMap[Math.floor(divisionNumber)]);
    hexValue += String(hexMap[remainder]);
    divisionNumber = color.g / 16;
    remainder = color.g % 16;
    hexValue += String(hexMap[Math.floor(divisionNumber)]);
    hexValue += String(hexMap[remainder]);
    divisionNumber = color.b / 16;
    remainder = color.b % 16;
    hexValue += String(hexMap[Math.floor(divisionNumber)]);
    hexValue += String(hexMap[remainder]);
    return hexValue;
};
const RGBToHSL = (color) => {
    const R = color.r / 255, G = color.g / 255, B = color.b / 255, max = Math.max(R, G, B), min = Math.min(R, G, B), delta = max - min;
    let h = (max + min) / 2;
    let s = (max + min) / 2;
    let l = (max + min) / 2;
    if (max === min) {
        h = 0;
        s = 0;
    }
    else {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        switch (max) {
            case R:
                h = (G - B) / delta + (G < B ? 6 : 0);
                break;
            case G:
                h = (B - R) / delta + 2;
                break;
            case B:
                h = (R - G) / delta + 4;
                break;
        }
        h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return {
        h,
        s,
        l,
    };
};
export { getRGBColor, getAlpha, HSLToRGB, HEXToRGB, RGBToHSL, RGBStringToRGBObject, RGBtoHEX, };
//# sourceMappingURL=ColorConversion.js.map