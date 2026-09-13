import { getCustomCSS, attachCustomCSSChange } from "./CustomStyle.js";
import getStylesString from "./getStylesString.js";
import { getFeature } from "../FeaturesRegistry.js";
const effectiveStyleMap = new Map();
attachCustomCSSChange((tag) => {
    effectiveStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});
const getEffectiveStyle = (ElementClass) => {
    const tag = ElementClass.getMetadata().getTag();
    const key = `${tag}_normal`;
    const openUI5Enablement = getFeature("OpenUI5Enablement");
    if (!effectiveStyleMap.has(key)) {
        let busyIndicatorStyles = "";
        if (openUI5Enablement) {
            busyIndicatorStyles = getStylesString(openUI5Enablement.getBusyIndicatorStyles());
        }
        const customStyle = getCustomCSS(tag) || "";
        const builtInStyles = getStylesString(ElementClass.styles);
        const effectiveStyle = `${builtInStyles} ${customStyle} ${busyIndicatorStyles}`;
        effectiveStyleMap.set(key, effectiveStyle);
    }
    return effectiveStyleMap.get(key); // The key is guaranteed to exist
};
export default getEffectiveStyle;
//# sourceMappingURL=getEffectiveStyle.js.map