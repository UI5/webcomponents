import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/status-activating.js";
import { pathData as pathDatav3 } from "./v3/status-activating.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/status-activating";
export { getPathData, ltr, accData };