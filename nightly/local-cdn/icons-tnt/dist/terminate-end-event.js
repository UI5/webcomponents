import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/terminate-end-event.js";
import { pathData as pathDatav3 } from "./v3/terminate-end-event.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/terminate-end-event";
export { getPathData, ltr, accData };