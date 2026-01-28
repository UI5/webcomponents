import { hasStyle, createStyle } from "./ManagedStyles.js";
import scrollbarStyles from "./generated/css/ScrollbarStyles.css.js";

const insertScrollbarStyles = () => {
	if (!hasStyle("data-ui5-scrollbar-styles")) {
		createStyle(scrollbarStyles, "data-ui5-scrollbar-styles");
	}
};

export default insertScrollbarStyles;
