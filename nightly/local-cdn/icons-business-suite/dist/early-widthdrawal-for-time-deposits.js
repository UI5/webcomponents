import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/early-widthdrawal-for-time-deposits.js";
import { pathData as pathDatav2 } from "./v2/early-widthdrawal-for-time-deposits.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/early-widthdrawal-for-time-deposits";
export { getPathData, ltr, accData };