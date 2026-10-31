import getEffectiveStyle from "./getEffectiveStyle.js";
import { attachCustomCSSChange } from "./CustomStyle.js";
const constructableStyleMap = new Map();
attachCustomCSSChange((tag) => {
    constructableStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});
/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
const getConstructableStyle = (ElementClass) => {
    const tag = ElementClass.getMetadata().getTag();
    const key = `${tag}_normal`;
    if (!constructableStyleMap.has(key)) {
        const styleContent = getEffectiveStyle(ElementClass);
        const style = new CSSStyleSheet();
        style.replaceSync(styleContent);
        constructableStyleMap.set(key, [style]);
    }
    return constructableStyleMap.get(key);
};
export default getConstructableStyle;
//# sourceMappingURL=getConstructableStyle.js.map