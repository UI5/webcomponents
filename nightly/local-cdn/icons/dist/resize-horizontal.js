import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/resize-horizontal.js";
import { pathData as pathDatav5 } from "./v5/resize-horizontal.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "resize-horizontal";
export { getPathData, ltr, accData };