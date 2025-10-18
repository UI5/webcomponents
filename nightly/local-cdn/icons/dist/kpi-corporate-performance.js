import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/kpi-corporate-performance.js";
import { pathData as pathDatav5 } from "./v5/kpi-corporate-performance.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "kpi-corporate-performance";
export { getPathData, ltr, accData };