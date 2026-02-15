import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/marked-for-deletion.js";
import { pathData as pathDatav2 } from "./v2/marked-for-deletion.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/marked-for-deletion";
export { getPathData, ltr, accData };