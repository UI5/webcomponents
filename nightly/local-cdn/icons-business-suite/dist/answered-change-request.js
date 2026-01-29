import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/answered-change-request.js";
import { pathData as pathDatav2 } from "./v2/answered-change-request.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/answered-change-request";
export { getPathData, ltr, accData };