import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/command-line-interfaces.js";
import { pathData as pathDatav5 } from "./v5/command-line-interfaces.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "command-line-interfaces";
export { getPathData, ltr, accData };