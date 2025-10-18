import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/attachment-zip-file.js";
import { pathData as pathDatav5 } from "./v5/attachment-zip-file.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "attachment-zip-file";
export { getPathData, ltr, accData };