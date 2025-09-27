import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/create-leave-request.js";
import { pathData as pathDatav5 } from "./v5/create-leave-request.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "create-leave-request";
export { getPathData, ltr, accData };