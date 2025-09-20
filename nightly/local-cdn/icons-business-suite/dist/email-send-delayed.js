import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/email-send-delayed.js";
import { pathData as pathDatav2 } from "./v2/email-send-delayed.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/email-send-delayed";
export { getPathData, ltr, accData };