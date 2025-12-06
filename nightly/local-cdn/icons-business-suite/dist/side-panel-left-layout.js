import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/side-panel-left-layout.js";
import { pathData as pathDatav2 } from "./v2/side-panel-left-layout.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/side-panel-left-layout";
export { getPathData, ltr, accData };