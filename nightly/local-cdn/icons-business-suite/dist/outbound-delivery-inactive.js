import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/outbound-delivery-inactive.js";
import { pathData as pathDatav2 } from "./v2/outbound-delivery-inactive.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/outbound-delivery-inactive";
export { getPathData, ltr, accData };