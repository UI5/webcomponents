import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/crm-service-manager.js";
import { pathData as pathDatav5 } from "./v5/crm-service-manager.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "crm-service-manager";
export { getPathData, ltr, accData };