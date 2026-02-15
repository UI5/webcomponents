import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/use-case-diagram.js";
import { pathData as pathDatav3 } from "./v3/use-case-diagram.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/use-case-diagram";
export { getPathData, ltr, accData };