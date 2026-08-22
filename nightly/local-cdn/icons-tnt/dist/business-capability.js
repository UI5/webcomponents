import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, viewBox, accData } from "./v2/business-capability.js";
import { pathData as pathDatav3 } from "./v3/business-capability.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/business-capability";
export { getPathData, ltr, viewBox, accData };