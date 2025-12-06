import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/bill-of-material.js";
import { pathData as pathDatav3 } from "./v3/bill-of-material.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/bill-of-material";
export { getPathData, ltr, accData };