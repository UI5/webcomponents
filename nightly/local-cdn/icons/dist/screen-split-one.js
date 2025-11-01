import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/screen-split-one.js";
import { pathData as pathDatav5 } from "./v5/screen-split-one.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "screen-split-one";
export { getPathData, ltr, accData };