import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/truck-load-unload.js";
import { pathData as pathDatav2 } from "./v2/truck-load-unload.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/truck-load-unload";
export { getPathData, ltr, accData };