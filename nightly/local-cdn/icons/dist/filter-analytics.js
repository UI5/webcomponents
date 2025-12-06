import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/filter-analytics.js";
import { pathData as pathDatav5 } from "./v5/filter-analytics.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "filter-analytics";
export { getPathData, ltr, accData };