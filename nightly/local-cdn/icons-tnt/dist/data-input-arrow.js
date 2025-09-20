import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/data-input-arrow.js";
import { pathData as pathDatav3 } from "./v3/data-input-arrow.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/data-input-arrow";
export { getPathData, ltr, accData };