import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/vehicle-repair.js";
import { pathData as pathDatav5 } from "./v5/vehicle-repair.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "vehicle-repair";
export { getPathData, ltr, accData };