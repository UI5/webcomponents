import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/keyboard-and-mouse.js";
import { pathData as pathDatav5 } from "./v5/keyboard-and-mouse.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "keyboard-and-mouse";
export { getPathData, ltr, accData };