import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, viewBox, accData } from "./v2/clone-from-git.js";
import { pathData as pathDatav3 } from "./v3/clone-from-git.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/clone-from-git";
export { getPathData, ltr, viewBox, accData };