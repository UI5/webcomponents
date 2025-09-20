import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/business-partner-self-identified.js";
import { pathData as pathDatav2 } from "./v2/business-partner-self-identified.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/business-partner-self-identified";
export { getPathData, ltr, accData };