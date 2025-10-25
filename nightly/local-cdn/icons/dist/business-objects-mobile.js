import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/business-objects-mobile.js";
import { pathData as pathDatav5 } from "./v5/business-objects-mobile.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-objects-mobile";
export { getPathData, ltr, accData };