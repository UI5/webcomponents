import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/slim-arrow-up.js";
import { pathData as pathDatav5 } from "./v5/slim-arrow-up.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "slim-arrow-up";
export { getPathData, ltr, accData };