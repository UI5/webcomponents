import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/bulleting-with-numbers.js";
import { pathData as pathDatav2 } from "./v2/bulleting-with-numbers.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/bulleting-with-numbers";
export { getPathData, ltr, accData };