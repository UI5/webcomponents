import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/box-truck-empty.js";
import { pathData as pathDatav2 } from "./v2/box-truck-empty.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/box-truck-empty";
export { getPathData, ltr, accData };