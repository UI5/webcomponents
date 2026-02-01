import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/thumb-up-filled.js";
import { pathData as pathDatav2 } from "./v2/thumb-up-filled.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/thumb-up-filled";
export { getPathData, ltr, accData };