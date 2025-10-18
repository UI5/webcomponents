import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/delegated-important-task.js";
import { pathData as pathDatav2 } from "./v2/delegated-important-task.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/delegated-important-task";
export { getPathData, ltr, accData };