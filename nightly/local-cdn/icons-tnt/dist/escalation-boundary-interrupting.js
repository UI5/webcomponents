import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/escalation-boundary-interrupting.js";
import { pathData as pathDatav3 } from "./v3/escalation-boundary-interrupting.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/escalation-boundary-interrupting";
export { getPathData, ltr, accData };