const packageMap = new Map();
let componentsStyleSheet;
const getComponentStyles = () => {
    if (!componentsStyleSheet) {
        componentsStyleSheet = new CSSStyleSheet();
    }
    return componentsStyleSheet;
};
const updateComponentStyles = (packageName, content) => {
    packageMap.set(packageName, content);
    const combinedStyles = Array.from(packageMap.values()).join("\n");
    getComponentStyles().replaceSync(combinedStyles);
};
export { getComponentStyles, updateComponentStyles, };
//# sourceMappingURL=componentStyles.js.map