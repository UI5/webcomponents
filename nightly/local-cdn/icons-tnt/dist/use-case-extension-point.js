import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/use-case-extension-point.js";
import { pathData as pathDatav3 } from "./v3/use-case-extension-point.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/use-case-extension-point";
export { getPathData, ltr, accData };