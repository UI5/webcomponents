import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/chevron-phase-2.js";
import { pathData as pathDatav5 } from "./v5/chevron-phase-2.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "chevron-phase-2";
export { getPathData, ltr, accData };