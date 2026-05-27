import { hasStyle, createStyle } from "../ManagedStyles.js";
import openUI5PopupStyles from "../generated/css/OpenUI5PopupStyles.css.js";

const insertOpenUI5PopupStyles = () => {
	if (!hasStyle("data-ui5-popup-styles")) {
		createStyle(openUI5PopupStyles, "data-ui5-popup-styles");
	}
};

export default insertOpenUI5PopupStyles;
