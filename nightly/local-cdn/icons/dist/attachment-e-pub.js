import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/attachment-e-pub.js";
import { pathData as pathDatav5 } from "./v5/attachment-e-pub.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "attachment-e-pub";
export { getPathData, ltr, accData };