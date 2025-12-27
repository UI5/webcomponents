import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/gender-male-and-female.js";
import { pathData as pathDatav5 } from "./v5/gender-male-and-female.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "gender-male-and-female";
export { getPathData, ltr, accData };