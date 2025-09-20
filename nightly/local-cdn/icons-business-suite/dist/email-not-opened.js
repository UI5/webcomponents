import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/email-not-opened.js";
import { pathData as pathDatav2 } from "./v2/email-not-opened.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/email-not-opened";
export { getPathData, ltr, accData };