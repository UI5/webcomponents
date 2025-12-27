import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/wounds-doc.js";
import { pathData as pathDatav5 } from "./v5/wounds-doc.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "wounds-doc";
export { getPathData, ltr, accData };