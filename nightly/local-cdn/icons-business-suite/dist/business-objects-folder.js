import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/business-objects-folder.js";
import { pathData as pathDatav2 } from "./v2/business-objects-folder.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/business-objects-folder";
export { getPathData, ltr, accData };