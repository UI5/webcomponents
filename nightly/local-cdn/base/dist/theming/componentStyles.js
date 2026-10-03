import CommonStylesCss from "../generated/css/CommonStyles.css.js";
const packageMap = new Map();
packageMap.set("ui5-common-component-styles", CommonStylesCss);
let componentsStyleSheet;
const getComponentStyles = () => {
    if (!componentsStyleSheet) {
        componentsStyleSheet = new CSSStyleSheet();
        componentsStyleSheet.replaceSync(Array.from(packageMap.values()).join("\n"));
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