import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/escalation-throwing.js";
import { pathData as pathDatav3 } from "./v3/escalation-throwing.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/escalation-throwing";
export { getPathData, ltr, accData };