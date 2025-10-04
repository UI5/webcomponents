import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/monitor-payments.js";
import { pathData as pathDatav5 } from "./v5/monitor-payments.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "monitor-payments";
export { getPathData, ltr, accData };