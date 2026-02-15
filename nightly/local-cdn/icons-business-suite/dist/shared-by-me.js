import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/shared-by-me.js";
import { pathData as pathDatav2 } from "./v2/shared-by-me.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/shared-by-me";
export { getPathData, ltr, accData };