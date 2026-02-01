import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/business-partner-verified.js";
import { pathData as pathDatav2 } from "./v2/business-partner-verified.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/business-partner-verified";
export { getPathData, ltr, accData };