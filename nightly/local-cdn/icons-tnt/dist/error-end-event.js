import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/error-end-event.js";
import { pathData as pathDatav3 } from "./v3/error-end-event.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/error-end-event";
export { getPathData, ltr, accData };