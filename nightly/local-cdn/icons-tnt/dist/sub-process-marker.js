import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/sub-process-marker.js";
import { pathData as pathDatav3 } from "./v3/sub-process-marker.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/sub-process-marker";
export { getPathData, ltr, accData };