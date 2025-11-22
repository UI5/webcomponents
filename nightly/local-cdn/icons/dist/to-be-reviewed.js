import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/to-be-reviewed.js";
import { pathData as pathDatav5 } from "./v5/to-be-reviewed.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "to-be-reviewed";
export { getPathData, ltr, accData };