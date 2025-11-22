import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/arrow-bottom.js";
import { pathData as pathDatav5 } from "./v5/arrow-bottom.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "arrow-bottom";
export { getPathData, ltr, accData };