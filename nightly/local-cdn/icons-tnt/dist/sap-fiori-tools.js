import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/sap-fiori-tools.js";
import { pathData as pathDatav3 } from "./v3/sap-fiori-tools.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/sap-fiori-tools";
export { getPathData, ltr, accData };