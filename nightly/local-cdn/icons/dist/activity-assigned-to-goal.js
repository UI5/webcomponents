import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/activity-assigned-to-goal.js";
import { pathData as pathDatav5 } from "./v5/activity-assigned-to-goal.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "activity-assigned-to-goal";
export { getPathData, ltr, accData };