import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/chart-table-view.js";
import { pathData as pathDatav5 } from "./v5/chart-table-view.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "chart-table-view";
export { getPathData, ltr, accData };