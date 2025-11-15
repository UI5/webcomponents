import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/inverse-t-layout.js";
import { pathData as pathDatav2 } from "./v2/inverse-t-layout.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/inverse-t-layout";
export { getPathData, ltr, accData };