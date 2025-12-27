import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/gender-male-and-female.js";
import { pathData as pathDatav2 } from "./v2/gender-male-and-female.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/gender-male-and-female";
export { getPathData, ltr, accData };