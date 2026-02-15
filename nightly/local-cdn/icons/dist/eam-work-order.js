import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/eam-work-order.js";
import { pathData as pathDatav5 } from "./v5/eam-work-order.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "eam-work-order";
export { getPathData, ltr, accData };