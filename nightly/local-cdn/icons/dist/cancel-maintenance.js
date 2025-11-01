import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/cancel-maintenance.js";
import { pathData as pathDatav5 } from "./v5/cancel-maintenance.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "cancel-maintenance";
export { getPathData, ltr, accData };