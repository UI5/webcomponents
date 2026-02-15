import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/boundary-non-interrupting.js";
import { pathData as pathDatav3 } from "./v3/boundary-non-interrupting.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/boundary-non-interrupting";
export { getPathData, ltr, accData };