import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/column-chart-dual-axis.js";
import { pathData as pathDatav5 } from "./v5/column-chart-dual-axis.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "column-chart-dual-axis";
export { getPathData, ltr, accData };