const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers
const getStylesString = (styles) => {
    if (Array.isArray(styles)) {
        return styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES).join(" ");
    }
    return styles;
};
export default getStylesString;
//# sourceMappingURL=getStylesString.js.map