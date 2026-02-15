import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/key-user-settings.js";
import { pathData as pathDatav5 } from "./v5/key-user-settings.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "key-user-settings";
export { getPathData, ltr, accData };