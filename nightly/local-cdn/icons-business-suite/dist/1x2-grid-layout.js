import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/1x2-grid-layout.js";
import { pathData as pathDatav2 } from "./v2/1x2-grid-layout.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/1x2-grid-layout";
export { getPathData, ltr, accData };