import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/decrease-line-height.js";
import { pathData as pathDatav5 } from "./v5/decrease-line-height.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "decrease-line-height";
export { getPathData, ltr, accData };