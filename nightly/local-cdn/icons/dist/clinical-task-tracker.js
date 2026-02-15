import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/clinical-task-tracker.js";
import { pathData as pathDatav5 } from "./v5/clinical-task-tracker.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "clinical-task-tracker";
export { getPathData, ltr, accData };