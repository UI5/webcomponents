import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/master-task-triangle.js";
import { pathData as pathDatav5 } from "./v5/master-task-triangle.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "master-task-triangle";
export { getPathData, ltr, accData };