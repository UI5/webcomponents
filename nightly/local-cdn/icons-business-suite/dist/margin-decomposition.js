import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/margin-decomposition.js";
import { pathData as pathDatav2 } from "./v2/margin-decomposition.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/margin-decomposition";
export { getPathData, ltr, accData };