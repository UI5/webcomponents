import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/business-application-studio.js";
import { pathData as pathDatav3 } from "./v3/business-application-studio.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/business-application-studio";
export { getPathData, ltr, accData };