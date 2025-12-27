import { hasStyle, createStyle } from "./ManagedStyles.js";
import systemCSSVars from "./generated/css/SystemCSSVars.css.js";
const insertSystemCSSVars = () => {
    if (!hasStyle("data-ui5-system-css-vars")) {
        createStyle(systemCSSVars, "data-ui5-system-css-vars");
    }
};
export default insertSystemCSSVars;
//# sourceMappingURL=SystemCSSVars.js.map