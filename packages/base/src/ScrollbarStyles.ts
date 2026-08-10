import { createOrUpdateStyle } from "./ManagedStyles.js";
import scrollbarStyles from "./generated/css/ScrollbarStyles.css.js";

const insertScrollbarStyles = () => {
	createOrUpdateStyle(scrollbarStyles, "data-ui5-scrollbar-styles");
};

export default insertScrollbarStyles;
