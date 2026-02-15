import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/drop-down-list.js";
import { pathData as pathDatav5 } from "./v5/drop-down-list.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "drop-down-list";
export { getPathData, ltr, accData };