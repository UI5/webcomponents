import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/manage-charging-stations.js";
import { pathData as pathDatav2 } from "./v2/manage-charging-stations.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/manage-charging-stations";
export { getPathData, ltr, accData };