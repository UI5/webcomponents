import { hasStyle, createStyle } from "./ManagedStyles.js";
import { getFeature } from "./FeaturesRegistry.js";
import fontFaceCSS from "./generated/css/FontFace.css.js";
import { getDefaultFontLoading } from "./config/Fonts.js";
const insertFontFace = () => {
    const openUI5Support = getFeature("OpenUI5Support");
    // Only set the main font if there is no OpenUI5 support, or there is, but OpenUI5 is not loaded
    if ((!openUI5Support || !openUI5Support.isOpenUI5Detected())) {
        insertMainFontFace();
    }
};
const insertMainFontFace = () => {
    const hasFontStyles = document.querySelector("head>style[data-ui5-font-face]");
    if (!getDefaultFontLoading() || hasFontStyles) {
        return;
    }
    if (!hasStyle("data-ui5-font-face")) {
        createStyle(fontFaceCSS, "data-ui5-font-face");
    }
};
export default insertFontFace;
//# sourceMappingURL=FontFace.js.map