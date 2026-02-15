import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/substraction-a-b.js";
import { pathData as pathDatav2 } from "./v2/substraction-a-b.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/substraction-a-b";
export { getPathData, ltr, accData };