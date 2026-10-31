import { createOrUpdateStyle } from "./ManagedStyles.js";
import systemCSSVars from "./generated/css/SystemCSSVars.css.js";
const insertSystemCSSVars = () => {
    createOrUpdateStyle(systemCSSVars, "data-ui5-system-css-vars");
};
export default insertSystemCSSVars;
//# sourceMappingURL=SystemCSSVars.js.map