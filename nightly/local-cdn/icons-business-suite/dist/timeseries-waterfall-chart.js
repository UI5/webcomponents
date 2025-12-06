import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/timeseries-waterfall-chart.js";
import { pathData as pathDatav2 } from "./v2/timeseries-waterfall-chart.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/timeseries-waterfall-chart";
export { getPathData, ltr, accData };