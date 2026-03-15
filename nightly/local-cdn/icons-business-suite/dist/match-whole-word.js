import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/match-whole-word.js";
import { pathData as pathDatav2 } from "./v2/match-whole-word.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/match-whole-word";
export { getPathData, ltr, accData };