import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/start-timer-event.js";
import { pathData as pathDatav3 } from "./v3/start-timer-event.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/start-timer-event";
export { getPathData, ltr, accData };