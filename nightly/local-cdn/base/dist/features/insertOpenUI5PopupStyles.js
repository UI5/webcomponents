import { createOrUpdateStyle } from "../ManagedStyles.js";
import openUI5PopupStyles from "../generated/css/OpenUI5PopupStyles.css.js";
const insertOpenUI5PopupStyles = () => {
    createOrUpdateStyle(openUI5PopupStyles, "data-ui5-popup-styles");
};
export default insertOpenUI5PopupStyles;
//# sourceMappingURL=insertOpenUI5PopupStyles.js.map