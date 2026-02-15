import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/solution-not-licensed.js";
import { pathData as pathDatav3 } from "./v3/solution-not-licensed.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/solution-not-licensed";
export { getPathData, ltr, accData };