import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/accidental-leave.js";
import { pathData as pathDatav5 } from "./v5/accidental-leave.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "accidental-leave";
export { getPathData, ltr, accData };