import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/cursor-arrow.js";
import { pathData as pathDatav5 } from "./v5/cursor-arrow.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "cursor-arrow";
export { getPathData, ltr, accData };