import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/vertical-bar-chart.js";
import { pathData as pathDatav5 } from "./v5/vertical-bar-chart.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "vertical-bar-chart";
export { getPathData, ltr, accData };